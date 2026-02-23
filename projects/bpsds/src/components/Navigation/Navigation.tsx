import { cn } from '../../utils/cn';
import { ShoppingCart, User, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { SearchBar } from '../SearchBar/SearchBar';
import { useState } from 'react';

export interface NavCategory {
  id: string;
  label: string;
  href?: string;
  subcategories?: Array<{ id: string; label: string; href?: string }>;
}

interface NavigationProps {
  categories?: NavCategory[];
  cartCount?: number;
  className?: string;
}

const defaultCategories: NavCategory[] = [
  { id: 'fishing', label: 'Fishing', href: '#' },
  { id: 'hunting', label: 'Hunting', href: '#' },
  { id: 'camping', label: 'Camping', href: '#' },
  { id: 'boating', label: 'Boating', href: '#' },
  { id: 'clothing', label: 'Clothing', href: '#' },
  { id: 'footwear', label: 'Footwear', href: '#' },
  { id: 'optics', label: 'Optics', href: '#' },
  { id: 'sale', label: 'Sale', href: '#' },
];

export function Navigation({ categories = defaultCategories, cartCount = 0, className }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={cn('w-full', className)}>
      {/* Top utility bar */}
      <div className="bg-[var(--bps-gray-700)] text-white text-xs py-1.5 px-4 flex items-center justify-end gap-4">
        <a href="#" className="flex items-center gap-1 hover:text-[var(--bps-gold)] transition-colors">
          <MapPin className="w-3 h-3" /> Find a Store
        </a>
        <a href="#" className="hover:text-[var(--bps-gold)] transition-colors">Order Status</a>
        <a href="#" className="hover:text-[var(--bps-gold)] transition-colors">Gift Cards</a>
      </div>

      {/* Main header */}
      <div className="bg-[var(--bps-green-dark)] text-white px-4 py-3 flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-1.5 rounded hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <div className="bg-white text-[var(--bps-green-dark)] font-bold text-sm px-2.5 py-1 rounded uppercase tracking-wider leading-tight text-center">
            <div className="text-[10px]">BASS</div>
            <div className="text-base leading-none">PRO</div>
            <div className="text-[10px]">SHOPS</div>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <SearchBar size="md" placeholder="Search products, brands, and more..." />
        </div>

        {/* Account & Cart */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="#" className="flex flex-col items-center gap-0.5 hover:text-[var(--bps-gold)] transition-colors text-xs">
            <User className="w-5 h-5" />
            <span className="hidden sm:block">Account</span>
          </a>
          <a href="#" className="relative flex flex-col items-center gap-0.5 hover:text-[var(--bps-gold)] transition-colors text-xs">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--bps-red)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:block">Cart</span>
          </a>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-[var(--bps-green)] hidden lg:block">
        <div className="flex items-center overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href ?? '#'}
              className={cn(
                'flex items-center gap-1 px-4 py-2.5 text-white text-sm font-medium whitespace-nowrap transition-colors',
                'hover:bg-[var(--bps-green-dark)] hover:text-[var(--bps-gold)]',
                cat.id === 'sale' && 'text-[var(--bps-gold)] font-bold',
              )}
            >
              {cat.label}
              {cat.subcategories && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[var(--bps-green-dark)] border-t border-white/10">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href ?? '#'}
              className="block px-4 py-3 text-white text-sm border-b border-white/10 hover:bg-[var(--bps-green)] transition-colors"
            >
              {cat.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
