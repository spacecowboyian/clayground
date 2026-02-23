import type { Driver, TimingClass } from '../types/timing';
import { formatTime, adjustedRunTime } from '../utils/timeUtils';

interface MeBarProps {
  driver: Driver;
  cls: TimingClass;
  driverKey: string;
  onDriverClick: (key: string) => void;
}

export function MeBar({ driver, cls, driverKey, onDriverClick }: MeBarProps) {
  // Find best run index for autocross
  let bestRunIdx = -1;
  if (!cls.isRallycross) {
    let best = Infinity;
    driver.runs.forEach((run, i) => {
      const adj = adjustedRunTime(run);
      if (adj !== null && adj < best) {
        best = adj;
        bestRunIdx = i;
      }
    });
  }

  // Build run display order: best run first (will be CSS sticky), then others in order
  const runsForDisplay = cls.isRallycross
    ? []
    : [
        ...(bestRunIdx >= 0
          ? [{ run: driver.runs[bestRunIdx], i: bestRunIdx, isBest: true }]
          : []),
        ...driver.runs
          .map((run, i) => ({ run, i, isBest: false }))
          .filter(({ i }) => i !== bestRunIdx),
      ];

  return (
    <div
      className="me-bar"
      role="status"
      aria-label={`Your result: ${driver.name}`}
    >
      {/* Identity — always visible, click opens driver detail */}
      <button
        className="me-bar__identity"
        onClick={() => onDriverClick(driverKey)}
        aria-label={`View your details: ${driver.name}`}
      >
        <span className="me-bar__you-badge">You</span>
        <span className="me-bar__name">{driver.name}</span>
        <span className="me-bar__meta">
          {cls.code}
          {driver.bestTime !== null && (
            <span className="me-bar__pos"> · P{driver.position}</span>
          )}
        </span>
      </button>

      {cls.isRallycross ? (
        /* Rallycross: show total cumulative time */
        <div className="me-bar__total">
          <span className="me-bar__total-label">Total</span>
          <span className="me-bar__total-time">
            {driver.bestTime !== null ? formatTime(driver.bestTime) : '—'}
          </span>
        </div>
      ) : (
        /* Autocross: scrollable run chips, best run sticky to left */
        <div className="me-bar__runs-scroll" role="list" aria-label="Your runs">
          {runsForDisplay.map(({ run, i, isBest }) => {
            const adj = adjustedRunTime(run);
            return (
              <div
                key={i}
                role="listitem"
                className={[
                  'me-bar__run',
                  isBest ? 'me-bar__run--best' : '',
                  run.dnf ? 'me-bar__run--dnf' : '',
                  run.dns ? 'me-bar__run--dns' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {isBest ? (
                  <span className="me-bar__run-badge">★ BEST</span>
                ) : (
                  <span className="me-bar__run-label">R{i + 1}</span>
                )}
                <span className="me-bar__run-time">
                  {run.dnf ? 'DNF' : run.dns ? 'DNS' : formatTime(adj)}
                </span>
              </div>
            );
          })}
          {runsForDisplay.length === 0 && (
            <span className="me-bar__no-runs">No runs yet</span>
          )}
        </div>
      )}
    </div>
  );
}
