import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';

const meta = {
  title: 'BPS Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    variant: {
      control: 'select',
      options: ['sale', 'new', 'clearance', 'featured', 'exclusive', 'limited', 'outOfStock'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sale: Story = { args: { variant: 'sale' } };
export const New: Story = { args: { variant: 'new' } };
export const Clearance: Story = { args: { variant: 'clearance' } };
export const Featured: Story = { args: { variant: 'featured' } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      {(['sale', 'new', 'clearance', 'featured', 'exclusive', 'limited', 'outOfStock'] as const).map((v) => (
        <Badge key={v} variant={v} />
      ))}
    </div>
  ),
};

export const CustomLabel: Story = {
  args: { variant: 'sale', children: '30% OFF' },
};

export const OnProductImage: Story = {
  render: () => (
    <div className="relative inline-block w-48 h-48 bg-gray-100 rounded">
      <img src="https://placehold.co/192x192/f4f4f4/999?text=Product" alt="Product" className="w-full h-full object-cover rounded" />
      <div className="absolute top-2 left-2">
        <Badge variant="sale">SAVE 25%</Badge>
      </div>
    </div>
  ),
};
