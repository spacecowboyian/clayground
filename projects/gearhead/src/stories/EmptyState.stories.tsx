import type { Meta, StoryObj } from '@storybook/react';
import { FileSearch, Inbox } from 'lucide-react';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
    icon: <FileSearch className="w-12 h-12" />,
  },
};

export const WithAction: Story = {
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    icon: <Inbox className="w-12 h-12" />,
    action: <Button variant="primary" color="orange">Create Item</Button>,
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Nothing here',
    description: 'This section is empty.',
  },
};
