import type { Meta, StoryObj } from '@storybook/react';
import { NumberField } from '../components/NumberField/NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    focusColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Quantity', defaultValue: 1, focusColor: 'orange' },
};

export const Bounded: Story = {
  args: { label: 'Percentage', defaultValue: 50, minValue: 0, maxValue: 100, step: 5, focusColor: 'blue' },
};

export const WithDescription: Story = {
  args: { label: 'Port', defaultValue: 3000, description: 'Port number (1–65535)', minValue: 1, maxValue: 65535, focusColor: 'green' },
};
