import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function Typography() {
  return (
    <section className="min-h-screen bg-background text-foreground px-8 pt-11 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs tracking-[.24em] uppercase text-accent-orange mb-2">
          Foundations
        </div>
        <h2 className="text-3xl font-medium -tracking-[0.02em] mb-2">Typography</h2>
        <p className="text-sm text-muted-foreground max-w-[60ch] mb-6">
          A single system font (the platform default) at a base 16px, with weight and size doing
          the work of hierarchy rather than a mixed typeface stack.
        </p>

        <div className="flex flex-col gap-3.5">
          <div className="rounded-2xl border border-border bg-card px-7 py-6">
            <div className="text-[11px] tracking-[.2em] uppercase text-accent-orange mb-3">
              Headings
            </div>
            <h1 className="mb-2">Heading 1</h1>
            <h2 className="mb-2">Heading 2</h2>
            <h3 className="mb-2">Heading 3</h3>
            <h4>Heading 4</h4>
          </div>

          <div className="rounded-2xl border border-border bg-card px-7 py-6">
            <div className="text-[11px] tracking-[.2em] uppercase text-accent-orange mb-3">
              Body &amp; UI text
            </div>
            <p className="mb-2">
              Default body copy — normal weight, comfortable line height for reading result tables
              and event write-ups.
            </p>
            <label className="block mb-2">Form label</label>
            <button className="text-foreground">Button text</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-baseline mt-5 px-7 py-6 bg-card border border-border rounded-2xl">
          <div>
            <div className="text-2xl font-medium leading-tight">H1</div>
            <span className="text-xs text-muted-foreground block mt-1.5">--text-2xl / medium</span>
          </div>
          <div>
            <div className="text-xl font-medium leading-tight">H2</div>
            <span className="text-xs text-muted-foreground block mt-1.5">--text-xl / medium</span>
          </div>
          <div>
            <div className="text-lg font-medium leading-tight">H3</div>
            <span className="text-xs text-muted-foreground block mt-1.5">--text-lg / medium</span>
          </div>
          <div>
            <div className="text-base leading-tight">Body</div>
            <span className="text-xs text-muted-foreground block mt-1.5">--text-base / normal</span>
          </div>
          <div>
            <div className="text-xs tracking-[.16em] uppercase">Caption</div>
            <span className="text-xs text-muted-foreground block mt-1.5">xs / tracked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Specimens: Story = {
  render: () => <Typography />,
};
