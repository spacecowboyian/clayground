import type { Meta, StoryObj } from '@storybook/react';
import { OrderStatusTimeline } from '../components/OrderStatusTimeline/OrderStatusTimeline';

const meta = {
  title: 'Components/OrderStatusTimeline',
  component: OrderStatusTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    status: {
      control: 'select',
      options: ['Queue', 'Printing', 'Complete', 'Cancelled'],
    },
  },
} satisfies Meta<typeof OrderStatusTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InQueue: Story = {
  args: { status: 'Queue' },
};

export const Printing: Story = {
  args: { status: 'Printing' },
};

export const Complete: Story = {
  args: { status: 'Complete' },
};

export const Cancelled: Story = {
  args: { status: 'Cancelled' },
};

export const AllStates: Story = {
  args: { status: 'Queue' },
  render: () => (
    <div className="space-y-8 max-w-sm">
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Queue</p>
        <OrderStatusTimeline status="Queue" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Printing</p>
        <OrderStatusTimeline status="Printing" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Complete</p>
        <OrderStatusTimeline status="Complete" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Cancelled</p>
        <OrderStatusTimeline status="Cancelled" />
      </div>
    </div>
  ),
};
