import type { Meta, StoryObj } from '@storybook/react';
import { QuantityInput } from '../components/QuantityInput/QuantityInput';

const meta = {
  title: 'BPS Components/QuantityInput',
  component: QuantityInput,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    label: { control: 'text' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    defaultValue: { control: 'number' },
  },
} satisfies Meta<typeof QuantityInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Quantity', defaultValue: 1 } };
export const WithMax: Story = { args: { label: 'Quantity', defaultValue: 1, maxValue: 10 } };
export const NoLabel: Story = { args: { label: '' } };
