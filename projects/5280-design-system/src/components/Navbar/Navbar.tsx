import type { CSSProperties } from 'react';
import { colors, font, radius, spring } from '../../tokens';
import { useHover } from '../../utils/useHover';

export type NavbarTone = 'light' | 'dark';

export interface NavbarProps {
  /** 'light' = cream/white header with underline-on-hover links + pine Contact pill.
   *  'dark'  = ink striped background, lime Contact pill ("Over imagery" variant). */
  tone?: NavbarTone;
}

const NAV_LINKS = ['About', 'Our Work', 'Newsletter'] as const;

/** A nav link with the gold underline-on-hover (light tone only). */
function NavLink({ label, tone }: { label: string; tone: NavbarTone }) {
  const { isHovered, hoverProps } = useHover();

  if (tone === 'dark') {
    return (
      <a
        href="#nav"
        style={{
          fontFamily: font.ui,
          fontWeight: 500,
          fontSize: 15,
          color: colors.paper,
          textDecoration: 'none',
        }}
      >
        {label}
      </a>
    );
  }

  const base: CSSProperties = {
    fontFamily: font.ui,
    fontWeight: 500,
    fontSize: 15,
    color: colors.ink,
    textDecoration: 'none',
    borderBottom: '2px solid transparent',
    paddingBottom: 3,
    transition: 'border-color .2s ease',
  };

  return (
    <a
      href="#nav"
      {...hoverProps}
      style={{ ...base, ...(isHovered ? { borderColor: colors.gold } : {}) }}
    >
      {label}
    </a>
  );
}

/** The pine "Contact" pill (light) — lifts on hover. */
function ContactPillLight() {
  const { isHovered, hoverProps } = useHover();
  const base: CSSProperties = {
    fontFamily: font.ui,
    fontWeight: 600,
    fontSize: 14,
    background: colors.pine,
    color: colors.paper,
    border: 'none',
    padding: '10px 22px',
    borderRadius: radius.pill,
    cursor: 'pointer',
    transition: `transform .2s ${spring}`,
  };
  return (
    <button
      {...hoverProps}
      style={{ ...base, ...(isHovered ? { transform: 'translateY(-2px)' } : {}) }}
    >
      Contact
    </button>
  );
}

/** The lime "Contact" pill (dark variant). */
function ContactPillDark() {
  return (
    <button
      style={{
        fontFamily: font.ui,
        fontWeight: 600,
        fontSize: 14,
        background: colors.lime,
        color: colors.ink,
        border: 'none',
        padding: '10px 22px',
        borderRadius: radius.pill,
        cursor: 'pointer',
      }}
    >
      Contact
    </button>
  );
}

/** The "52" circle badge + "5280 Creative" wordmark. */
function Wordmark({ tone }: { tone: NavbarTone }) {
  if (tone === 'dark') {
    // Dark variant shows the wordmark text only (no badge), per source.
    return (
      <span
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 18,
          color: colors.paper,
          letterSpacing: '-.01em',
        }}
      >
        5280 Creative
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: colors.pine,
          color: colors.lime,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        52
      </div>
      <span
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: '-.01em',
        }}
      >
        5280 Creative
      </span>
    </div>
  );
}

/** The 5280 site header. */
export function Navbar({ tone = 'light' }: NavbarProps) {
  const outer: CSSProperties =
    tone === 'dark'
      ? {
          borderRadius: 16,
          overflow: 'hidden',
          background: colors.ink,
          backgroundImage:
            'repeating-linear-gradient(45deg,#1c2a27 0 12px,#1a2724 12px 24px)',
        }
      : {
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          overflow: 'hidden',
        };

  return (
    <div style={outer}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
        }}
      >
        <Wordmark tone={tone} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {tone === 'dark' ? (
            <>
              <NavLink label="About" tone={tone} />
              <NavLink label="Our Work" tone={tone} />
              <ContactPillDark />
            </>
          ) : (
            <>
              {NAV_LINKS.map((label) => (
                <NavLink key={label} label={label} tone={tone} />
              ))}
              <ContactPillLight />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
