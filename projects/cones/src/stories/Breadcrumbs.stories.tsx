import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'components', label: 'Components', href: '#' },
      { id: 'current', label: 'Breadcrumbs' },
    ],
  },
};

export const Deep: Story = {
  args: {
    items: [
      { id: 'root', label: 'Clayground', href: '#' },
      { id: 'projects', label: 'Projects', href: '#' },
      { id: 'gearhead', label: 'Gearhead', href: '#' },
      { id: 'components', label: 'Components', href: '#' },
      { id: 'current', label: 'Breadcrumbs' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'current', label: 'Settings' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: '›',
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'docs', label: 'Docs', href: '#' },
      { id: 'current', label: 'API Reference' },
    ],
  },
};
