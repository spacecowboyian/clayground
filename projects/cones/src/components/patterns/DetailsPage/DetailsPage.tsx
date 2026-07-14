import { PageHeader } from '../../PageHeader/PageHeader';
import { cn } from '../../../utils/cn';

export interface DetailField {
  label: string;
  value: React.ReactNode;
}

export interface DetailSection {
  title?: string;
  fields: DetailField[];
}

interface BadgeProps {
  label: string;
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
}

const badgeColors = {
  orange: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)]',
  blue: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)]',
  green: 'bg-[var(--accent-green-light)] text-[var(--accent-green)]',
  purple: 'bg-[var(--accent-purple-light)] text-[var(--accent-purple)]',
  red: 'bg-[var(--accent-red-light)] text-[var(--accent-red)]',
};

interface DetailsPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string; onClick?: () => void }>;
  badge?: BadgeProps;
  actions?: React.ReactNode;
  sections?: DetailSection[];
  sidebarContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  className?: string;
}

export function DetailsPage({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  sections,
  sidebarContent,
  bodyContent,
  className,
}: DetailsPageProps) {
  const headerTitle = (
    <div className="flex items-center gap-3">
      <span>{title}</span>
      {badge && (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            badgeColors[badge.color ?? 'blue']
          )}
        >
          {badge.label}
        </span>
      )}
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-6 min-h-screen bg-background p-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  badgeColors[badge.color ?? 'blue']
                )}
              >
                {badge.label}
              </span>
            )}
            {actions}
          </div>
        }
      />

      <div className="flex gap-6 flex-1">
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          {bodyContent && (
            <div className="rounded-xl border border-border bg-card p-6">
              {bodyContent}
            </div>
          )}

          {sections && sections.length > 0 && (
            <div className="flex flex-col gap-6">
              {sections.map((section, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  {section.title && (
                    <h2 className="text-base font-medium text-foreground mb-4">
                      {section.title}
                    </h2>
                  )}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {section.fields.map((field, j) => (
                      <div key={j} className="flex flex-col gap-0.5">
                        <dt className="text-xs text-muted-foreground uppercase tracking-wide">
                          {field.label}
                        </dt>
                        <dd className="text-sm text-foreground">{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>

        {sidebarContent && (
          <aside className="hidden md:flex w-72 flex-shrink-0 flex-col gap-4">
            {sidebarContent}
          </aside>
        )}
      </div>
    </div>
  );
}
