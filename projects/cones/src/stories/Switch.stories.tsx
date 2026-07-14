import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/Switch/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    isSelected: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'blue', children: 'Dark Mode' },
};

export const On: Story = {
  args: { color: 'green', defaultSelected: true, children: 'Auto-save' },
};

export const Disabled: Story = {
  args: { color: 'blue', isDisabled: true, children: 'Notifications (unavailable)' },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <Switch key={c} color={c} defaultSelected className="capitalize">{c}</Switch>
      ))}
    </div>
  ),
};
