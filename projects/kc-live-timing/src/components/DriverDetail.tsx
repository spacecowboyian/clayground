import type { Driver, TimingClass } from '../types/timing';
import { formatTime, adjustedRunTime } from '../utils/timeUtils';

interface DriverDetailProps {
  driver: Driver;
  cls: TimingClass;
  driverKey: string;
  isMe: boolean;
  onSetMe: (key: string) => void;
  onBack: () => void;
}

export function DriverDetail({ driver, cls, driverKey, isMe, onSetMe, onBack }: DriverDetailProps) {
  return (
    <div className="driver-detail">
      <div className="driver-detail__topbar">
        <button className="back-btn" onClick={onBack} aria-label="Back to results">
          ← Back
        </button>
      </div>

      <div className="driver-detail__identity">
        <div className="driver-detail__name">{driver.name}</div>
        <div className="driver-detail__meta">
          {cls.code}
          {driver.carNumber && <span> · #{driver.carNumber}</span>}
          {driver.car && <span> · {driver.car}</span>}
        </div>
        <div className="driver-detail__standing">
          <span className="driver-detail__pos">
            {driver.bestTime !== null ? `P${driver.position}` : '—'}
          </span>
          <span className="driver-detail__best">
            {driver.bestTime !== null ? formatTime(driver.bestTime) : '—'}
          </span>
          <span className="driver-detail__type-label">
            {cls.isRallycross ? 'total' : 'best'}
          </span>
        </div>
      </div>

      <div className="driver-detail__runs">
        <h3 className="driver-detail__section-title">Runs</h3>
        {driver.runs.length === 0 ? (
          <p className="driver-detail__no-runs">No runs recorded.</p>
        ) : (
          driver.runs.map((run, i) => {
            const adj = adjustedRunTime(run);
            const isBest =
              !cls.isRallycross &&
              driver.bestTime !== null &&
              adj !== null &&
              adj === driver.bestTime;
            return (
              <div
                key={i}
                className={[
                  'run-row',
                  isBest ? 'run-row--best' : '',
                  run.dnf ? 'run-row--dnf' : '',
                  run.dns ? 'run-row--dns' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="run-row__label">Run {i + 1}</span>
                <span className="run-row__raw">
                  {run.dnf ? 'DNF' : run.dns ? 'DNS' : run.raw}
                </span>
                {run.cones > 0 && !run.dnf && !run.dns && (
                  <span className="run-row__cones">
                    +{run.cones} cone{run.cones !== 1 ? 's' : ''}
                  </span>
                )}
                {adj !== null && !run.dnf && !run.dns && (
                  <span className="run-row__adj">{formatTime(adj)}</span>
                )}
                {isBest && <span className="run-row__best-badge">BEST</span>}
              </div>
            );
          })
        )}
      </div>

      <div className="driver-detail__footer">
        <button
          className={`this-is-me-btn${isMe ? ' this-is-me-btn--active' : ''}`}
          onClick={() => onSetMe(isMe ? '' : driverKey)}
        >
          {isMe ? '✓ This is me — tap to remove' : '📌 This is me'}
        </button>
      </div>
    </div>
  );
}
