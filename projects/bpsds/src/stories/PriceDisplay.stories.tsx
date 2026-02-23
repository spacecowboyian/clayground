import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from '../components/PriceDisplay/PriceDisplay';

const meta = {
  title: 'BPS Components/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    price: { control: 'number' },
    originalPrice: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = { args: { price: 49.99 } };
export const OnSale: Story = { args: { price: 34.99, originalPrice: 49.99 } };
export const BigSale: Story = { args: { price: 149.99, originalPrice: 299.99 } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <PriceDisplay price={34.99} originalPrice={49.99} size="sm" />
      <PriceDisplay price={34.99} originalPrice={49.99} size="md" />
      <PriceDisplay price={34.99} originalPrice={49.99} size="lg" />
    </div>
  ),
};
