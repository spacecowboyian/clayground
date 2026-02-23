import {
  TagGroup as AriaTagGroup,
  TagList,
  Tag,
  Label,
  type TagGroupProps,
  type TagProps,
} from 'react-aria-components';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TagItem {
  id: string;
  label: string;
}

interface TagGroupComponentProps extends Omit<TagGroupProps, 'children'> {
  label?: string;
  items: TagItem[];
  className?: string;
}

export function TagGroup({ label, items, className, ...props }: TagGroupComponentProps) {
  return (
    <AriaTagGroup className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--bps-gray-600)]">{label}</Label>}
      <TagList className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag
            key={item.id}
            id={item.id}
            textValue={item.label}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[var(--bps-green-light)] text-[var(--bps-green-dark)] border border-[var(--bps-green)] cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[var(--bps-green)] hover:bg-[var(--bps-green)] hover:text-white transition-colors"
          >
            {({ allowsRemoving }) => (
              <>
                {item.label}
                {allowsRemoving && (
                  <span slot="remove" aria-label="Remove" className="ml-0.5 opacity-60 hover:opacity-100">
                    <X className="w-3 h-3" />
                  </span>
                )}
              </>
            )}
          </Tag>
        ))}
      </TagList>
    </AriaTagGroup>
  );
}
