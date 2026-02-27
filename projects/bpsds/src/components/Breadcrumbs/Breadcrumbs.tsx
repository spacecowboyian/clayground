import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb,
  Link,
  type BreadcrumbsProps,
} from 'react-aria-components';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

interface BreadcrumbsComponentProps extends Omit<BreadcrumbsProps<BreadcrumbItem>, 'children'> {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsComponentProps) {
  return (
    <AriaBreadcrumbs
      className={cn('flex items-center flex-wrap gap-0.5 text-sm', className)}
      {...props}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <Breadcrumb key={item.id} className="flex items-center gap-0.5">
            <Link
              href={item.href}
              className={cn(
                'transition-colors outline-none focus-visible:underline',
                isLast
                  ? 'text-[var(--bps-gray-700)] font-medium pointer-events-none'
                  : 'text-[var(--bps-green-dark)] hover:underline',
              )}
            >
              {item.label}
            </Link>
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-[var(--bps-gray-400)]" />}
          </Breadcrumb>
        );
      })}
    </AriaBreadcrumbs>
  );
}
