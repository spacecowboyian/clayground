import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon';
export type ButtonColor = 'orange' | 'blue' | 'green' | 'purple' | 'red';

interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
}

const colorMap: Record<ButtonColor, { filled: string; light: string; text: string }> = {
  orange: {
    filled: 'bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white',
    light: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)]',
    text: 'text-[var(--accent-orange)] hover:bg-[var(--accent-orange-light)]',
  },
  blue: {
    filled: 'bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-hover)] text-white',
    light: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)]',
    text: 'text-[var(--accent-blue)] hover:bg-[var(--accent-blue-light)]',
  },
  green: {
    filled: 'bg-[var(--accent-green)] hover:bg-[var(--accent-green-hover)] text-white',
    light: 'bg-[var(--accent-green-light)] text-[var(--accent-green)]',
    text: 'text-[var(--accent-green)] hover:bg-[var(--accent-green-light)]',
  },
  purple: {
    filled: 'bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-hover)] text-white',
    light: 'bg-[var(--accent-purple-light)] text-[var(--accent-purple)]',
    text: 'text-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)]',
  },
  red: {
    filled: 'bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white',
    light: 'bg-[var(--accent-red-light)] text-[var(--accent-red)]',
    text: 'text-[var(--accent-red)] hover:bg-[var(--accent-red-light)]',
  },
};

export function Button({
  variant = 'primary',
  color = 'orange',
  className,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg transition-colors cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<ButtonVariant, string> = {
    primary: cn('px-4 py-2', colorMap[color].filled),
    secondary: cn('px-4 py-2', colorMap[color].text),
    outline: 'px-4 py-2 bg-transparent text-foreground border border-border hover:bg-muted',
    ghost: 'px-4 py-2 bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
    destructive: 'px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90',
    icon: 'p-2',
  };

  return (
    <AriaButton
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
