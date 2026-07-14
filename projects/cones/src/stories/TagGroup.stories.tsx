import type { Meta, StoryObj } from '@storybook/react';
import { TagGroup, TagList, Tag } from '../components/TagGroup/TagGroup';

const meta = {
  title: 'Components/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TagGroup label="Categories">
      <TagList>
        <Tag color="orange">Design</Tag>
        <Tag color="blue">Development</Tag>
        <Tag color="green">Marketing</Tag>
        <Tag color="purple">Sales</Tag>
        <Tag color="default">Support</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <TagGroup label="Accents">
      <TagList>
        {(['orange', 'blue', 'green', 'purple', 'default'] as const).map((c) => (
          <Tag key={c} color={c} className="capitalize">{c}</Tag>
        ))}
      </TagList>
    </TagGroup>
  ),
};

export const TechStack: Story = {
  render: () => (
    <TagGroup label="Tech stack">
      <TagList>
        <Tag color="blue">React</Tag>
        <Tag color="orange">TypeScript</Tag>
        <Tag color="green">Tailwind CSS</Tag>
        <Tag color="purple">Vite</Tag>
        <Tag color="default">Node.js</Tag>
      </TagList>
    </TagGroup>
  ),
};
