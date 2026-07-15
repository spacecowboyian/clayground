import { Button } from '@gearhead/ui';

interface RulesScreenProps {
  onBack: () => void;
}

const RULES = [
  'Call it out, then mark it. Say it out loud before you mark a square.',
  'On a callout, everyone marks it. Whoever yells it, the whole car marks that square.',
  "The Fit you're sitting in doesn't count. You can't mark your own car's color or generation.",
  'One sighting can mark several squares. A purple GE8 with wheels is Purple + GE8 + Hot Rod.',
  'Free space starts marked.',
  'First to 4 in a row wins. Row, column, or diagonal.',
  'Disputes are settled by the car, not the app.',
  'No convoy rule. Whether the Fit next to you counts is deliberately unwritten. The car argues about it.',
];

export function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-6">
      <header>
        <Button variant="ghost" className="px-2" onPress={onBack}>
          ← Back
        </Button>
      </header>

      <div>
        <h1 className="text-2xl font-black uppercase italic tracking-tight text-white">Rules</h1>
        <p className="mt-1 text-sm font-bold uppercase italic tracking-tight text-[var(--fgb-red)]">
          Spot it. Yell it. Mark it.
        </p>
      </div>

      <ol className="flex flex-col gap-4 text-sm leading-relaxed text-neutral-200">
        {RULES.map((rule, i) => (
          <li key={rule} className="flex gap-3">
            <span className="font-black text-[var(--fgb-red)]">{i + 1}.</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
