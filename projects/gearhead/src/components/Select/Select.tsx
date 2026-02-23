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
  hoverColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const hoverColors = {
  orange: 'hover:bg-[var(--accent-orange-light)] hover:text-[var(--accent-orange)] focus:bg-[var(--accent-orange-light)] focus:text-[var(--accent-orange)]',
  blue: 'hover:bg-[var(--accent-blue-light)] hover:text-[var(--accent-blue)] focus:bg-[var(--accent-blue-light)] focus:text-[var(--accent-blue)]',
  green: 'hover:bg-[var(--accent-green-light)] hover:text-[var(--accent-green)] focus:bg-[var(--accent-green-light)] focus:text-[var(--accent-green)]',
  purple: 'hover:bg-[var(--accent-purple-light)] hover:text-[var(--accent-purple)] focus:bg-[var(--accent-purple-light)] focus:text-[var(--accent-purple)]',
};

export function Select<T extends object>({
  label,
  description,
  placeholder = 'Select an option',
  options,
  hoverColor = 'blue',
  className,
  ...props
}: SelectComponentProps<T>) {
  return (
    <AriaSelect className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <Button className="flex items-center justify-between px-3 py-2 bg-input rounded-lg border border-border text-foreground hover:bg-secondary transition-colors outline-none focus:ring-2 focus:ring-ring">
        <SelectValue placeholder={placeholder} className="text-sm" />
        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </Button>
      {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
      <FieldError className="text-xs text-destructive" />
      <Popover className="w-[--trigger-width] bg-popover rounded-lg border border-border shadow-lg overflow-hidden">
        <ListBox className="max-h-60 overflow-auto p-1">
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id as Key}
              className={cn(
                'px-3 py-2 rounded cursor-pointer text-popover-foreground outline-none transition-colors',
                hoverColors[hoverColor]
              )}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
