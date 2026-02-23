import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

const meta = {
  title: 'BPS Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryPage: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'fishing', label: 'Fishing', href: '#' },
      { id: 'rods', label: 'Fishing Rods', href: '#' },
    ],
  },
};

export const ProductPage: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'fishing', label: 'Fishing', href: '#' },
      { id: 'rods', label: 'Fishing Rods', href: '#' },
      { id: 'spinning', label: 'Spinning Rods', href: '#' },
      { id: 'product', label: 'Ugly Stik Elite Spinning Rod 6\'6"' },
    ],
  },
};
