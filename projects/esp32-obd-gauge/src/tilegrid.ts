import { DEFAULT_SLOTS, METRIC_BY_ID, SLOT_COUNT, type Metric } from './metrics';
import { openMetricPicker } from './menu';
import type { PeakTracker } from './peaks';
import type { TelemetryState } from './telemetry/types';
import { fmt } from './units';

const STORE_KEY = 'obd-gauge.slots';
/** How long a press has to hold before it counts as "open the picker". */
const HOLD_MS = 450;
/** Finger drift past this is a scroll, not a press. */
const DRIFT_PX = 10;

interface Cell {
  button: HTMLButtonElement;
  label: HTMLElement;
  value: HTMLElement;
  unit: HTMLElement;
  box: HTMLElement;
  /** Last text and width the numeral was sized against. */
  fitted: string;
}

export interface TileGrid {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

/**
 * The configurable half of the dash. Each slot holds any metric:
 *   press and hold  -> pick what goes in this slot
 *   tap             -> reset it, if it is a session value
 * The assignment persists per phone in localStorage.
 */
export function createTileGrid(peaks: PeakTracker): TileGrid {
  const el = document.createElement('section');
  el.className = 'tiles';
  el.setAttribute('aria-label', 'Readouts');

  let slots = loadSlots();
  let lastState: TelemetryState | null = null;

  const cells = Array.from({ length: SLOT_COUNT }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tile';
    button.innerHTML = `
      <span class="tile__label"><span data-role="label"></span><span
        class="tile__unit" data-role="unit"></span></span>
      <span class="tile__value"><span data-role="value">––</span></span>`;
    wireSlot(button, index);
    el.append(button);
    return {
      button,
      label: must<HTMLElement>(button, '[data-role="label"]'),
      value: must<HTMLElement>(button, '[data-role="value"]'),
      unit: must<HTMLElement>(button, '[data-role="unit"]'),
      /* The whole numeral row — what gets measured and scaled. */
      box: must<HTMLElement>(button, '.tile__value'),
      fitted: '',
    };
  });

  function wireSlot(button: HTMLButtonElement, index: number): void {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let origin: { x: number; y: number } | null = null;
    // Set when a hold fires, so the click that follows the release does not
    // also reset the value the picker was just opened over.
    let heldOpen = false;

    const cancelHold = (): void => {
      clearTimeout(timer);
      timer = undefined;
      origin = null;
    };

    button.addEventListener('pointerdown', (e) => {
      origin = { x: e.clientX, y: e.clientY };
      heldOpen = false;
      timer = setTimeout(() => {
        heldOpen = true;
        cancelHold();
        pick(index);
      }, HOLD_MS);
    });
    button.addEventListener('pointermove', (e) => {
      if (!origin) return;
      if (Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > DRIFT_PX) cancelHold();
    });
    for (const event of ['pointerup', 'pointercancel', 'pointerleave'] as const) {
      button.addEventListener(event, cancelHold);
    }

    // Long-press on iOS also raises contextmenu; swallow it so Safari does not
    // show its own callout on top of the picker.
    button.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (!heldOpen) {
        heldOpen = true;
        pick(index);
      }
    });

    button.addEventListener('click', () => {
      if (heldOpen) {
        heldOpen = false;
        return;
      }
      const metric = metricAt(index);
      if (metric?.resets) {
        peaks.reset(metric.resets);
        if (lastState) render(lastState);
      }
    });

    // Press-and-hold has no keyboard equivalent, so give one explicitly.
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        pick(index);
      }
    });
  }

  function pick(index: number): void {
    openMetricPicker(slots[index], (id) => {
      slots = slots.map((existing, i) => (i === index ? id : existing));
      saveSlots(slots);
      if (lastState) render(lastState);
      cells[index]?.button.focus();
    });
  }

  function metricAt(index: number): Metric | undefined {
    return METRIC_BY_ID.get(slots[index]);
  }

  function render(state: TelemetryState): void {
    lastState = state;
    const usable = state.connection !== 'disconnected';
    cells.forEach((cell, index) => {
      const metric = metricAt(index);
      if (!metric) return;
      const raw = usable ? metric.read(state.frame, peaks.peaks) : null;
      const text = fmt(raw, metric.decimals);
      cell.label.textContent = metric.label;
      cell.value.textContent = text;
      cell.unit.textContent = unitFor(metric);
      fit(cell);
      cell.button.classList.toggle('tile--session', metric.resets !== undefined);
      cell.button.setAttribute(
        'aria-label',
        `${metric.menuLabel}: ${raw === null ? 'no reading' : `${text} ${metric.unit}`}. ` +
          `${metric.resets ? 'Activate to reset. ' : ''}Shift+Enter to change readout.`,
      );
    });
  }

  return { el, update: render };
}

/**
 * The unit, unless the label already says it.
 *
 * It rides on the label line rather than beside the numeral: inside the value
 * it inherited the watermark's opacity and was all but invisible, and it sat
 * hard against the cell's right edge where it lost its last glyph. Up here it
 * is full strength and never clipped — but "PEAK RPM rpm" and "VOLTAGE V" are
 * noise, so a unit the label already contains is dropped.
 */
function unitFor(metric: Metric): string {
  return metric.label.toLowerCase().includes(metric.unit.toLowerCase()) ? '' : metric.unit;
}

/**
 * Shrinks a cell's numeral only as far as it must to avoid being cut off.
 *
 * The stylesheet sets a size that fills the cell top to bottom, which runs
 * wider than the cell once a reading reaches four digits. Rather than crop the
 * number — losing the least significant digits, which on a peak rpm is the
 * whole point of it — each cell drops to whatever size still fits. Cells
 * therefore do not all share one size; each is as large as its own content
 * allows.
 *
 * Measuring forces a reflow, so this runs only when the rendered text or the
 * cell's width has actually changed, never on every frame.
 */
function fit(cell: Cell): void {
  const key = `${cell.value.textContent}|${cell.box.clientWidth}`;
  if (key === cell.fitted) return;
  cell.fitted = key;

  cell.box.style.fontSize = '';
  const available = cell.box.clientWidth;
  if (available <= 0) return;

  // A couple of pixels of slack: sizing to exactly the available width leaves
  // sub-pixel rounding to shave the last glyph.
  const room = available - 2;
  const numeral = cell.value.getBoundingClientRect().width;
  if (numeral <= room) return;

  const ceiling = Number.parseFloat(getComputedStyle(cell.box).fontSize);
  cell.box.style.fontSize = `${Math.floor(ceiling * Math.max(0.25, room / numeral))}px`;
}

function loadSlots(): string[] {
  // Storage is unavailable in private mode and can throw on access, and the
  // dash has to come up regardless — fall back to the defaults, never crash.
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.length === SLOT_COUNT &&
        parsed.every((id) => typeof id === 'string' && METRIC_BY_ID.has(id))
      ) {
        return parsed as string[];
      }
    }
  } catch {
    /* fall through to defaults */
  }
  return [...DEFAULT_SLOTS];
}

function saveSlots(slots: string[]): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(slots));
  } catch {
    /* a dash that cannot remember its layout still has to work */
  }
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`tiles: missing ${selector}`);
  return found;
}
