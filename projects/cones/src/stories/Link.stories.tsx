import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components/Link/Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['blue', 'green', 'orange', 'purple', 'default'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'blue', children: 'Click here', href: '#' },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link color="blue" href="#">Blue Link</Link>
      <Link color="green" href="#">Green Link</Link>
      <Link color="orange" href="#">Orange Link</Link>
      <Link color="purple" href="#">Purple Link</Link>
      <Link color="default" href="#">Default Link</Link>
    </div>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <p className="text-foreground text-sm max-w-sm">
      Check out our{' '}
      <Link color="blue" href="#">documentation</Link>
      {' '}or{' '}
      <Link color="purple" href="#">get started</Link>
      {' '}with the tutorials.
    </p>
  ),
};
