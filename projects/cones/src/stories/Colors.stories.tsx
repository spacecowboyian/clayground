import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Swatch = { name: string; varName: string; role?: string };

const core: Swatch[] = [
  { name: 'Background', varName: '--background', role: 'page bg' },
  { name: 'Foreground', varName: '--foreground', role: 'text' },
  { name: 'Card', varName: '--card', role: 'surface' },
  { name: 'Primary', varName: '--primary' },
  { name: 'Secondary', varName: '--secondary' },
  { name: 'Muted', varName: '--muted' },
  { name: 'Accent', varName: '--accent' },
  { name: 'Border', varName: '--border' },
  { name: 'Destructive', varName: '--destructive' },
];

const accents: Swatch[] = [
  { name: 'Cone Orange', varName: '--accent-orange', role: 'brand' },
  { name: 'Blue', varName: '--accent-blue' },
  { name: 'Green', varName: '--accent-green' },
  { name: 'Purple', varName: '--accent-purple' },
  { name: 'Red', varName: '--accent-red' },
];

function Swatch({ name, varName, role }: Swatch) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="h-20" style={{ background: `var(${varName})` }} />
      <div className="px-3.5 py-3">
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {varName}
          {role ? ` · ${role}` : ''}
        </div>
      </div>
    </div>
  );
}

function Colors() {
  return (
    <section className="min-h-screen bg-background text-foreground px-8 pt-11 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="eyebrow mb-2">Foundations</div>
        <h2 className="text-3xl -tracking-[0.02em] mb-2">Color Palette</h2>
        <p className="text-sm text-muted-foreground max-w-[60ch] mb-6">
          A dark, high-contrast base with a cone-orange accent, plus a small set of status colors
          (blue, green, purple, red) for badges, charts, and state. This is a placeholder palette —
          see the note in <code>theme.css</code> for the pending KSSCCA brand pass.
        </p>

        <div className="text-[11px] tracking-[.18em] uppercase text-muted-foreground my-2">
          Core
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5 mb-6">
          {core.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>

        <div className="text-[11px] tracking-[.18em] uppercase text-muted-foreground my-2">
          Accents
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
          {accents.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Colors_: Story = {
  name: 'Colors',
  render: () => <Colors />,
};
