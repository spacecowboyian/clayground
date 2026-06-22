import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors, font } from '../tokens';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Swatch = { name: string; hex: string; role?: string };

const core: Swatch[] = [
  { name: 'Pine', hex: colors.pine, role: 'primary' },
  { name: 'Jade', hex: colors.jade, role: 'secondary' },
  { name: 'Ink', hex: colors.ink, role: 'text' },
];

const accents: Swatch[] = [
  { name: 'Signal Red', hex: colors.red, role: 'energy' },
  { name: 'Periwinkle', hex: colors.peri },
  { name: 'Gold', hex: colors.gold, role: 'highlight' },
];

const softs: Swatch[] = [
  { name: 'Blush', hex: colors.blush },
  { name: 'Sky', hex: colors.sky },
  { name: 'Lime', hex: colors.lime },
  { name: 'Cream', hex: colors.cream, role: 'bg' },
];

const eyebrowStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 12,
  letterSpacing: '.24em',
  textTransform: 'uppercase',
  color: colors.pine,
  marginBottom: 8,
};

const groupLabelStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 11,
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color: colors.muted,
  margin: '8px 0 12px',
};

const cardStyle: CSSProperties = {
  background: '#fff',
  border: `1px solid ${colors.border}`,
  borderRadius: 14,
  overflow: 'hidden',
};

function LargeSwatch({ name, hex, role }: Swatch) {
  // Cream has a bottom border to separate its near-white chip from the card.
  const isCream = hex.toUpperCase() === colors.cream.toUpperCase();
  return (
    <div style={cardStyle}>
      <div
        style={{
          height: 96,
          background: hex,
          ...(isCream ? { borderBottom: `1px solid ${colors.border}` } : {}),
        }}
      />
      <div style={{ padding: '13px 14px' }}>
        <div style={{ fontFamily: font.ui, fontWeight: 600, fontSize: 14 }}>{name}</div>
        <div style={{ fontFamily: font.ui, fontSize: 12, color: colors.muted, marginTop: 2 }}>
          {hex}
          {role ? ` · ${role}` : ''}
        </div>
      </div>
    </div>
  );
}

function SmallSwatch({ name, hex, role }: Swatch) {
  const isCream = hex.toUpperCase() === colors.cream.toUpperCase();
  return (
    <div style={cardStyle}>
      <div
        style={{
          height: 72,
          background: hex,
          ...(isCream ? { borderBottom: `1px solid ${colors.border}` } : {}),
        }}
      />
      <div style={{ padding: '11px 13px' }}>
        <div style={{ fontFamily: font.ui, fontWeight: 600, fontSize: 13 }}>{name}</div>
        <div style={{ fontFamily: font.ui, fontSize: 11.5, color: colors.muted }}>
          {hex}
          {role ? ` · ${role}` : ''}
        </div>
      </div>
    </div>
  );
}

function Colors() {
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
            Color Palette
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
            Deep pine anchors the system; jade grounds it. A lively accent set — red, periwinkle,
            gold — supplies energy, while soft tints keep things human and warm.
          </p>
        </div>

        <div style={groupLabelStyle}>Core</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))',
            gap: 14,
            marginBottom: 26,
          }}
        >
          {core.map((s) => (
            <LargeSwatch key={s.name} {...s} />
          ))}
        </div>

        <div style={groupLabelStyle}>Accents</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))',
            gap: 14,
            marginBottom: 26,
          }}
        >
          {accents.map((s) => (
            <LargeSwatch key={s.name} {...s} />
          ))}
        </div>

        <div style={groupLabelStyle}>Soft tints &amp; neutrals</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
            gap: 14,
          }}
        >
          {softs.map((s) => (
            <SmallSwatch key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Palette: Story = {
  render: () => <Colors />,
};
