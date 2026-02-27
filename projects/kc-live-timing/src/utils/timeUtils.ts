import type { Run } from '../types/timing';

/** Penalty time in seconds per cone (standard SCCA rule) */
const CONE_PENALTY_SECONDS = 2;

/**
 * Parse a raw run string from an axware HTML file.
 * Handles formats like: "54.321", "54.321+2", "DNF", "DNS", "54.321+1"
 */
export function parseRun(raw: string): Run {
  const trimmed = raw.trim();

  if (!trimmed || trimmed === '---' || trimmed === '') {
    return { time: null, cones: 0, dnf: false, dns: true, raw: trimmed };
  }

  const upper = trimmed.toUpperCase();
  if (upper === 'DNS') {
    return { time: null, cones: 0, dnf: false, dns: true, raw: trimmed };
  }
  if (upper === 'DNF') {
    return { time: null, cones: 0, dnf: true, dns: false, raw: trimmed };
  }

  // Match "54.321+2" or "54.321" – also handle optional (P) for rerun penalty
  const match = trimmed.match(/^([\d.]+)(?:\+(\d+))?/);
  if (!match) {
    return { time: null, cones: 0, dnf: false, dns: true, raw: trimmed };
  }

  const base = parseFloat(match[1]);
  const cones = match[2] ? parseInt(match[2], 10) : 0;

  return {
    time: base,
    cones,
    dnf: false,
    dns: false,
    raw: trimmed,
  };
}

/** Penalty-adjusted time for a single run */
export function adjustedRunTime(run: Run): number | null {
  if (run.dnf || run.dns || run.time === null) return null;
  return run.time + run.cones * CONE_PENALTY_SECONDS;
}

/**
 * Best (minimum) penalty-adjusted time across all runs.
 * Used for autocross scoring.
 */
export function bestRunTime(runs: Run[]): number | null {
  const times = runs.map(adjustedRunTime).filter((t): t is number => t !== null);
  if (times.length === 0) return null;
  return Math.min(...times);
}

/**
 * Sum of all penalty-adjusted run times (excluding DNS).
 * DNF counts as infinity so the driver sorts to the bottom.
 * Used for rallycross scoring.
 */
export function totalRunTime(runs: Run[]): number | null {
  if (runs.length === 0) return null;

  let total = 0;
  let hasValidRun = false;

  for (const run of runs) {
    if (run.dns) continue; // DNS runs are excluded
    if (run.dnf || run.time === null) return null; // DNF → no total
    total += adjustedRunTime(run) ?? 0;
    hasValidRun = true;
  }

  return hasValidRun ? total : null;
}

/** Format seconds as "MM:SS.mmm" or "SS.mmm" */
export function formatTime(seconds: number | null): string {
  if (seconds === null) return '—';
  if (seconds < 60) {
    return seconds.toFixed(3);
  }
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3).padStart(6, '0');
  return `${mins}:${secs}`;
}

/** Format a time difference as "+N.NNN" */
export function formatDiff(seconds: number): string {
  return `+${seconds.toFixed(3)}`;
}
