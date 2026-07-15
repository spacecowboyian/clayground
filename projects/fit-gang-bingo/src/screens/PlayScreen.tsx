import { Button } from '@gearhead/ui';
import { PlayCard } from '../components/PlayCard/PlayCard';
import { usePersistedCard } from '../hooks/usePersistedCard';
import oioBanner from '../assets/oio-banner.png';

const OIO_YOUTUBE_URL = 'https://youtube.com/@oioracing';

interface PlayScreenProps {
  onPrint: () => void;
  onRules: () => void;
}

export function PlayScreen({ onPrint, onRules }: PlayScreenProps) {
  const { squares, marks, hotRodArt, toggleMark, newCard } = usePersistedCard();

  return (
    <div className="min-h-screen bg-[#222222]">
      {/* Full-bleed on phones — the banner's own white touches the top and
          both edges of the viewport. From sm up, white runs the full width
          of the page as a header band (separating it from the dark body
          below) with the banner centered inside it. */}
      <div className="bg-white sm:py-3 md:py-4">
        <a
          href={OIO_YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full sm:mx-auto sm:max-w-[440px] md:max-w-[560px] lg:max-w-[640px]"
        >
          <img
            src={oioBanner}
            alt="#FitGang Bingo — Spot it. Yell it. Mark it. Brought to you by the fit fanatics at OIO — youtube.com/@oioracing"
            className="block h-auto w-full"
          />
        </a>
      </div>

      <div className="mx-auto flex max-w-md flex-col gap-3 px-4 pb-6 pt-3 md:max-w-xl md:gap-6 md:pb-10 lg:max-w-2xl">
        <header className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            Brought to you by the fit fanatics at{' '}
            <a
              href={OIO_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 underline underline-offset-2 hover:text-white"
            >
              OIO
            </a>
            .
          </p>
          <Button variant="ghost" className="px-2" onPress={onRules}>
            Rules
          </Button>
        </header>

        <PlayCard squares={squares} marks={marks} hotRodArt={hotRodArt} onToggle={toggleMark} />

        <Button className="w-full py-4 text-lg" onPress={newCard}>
          New Card
        </Button>

        <p className="text-center text-sm text-neutral-400">
          Are you a caveman? Then{' '}
          <button
            type="button"
            onClick={onPrint}
            className="text-neutral-200 underline underline-offset-2 hover:text-white"
          >
            print out your own cards
          </button>
          .
        </p>
      </div>
    </div>
  );
}
