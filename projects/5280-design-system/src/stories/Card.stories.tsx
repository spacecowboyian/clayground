import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['work', 'caseStudy', 'blog'],
    },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    blurb: { control: 'text' },
    cta: { control: 'text' },
    meta: { control: 'text' },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Work: Story = {
  args: { variant: 'work' },
};

export const CaseStudy: Story = {
  args: { variant: 'caseStudy' },
};

export const Blog: Story = {
  args: { variant: 'blog' },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        gap: 18,
      }}
    >
      <Card variant="work" />
      <Card variant="caseStudy" />
      <Card variant="blog" />
    </div>
  ),
};
