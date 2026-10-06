import { METRICS, type Metric } from './metrics';

/**
 * Metric picker. Hand-rolled rather than React Aria for the same reason the
 * rest of this project is: nothing with a framework runtime fits on the
 * dongle's flash. That means focus management, roving arrow keys, Escape and
 * focus restoration are all explicit here — do not trim them.
 */
export function openMetricPicker(selectedId: string, onPick: (id: string) => void): void {
  const previous = document.activeElement as HTMLElement | null;

  const scrim = document.createElement('div');
  scrim.className = 'picker';
  scrim.innerHTML = `
    <div class="picker__sheet" role="dialog" aria-modal="true" aria-label="Choose a readout">
      <p class="picker__title">Choose a readout</p>
      <div class="picker__list" role="menu">${groups()}</div>
      <button type="button" class="picker__cancel" data-role="cancel">Cancel</button>
    </div>`;

  const items = [...scrim.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')];
  const cancel = scrim.querySelector<HTMLButtonElement>('[data-role="cancel"]');
  const focusable = cancel ? [...items, cancel] : items;

  for (const item of items) {
    if (item.dataset.id === selectedId) item.setAttribute('aria-checked', 'true');
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      close();
      if (id) onPick(id);
    });
  }
  cancel?.addEventListener('click', close);

  // A tap on the backdrop dismisses, but only when it is the backdrop itself —
  // not a click that bubbled up out of the sheet.
  scrim.addEventListener('pointerdown', (e) => {
    if (e.target === scrim) close();
  });

  scrim.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'Tab') {
      // Trap: the sheet is modal, so Tab must cycle inside it.
      e.preventDefault();
      step(e.shiftKey ? -1 : 1);
      return;
    }
    const delta = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (delta !== 0) {
      e.preventDefault();
      step(delta);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      focusable[e.key === 'Home' ? 0 : focusable.length - 1]?.focus();
    }
  });

  function step(delta: number): void {
    const at = focusable.indexOf(document.activeElement as HTMLButtonElement);
    const next = (at + delta + focusable.length) % focusable.length;
    focusable[next]?.focus();
  }

  function close(): void {
    scrim.remove();
    previous?.focus();
  }

  document.body.append(scrim);
  (items.find((i) => i.dataset.id === selectedId) ?? items[0])?.focus();
}

function groups(): string {
  const byGroup = new Map<Metric['group'], Metric[]>();
  for (const metric of METRICS) {
    const list = byGroup.get(metric.group) ?? [];
    list.push(metric);
    byGroup.set(metric.group, list);
  }
  return [...byGroup]
    .map(
      ([group, list]) => `
      <p class="picker__group" role="presentation">${group}${
        group === 'Session' ? ' · tap tile to reset' : ''
      }</p>
      ${list
        .map(
          (m) => `<button type="button" role="menuitemradio" aria-checked="false"
             class="picker__item" data-id="${m.id}">
             <span>${m.menuLabel}</span><span class="picker__unit">${m.unit}</span>
           </button>`,
        )
        .join('')}`,
    )
    .join('');
}
