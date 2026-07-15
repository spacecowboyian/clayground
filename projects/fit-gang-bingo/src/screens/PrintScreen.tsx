import { useState } from 'react';
import { Button } from '@gearhead/ui';
import { BingoCard } from '../components/BingoCard/BingoCard';
import { SQUARES, type Square } from '../data/squares';
import { HOT_ROD_ART } from '../data/hotRods';
import { shuffle } from '../utils/shuffle';

const CARDS_PER_SHEET = 4;

/** All 16 squares fill a 4x4 exactly, so one shuffle randomizes both the square
 *  order and where Free Space and Hot Rod land. */
function generateSheet(): Square[][] {
  return Array.from({ length: CARDS_PER_SHEET }, () => shuffle(SQUARES));
}

interface PrintScreenProps {
  onHome: () => void;
}

export function PrintScreen({ onHome }: PrintScreenProps) {
  const [cards, setCards] = useState<Square[][]>(generateSheet);

  return (
    <div className="print-root min-h-screen bg-[#222222]">
      <header className="no-print mx-auto flex max-w-[8.5in] flex-wrap items-center justify-between gap-4 px-4 pb-6 pt-10">
        <div>
          <Button variant="ghost" className="mb-2 px-0" onPress={onHome}>
            ← Home
          </Button>
          <h1 className="text-2xl font-black uppercase italic tracking-tight text-white">#FitGang Bingo</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Four cards, one letter-size sheet. Spot it. Yell it. Mark it.
          </p>
        </div>

        <div className="flex gap-3">
          <Button onPress={() => setCards(generateSheet())}>Regenerate</Button>
          <Button variant="outline" onPress={() => window.print()}>
            Print
          </Button>
        </div>
      </header>

      <main className="print-main flex justify-center px-4 pb-16">
        <div className="sheet grid grid-cols-2 grid-rows-2 gap-[0.15in] shadow-2xl">
          {cards.map((squares, i) => (
            <BingoCard
              key={i}
              squares={squares}
              // Each card on the sheet gets its own Hot Rod car.
              hotRodArt={HOT_ROD_ART[i % HOT_ROD_ART.length]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
