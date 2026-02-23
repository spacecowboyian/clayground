import {
  SearchField as AriaSearchField,
  Label,
  Input,
  Button,
  FieldError,
  Text,
  type SearchFieldProps,
} from 'react-aria-components';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchFieldComponentProps extends SearchFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  focusColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const focusColors = {
  orange: 'focus:ring-[var(--accent-orange)]',
  blue: 'focus:ring-[var(--accent-blue)]',
  green: 'focus:ring-[var(--accent-green)]',
  purple: 'focus:ring-[var(--accent-purple)]',
};

export function SearchField({
  label,
  description,
  placeholder = 'Search...',
  focusColor = 'purple',
  className,
  ...props
}: SearchFieldComponentProps) {
  return (
    <AriaSearchField className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <div className="relative">
        <Input
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-8 py-2 bg-input rounded-lg border border-border text-foreground',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0',
            focusColors[focusColor]
          )}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded transition-colors group-empty:hidden">
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
      <FieldError className="text-xs text-destructive" />
    </AriaSearchField>
  );
}
