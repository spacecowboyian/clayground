import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { PriceDisplay } from '../components/PriceDisplay/PriceDisplay';
import { StarRating } from '../components/StarRating/StarRating';
import { PromoBanner } from '../components/PromoBanner/PromoBanner';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { TagGroup } from '../components/TagGroup/TagGroup';

// A standalone component for the overview page
function Overview() {
  return (
    <div className="min-h-screen bg-white font-[Arial,sans-serif]">
      {/* Promo Banner */}
      <PromoBanner variant="sale" message="🎣 SUMMER SALE — Up to 40% OFF Fishing Gear" ctaLabel="Shop Sale" dismissible />

      {/* Header mockup */}
      <div className="bg-[#1a472a] text-white px-6 py-4 flex items-center gap-6">
        <div className="bg-white text-[#1a472a] font-bold text-sm px-3 py-1 rounded">
          <div className="text-[10px]">BASS</div>
          <div className="text-base leading-none">PRO</div>
          <div className="text-[10px]">SHOPS</div>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input className="flex-1 px-3 py-2 text-gray-700 text-sm outline-none" placeholder="Search products, brands..." />
            <button className="bg-[#c9a227] px-4 py-2 text-sm font-bold text-gray-800 hover:bg-[#a88620]">GO</button>
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <span>Account</span>
          <span>Cart (2)</span>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-[#2d6a4f] flex gap-0 text-white text-sm overflow-x-auto">
        {['Fishing', 'Hunting', 'Camping', 'Boating', 'Clothing', 'Footwear', 'Optics', 'Sale'].map((c) => (
          <a key={c} href="#" className="px-4 py-2.5 hover:bg-[#1a472a] whitespace-nowrap transition-colors">
            {c}
          </a>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          className="mb-4"
          items={[
            { id: 'home', label: 'Home', href: '#' },
            { id: 'fishing', label: 'Fishing', href: '#' },
            { id: 'rods', label: 'Fishing Rods' },
          ]}
        />

        {/* Active filters */}
        <TagGroup
          className="mb-6"
          items={[
            { id: 'shimano', label: 'Brand: Shimano' },
            { id: 'medium', label: 'Power: Medium' },
            { id: 'sale', label: 'On Sale' },
          ]}
          onRemove={() => {}}
        />

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Ugly Stik Elite Rod', price: 49.99, orig: 69.99, badge: 'sale', rating: 4.5, count: 1243 },
            { title: 'Abu Garcia Revo X Combo', price: 89.99, orig: 119.99, badge: 'sale', rating: 4.6, count: 543 },
            { title: 'Shimano Stradic FL', price: 199.99, orig: undefined, badge: 'new', rating: 4.9, count: 2104 },
            { title: 'St. Croix Triumph Rod', price: 109.99, orig: 139.99, badge: 'featured', rating: 4.7, count: 388 },
          ].map((p) => (
            <div key={p.title} className="border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative bg-gray-50 aspect-square flex items-center justify-center">
                <img src={`https://placehold.co/200x200/e8f5ee/1a472a?text=${encodeURIComponent(p.title.split(' ')[0])}`} alt={p.title} className="w-full h-full object-contain p-4" />
                <div className="absolute top-2 left-2">
                  <Badge variant={p.badge as 'sale' | 'new' | 'featured'} />
                </div>
              </div>
              <div className="p-3 flex flex-col gap-1">
                <p className="text-xs font-medium text-gray-500 uppercase">Brand</p>
                <p className="text-sm font-medium text-gray-700 line-clamp-2">{p.title}</p>
                <StarRating rating={p.rating} reviewCount={p.count} size="sm" />
                <PriceDisplay price={p.price} originalPrice={p.orig} size="md" />
                <Button variant="primary" size="sm" fullWidth className="mt-1">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a472a] text-white mt-16 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {[
            { title: 'Customer Service', links: ['Contact Us', 'Order Status', 'Returns & Exchanges', 'FAQs'] },
            { title: 'About Us', links: ['Our Story', 'Conservation', 'Careers', 'Press Room'] },
            { title: 'Programs', links: ['Bass Pro Club', 'Gift Cards', 'Pro Staff', 'Affiliate Program'] },
            { title: 'Shop', links: ['New Arrivals', 'Sale Items', 'Brands', 'Stores'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-[#c9a227] mb-2 uppercase tracking-wider text-xs">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/80 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20 text-xs text-white/60 text-center">
          © 2025 Bass Pro Shops. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

const meta = {
  title: 'BPS Pages/Full Page Preview',
  component: Overview,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'light' } },
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
