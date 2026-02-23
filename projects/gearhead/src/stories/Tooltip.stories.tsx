import type { Meta, StoryObj } from '@storybook/react';
import { Info, Settings } from 'lucide-react';
import { Button } from '../components/Button/Button';
import { Tooltip } from '../components/Tooltip/Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top start', 'top end', 'bottom start', 'bottom end'],
    },
    content: { control: 'text' },
    delay: { control: 'number' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline"><Info className="w-5 h-5" /></Button>,
    content: 'This is a helpful tooltip',
    delay: 300,
  },
};

export const OnButton: Story = {
  render: () => (
    <Tooltip
      trigger={<Button variant="primary" color="blue">Hover for info</Button>}
      content="Tooltips provide contextual information"
      delay={300}
    />
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-12">
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip
          key={p}
          trigger={<Button variant="outline" className="capitalize">{p}</Button>}
          content={`Placement: ${p}`}
          placement={p}
          delay={0}
        />
      ))}
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip
      trigger={<Button variant="icon" color="blue"><Settings className="w-5 h-5" /></Button>}
      content="Open settings"
      delay={300}
    />
  ),
};
