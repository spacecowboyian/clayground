import { Accordion } from '@gearhead/ui';

const faqs = [
  { q: 'Is this allowed?', a: 'Please do not ask the bishop. We are in a gray area. Possibly a dark gray area. Not black, though.' },
  { q: 'Why are there no photos?', a: 'Graven images. Every profile gets a cut-paper silhouette instead, done by a cousin who is very good with scissors.' },
  { q: 'How do I charge my phone?', a: 'You don’t. Churn runs entirely on goodwill and, in a pinch, the diesel generator behind the milk house.' },
  { q: 'What does a Super Churn do?', a: 'It leaves a pound of fresh butter on their porch. They will know you are serious.' },
  { q: 'Is there a premium tier?', a: 'Churn Gold unlocks courting across district lines and one extra week of rumspringa.' },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-8 px-4 py-24 sm:px-6" aria-labelledby="faq-title">
      <h2 id="faq-title" className="font-display text-4xl font-semibold tracking-[-0.02em]">
        Questions, <em className="font-medium text-[var(--churn-butter)]">plainly answered.</em>
      </h2>
      <div className="mt-10 space-y-3">
        {faqs.map(({ q, a }) => (
          <Accordion key={q} title={<span className="text-base">{q}</span>}>
            <p className="max-w-[60ch] px-4 pb-5 pt-1 text-[15px] leading-relaxed text-[var(--churn-muted)]">{a}</p>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
