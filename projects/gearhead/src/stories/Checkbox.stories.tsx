import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    isSelected: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'blue', children: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { color: 'green', defaultSelected: true, children: 'Subscribe to newsletter' },
};

export const Disabled: Story = {
  args: { color: 'blue', isDisabled: true, children: 'Disabled option' },
};

export const DisabledChecked: Story = {
  args: { color: 'blue', isDisabled: true, defaultSelected: true, children: 'Disabled & checked' },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <Checkbox key={c} color={c} defaultSelected className="capitalize">{c}</Checkbox>
      ))}
    </div>
  ),
};
