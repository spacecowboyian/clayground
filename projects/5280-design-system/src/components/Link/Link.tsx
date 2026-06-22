import React from 'react';
import { colors, font } from '../../tokens';
import { useHover } from '../../utils/useHover';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination URL. */
  href: string;
  children?: React.ReactNode;
}

/** Underlined text link: jade → red on hover, with matching border-color. */
export function Link({ href, children, ...rest }: LinkProps) {
  const { isHovered, hoverProps } = useHover();

  const base: React.CSSProperties = {
    fontFamily: font.ui,
    fontWeight: 600,
    fontSize: 15,
    color: colors.jade,
    textDecoration: 'none',
    borderBottom: `2px solid ${colors.jade}`,
    paddingBottom: 2,
    transition: 'color .2s ease,border-color .2s ease',
  };

  const hover: React.CSSProperties = {
    color: colors.red,
    borderColor: colors.red,
  };

  return (
    <a
      {...rest}
      {...hoverProps}
      href={href}
      style={{ ...base, ...(isHovered ? hover : {}) }}
    >
      {children}
    </a>
  );
}
