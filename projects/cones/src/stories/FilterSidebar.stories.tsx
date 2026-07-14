import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterSidebar, type FilterGroup } from '../components/FilterSidebar/FilterSidebar';

const sampleGroups: FilterGroup[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'electronics', label: 'Electronics', count: 42 },
      { id: 'clothing', label: 'Clothing', count: 28 },
      { id: 'books', label: 'Books', count: 15 },
      { id: 'home', label: 'Home & Garden', count: 9 },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    options: [
      { id: 'under25', label: 'Under $25', count: 30 },
      { id: '25to50', label: '$25 – $50', count: 21 },
      { id: '50to100', label: '$50 – $100', count: 18 },
      { id: 'over100', label: 'Over $100', count: 12 },
    ],
  },
  {
    id: 'rating',
    label: 'Rating',
    defaultExpanded: false,
    options: [
      { id: '4plus', label: '4★ & up', count: 55 },
      { id: '3plus', label: '3★ & up', count: 72 },
    ],
  },
];

const meta = {
  title: 'Components/FilterSidebar',
  component: FilterSidebar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { groups: [] },
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});

    const handleChange = (groupId: string, optionId: string, checked: boolean) => {
      setSelected((prev) => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked
            ? [...current, optionId]
            : current.filter((id) => id !== optionId),
        };
      });
    };

    return (
      <FilterSidebar
        groups={sampleGroups}
        selectedFilters={selected}
        onFilterChange={handleChange}
        onClearAll={() => setSelected({})}
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      category: ['electronics', 'books'],
      price: ['under25'],
    });

    const handleChange = (groupId: string, optionId: string, checked: boolean) => {
      setSelected((prev) => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked
            ? [...current, optionId]
            : current.filter((id) => id !== optionId),
        };
      });
    };

    return (
      <FilterSidebar
        groups={sampleGroups}
        selectedFilters={selected}
        onFilterChange={handleChange}
        onClearAll={() => setSelected({})}
      />
    );
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['orange', 'blue', 'green', 'purple'] as const).map((color) => (
        <FilterSidebar
          key={color}
          color={color}
          groups={[
            {
              id: 'demo',
              label: `${color.charAt(0).toUpperCase() + color.slice(1)} filters`,
              options: [
                { id: 'a', label: 'Option A' },
                { id: 'b', label: 'Option B' },
              ],
            },
          ]}
          selectedFilters={{ demo: ['a'] }}
        />
      ))}
    </div>
  ),
};
