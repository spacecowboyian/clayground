import React, { useState } from 'react';
import { colors, font } from '../../tokens';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  /** The tab buttons + their panels. The first tab is active by default. */
  tabs: TabItem[];
}

/**
 * Stateful tabbed panel with a sliding pine active state. The active tab
 * gets a pine background / paper text; panels animate `sc-pop` on switch.
 * Ported pixel-for-pixel from the source.
 */
export function Tabs({ tabs }: TabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 4,
          background: '#F0EFE6',
          borderRadius: 12,
          padding: 5,
          position: 'relative',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              style={{
                flex: 1,
                fontFamily: font.ui,
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                padding: 10,
                borderRadius: 9,
                transition: 'all .25s ease',
                background: isActive ? colors.pine : 'transparent',
                color: isActive ? colors.paper : colors.ink,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div style={{ padding: '22px 16px 14px' }}>
        <p
          key={active?.id}
          style={{
            fontFamily: font.serif,
            fontSize: 16,
            color: colors.ink,
            lineHeight: 1.55,
            margin: 0,
            animation: 'sc-pop .25s ease both',
          }}
        >
          {active?.content}
        </p>
      </div>
    </div>
  );
}
