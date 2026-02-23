import {
  Tabs as AriaTabs,
  TabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps,
  type TabProps,
  type TabPanelProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

type TabColor = 'orange' | 'blue' | 'green' | 'purple';

interface TabsComponentProps extends TabsProps {
  className?: string;
  children?: React.ReactNode;
}

interface TabComponentProps extends TabProps {
  color?: TabColor;
  className?: string;
  children?: React.ReactNode;
}

interface TabPanelComponentProps extends TabPanelProps {
  className?: string;
  children?: React.ReactNode;
}

const tabColors: Record<TabColor, string> = {
  orange: 'data-[selected]:border-[var(--accent-orange)] data-[selected]:text-[var(--accent-orange)]',
  blue: 'data-[selected]:border-[var(--accent-blue)] data-[selected]:text-[var(--accent-blue)]',
  green: 'data-[selected]:border-[var(--accent-green)] data-[selected]:text-[var(--accent-green)]',
  purple: 'data-[selected]:border-[var(--accent-purple)] data-[selected]:text-[var(--accent-purple)]',
};

export function Tabs({ className, children, ...props }: TabsComponentProps) {
  return (
    <AriaTabs className={cn('w-full', className)} {...props}>
      {children}
    </AriaTabs>
  );
}

export function TabBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <TabList className={cn('flex border-b border-border', className)}>
      {children}
    </TabList>
  );
}

export function Tab({ color = 'blue', className, children, ...props }: TabComponentProps) {
  return (
    <AriaTab
      className={cn(
        'px-4 py-2 text-sm text-muted-foreground border-b-2 border-transparent',
        'hover:text-foreground transition-colors cursor-pointer outline-none',
        tabColors[color],
        className
      )}
      {...props}
    >
      {children}
    </AriaTab>
  );
}

export function TabPanel({ className, children, ...props }: TabPanelComponentProps) {
  return (
    <AriaTabPanel className={cn('p-4 text-sm text-foreground outline-none', className)} {...props}>
      {children}
    </AriaTabPanel>
  );
}
