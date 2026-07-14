import {
  ComboBox as AriaComboBox,
  Label,
  Input,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
  FieldError,
  Text,
  type ComboBoxProps,
  type Key,
} from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ComboBoxOption {
  id: string | number;
  label: string;
}

interface ComboBoxComponentProps<T extends object> extends Omit<ComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string;
  placeholder?: string;
  options: ComboBoxOption[];
  hoverColor?: 'orange' | 'blue' | 'green' | 'purple';
  focusColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const hoverColors = {
  orange: 'hover:bg-[var(--accent-orange-light)] hover:text-[var(--accent-orange)] focus:bg-[var(--accent-orange-light)] focus:text-[var(--accent-orange)]',
  blue: 'hover:bg-[var(--accent-blue-light)] hover:text-[var(--accent-blue)] focus:bg-[var(--accent-blue-light)] focus:text-[var(--accent-blue)]',
  green: 'hover:bg-[var(--accent-green-light)] hover:text-[var(--accent-green)] focus:bg-[var(--accent-green-light)] focus:text-[var(--accent-green)]',
  purple: 'hover:bg-[var(--accent-purple-light)] hover:text-[var(--accent-purple)] focus:bg-[var(--accent-purple-light)] focus:text-[var(--accent-purple)]',
};

const focusColors = {
  orange: 'focus:ring-[var(--accent-orange)]',
  blue: 'focus:ring-[var(--accent-blue)]',
  green: 'focus:ring-[var(--accent-green)]',
  purple: 'focus:ring-[var(--accent-purple)]',
};

export function ComboBox<T extends object>({
  label,
  description,
  placeholder = 'Search...',
  options,
  hoverColor = 'purple',
  focusColor = 'purple',
  className,
  ...props
}: ComboBoxComponentProps<T>) {
  return (
    <AriaComboBox className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <div className="relative flex">
        <Input
          placeholder={placeholder}
          className={cn(
            'flex-1 px-3 py-2 pr-9 bg-input rounded-lg border border-border text-foreground',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0',
            focusColors[focusColor]
          )}
        />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded transition-colors">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
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
    </AriaComboBox>
  );
}
