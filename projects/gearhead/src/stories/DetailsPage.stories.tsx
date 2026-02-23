import type { Meta, StoryObj } from '@storybook/react';
import { Edit, Trash2, Mail, Phone, Globe, MapPin, Calendar } from 'lucide-react';
import { DetailsPage } from '../components/patterns/DetailsPage/DetailsPage';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Patterns/DetailsPage',
  component: DetailsPage,
  parameters: { layout: 'fullscreen' },
  args: { title: 'Details' },
} satisfies Meta<typeof DetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserDetail: Story = {
  render: () => (
    <DetailsPage
      title="Alice Johnson"
      description="Member since January 2024"
      breadcrumbs={[
        { label: 'Dashboard', href: '#' },
        { label: 'Users', href: '#' },
        { label: 'Alice Johnson' },
      ]}
      badge={{ label: 'Active', color: 'green' }}
      actions={
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="w-4 h-4" />Edit</Button>
          <Button variant="destructive"><Trash2 className="w-4 h-4" />Delete</Button>
        </div>
      }
      sections={[
        {
          title: 'Contact Information',
          fields: [
            { label: 'Email', value: <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" />alice@example.com</span> },
            { label: 'Phone', value: <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground" />+1 (555) 123-4567</span> },
            { label: 'Website', value: <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-muted-foreground" />alice.dev</span> },
            { label: 'Location', value: <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-foreground" />San Francisco, CA</span> },
          ],
        },
        {
          title: 'Account Details',
          fields: [
            { label: 'Role', value: 'Administrator' },
            { label: 'Department', value: 'Engineering' },
            { label: 'Date Joined', value: <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-muted-foreground" />January 15, 2024</span> },
            { label: 'Last Login', value: 'Today at 9:42 AM' },
          ],
        },
      ]}
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-border bg-secondary/50">
            <h3 className="text-sm font-medium text-foreground mb-3">Quick Stats</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Projects</span>
                <span className="text-foreground font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasks</span>
                <span className="text-foreground font-medium">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Comments</span>
                <span className="text-foreground font-medium">239</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-secondary/50">
            <h3 className="text-sm font-medium text-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Design Systems', 'Accessibility'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[var(--accent-orange-light)] text-[var(--accent-orange)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  ),
};

export const OrderDetail: Story = {
  render: () => (
    <DetailsPage
      title="Order #ORD-2847"
      description="Placed on February 18, 2026"
      breadcrumbs={[
        { label: 'Dashboard', href: '#' },
        { label: 'Orders', href: '#' },
        { label: 'ORD-2847' },
      ]}
      badge={{ label: 'Processing', color: 'orange' }}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Refund</Button>
          <Button variant="primary" color="orange">Mark Shipped</Button>
        </div>
      }
      sections={[
        {
          title: 'Order Summary',
          fields: [
            { label: 'Order ID', value: 'ORD-2847' },
            { label: 'Customer', value: 'Bob Smith' },
            { label: 'Total', value: '$142.00' },
            { label: 'Payment', value: 'Visa •••• 4242' },
            { label: 'Shipping Method', value: 'Standard — 3-5 business days' },
            { label: 'Tracking', value: '1Z999AA10123456784' },
          ],
        },
        {
          title: 'Shipping Address',
          fields: [
            { label: 'Name', value: 'Bob Smith' },
            { label: 'Address', value: '123 Main St' },
            { label: 'City', value: 'Austin, TX 78701' },
            { label: 'Country', value: 'United States' },
          ],
        },
      ]}
    />
  ),
};

export const MinimalDetail: Story = {
  render: () => (
    <DetailsPage
      title="Project Alpha"
      breadcrumbs={[{ label: 'Projects', href: '#' }, { label: 'Project Alpha' }]}
      bodyContent={
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Project Alpha is a confidential initiative aimed at exploring next-generation
            product possibilities. This page demonstrates the DetailsPage pattern without
            a structured sidebar — just a header, badge, and rich body content area.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            The body content area is fully flexible: drop in a text editor, a media gallery,
            a timeline, a chart, or any other component.
          </p>
        </div>
      }
      badge={{ label: 'Draft', color: 'purple' }}
    />
  ),
};
