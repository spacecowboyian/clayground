import {
  SearchField,
  Label,
  Input,
  Button,
  type SearchFieldProps,
} from 'react-aria-components';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchBarProps extends SearchFieldProps {
  placeholder?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: { input: 'h-8 text-sm pl-9 pr-8', icon: 'w-4 h-4 left-2.5', clear: 'w-4 h-4 right-2' },
  md: { input: 'h-10 text-base pl-11 pr-10', icon: 'w-5 h-5 left-3', clear: 'w-4 h-4 right-3' },
  lg: { input: 'h-12 text-lg pl-13 pr-12', icon: 'w-6 h-6 left-3.5', clear: 'w-5 h-5 right-3.5' },
};

export function SearchBar({ placeholder = 'Search products, brands, and more...', label, size = 'md', className, ...props }: SearchBarProps) {
  const s = sizeClasses[size];
  return (
    <SearchField className={cn('flex flex-col gap-1 w-full', className)} {...props}>
      {label && <Label className="text-sm font-medium text-[var(--bps-gray-600)]">{label}</Label>}
      <div className="relative flex items-center">
        <Search className={cn('absolute text-[var(--bps-gray-400)] pointer-events-none', s.icon)} />
        <Input
          placeholder={placeholder}
          className={cn(
            'w-full rounded border border-[var(--bps-gray-300)] bg-white text-[var(--bps-gray-700)]',
            'outline-none focus:ring-2 focus:ring-[var(--bps-green)] focus:border-[var(--bps-green)]',
            'placeholder:text-[var(--bps-gray-400)]',
            s.input,
          )}
        />
        <Button className={cn('absolute text-[var(--bps-gray-400)] hover:text-[var(--bps-gray-600)] cursor-pointer', s.clear)}>
          <X className="w-full h-full" />
        </Button>
      </div>
    </SearchField>
  );
}
