import { useState } from 'react';
import { PageHeader } from '../../PageHeader/PageHeader';
import { FilterSidebar, type FilterGroup } from '../../FilterSidebar/FilterSidebar';
import { ViewToggle, type ViewMode } from '../../ViewToggle/ViewToggle';
import { SearchField } from '../../SearchField/SearchField';
import { cn } from '../../../utils/cn';

interface ListPageProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string; onClick?: () => void }>;
  actions?: React.ReactNode;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  filterColor?: 'orange' | 'blue' | 'green' | 'purple';
  viewToggleColor?: 'orange' | 'blue' | 'green' | 'purple';
  children?: React.ReactNode;
  className?: string;
}

export function ListPage({
  title,
  description,
  breadcrumbs,
  actions,
  filterGroups = [],
  selectedFilters,
  onFilterChange,
  onClearFilters,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  viewMode = 'list',
  onViewModeChange,
  filterColor = 'orange',
  viewToggleColor = 'orange',
  children,
  className,
}: ListPageProps) {
  return (
    <div className={cn('flex flex-col gap-6 min-h-screen bg-background p-6', className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="flex gap-6 flex-1">
        {filterGroups.length > 0 && (
          <FilterSidebar
            groups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearFilters}
            color={filterColor}
            className="hidden md:flex"
          />
        )}

        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchField
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
                focusColor="orange"
              />
            </div>
            <ViewToggle
              value={viewMode}
              onChange={onViewModeChange ?? (() => {})}
              color={viewToggleColor}
            />
          </div>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
