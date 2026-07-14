import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Completed Orders',
    children: (
      <div className="p-4 space-y-2 text-sm text-[var(--muted-foreground)]">
        <p>Order #1 — Heart shelf (Pink) — Complete</p>
        <p>Order #2 — Heart shelf (Purple) — Complete</p>
        <p>Order #3 — Uno card holder (TBD) — Cancelled</p>
      </div>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Completed & Cancelled',
    badge: (
      <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
        3
      </span>
    ),
    children: (
      <div className="p-4 space-y-2 text-sm text-[var(--muted-foreground)]">
        <p>Items go here…</p>
      </div>
    ),
  },
};

export const DefaultExpanded: Story = {
  args: {
    title: 'Open by default',
    defaultExpanded: true,
    children: (
      <div className="p-4 text-sm text-[var(--muted-foreground)]">
        This accordion starts in the open state.
      </div>
    ),
  },
};
