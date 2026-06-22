import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../components/Tabs/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content:
      'A creative storytelling agency that builds strategy, campaigns, films, and brands rooted in emotional truth.',
  },
  {
    id: 'process',
    label: 'Process',
    content:
      'Ask better questions → uncover the emotional core → build the work that moves people before it asks them to act.',
  },
  {
    id: 'results',
    label: 'Results',
    content:
      'Award-winning campaigns and films — gold-level Telly, AVA, and Marcom recognition.',
  },
];

export const Default: Story = {
  args: { tabs },
};
