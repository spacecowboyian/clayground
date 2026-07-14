import {
  Link as AriaLink,
  type LinkProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

type LinkColor = 'blue' | 'green' | 'orange' | 'purple' | 'default';

interface LinkComponentProps extends LinkProps {
  color?: LinkColor;
  className?: string;
  children?: React.ReactNode;
}

const linkColors: Record<LinkColor, string> = {
  blue: 'text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)]',
  green: 'text-[var(--accent-green)] hover:text-[var(--accent-green-hover)]',
  orange: 'text-[var(--accent-orange)] hover:text-[var(--accent-orange-hover)]',
  purple: 'text-[var(--accent-purple)] hover:text-[var(--accent-purple-hover)]',
  default: 'text-foreground hover:text-muted-foreground',
};

export function Link({ color = 'blue', className, children, ...props }: LinkComponentProps) {
  return (
    <AriaLink
      className={cn(
        'hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
        linkColors[color],
        className
      )}
      {...props}
    >
      {children}
    </AriaLink>
  );
}
