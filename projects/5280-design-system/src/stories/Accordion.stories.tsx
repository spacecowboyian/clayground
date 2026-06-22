import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    question: 'What does brand-first mean?',
    answer:
      'We start with the "why" behind everything you do, then build creative that resonates — not just creative that looks good.',
  },
  {
    question: 'Do you work remotely?',
    answer:
      "We're based in St. Joseph, MO and partner with clients anywhere their story takes us.",
  },
  {
    question: 'What\'s "faith-based"?',
    answer:
      'It means doing our best work with clients who morally and ethically align with our values.',
  },
];

export const Default: Story = {
  args: { items },
};
