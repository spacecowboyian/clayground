import React from 'react';
import { colors, font, radius } from '../../tokens';

export type TestimonialVariant = 'feature' | 'plain' | 'rating';

export interface TestimonialProps {
  /** The quote body text. */
  quote: string;
  /** Author name. Omit on the `rating` variant. */
  author?: string;
  /** Author role / organization line. */
  role?: string;
  /**
   * Visual style:
   * - `feature` — large lime card with oversized quote-mark + avatar.
   * - `plain` — white bordered card with small avatar.
   * - `rating` — white bordered card with a gold star row, no author.
   */
  variant?: TestimonialVariant;
  /** Avatar fill color (feature uses pine, plain blush by default). */
  avatarColor?: string;
}

/**
 * Testimonial / quote card from the 5280 testimonials section.
 * Three variants ported pixel-for-pixel from the source markup.
 */
export function Testimonial({
  quote,
  author,
  role,
  variant = 'feature',
  avatarColor,
}: TestimonialProps) {
  if (variant === 'feature') {
    return (
      <div
        style={{
          background: colors.lime,
          borderRadius: radius.lg,
          padding: '34px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: 90,
            lineHeight: 0.6,
            color: colors.pine,
            opacity: 0.25,
            position: 'absolute',
            top: 24,
            left: 24,
          }}
        >
          {'“'}
        </div>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: 24,
            lineHeight: 1.45,
            color: colors.ink,
            margin: '34px 0 22px',
            position: 'relative',
          }}
        >
          {quote}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: avatarColor ?? colors.pine,
            }}
          />
          <div>
            <div
              style={{ fontFamily: font.ui, fontWeight: 600, fontSize: 15 }}
            >
              {author}
            </div>
            <div
              style={{ fontFamily: font.ui, fontSize: 13, color: '#3E5552' }}
            >
              {role}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'rating') {
    return (
      <div
        style={{
          background: '#fff',
          border: `1px solid ${colors.border}`,
          borderRadius: radius.lg,
          padding: 24,
        }}
      >
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 14,
            color: colors.gold,
            marginBottom: 10,
            letterSpacing: 2,
          }}
        >
          {'★★★★★'}
        </div>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: 16,
            lineHeight: 1.5,
            color: colors.ink,
            margin: 0,
          }}
        >
          {quote}
        </p>
      </div>
    );
  }

  // plain
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: 24,
      }}
    >
      <p
        style={{
          fontFamily: font.serif,
          fontSize: 16,
          lineHeight: 1.5,
          color: colors.ink,
          margin: '0 0 16px',
        }}
      >
        {quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: avatarColor ?? colors.blush,
          }}
        />
        <div>
          <div style={{ fontFamily: font.ui, fontWeight: 600, fontSize: 14 }}>
            {author}
          </div>
          <div
            style={{ fontFamily: font.ui, fontSize: 12, color: colors.muted }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
