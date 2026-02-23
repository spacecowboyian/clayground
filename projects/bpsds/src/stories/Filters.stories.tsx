import type { Meta, StoryObj } from '@storybook/react';
import { Filters } from '../components/Filters/Filters';

const meta = {
  title: 'BPS Components/Filters',
  component: Filters,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FishingRodFilters: Story = {
  args: {
    sections: [
      {
        id: 'brand',
        title: 'Brand',
        type: 'checkbox',
        options: [
          { id: 'ugly-stik', label: 'Ugly Stik', count: 47 },
          { id: 'shimano', label: 'Shimano', count: 38 },
          { id: 'abu-garcia', label: 'Abu Garcia', count: 29 },
          { id: 'st-croix', label: 'St. Croix', count: 22 },
          { id: 'lew', label: "Lew's", count: 18 },
        ],
      },
      {
        id: 'power',
        title: 'Power',
        type: 'checkbox',
        options: [
          { id: 'ultra-light', label: 'Ultra Light', count: 15 },
          { id: 'light', label: 'Light', count: 28 },
          { id: 'medium-light', label: 'Medium Light', count: 34 },
          { id: 'medium', label: 'Medium', count: 52 },
          { id: 'medium-heavy', label: 'Medium Heavy', count: 41 },
          { id: 'heavy', label: 'Heavy', count: 23 },
        ],
      },
      {
        id: 'action',
        title: 'Action',
        type: 'checkbox',
        options: [
          { id: 'fast', label: 'Fast', count: 65 },
          { id: 'extra-fast', label: 'Extra Fast', count: 38 },
          { id: 'moderate-fast', label: 'Moderate Fast', count: 29 },
          { id: 'moderate', label: 'Moderate', count: 18 },
        ],
      },
      {
        id: 'availability',
        title: 'Availability',
        type: 'radio',
        options: [
          { id: 'all', label: 'Show All' },
          { id: 'in-stock', label: 'In Stock Only' },
          { id: 'in-store', label: 'Available In Store' },
        ],
      },
    ],
  },
};
