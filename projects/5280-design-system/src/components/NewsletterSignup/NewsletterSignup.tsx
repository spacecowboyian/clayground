import React, { useState } from 'react';
import { colors, spring } from '../../tokens';
import { useHover, useFocus } from '../../utils/useHover';

export type NewsletterSignupProps = {
  /** Force the confirmed state (useful for stories / SSR). */
  subscribed?: boolean;
  /** Eyebrow label above the heading. */
  eyebrow?: string;
  heading?: string;
  body?: string;
  /** Called with the submitted email when the form is sent. */
  onSubscribe?: (email: string) => void;
};

const cardStyle: React.CSSProperties = {
  background: colors.pine,
  borderRadius: 16,
  padding: '30px 28px',
  color: colors.paper,
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontSize: 11,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: '#9FC2BF',
  marginBottom: 8,
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--display)',
  fontWeight: 800,
  fontSize: 24,
  margin: '0 0 6px',
  lineHeight: 1.1,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontSize: 15,
  color: '#CFE2E0',
  margin: '0 0 18px',
};

const confirmStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontWeight: 600,
  fontSize: 15,
  background: colors.lime,
  color: colors.ink,
  padding: '14px 16px',
  borderRadius: 12,
  textAlign: 'center',
  animation: `sc-pop .3s ${spring} both`,
};

const inputBase: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  fontFamily: 'var(--ui)',
  fontSize: 15,
  color: colors.ink,
  padding: '12px 15px',
  border: 'none',
  borderRadius: 11,
  background: '#FDFCF9',
  outline: 'none',
};

const inputFocus: React.CSSProperties = {
  boxShadow: '0 0 0 3px rgba(240,252,151,.5)',
};

const buttonBase: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontWeight: 600,
  fontSize: 15,
  background: colors.red,
  color: '#fff',
  border: 'none',
  padding: '12px 22px',
  borderRadius: 11,
  cursor: 'pointer',
  transition: `transform .2s ${spring}`,
};

const buttonHover: React.CSSProperties = {
  transform: 'translateY(-2px)',
};

export function NewsletterSignup({
  subscribed: subscribedProp = false,
  eyebrow = 'Weekly Marketing Newsletter',
  heading = 'Go further every week.',
  body = 'One sharp idea on brand and story. No noise.',
  onSubscribe,
}: NewsletterSignupProps) {
  const [subscribed, setSubscribed] = useState(subscribedProp);
  const [email, setEmail] = useState('');
  const { isHovered, hoverProps } = useHover();
  const { isFocused, focusProps } = useFocus();

  // Keep in sync when the controlled prop changes (e.g. Storybook controls).
  React.useEffect(() => setSubscribed(subscribedProp), [subscribedProp]);

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe?.(email);
    setSubscribed(true);
  };

  return (
    <div style={cardStyle}>
      <div style={eyebrowStyle}>{eyebrow}</div>
      <h3 style={headingStyle}>{heading}</h3>
      <p style={bodyStyle}>{body}</p>
      {subscribed ? (
        <div style={confirmStyle}>✓ You&apos;re on the list. Talk soon.</div>
      ) : (
        <form onSubmit={submitNewsletter} style={{ display: 'flex', gap: 9 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            {...focusProps}
            style={{ ...inputBase, ...(isFocused ? inputFocus : {}) }}
          />
          <button
            type="submit"
            {...hoverProps}
            style={{ ...buttonBase, ...(isHovered ? buttonHover : {}) }}
          >
            Join
          </button>
        </form>
      )}
    </div>
  );
}
