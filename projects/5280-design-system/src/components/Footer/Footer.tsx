import { colors, font } from '../../tokens';

interface FooterLink {
  label: string;
  href: string;
}

const EXPLORE_LINKS: FooterLink[] = [
  { label: 'About', href: '#footer' },
  { label: 'Our Work', href: '#footer' },
  { label: 'Newsletter', href: '#footer' },
];

/** The ink footer with wordmark, blurb, link columns, and sign-off. */
export function Footer() {
  return (
    <div
      style={{
        background: colors.ink,
        borderRadius: 18,
        padding: '46px 40px 36px',
        color: '#E8E4DC',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 32,
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: '30ch' }}>
          <div
            style={{
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: 26,
              color: '#fff',
              marginBottom: 12,
            }}
          >
            5280 Creative
          </div>
          <p
            style={{
              fontFamily: font.serif,
              fontSize: 16,
              color: '#9FA8A5',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            A faith-based branding and creative storytelling agency. We go
            further — it's less crowded out there.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#6B7572',
                marginBottom: 14,
              }}
            >
              Explore
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 9 }}
            >
              {EXPLORE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: font.ui,
                    fontSize: 15,
                    color: '#E8E4DC',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#6B7572',
                marginBottom: 14,
              }}
            >
              Say hello
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 9 }}
            >
              <div
                style={{
                  fontFamily: font.ui,
                  fontSize: 15,
                  color: '#E8E4DC',
                }}
              >
                Saint Joseph, MO
              </div>
              <div
                style={{
                  fontFamily: font.ui,
                  fontSize: 15,
                  color: '#E8E4DC',
                }}
              >
                (816) 752-0325
              </div>
              <div
                style={{
                  fontFamily: font.ui,
                  fontSize: 15,
                  color: colors.lime,
                }}
              >
                hello@52eightycreative.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid #2A3633',
          paddingTop: 22,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 13,
            color: '#6B7572',
          }}
        >
          © 2026 52 Eighty Creative. All rights reserved.
        </div>
        <div
          style={{
            fontFamily: font.serif,
            fontStyle: 'italic',
            fontSize: 15,
            color: '#9FC2BF',
          }}
        >
          Creative with a heartbeat.
        </div>
      </div>
    </div>
  );
}
