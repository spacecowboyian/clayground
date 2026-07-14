import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function Typography() {
  return (
    <section className="min-h-screen bg-background text-foreground px-8 pt-11 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="eyebrow mb-2">Foundations</div>
        <h2 className="text-3xl -tracking-[0.02em] mb-2">Typography</h2>
        <p className="text-sm text-muted-foreground max-w-[60ch] mb-6">
          Three locked families, chosen via the Explorations font-combo picker: Staatliches for
          H1/H2, Rajdhani for H3/H4 subheads, and Barlow for body copy, UI text, and eyebrow
          labels. Don't swap these ad hoc — update <code>--font-heading</code>,{' '}
          <code>--font-subhead</code>, and <code>--font-body</code> in <code>theme.css</code>{' '}
          instead.
        </p>

        <div className="flex flex-col gap-3.5">
          <div className="rounded-2xl border border-border bg-card px-7 py-6">
            <div className="eyebrow mb-3">Headings — Staatliches (H1/H2) / Rajdhani (H3/H4)</div>
            <h1 className="mb-2">Heading 1</h1>
            <h2 className="mb-2">Heading 2</h2>
            <h3 className="mb-2">Heading 3</h3>
            <h4>Heading 4</h4>
          </div>

          <div className="rounded-2xl border border-border bg-card px-7 py-6">
            <div className="eyebrow mb-3">Body &amp; UI text — Barlow</div>
            <p className="mb-2">
              Default body copy — normal weight, comfortable line height for reading result tables
              and event write-ups.
            </p>
            <label className="block mb-2">Form label</label>
            <button className="text-foreground">Button text</button>
          </div>

          <div className="rounded-2xl border border-border bg-card px-7 py-6">
            <div className="eyebrow mb-3">Eyebrow / kicker label</div>
            <div className="eyebrow mb-2">This is an eyebrow label</div>
            <p className="text-sm text-muted-foreground max-w-[60ch]">
              A locked typography unit (<code>.eyebrow</code> in <code>theme.css</code>) — always
              Barlow, always tracked-caps, always cone orange. Used above card headings and
              section labels throughout Cones; not meant to vary per component the way headings
              and body copy can.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-baseline mt-5 px-7 py-6 bg-card border border-border rounded-2xl">
          <div>
            <div className="text-2xl leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              H1
            </div>
            <span className="text-xs text-muted-foreground block mt-1.5">
              Staatliches / --text-2xl
            </span>
          </div>
          <div>
            <div className="text-xl leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              H2
            </div>
            <span className="text-xs text-muted-foreground block mt-1.5">
              Staatliches / --text-xl
            </span>
          </div>
          <div>
            <div className="text-lg font-medium leading-tight" style={{ fontFamily: 'var(--font-subhead)' }}>
              H3
            </div>
            <span className="text-xs text-muted-foreground block mt-1.5">
              Rajdhani / --text-lg
            </span>
          </div>
          <div>
            <div className="text-base leading-tight">Body</div>
            <span className="text-xs text-muted-foreground block mt-1.5">
              Barlow / --text-base
            </span>
          </div>
          <div>
            <div className="eyebrow">Eyebrow</div>
            <span className="text-xs text-muted-foreground block mt-1.5">Barlow / tracked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Typography_: Story = {
  name: 'Typography',
  render: () => <Typography />,
};
