import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { Dialog } from '../components/Dialog/Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        title="Confirm Action"
        isOpen={open}
        onOpenChange={setOpen}
        trigger={<Button variant="primary" color="purple">Open Dialog</Button>}
        footer={
          <>
            <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" color="purple" onPress={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        Are you sure you want to proceed? This action cannot be undone.
      </Dialog>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        title="Delete Record"
        isOpen={open}
        onOpenChange={setOpen}
        trigger={<Button variant="destructive">Delete</Button>}
        footer={
          <>
            <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onPress={() => setOpen(false)}>Delete permanently</Button>
          </>
        }
      >
        This will permanently delete the record and all associated data.
      </Dialog>
    );
  },
};
