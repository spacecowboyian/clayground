import { useRef, useState, type PointerEvent } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@gearhead/ui';
import type { Profile } from '../../data/profiles';
import { ProfileArt } from '../ProfileArt/ProfileArt';

export type SwipeDirection = 'left' | 'right';

interface SwipeCardProps {
  profile: Profile;
  isTop: boolean;
  depth: number;
  leaving?: SwipeDirection;
  onSwipe: (direction: SwipeDirection) => void;
}

const THRESHOLD = 90;

export function SwipeCard({ profile, isTop, depth, leaving, onSwipe }: SwipeCardProps) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  function handleDown(e: PointerEvent<HTMLDivElement>) {
    if (!isTop || leaving) return;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (dragging) setDx(e.clientX - startX.current);
  }

  function handleUp() {
    if (!dragging) return;
    setDragging(false);
    if (Math.abs(dx) > THRESHOLD) onSwipe(dx > 0 ? 'right' : 'left');
    else setDx(0);
  }

  const offset = leaving ? (leaving === 'right' ? 600 : -600) : dx;
  const transform = isTop
    ? `translateX(${offset}px) rotate(${offset / 14}deg)`
    : `translateY(${depth * 10}px) scale(${1 - depth * 0.04})`;
  const lean: SwipeDirection | null = leaving ?? (dx > 30 ? 'right' : dx < -30 ? 'left' : null);
  const stampOpacity = leaving ? 1 : Math.min(Math.abs(dx) / THRESHOLD, 1);

  return (
    <div
      className={cn(
        'swipe-card absolute inset-0 select-none overflow-hidden rounded-2xl bg-[var(--quilt-ground)] shadow-[0_18px_40px_rgb(0_0_0/0.45)]',
        isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
        !dragging && 'is-settling',
        leaving && 'opacity-0',
      )}
      style={{ transform, zIndex: 10 - depth }}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      aria-hidden={!isTop}
    >
      <ProfileArt profile={profile} className="h-full w-full" />

      {lean && (
        <span
          className={cn(
            'font-display absolute top-6 z-10 rounded-md border-4 bg-[var(--churn-paper)] px-3 py-1 text-2xl font-black uppercase tracking-wider',
            lean === 'right'
              ? 'left-5 -rotate-12 border-[var(--quilt-moss)] text-[var(--quilt-moss)]'
              : 'right-5 rotate-12 border-[var(--quilt-wine)] text-[var(--quilt-wine)]',
          )}
          style={{ opacity: stampOpacity }}
          aria-hidden="true"
        >
          {lean === 'right' ? 'Court' : 'Pass'}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-[var(--churn-paper)]">
        <h3 className="font-display text-[1.7rem] font-semibold leading-none">
          {profile.name} <span className="font-normal">{profile.age}</span>
        </h3>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-[var(--churn-muted)]">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {profile.distance}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-snug">{profile.bio}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Interests">
          {profile.interests.map((interest) => (
            <li key={interest} className="rounded-full border border-[var(--churn-paper)]/25 px-2 py-0.5 text-xs">
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
