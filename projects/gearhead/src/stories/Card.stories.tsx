import type { Meta, StoryObj } from '@storybook/react';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../components/Card/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Actions = () => (
  <div className="flex items-center gap-2">
    <button className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors" title="Open">
      <ExternalLink className="w-4 h-4" />
    </button>
    <button className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors" title="Edit">
      <Pencil className="w-4 h-4" />
    </button>
    <button className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors" title="Delete">
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <div>
        <p className="font-medium text-[var(--foreground)]">Uno card holder</p>
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Simple customizable card box</p>
      </div>
    ),
    footer: <Actions />,
  },
};

export const WithExtraContent: Story = {
  args: {
    children: (
      <>
        <div>
          <p className="font-medium text-[var(--foreground)]">Heart curio shelf</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Small heart-shaped trinket shelf</p>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">
          <span>Printed: </span>
          <span className="font-medium text-[var(--accent-green)]">2×</span>
        </div>
        <div className="flex gap-2 text-xs text-[var(--muted-foreground)]">
          <span>🔴 Pink</span>
          <span>🟣 Purple</span>
        </div>
      </>
    ),
    footer: <Actions />,
  },
};

/** Cards in a grid — footer is pinned to the bottom of every card regardless of content height. */
export const GridWithMixedContent: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      <Card footer={<Actions />}>
        <div>
          <p className="font-medium text-[var(--foreground)]">Heart curio shelf</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Small heart-shaped trinket shelf</p>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">
          Printed: <span className="font-medium text-[var(--accent-green)]">2×</span>
        </div>
        <div className="flex gap-2 text-xs text-[var(--muted-foreground)]">
          <span>🔴 Pink</span><span>🟣 Purple</span>
        </div>
      </Card>
      <Card footer={<Actions />}>
        <div>
          <p className="font-medium text-[var(--foreground)]">Hot Wheels shelf</p>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">
          Printed: <span className="font-medium text-[var(--accent-green)]">0×</span>
        </div>
      </Card>
      <Card footer={<Actions />}>
        <div>
          <p className="font-medium text-[var(--foreground)]">Uno card holder</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Simple customizable card box</p>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">
          Printed: <span className="font-medium text-[var(--accent-green)]">0×</span>
        </div>
      </Card>
    </div>
  ),
};

export const NoFooter: Story = {
  args: {
    children: (
      <p className="text-sm text-[var(--foreground)]">A simple card with no footer actions.</p>
    ),
  },
};
