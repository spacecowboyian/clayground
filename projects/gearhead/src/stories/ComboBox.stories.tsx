import type { Meta, StoryObj } from '@storybook/react';
import { ComboBox } from '../components/ComboBox/ComboBox';

const FRAMEWORKS = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid' },
  { id: 'qwik', label: 'Qwik' },
  { id: 'astro', label: 'Astro' },
];

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    hoverColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    focusColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Search frameworks...',
    options: FRAMEWORKS,
    hoverColor: 'purple',
    focusColor: 'purple',
  },
};

export const ColorsShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <ComboBox key={c} label={`Color: ${c}`} placeholder="Type to filter..." options={FRAMEWORKS} hoverColor={c} focusColor={c} />
      ))}
    </div>
  ),
};
