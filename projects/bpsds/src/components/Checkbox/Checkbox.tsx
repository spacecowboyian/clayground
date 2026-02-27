import {
  Checkbox as AriaCheckbox,
  CheckboxGroup,
  Label,
  type CheckboxProps,
  type CheckboxGroupProps,
} from 'react-aria-components';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BpsCheckboxProps extends CheckboxProps {
  className?: string;
}

export function Checkbox({ children, className, ...props }: BpsCheckboxProps) {
  return (
    <AriaCheckbox
      className={cn(
        'flex items-center gap-2 cursor-default group text-sm text-[var(--bps-gray-700)] select-none',
        className,
      )}
      {...props}
    >
      {({ isSelected, isIndeterminate, isDisabled }) => (
        <>
          <div
            className={cn(
              'flex items-center justify-center w-4 h-4 rounded-sm border-2 transition-colors',
              isSelected || isIndeterminate
                ? 'bg-[var(--bps-green-dark)] border-[var(--bps-green-dark)]'
                : 'border-[var(--bps-gray-300)] bg-white',
              isDisabled && 'opacity-50',
              'group-focus-visible:ring-2 group-focus-visible:ring-[var(--bps-green)] group-focus-visible:ring-offset-1',
            )}
          >
            {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            {isIndeterminate && <Minus className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </div>
          <span className={cn(isDisabled && 'opacity-50')}>{children}</span>
        </>
      )}
    </AriaCheckbox>
  );
}

interface CheckboxGroupComponentProps extends CheckboxGroupProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export function CheckboxGroupField({ label, className, children, ...props }: CheckboxGroupComponentProps) {
  return (
    <CheckboxGroup className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--bps-gray-600)] mb-1">{label}</Label>}
      {children}
    </CheckboxGroup>
  );
}
