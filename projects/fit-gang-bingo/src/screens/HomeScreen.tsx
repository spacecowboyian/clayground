import { Button } from '@gearhead/ui';
import headerArt from '../assets/header.png';

interface HomeScreenProps {
  onPlay: () => void;
  onPrint: () => void;
}

export function HomeScreen({ onPlay, onPrint }: HomeScreenProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <div className="w-full max-w-xs rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <img src={headerArt} alt="#FitGang Bingo — Spot it. Yell it. Mark it." className="w-full" />
      </div>
      <p className="text-sm text-neutral-400">Bingo for spotting Honda Fits from a moving car.</p>

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
