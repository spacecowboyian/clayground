import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/Slider/Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Volume', color: 'orange', defaultValue: [50] },
};

export const WithCustomFormat: Story = {
  args: {
    label: 'Brightness',
    color: 'blue',
    defaultValue: [75],
    formatValue: (v) => `${v}%`,
  },
};

export const NoLabel: Story = {
  args: { color: 'green', defaultValue: [30], showValue: false },
};

export const Disabled: Story = {
  args: { label: 'Opacity', color: 'purple', defaultValue: [80], isDisabled: true },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c, i) => (
        <Slider key={c} label={c} color={c} defaultValue={[(i + 1) * 20]} className="capitalize" />
      ))}
    </div>
  ),
};
