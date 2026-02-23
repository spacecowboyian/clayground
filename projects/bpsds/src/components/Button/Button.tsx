import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

export type BpsButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'destructive' | 'link';
export type BpsButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BpsButtonProps extends AriaButtonProps {
  variant?: BpsButtonVariant;
  size?: BpsButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses: Record<BpsButtonVariant, string> = {
  primary:
    'bg-[var(--bps-green-dark)] text-white hover:bg-[var(--bps-green-hover)] border border-[var(--bps-green-dark)]',
  secondary:
    'bg-[var(--bps-gray-100)] text-[var(--bps-gray-700)] hover:bg-[var(--bps-gray-200)] border border-[var(--bps-gray-300)]',
  gold:
    'bg-[var(--bps-gold)] text-[var(--bps-gray-800)] hover:bg-[var(--bps-gold-hover)] border border-[var(--bps-gold)]',
  outline:
    'bg-transparent text-[var(--bps-green-dark)] hover:bg-[var(--bps-green-light)] border border-[var(--bps-green-dark)]',
  ghost:
    'bg-transparent text-[var(--bps-gray-700)] hover:bg-[var(--bps-gray-100)] border border-transparent',
  destructive:
    'bg-[var(--bps-red)] text-white hover:bg-[var(--bps-red-hover)] border border-[var(--bps-red)]',
  link:
    'bg-transparent text-[var(--bps-green-dark)] hover:underline border border-transparent p-0',
};

const sizeClasses: Record<BpsButtonSize, string> = {
  sm:  'px-3 py-1.5 text-xs',
  md:  'px-4 py-2 text-sm',
  lg:  'px-6 py-2.5 text-base',
  xl:  'px-8 py-3 text-lg font-semibold',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: BpsButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded transition-colors cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[var(--bps-green)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide';

  return (
    <AriaButton
      className={cn(base, variantClasses[variant], variant !== 'link' && sizeClasses[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
