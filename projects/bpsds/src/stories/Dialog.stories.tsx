import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../components/Dialog/Dialog';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'BPS Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddToCartConfirmation: Story = {
  args: {
    title: 'Added to Cart!',
    triggerLabel: 'Add to Cart',
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <img src="https://placehold.co/80x80/e8f5ee/1a472a?text=Rod" alt="Rod" className="rounded" />
          <div>
            <p className="font-medium text-gray-800">Ugly Stik Elite Spinning Rod</p>
            <p className="text-sm text-gray-500">6'6" Medium</p>
            <p className="font-bold text-green-800 mt-1">$49.99</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" size="md" fullWidth>View Cart</Button>
          <Button variant="outline" size="md" fullWidth>Continue Shopping</Button>
        </div>
      </div>
    ),
  },
};

export const StoreFinderDialog: Story = {
  args: {
    title: 'Find a Store Near You',
    triggerLabel: 'Find a Store',
    children: (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-600">Enter your ZIP code to find Bass Pro Shops and Cabela's locations near you.</p>
        <input type="text" placeholder="Enter ZIP code" className="border border-gray-300 rounded px-3 py-2 text-sm" />
        <Button variant="primary" fullWidth>Search</Button>
      </div>
    ),
  },
};
