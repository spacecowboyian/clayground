import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, Heart, Search, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'BPS Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    isDisabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddToCart: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Add to Cart' },
  render: (args) => (
    <Button {...args}>
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
  ),
};

export const ShopNow: Story = {
  args: { variant: 'gold', size: 'xl', children: 'Shop Now' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button variant="primary">Primary (Add to Cart)</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="gold">Gold (Shop Now)</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Remove Item</Button>
      <Button variant="link">View Details</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" size="xl">X-Large</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-72 p-4">
      <Button variant="primary" size="lg" fullWidth>
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Out of Stock', isDisabled: true },
};
