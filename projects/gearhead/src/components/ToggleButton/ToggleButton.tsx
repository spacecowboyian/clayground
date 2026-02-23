import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

type ToggleColor = 'orange' | 'blue' | 'green' | 'purple';

interface ToggleButtonComponentProps extends ToggleButtonProps {
  color?: ToggleColor;
  className?: string;
  children?: React.ReactNode;
}

const selectedColors: Record<ToggleColor, string> = {
  orange: 'data-[selected]:bg-[var(--accent-orange)] data-[selected]:text-white data-[selected]:border-[var(--accent-orange)]',
  blue: 'data-[selected]:bg-[var(--accent-blue)] data-[selected]:text-white data-[selected]:border-[var(--accent-blue)]',
  green: 'data-[selected]:bg-[var(--accent-green)] data-[selected]:text-white data-[selected]:border-[var(--accent-green)]',
  purple: 'data-[selected]:bg-[var(--accent-purple)] data-[selected]:text-white data-[selected]:border-[var(--accent-purple)]',
};

export function ToggleButton({
  color = 'blue',
  className,
  children,
  ...props
}: ToggleButtonComponentProps) {
  return (
    <AriaToggleButton
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg',
        'hover:bg-muted transition-colors border border-border cursor-default outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        selectedColors[color],
        className
      )}
      {...props}
    >
      {children}
    </AriaToggleButton>
  );
}
