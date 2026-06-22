import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/Footer/Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#FBF9F5', padding: 24 }}>
      <Footer />
    </div>
  ),
};
