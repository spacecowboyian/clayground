import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  type GridListProps,
  type GridListItemProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface GridListComponentProps<T extends object> extends GridListProps<T> {
  className?: string;
  children?: React.ReactNode;
}

interface GridListItemComponentProps extends GridListItemProps {
  hoverColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
  children?: React.ReactNode;
}

const itemHoverColors = {
  orange: 'hover:border-[var(--accent-orange)] focus:ring-[var(--accent-orange)]',
  blue: 'hover:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]',
  green: 'hover:border-[var(--accent-green)] focus:ring-[var(--accent-green)]',
  purple: 'hover:border-[var(--accent-purple)] focus:ring-[var(--accent-purple)]',
};

export function GridList<T extends object>({ className, children, ...props }: GridListComponentProps<T>) {
  return (
    <AriaGridList
      className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}
      {...props}
    >
      {children}
    </AriaGridList>
  );
}

export function GridListItem({
  hoverColor = 'blue',
  className,
  children,
  ...props
}: GridListItemComponentProps) {
  return (
    <AriaGridListItem
      className={cn(
        'p-4 bg-card rounded-lg border border-border transition-colors cursor-pointer',
        'outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background',
        itemHoverColors[hoverColor],
        className
      )}
      {...props}
    >
      {children}
    </AriaGridListItem>
  );
}
