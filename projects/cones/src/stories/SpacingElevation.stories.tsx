import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

// Tailwind's default spacing scale (4px base unit) — cones doesn't override it.
const space = [1, 2, 3, 4, 6, 8, 12, 16] as const; // ×4px = 4,8,12,16,24,32,48,64

const radii: { label: string; varName: string }[] = [
  { label: 'sm', varName: '--radius-sm' },
  { label: 'md', varName: '--radius-md' },
  { label: 'lg (base)', varName: '--radius-lg' },
  { label: 'xl', varName: '--radius-xl' },
];

function SpacingElevation() {
  return (
    <section className="min-h-screen bg-background text-foreground px-8 pt-11 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="eyebrow mb-2">Foundations</div>
        <h2 className="text-3xl -tracking-[0.02em] mb-2">Spacing &amp; Radius</h2>
        <p className="text-sm text-muted-foreground max-w-[60ch] mb-6">
          Tailwind's standard 4px spacing scale, and the radius scale derived from a single{' '}
          <code>--radius</code> base (0.5rem).
        </p>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="rounded-2xl border border-border bg-card px-6 py-6">
            <div className="eyebrow mb-4">Spacing scale</div>
            <div className="flex items-end gap-3 flex-wrap">
              {space.map((s) => (
                <div key={s} className="text-center">
                  <div
                    className="bg-accent-orange rounded-sm mx-auto mb-2"
                    style={{ width: s * 4, height: s * 4 }}
                  />
                  <div className="text-[11px] text-muted-foreground">{s * 4}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card px-6 py-6">
            <div className="eyebrow mb-4">Radii</div>
            <div className="flex gap-3.5 items-end flex-wrap">
              {radii.map((r) => (
                <div key={r.label} className="text-center">
                  <div
                    className="w-13 h-13 bg-accent-blue mb-2"
                    style={{ width: 52, height: 52, borderRadius: `var(${r.varName})` }}
                  />
                  <div className="text-[11px] text-muted-foreground">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const SpacingRadius: Story = {
  name: 'Spacing & Radius',
  render: () => <SpacingElevation />,
};
