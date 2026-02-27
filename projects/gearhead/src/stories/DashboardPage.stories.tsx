import type { Meta, StoryObj } from '@storybook/react';
import { Users, ShoppingCart, DollarSign, Activity, TrendingUp, Plus, Settings } from 'lucide-react';
import { DashboardPage } from '../components/patterns/DashboardPage/DashboardPage';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Patterns/DashboardPage',
  component: DashboardPage,
  parameters: { layout: 'fullscreen' },
  args: { title: 'Dashboard' },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const stats = [
  {
    title: 'Total Users',
    value: '12,483',
    color: 'blue' as const,
    icon: <Users className="w-5 h-5" />,
    trend: { direction: 'up' as const, value: '+5.2%', label: 'vs. last month' },
  },
  {
    title: 'Orders',
    value: '1,847',
    color: 'orange' as const,
    icon: <ShoppingCart className="w-5 h-5" />,
    trend: { direction: 'up' as const, value: '+2.1%', label: 'vs. last month' },
  },
  {
    title: 'Revenue',
    value: '$84,240',
    color: 'green' as const,
    icon: <DollarSign className="w-5 h-5" />,
    trend: { direction: 'up' as const, value: '+12.5%', label: 'vs. last month' },
  },
  {
    title: 'Bounce Rate',
    value: '42.8%',
    color: 'purple' as const,
    icon: <Activity className="w-5 h-5" />,
    trend: { direction: 'down' as const, value: '-3.1%', label: 'vs. last month' },
  },
];

const recentActivity = [
  { id: 1, user: 'Alice Johnson', action: 'Created order #2847', time: '2 min ago' },
  { id: 2, user: 'Bob Smith', action: 'Updated profile', time: '15 min ago' },
  { id: 3, user: 'Carol White', action: 'Uploaded document', time: '1 hr ago' },
  { id: 4, user: 'Dan Brown', action: 'Joined the team', time: '3 hr ago' },
  { id: 5, user: 'Eve Davis', action: 'Commented on task', time: 'Yesterday' },
];

export const Default: Story = {
  render: () => (
    <DashboardPage
      title="Dashboard"
      description="Welcome back! Here's what's happening today."
      breadcrumbs={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline"><Settings className="w-4 h-4" />Settings</Button>
          <Button variant="primary" color="orange"><Plus className="w-4 h-4" />New Report</Button>
        </div>
      }
      stats={stats}
      primaryContent={
        <div>
          <h2 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[var(--accent-green)]" />
            Revenue Over Time
          </h2>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[var(--accent-blue-light)] rounded-t-sm hover:bg-[var(--accent-blue)] transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      }
      secondaryContent={
        <div>
          <h2 className="text-base font-medium text-foreground mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.user}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      }
    />
  ),
};

export const StatsOnly: Story = {
  render: () => (
    <DashboardPage
      title="Overview"
      description="Key metrics at a glance."
      stats={stats}
    />
  ),
};

export const NoStats: Story = {
  render: () => (
    <DashboardPage
      title="Analytics"
      description="Detailed analytics and reports."
      actions={<Button variant="primary" color="orange">Export</Button>}
      primaryContent={
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
          Chart placeholder — drop in your chart library here
        </div>
      }
      secondaryContent={
        <div>
          <h2 className="text-base font-medium text-foreground mb-3">Top Pages</h2>
          <div className="flex flex-col gap-2">
            {['/home', '/products', '/about', '/contact', '/pricing'].map((page, i) => (
              <div key={page} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{page}</span>
                <span className="text-foreground">{Math.floor(1000 - i * 180)}</span>
              </div>
            ))}
          </div>
        </div>
      }
    />
  ),
};
