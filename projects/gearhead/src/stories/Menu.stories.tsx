import type { Meta, StoryObj } from '@storybook/react';
import { Download, Edit, Star, Trash2, Settings as SettingsIcon, User } from 'lucide-react';
import { Button } from '../components/Button/Button';
import { Menu, MenuItem, MenuSeparator } from '../components/Menu/Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Actions</Button>}>
      <MenuItem icon={<Edit className="w-4 h-4" />} hoverColor="blue">Edit</MenuItem>
      <MenuItem icon={<Download className="w-4 h-4" />} hoverColor="green">Download</MenuItem>
      <MenuItem icon={<Star className="w-4 h-4" />} hoverColor="orange">Favorite</MenuItem>
      <MenuSeparator />
      <MenuItem icon={<Trash2 className="w-4 h-4" />} variant="destructive">Delete</MenuItem>
    </Menu>
  ),
};

export const Settings: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline"><SettingsIcon className="w-4 h-4" />Settings</Button>}>
      <MenuItem icon={<User className="w-4 h-4" />}>Profile</MenuItem>
      <MenuItem icon={<SettingsIcon className="w-4 h-4" />}>Preferences</MenuItem>
      <MenuSeparator />
      <MenuItem variant="destructive">Sign out</MenuItem>
    </Menu>
  ),
};
