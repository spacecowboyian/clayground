import {
  ProgressBar as AriaProgressBar,
  Label,
  type ProgressBarProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface ProgressBarComponentProps extends ProgressBarProps {
  label?: string;
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
  showValue?: boolean;
  className?: string;
}

const progressColors = {
  orange: 'bg-[var(--accent-orange)]',
  blue: 'bg-[var(--accent-blue)]',
  green: 'bg-[var(--accent-green)]',
  purple: 'bg-[var(--accent-purple)]',
  red: 'bg-[var(--accent-red)]',
};

export function ProgressBar({
  label,
  color = 'blue',
  showValue = true,
  className,
  ...props
}: ProgressBarComponentProps) {
  return (
    <AriaProgressBar className={cn('flex flex-col gap-2', className)} {...props}>
      {({ percentage, valueText }) => (
        <>
          {(label || showValue) && (
            <div className="flex justify-between text-sm">
              {label && <Label className="text-foreground">{label}</Label>}
              {showValue && <span className="text-muted-foreground">{valueText}</span>}
            </div>
          )}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-300', progressColors[color])}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
