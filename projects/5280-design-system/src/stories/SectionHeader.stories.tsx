import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';

const meta = {
  title: 'Components/Section Header',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['centered', 'marker', 'divider'],
    },
  },
} satisfies Meta<typeof SectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    variant: 'centered',
    eyebrow: 'A brand-first approach',
    title: 'We dig below the surface.',
    subtitle:
      "Most brands stop at safe messaging. We're more interested in the version that feels human, honest, and alive.",
  },
};

export const Marker: Story = {
  args: {
    variant: 'marker',
    eyebrow: '02 · Work people can feel',
    title: 'Emotion creates connection.',
  },
};

export const Divider: Story = {
  args: {
    variant: 'divider',
    label: 'Mile 5,280',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <SectionHeader
        variant="centered"
        eyebrow="A brand-first approach"
        title="We dig below the surface."
        subtitle="Most brands stop at safe messaging. We're more interested in the version that feels human, honest, and alive."
      />
      <SectionHeader
        variant="marker"
        eyebrow="02 · Work people can feel"
        title="Emotion creates connection."
      />
      <SectionHeader variant="divider" label="Mile 5,280" />
    </div>
  ),
};
