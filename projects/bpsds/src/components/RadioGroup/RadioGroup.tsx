import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  Label,
  type RadioGroupProps,
  type RadioProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface RadioGroupComponentProps extends RadioGroupProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

interface RadioItemProps extends RadioProps {
  className?: string;
}

export function RadioGroup({ label, className, children, ...props }: RadioGroupComponentProps) {
  return (
    <AriaRadioGroup className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--bps-gray-600)] mb-1">{label}</Label>}
      {children}
    </AriaRadioGroup>
  );
}

export function Radio({ children, className, ...props }: RadioItemProps) {
  return (
    <AriaRadio
      className={cn(
        'flex items-center gap-2 cursor-default group text-sm text-[var(--bps-gray-700)] select-none',
        className,
      )}
      {...props}
    >
      {({ isSelected, isDisabled }) => (
        <>
          <div
            className={cn(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
              isSelected
                ? 'border-[var(--bps-green-dark)] bg-white'
                : 'border-[var(--bps-gray-300)] bg-white',
              isDisabled && 'opacity-50',
              'group-focus-visible:ring-2 group-focus-visible:ring-[var(--bps-green)] group-focus-visible:ring-offset-1',
            )}
          >
            {isSelected && (
              <div className="w-2 h-2 rounded-full bg-[var(--bps-green-dark)]" />
            )}
          </div>
          <span className={cn(isDisabled && 'opacity-50')}>{children}</span>
        </>
      )}
    </AriaRadio>
  );
}
