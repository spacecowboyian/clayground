import { useState } from 'react';
import { Heart, RotateCcw, X } from 'lucide-react';
import { Button, cn } from '@gearhead/ui';
import { profiles, type Profile } from '../../data/profiles';
import { SwipeCard, type SwipeDirection } from './SwipeCard';
import { MatchPanel } from './MatchPanel';
import emptyDistrict from '../../assets/empty-district.webp';

const FLING_MS = 300;

export function SwipeDeck() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<SwipeDirection | null>(null);
  const [match, setMatch] = useState<Profile | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const current = profiles[index];
  const visible = profiles.slice(index, index + 3);
  const busy = leaving !== null || match !== null;

  function swipe(direction: SwipeDirection) {
    if (!current || busy) return;
    setLeaving(direction);
    setAnnouncement(direction === 'right' ? `You'd like to court ${current.name}.` : `You passed on ${current.name}.`);
    window.setTimeout(() => {
      setLeaving(null);
      setIndex((i) => i + 1);
      if (direction === 'right' && current.likesYouBack) setMatch(current);
    }, FLING_MS);
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="relative flex-1">
        {visible.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <img src={emptyDistrict} alt="" width={800} height={800} className="mb-2 w-40 rounded-md" />
            <p className="font-display text-xl text-[var(--churn-paper)]">That's everyone in the district.</p>
            <p className="text-sm text-muted-foreground">New singles arrive after Sunday service. Or after a very large wedding.</p>
            <Button variant="outline" onPress={() => setIndex(0)} className="mt-2">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
            </Button>
          </div>
        )}
        {[...visible].reverse().map((profile) => {
          const depth = visible.indexOf(profile);
          return (
            <SwipeCard
              key={profile.id}
              profile={profile}
              depth={depth}
              isTop={depth === 0}
              leaving={depth === 0 ? leaving ?? undefined : undefined}
              onSwipe={swipe}
            />
          );
        })}
        {match && <MatchPanel profile={match} onClose={() => setMatch(null)} />}
      </div>

      <div className="flex items-center justify-center gap-6 py-4">
        <DeckButton label="Pass" onPress={() => swipe('left')} isDisabled={!current || busy} tone="pass">
          <X className="h-7 w-7" aria-hidden="true" />
        </DeckButton>
        <DeckButton label="Court" onPress={() => swipe('right')} isDisabled={!current || busy} tone="court">
          <Heart className="h-7 w-7" aria-hidden="true" />
        </DeckButton>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

interface DeckButtonProps {
  label: string;
  tone: 'pass' | 'court';
  isDisabled: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

function DeckButton({ label, tone, isDisabled, onPress, children }: DeckButtonProps) {
  return (
    <Button
      variant="icon"
      aria-label={label}
      isDisabled={isDisabled}
      onPress={onPress}
      className={cn(
        'h-14 w-14 rounded-full bg-[var(--churn-paper)] shadow-[0_6px_16px_rgb(0_0_0/0.4)] transition-transform hover:scale-110 data-[pressed]:scale-95',
        tone === 'pass'
          ? 'text-[var(--quilt-wine)]'
          : 'text-[var(--quilt-moss)]',
      )}
    >
      {children}
    </Button>
  );
}
