import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from '../components/SearchField/SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    focusColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Search', placeholder: 'Search...', focusColor: 'purple' },
};

export const NoLabel: Story = {
  args: { placeholder: 'Search files...', focusColor: 'blue' },
};

export const FocusColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <SearchField key={c} placeholder={`${c} focus ring`} focusColor={c} />
      ))}
    </div>
  ),
};
