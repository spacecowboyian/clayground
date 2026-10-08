// Fictional papers; any resemblance to a real almanac is a happy accident.
const papers = [
  { name: 'The Weekly Furrow', quote: '“Shockingly wholesome.”', style: 'italic' },
  { name: 'Plain Gazette', quote: '“We have questions.”', style: 'uppercase tracking-[0.12em] text-lg' },
  { name: 'Holmes Almanack', quote: '“Also: rain expected Tuesday.”', style: 'font-semibold' },
];

export function Press() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6" aria-labelledby="press-title">
      <h2 id="press-title" className="text-center text-sm text-[var(--churn-muted)]">
        Churn in the papers
      </h2>
      <ul className="mt-8 grid gap-8 text-center sm:grid-cols-3">
        {papers.map((p) => (
          <li key={p.name}>
            <p className={`font-display text-2xl ${p.style}`}>{p.name}</p>
            <p className="mt-2 text-sm text-[var(--churn-muted)]">{p.quote}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
