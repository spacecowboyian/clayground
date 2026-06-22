import { useState } from 'react';
import type { CSSProperties } from 'react';
import { colors, font, shadow } from '../../tokens';

const DRAWER_LINKS = [
  { label: 'About', color: colors.paper },
  { label: 'Our Work', color: colors.paper },
  { label: 'Newsletter', color: colors.paper },
  { label: 'Contact', color: colors.lime },
] as const;

const barStyle: CSSProperties = {
  width: 16,
  height: 2,
  background: colors.ink,
  borderRadius: 2,
};

/** Phone-frame mobile menu: a slide-in drawer toggled by a hamburger button. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 380,
        background: colors.surface,
        borderRadius: 26,
        overflow: 'hidden',
        boxShadow: shadow.lg,
        border: `6px solid ${colors.ink}`,
      }}
    >
      {/* Phone top bar with wordmark + hamburger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px',
          borderBottom: '1px solid #F0EDE6',
        }}
      >
        <span style={{ fontFamily: font.display, fontWeight: 800, fontSize: 15 }}>
          5280
        </span>
        <button
          onClick={toggle}
          aria-label="Open menu"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            border: 'none',
            background: '#F0EFE6',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
        </button>
      </div>

      {/* Faux screen content behind the drawer */}
      <div
        style={{
          padding: '24px 18px',
          fontFamily: font.serif,
          color: '#9A9488',
          fontSize: 14,
        }}
      >
        Screen content…
      </div>

      {/* Slide-in drawer */}
      <div
        style={{
          position: 'absolute',
          inset: '0 0 0 38%',
          background: colors.pine,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .34s cubic-bezier(.4,0,.2,1)',
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <button
          onClick={toggle}
          aria-label="Close menu"
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: '#9FC2BF',
            fontSize: 22,
            cursor: 'pointer',
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          ×
        </button>
        {DRAWER_LINKS.map((link) => (
          <a
            key={link.label}
            href="#nav"
            style={{
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: 22,
              color: link.color,
              textDecoration: 'none',
              padding: '7px 0',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
