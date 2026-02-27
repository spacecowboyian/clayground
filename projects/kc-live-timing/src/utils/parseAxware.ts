import type { Driver, LatestRun, TimingClass, TimingData } from '../types/timing';
import { bestRunTime, parseRun, totalRunTime } from './timeUtils';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cellText(cell: Element): string {
  return (cell.textContent ?? '').trim();
}

function tableRows(table: Element): HTMLTableRowElement[] {
  return Array.from(table.querySelectorAll('tr'));
}

function rowCells(row: HTMLTableRowElement): string[] {
  return Array.from(row.querySelectorAll('td, th')).map(cellText);
}

/** Return true if the last column header indicates cumulative timing (rallycross). */
function detectRallycross(lastHeader: string): boolean {
  return /total|sum|cumul/i.test(lastHeader);
}

// ─── Latest Runs Parser ───────────────────────────────────────────────────────

/**
 * The "Latest Times" table in axware HTML typically has columns:
 * Time | Driver | Class | Car#   (sometimes in different order)
 */
function parseLatestRunsTable(table: Element): LatestRun[] {
  const rows = tableRows(table);
  if (rows.length < 2) return [];

  // Detect header row
  const headerRow = rows.find(r =>
    rowCells(r as HTMLTableRowElement).some(c =>
      /driver|name/i.test(c)
    )
  );
  if (!headerRow) return [];

  const headers = rowCells(headerRow as HTMLTableRowElement).map(h => h.toLowerCase());
  const timeIdx = headers.findIndex(h => /time|run/i.test(h));
  const nameIdx = headers.findIndex(h => /driver|name/i.test(h));
  const classIdx = headers.findIndex(h => /class/i.test(h));
  const carIdx = headers.findIndex(h => /car|#|num/i.test(h));

  const runs: LatestRun[] = [];

  for (const row of rows) {
    const cells = rowCells(row as HTMLTableRowElement);
    if (cells.length < 2) continue;
    // Skip header-looking rows
    if (cells.some(c => /^(time|driver|class|car)$/i.test(c))) continue;

    const rawTime = timeIdx >= 0 ? (cells[timeIdx] ?? '') : (cells[0] ?? '');
    const name = nameIdx >= 0 ? (cells[nameIdx] ?? '') : (cells[1] ?? '');
    const classCode = classIdx >= 0 ? (cells[classIdx] ?? '') : (cells[2] ?? '');
    const carNumber = carIdx >= 0 ? (cells[carIdx] ?? '') : (cells[3] ?? '');

    if (!name || !rawTime) continue;

    const parsed = parseRun(rawTime);
    runs.push({
      name,
      classCode,
      carNumber,
      time: parsed.time,
      raw: rawTime,
      dnf: parsed.dnf,
      dns: parsed.dns,
      runIndex: 0,
      key: `${classCode}-${carNumber}-${runs.length}`,
    });
  }

  return runs;
}

// ─── Class Table Parser ───────────────────────────────────────────────────────

/**
 * Parse a single class results table.
 * Axware tables typically look like:
 *
 *   [Class Name row (colspan)]
 *   [Header: Pos | # | Driver | Car | R1 | R2 | ... | Total/Best]
 *   [Data rows]
 */
function parseClassTable(table: Element): TimingClass | null {
  const rows = tableRows(table);
  if (rows.length < 3) return null;

  // First row = class name
  const firstRowCells = rowCells(rows[0] as HTMLTableRowElement);
  const className = firstRowCells.join(' ').trim();
  if (!className) return null;

  // Extract code from parentheses e.g. "Street Touring R (STR)"
  const codeMatch = className.match(/\(([A-Z0-9]+)\)$/);
  const code = codeMatch ? codeMatch[1] : className.replace(/\s+/g, '').toUpperCase().slice(0, 6);

  // Header row – find the column layout
  const headerRow = rows[1] as HTMLTableRowElement;
  const headers = rowCells(headerRow).map(h => h.toLowerCase());

  const posIdx = headers.findIndex(h => /pos|position|#pos/i.test(h));
  const numIdx = headers.findIndex(h => /^#$|num|car.?#|no\./i.test(h));
  const nameIdx = headers.findIndex(h => /driver|name/i.test(h));
  const carIdx = headers.findIndex(h => /car(?!\s*#)|vehicle|make|model/i.test(h));

  // Run columns: everything that looks like R1, Run 1, or a numeric-ish header
  // between carIdx and the last column (total/best)
  const lastColIdx = headers.length - 1;
  const runStartIdx = Math.max(posIdx, numIdx, nameIdx, carIdx) + 1;
  const runColCount = Math.max(0, lastColIdx - runStartIdx);

  if (nameIdx < 0) return null; // Can't parse without a name column

  const drivers: Driver[] = [];

  for (let i = 2; i < rows.length; i++) {
    const cells = rowCells(rows[i] as HTMLTableRowElement);
    if (cells.length < 3) continue;

    const name = nameIdx >= 0 ? (cells[nameIdx] ?? '') : '';
    if (!name || /driver|name/i.test(name)) continue; // skip sub-headers

    const carNumber = numIdx >= 0 ? (cells[numIdx] ?? '') : '';
    const car = carIdx >= 0 ? (cells[carIdx] ?? '') : '';

    const runs = [];
    for (let r = 0; r < runColCount; r++) {
      const rawIdx = runStartIdx + r;
      const raw = cells[rawIdx] ?? '';
      if (!raw) continue;
      runs.push(parseRun(raw));
    }

    drivers.push({
      carNumber,
      name,
      classCode: code,
      car,
      runs,
      bestTime: null, // computed below
      position: 0,    // computed below
    });
  }

  if (drivers.length === 0) return null;

  // Determine scoring type from the last column header
  const lastHeader = headers[lastColIdx] ?? '';
  const isRallycross = detectRallycross(lastHeader);

  // Compute best/total time per driver
  for (const d of drivers) {
    d.bestTime = isRallycross ? totalRunTime(d.runs) : bestRunTime(d.runs);
  }

  // Sort: valid times first (ascending), then nulls at end
  drivers.sort((a, b) => {
    if (a.bestTime === null && b.bestTime === null) return 0;
    if (a.bestTime === null) return 1;
    if (b.bestTime === null) return -1;
    return a.bestTime - b.bestTime;
  });

  // Assign positions
  drivers.forEach((d, idx) => {
    d.position = idx + 1;
  });

  return { name: className, code, drivers, isRallycross };
}

// ─── Latest Runs from All Classes ────────────────────────────────────────────

/**
 * Walk all class tables and gather individual run entries with a timestamp-
 * surrogate ordering (we use position in the table as a proxy since axware
 * appends runs in order).
 */
function gatherLatestRuns(classes: TimingClass[]): LatestRun[] {
  const allRuns: LatestRun[] = [];

  for (const cls of classes) {
    for (const driver of cls.drivers) {
      driver.runs.forEach((run, idx) => {
        if (run.dns && !run.dnf && run.time === null && run.raw === '') return;
        allRuns.push({
          name: driver.name,
          classCode: cls.code,
          carNumber: driver.carNumber,
          time: run.time,
          raw: run.raw,
          dnf: run.dnf,
          dns: run.dns,
          runIndex: idx,
          key: `${cls.code}-${driver.carNumber}-${idx}`,
        });
      });
    }
  }

  // Return last 10 in reverse-insertion order (most recent last run first)
  return allRuns.slice(-10).reverse();
}

// ─── Main Parser ─────────────────────────────────────────────────────────────

export function parseAxwareHtml(html: string): TimingData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Event title
  const titleEl = doc.querySelector('title');
  let eventTitle = titleEl?.textContent?.trim() ?? 'Live Timing';

  // Some axware pages put the event info in bold text in the first table
  const boldEls = Array.from(doc.querySelectorAll('b, strong'));
  if (boldEls.length > 0) {
    const candidate = boldEls[0].textContent?.trim() ?? '';
    if (candidate && candidate !== eventTitle) {
      eventTitle = candidate;
    }
  }

  // Venue / date – second bold or second table row
  let eventInfo = '';
  if (boldEls.length > 1) {
    eventInfo = boldEls[1].textContent?.trim() ?? '';
  }

  const tables = Array.from(doc.querySelectorAll('table'));
  const classes: TimingClass[] = [];
  let latestRuns: LatestRun[] = [];

  for (const table of tables) {
    const text = (table.textContent ?? '').toLowerCase();

    // Detect the "Latest Times" table
    if (text.includes('latest') || text.includes('recent')) {
      const parsed = parseLatestRunsTable(table);
      if (parsed.length > 0) {
        latestRuns = parsed.slice(0, 10);
        continue;
      }
    }

    // Try to parse as a class table
    const cls = parseClassTable(table);
    if (cls) {
      classes.push(cls);
    }
  }

  // If no explicit latest runs table found, derive from class data
  if (latestRuns.length === 0) {
    latestRuns = gatherLatestRuns(classes);
  }

  // Determine overall event type
  const rallycrossCount = classes.filter(c => c.isRallycross).length;
  const eventType =
    classes.length === 0
      ? 'unknown'
      : rallycrossCount > classes.length / 2
      ? 'rallycross'
      : 'autocross';

  return {
    eventTitle,
    eventInfo,
    eventType,
    classes,
    latestRuns,
    loadedAt: new Date(),
  };
}
