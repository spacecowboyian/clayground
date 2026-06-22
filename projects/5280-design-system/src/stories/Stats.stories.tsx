import type { Meta, StoryObj } from '@storybook/react';
import { StatBar } from '../components/Stats/StatBar';
import { AwardBadge } from '../components/Stats/AwardBadge';
import { colors } from '../tokens';

const meta = {
  title: 'Components/Stats',
  component: StatBar,
  tags: ['autodocs'],
} satisfies Meta<typeof StatBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const StatBarStory: Story = {
  name: 'StatBar',
  render: () => <StatBar />,
};

export const AwardBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
      <AwardBadge name="Telly Award" tier="Gold · Branded Film" color={colors.gold} />
      <AwardBadge name="AVA Digital" tier="Gold · Campaign" color={colors.sky} />
      <AwardBadge name="Marcom" tier="Gold · Brand Identity" color={colors.blush} />
    </div>
  ),
};
