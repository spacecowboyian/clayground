import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Download } from 'lucide-react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
    description: 'A brief description of what this page is about.',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Invoice #1042',
    description: 'Created on Feb 22, 2026',
    breadcrumbs: [
      { label: 'Dashboard', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: 'Invoice #1042' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Products',
    description: 'Manage your product catalog.',
    breadcrumbs: [
      { label: 'Dashboard', href: '#' },
      { label: 'Products' },
    ],
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="outline"><Download className="w-4 h-4" />Export</Button>
        <Button variant="primary" color="orange"><Plus className="w-4 h-4" />Add Product</Button>
      </div>
    ),
  },
};

export const TitleOnly: Story = {
  args: { title: 'Settings' },
};
