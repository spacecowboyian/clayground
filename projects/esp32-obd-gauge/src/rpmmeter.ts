import { RPM_MAX, RPM_RED, RPM_REDLINE, RPM_YELLOW, SHIFT_RPM } from './vehicle';
import { solidZones } from './zones';
import type { TelemetryState } from './telemetry/types';

export interface RpmMeter {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

/**
 * Full-bleed tach. The fill rises from the bottom of the region and the colour
 * under it escalates green -> yellow -> red, so the band of colour you see in
 * peripheral vision IS the reading. At the shift point the whole region
 * flashes.
 *
 * The fill is a full-height gradient revealed by `clip-path`, rather than a
 * growing element with a changing colour: that way the hue at the top edge of
 * the fill always matches the rpm it represents, with no colour maths per
 * frame.
 */
export function createRpmMeter(): RpmMeter {
  const el = document.createElement('section');
  el.className = 'rpm';
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine speed');
  el.setAttribute('aria-valuemin', '0');
  el.setAttribute('aria-valuemax', String(RPM_MAX));

  // The tach scale stays linear; only the coolant band is shaped.
  const fillBackground = solidZones(
    'to top',
    [
      { to: RPM_YELLOW, color: 'var(--rpm-green)' },
      { to: RPM_RED, color: 'var(--rpm-yellow)' },
      { to: RPM_REDLINE, color: 'var(--rpm-red)' },
      { to: RPM_MAX, color: 'var(--rpm-redline)' },
    ],
    0,
    pct,
  );

  el.innerHTML = `
    <div class="rpm__fill" data-role="fill" style="background:${fillBackground}"></div>
    ${ticks()}
    <div class="rpm__redline" style="bottom:${pct(RPM_REDLINE).toFixed(2)}%"></div>
    <div class="rpm__readout">
      <span class="rpm__value" data-role="value">––––</span>
      <span class="rpm__unit">rpm</span>
    </div>
    <p class="rpm__shift" data-role="shift" aria-hidden="true">SHIFT</p>`;

  const fill = must<HTMLElement>(el, '[data-role="fill"]');
  const value = must<HTMLElement>(el, '[data-role="value"]');

  return {
    el,
    update(state) {
      const frame = state.frame;
      const usable = frame !== null && state.connection !== 'disconnected';
      const rpm = usable && Number.isFinite(frame.rpm) ? frame.rpm : null;

      if (rpm === null) {
        fill.style.clipPath = 'inset(100% 0 0 0)';
        value.textContent = '––––';
        el.classList.remove('rpm--shift');
        el.removeAttribute('aria-valuenow');
        el.setAttribute('aria-valuetext', 'No engine speed reading');
        return;
      }

      const filled = clamp(pct(rpm), 0, 100);
      fill.style.clipPath = `inset(${(100 - filled).toFixed(2)}% 0 0 0)`;
      value.textContent = String(Math.round(rpm));
      el.classList.toggle('rpm--shift', rpm >= SHIFT_RPM);
      el.setAttribute('aria-valuenow', String(Math.round(rpm)));
      el.setAttribute(
        'aria-valuetext',
        `${Math.round(rpm)} rpm${rpm >= SHIFT_RPM ? ', shift now' : ''}`,
      );
    },
  };
}

/**
 * Graduations every 1000 rpm, longer every 2000.
 *
 * Deliberately unlabelled: a numeral here would sit on the fill, where white
 * on the green only reaches 2.5:1. Rules are not text and carry no contrast
 * minimum, and the exact value is already on the plate - the bar's job is the
 * peripheral glance, not the precise number.
 */
function ticks(): string {
  const out: string[] = [];
  for (let rpm = 1000; rpm < RPM_MAX; rpm += 1000) {
    const major = rpm % 2000 === 0;
    out.push(
      `<span class="rpm__tick${major ? ' rpm__tick--major' : ''}"
         style="bottom:${pct(rpm).toFixed(2)}%"></span>`,
    );
  }
  return out.join('');
}

function pct(rpm: number): number {
  return (rpm / RPM_MAX) * 100;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`rpm: missing ${selector}`);
  return found;
}
