import type { Meta, StoryObj } from '@storybook/react';
import { PromoBanner } from '../components/PromoBanner/PromoBanner';

const meta = {
  title: 'BPS Components/PromoBanner',
  component: PromoBanner,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' }, layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['sale', 'info', 'shipping', 'loyalty'] },
    message: { control: 'text' },
    ctaLabel: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
} satisfies Meta<typeof PromoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SaleBanner: Story = {
  args: {
    variant: 'sale',
    message: '🎣 SUMMER SALE — Up to 40% OFF Fishing Gear',
    ctaLabel: 'Shop Sale',
    dismissible: true,
  },
};

export const ShippingBanner: Story = {
  args: {
    variant: 'shipping',
    message: 'FREE Standard Shipping on orders $50+',
    ctaLabel: 'Learn More',
  },
};

export const LoyaltyBanner: Story = {
  args: {
    variant: 'loyalty',
    message: '⭐ Club Members earn 2X points this weekend only!',
    ctaLabel: 'Join Club',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col w-full">
      <PromoBanner variant="sale" message="🎣 SUMMER SALE — Up to 40% OFF" ctaLabel="Shop Sale" />
      <PromoBanner variant="info" message="New arrivals every week — check out the latest gear" ctaLabel="See What's New" />
      <PromoBanner variant="shipping" message="FREE Shipping on orders $50+" />
      <PromoBanner variant="loyalty" message="⭐ Club Members earn 2X points this weekend!" ctaLabel="Join Club" />
    </div>
  ),
};
