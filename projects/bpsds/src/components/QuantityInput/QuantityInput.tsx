import {
  NumberField,
  Label,
  Group,
  Input,
  Button,
  type NumberFieldProps,
} from 'react-aria-components';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuantityInputProps extends NumberFieldProps {
  label?: string;
  className?: string;
}

export function QuantityInput({ label = 'Quantity', className, ...props }: QuantityInputProps) {
  return (
    <NumberField
      minValue={1}
      defaultValue={1}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    >
      {label && (
        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--bps-gray-600)]">
          {label}
        </Label>
      )}
      <Group className="flex items-center border border-[var(--bps-gray-300)] rounded overflow-hidden w-fit">
        <Button
          slot="decrement"
          className="flex items-center justify-center w-9 h-9 bg-[var(--bps-gray-100)] hover:bg-[var(--bps-gray-200)] text-[var(--bps-gray-600)] transition-colors cursor-default disabled:opacity-40"
        >
          <Minus className="w-3.5 h-3.5" />
        </Button>
        <Input className="w-12 h-9 text-center text-sm font-medium text-[var(--bps-gray-700)] border-x border-[var(--bps-gray-300)] outline-none focus:bg-[var(--bps-green-light)]" />
        <Button
          slot="increment"
          className="flex items-center justify-center w-9 h-9 bg-[var(--bps-gray-100)] hover:bg-[var(--bps-gray-200)] text-[var(--bps-gray-600)] transition-colors cursor-default disabled:opacity-40"
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </Group>
    </NumberField>
  );
}
