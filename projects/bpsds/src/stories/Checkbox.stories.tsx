import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroupField } from '../components/Checkbox/Checkbox';

const meta = {
  title: 'BPS Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'light' } },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'In Stock Only' } };
export const Checked: Story = { args: { children: 'Free Shipping', defaultSelected: true } };
export const Disabled: Story = { args: { children: 'In Store Only', isDisabled: true } };

export const BrandFilter: Story = {
  render: () => (
    <CheckboxGroupField label="Brand">
      <Checkbox value="shimano">Shimano</Checkbox>
      <Checkbox value="abu">Abu Garcia</Checkbox>
      <Checkbox value="ugly-stik">Ugly Stik</Checkbox>
      <Checkbox value="penn">Penn</Checkbox>
      <Checkbox value="daiwa">Daiwa</Checkbox>
    </CheckboxGroupField>
  ),
};
