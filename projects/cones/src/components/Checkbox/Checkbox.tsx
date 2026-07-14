import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from 'react-aria-components';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxComponentProps extends CheckboxProps {
  children?: React.ReactNode;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const selectedColors = {
  orange: 'group-data-[selected]:bg-[var(--accent-orange)] group-data-[selected]:border-[var(--accent-orange)]',
  blue: 'group-data-[selected]:bg-[var(--accent-blue)] group-data-[selected]:border-[var(--accent-blue)]',
  green: 'group-data-[selected]:bg-[var(--accent-green)] group-data-[selected]:border-[var(--accent-green)]',
  purple: 'group-data-[selected]:bg-[var(--accent-purple)] group-data-[selected]:border-[var(--accent-purple)]',
};

export function Checkbox({
  children,
  color = 'blue',
  className,
  ...props
}: CheckboxComponentProps) {
  return (
    <AriaCheckbox className={cn('flex items-center gap-2 group cursor-default', className)} {...props}>
      <div
        className={cn(
          'w-5 h-5 rounded border-2 border-border bg-input flex items-center justify-center transition-colors',
          selectedColors[color]
        )}
      >
        <Check className="w-3 h-3 text-white opacity-0 group-data-[selected]:opacity-100 transition-opacity" />
      </div>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </AriaCheckbox>
  );
}
