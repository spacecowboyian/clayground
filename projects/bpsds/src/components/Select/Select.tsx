import {
  Select as AriaSelect,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  FieldError,
  Text,
  type SelectProps,
  type Key,
} from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectOption {
  id: string | number;
  label: string;
}

interface SelectComponentProps<T extends object> extends Omit<SelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export function Select<T extends object>({
  label,
  description,
  placeholder = 'Select an option',
  options,
  className,
  ...props
}: SelectComponentProps<T>) {
  return (
    <AriaSelect className={cn('flex flex-col gap-1', className)} {...props}>
      {label && <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--bps-gray-600)]">{label}</Label>}
      <Button className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-[var(--bps-gray-300)] rounded text-[var(--bps-gray-700)] hover:border-[var(--bps-green)] transition-colors outline-none focus:ring-2 focus:ring-[var(--bps-green)] text-sm min-w-[160px]">
        <SelectValue placeholder={placeholder} className="text-sm" />
        <ChevronDown className="w-4 h-4 text-[var(--bps-gray-400)] flex-shrink-0" />
      </Button>
      {description && <Text slot="description" className="text-xs text-[var(--bps-gray-500)]">{description}</Text>}
      <FieldError className="text-xs text-[var(--bps-red)]" />
      <Popover className="w-[--trigger-width] bg-white rounded border border-[var(--bps-gray-200)] shadow-[var(--shadow-lg)] overflow-hidden z-50">
        <ListBox className="max-h-60 overflow-auto p-1">
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id as Key}
              className="px-3 py-2 rounded cursor-pointer text-sm text-[var(--bps-gray-700)] outline-none hover:bg-[var(--bps-green-light)] hover:text-[var(--bps-green-dark)] transition-colors"
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
