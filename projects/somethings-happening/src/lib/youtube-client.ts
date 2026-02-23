/**
 * Client-safe YouTube utilities
 * No API keys or sensitive data
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);

    // Handle youtu.be short URLs
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }

    // Handle youtube.com URLs
    if (urlObj.hostname.includes('youtube.com')) {
      // Check for /watch?v= format
      const vParam = urlObj.searchParams.get('v');
      if (vParam) return vParam;

      // Check for /embed/ format
      const embedMatch = urlObj.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];

      // Check for /v/ format
      const vMatch = urlObj.pathname.match(/\/v\/([^/?]+)/);
      if (vMatch) return vMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generate YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq',
): string {
  const qualityMap = {
    default: 'default',
    mq: 'mqdefault',
    hq: 'hqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  };

  return `https://i.ytimg.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Generate YouTube embed URL from video ID
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options?: {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    start?: number;
  },
): string {
  const params = new URLSearchParams();

  if (options?.autoplay) params.set('autoplay', '1');
  if (options?.mute) params.set('mute', '1');
  if (options?.controls === false) params.set('controls', '0');
  if (options?.start) params.set('start', String(options.start));

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}
