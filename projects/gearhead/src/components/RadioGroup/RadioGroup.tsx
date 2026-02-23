import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  Label,
  type RadioGroupProps,
  type RadioProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

type RadioColor = 'orange' | 'blue' | 'green' | 'purple' | 'red';

interface RadioGroupComponentProps extends RadioGroupProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

interface RadioComponentProps extends RadioProps {
  color?: RadioColor;
  className?: string;
  children?: React.ReactNode;
}

const radioColors: Record<RadioColor, { border: string; fill: string }> = {
  orange: {
    border: 'group-data-[selected]:border-[var(--accent-orange)]',
    fill: 'bg-[var(--accent-orange)]',
  },
  blue: {
    border: 'group-data-[selected]:border-[var(--accent-blue)]',
    fill: 'bg-[var(--accent-blue)]',
  },
  green: {
    border: 'group-data-[selected]:border-[var(--accent-green)]',
    fill: 'bg-[var(--accent-green)]',
  },
  purple: {
    border: 'group-data-[selected]:border-[var(--accent-purple)]',
    fill: 'bg-[var(--accent-purple)]',
  },
  red: {
    border: 'group-data-[selected]:border-destructive',
    fill: 'bg-destructive',
  },
};

export function RadioGroup({ label, className, children, ...props }: RadioGroupComponentProps) {
  return (
    <AriaRadioGroup className={cn('space-y-3', className)} {...props}>
      {label && <Label className="text-sm text-foreground block">{label}</Label>}
      {children}
    </AriaRadioGroup>
  );
}

export function Radio({ color = 'blue', className, children, ...props }: RadioComponentProps) {
  const colors = radioColors[color];
  return (
    <AriaRadio className={cn('flex items-center gap-2 group cursor-default', className)} {...props}>
      <div
        className={cn(
          'w-5 h-5 rounded-full border-2 border-border bg-input flex items-center justify-center transition-colors',
          colors.border
        )}
      >
        <div className={cn('w-2.5 h-2.5 rounded-full opacity-0 group-data-[selected]:opacity-100 transition-opacity', colors.fill)} />
      </div>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </AriaRadio>
  );
}
