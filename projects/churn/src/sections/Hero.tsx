import { ChurnLogo } from '../components/ChurnLogo/ChurnLogo';
import { PhoneFrame } from '../components/PhoneFrame/PhoneFrame';
import { SwipeDeck } from '../components/SwipeDeck/SwipeDeck';
import { GetChurnDialog } from './GetChurnDialog';
import dusk from '../assets/hero-buggy-dusk.webp';

export function Hero() {
  return (
    <header className="overflow-clip">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6" aria-label="Main">
        <ChurnLogo className="text-[1.75rem]" />
        <div className="flex items-center gap-6 text-sm text-[var(--churn-muted)]">
          <a href="#how" className="hidden underline-offset-4 hover:text-[var(--churn-paper)] hover:underline sm:inline">How courting works</a>
          <a href="#stories" className="hidden underline-offset-4 hover:text-[var(--churn-paper)] hover:underline sm:inline">Stories</a>
          <GetChurnDialog className="px-5 py-2 text-sm">Get Churn</GetChurnDialog>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 pt-10 text-center sm:px-6 sm:pt-16">
        <h1 className="font-display text-[clamp(3.1rem,9vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
          Find your <em className="font-medium text-[var(--churn-butter)]">butter</em> half.
        </h1>
        <p className="mx-auto mt-6 max-w-[38ch] text-lg leading-relaxed text-[var(--churn-muted)] sm:text-xl">
          The dating app for people who don&rsquo;t use apps. Swipe right to court, left to keep churning.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <GetChurnDialog />
          <a href="#how" className="text-sm text-[var(--churn-paper)] underline underline-offset-4 hover:text-[var(--churn-butter)]">
            How courting works
          </a>
        </div>
      </div>

      {/* The phone sits over a buggy at dusk. */}
      <div className="relative mt-20 sm:mt-28">
        <div className="pointer-events-none absolute inset-0 overflow-clip [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]">
          <img
            src={dusk}
            alt=""
            width={1600}
            height={900}
            className="dusk-parallax absolute inset-x-0 -top-[30%] h-[160%] w-full scale-105 object-cover opacity-80 blur-[3px] brightness-110"
          />
        </div>
        <div className="relative mx-auto flex max-w-6xl justify-center px-4 pb-20">
          <div className="relative">
            <h2 className="sr-only">Try it: swipe through tonight&rsquo;s singles</h2>
            <PhoneFrame>
              <SwipeDeck />
            </PhoneFrame>
            <p className="mt-4 text-center text-sm text-[var(--churn-paper)]">Drag a card, or use the buttons.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
