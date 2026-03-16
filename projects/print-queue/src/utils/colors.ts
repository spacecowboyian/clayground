/** Maps common filament color names (case-insensitive) to hex values. */
const COLOR_NAME_MAP: Record<string, string> = {
  pink: '#f472b6', purple: '#a855f7', 'light blue': '#7dd3fc',
  yellow: '#fde047', blue: '#3b82f6', 'dark blue': '#1e40af',
  red: '#ef4444', green: '#22c55e', orange: '#f97316',
  white: '#f5f5f5', black: '#1a1a1a', gray: '#9ca3af', tbd: '#6b7280',
  gold: '#f59e0b', cyan: '#06b6d4',
}

/**
 * Converts a filament color name to a CSS hex color.
 * Falls back to a neutral gray when the name is not recognized.
 */
export function colorNameToHex(name: string): string {
  return COLOR_NAME_MAP[name.toLowerCase()] ?? '#9ca3af'
}
