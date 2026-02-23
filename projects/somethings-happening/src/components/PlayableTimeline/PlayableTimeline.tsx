import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faBackwardStep,
  faBars,
  faChevronDown,
  faChevronUp,
  faForwardStep,
  faPause,
  faPlay,
  faRepeat,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Timeline } from '@/components/Timeline';
import { MomentCard } from '@/components/MomentCard';
import { getYouTubeVideoId, getYouTubeThumbnail } from '@/lib/youtube-client';
import styles from './PlayableTimeline.module.css';

export interface TimelineItem {
  id: string;
  timestamp: Date;
  source: string;
  sourceUrl?: string;
  content: string;
  mediaType?: 'text' | 'image' | 'video' | 'audio';
  mediaUrl?: string;
}

export type TimelineItemInput = Omit<TimelineItem, 'timestamp'> & {
  timestamp: Date | string | number;
};

export interface PlayableTimelineProps {
  title: string;
  startDate: Date | string | number;
  endDate?: Date | string | number;
  initialStatus?: 'live' | 'upcoming' | 'completed';
  description?: string;
  initialItems: TimelineItemInput[];
  pendingLiveItems?: TimelineItemInput[];
}

type TimelineOrder = 'chronological' | 'reverse-chronological';
type PlaybackMode = 'single' | 'continuous';

const TEXT_PLAYBACK_INTERVAL_MS = 10000;
const LIVE_INGEST_INTERVAL_MS = 10000;
const RECENT_BG_HISTORY_SIZE = 3;

function getEventStatus(startDate: Date, endDate?: Date): 'live' | 'upcoming' | 'completed' {
  const now = Date.now();
  const start = startDate.getTime();
  const end = endDate?.getTime();

  if (now < start) {
    return 'upcoming';
  }

  if (!end || now <= end) {
    return 'live';
  }

  return 'completed';
}

function getInitialOrder(status: 'live' | 'upcoming' | 'completed'): TimelineOrder {
  return status === 'live' ? 'reverse-chronological' : 'chronological';
}

function formatDateTimeLocal(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function toDate(value: Date | string | number) {
  return value instanceof Date ? value : new Date(value);
}

function getProfileUrl(item: TimelineItem) {
  if (item.sourceUrl) {
    return item.sourceUrl;
  }

  return `https://example.com/${encodeURIComponent(item.source.replace(/^@/, ''))}`;
}

function getServiceLabel(url?: string) {
  if (!url) {
    return 'WEB';
  }

  if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'X';
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'YT';
  }

  if (url.includes('soundcloud.com') || url.includes('soundhelix.com')) {
    return 'AU';
  }

  return 'WEB';
}

function getStatusLabel(status: 'live' | 'upcoming' | 'completed') {
  switch (status) {
    case 'live': return 'Live Now';
    case 'upcoming': return 'Upcoming';
    case 'completed': return 'Completed';
  }
}

const ITEM_GRADIENTS = [
  'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
  'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)',
  'linear-gradient(135deg, #FCD34D 0%, #F87171 100%)',
  'linear-gradient(135deg, #34D399 0%, #3B82F6 100%)',
  'linear-gradient(135deg, #F472B6 0%, #9333EA 100%)',
  'linear-gradient(135deg, #FB923C 0%, #FBBF24 100%)',
];

function getItemGradient(itemId: string): string {
  let hash = 0;
  for (let i = 0; i < itemId.length; i++) {
    hash = (hash * 31 + itemId.charCodeAt(i)) | 0;
  }
  return ITEM_GRADIENTS[Math.abs(hash) % ITEM_GRADIENTS.length];
}

interface PlayerMediaProps {
  item?: TimelineItem;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayStateChange?: (playing: boolean) => void;
  onMuteStateChange?: (muted: boolean) => void;
  onYouTubeReadyStateChange?: (ready: boolean) => void;
  onProgressChange: (position: number, duration: number) => void;
  seekTo: number | null;
  onSeekHandled: () => void;
  onComplete: () => void;
  activeBackgroundImage?: string;
}

