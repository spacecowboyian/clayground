/** AMS filament slot information returned by Bambu for a print task */
export interface BambuAmsMapping {
  /** AMS slot index (0-based) */
  ams: number
  /** Loaded filament hex color (RRGGBBAA or RRGGBB) */
  sourceColor: string
  /** Actually-used filament hex color */
  targetColor: string
  /** Bambu filament catalog ID (e.g. "GFL01" = Bambu PLA Basic) */
  filamentId: string
  /** Material type string (e.g. "PLA", "PETG", "ABS") */
  filamentType: string
  targetFilamentType: string
}

/** A single print job from the Bambu Cloud API */
export interface BambuTask {
  id: string
  /** Raw filename / title as uploaded to the printer (e.g. "my_benchy.3mf") */
  title: string
  /** Thumbnail URL (may be empty or a data URL) */
  cover: string
  /**
   * Task status code:
   *  4 = success (print completed normally)
   *  5 = failed
   *  Others = in progress / cancelled / etc.
   */
  status: number
  /** ISO-like start timestamp: "2024-01-15 10:30:00" */
  startTime: string
  /** ISO-like end timestamp: "2024-01-15 12:45:00" */
  endTime: string
  /** Total filament weight consumed in grams */
  weight: number
  /** Total filament length consumed in mm */
  length: number
  /** Elapsed print time in seconds */
  costTime: number
  /** Printer device serial / ID */
  deviceId: string
  amsDetailMapping: BambuAmsMapping[]
}

interface BambuTasksResponse {
  total: number
  hits: BambuTask[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip common 3D-print file extensions and clean up separators in a filename */
export function cleanPrintTitle(title: string): string {
  return title
    .replace(/\.(3mf|gcode|gco|bgcode|stl)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Convert a Bambu hex color (RRGGBBAA or RRGGBB) to a CSS hex string (#rrggbb).
 *  Returns a neutral gray for any unrecognised format. */
export function bambuHexToCSS(hex: string): string {
  const clean = hex.replace(/^#/, '')
  if (clean.length === 8) return `#${clean.slice(0, 6).toLowerCase()}`
  if (clean.length === 6) return `#${clean.toLowerCase()}`
  return '#9ca3af'
}

/** Format a duration in seconds to a human-readable string (e.g. "2h 15m") */
export function formatPrintTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

// ── API calls ─────────────────────────────────────────────────────────────────

const BAMBU_TASK_URL = 'https://api.bambulab.com/v1/iot-service/api/user/task'

/**
 * Fetch recent print tasks from the Bambu Cloud API.
 *
 * @param token       Bambu Lab access token
 * @param opts.limit  Number of tasks to request (default 20)
 * @param opts.corsProxy  Optional CORS-proxy URL prefix. The Bambu API URL is
 *                    URL-encoded and appended after this prefix, e.g.
 *                    `"https://corsproxy.io/?"` → fetches
 *                    `https://corsproxy.io/?https%3A%2F%2Fapi.bambulab...`
 *
 * Only tasks with status 4 (completed successfully) are returned.
 */
export async function fetchBambuTasks(
  token: string,
  opts: { limit?: number; corsProxy?: string } = {},
): Promise<BambuTask[]> {
  const { limit = 20, corsProxy = '' } = opts
  const apiUrl = `${BAMBU_TASK_URL}?limit=${limit}`
  const url = corsProxy ? `${corsProxy}${encodeURIComponent(apiUrl)}` : apiUrl

  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!resp.ok) {
    throw new Error(`Bambu API returned ${resp.status}: ${resp.statusText}`)
  }

  const data = (await resp.json()) as BambuTasksResponse
  return (data.hits ?? []).filter((t) => t.status === 4)
}
