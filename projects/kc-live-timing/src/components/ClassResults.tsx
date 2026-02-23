import type { Driver, TimingClass } from '../types/timing';
import { formatTime, formatDiff, adjustedRunTime } from '../utils/timeUtils';

interface DriverRowProps {
  driver: Driver;
  isMe: boolean;
  inCompetition: boolean;
  leaderTime: number | null;
  isRallycross: boolean;
  onToggleCompetition: (key: string) => void;
  onDriverClick: (key: string) => void;
  driverKey: string;
}

function DriverRow({
  driver,
  isMe,
  inCompetition,
  leaderTime,
  isRallycross,
  onToggleCompetition,
  onDriverClick,
  driverKey,
}: DriverRowProps) {
  const diff =
    driver.bestTime !== null && leaderTime !== null && driver.position > 1
      ? driver.bestTime - leaderTime
      : null;

  return (
    <tr
      className={`driver-row${isMe ? ' driver-row--me' : ''}${inCompetition ? ' driver-row--competition' : ''}`}
    >
      <td className="driver-row__pos">{driver.bestTime !== null ? driver.position : '—'}</td>
      <td className="driver-row__num">#{driver.carNumber}</td>
      <td className="driver-row__name">
        <button
          className="driver-name-btn"
          onClick={() => onDriverClick(driverKey)}
          aria-label={`View details for ${driver.name}`}
        >
          {driver.name}
          {isMe && <span className="me-indicator" aria-label="(you)"> ★</span>}
        </button>
        {driver.car ? <span className="driver-row__car"> {driver.car}</span> : null}
      </td>
      <td className="driver-row__runs">
        {driver.runs.map((run, i) => {
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
              {run.dnf ? 'DNF' : run.dns ? 'DNS' : run.raw}
            </span>
          );
        })}
      </td>
      <td className="driver-row__best">
        {driver.bestTime !== null ? formatTime(driver.bestTime) : '—'}
        {diff !== null && (
          <span className="driver-row__diff"> {formatDiff(diff)}</span>
        )}
      </td>
      <td className="driver-row__actions">
        <button
          className={`action-btn pin-btn${inCompetition ? ' action-btn--active' : ''}`}
          aria-label={inCompetition ? 'Unpin from competition' : 'Pin to competition'}
          title={inCompetition ? 'Unpin from competition' : 'Pin to competition'}
          onClick={() => onToggleCompetition(driverKey)}
        >
          📌
        </button>
      </td>
    </tr>
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
  const leaderTime = cls.drivers.find(d => d.bestTime !== null)?.bestTime ?? null;

  // Put "me" first, then rest by position
  const meDriver = cls.drivers.find(d => `${cls.code}-${d.carNumber}` === myDriverKey);
  const others = cls.drivers.filter(d => `${cls.code}-${d.carNumber}` !== myDriverKey);
  const orderedDrivers: Driver[] = meDriver ? [meDriver, ...others] : others;

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
              <th>Runs</th>
              <th>{cls.isRallycross ? 'Total' : 'Best'}</th>
              <th></th>
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
                  leaderTime={leaderTime}
                  isRallycross={cls.isRallycross}
                  onToggleCompetition={onToggleCompetition}
                  onDriverClick={onDriverClick}
                  driverKey={driverKey}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
