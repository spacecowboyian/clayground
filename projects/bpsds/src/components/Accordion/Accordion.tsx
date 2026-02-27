import { DisclosureGroup, Disclosure, Button, DisclosurePanel } from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowsMultipleExpanded?: boolean;
  className?: string;
}

export function Accordion({ items, allowsMultipleExpanded = false, className }: AccordionProps) {
  return (
    <DisclosureGroup
      allowsMultipleExpanded={allowsMultipleExpanded}
      className={cn('flex flex-col divide-y divide-[var(--bps-gray-200)] border border-[var(--bps-gray-200)] rounded', className)}
    >
      {items.map((item) => (
        <Disclosure key={item.id} id={item.id}>
          {({ isExpanded }) => (
            <>
              <Button
                slot="trigger"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[var(--bps-gray-700)] hover:bg-[var(--bps-gray-50)] transition-colors cursor-default outline-none focus-visible:bg-[var(--bps-gray-100)]"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[var(--bps-gray-400)] transition-transform duration-200',
                    isExpanded && 'rotate-180',
                  )}
                />
              </Button>
              <DisclosurePanel className="px-4 pb-3 text-sm text-[var(--bps-gray-600)]">
                {item.content}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
