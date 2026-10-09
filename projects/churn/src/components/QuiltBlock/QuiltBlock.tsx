import { useId } from 'react';
import { cn } from '@gearhead/ui';
import fabric from '../../assets/texture-quilt.webp';

export type QuiltPattern = 'center-diamond' | 'bars' | 'nine-patch' | 'sunshine';

interface QuiltBlockProps {
  pattern: QuiltPattern;
  /** Cloth colours, outermost (border) first. */
  colors: [string, string, string];
  width?: number;
  height?: number;
  className?: string;
}

const BORDER = 16;
/** Narrow inner border between the wide outer border and the field. */
const INNER = 5;
const FABRIC_TILE = 120;
/** Spacing of the diagonal hand-quilting crosshatch over the field. */
const HATCH = 11;

/** Traditional Amish quilt layouts, drawn as plain geometry. */
export function QuiltBlock({ pattern, colors, width = 200, height = 260, className }: QuiltBlockProps) {
  const clipId = useId();
  const fabricId = useId();
  const hatchId = useId();
  const [border, a, b] = colors;
  const x0 = BORDER + INNER;
  const y0 = BORDER + INNER;
  const w = width - x0 * 2;
  const h = height - y0 * 2;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={cn('block', className)} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x={x0} y={y0} width={w} height={h} />
        </clipPath>
        {/* Cotton weave, tiled over the whole quilt so the geometry reads as cloth */}
        <pattern id={fabricId} patternUnits="userSpaceOnUse" width={FABRIC_TILE} height={FABRIC_TILE}>
          <image href={fabric} width={FABRIC_TILE} height={FABRIC_TILE} />
        </pattern>
        <pattern id={hatchId} patternUnits="userSpaceOnUse" width={HATCH} height={HATCH} patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2={HATCH} stroke="var(--churn-paper)" strokeOpacity="0.16" strokeWidth="0.6" strokeDasharray="2 1.6" />
          <line x1="0" y1="0" x2={HATCH} y2="0" stroke="var(--churn-paper)" strokeOpacity="0.16" strokeWidth="0.6" strokeDasharray="2 1.6" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={border} />
      {/* Contrasting corner blocks where the borders meet, an Amish signature */}
      {[
        [0, 0],
        [width - BORDER, 0],
        [0, height - BORDER],
        [width - BORDER, height - BORDER],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={BORDER} height={BORDER} fill={b} />
      ))}
      <rect x={BORDER} y={BORDER} width={width - BORDER * 2} height={height - BORDER * 2} fill={b} />
      <rect x={x0} y={y0} width={w} height={h} fill={a} />
      <g clipPath={`url(#${clipId})`}>
        {field(pattern, { x0, y0, w, h, cx, cy, a, b, border })}
        <rect x={x0} y={y0} width={w} height={h} fill={`url(#${hatchId})`} />
      </g>
      <rect width={width} height={height} fill={`url(#${fabricId})`} style={{ mixBlendMode: 'soft-light' }} opacity="0.7" />
      {/* Quilting stitch just inside the border */}
      <rect
        x={BORDER / 2}
        y={BORDER / 2}
        width={width - BORDER}
        height={height - BORDER}
        fill="none"
        stroke="var(--churn-paper)"
        strokeOpacity="0.35"
        strokeWidth="0.8"
        strokeDasharray="3 2.5"
      />
    </svg>
  );
}

interface FieldGeometry {
  x0: number;
  y0: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  a: string;
  b: string;
  border: string;
}

function field(pattern: QuiltPattern, g: FieldGeometry) {
  const { x0, y0, w, h, cx, cy, a, b, border } = g;
  switch (pattern) {
    case 'center-diamond': {
      const r = Math.min(w, h) / 2 - 4;
      const s = r * 0.62;
      return (
        <>
          <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} fill={b} />
          <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill={border} />
        </>
      );
    }
    case 'bars': {
      const n = 7;
      return Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x0 + (w / n) * i} y={y0} width={w / n + 0.5} height={h} fill={i % 2 ? b : a} />
      ));
    }
    case 'nine-patch': {
      const cols = 5;
      const size = w / cols;
      const rows = Math.ceil(h / size);
      return Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (c + r) % 2 ? (
          <rect key={i} x={x0 + c * size} y={y0 + r * size} width={size + 0.5} height={size + 0.5} fill={b} />
        ) : null;
      });
    }
    case 'sunshine': {
      // Sunshine & Shadow: concentric diamonds radiating from the centre.
      const step = 14;
      const rings = Math.ceil((w + h) / 2 / step) + 1;
      return Array.from({ length: rings }, (_, i) => {
        const r = (rings - i) * step;
        const fill = [b, a, border][i % 3];
        return <polygon key={i} points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} fill={fill} />;
      });
    }
  }
}
