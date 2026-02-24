/** A single run entry – time in seconds, plus optional penalty cones */
export interface Run {
  /** Raw time in seconds, or null for DNS/DNF */
  time: number | null;
  /** Cone penalties (each adds 2 seconds in autocross, varies in rallycross) */
  cones: number;
  /** Whether this run was a Did Not Finish */
  dnf: boolean;
  /** Whether this run was a Did Not Start */
  dns: boolean;
  /** Raw string from the source HTML, e.g. "54.321+2", "DNF" */
  raw: string;
}

export interface Driver {
  /** Car / entry number */
  carNumber: string;
  /** Full driver name */
  name: string;
  /** Class abbreviation, e.g. "STR", "SSR" */
  classCode: string;
  /** Vehicle description */
  car: string;
  /** Ordered list of runs */
  runs: Run[];
  /**
   * Best penalty-adjusted time for this driver.
   * For autocross: min(adjusted run times).
   * For rallycross: sum of all adjusted run times.
   */
  bestTime: number | null;
  /** Computed position within the class (1-based) */
  position: number;
}

export interface TimingClass {
  /** Full class name, e.g. "Street Touring R (STR)" */
  name: string;
  /** Abbreviated class code */
  code: string;
  /** Sorted list of drivers (position 1 first) */
  drivers: Driver[];
  /** Whether this class uses cumulative/total timing (rallycross) */
  isRallycross: boolean;
}

export interface LatestRun {
  /** Driver name */
  name: string;
  /** Class code */
  classCode: string;
  /** Car number */
  carNumber: string;
  /** Penalty-adjusted time in seconds */
  time: number | null;
  /** Raw time string */
  raw: string;
  /** Whether this was a DNF */
  dnf: boolean;
  /** Whether this was a DNS */
  dns: boolean;
  /** Run index (0-based) within the driver's run list */
  runIndex: number;
  /** Unique key for React rendering */
  key: string;
}

export interface TimingData {
  /** Event title from the HTML */
  eventTitle: string;
  /** Venue / date string */
  eventInfo: string;
  /** Event type derived from data shape */
  eventType: 'autocross' | 'rallycross' | 'unknown';
  /** All parsed classes */
  classes: TimingClass[];
  /** Last 10 recorded runs (most recent first) */
  latestRuns: LatestRun[];
  /** Timestamp when the file was loaded */
  loadedAt: Date;
}
