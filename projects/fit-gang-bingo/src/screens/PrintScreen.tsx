import { useState } from 'react';
import { Button } from '@gearhead/ui';
import { BingoCard } from '../components/BingoCard/BingoCard';
import { SQUARES, type Square } from '../data/squares';
import { HOT_ROD_ART } from '../data/hotRods';
import { shuffle } from '../utils/shuffle';
import oioBanner from '../assets/oio-banner.png';

const CARDS_PER_SHEET = 4;
const OIO_YOUTUBE_URL = 'https://youtube.com/@oioracing';

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
      <header className="no-print mx-auto flex max-w-[8.5in] flex-col gap-4 px-4 pb-6 pt-10">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" className="px-0" onPress={onHome}>
            ← Home
          </Button>
        </div>

        <a href={OIO_YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="block">
          <img
            src={oioBanner}
            alt="#FitGang Bingo — Spot it. Yell it. Mark it. Brought to you by the fit fanatics at OIO — youtube.com/@oioracing"
            className="h-auto w-full"
          />
        </a>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">
            Four cards, one letter-size sheet. Brought to you by the fit
            fanatics at{' '}
            <a
              href={OIO_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-neutral-300"
            >
              OIO
            </a>
            .
          </p>

          <div className="flex gap-3">
            <Button onPress={() => setCards(generateSheet())}>Regenerate</Button>
            <Button variant="outline" onPress={() => window.print()}>
              Print
            </Button>
          </div>
        </div>
      </header>

      <main className="print-main flex justify-center px-4 pb-16">
        {/* sheet-frame reserves the scaled-down layout footprint; .sheet stays
            full-size underneath and is visually shrunk with transform. See
            index.css for why (zoom is not reliably supported on iOS Safari). */}
        <div className="sheet-frame">
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
        </div>
      </main>
    </div>
  );
}
