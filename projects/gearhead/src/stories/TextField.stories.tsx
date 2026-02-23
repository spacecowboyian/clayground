import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../components/TextField/TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    focusColor: {
      control: 'select',
      options: ['orange', 'blue', 'green', 'purple'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Username', placeholder: 'Enter username', focusColor: 'blue' },
};

export const WithDescription: Story = {
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    description: 'We will never share your email.',
    focusColor: 'green',
    type: 'email',
  },
};

export const Required: Story = {
  args: { label: 'Full Name', placeholder: 'John Doe', isRequired: true, focusColor: 'orange' },
};

export const Disabled: Story = {
  args: { label: 'Username', placeholder: 'Enter username', isDisabled: true, focusColor: 'blue' },
};

export const FocusColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['orange', 'blue', 'green', 'purple'] as const).map((c) => (
        <TextField key={c} label={`Focus: ${c}`} placeholder={`${c} focus ring`} focusColor={c} />
      ))}
    </div>
  ),
};
