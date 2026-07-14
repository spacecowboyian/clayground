import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabBar, Tab, TabPanel } from '../components/Tabs/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultSelectedKey="overview" className="w-96">
      <TabBar>
        <Tab id="overview" color="blue">Overview</Tab>
        <Tab id="analytics" color="green">Analytics</Tab>
        <Tab id="settings" color="orange">Settings</Tab>
      </TabBar>
      <TabPanel id="overview">Dashboard overview content goes here.</TabPanel>
      <TabPanel id="analytics">Analytics data and charts appear here.</TabPanel>
      <TabPanel id="settings">Configure preferences here.</TabPanel>
    </Tabs>
  ),
};

export const FourTabs: Story = {
  render: () => (
    <Tabs defaultSelectedKey="tab1" className="w-[480px]">
      <TabBar>
        <Tab id="tab1" color="blue">Overview</Tab>
        <Tab id="tab2" color="green">Analytics</Tab>
        <Tab id="tab3" color="orange">Reports</Tab>
        <Tab id="tab4" color="purple">Settings</Tab>
      </TabBar>
      <TabPanel id="tab1">Overview panel content.</TabPanel>
      <TabPanel id="tab2">Analytics panel content.</TabPanel>
      <TabPanel id="tab3">Reports panel content.</TabPanel>
      <TabPanel id="tab4">Settings panel content.</TabPanel>
    </Tabs>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-96">
      {(['blue', 'green', 'orange', 'purple'] as const).map((c) => (
        <Tabs key={c} defaultSelectedKey="a">
          <TabBar>
            <Tab id="a" color={c}>Active</Tab>
            <Tab id="b" color={c}>Inactive</Tab>
          </TabBar>
          <TabPanel id="a">Color: {c}</TabPanel>
          <TabPanel id="b">Inactive.</TabPanel>
        </Tabs>
      ))}
    </div>
  ),
};
