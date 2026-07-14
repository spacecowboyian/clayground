import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select/Select';

const COUNTRIES = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'ca', label: 'Canada' },
  { id: 'au', label: 'Australia' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
];

const SIZES = [
  { id: 'xs', label: 'Extra Small' },
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'Extra Large' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    hoverColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Country', placeholder: 'Select a country', options: COUNTRIES, hoverColor: 'blue' },
};

export const Sizes: Story = {
  args: { label: 'T-Shirt Size', placeholder: 'Select a size', options: SIZES, hoverColor: 'orange' },
};

export const HoverColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <Select key={c} label={`Hover: ${c}`} placeholder="Select..." options={SIZES} hoverColor={c} />
      ))}
    </div>
  ),
};
