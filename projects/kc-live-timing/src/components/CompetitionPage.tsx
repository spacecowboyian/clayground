import type { TimingClass, Driver } from '../types/timing';
import { formatTime, formatDiff } from '../utils/timeUtils';

interface CompetitionPageProps {
  classes: TimingClass[];
  competitionKeys: Set<string>;
  myDriverKey: string;
  onToggleCompetition: (key: string) => void;
  onDriverClick: (key: string) => void;
}

export function CompetitionPage({
  classes,
  competitionKeys,
  myDriverKey,
  onToggleCompetition,
  onDriverClick,
}: CompetitionPageProps) {
  // Gather all competition drivers across all classes
  const entries: { driver: Driver; cls: TimingClass; key: string }[] = [];

  for (const cls of classes) {
    for (const driver of cls.drivers) {
      const key = `${cls.code}-${driver.carNumber}`;
      if (competitionKeys.has(key) || key === myDriverKey) {
        entries.push({ driver, cls, key });
      }
    }
  }

  if (entries.length === 0) {
    return (
      <div className="competition-empty">
        <p>No drivers in your competition list yet.</p>
        <p>Tap the <span aria-hidden="true">📌</span> pin on any driver to add them.</p>
      </div>
    );
  }

  // Sort by best time ascending
  entries.sort((a, b) => {
    if (a.driver.bestTime === null) return 1;
    if (b.driver.bestTime === null) return -1;
    return a.driver.bestTime - b.driver.bestTime;
  });

  const leaderTime = entries[0]?.driver.bestTime ?? null;

  // Find "me" entry for sticky header
  const meEntry = entries.find(e => e.key === myDriverKey);

  return (
    <div className="competition-page">
      {meEntry && (
        <div className="sticky-banner" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <span className="sticky-banner__label">You</span>
          <span className="sticky-banner__name">{meEntry.driver.name}</span>
          <span className="sticky-banner__class">{meEntry.cls.code}</span>
          <span className="sticky-banner__time">
            {meEntry.driver.bestTime !== null ? formatTime(meEntry.driver.bestTime) : '—'}
          </span>
          <span className="sticky-banner__pos">P{meEntry.driver.position} in class</span>
        </div>
      )}

      <table className="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>Class</th>
            <th>Best / Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ driver, cls, key }, rank) => {
            const isMe = key === myDriverKey;
            const diff =
              driver.bestTime !== null && leaderTime !== null && rank > 0
                ? driver.bestTime - leaderTime
                : null;
            return (
              <tr
                key={key}
                className={`driver-row${isMe ? ' driver-row--me' : ''}`}
              >
                <td className="driver-row__pos">{rank + 1}</td>
                <td className="driver-row__name">
                  <button
                    className="driver-name-btn"
                    onClick={() => onDriverClick(key)}
                    aria-label={`View details for ${driver.name}`}
                  >
                    {driver.name}
                    {isMe && <span className="me-indicator" aria-label="(you)"> ★</span>}
                  </button>
                </td>
                <td className="driver-row__class">{cls.code} #{driver.carNumber}</td>
                <td className="driver-row__best">
                  {driver.bestTime !== null ? formatTime(driver.bestTime) : '—'}
                  {diff !== null && (
                    <span className="driver-row__diff"> {formatDiff(diff)}</span>
                  )}
                </td>
                <td className="driver-row__actions">
                  <button
                    className="action-btn pin-btn action-btn--active"
                    aria-label="Unpin from competition"
                    title="Unpin from competition"
                    onClick={() => onToggleCompetition(key)}
                  >
                    📌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
