import { Button } from '@gearhead/ui';
import oioBanner from '../assets/oio-banner.png';

const OIO_YOUTUBE_URL = 'https://youtube.com/@oioracing';

interface HomeScreenProps {
  onPlay: () => void;
  onPrint: () => void;
}

export function HomeScreen({ onPlay, onPrint }: HomeScreenProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <a
        href={OIO_YOUTUBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
      >
        <img
          src={oioBanner}
          alt="#FitGang Bingo — Spot it. Yell it. Mark it. Brought to you by the fit fanatics at OIO — youtube.com/@oioracing"
          className="w-full"
        />
      </a>
      <p className="text-sm text-neutral-400">
        Bingo for spotting Honda Fits from a moving car. Brought to you by the
        fit fanatics at{' '}
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

      <div className="flex w-full flex-col gap-3">
        <Button className="w-full py-4 text-lg" onPress={onPlay}>
          Play on your phone
        </Button>
        <Button variant="outline" className="w-full py-4 text-lg" onPress={onPrint}>
          Print a card
        </Button>
      </div>
    </div>
  );
}
