import type { Meta, StoryObj } from '@storybook/react';
import { TagGroup } from '../components/TagGroup/TagGroup';

const meta = {
  title: 'BPS Components/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveFilters: Story = {
  args: {
    label: 'Active Filters',
    items: [
      { id: 'shimano', label: 'Brand: Shimano' },
      { id: 'in-stock', label: 'In Stock' },
      { id: 'under-100', label: 'Under $100' },
      { id: 'sale', label: 'On Sale' },
    ],
    onRemove: () => {},
  },
};

export const ProductTags: Story = {
  args: {
    label: 'Product Features',
    items: [
      { id: 'waterproof', label: 'Waterproof' },
      { id: 'lightweight', label: 'Lightweight' },
      { id: 'carbon-fiber', label: 'Carbon Fiber' },
      { id: 'graphite', label: 'Graphite Blank' },
    ],
  },
};
