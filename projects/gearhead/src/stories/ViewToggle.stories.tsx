import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ViewToggle, type ViewMode } from '../components/ViewToggle/ViewToggle';

const meta = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { value: 'list' as ViewMode, onChange: () => {} },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [mode, setMode] = useState<ViewMode>('list');
    return (
      <div className="flex flex-col gap-4">
        <ViewToggle value={mode} onChange={setMode} />
        <p className="text-sm text-muted-foreground">Current mode: <strong className="text-foreground">{mode}</strong></p>
      </div>
    );
  },
};

export const GridSelected: Story = {
  render: () => {
    const [mode, setMode] = useState<ViewMode>('grid');
    return <ViewToggle value={mode} onChange={setMode} />;
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['orange', 'blue', 'green', 'purple'] as const).map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <ViewToggle value="grid" onChange={() => {}} color={color} />
          <span className="text-xs text-muted-foreground capitalize">{color}</span>
        </div>
      ))}
    </div>
  ),
};
