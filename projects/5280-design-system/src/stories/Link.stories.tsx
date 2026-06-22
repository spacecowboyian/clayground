import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components/Link/Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: '#buttons', children: 'Text link →' },
};

export const InContext: Story = {
  render: () => (
    <p
      style={{
        fontFamily: "'Minion 3','Source Serif 4',Georgia,serif",
        fontSize: 17,
        color: '#5C6B68',
        maxWidth: '60ch',
        margin: 0,
      }}
    >
      Pine is the workhorse; red is reserved for the single most important
      action on a screen. Need a refresher? <Link href="#buttons">Read the button guidelines →</Link>
    </p>
  ),
};
