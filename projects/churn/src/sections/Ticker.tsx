const items = ['Courtship', 'Buggy rides', 'Sunday singing', 'Barn raisings', 'Shoofly pie', 'Long walks to the mill', 'Volleyball', 'Someone who owns a horse', 'Quilting bees', 'A good, firm handshake'];

function Diamond() {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
      <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" />
    </svg>
  );
}

/** A quilt binding strip: what Churn's singles say they're looking for. */
export function Ticker() {
  const strip = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6">
          <span className="whitespace-nowrap">{item}</span>
          <Diamond />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What our singles are looking for" className="overflow-hidden bg-[var(--churn-butter)] py-4 text-[var(--churn-ink)]">
      <div className="ticker-track font-display flex w-max text-xl font-medium italic sm:text-2xl">
        {strip(false)}
        {strip(true)}
      </div>
    </section>
  );
}
