import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../components/ProductCard/ProductCard';

const meta = {
  title: 'BPS Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProduct = {
  image: 'https://placehold.co/300x300/e8f5ee/1a472a?text=Fishing+Rod',
  imageAlt: 'Ugly Stik Elite Spinning Rod',
  brand: 'Ugly Stik',
  name: 'Elite Spinning Rod 6\'6" Medium',
  price: 49.99,
  originalPrice: 69.99,
  rating: 4.5,
  reviewCount: 1243,
  badge: 'sale' as const,
};

export const Default: Story = { args: sampleProduct };

export const NewProduct: Story = {
  args: {
    ...sampleProduct,
    image: 'https://placehold.co/300x300/e8eef5/1a3a5c?text=Hunting+Boots',
    imageAlt: 'Danner Mountain 600 Boots',
    brand: 'Danner',
    name: 'Mountain 600 Low GTX Hiking Boots',
    price: 199.99,
    originalPrice: undefined,
    badge: 'new' as const,
    rating: 4.8,
    reviewCount: 87,
  },
};

export const Clearance: Story = {
  args: {
    ...sampleProduct,
    image: 'https://placehold.co/300x300/fff3e0/e07800?text=Jacket',
    imageAlt: 'Redhead Fleece Jacket',
    brand: 'Redhead',
    name: 'Silent Hide Fleece Jacket — Men\'s',
    price: 29.99,
    originalPrice: 79.99,
    badge: 'clearance' as const,
    rating: 3.8,
    reviewCount: 212,
  },
};

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-4xl">
      <ProductCard
        image="https://placehold.co/300x300/e8f5ee/1a472a?text=Rod"
        imageAlt="Fishing Rod" brand="Abu Garcia"
        name="Revo X Spinning Combo" price={89.99} originalPrice={119.99}
        rating={4.6} reviewCount={543} badge="sale"
      />
      <ProductCard
        image="https://placehold.co/300x300/fdf6e3/c9a227?text=Reel"
        imageAlt="Fishing Reel" brand="Shimano"
        name="Stradic FL Spinning Reel" price={199.99}
        rating={4.9} reviewCount={2104} badge="new"
      />
      <ProductCard
        image="https://placehold.co/300x300/fff3e0/e07800?text=Lures"
        imageAlt="Lure Pack" brand="Strike King"
        name="KVD 1.5 Squarebill Crankbait" price={8.49} originalPrice={12.99}
        rating={4.7} reviewCount={889} badge="clearance"
      />
      <ProductCard
        image="https://placehold.co/300x300/e8eef5/1a3a5c?text=Boots"
        imageAlt="Wading Boots" brand="Simms"
        name="Freestone Wading Boots" price={149.99} originalPrice={179.99}
        rating={4.4} reviewCount={321}
      />
    </div>
  ),
};
