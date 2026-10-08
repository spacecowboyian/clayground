import { cn } from '@gearhead/ui';
import { ChurnLogo } from '../ChurnLogo/ChurnLogo';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex h-[620px] w-[330px] max-w-full flex-col rounded-[2.75rem] border-[9px] border-[var(--churn-ink)] bg-[var(--quilt-ground)] p-3 shadow-[0_30px_60px_rgb(0_0_0/0.55)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 pb-2 text-[11px] text-[var(--churn-muted)]" aria-hidden="true">
        <span>Sundown</span>
        <span>No signal (by choice)</span>
      </div>
      <div className="flex justify-center pb-3">
        <ChurnLogo className="text-xl" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
