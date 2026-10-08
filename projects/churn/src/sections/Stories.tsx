import { Silhouette } from '../components/Silhouette/Silhouette';

const more = [
  { quote: 'We matched, he wrote me a letter, I wrote back. Eight months later we were on page two.', who: 'Esther & Jonas', meta: 'Holmes County · courting' },
  { quote: 'Honestly I just came for the horse. Doug is great.', who: 'Anonymous', meta: 'Elkhart County · still single' },
];

export function Stories() {
  return (
    <section id="stories" className="scroll-mt-8 bg-[var(--churn-paper)] text-[var(--churn-ink)]" aria-labelledby="stories-title">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
        <h2 id="stories-title" className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          Matched on <em className="font-medium text-[var(--quilt-wine)]">Churn.</em>
        </h2>

        <figure className="mt-14 grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          {/* The wedding silhouette: two profiles facing, cut from one sheet. */}
          <div className="mx-auto flex aspect-[5/4] w-64 items-end justify-center overflow-hidden rounded-[50%] border-[3px] border-[var(--churn-ink)] bg-[var(--churn-paper-shade)] px-6 pt-8 sm:w-72">
            <Silhouette kind="kapp" className="-mr-3 w-1/2 text-[var(--churn-ink)]" />
            <Silhouette kind="black-hat" beard mirrored className="-ml-3 w-1/2 text-[var(--churn-ink)]" />
          </div>
          <div>
            <blockquote className="font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
              &ldquo;I swiped right on Eli in March. By November we had raised a barn, a silo, and eleven goats.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-base">
              <span className="font-semibold">Sarah &amp; Eli</span>
              <span className="text-[var(--quilt-plum)]"> · married October 2025 · Lancaster County</span>
            </figcaption>
          </div>
        </figure>

        <div className="mt-16 grid gap-10 border-t border-dashed border-[var(--churn-ink)]/30 pt-10 md:grid-cols-2">
          {more.map((s) => (
            <figure key={s.who}>
              <blockquote className="font-display text-xl italic leading-snug">&ldquo;{s.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-semibold">{s.who}</span>
                <span className="text-[var(--quilt-plum)]"> · {s.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
