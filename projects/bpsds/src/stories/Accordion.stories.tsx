import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion/Accordion';

const meta = {
  title: 'BPS Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FAQ: Story = {
  args: {
    items: [
      { id: 'shipping', title: 'What are the shipping options?', content: 'We offer standard (5-7 days), expedited (2-3 days), and overnight shipping. Orders over $50 qualify for free standard shipping.' },
      { id: 'returns', title: 'What is the return policy?', content: 'Most items can be returned within 60 days of purchase. Items must be in original, unused condition with tags attached. Some exceptions apply.' },
      { id: 'warranty', title: 'How do I register my product warranty?', content: 'Visit the manufacturer\'s website to register your product warranty. Most fishing rods come with a 1-7 year warranty depending on the brand.' },
      { id: 'price-match', title: 'Does Bass Pro Shops price match?', content: 'Yes! We\'ll match the price of any identical item sold by a competitor. Simply bring proof of the lower price in-store or contact us online.' },
    ],
  },
};

export const FilterAccordion: Story = {
  args: {
    allowsMultipleExpanded: true,
    items: [
      { id: 'brand', title: 'Brand', content: 'Brand filter options here...' },
      { id: 'price', title: 'Price Range', content: 'Price range slider here...' },
      { id: 'rating', title: 'Customer Rating', content: 'Rating filter here...' },
    ],
  },
};
