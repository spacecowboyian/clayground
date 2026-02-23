import { Badge } from '../Badge/Badge';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { StarRating } from '../StarRating/StarRating';
import { Button } from '../Button/Button';
import { cn } from '../../utils/cn';
import { ShoppingCart, Heart } from 'lucide-react';

export interface ProductCardProps {
  id?: string;
  image: string;
  imageAlt: string;
  brand?: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: 'sale' | 'new' | 'clearance' | 'featured' | 'exclusive' | 'limited' | 'outOfStock';
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  className?: string;
}

export function ProductCard({
  image,
  imageAlt,
  brand,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  isWishlisted = false,
  onAddToCart,
  onWishlist,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col bg-white border border-[var(--bps-gray-200)] rounded overflow-hidden',
        'hover:shadow-[var(--shadow-lg)] transition-shadow duration-200',
        className,
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--bps-gray-50)]">
        <img
          src={image}
          alt={imageAlt}
          className="w-full aspect-square object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={badge} />
          </div>
        )}
        <button
          onClick={onWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            className={cn('w-4 h-4', isWishlisted ? 'fill-[var(--bps-red)] text-[var(--bps-red)]' : 'text-[var(--bps-gray-400)]')}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-3 flex-1">
        {brand && <p className="text-xs text-[var(--bps-gray-500)] uppercase tracking-wider font-medium">{brand}</p>}
        <h3 className="text-sm text-[var(--bps-gray-700)] line-clamp-2 leading-snug font-medium">{name}</h3>
        {rating !== undefined && (
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        )}
        <div className="mt-auto pt-2">
          <PriceDisplay price={price} originalPrice={originalPrice} size="md" />
        </div>
      </div>

      {/* Add to Cart */}
      <div className="p-3 pt-0">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onPress={onAddToCart}
          className="gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
