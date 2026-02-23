import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
const textMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

function Star({ filled, partial, size }: { filled: boolean; partial: number; size: string }) {
  const id = `partial-${Math.random().toString(36).slice(2)}`;
  return (
    <svg viewBox="0 0 20 20" className={size} aria-hidden="true">
      {partial > 0 && partial < 1 && (
        <defs>
          <linearGradient id={id}>
            <stop offset={`${partial * 100}%`} stopColor="var(--bps-gold)" />
            <stop offset={`${partial * 100}%`} stopColor="var(--bps-gray-300)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1l2.39 4.84L18 6.76l-4 3.9.94 5.5L10 13.77l-4.94 2.39.94-5.5-4-3.9 5.61-.92z"
        fill={filled ? 'var(--bps-gold)' : partial > 0 && partial < 1 ? `url(#${id})` : 'var(--bps-gray-300)'}
      />
    </svg>
  );
}

export function StarRating({ rating, maxRating = 5, reviewCount, size = 'md', showCount = true, className }: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => {
    const diff = rating - i;
    if (diff >= 1) return { filled: true, partial: 1 };
    if (diff > 0) return { filled: false, partial: diff };
    return { filled: false, partial: 0 };
  });

  return (
    <div className={cn('flex items-center gap-1', className)} aria-label={`Rating: ${rating} out of ${maxRating}`}>
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <Star key={i} filled={s.filled} partial={s.partial} size={sizeMap[size]} />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={cn('text-[var(--bps-gray-500)]', textMap[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
