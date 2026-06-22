import React from 'react';
import { colors, font, radius } from '../../tokens';

export type SectionHeaderVariant = 'centered' | 'marker' | 'divider';

export interface SectionHeaderProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  /** Main headline. */
  title?: string;
  /** Supporting lead paragraph (centered variant only). */
  subtitle?: string;
  /**
   * Layout:
   * - `centered` — white card, centered eyebrow + headline + lead.
   * - `marker` — white card with a vertical bar, eyebrow + headline.
   * - `divider` — the dashed "mile marker" rule (uses `label` for the center text).
   */
  variant?: SectionHeaderVariant;
  /** Eyebrow color override (centered defaults to red, marker to pine). */
  tone?: string;
  /** Vertical bar color on the `marker` variant. */
  barColor?: string;
  /** Center label on the `divider` variant. */
  label?: string;
}

/**
 * Section header / eyebrow + title + subtitle blocks plus the dashed
 * "mile marker" divider, ported pixel-for-pixel from the source.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  variant = 'centered',
  tone,
  barColor = colors.gold,
  label = 'Mile 5,280',
}: SectionHeaderProps) {
  if (variant === 'divider') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '8px 4px',
        }}
      >
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: colors.pine,
            flex: 'none',
          }}
        />
        <span style={{ flex: 1, borderTop: '2px dashed #C9C2B6' }} />
        <span
          style={{
            fontFamily: font.ui,
            fontSize: 11,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            color: colors.muted,
            flex: 'none',
          }}
        >
          {label}
        </span>
        <span style={{ flex: 1, borderTop: '2px dashed #C9C2B6' }} />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: colors.red,
            flex: 'none',
          }}
        />
      </div>
    );
  }

  if (variant === 'marker') {
    return (
      <div
        style={{
          background: '#fff',
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div
          style={{
            flex: 'none',
            width: 8,
            height: 64,
            background: barColor,
            borderRadius: 4,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: font.ui,
              fontSize: 12,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: tone ?? colors.pine,
              marginBottom: 6,
            }}
          >
            {eyebrow}
          </div>
          <h3
            style={{
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: 28,
              margin: 0,
              letterSpacing: '-.01em',
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    );
  }

  // centered
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 40,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: font.ui,
          fontSize: 12,
          letterSpacing: '.24em',
          textTransform: 'uppercase',
          color: tone ?? colors.red,
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </div>
      <h3
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: '-.01em',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: font.serif,
          fontSize: 18,
          color: colors.muted,
          maxWidth: '54ch',
          margin: '0 auto',
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
