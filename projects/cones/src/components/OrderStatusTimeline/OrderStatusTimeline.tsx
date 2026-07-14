import { Fragment } from 'react';
import { cn } from '../../utils/cn';

export type PrintOrderStatus = 'waiting' | 'in_progress' | 'complete' | 'cancelled';

interface OrderStatusTimelineProps {
  status: PrintOrderStatus;
  className?: string;
}

const STEPS: Array<{ label: string }> = [
  { label: 'In Queue' },
  { label: 'Printing' },
  { label: 'Done' },
];

/** Maps a status value to the index of the active step (0-based). */
const STEP_INDEX: Record<Exclude<PrintOrderStatus, 'cancelled'>, number> = {
  waiting:     0,
  in_progress: 1,
  complete:    2,
};

/**
 * Visual timeline / progress indicator that shows an order moving through its
 * stages: In Queue → Printing → Done. Cancelled orders display a distinct
 * "Cancelled" badge instead of the timeline.
 */
export function OrderStatusTimeline({ status, className }: OrderStatusTimelineProps) {
  if (status === 'cancelled') {
    return (
      <div className={cn('flex items-center', className)}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent-red-light)] text-[var(--accent-red)]">
          <span aria-hidden="true">✕</span>
          <span>Cancelled</span>
        </span>
      </div>
    );
  }

  const currentStep = STEP_INDEX[status];

  return (
    <div className={cn('flex items-start', className)} aria-label={`Order status: ${status}`}>
      {STEPS.map((step, idx) => {
        const isComplete = status === 'complete' ? idx <= currentStep : idx < currentStep;
        const isActive = status !== 'complete' && idx === currentStep;

        const circleClass = cn(
          'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
          isComplete && 'bg-[var(--accent-green)] text-white',
          isActive && 'bg-[var(--accent-orange)] text-white',
          !isComplete && !isActive && 'bg-[var(--secondary)] text-[var(--muted-foreground)] border border-[var(--border)]',
        );

        const labelClass = cn(
          'text-xs text-center mt-1 whitespace-nowrap',
          isComplete && 'text-[var(--accent-green)] font-medium',
          isActive && 'text-[var(--accent-orange)] font-medium',
          !isComplete && !isActive && 'text-[var(--muted-foreground)]',
        );

        return (
          <Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div className={circleClass} aria-current={isActive ? 'step' : undefined}>
                {isComplete ? '✓' : idx + 1}
              </div>
              <span className={labelClass}>{step.label}</span>
            </div>

            {idx < STEPS.length - 1 && (
              <div className="flex-1 self-start mt-3.5 px-1">
                <div
                  className={cn(
                    'h-0.5 w-full transition-colors',
                    isComplete ? 'bg-[var(--accent-green)]' : 'bg-[var(--border)]',
                  )}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
