/**
 * 5280 Creative design tokens.
 * Source of truth for colors, typography, radii, spacing, and elevation.
 * Mirrors the CSS custom properties declared in styles/theme.css.
 */

export const colors = {
  // Core
  pine: '#184A4F', // primary
  jade: '#096D61', // secondary
  ink: '#16211F', // text
  muted: '#5C6B68', // secondary text
  // Accents
  red: '#FF3B3B', // signal / energy
  peri: '#5A70BB', // periwinkle
  gold: '#FBBA16', // highlight
  // Soft tints & neutrals
  blush: '#FFD0C7',
  sky: '#8CB6F2',
  lime: '#F0FC97',
  cream: '#FBF9F5', // page background
  surface: '#FFFFFF',
  border: '#E7E1D8',
  paper: '#F4F1EA', // light text on dark backgrounds
} as const;

export const font = {
  display: "'Crumb','TAY Crumb','Baloo 2',system-ui,sans-serif",
  serif: "'Minion 3','Source Serif 4',Georgia,serif",
  ui: "'Owners Narrow','Acumin Pro Wide','Archivo',system-ui,sans-serif",
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 18,
  pill: 999,
} as const;

/** 8-point spacing rhythm. */
export const space = [4, 8, 12, 16, 24, 32, 48] as const;

export const shadow = {
  sm: '0 1px 2px rgba(22,33,31,.06)',
  md: '0 6px 18px rgba(22,33,31,.10)',
  lg: '0 18px 40px rgba(22,33,31,.16)',
} as const;

/** The springy easing used across hover lifts. */
export const spring = 'cubic-bezier(.34,1.56,.64,1)';

export type ColorToken = keyof typeof colors;
