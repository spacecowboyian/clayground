import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../components/SearchBar/SearchBar';

const meta = {
  title: 'BPS Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' }, layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 'md', placeholder: 'Search products, brands, and more...' },
};

export const Small: Story = { args: { size: 'sm', placeholder: 'Search...' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Search products, brands, and more...' } };

export const WithLabel: Story = {
  args: { label: 'Search Products', placeholder: 'e.g., fishing rods, hunting boots...' },
};

export const InHeader: Story = {
  render: () => (
    <div className="bg-[#1a472a] p-4 w-full max-w-2xl">
      <SearchBar size="md" placeholder="Search products, brands, and more..." />
    </div>
  ),
};
