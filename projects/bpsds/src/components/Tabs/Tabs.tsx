import {
  Tabs as AriaTabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsComponentProps extends Omit<TabsProps, 'children'> {
  items: TabItem[];
  className?: string;
}

export { Tab, TabList, TabPanel };

export function Tabs({ items, className, ...props }: TabsComponentProps) {
  return (
    <AriaTabs className={cn('flex flex-col', className)} {...props}>
      <TabList className="flex border-b border-[var(--bps-gray-200)] gap-0 overflow-x-auto">
        {items.map((item) => (
          <Tab
            key={item.id}
            id={item.id}
            className={({ isSelected }) =>
              cn(
                'px-5 py-3 text-sm font-medium cursor-default outline-none whitespace-nowrap transition-colors border-b-2 -mb-px',
                isSelected
                  ? 'text-[var(--bps-green-dark)] border-[var(--bps-green-dark)]'
                  : 'text-[var(--bps-gray-500)] border-transparent hover:text-[var(--bps-gray-700)] hover:border-[var(--bps-gray-300)]',
              )
            }
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
      {items.map((item) => (
        <TabPanel key={item.id} id={item.id} className="p-4 outline-none">
          {item.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}
