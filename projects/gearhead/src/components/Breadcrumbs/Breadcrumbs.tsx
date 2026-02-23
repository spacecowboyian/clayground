import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb,
  Link,
  type BreadcrumbsProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

interface BreadcrumbsComponentProps extends Omit<BreadcrumbsProps<BreadcrumbItem>, 'children'> {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = '/',
  className,
  ...props
}: BreadcrumbsComponentProps) {
  return (
    <AriaBreadcrumbs className={cn('flex items-center gap-2 text-sm', className)} {...props}>
      {items.map((item, index) => (
        <Breadcrumb key={item.id} id={item.id} className="flex items-center gap-2">
          <Link
            href={item.href ?? '#'}
            className={cn(
              'transition-colors hover:text-[var(--accent-blue)] outline-none focus:underline',
              index === items.length - 1
                ? 'text-foreground cursor-default pointer-events-none'
                : 'text-muted-foreground'
            )}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <span className="text-muted-foreground">{separator}</span>
          )}
        </Breadcrumb>
      ))}
    </AriaBreadcrumbs>
  );
}
