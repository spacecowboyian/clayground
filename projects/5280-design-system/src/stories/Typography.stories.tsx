import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors, font } from '../tokens';

const meta = {
  title: 'Foundations/Typography',
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

const cardStyle: CSSProperties = {
  background: '#fff',
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: '26px 28px',
};

const voiceHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 14,
};

const voiceLabelStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 11,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: colors.pine,
};

const voiceNoteStyle: CSSProperties = {
  fontFamily: font.ui,
  fontSize: 12,
  color: colors.muted,
};

function Typography() {
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
            Typography
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
            Three voices: a characterful display sans for headlines, a warm serif for storytelling,
            and a clean grotesque for UI and labels. Real fonts named first, with close web
            fallbacks loaded.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Display voice */}
          <div style={cardStyle}>
            <div style={voiceHeaderStyle}>
              <div style={voiceLabelStyle}>Display · Headlines</div>
              <div style={voiceNoteStyle}>Crumb (TAY Crumb) → Baloo 2</div>
            </div>
            <div
              style={{
                fontFamily: font.display,
                fontWeight: 800,
                fontSize: 52,
                lineHeight: 1,
                letterSpacing: '-.01em',
              }}
            >
              Go fuRTHER.
            </div>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: '#8A8275',
                marginTop: 14,
                lineHeight: 1.5,
              }}
            >
              Soft, a little off, late-’90s character — the voice of every big 5280 headline.
              Secondary display:{' '}
              <span style={{ color: colors.muted, fontWeight: 600 }}>Larken Black</span> (feature
              serif) · kicker:{' '}
              <span style={{ color: colors.muted, fontWeight: 600 }}>Mangrove Sans Bold</span>.
            </div>
          </div>

          {/* Serif voice */}
          <div style={cardStyle}>
            <div style={voiceHeaderStyle}>
              <div style={voiceLabelStyle}>Serif · Editorial</div>
              <div style={voiceNoteStyle}>Minion 3 → Source Serif 4</div>
            </div>
            <div
              style={{
                fontFamily: font.serif,
                fontSize: 23,
                lineHeight: 1.5,
                color: colors.ink,
                maxWidth: '52ch',
              }}
            >
              We help organizations discover the heart behind what they do — then build work that
              moves people emotionally before it ever asks them to act.
            </div>
          </div>

          {/* UI voice */}
          <div style={cardStyle}>
            <div style={voiceHeaderStyle}>
              <div style={voiceLabelStyle}>UI · Labels</div>
              <div style={voiceNoteStyle}>Owners Narrow → Archivo</div>
            </div>
            <div
              style={{
                fontFamily: font.ui,
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: '.02em',
              }}
            >
              Buttons, navigation, captions and form labels.
            </div>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                color: colors.muted,
                marginTop: 10,
              }}
            >
              Tracked · Uppercase · Eyebrow
            </div>
          </div>
        </div>

        {/* Type scale */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'baseline',
            marginTop: 22,
            padding: '22px 28px',
            background: '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
          }}
        >
          <div style={{ fontFamily: font.display, fontWeight: 800, fontSize: 46, lineHeight: 1 }}>
            H1
            <span
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: colors.muted,
                fontWeight: 400,
                display: 'block',
                marginTop: 6,
              }}
            >
              64 / 48
            </span>
          </div>
          <div style={{ fontFamily: font.display, fontWeight: 800, fontSize: 34, lineHeight: 1 }}>
            H2
            <span
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: colors.muted,
                fontWeight: 400,
                display: 'block',
                marginTop: 6,
              }}
            >
              38 / 32
            </span>
          </div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 24, lineHeight: 1 }}>
            H3
            <span
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: colors.muted,
                fontWeight: 400,
                display: 'block',
                marginTop: 6,
              }}
            >
              24
            </span>
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 17, lineHeight: 1 }}>
            Body
            <span
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: colors.muted,
                display: 'block',
                marginTop: 6,
              }}
            >
              17 / 19
            </span>
          </div>
          <div
            style={{
              fontFamily: font.ui,
              fontSize: 12,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
            }}
          >
            Caption
            <span
              style={{
                fontFamily: font.ui,
                fontSize: 12,
                color: colors.muted,
                display: 'block',
                marginTop: 6,
                letterSpacing: 0,
                textTransform: 'none',
              }}
            >
              12 · tracked
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Specimens: Story = {
  render: () => <Typography />,
};
