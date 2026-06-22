import React from 'react';
import { colors, font } from '../../tokens';

export interface LogoMarqueeProps {
  /** Client logo names rendered in the scrolling strip. */
  logos?: string[];
  /** Small uppercase label above the track. */
  label?: string;
}

const DEFAULT_LOGOS = [
  'PTBA',
  'Altitude',
  'Northbound',
  'Cardinal Co.',
  'Rivertown',
  'Field & Co.',
];

/** One copy of the logo track; the second copy is aria-hidden for the seamless loop. */
function Track({ logos, hidden }: { logos: string[]; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden ? 'true' : undefined}
      style={{
        display: 'flex',
        gap: 48,
        paddingRight: 48,
        alignItems: 'center',
      }}
    >
      {logos.map((name, i) => (
        <div
          key={i}
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: 22,
            color: '#C9C2B6',
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

/** Continuously scrolling client logo strip with two duplicated tracks. */
export function LogoMarquee({
  logos = DEFAULT_LOGOS,
  label = 'We really like working with these folks',
}: LogoMarqueeProps) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: '30px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: font.ui,
          fontSize: 11,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: colors.muted,
          textAlign: 'center',
          marginBottom: 22,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'sc-marquee 22s linear infinite',
        }}
      >
        <Track logos={logos} />
        <Track logos={logos} hidden />
      </div>
    </div>
  );
}
