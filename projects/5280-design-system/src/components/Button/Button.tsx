import React from 'react';
import { colors, font, radius, spring } from '../../tokens';
import { useHover } from '../../utils/useHover';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Pine `primary`, red `accent`, `outline`, or `ghost`. */
  variant?: ButtonVariant;
  /** Padding / font-size scale. */
  size?: ButtonSize;
  /** Render the small lime-ringed circle icon + gap before the label. */
  icon?: boolean;
  children?: React.ReactNode;
}

/** Padding + font-size per size, ported from the source markup. */
const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 13, padding: '9px 18px' },
  md: { fontSize: 15, padding: '13px 26px' },
  lg: { fontSize: 17, padding: '16px 34px' },
};

/** When an icon is present the right/left padding tightens slightly. */
const iconPadding: Record<ButtonSize, string> = {
  sm: '9px 16px 9px 14px',
  md: '13px 24px 13px 22px',
  lg: '16px 32px 16px 30px',
};

const variantBase: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: colors.pine,
    color: colors.paper,
    border: 'none',
  },
  accent: {
    background: colors.red,
    color: '#fff',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: colors.pine,
    border: `2px solid ${colors.pine}`,
  },
  ghost: {
    background: 'transparent',
    color: colors.pine,
    border: 'none',
  },
};

const variantHover: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 22px rgba(24,74,79,.32)',
    background: '#13403F',
  },
  accent: {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 22px rgba(255,59,59,.34)',
  },
  outline: {
    transform: 'translateY(-3px)',
    background: colors.pine,
    color: colors.paper,
  },
  ghost: {
    background: '#F0EFE6',
  },
};

const variantTransition: Record<ButtonVariant, string> = {
  primary: `transform .22s ${spring},box-shadow .22s ease,background .2s ease`,
  accent: `transform .22s ${spring},box-shadow .22s ease`,
  outline: `transform .22s ${spring},background .2s ease,color .2s ease`,
  ghost: 'background .2s ease',
};

const disabledStyle: React.CSSProperties = {
  background: '#D9D3C8',
  color: '#9A9488',
  border: 'none',
  cursor: 'not-allowed',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon = false,
  disabled = false,
  children,
  ...rest
}: ButtonProps) {
  const { isHovered, hoverProps } = useHover();

  const base: React.CSSProperties = {
    fontFamily: font.ui,
    fontWeight: 600,
    fontSize: sizeStyles[size].fontSize,
    borderRadius: radius.pill,
    cursor: 'pointer',
    padding: icon ? iconPadding[size] : sizeStyles[size].padding,
    ...variantBase[variant],
    transition: variantTransition[variant],
    ...(icon
      ? { display: 'inline-flex', alignItems: 'center', gap: 9 }
      : {}),
  };

  const style: React.CSSProperties = disabled
    ? { ...base, ...disabledStyle }
    : { ...base, ...(isHovered ? variantHover[variant] : {}) };

  return (
    <button
      {...rest}
      {...(disabled ? {} : hoverProps)}
      disabled={disabled}
      style={style}
    >
      {icon && (
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: `2px solid ${colors.lime}`,
          }}
        />
      )}
      {children}
    </button>
  );
}
