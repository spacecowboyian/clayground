import type { Meta, StoryObj } from '@storybook/react';
import { Star, FileText, Sheet, Presentation } from 'lucide-react';
import { GridList, GridListItem } from '../components/GridList/GridList';

const meta = {
  title: 'Components/GridList',
  component: GridList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <GridList aria-label="Files" className="w-full max-w-2xl">
      <GridListItem hoverColor="blue">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-foreground">Document.pdf</h4>
          <Star className="w-4 h-4 text-[var(--accent-orange)]" />
        </div>
        <p className="text-sm text-muted-foreground">Modified 2 hours ago</p>
      </GridListItem>
      <GridListItem hoverColor="green">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-foreground">Spreadsheet.xlsx</h4>
          <Star className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Modified yesterday</p>
      </GridListItem>
      <GridListItem hoverColor="purple">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-foreground">Presentation.pptx</h4>
          <Star className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Modified last week</p>
      </GridListItem>
    </GridList>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <GridList aria-label="Color demo" className="max-w-2xl">
      {(['blue', 'green', 'orange', 'purple'] as const).map((c) => (
        <GridListItem key={c} hoverColor={c}>
          <p className="text-foreground text-sm capitalize">Hover color: {c}</p>
        </GridListItem>
      ))}
    </GridList>
  ),
};
