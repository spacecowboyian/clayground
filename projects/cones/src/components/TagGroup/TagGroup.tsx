import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  Tag as AriaTag,
  Label,
  type TagGroupProps,
  type TagProps,
} from 'react-aria-components';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

type TagColor = 'orange' | 'blue' | 'green' | 'purple' | 'default';

interface TagGroupComponentProps extends TagGroupProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

interface TagComponentProps extends TagProps {
  color?: TagColor;
  className?: string;
  children?: React.ReactNode;
}

export function TagList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <AriaTagList className={cn('flex flex-wrap gap-2', className)}>{children}</AriaTagList>;
}

export function TagGroup({ label, className, children, ...props }: TagGroupComponentProps) {
  return (
    <AriaTagGroup className={cn('space-y-2', className)} {...props}>
      {label && <Label className="sr-only">{label}</Label>}
      {children}
    </AriaTagGroup>
  );
}

const tagColorMap: Record<TagColor, string> = {
  orange: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]/20',
  blue: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)] border-[var(--accent-blue)]/20',
  green: 'bg-[var(--accent-green-light)] text-[var(--accent-green)] border-[var(--accent-green)]/20',
  purple: 'bg-[var(--accent-purple-light)] text-[var(--accent-purple)] border-[var(--accent-purple)]/20',
  default: 'bg-secondary text-foreground border-border',
};

export function Tag({ color = 'default', className, children, ...props }: TagComponentProps) {
  return (
    <AriaTag
      className={cn(
        'px-3 py-1 rounded-full text-sm border outline-none cursor-default',
        'focus:ring-2 focus:ring-ring focus:ring-offset-1',
        tagColorMap[color],
        className
      )}
      {...props}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <span slot="remove" className="ml-1 inline-flex">
              <X className="w-3 h-3" />
            </span>
          )}
        </>
      )}
    </AriaTag>
  );
}
