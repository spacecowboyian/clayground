import {
  Switch as AriaSwitch,
  Label,
  type SwitchProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface SwitchComponentProps extends SwitchProps {
  children?: React.ReactNode;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const selectedColors = {
  orange: 'group-data-[selected]:bg-[var(--accent-orange)]',
  blue: 'group-data-[selected]:bg-[var(--accent-blue)]',
  green: 'group-data-[selected]:bg-[var(--accent-green)]',
  purple: 'group-data-[selected]:bg-[var(--accent-purple)]',
};

export function Switch({
  children,
  color = 'blue',
  className,
  ...props
}: SwitchComponentProps) {
  return (
    <AriaSwitch className={cn('flex items-center gap-3 group cursor-default', className)} {...props}>
      <div
        className={cn(
          'w-12 h-6 rounded-full bg-secondary border border-border relative transition-colors',
          selectedColors[color]
        )}
      >
        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform group-data-[selected]:translate-x-6 shadow-sm" />
      </div>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </AriaSwitch>
  );
}
