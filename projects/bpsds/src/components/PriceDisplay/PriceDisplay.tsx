import { cn } from '../../utils/cn';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { price: 'text-sm', original: 'text-xs', savings: 'text-xs' },
  md: { price: 'text-lg', original: 'text-sm', savings: 'text-sm' },
  lg: { price: 'text-2xl', original: 'text-base', savings: 'text-sm' },
};

export function PriceDisplay({ price, originalPrice, currency = '$', size = 'md', className }: PriceDisplayProps) {
  const isOnSale = originalPrice !== undefined && originalPrice > price;
  const savings = isOnSale ? originalPrice - price : 0;
  const pctOff = isOnSale ? Math.round((savings / originalPrice) * 100) : 0;
  const s = sizeMap[size];

  return (
    <div className={cn('flex flex-wrap items-baseline gap-2', className)}>
      <span className={cn('font-bold', isOnSale ? 'text-[var(--bps-red)]' : 'text-[var(--bps-gray-800)]', s.price)}>
        {currency}{price.toFixed(2)}
      </span>
      {isOnSale && (
        <>
          <span className={cn('text-[var(--bps-gray-400)] line-through', s.original)}>
            {currency}{originalPrice.toFixed(2)}
          </span>
          <span className={cn('text-[var(--bps-red)] font-medium', s.savings)}>
            Save {pctOff}%
          </span>
        </>
      )}
    </div>
  );
}
