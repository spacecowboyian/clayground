import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '../components/RadioGroup/RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup label="Priority Level" defaultValue="medium">
      <Radio value="low" color="green">Low</Radio>
      <Radio value="medium" color="orange">Medium</Radio>
      <Radio value="high" color="red">High</Radio>
    </RadioGroup>
  ),
};

export const Subscription: Story = {
  render: () => (
    <RadioGroup label="Plan" defaultValue="pro">
      <Radio value="free" color="blue">Free</Radio>
      <Radio value="pro" color="purple">Pro</Radio>
      <Radio value="enterprise" color="orange">Enterprise</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Status" defaultValue="active" isDisabled>
      <Radio value="active" color="green">Active</Radio>
      <Radio value="paused" color="orange">Paused</Radio>
      <Radio value="archived" color="blue">Archived</Radio>
    </RadioGroup>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <RadioGroup label="Accent Color" defaultValue="orange">
      {(['orange', 'blue', 'green', 'purple', 'red'] as const).map((c) => (
        <Radio key={c} value={c} color={c} className="capitalize">{c}</Radio>
      ))}
    </RadioGroup>
  ),
};
