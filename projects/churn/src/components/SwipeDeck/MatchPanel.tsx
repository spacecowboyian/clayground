import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@gearhead/ui';
import type { Profile } from '../../data/profiles';
import { Cameo } from '../ProfileArt/ProfileArt';

interface MatchPanelProps {
  profile: Profile;
  onClose: () => void;
}

/** Set like a printed announcement: paper, ink, and one butter-yellow action. */
export function MatchPanel({ profile, onClose }: MatchPanelProps) {
  const [letterSent, setLetterSent] = useState(false);

  return (
    <section
      role="alertdialog"
      aria-labelledby="match-title"
      aria-describedby="match-desc"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 rounded-2xl bg-[var(--churn-paper)] px-6 text-center text-[var(--churn-ink)]"
    >
      <h3 id="match-title" className="font-display text-[2.6rem] font-semibold italic leading-none tracking-[-0.02em]">
        It&rsquo;s a match.
      </h3>
      <Cameo profile={profile} className="w-32 shrink-0 shadow-none ring-0" />
      <p id="match-desc" className="max-w-[26ch] text-[15px] leading-snug">
        {letterSent
          ? `Letter sent to ${profile.name}. Expect a reply in 6–8 weeks, weather permitting.`
          : profile.matchLine}
      </p>
      <div className="flex w-full flex-col gap-2">
        {!letterSent && (
          <Button
            autoFocus
            onPress={() => setLetterSent(true)}
            className="w-full rounded-full bg-[var(--churn-ink)] py-3 font-semibold text-[var(--churn-paper)] hover:bg-[var(--quilt-plum)] focus-visible:ring-offset-[var(--churn-paper)]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Write a letter
          </Button>
        )}
        <Button
          autoFocus={letterSent}
          variant="ghost"
          onPress={onClose}
          className="w-full rounded-full py-3 text-[var(--churn-ink)] underline underline-offset-4 hover:bg-[var(--churn-paper-shade)] hover:text-[var(--churn-ink)] focus-visible:ring-offset-[var(--churn-paper)]"
        >
          Keep churning
        </Button>
      </div>
    </section>
  );
}
