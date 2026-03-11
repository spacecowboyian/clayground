import { useContext } from 'react';
import {
  Disclosure,
  DisclosurePanel,
  Button,
  Heading,
  DisclosureStateContext,
  type DisclosureProps,
} from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

// Omit 'children' from DisclosureProps so we can redefine it as React.ReactNode
// (Disclosure accepts a render function for children; we wrap that detail internally)
interface AccordionProps extends Omit<DisclosureProps, 'children'> {
  title: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function AccordionTrigger({ title, badge }: { title: React.ReactNode; badge?: React.ReactNode }) {
  const state = useContext(DisclosureStateContext);
  const isOpen = state?.isOpen ?? false;
  return (
    <Button
      slot="trigger"
      className={cn(
        'flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
        'bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)]'
      )}
    >
      <span className="font-medium text-sm text-[var(--foreground)] flex items-center gap-2">
        {title}
        {badge}
      </span>
      <ChevronDown
        className={cn(
          'w-4 h-4 text-[var(--muted-foreground)] transition-transform duration-200 shrink-0',
          isOpen && 'rotate-180'
        )}
      />
    </Button>
  );
}

export function Accordion({ title, badge, children, className, ...props }: AccordionProps) {
  return (
    <Disclosure
      className={cn('border border-[var(--border)] rounded-xl overflow-hidden', className)}
      {...props}
    >
      <Heading>
        <AccordionTrigger title={title} badge={badge} />
      </Heading>
      <DisclosurePanel className="bg-[var(--card)]">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
}
