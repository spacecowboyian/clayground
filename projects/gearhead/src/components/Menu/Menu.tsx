import {
  MenuTrigger,
  Button,
  Popover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  Separator,
  type MenuProps,
  type MenuItemProps,
  type ButtonProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface MenuComponentProps<T extends object> extends MenuProps<T> {
  trigger: React.ReactNode;
  className?: string;
}

interface MenuItemComponentProps extends MenuItemProps {
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
  hoverColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const itemHoverColors = {
  orange: 'hover:bg-[var(--accent-orange-light)] hover:text-[var(--accent-orange)] focus:bg-[var(--accent-orange-light)] focus:text-[var(--accent-orange)]',
  blue: 'hover:bg-[var(--accent-blue-light)] hover:text-[var(--accent-blue)] focus:bg-[var(--accent-blue-light)] focus:text-[var(--accent-blue)]',
  green: 'hover:bg-[var(--accent-green-light)] hover:text-[var(--accent-green)] focus:bg-[var(--accent-green-light)] focus:text-[var(--accent-green)]',
  purple: 'hover:bg-[var(--accent-purple-light)] hover:text-[var(--accent-purple)] focus:bg-[var(--accent-purple-light)] focus:text-[var(--accent-purple)]',
};

export function Menu<T extends object>({ trigger, children, className, ...props }: MenuComponentProps<T>) {
  return (
    <MenuTrigger>
      {trigger}
      <Popover className="min-w-48 bg-popover rounded-lg border border-border shadow-lg overflow-hidden">
        <AriaMenu className={cn('p-1', className)} {...props}>
          {children}
        </AriaMenu>
      </Popover>
    </MenuTrigger>
  );
}

export function MenuItem({
  icon,
  variant = 'default',
  hoverColor = 'blue',
  className,
  children,
  ...props
}: MenuItemComponentProps) {
  return (
    <AriaMenuItem
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded cursor-pointer outline-none transition-colors',
        variant === 'destructive'
          ? 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10'
          : cn('text-popover-foreground', itemHoverColors[hoverColor]),
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </AriaMenuItem>
  );
}

export function MenuSeparator() {
  return <Separator className="h-px bg-border my-1" />;
}
