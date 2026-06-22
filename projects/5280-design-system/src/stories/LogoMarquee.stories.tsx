import type { Meta, StoryObj } from '@storybook/react';
import { LogoMarquee } from '../components/LogoMarquee/LogoMarquee';

const meta = {
  title: 'Components/Logo Marquee',
  component: LogoMarquee,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LogoMarquee>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <LogoMarquee />
    </div>
  ),
};
