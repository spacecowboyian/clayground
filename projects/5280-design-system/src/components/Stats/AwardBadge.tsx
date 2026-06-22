import React from 'react';
import { colors, font } from '../../tokens';

export interface AwardBadgeProps {
  /** Award name, e.g. 'Telly Award'. */
  name?: string;
  /** Tier line, e.g. 'Gold · Branded Film'. */
  tier?: string;
  /** Swatch color of the circular icon. */
  color?: string;
}

/** A single award badge card: circle icon swatch + name + tier line. */
export function AwardBadge({
  name = 'Telly Award',
  tier = 'Gold · Branded Film',
  color = colors.gold,
}: AwardBadgeProps) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 140,
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font.display,
          fontWeight: 800,
          color: colors.ink,
        }}
      >
        ★
      </div>
      <div>
        <div
          style={{
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 12,
            color: colors.muted,
          }}
        >
          {tier}
        </div>
      </div>
    </div>
  );
}
