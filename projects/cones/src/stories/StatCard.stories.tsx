import type { Meta, StoryObj } from '@storybook/react';
import { Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';
import { StatCard } from '../components/StatCard/StatCard';

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { title: 'Metric', value: '0' },
  argTypes: {
    color: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    title: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Users',
    value: '12,483',
    description: 'Active accounts',
    color: 'blue',
  },
};

export const WithTrend: Story = {
  args: {
    title: 'Revenue',
    value: '$84,240',
    color: 'green',
    trend: {
      direction: 'up',
      value: '+12.5%',
      label: 'vs. last month',
    },
    icon: <DollarSign className="w-5 h-5" />,
  },
};

export const NegativeTrend: Story = {
  args: {
    title: 'Churn Rate',
    value: '3.2%',
    color: 'orange',
    trend: {
      direction: 'down',
      value: '-0.8%',
      label: 'vs. last month',
    },
  },
};

export const ColorPalette: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <StatCard
        title="Total Users"
        value="12,483"
        color="blue"
        icon={<Users className="w-5 h-5" />}
        trend={{ direction: 'up', value: '+5.2%', label: 'vs. last month' }}
      />
      <StatCard
        title="Orders"
        value="1,847"
        color="orange"
        icon={<ShoppingCart className="w-5 h-5" />}
        trend={{ direction: 'up', value: '+2.1%', label: 'vs. last month' }}
      />
      <StatCard
        title="Revenue"
        value="$84,240"
        color="green"
        icon={<DollarSign className="w-5 h-5" />}
        trend={{ direction: 'up', value: '+12.5%', label: 'vs. last month' }}
      />
      <StatCard
        title="Bounce Rate"
        value="42.8%"
        color="purple"
        icon={<Activity className="w-5 h-5" />}
        trend={{ direction: 'down', value: '-3.1%', label: 'vs. last month' }}
      />
    </div>
  ),
};

export const NoIcon: Story = {
  args: {
    title: 'Page Views',
    value: '98,312',
    color: 'purple',
    trend: { direction: 'neutral', value: '0%', label: 'No change' },
  },
};
