import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '../components/RadioGroup/RadioGroup';

const meta = {
  title: 'BPS Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortOptions: Story = {
  render: () => (
    <RadioGroup label="Sort Results">
      <Radio value="best">Best Match</Radio>
      <Radio value="price-asc">Price: Low to High</Radio>
      <Radio value="price-desc">Price: High to Low</Radio>
      <Radio value="rating">Customer Rating</Radio>
      <Radio value="newest">Newest Arrivals</Radio>
    </RadioGroup>
  ),
};

export const RodAction: Story = {
  render: () => (
    <RadioGroup label="Rod Action">
      <Radio value="extra-fast">Extra Fast</Radio>
      <Radio value="fast">Fast</Radio>
      <Radio value="moderate-fast">Moderate Fast</Radio>
      <Radio value="moderate">Moderate</Radio>
    </RadioGroup>
  ),
};
