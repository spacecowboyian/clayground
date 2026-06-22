import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors, font, radius, shadow, space } from '../tokens';

const meta = {
  title: 'Foundations/Spacing & Elevation',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const eyebrowStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 12,
  letterSpacing: '.24em',
  textTransform: 'uppercase',
  color: colors.pine,
  marginBottom: 8,
};

const panelLabelStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 11,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: colors.pine,
  marginBottom: 16,
};

const captionStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 11,
  color: colors.muted,
};

const panelStyle: CSSProperties = {
  background: '#fff',
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: '24px 26px',
};

// The source draws each spacing chip at its literal pixel size with a small,
// proportional corner radius.
const spacingChipRadius: Record<number, number> = {
  4: 2,
  8: 2,
  12: 3,
  16: 3,
  24: 4,
  32: 5,
  48: 6,
};

const radii: { label: string; value: number | string; bg: string }[] = [
  { label: `sm ${radius.sm}`, value: radius.sm, bg: colors.blush },
  { label: `md ${radius.md}`, value: radius.md, bg: colors.sky },
  { label: `lg ${radius.lg}`, value: radius.lg, bg: colors.lime },
  { label: 'full', value: '50%', bg: colors.gold },
];

const shadows: { label: string; box: string; border?: string }[] = [
  { label: 'sm', box: shadow.sm, border: '1px solid #F0EDE6' },
  { label: 'md', box: shadow.md },
  { label: 'lg', box: shadow.lg },
];

function SpacingElevation() {
  return (
    <section
      style={{
        padding: '44px 32px 24px',
        background: colors.cream,
        color: colors.ink,
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div>
          <div style={eyebrowStyle}>Foundations</div>
          <h2
            style={{
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: 38,
              letterSpacing: '-.02em',
              margin: '0 0 8px',
            }}
          >
            Spacing &amp; Elevation
          </h2>
          <p
            style={{
              fontFamily: font.serif,
              fontSize: 17,
              color: colors.muted,
              maxWidth: '60ch',
              margin: '0 0 26px',
            }}
          >
            An 8-point spacing rhythm, generous radii for a soft and friendly feel, and restrained
            shadows that lift without shouting.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Spacing scale */}
          <div style={panelStyle}>
            <div style={panelLabelStyle}>Spacing scale</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
              {space.map((s) => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: s,
                      height: s,
                      background: colors.pine,
                      borderRadius: spacingChipRadius[s],
                      margin: '0 auto 8px',
                    }}
                  />
                  <div style={captionStyle}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Radii */}
          <div style={panelStyle}>
            <div style={panelLabelStyle}>Radii</div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
              {radii.map((r) => (
                <div key={r.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      background: r.bg,
                      borderRadius: r.value,
                      marginBottom: 8,
                    }}
                  />
                  <div style={captionStyle}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Elevation / shadows */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            marginTop: 14,
            background: '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: '30px 26px',
          }}
        >
          {shadows.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 90,
                  height: 60,
                  background: '#fff',
                  ...(s.border ? { border: s.border } : {}),
                  borderRadius: 12,
                  boxShadow: s.box,
                  marginBottom: 10,
                }}
              />
              <div style={captionStyle}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Scale: Story = {
  render: () => <SpacingElevation />,
};
