import { PageHeader } from '../../PageHeader/PageHeader';
import { StatCard } from '../../StatCard/StatCard';
import { cn } from '../../../utils/cn';

interface StatCardConfig {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    label?: string;
  };
  icon?: React.ReactNode;
  color?: 'orange' | 'blue' | 'green' | 'purple';
}

interface DashboardPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string; onClick?: () => void }>;
  actions?: React.ReactNode;
  stats?: StatCardConfig[];
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  className?: string;
}

export function DashboardPage({
  title,
  description,
  breadcrumbs,
  actions,
  stats = [],
  primaryContent,
  secondaryContent,
  className,
}: DashboardPageProps) {
  return (
    <div className={cn('flex flex-col gap-6 min-h-screen bg-background p-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

      {(primaryContent || secondaryContent) && (
        <div className="flex gap-6 flex-1">
          {primaryContent && (
            <div className="flex-1 min-w-0 rounded-xl border border-border bg-card p-6">
              {primaryContent}
            </div>
          )}
          {secondaryContent && (
            <div className="hidden md:block w-80 flex-shrink-0 rounded-xl border border-border bg-card p-6">
              {secondaryContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