function PlayerMedia({
  item,
  isPlaying,
  isMuted,
  onPlayStateChange,
  // onMuteStateChange is not used with simple iframe embeds
  onYouTubeReadyStateChange,
  onProgressChange,
  seekTo,
  onSeekHandled,
  onComplete,
  activeBackgroundImage,
}: PlayerMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textPlaybackStartRef = useRef<number | null>(null);
  const youTubeId = item?.mediaType === 'video' ? getYouTubeVideoId(item.mediaUrl) : null;
  const isYouTube = Boolean(youTubeId);

  // Text caption chunk logic
  const textChunks = useMemo(() => {
    if (!item || item.mediaType !== 'text') return [];
    const words = item.content.split(/\s+/).filter(Boolean);
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += 2) {
      chunks.push(words.slice(i, Math.min(i + 2, words.length)).join(' '));
    }
    return chunks.length > 0 ? chunks : [item.content];
  }, [item]);

  // Track chunk progress: { itemId, step } — auto-resets to 0 when itemId changes
  const [chunkStep, setChunkStep] = useState<{ itemId: string | null; step: number }>({
    itemId: null,
    step: 0,
  });
  const currentChunkIndex =
    chunkStep.itemId === (item?.id ?? null)
      ? chunkStep.step % Math.max(textChunks.length, 1)
      : 0;

  useEffect(() => {
    if (!item || item.mediaType !== 'text' || !isPlaying || textChunks.length <= 1) return;
    const chunkDuration = Math.floor(TEXT_PLAYBACK_INTERVAL_MS / textChunks.length);
    const timer = window.setInterval(() => {
      setChunkStep((prev) => ({
        itemId: item.id,
        step: prev.itemId === item.id ? prev.step + 1 : 1,
      }));
    }, chunkDuration);
    return () => window.clearInterval(timer);
  }, [item, isPlaying, textChunks.length]);

  const currentBgImage = activeBackgroundImage ?? null;

  const fallbackGradient = item ? getItemGradient(item.id) : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';

  useEffect(() => {
    if (!isYouTube) {
      return;
    }

    onYouTubeReadyStateChange?.(true);
  }, [isYouTube, onYouTubeReadyStateChange]);

  useEffect(() => {
    if (!item || (item.mediaType !== 'text' && !isYouTube)) {
      onProgressChange(0, 0);
      textPlaybackStartRef.current = null;
      return;
    }

    onProgressChange(0, TEXT_PLAYBACK_INTERVAL_MS / 1000);

    if (!isPlaying) {
      textPlaybackStartRef.current = null;
    }
  }, [item, isPlaying, onProgressChange, isYouTube]);

  useEffect(() => {
    if (!item || (item.mediaType !== 'text' && !isYouTube) || !isPlaying) {
      return;
    }

    const durationSeconds = TEXT_PLAYBACK_INTERVAL_MS / 1000;
    const startedAt = Date.now();
    textPlaybackStartRef.current = startedAt;

    onPlayStateChange?.(true);

    const progressTimer = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      onProgressChange(Math.min(elapsed, durationSeconds), durationSeconds);
    }, 200);

    const timer = window.setTimeout(() => {
      onComplete();
    }, TEXT_PLAYBACK_INTERVAL_MS);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(timer);
    };
  }, [item, isPlaying, onComplete, onPlayStateChange, onProgressChange, isYouTube]);

  useEffect(() => {
    if (!item || (item.mediaType !== 'text' && !isYouTube) || seekTo === null) {
      return;
    }

    const clampedSeconds = Math.max(0, Math.min(seekTo, TEXT_PLAYBACK_INTERVAL_MS / 1000));
    onProgressChange(clampedSeconds, TEXT_PLAYBACK_INTERVAL_MS / 1000);

    if (isPlaying) {
      textPlaybackStartRef.current = Date.now() - clampedSeconds * 1000;
    }

    onSeekHandled();
  }, [item, isPlaying, seekTo, onProgressChange, onSeekHandled, isYouTube]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !item || item.mediaType !== 'video' || isYouTube) {
      return;
    }

    if (isPlaying) {
      void videoElement.play();
      return;
    }

    videoElement.pause();
  }, [item, isPlaying, isYouTube]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !item || item.mediaType !== 'video' || isYouTube) {
      return;
    }

    const onLoadedMetadata = () => {
      onProgressChange(videoElement.currentTime, videoElement.duration || 0);
    };

    const onTimeUpdate = () => {
      onProgressChange(videoElement.currentTime, videoElement.duration || 0);
    };

    const onPlay = () => onPlayStateChange?.(true);
    const onPause = () => onPlayStateChange?.(false);

    videoElement.addEventListener('loadedmetadata', onLoadedMetadata);
    videoElement.addEventListener('timeupdate', onTimeUpdate);
    videoElement.addEventListener('play', onPlay);
    videoElement.addEventListener('pause', onPause);

    return () => {
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      videoElement.removeEventListener('timeupdate', onTimeUpdate);
      videoElement.removeEventListener('play', onPlay);
      videoElement.removeEventListener('pause', onPause);
    };
  }, [item, onPlayStateChange, onProgressChange, isYouTube]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !item || item.mediaType !== 'video' || isYouTube) {
      return;
    }

    videoElement.muted = isMuted;
  }, [item, isMuted, isYouTube]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !item || item.mediaType !== 'video' || seekTo === null || isYouTube) {
      return;
    }

    videoElement.currentTime = Math.max(0, seekTo);
    onSeekHandled();
  }, [item, seekTo, onSeekHandled, isYouTube]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !item || item.mediaType !== 'audio') {
      return;
    }

    if (isPlaying) {
      void audioElement.play();
      return;
    }

    audioElement.pause();
  }, [item, isPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !item || item.mediaType !== 'audio') {
      return;
    }

    const onLoadedMetadata = () => {
      onProgressChange(audioElement.currentTime, audioElement.duration || 0);
    };

    const onTimeUpdate = () => {
      onProgressChange(audioElement.currentTime, audioElement.duration || 0);
    };

    const onPlay = () => onPlayStateChange?.(true);
    const onPause = () => onPlayStateChange?.(false);

    audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
    audioElement.addEventListener('timeupdate', onTimeUpdate);
    audioElement.addEventListener('play', onPlay);
    audioElement.addEventListener('pause', onPause);

    return () => {
      audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioElement.removeEventListener('timeupdate', onTimeUpdate);
      audioElement.removeEventListener('play', onPlay);
      audioElement.removeEventListener('pause', onPause);
    };
  }, [item, onPlayStateChange, onProgressChange]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !item || item.mediaType !== 'audio') {
      return;
    }

    audioElement.muted = isMuted;
  }, [item, isMuted]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !item || item.mediaType !== 'audio' || seekTo === null) {
      return;
    }

    audioElement.currentTime = Math.max(0, seekTo);
    onSeekHandled();
  }, [item, seekTo, onSeekHandled]);

  if (!item) {
    return <p className={styles.playerContent}>No media available yet.</p>;
  }

  if (item.mediaType === 'video' && youTubeId) {
    return (
      <iframe
        className={styles.youtubePlayer}
        src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (item.mediaType === 'video' && item.mediaUrl) {
    return (
      <video
        ref={videoRef}
        src={item.mediaUrl}
        className={styles.nativeMedia}
        onEnded={onComplete}
      />
    );
  }

  if (item.mediaType === 'audio' && item.mediaUrl) {
    return (
      <>
        <audio
          ref={audioRef}
          src={item.mediaUrl}
          className={styles.audioPlayer}
          onEnded={onComplete}
        />
        <p className={styles.playerContent}>{item.content}</p>
      </>
    );
  }

  return (
    <div
      className={styles.textCaptionContainer}
      style={{ background: fallbackGradient }}
    >
      {currentBgImage && (
        <div
          className={styles.textCaptionBgImage}
          style={{ backgroundImage: `url(${currentBgImage})` }}
        />
      )}
      <div className={styles.textCaptionOverlay} />
      <p className={styles.textCaptionText}>
        {textChunks[currentChunkIndex] ?? item.content}
      </p>
    </div>
  );
}

export function PlayableTimeline({
  title,
  startDate,
  endDate,
  initialStatus,
  initialItems,
  pendingLiveItems = [],
}: PlayableTimelineProps) {
  const normalizedStartDate = useMemo(() => toDate(startDate), [startDate]);
  const normalizedEndDate = useMemo(
    () => (endDate == null ? undefined : toDate(endDate)),
    [endDate],
  );
  const normalizedItems = useMemo<TimelineItem[]>(
    () => initialItems.map((item) => ({ ...item, timestamp: toDate(item.timestamp) })),
    [initialItems],
  );
  const normalizedPendingLiveItems = useMemo<TimelineItem[]>(
    () => pendingLiveItems.map((item) => ({ ...item, timestamp: toDate(item.timestamp) })),
    [pendingLiveItems],
  );

  const [items, setItems] = useState<TimelineItem[]>(normalizedItems);
  const [liveQueueIndex, setLiveQueueIndex] = useState(0);
  const [status, setStatus] = useState<'live' | 'upcoming' | 'completed'>(
    initialStatus ?? getEventStatus(normalizedStartDate, normalizedEndDate),
  );
  const [order, setOrder] = useState<TimelineOrder>(() =>
    getInitialOrder(initialStatus ?? getEventStatus(normalizedStartDate, normalizedEndDate)),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [pendingSeek, setPendingSeek] = useState<number | null>(null);
  const [stickyOffset, setStickyOffset] = useState(0);
  const [repeatPlayback, setRepeatPlayback] = useState(true);
  const [youtubePlayerReady, setYoutubePlayerReady] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [showMomentList, setShowMomentList] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | null>(null);
  const [showRepeatIcon, setShowRepeatIcon] = useState(false);
  const [textBgImageIndex, setTextBgImageIndex] = useState(0);
  const recentTextBgIndicesRef = useRef<number[]>([]);
  const lastTextBgItemIdRef = useRef<string | null>(null);
  const momentRepeatCountRef = useRef(0);
  const playbackModeRef = useRef<PlaybackMode>('continuous');
  const controlsHideTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ y: number; t: number } | null>(null);

  const handlePlayerTap = useCallback(() => {
    setIsPlaying((prev) => !prev);
    setControlsVisible(true);
    if (controlsHideTimerRef.current !== null) {
      window.clearTimeout(controlsHideTimerRef.current);
    }
    controlsHideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (controlsHideTimerRef.current !== null) {
        window.clearTimeout(controlsHideTimerRef.current);
      }
    };
  }, []);

  const updatePlaybackMode = useCallback((mode: PlaybackMode) => {
    playbackModeRef.current = mode;
  }, []);

  const stickyAreaRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  const orderedItems = useMemo(() => {
    const copy = [...items];
    return copy.sort((a, b) => {
      const delta = a.timestamp.getTime() - b.timestamp.getTime();
      return order === 'chronological' ? delta : -delta;
    });
  }, [items, order]);

  const backgroundImages = useMemo(() => {
    const images: string[] = [];
    for (const item of items) {
      if (item.mediaType === 'image' && item.mediaUrl) {
        images.push(item.mediaUrl);
      } else if (item.mediaType === 'video' && item.mediaUrl) {
        const ytId = getYouTubeVideoId(item.mediaUrl);
        if (ytId) {
          images.push(getYouTubeThumbnail(ytId));
        }
      }
    }
    return Array.from(new Set(images));
  }, [items]);

  useEffect(() => {
    const statusPoll = window.setInterval(() => {
      const nextStatus = getEventStatus(normalizedStartDate, normalizedEndDate);
      setStatus(nextStatus);
    }, 30000);

    return () => window.clearInterval(statusPoll);
  }, [normalizedStartDate, normalizedEndDate]);

  useEffect(() => {
    if (
      status !== 'live' ||
      normalizedPendingLiveItems.length === 0 ||
      liveQueueIndex >= normalizedPendingLiveItems.length
    ) {
      return;
    }

    const liveIngest = window.setInterval(() => {
      setItems((currentItems) => {
        const nextItem = normalizedPendingLiveItems[liveQueueIndex];
        if (!nextItem) {
          return currentItems;
        }

        const exists = currentItems.some((item) => item.id === nextItem.id);
        if (exists) {
          return currentItems;
        }

        return [...currentItems, nextItem];
      });

      setLiveQueueIndex((index) => Math.min(index + 1, normalizedPendingLiveItems.length));
    }, LIVE_INGEST_INTERVAL_MS);

    return () => window.clearInterval(liveIngest);
  }, [status, normalizedPendingLiveItems, liveQueueIndex]);

  const hasItems = orderedItems.length > 0;
  const currentIndex = hasItems ? Math.min(currentPosition, orderedItems.length - 1) : -1;
  const currentItem = currentIndex >= 0 ? orderedItems[currentIndex] : undefined;
  const isAtEnd = currentIndex >= 0 && currentIndex === orderedItems.length - 1;

  useEffect(() => {
    if (!currentItem || currentItem.mediaType !== 'text' || backgroundImages.length === 0) {
      return;
    }

    if (lastTextBgItemIdRef.current === currentItem.id) {
      return;
    }

    lastTextBgItemIdRef.current = currentItem.id;

    const timer = window.setTimeout(() => {
      if (backgroundImages.length === 1) {
        recentTextBgIndicesRef.current = [0];
        setTextBgImageIndex(0);
        return;
      }

      setTextBgImageIndex((previousIndex) => {
        const maxHistory = Math.min(RECENT_BG_HISTORY_SIZE, backgroundImages.length - 1);
        const recent = recentTextBgIndicesRef.current.slice(-maxHistory);
        const blocked = new Set<number>([...recent, previousIndex]);
        const candidates: number[] = [];

        for (let i = 0; i < backgroundImages.length; i++) {
          if (!blocked.has(i)) {
            candidates.push(i);
          }
        }

        let nextIndex = previousIndex;
        if (candidates.length > 0) {
          const candidateIndex = Math.floor(Math.random() * candidates.length);
          nextIndex = candidates[candidateIndex];
        } else {
          while (nextIndex === previousIndex) {
            nextIndex = Math.floor(Math.random() * backgroundImages.length);
          }
        }

        recentTextBgIndicesRef.current = [
          ...recentTextBgIndicesRef.current,
          nextIndex,
        ].slice(-RECENT_BG_HISTORY_SIZE);
        return nextIndex;
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [currentItem, backgroundImages]);

  const activeBackgroundImage =
    backgroundImages.length > 0
      ? backgroundImages[textBgImageIndex % backgroundImages.length]
      : undefined;

  const chronologicalItems = useMemo(() => {
    return [...items].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }, [items]);

  const chronologicalFirstId = chronologicalItems[0]?.id;
  const chronologicalLastId = chronologicalItems[chronologicalItems.length - 1]?.id;

  const setItemRef = useCallback((itemId: string, node: HTMLElement | null) => {
    itemRefs.current[itemId] = node;
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const measured = stickyAreaRef.current?.getBoundingClientRect().height ?? 0;
      setStickyOffset(Math.ceil(measured));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    const observer = new ResizeObserver(updateHeight);
    if (stickyAreaRef.current) {
      observer.observe(stickyAreaRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const advancePlayback = useCallback(() => {
    if (orderedItems.length === 0) {
      return;
    }

    if (playbackModeRef.current === 'single') {
      setIsPlaying(false);
      return;
    }

    // Repeat the current moment 3 times before advancing
    const REPEATS = 3;
    if (momentRepeatCountRef.current < REPEATS - 1) {
      momentRepeatCountRef.current += 1;
      setShowRepeatIcon(true);
      window.setTimeout(() => setShowRepeatIcon(false), 3000);
      setIsPlaying(false);
      window.setTimeout(() => setIsPlaying(true), 0);
      return;
    }

    // Done repeating — advance to next moment
    momentRepeatCountRef.current = 0;
    setSlideDirection('up');
    setCurrentPosition((position) => {
      const lastIndex = orderedItems.length - 1;

      if (position >= lastIndex) {
        if (repeatPlayback) {
          return 0;
        }

        if (status !== 'live') {
          setIsPlaying(false);
        }

        return lastIndex;
      }

      return position + 1;
    });
  }, [orderedItems.length, repeatPlayback, status]);

  const waitingForLiveContent =
    isPlaying &&
    status === 'live' &&
    order === 'chronological' &&
    isAtEnd &&
    !repeatPlayback;

  const currentIsYouTube =
    currentItem?.mediaType === 'video' && Boolean(getYouTubeVideoId(currentItem.mediaUrl));

  const handleSelectMoment = useCallback(
    (index: number) => {
      setCurrentPosition(index);
      momentRepeatCountRef.current = 0;
      updatePlaybackMode('single');
      setIsPlaying(true);
      setShowMomentList(false);
    },
    [updatePlaybackMode],
  );

  useEffect(() => {
    if (!isPlaying || !currentItem) {
      return;
    }

    const node = itemRefs.current[currentItem.id];
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentItem, isPlaying]);

  const onBack = useCallback(() => {
    setSlideDirection('down');
    momentRepeatCountRef.current = 0;
    setCurrentPosition((position) => Math.max(position - 1, 0));
    setIsPlaying(true);
  }, []);

  const onNext = useCallback(() => {
    setSlideDirection('up');
    momentRepeatCountRef.current = 0;
    setCurrentPosition((position) =>
      Math.min(position + 1, Math.max(orderedItems.length - 1, 0)),
    );
    setIsPlaying(true);
  }, [orderedItems.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { y: e.touches[0].clientY, t: Date.now() };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      const deltaT = Date.now() - touchStartRef.current.t;
      touchStartRef.current = null;

      if (Math.abs(deltaY) < 60 || deltaT > 600) return;

      e.preventDefault();
      if (deltaY < 0) {
        onNext();
      } else {
        onBack();
      }
    },
    [onNext, onBack],
  );

  const onTogglePlay = useCallback(() => {
    if (!hasItems) {
      return;
    }

    setIsPlaying((value) => {
      const next = !value;
      if (next) {
        updatePlaybackMode('continuous');
      }
      return next;
    });
  }, [hasItems, updatePlaybackMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, button, [contenteditable="true"]')) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onBack();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }

      if (event.key === ' ' || event.code === 'Space' || event.key === 'Spacebar') {
        event.preventDefault();
        onTogglePlay();
      }

      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault();
        setIsMuted((value) => !value);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack, onNext, onTogglePlay]);

  const onProgressInput = useCallback((value: string) => {
    const seconds = Number(value);
    if (!Number.isFinite(seconds)) {
      return;
    }

    setPendingSeek(seconds);
    setPlaybackProgress(seconds);
  }, []);

  const onProgressChange = useCallback((position: number, duration: number) => {
    setPlaybackProgress(Math.max(0, position));
    setPlaybackDuration(Math.max(0, duration));
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(totalSeconds / 60);
    const remainder = totalSeconds % 60;
    return `${minutes}:${String(remainder).padStart(2, '0')}`;
  }, []);

  const containerStyle = {
    '--sticky-offset': `${stickyOffset}px`,
  } as CSSProperties;

  const slideFrameClass = [
    styles.slideFrame,
    slideDirection === 'up' ? styles.slideFromBottom : '',
    slideDirection === 'down' ? styles.slideFromTop : '',
  ]
    .filter(Boolean)
    .join(' ');

  const slideFrameStyle = currentItem
    ? { background: getItemGradient(currentItem.id) }
    : undefined;

  return (
    <div className={styles.container} style={containerStyle}>
      <div
        className={`${styles.stickyTopArea} ${controlsVisible ? styles.controlsVisible : ''}`}
        ref={stickyAreaRef}
      >
        <section className={styles.playerSection} aria-label="Media player">
          <div
            className={styles.playerWindow}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentItem ? (
              <div
                key={currentIndex}
                className={slideFrameClass}
                style={slideFrameStyle}
                onAnimationEnd={() => setSlideDirection(null)}
              >
                <PlayerMedia
                  item={currentItem}
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  onPlayStateChange={setIsPlaying}
                  onMuteStateChange={setIsMuted}
                  onYouTubeReadyStateChange={setYoutubePlayerReady}
                  onProgressChange={onProgressChange}
                  seekTo={pendingSeek}
                  onSeekHandled={() => setPendingSeek(null)}
                  onComplete={advancePlayback}
                  activeBackgroundImage={activeBackgroundImage}
                />
                {currentIsYouTube && !youtubePlayerReady && (
                  <div className={styles.playerLoading} aria-live="polite">
                    <span className={styles.loadingSpinner} aria-hidden="true" />
                    <span>Loading player…</span>
                  </div>
                )}
                {showRepeatIcon && (
                  <div className={styles.repeatIcon} aria-hidden="true">
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                  </div>
                )}
                <div
                  className={styles.mobileTapLayer}
                  onClick={handlePlayerTap}
                  aria-hidden="true"
                />
                <div className={styles.playerInfoOverlay}>
                  <div className={styles.overlayEventInfo}>
                    <span className={`${styles.overlayStatusBadge} ${styles[status]}`}>
                      {getStatusLabel(status)}
                    </span>
                    <h1 className={styles.overlayTitle}>{title}</h1>
                  </div>
                  <div className={styles.overlaySourceRow}>
                    <span className={styles.overlayServiceIcon} aria-hidden="true">
                      {getServiceLabel(currentItem.sourceUrl)}
                    </span>
                    <a
                      href={getProfileUrl(currentItem)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.overlaySource}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {currentItem.source}
                    </a>
                    <span className={styles.overlayMeta}>
                      {formatDateTimeLocal(currentItem.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className={styles.playerContent}>No media available yet.</p>
            )}
          </div>

          <div className={styles.controlsContainer}>
            <div className={styles.progressWrap}>
              <input
                type="range"
                min={0}
                max={Math.max(playbackDuration, 0.1)}
                step={0.1}
                value={Math.min(playbackProgress, Math.max(playbackDuration, 0.1))}
                onChange={(event) => onProgressInput(event.target.value)}
                className={styles.progressBar}
                aria-label="Playback progress"
                disabled={!hasItems || playbackDuration <= 0}
              />
            </div>

            <div className={styles.controlsRow}>
              <div className={styles.transportControls}>
                <AriaButton
                  onPress={onBack}
                  isDisabled={!hasItems || currentIndex <= 0}
                  className={styles.iconButton}
                  aria-label="Previous moment"
                >
                  <FontAwesomeIcon icon={faBackwardStep} />
                </AriaButton>
                <AriaButton
                  onPress={onTogglePlay}
                  isDisabled={!hasItems}
                  className={styles.iconButton}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </AriaButton>
                <AriaButton
                  onPress={onNext}
                  isDisabled={!hasItems || isAtEnd}
                  className={styles.iconButton}
                  aria-label="Next moment"
                >
                  <FontAwesomeIcon icon={faForwardStep} />
                </AriaButton>
                <AriaButton
                  onPress={() => setRepeatPlayback((value) => !value)}
                  className={`${styles.iconButton} ${repeatPlayback ? styles.iconButtonActive : ''}`}
                  aria-label={repeatPlayback ? 'Disable repeat' : 'Enable repeat'}
                >
                  <FontAwesomeIcon icon={faRepeat} />
                </AriaButton>
                <AriaButton
                  onPress={() => setIsMuted((value) => !value)}
                  className={`${styles.iconButton} ${!isMuted ? styles.iconButtonActive : ''}`}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
                </AriaButton>
                <span className={styles.controlTime}>
                  {formatTime(playbackProgress)} / {formatTime(playbackDuration)}
                </span>
              </div>

              <div className={styles.controls}>
                <AriaButton
                  onPress={() => {
                    setOrder((value) =>
                      value === 'chronological' ? 'reverse-chronological' : 'chronological',
                    );
                    setCurrentPosition(0);
                  }}
                  className={styles.iconButton}
                  aria-label={
                    order === 'chronological'
                      ? 'Switch to reverse chronological order'
                      : 'Switch to chronological order'
                  }
                >
                  <span>
                    <FontAwesomeIcon
                      icon={order === 'chronological' ? faChevronUp : faChevronDown}
                    />
                  </span>
                </AriaButton>
                <AriaButton
                  onPress={() => setShowMomentList((v) => !v)}
                  className={`${styles.iconButton} ${styles.momentListToggle}`}
                  aria-label={showMomentList ? 'Close moment list' : 'Open moment list'}
                >
                  <FontAwesomeIcon icon={showMomentList ? faXmark : faBars} />
                </AriaButton>
              </div>
            </div>

            {waitingForLiveContent && (
              <p className={styles.liveHint}>Waiting for new live media to continue playback…</p>
            )}
          </div>
        </section>
      </div>

      <div
        className={`${styles.timelineSection} ${showMomentList ? styles.momentListOpen : ''}`}
      >
        <div className={styles.momentListCloseRow}>
          <AriaButton
            onPress={() => setShowMomentList(false)}
            className={styles.momentListCloseBtn}
            aria-label="Close moment list"
          >
            <FontAwesomeIcon icon={faXmark} />
            <span>Close</span>
          </AriaButton>
        </div>
        <Timeline>
          {orderedItems.map((item, index) => {
            const isFirstVisible = index === 0;
            const isLastVisible = index === orderedItems.length - 1;
            const isLatestMoment = item.id === chronologicalLastId;
            const shouldExtendTop =
              status !== 'completed' &&
              order === 'reverse-chronological' &&
              isLatestMoment;
            const shouldExtendBottom =
              status !== 'completed' && order === 'chronological' && isLatestMoment;
            const showTopConnector = !isFirstVisible || shouldExtendTop;
            const showBottomConnector = !isLastVisible || shouldExtendBottom;

            return (
              <MomentCard
                key={item.id}
                ref={(node) => setItemRef(item.id, node)}
                timestamp={item.timestamp}
                source={item.source}
                sourceUrl={item.sourceUrl}
                content={item.content}
                mediaType={item.mediaType}
                mediaUrl={item.mediaUrl}
                isActive={index === currentIndex}
                isStartMoment={item.id === chronologicalFirstId}
                isEndMoment={status === 'completed' && item.id === chronologicalLastId}
                showTopConnector={showTopConnector}
                showBottomConnector={showBottomConnector}
                extendTopConnector={shouldExtendTop}
                extendBottomConnector={shouldExtendBottom}
                onPress={() => handleSelectMoment(index)}
              />
            );
          })}
        </Timeline>
      </div>
    </div>
  );
}
