import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select/Select';

const meta = {
  title: 'BPS Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortBy: Story = {
  args: {
    label: 'Sort By',
    placeholder: 'Best Match',
    options: [
      { id: 'best', label: 'Best Match' },
      { id: 'price-asc', label: 'Price: Low to High' },
      { id: 'price-desc', label: 'Price: High to Low' },
      { id: 'rating', label: 'Customer Rating' },
      { id: 'newest', label: 'Newest Arrivals' },
      { id: 'bestsellers', label: 'Best Sellers' },
    ],
  },
};

export const Size: Story = {
  args: {
    label: 'Size',
    placeholder: 'Select Size',
    options: [
      { id: 'xs', label: 'XS' },
      { id: 's', label: 'S' },
      { id: 'm', label: 'M' },
      { id: 'l', label: 'L' },
      { id: 'xl', label: 'XL' },
      { id: 'xxl', label: '2XL' },
      { id: '3xl', label: '3XL' },
    ],
  },
};

export const LineWeight: Story = {
  args: {
    label: 'Line Weight',
    placeholder: 'Select Weight',
    options: [
      { id: '6', label: '6 lb' },
      { id: '8', label: '8 lb' },
      { id: '10', label: '10 lb' },
      { id: '12', label: '12 lb' },
      { id: '14', label: '14 lb' },
      { id: '17', label: '17 lb' },
      { id: '20', label: '20 lb' },
    ],
  },
};
