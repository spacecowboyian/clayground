import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { X } from 'lucide-react';
import { useState } from 'react';

export type PromoBannerVariant = 'sale' | 'info' | 'shipping' | 'loyalty';

interface PromoBannerProps {
  variant?: PromoBannerVariant;
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
  dismissible?: boolean;
  className?: string;
}

const variantMap: Record<PromoBannerVariant, string> = {
  sale:     'bg-[var(--bps-red)] text-white',
  info:     'bg-[var(--bps-green-dark)] text-white',
  shipping: 'bg-[var(--bps-navy)] text-white',
  loyalty:  'bg-[var(--bps-gold)] text-[var(--bps-gray-800)]',
};

export function PromoBanner({ variant = 'sale', message, ctaLabel, ctaHref, dismissible = false, className }: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={cn('flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-center', variantMap[variant], className)}>
      <span className="flex-1 text-center">{message}</span>
      {ctaLabel && (
        <a
          href={ctaHref ?? '#'}
          className="underline font-bold whitespace-nowrap hover:opacity-80 transition-opacity"
        >
          {ctaLabel}
        </a>
      )}
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
