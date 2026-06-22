import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../components/Navbar/Navbar';
import { MobileMenu } from '../components/Navbar/MobileMenu';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Light desktop header: cream/white, underline-on-hover links, pine Contact pill. */
export const Light: Story = {
  args: { tone: 'light' },
  render: (args) => (
    <div style={{ padding: 30, background: '#FBF9F5' }}>
      <Navbar {...args} />
    </div>
  ),
};

/** Dark "over imagery" header: ink striped background, lime Contact pill. */
export const Dark: Story = {
  args: { tone: 'dark' },
  render: (args) => (
    <div style={{ padding: 30, background: '#FBF9F5' }}>
      <Navbar {...args} />
    </div>
  ),
};

/** Interactive phone-frame mobile menu — tap the hamburger to slide the drawer in. */
export const Mobile: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#F0EFE6',
        border: '1px solid #E7E1D8',
        borderRadius: 16,
        padding: 30,
        margin: 30,
      }}
    >
      <MobileMenu />
    </div>
  ),
};
