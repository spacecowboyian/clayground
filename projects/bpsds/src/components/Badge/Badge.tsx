import { cn } from '../../utils/cn';

export type BadgeVariant = 'sale' | 'new' | 'clearance' | 'featured' | 'exclusive' | 'limited' | 'outOfStock';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  sale:       'bg-[var(--bps-red)] text-white',
  new:        'bg-[var(--bps-green-dark)] text-white',
  clearance:  'bg-[var(--bps-orange)] text-white',
  featured:   'bg-[var(--bps-gold)] text-[var(--bps-gray-800)]',
  exclusive:  'bg-[var(--bps-navy)] text-white',
  limited:    'bg-[var(--bps-brown)] text-white',
  outOfStock: 'bg-[var(--bps-gray-400)] text-white',
};

const defaultLabels: Record<BadgeVariant, string> = {
  sale:       'SALE',
  new:        'NEW',
  clearance:  'CLEARANCE',
  featured:   'FEATURED',
  exclusive:  'EXCLUSIVE',
  limited:    'LIMITED',
  outOfStock: 'OUT OF STOCK',
};

export function Badge({ variant = 'sale', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm',
        variantClasses[variant],
        className,
      )}
    >
      {children ?? defaultLabels[variant]}
    </span>
  );
}
