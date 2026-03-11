import { cn } from '../../utils/cn';

interface CardProps {
  /** Main body content. Grows to fill available height, pushing the footer down. */
  children: React.ReactNode;
  /**
   * Optional footer content (e.g. action buttons). Always rendered at the
   * bottom of the card regardless of how much body content is present.
   */
  footer?: React.ReactNode;
  /** Extra classes applied to the outer card wrapper. */
  className?: string;
  /** Extra classes applied to the body (content) area. Defaults to `p-4 space-y-3`. */
  bodyClassName?: string;
}

/**
 * Generic content card with an optional footer that is locked to the bottom of
 * the card. Useful in grid layouts where cards in the same row may have
 * different amounts of content but should share a consistent action-bar position.
 */
export function Card({ children, footer, className, bodyClassName }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--card)] rounded-xl border border-[var(--border)] flex flex-col',
        className
      )}
    >
      <div className={cn('flex-1 p-4 space-y-3', bodyClassName)}>{children}</div>
      {footer && (
        <div className="px-4 py-2 border-t border-[var(--border)]">
          {footer}
        </div>
      )}
    </div>
  );
}
