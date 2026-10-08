import { cn } from '@gearhead/ui';

export type SilhouetteKind = 'straw-hat' | 'black-hat' | 'kapp' | 'bonnet';

interface SilhouetteProps {
  kind: SilhouetteKind;
  beard?: boolean;
  /** Face left instead of right (for facing pairs). */
  mirrored?: boolean;
  className?: string;
}

// Cut-paper profile portraits, facing right in a 100×120 box. Each path is
// one closed outline: shoulder, back of head, headwear, then down the face.
const back = {
  man: 'M8 120 C10 100 22 92 38 88 C38 80 35 70 34 60 L33 47',
  woman: 'M10 120 C12 104 22 96 36 93 C40 92 42 90 43 86 C42 82 40 79 37 77',
};

const headwear: Record<SilhouetteKind, string> = {
  'black-hat': 'L20 46 Q17 45 20 42 L34 41 C34 32 35 24 38 21 Q50 18 62 21 C65 24 66 32 66 41 L84 42 Q87 43 84 45 L67 46',
  'straw-hat': 'L13 47 Q9 46 12 43 L34 41 C34 35 35 30 38 27 Q50 24 62 27 C65 30 66 35 66 41 L90 43 Q93 45 89 47 L67 46',
  kapp: 'C28 76 22 66 23 54 C24 40 32 30 44 27 C52 25 60 27 64 31 L65 36',
  bonnet: 'C26 76 18 62 19 48 C20 30 36 18 56 18 C66 18 73 22 76 28 C78 36 77 46 74 54',
};

const face = {
  man: 'C70 49 71 53 71 56 L78 65 Q79 67 77 68 L73 69 Q74 71 73 72 Q71 73 73 74 Q74 76 71 78',
  kapp: 'C68 38 70 42 70 47 L75 56 Q76 58 74 59 L71 59.5 Q72 61.5 71 62.5 Q69.5 63 71 64 Q72 66 69.5 67',
  bonnet: 'L76 57 Q77 59 74.5 60 L71 60.5 Q72 62.5 71 63.5 Q69.5 64 71 65 Q72 67 69.5 68',
};

const chin = {
  clean: 'C72 82 70 85 65 86 C61 87 60 90 60 95 C72 98 87 104 92 120 Z',
  // Amish beards skip the moustache: chin and jaw only.
  beard: 'C76 84 76 95 68 101 C64 102 61 100 60 97 C72 99 87 105 92 120 Z',
  woman: 'C70 71 68 73 64 74 C61 75 59.5 78 59.5 83 C62 86 70 90 78 96 C84 101 88 110 90 120 Z',
};

function outline(kind: SilhouetteKind, beard: boolean) {
  if (kind === 'kapp' || kind === 'bonnet') {
    return [back.woman, headwear[kind], face[kind], chin.woman].join(' ');
  }
  return [back.man, headwear[kind], face.man, beard ? chin.beard : chin.clean].join(' ');
}

export function Silhouette({ kind, beard = false, mirrored = false, className }: SilhouetteProps) {
  return (
    <svg viewBox="0 0 100 120" className={cn('block', className)} aria-hidden="true">
      <g transform={mirrored ? 'translate(100 0) scale(-1 1)' : undefined}>
        <path d={outline(kind, beard)} fill="currentColor" />
        {kind === 'bonnet' && (
          /* The seam where the bonnet's brim meets its crown */
          <path d="M34 66 Q30 38 64 22" fill="none" stroke="var(--churn-paper)" strokeWidth="1.3" strokeLinecap="round" />
        )}
        {kind === 'kapp' && (
          /* The kapp's front edge and a loose tie, cut through the paper */
          <path d="M64.5 33 Q56 46 50 66 Q52 80 55 96" fill="none" stroke="var(--churn-paper)" strokeWidth="1.3" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
}
