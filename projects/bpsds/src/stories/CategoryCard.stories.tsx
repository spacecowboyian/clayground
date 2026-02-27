import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from '../components/CategoryCard/CategoryCard';

const meta = {
  title: 'BPS Components/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/400x300/1a472a/ffffff?text=Fishing',
    imageAlt: 'Fishing',
    title: 'Fishing',
    subtitle: 'Rods, Reels, Tackle & More',
    href: '#',
  },
};

export const CategoryGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-4xl">
      {[
        { title: 'Fishing', img: '1a472a', text: 'Fishing' },
        { title: 'Hunting', img: '2d6a4f', text: 'Hunting' },
        { title: 'Camping', img: '5c3d2e', text: 'Camping' },
        { title: 'Boating', img: '1a3a5c', text: 'Boating' },
        { title: 'Clothing', img: 'c9a227', text: 'Clothing' },
        { title: 'Footwear', img: '3a7d59', text: 'Footwear' },
        { title: 'Optics', img: '333333', text: 'Optics' },
        { title: 'Sale', img: 'c0392b', text: 'SALE' },
      ].map((cat) => (
        <CategoryCard
          key={cat.title}
          image={`https://placehold.co/400x300/${cat.img}/ffffff?text=${cat.text}`}
          imageAlt={cat.title}
          title={cat.title}
          href="#"
        />
      ))}
    </div>
  ),
};
