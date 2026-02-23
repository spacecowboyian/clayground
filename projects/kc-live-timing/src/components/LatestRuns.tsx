import { useRef, useEffect } from 'react';
import type { LatestRun } from '../types/timing';
import { formatTime } from '../utils/timeUtils';

interface LatestRunsProps {
  runs: LatestRun[];
}

export function LatestRuns({ runs }: LatestRunsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to left when new runs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [runs]);

  if (runs.length === 0) return null;

  return (
    <div className="latest-runs" aria-label="Latest 10 runs">
      <span className="latest-runs__label">Latest</span>
      <div className="latest-runs__scroll" ref={scrollRef} role="list">
        {runs.map(run => (
          <div
            key={run.key}
            className="latest-runs__card"
            role="listitem"
            title={`${run.name} – ${run.classCode} #${run.carNumber}`}
          >
            <span className="latest-runs__class">{run.classCode}</span>
            <span className="latest-runs__name">{run.name.split(' ').slice(-1)[0]}</span>
            <span
              className={`latest-runs__time${run.dnf ? ' latest-runs__time--dnf' : ''}`}
            >
              {run.dnf ? 'DNF' : run.dns ? 'DNS' : formatTime(run.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
