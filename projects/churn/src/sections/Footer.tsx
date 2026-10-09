import { Mail, Pin } from 'lucide-react';
import { ChurnLogo } from '../components/ChurnLogo/ChurnLogo';
import { QuiltBlock } from '../components/QuiltBlock/QuiltBlock';
import { GetChurnDialog } from './GetChurnDialog';
import bulletinBoard from '../assets/bulletin-board.webp';

const badgeClass =
  'min-w-[13rem] justify-start gap-3 rounded-xl bg-[var(--churn-paper)] px-4 py-2.5 text-left text-[var(--churn-ink)] hover:bg-[var(--churn-paper-shade)]';

function Badge({ icon, small, big }: { icon: React.ReactNode; small: string; big: string }) {
  return (
    <GetChurnDialog className={badgeClass}>
      {icon}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px]">{small}</span>
        <span className="font-display text-lg font-semibold">{big}</span>
      </span>
    </GetChurnDialog>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="relative overflow-hidden">
        <QuiltBlock
          pattern="bars"
          colors={['var(--quilt-wine)', 'var(--quilt-plum)', 'var(--quilt-violet)']}
          width={600}
          height={260}
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-balance">
            Somebody out there is <em className="font-medium text-[var(--churn-butter)]">churning for you.</em>
          </h2>
          <p className="mt-5 text-lg">Available wherever bulletin boards are found.</p>
          <img
            src={bulletinBoard}
            alt="A general-store bulletin board with a pinned card reading “CHURN, sign up here” among notices for honey, a buggy, and a quilting bee."
            width={1200}
            height={900}
            loading="lazy"
            className="mx-auto mt-8 w-full max-w-lg -rotate-1 drop-shadow-[0_18px_30px_rgb(0_0_0/0.5)]"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Badge icon={<Pin className="h-6 w-6" aria-hidden="true" />} small="Pin it on the" big="Bulletin Board" />
            <Badge icon={<Mail className="h-6 w-6" aria-hidden="true" />} small="Send away for it by" big="Post" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-[var(--churn-muted)] sm:flex-row sm:px-6">
        <ChurnLogo className="text-xl" />
        <p>&copy; 1826&ndash;2026 Churn. Made by hand. A parody: no real app, no real profiles.</p>
      </div>
    </footer>
  );
}
