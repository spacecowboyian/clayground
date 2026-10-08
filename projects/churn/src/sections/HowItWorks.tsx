const steps = [
  { verb: 'Swipe.', body: 'Left to pass, right to court. Swiping is done with a finger, which the bishop has ruled is technically a hand tool.' },
  { verb: 'Court.', body: 'Matched? Write a letter. Or wait for the Sunday singing and let them drive you home the long way.' },
  { verb: 'Raise a barn.', body: 'Get published in church, invite four hundred of your closest cousins, and build something together.' },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="how-title">
      <h2 id="how-title" className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Courting, <em className="font-medium text-[var(--churn-butter)]">simplified.</em>
      </h2>
      <ol className="mt-12 border-t border-dashed border-[var(--quilt-seam)]">
        {steps.map(({ verb, body }) => (
          <li
            key={verb}
            className="grid gap-2 border-b border-dashed border-[var(--quilt-seam)] py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-10"
          >
            <p className="font-display text-[clamp(2.25rem,6vw,4rem)] font-medium italic leading-none tracking-[-0.03em]">{verb}</p>
            <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--churn-muted)]">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
