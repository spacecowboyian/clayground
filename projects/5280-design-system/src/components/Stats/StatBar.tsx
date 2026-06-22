import React, { useEffect, useRef, useState } from 'react';
import { colors, font, radius } from '../../tokens';
import { useInView } from '../../utils/useInView';

export interface Stat {
  /** Target number to count up to. */
  value: number;
  /** Optional suffix appended to the number, e.g. '+' or '%'. */
  suffix?: string;
  /** Caption shown beneath the number. */
  label: string;
}

export interface StatBarProps {
  /** The four (or more) count-up figures. */
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: 14, suffix: '+', label: 'Awards won' },
  { value: 212, suffix: '%', label: 'Avg. recall lift' },
  { value: 60, suffix: '+', label: 'Stories told' },
  { value: 100, suffix: '%', label: 'Heart, every time' },
];

const DURATION = 1400; // ms
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Count-up cell: animates 0 → value with an ease-out cubic when triggered. */
function StatNumber({ stat, active }: { stat: Stat; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setDisplay(Math.round(easeOutCubic(t) * stat.value));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [active, stat.value]);

  return (
    <div>
      <div
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 50,
          lineHeight: 1,
          color: colors.lime,
        }}
      >
        {display}
        {stat.suffix ?? ''}
      </div>
      <div
        style={{
          fontFamily: font.ui,
          fontSize: 13,
          letterSpacing: '.06em',
          color: '#9FC2BF',
          marginTop: 8,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

/** Pine stats band with numbers that count up on scroll-into-view. */
export function StatBar({ stats = DEFAULT_STATS }: StatBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        background: colors.pine,
        borderRadius: radius.lg,
        padding: '40px 36px',
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length},1fr)`,
        gap: 24,
        color: colors.paper,
      }}
    >
      {stats.map((stat, i) => (
        <StatNumber key={i} stat={stat} active={inView} />
      ))}
    </div>
  );
}
