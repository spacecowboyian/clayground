import type { Meta, StoryObj } from '@storybook/react';
import { Heart, Star, Check, Bell } from 'lucide-react';
import { ToggleButton } from '../components/ToggleButton/ToggleButton';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'orange', children: 'Toggle me' },
};

export const Favorite: Story = {
  args: { color: 'orange', children: (<><Star className="w-4 h-4" />Favorite</>) as any },
};

export const Disabled: Story = {
  args: { color: 'blue', isDisabled: true, children: 'Disabled toggle' },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToggleButton color="orange"><Star className="w-4 h-4" />Favorite</ToggleButton>
      <ToggleButton color="blue"><Heart className="w-4 h-4" />Like</ToggleButton>
      <ToggleButton color="green"><Check className="w-4 h-4" />Done</ToggleButton>
      <ToggleButton color="purple"><Bell className="w-4 h-4" />Notify</ToggleButton>
    </div>
  ),
};

export const AllSelected: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToggleButton color="orange" defaultSelected><Star className="w-4 h-4" />Favorite</ToggleButton>
      <ToggleButton color="blue" defaultSelected><Heart className="w-4 h-4" />Like</ToggleButton>
      <ToggleButton color="green" defaultSelected><Check className="w-4 h-4" />Done</ToggleButton>
      <ToggleButton color="purple" defaultSelected><Bell className="w-4 h-4" />Notify</ToggleButton>
    </div>
  ),
};
