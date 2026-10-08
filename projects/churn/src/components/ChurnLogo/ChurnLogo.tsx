import { cn } from '@gearhead/ui';

interface ChurnLogoProps {
  className?: string;
}

/** Wordmark: a butter churn standing in for the dot on a dating-app flame. */
export function ChurnLogo({ className }: ChurnLogoProps) {
  return (
    <span className={cn('font-display inline-flex items-center gap-1.5 font-semibold tracking-[-0.02em] text-[var(--churn-butter)]', className)}>
      <svg viewBox="0 0 24 32" className="h-[1.05em] w-auto" aria-hidden="true">
        <rect x="11" y="0" width="2" height="10" rx="1" fill="var(--churn-paper)" />
        <path d="M5 9 H19 L21 30 H3Z" fill="currentColor" />
        <rect x="3.6" y="15" width="16.8" height="2" fill="var(--churn-butter-deep)" />
        <rect x="3.2" y="23" width="17.6" height="2" fill="var(--churn-butter-deep)" />
      </svg>
      churn
    </span>
  );
}
