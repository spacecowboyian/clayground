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
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 px-4 py-6 md:max-w-xl md:gap-8 md:py-10 lg:max-w-2xl">
      <a
        href={OIO_YOUTUBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block w-full max-w-[440px] md:max-w-[560px] lg:max-w-[640px]"
      >
        <img
          src={oioBanner}
          alt="#FitGang Bingo — Spot it. Yell it. Mark it. Brought to you by the fit fanatics at OIO — youtube.com/@oioracing"
          className="h-auto w-full"
        />
      </a>

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
  );
}
