import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'accent', 'outline', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'Accent' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { variant: 'primary', icon: true, children: 'With icon' },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 26,
        background: '#fff',
        border: '1px solid #E7E1D8',
        borderRadius: 16,
        padding: 32,
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button icon>With icon</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
