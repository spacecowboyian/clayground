import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../components/Tabs/Tabs';

const meta = {
  title: 'BPS Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' }, layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductDetailTabs: Story = {
  args: {
    items: [
      {
        id: 'description',
        label: 'Description',
        content: (
          <div className="prose max-w-none text-sm text-gray-700">
            <p>The Ugly Stik Elite Spinning Rod is built with the legendary Ugly Stik strength and Clear Tip design for ultimate sensitivity. Features a Seaguide stainless steel guides with zirconia inserts for smooth line flow.</p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>1-piece graphite/fiberglass composite blank</li>
              <li>Ugly Tuff™ guides with stainless steel frames</li>
              <li>7-year manufacturer warranty</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'specs',
        label: 'Specifications',
        content: (
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ['Length', '6\'6"'],
                ['Power', 'Medium'],
                ['Action', 'Moderate Fast'],
                ['Pieces', '1'],
                ['Line Weight', '6-14 lb'],
                ['Lure Weight', '1/4 - 3/4 oz'],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-gray-600 w-40">{k}</td>
                  <td className="py-2 text-gray-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ),
      },
      {
        id: 'reviews',
        label: 'Reviews (1,243)',
        content: <p className="text-sm text-gray-600">Customer reviews would appear here.</p>,
      },
      {
        id: 'qa',
        label: 'Q&A',
        content: <p className="text-sm text-gray-600">Customer Q&A would appear here.</p>,
      },
    ],
  },
};
