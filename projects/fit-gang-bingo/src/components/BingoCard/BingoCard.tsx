import headerArt from '../../assets/header.png';
import type { Square } from '../../data/squares';

interface BingoCardProps {
  squares: Square[];
  /** Which Hot Rod artwork this card uses. Cards on a sheet each get a different one. */
  hotRodArt?: string;
  className?: string;
}

/** Paint-chip proportion: colour on top, and the bottom of every cell stays white.
 *  That white band is the mark zone — it sits in the same place on all 16 squares,
 *  so an X reads even on Black or Dark Blue, which would swallow ink entirely if
 *  the chip bled to the edge. */
const CELL = 'flex flex-col items-center bg-white p-[0.03in] text-center';
const MARK_ZONE = 'flex flex-1 items-center justify-center';

function ColorCell({ square }: { square: Square }) {
  return (
    <div className={CELL}>
      <span
        className="w-full basis-[50%] rounded-[0.04in] border-[1.5px] border-[var(--fgb-ink)]"
        style={{ backgroundColor: square.swatch }}
        aria-hidden="true"
      />
      <span className={MARK_ZONE}>
        <span className="text-[6.5pt] font-black uppercase italic leading-[1.05] tracking-tight text-[var(--fgb-ink)]">
          {square.label}
        </span>
      </span>
    </div>
  );
}

function GenerationCell({ square }: { square: Square }) {
  return (
    <div className={CELL}>
      <span className="flex basis-[50%] items-center justify-center">
        <img
          src={square.art}
          alt={square.alt ?? square.label}
          className="max-h-full max-w-full object-contain"
        />
      </span>
      <span className={MARK_ZONE}>
        <span className="text-[6pt] font-black uppercase italic leading-[1.05] tracking-tight text-[var(--fgb-red)]">
          {square.years}
        </span>
      </span>
    </div>
  );
}

function UtilityCell({ square, art }: { square: Square; art?: string }) {
  return (
    <div className={CELL}>
      <span className="flex basis-[50%] items-center justify-center">
        <img
          src={art ?? square.art}
          alt={square.alt ?? square.label}
          className="max-h-full max-w-full object-contain"
        />
      </span>
      {/* Live text, not baked into the artwork: at this cell size the printed
          caption collapsed into an unreadable smudge. */}
      <span className={MARK_ZONE}>
        {square.note && (
          <span className="text-[5pt] font-bold uppercase italic leading-[1.05] tracking-tight text-[var(--fgb-ink)]">
            {square.note}
          </span>
        )}
      </span>
    </div>
  );
}

export function BingoCard({ squares, hotRodArt, className }: BingoCardProps) {
  return (
    <article
      className={`flex flex-col border-[3px] border-[var(--fgb-ink)] bg-white p-[0.1in] ${className ?? ''}`}
    >
      <header className="mb-[0.07in]">
        <img
          src={headerArt}
          alt="#FitGang Bingo — Spot it. Yell it. Mark it."
          className="h-auto w-full"
        />
      </header>

      {/* The rules are the container's background showing through the gaps, so
          interior lines stay a single hairline instead of doubling up. */}
      <div className="grid flex-1 grid-cols-4 grid-rows-4 gap-[1.5px] border-[1.5px] border-[var(--fgb-rule)] bg-[var(--fgb-rule)]">
        {squares.map((square) =>
          square.kind === 'utility' ? (
            <UtilityCell
              key={square.id}
              square={square}
              art={square.id === 'hot-rod' ? hotRodArt : undefined}
            />
          ) : square.kind === 'generation' ? (
            <GenerationCell key={square.id} square={square} />
          ) : (
            <ColorCell key={square.id} square={square} />
          ),
        )}
      </div>
    </article>
  );
}
