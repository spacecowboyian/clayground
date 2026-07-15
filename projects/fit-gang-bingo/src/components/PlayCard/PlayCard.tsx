import type { Square } from '../../data/squares';

interface PlayCardProps {
  squares: Square[];
  marks: Set<string>;
  hotRodArt?: string;
  onToggle: (id: string) => void;
}

/** A big red X, drawn with a white halo underneath so it reads over every
 *  card color including black and red. */
function MarkOverlay() {
  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <g strokeLinecap="round">
        <line x1="14" y1="14" x2="86" y2="86" stroke="white" strokeWidth="24" />
        <line x1="86" y1="14" x2="14" y2="86" stroke="white" strokeWidth="24" />
        <line x1="14" y1="14" x2="86" y2="86" stroke="var(--fgb-red)" strokeWidth="15" />
        <line x1="86" y1="14" x2="14" y2="86" stroke="var(--fgb-red)" strokeWidth="15" />
      </g>
    </svg>
  );
}

function CellContent({ square, hotRodArt }: { square: Square; hotRodArt?: string }) {
  if (square.kind === 'color') {
    return (
      <>
        <span
          className="aspect-square w-[42%] rounded-[15%] border-2 border-[var(--fgb-ink)]"
          style={{ backgroundColor: square.swatch }}
          aria-hidden="true"
        />
        <span className="text-[clamp(9px,3.2vw,14px)] font-black uppercase italic leading-[1.05] tracking-tight text-[var(--fgb-ink)]">
          {square.label}
        </span>
      </>
    );
  }

  const art = square.id === 'hot-rod' ? (hotRodArt ?? square.art) : square.art;

  return (
    <>
      <img src={art} alt={square.alt ?? square.label} className="max-h-[55%] max-w-[70%] object-contain" />
      {square.kind === 'generation' ? (
        <span className="text-[clamp(9px,3vw,13px)] font-black uppercase italic leading-[1.05] text-[var(--fgb-red)]">
          {square.years}
        </span>
      ) : square.note ? (
        <span className="text-[clamp(7px,2.4vw,10px)] font-bold uppercase italic leading-[1.05] text-[var(--fgb-ink)]">
          {square.note}
        </span>
      ) : null}
    </>
  );
}

function Cell({
  square,
  marked,
  hotRodArt,
  onToggle,
}: {
  square: Square;
  marked: boolean;
  hotRodArt?: string;
  onToggle: () => void;
}) {
  const isFree = square.id === 'free-space';

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isFree}
      aria-pressed={marked}
      aria-label={isFree ? 'Free space, marked' : `${square.label}${marked ? ', marked' : ''}`}
      className="relative flex flex-col items-center justify-center gap-1 border-0 bg-white p-1 text-center transition-transform active:enabled:scale-95"
    >
      <CellContent square={square} hotRodArt={hotRodArt} />
      {marked && <MarkOverlay />}
    </button>
  );
}

/** The phone-play card: same 16 squares as the printed sheet, sized for a
 *  thumb instead of a laser printer. Tap a square to mark it. */
export function PlayCard({ squares, marks, hotRodArt, onToggle }: PlayCardProps) {
  return (
    <div className="mx-auto grid aspect-square w-full max-w-[440px] grid-cols-4 grid-rows-4 gap-[2px] overflow-hidden rounded-2xl border-[3px] border-[var(--fgb-ink)] bg-[var(--fgb-rule)] p-[2px] md:max-w-[560px] lg:max-w-[640px]">
      {squares.map((square) => (
        <Cell
          key={square.id}
          square={square}
          marked={marks.has(square.id)}
          hotRodArt={hotRodArt}
          onToggle={() => onToggle(square.id)}
        />
      ))}
    </div>
  );
}
