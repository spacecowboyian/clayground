import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from '../components/StarRating/StarRating';

const meta = {
  title: 'BPS Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    reviewCount: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showCount: { control: 'boolean' },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiveStars: Story = { args: { rating: 5, reviewCount: 1243 } };
export const FourAndHalf: Story = { args: { rating: 4.5, reviewCount: 387 } };
export const ThreeStars: Story = { args: { rating: 3, reviewCount: 42 } };

export const AllRatings: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-4">
      {[5, 4.5, 4, 3.5, 3, 2, 1].map((r) => (
        <StarRating key={r} rating={r} reviewCount={Math.floor(r * 100)} size="md" />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-4">
      <StarRating rating={4.5} reviewCount={387} size="sm" />
      <StarRating rating={4.5} reviewCount={387} size="md" />
      <StarRating rating={4.5} reviewCount={387} size="lg" />
    </div>
  ),
};
