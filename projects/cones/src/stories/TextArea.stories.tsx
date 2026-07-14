import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../components/TextArea/TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    focusColor: { control: 'select', options: ['orange', 'blue', 'green', 'purple'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Message', placeholder: 'Enter your message...', focusColor: 'blue' },
};

export const Tall: Story = {
  args: { label: 'Notes', placeholder: 'Write your notes here...', rows: 8, focusColor: 'green' },
};

export const WithDescription: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    description: 'Maximum 500 characters.',
    focusColor: 'purple',
  },
};

export const Disabled: Story = {
  args: { label: 'Comments', placeholder: 'Comments disabled', isDisabled: true },
};
