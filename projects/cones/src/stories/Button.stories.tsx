import type { Meta, StoryObj } from '@storybook/react';
import { Download, Upload, Check, X, Star } from 'lucide-react';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'icon'],
    },
    color: {
      control: 'select',
      options: ['orange', 'blue', 'green', 'purple', 'red'],
    },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', color: 'orange', children: 'Primary Action' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', color: 'orange', children: 'Secondary Action' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Disabled: Story = {
  args: { variant: 'primary', color: 'orange', children: 'Disabled', isDisabled: true },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['orange', 'blue', 'green', 'purple', 'red'] as const).map((c) => (
        <Button key={c} variant="primary" color={c} className="capitalize">{c}</Button>
      ))}
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="icon" color="orange"><Download className="w-5 h-5" /></Button>
      <Button variant="icon" color="blue"><Upload className="w-5 h-5" /></Button>
      <Button variant="icon" color="green"><Check className="w-5 h-5" /></Button>
      <Button variant="icon" color="red"><X className="w-5 h-5" /></Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" color="orange">Primary</Button>
      <Button variant="secondary" color="orange">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" color="orange" isDisabled>Disabled</Button>
    </div>
  ),
};
