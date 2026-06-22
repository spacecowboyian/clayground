import React from 'react';
import { colors, font, radius, spring } from '../../tokens';
import { useHover } from '../../utils/useHover';

export type CardVariant = 'work' | 'caseStudy' | 'blog';

export interface CardProps {
  /** Which of the three card styles to render. */
  variant?: CardVariant;
  /** Small uppercase eyebrow label above the title. */
  eyebrow?: string;
  /** Card headline. */
  title?: string;
  /** Serif body copy / blurb. */
  blurb?: string;
  /** caseStudy only: the call-to-action text. */
  cta?: string;
  /** blog only: author + read-time meta line. */
  meta?: string;
}

/** Shared hover lift used by all three card styles. */
const liftHover: React.CSSProperties = {
  transform: 'translateY(-6px)',
};

export function Card({
  variant = 'work',
  eyebrow,
  title,
  blurb,
  cta = 'Read the story →',
  meta = 'Miles Ramsay · 5 min',
}: CardProps) {
  const { isHovered, hoverProps } = useHover();

  // ----- Work card: image placeholder + eyebrow + title + serif blurb -----
  if (variant === 'work') {
    const eyebrowText = eyebrow ?? 'Brand Film';
    const titleText = title ?? 'The Long Way Home';
    const blurbText = blurb ?? 'A founder story that put feeling before features.';

    const base: React.CSSProperties = {
      background: '#fff',
      border: `1px solid ${colors.border}`,
      borderRadius: radius.lg,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: `transform .26s ${spring},box-shadow .26s ease`,
    };
    const hover: React.CSSProperties = {
      ...liftHover,
      boxShadow: '0 18px 38px rgba(22,33,31,.14)',
    };

    return (
      <div {...hoverProps} style={{ ...base, ...(isHovered ? hover : {}) }}>
        <div
          style={{
            height: 160,
            backgroundImage:
              'repeating-linear-gradient(45deg,#EFEAE1 0 11px,#F6F2EA 11px 22px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace,monospace',
              fontSize: 11,
              color: '#A89F90',
              background: 'rgba(255,255,255,.7)',
              padding: '4px 9px',
              borderRadius: radius.sm,
            }}
          >
            project image 4:3
          </span>
        </div>
        <div style={{ padding: 20 }}>
          <div
            style={{
              fontFamily: font.ui,
              fontSize: 11,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: colors.red,
              marginBottom: 7,
            }}
          >
            {eyebrowText}
          </div>
          <h3
            style={{
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: 21,
              margin: '0 0 7px',
              letterSpacing: '-.01em',
            }}
          >
            {titleText}
          </h3>
          <p
            style={{
              fontFamily: font.serif,
              fontSize: 15,
              color: colors.muted,
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {blurbText}
          </p>
        </div>
      </div>
    );
  }

  // ----- Case-study card: pine card, lime eyebrow, big headline, CTA -----
  if (variant === 'caseStudy') {
    const eyebrowText = eyebrow ?? 'Case Study';
    const titleText = title ?? '+212% brand recall in one season.';
    const blurbText = blurb ?? 'How a regional nonprofit found its heartbeat.';

    const base: React.CSSProperties = {
      background: colors.pine,
      borderRadius: radius.lg,
      overflow: 'hidden',
      cursor: 'pointer',
      color: colors.paper,
      transition: `transform .26s ${spring},box-shadow .26s ease`,
    };
    const hover: React.CSSProperties = {
      ...liftHover,
      boxShadow: '0 18px 38px rgba(24,74,79,.34)',
    };

    return (
      <div {...hoverProps} style={{ ...base, ...(isHovered ? hover : {}) }}>
        <div style={{ padding: '24px 22px' }}>
          <div
            style={{
              fontFamily: font.ui,
              fontSize: 11,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: colors.lime,
              marginBottom: 12,
            }}
          >
            {eyebrowText}
          </div>
          <h3
            style={{
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: 26,
              margin: '0 0 10px',
              lineHeight: 1.05,
              letterSpacing: '-.01em',
            }}
          >
            {titleText}
          </h3>
          <p
            style={{
              fontFamily: font.serif,
              fontSize: 15,
              color: '#CFE2E0',
              margin: '0 0 18px',
              lineHeight: 1.45,
            }}
          >
            {blurbText}
          </p>
          <span
            style={{
              fontFamily: font.ui,
              fontWeight: 600,
              fontSize: 14,
              color: colors.lime,
              borderBottom: `2px solid ${colors.lime}`,
              paddingBottom: 2,
            }}
          >
            {cta}
          </span>
        </div>
      </div>
    );
  }

  // ----- Blog card: avatar + author/time meta + Journal eyebrow + title + blurb -----
  const eyebrowText = eyebrow ?? 'Journal';
  const titleText = title ?? 'Why safe creative gets forgotten';
  const blurbText = blurb ?? 'The best ideas usually live outside the safest rooms.';

  const base: React.CSSProperties = {
    background: '#fff',
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: `transform .26s ${spring},box-shadow .26s ease`,
  };
  const hover: React.CSSProperties = {
    ...liftHover,
    boxShadow: '0 18px 38px rgba(22,33,31,.14)',
  };

  return (
    <div {...hoverProps} style={{ ...base, ...(isHovered ? hover : {}) }}>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: colors.blush,
            }}
          />
          <span
            style={{
              fontFamily: font.ui,
              fontSize: 12,
              color: colors.muted,
            }}
          >
            {meta}
          </span>
        </div>
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 11,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: colors.peri,
            marginBottom: 7,
          }}
        >
          {eyebrowText}
        </div>
        <h3
          style={{
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: 21,
            margin: '0 0 7px',
            letterSpacing: '-.01em',
          }}
        >
          {titleText}
        </h3>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: 15,
            color: colors.muted,
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {blurbText}
        </p>
      </div>
    </div>
  );
}
