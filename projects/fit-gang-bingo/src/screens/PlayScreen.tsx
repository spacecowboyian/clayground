import { Button } from '@gearhead/ui';
import { PlayCard } from '../components/PlayCard/PlayCard';
import { usePersistedCard } from '../hooks/usePersistedCard';

interface PlayScreenProps {
  onHome: () => void;
  onRules: () => void;
}

export function PlayScreen({ onHome, onRules }: PlayScreenProps) {
  const { squares, marks, hotRodArt, toggleMark, newCard } = usePersistedCard();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 px-4 py-6">
      <header className="flex items-center justify-between">
        <Button variant="ghost" className="px-2" onPress={onHome}>
          ← Home
        </Button>
        <Button variant="ghost" className="px-2" onPress={onRules}>
          Rules
        </Button>
      </header>

      <PlayCard squares={squares} marks={marks} hotRodArt={hotRodArt} onToggle={toggleMark} />

      <Button className="w-full py-4 text-lg" onPress={newCard}>
        New Card
      </Button>
    </div>
  );
}
