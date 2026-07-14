import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple', 'red'] },
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showValue: { control: 'boolean' },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Loading', value: 60, color: 'blue' },
};

export const Complete: Story = {
  args: { label: 'Upload complete', value: 100, color: 'green' },
};

export const Error: Story = {
  args: { label: 'Error Rate', value: 20, color: 'red' },
};

export const NoLabel: Story = {
  args: { value: 45, color: 'purple', showValue: false },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {(['orange', 'blue', 'green', 'purple', 'red'] as const).map((c, i) => (
        <ProgressBar key={c} label={c} value={(i + 1) * 18} color={c} className="capitalize" />
      ))}
    </div>
  ),
};
