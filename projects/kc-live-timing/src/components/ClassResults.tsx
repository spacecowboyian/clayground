import { useState } from 'react';
import type { Driver, TimingClass } from '../types/timing';
import { formatTime, formatDiff, adjustedRunTime } from '../utils/timeUtils';

/** Inline SVG pushpin — takes CSS `color` so it can be gray or red */
function PinIcon() {
  return (
    <svg
      className="pin-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
    </svg>
  );
}

interface DriverRowProps {
  driver: Driver;
  isMe: boolean;
  inCompetition: boolean;
  isExpanded: boolean;
  leaderTime: number | null;
  isRallycross: boolean;
  onToggleCompetition: (key: string) => void;
  onDriverClick: (key: string) => void;
  onToggleExpand: () => void;
  driverKey: string;
  colCount: number;
}

function DriverRow({
  driver,
  isMe,
  inCompetition,
  isExpanded,
  leaderTime,
  isRallycross,
  onToggleCompetition,
  onDriverClick,
  onToggleExpand,
  driverKey,
  colCount,
}: DriverRowProps) {
  const diff =
    driver.bestTime !== null && leaderTime !== null && driver.position > 1
      ? driver.bestTime - leaderTime
      : null;

  return (
    <>
      <tr
        className={`driver-row${isMe ? ' driver-row--me' : ''}${inCompetition ? ' driver-row--competition' : ''}${isExpanded ? ' driver-row--expanded' : ''}`}
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
      >
        <td className="driver-row__pos">{driver.bestTime !== null ? driver.position : '—'}</td>
        <td className="driver-row__num">#{driver.carNumber}</td>
        <td className="driver-row__name">
          <button
            className="driver-name-btn"
            onClick={e => { e.stopPropagation(); onDriverClick(driverKey); }}
            aria-label={`View details for ${driver.name}`}
          >
            {driver.name}
            {isMe && <span className="me-indicator" aria-label="(you)"> ★</span>}
          </button>
          {driver.car ? <span className="driver-row__car"> {driver.car}</span> : null}
        </td>
        <td className="driver-row__best">
          {driver.bestTime !== null ? formatTime(driver.bestTime) : '—'}
          {diff !== null && (
            <span className="driver-row__diff"> {formatDiff(diff)}</span>
          )}
        </td>
        <td className="driver-row__actions">
          <button
            className={`pin-btn${inCompetition ? ' pin-btn--active' : ''}`}
            aria-label={inCompetition ? 'Unpin from competition' : 'Pin to competition'}
            title={inCompetition ? 'Unpin from competition' : 'Pin to competition'}
            onClick={e => { e.stopPropagation(); onToggleCompetition(driverKey); }}
          >
            <PinIcon />
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="expansion-row" aria-label={`Runs for ${driver.name}`}>
          <td colSpan={colCount} className="expansion-row__cell">
            <div className="expansion-row__chips">
              {driver.runs.length === 0 ? (
                <span className="expansion-row__no-runs">No runs yet</span>
              ) : (
                driver.runs.map((run, i) => {
                  const adj = adjustedRunTime(run);
                  const isBest =
                    !isRallycross &&
                    driver.bestTime !== null &&
                    adj === driver.bestTime;
                  return (
                    <span
                      key={i}
                      className={`run-chip${isBest ? ' run-chip--best' : ''}${run.dnf ? ' run-chip--dnf' : ''}${run.dns ? ' run-chip--dns' : ''}`}
                    >
                      <span className="run-chip__label">R{i + 1}</span>
                      {run.dnf ? 'DNF' : run.dns ? 'DNS' : run.raw}
                    </span>
                  );
                })
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

interface ClassResultsProps {
  cls: TimingClass;
  myDriverKey: string;
  competitionKeys: Set<string>;
  onToggleCompetition: (key: string) => void;
  onDriverClick: (key: string) => void;
}

export function ClassResults({
  cls,
  myDriverKey,
  competitionKeys,
  onToggleCompetition,
  onDriverClick,
}: ClassResultsProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const leaderTime = cls.drivers.find(d => d.bestTime !== null)?.bestTime ?? null;

  // Put "me" first, then rest by position
  const meDriver = cls.drivers.find(d => `${cls.code}-${d.carNumber}` === myDriverKey);
  const others = cls.drivers.filter(d => `${cls.code}-${d.carNumber}` !== myDriverKey);
  const orderedDrivers: Driver[] = meDriver ? [meDriver, ...others] : others;

  const handleToggleExpand = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // 5 visible columns: Pos | # | Name | Best/Total | Pin
  const colCount = 5;

  return (
    <section className="class-results" aria-label={cls.name}>
      <header className="class-results__header">
        <h2 className="class-results__title">
          {cls.name}
          <span className="class-results__type">
            {cls.isRallycross ? 'Rallycross' : 'Autocross'}
          </span>
        </h2>
      </header>
      <div className="table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>#</th>
              <th>Driver</th>
              <th>{cls.isRallycross ? 'Total' : 'Best'}</th>
              <th aria-label="Pin" className="th-pin"></th>
            </tr>
          </thead>
          <tbody>
            {orderedDrivers.map(driver => {
              const driverKey = `${cls.code}-${driver.carNumber}`;
              return (
                <DriverRow
                  key={driverKey}
                  driver={driver}
                  isMe={driverKey === myDriverKey}
                  inCompetition={competitionKeys.has(driverKey)}
                  isExpanded={expandedKeys.has(driverKey)}
                  leaderTime={leaderTime}
                  isRallycross={cls.isRallycross}
                  onToggleCompetition={onToggleCompetition}
                  onDriverClick={onDriverClick}
                  onToggleExpand={() => handleToggleExpand(driverKey)}
                  driverKey={driverKey}
                  colCount={colCount}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
