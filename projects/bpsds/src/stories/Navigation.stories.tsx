import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '../components/Navigation/Navigation';

const meta = {
  title: 'BPS Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' }, layout: 'fullscreen' },
  argTypes: {
    cartCount: { control: 'number' },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { cartCount: 0 } };
export const WithCartItems: Story = { args: { cartCount: 3 } };
export const FullNavigation: Story = {
  render: () => (
    <div className="w-full">
      <Navigation cartCount={2} />
    </div>
  ),
};
