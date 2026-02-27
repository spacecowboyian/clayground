import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  defaultExpanded?: boolean;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll?: () => void;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const selectedColors = {
  orange: 'group-data-[selected]:bg-[var(--accent-orange)] group-data-[selected]:border-[var(--accent-orange)]',
  blue: 'group-data-[selected]:bg-[var(--accent-blue)] group-data-[selected]:border-[var(--accent-blue)]',
  green: 'group-data-[selected]:bg-[var(--accent-green)] group-data-[selected]:border-[var(--accent-green)]',
  purple: 'group-data-[selected]:bg-[var(--accent-purple)] group-data-[selected]:border-[var(--accent-purple)]',
};

export function FilterSidebar({
  groups,
  selectedFilters = {},
  onFilterChange,
  onClearAll,
  color = 'orange',
  className,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.id, g.defaultExpanded !== false]))
  );

  const totalSelected = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <aside className={cn('flex flex-col gap-4 w-56 flex-shrink-0', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Filters</span>
        {totalSelected > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-[var(--accent-orange)] hover:underline cursor-pointer"
          >
            Clear all ({totalSelected})
          </button>
        )}
      </div>

      {groups.map((group) => {
        const isExpanded = expandedGroups[group.id] ?? true;
        const selected = selectedFilters[group.id] ?? [];

        return (
          <div key={group.id} className="border-t border-border pt-4">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <span>{group.label}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {isExpanded && (
              <ul className="mt-3 flex flex-col gap-2">
                {group.options.map((option) => {
                  const isChecked = selected.includes(option.id);
                  return (
                    <li key={option.id}>
                      <AriaCheckbox
                        isSelected={isChecked}
                        onChange={(checked) =>
                          onFilterChange?.(group.id, option.id, checked)
                        }
                        className="flex items-center gap-2 group cursor-default"
                      >
                        <div
                          className={cn(
                            'w-4 h-4 rounded border-2 border-border bg-input flex items-center justify-center transition-colors flex-shrink-0',
                            selectedColors[color]
                          )}
                        >
                          <Check className="w-2.5 h-2.5 text-white opacity-0 group-data-[selected]:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-foreground flex-1">{option.label}</span>
                        {option.count !== undefined && (
                          <span className="text-xs text-muted-foreground">{option.count}</span>
                        )}
                      </AriaCheckbox>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
