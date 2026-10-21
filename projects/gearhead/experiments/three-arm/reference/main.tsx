import { createRoot } from 'react-dom/client';
import '../../../src/styles/index.css';
import {
  Button, FilterSidebar, NumberField, OrderStatusTimeline, SearchField, Select, StatCard, Switch,
} from '../../../src/index';
import { DashboardPage } from '../../../src/components/patterns/DashboardPage/DashboardPage';
import type { PrintOrderStatus } from '../../../src/components/OrderStatusTimeline/OrderStatusTimeline';
import tasks from '../fixtures/tasks.json';

const c = tasks.tasks[0].content;
const statusMap: Record<string, PrintOrderStatus> = {
  'In Queue': 'waiting', Printing: 'in_progress', Done: 'complete', Cancelled: 'cancelled',
};
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
const groups = c.filters.map((f) => ({
  id: slug(f.group), label: f.group, options: f.options.map((o) => ({ id: slug(o), label: o })),
}));
const stats = c.metrics.map((m) => ({ title: m.title, value: m.value, trend: undefined, description: m.trend }));

function Page() {
  return (
    <main>
      <DashboardPage
        title={c.pageTitle}
        description={c.pageDescription}
        breadcrumbs={c.breadcrumbs.map((label, i) => ({ label, href: i < c.breadcrumbs.length - 1 ? '#' : undefined }))}
        stats={stats}
        primaryContent={
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6">
              <FilterSidebar groups={groups} className="w-full md:w-56" />
              <div className="flex-1 min-w-0 flex flex-col gap-4">
                <SearchField aria-label="Search orders" placeholder={c.searchPlaceholder} />
                <ul className="flex flex-col gap-3">
                  {c.orders.map((o) => (
                    <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3">
                      <div><div className="text-sm text-muted-foreground">{o.id}</div><div className="font-medium">{o.name}</div></div>
                      <OrderStatusTimeline status={statusMap[o.status]} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <section aria-labelledby="settings" className="flex flex-col gap-4 max-w-sm">
              <h2 id="settings" className="text-lg font-medium">Settings</h2>
              <NumberField label={c.settings.quantityLabel} defaultValue={1} minValue={1} />
              <Select label={c.settings.priorityLabel} defaultSelectedKey="normal"
                options={c.settings.priorityOptions.map((p) => ({ id: p.toLowerCase(), label: p }))} />
              <Switch>{c.settings.notificationLabel}</Switch>
              <Button>{c.settings.saveLabel}</Button>
            </section>
          </div>
        }
      />
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<Page />);
