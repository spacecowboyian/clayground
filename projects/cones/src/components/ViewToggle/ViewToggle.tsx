import { LayoutList, LayoutGrid } from 'lucide-react';
import { ToggleButton as AriaToggleButton } from 'react-aria-components';
import { cn } from '../../utils/cn';

export type ViewMode = 'list' | 'grid';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const selectedColors = {
  orange: 'data-[selected]:bg-[var(--accent-orange)] data-[selected]:text-white data-[selected]:border-[var(--accent-orange)]',
  blue: 'data-[selected]:bg-[var(--accent-blue)] data-[selected]:text-white data-[selected]:border-[var(--accent-blue)]',
  green: 'data-[selected]:bg-[var(--accent-green)] data-[selected]:text-white data-[selected]:border-[var(--accent-green)]',
  purple: 'data-[selected]:bg-[var(--accent-purple)] data-[selected]:text-white data-[selected]:border-[var(--accent-purple)]',
};

const buttonBase =
  'inline-flex items-center justify-center p-2 bg-secondary text-muted-foreground border border-border transition-colors cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-muted hover:text-foreground';

export function ViewToggle({
  value,
  onChange,
  color = 'orange',
  className,
}: ViewToggleProps) {
  return (
    <div
      className={cn('flex', className)}
      role="group"
      aria-label="View mode"
    >
      <AriaToggleButton
        isSelected={value === 'list'}
        onChange={() => onChange('list')}
        aria-label="List view"
        className={cn(buttonBase, 'rounded-l-lg border-r-0', selectedColors[color])}
      >
        <LayoutList className="w-4 h-4" />
      </AriaToggleButton>
      <AriaToggleButton
        isSelected={value === 'grid'}
        onChange={() => onChange('grid')}
        aria-label="Grid view"
        className={cn(buttonBase, 'rounded-r-lg', selectedColors[color])}
      >
        <LayoutGrid className="w-4 h-4" />
      </AriaToggleButton>
    </div>
  );
}
