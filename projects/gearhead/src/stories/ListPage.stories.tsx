import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Plus, Download, User, FileText, Star } from 'lucide-react';
import { ListPage } from '../components/patterns/ListPage/ListPage';
import { Button } from '../components/Button/Button';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { type FilterGroup } from '../components/FilterSidebar/FilterSidebar';
import { type ViewMode } from '../components/ViewToggle/ViewToggle';

const meta = {
  title: 'Patterns/ListPage',
  component: ListPage,
  parameters: { layout: 'fullscreen' },
  args: { title: 'List' },
} satisfies Meta<typeof ListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFilters: FilterGroup[] = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { id: 'active', label: 'Active', count: 24 },
      { id: 'inactive', label: 'Inactive', count: 8 },
      { id: 'pending', label: 'Pending', count: 3 },
    ],
  },
  {
    id: 'role',
    label: 'Role',
    options: [
      { id: 'admin', label: 'Admin', count: 5 },
      { id: 'editor', label: 'Editor', count: 12 },
      { id: 'viewer', label: 'Viewer', count: 18 },
    ],
  },
];

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Pending' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Viewer', status: 'Active' },
];

export const ListViewWithFilters: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
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
      <ListPage
        title="Users"
        description="Manage your team members and their account permissions."
        breadcrumbs={[{ label: 'Dashboard', href: '#' }, { label: 'Users' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="w-4 h-4" />Export</Button>
            <Button variant="primary" color="orange"><Plus className="w-4 h-4" />Add User</Button>
          </div>
        }
        filterGroups={sampleFilters}
        selectedFilters={selected}
        onFilterChange={handleFilterChange}
        onClearFilters={() => setSelected({})}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search users..."
      >
        {viewMode === 'list' ? (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sampleUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                        user.status === 'Active'
                          ? 'bg-[var(--accent-green-light)] text-[var(--accent-green)]'
                          : user.status === 'Pending'
                          ? 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)]'
                          : 'bg-secondary text-muted-foreground'
                      }`}>{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleUsers.map((user) => (
              <div key={user.id} className="p-4 bg-card rounded-xl border border-border hover:border-[var(--accent-orange)] transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-[var(--accent-orange)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ListPage>
    );
  },
};

export const EmptyList: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
      <ListPage
        title="Documents"
        description="All your documents in one place."
        breadcrumbs={[{ label: 'Dashboard', href: '#' }, { label: 'Documents' }]}
        actions={
          <Button variant="primary" color="orange"><Plus className="w-4 h-4" />New Document</Button>
        }
        filterGroups={[
          {
            id: 'type',
            label: 'Type',
            options: [
              { id: 'pdf', label: 'PDF', count: 0 },
              { id: 'doc', label: 'Word', count: 0 },
            ],
          },
        ]}
        selectedFilters={selected}
        onFilterChange={(groupId, optionId, checked) => {
          setSelected((prev) => {
            const current = prev[groupId] ?? [];
            return {
              ...prev,
              [groupId]: checked ? [...current, optionId] : current.filter((id) => id !== optionId),
            };
          });
        }}
        onClearFilters={() => setSelected({})}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      >
        <EmptyState
          icon={<FileText className="w-12 h-12" />}
          title="No documents yet"
          description="Upload or create a document to get started."
          action={<Button variant="primary" color="orange"><Plus className="w-4 h-4" />New Document</Button>}
        />
      </ListPage>
    );
  },
};

export const NoFilters: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    return (
      <ListPage
        title="Favorites"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search favorites..."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleUsers.map((user) => (
            <div key={user.id} className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <Star className="w-4 h-4 text-[var(--accent-orange)]" />
              </div>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          ))}
        </div>
      </ListPage>
    );
  },
};
