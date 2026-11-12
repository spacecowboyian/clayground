// Demo replacement for src/lib/bambu.ts: deterministic in-memory data, no network, no token use.
// Helpers are duplicated so the real module (and its API URL) never enters the demo bundle.

export interface BambuAmsMapping {
  ams: number
  sourceColor: string
  targetColor: string
  filamentId: string
  filamentType: string
  targetFilamentType: string
}

export interface BambuTask {
  id: string
  title: string
  cover: string
  status: number
  startTime: string
  endTime: string
  weight: number
  length: number
  costTime: number
  deviceId: string
  amsDetailMapping: BambuAmsMapping[]
}

export function cleanPrintTitle(title: string): string {
  return title
    .replace(/\.(3mf|gcode|gco|bgcode|stl)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function bambuHexToCSS(hex: string): string {
  const clean = hex.replace(/^#/, '')
  if (clean.length === 8) return `#${clean.slice(0, 6).toLowerCase()}`
  if (clean.length === 6) return `#${clean.toLowerCase()}`
  return '#9ca3af'
}

export function formatPrintTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

function ams(color: string, filamentId: string, type: string): BambuAmsMapping[] {
  return [{ ams: 0, sourceColor: color, targetColor: color, filamentId, filamentType: type, targetFilamentType: type }]
}

const FAKE_TASKS: BambuTask[] = [
  { id: 'demo-task-1', title: 'demo_benchy.3mf', cover: '', status: 4, startTime: '2024-01-15 10:30:00', endTime: '2024-01-15 12:45:00', weight: 14.2, length: 4760, costTime: 8100, deviceId: 'DEMO-PRINTER-1', amsDetailMapping: ams('FF6A13FF', 'GFA00', 'PLA') },
  { id: 'demo-task-2', title: 'demo-phone-stand.3mf', cover: '', status: 4, startTime: '2024-01-16 09:00:00', endTime: '2024-01-16 10:20:00', weight: 22.5, length: 7540, costTime: 4800, deviceId: 'DEMO-PRINTER-1', amsDetailMapping: ams('1E90FFFF', 'GFA00', 'PLA') },
  { id: 'demo-task-3', title: 'demo_cable_clip.gcode.3mf', cover: '', status: 4, startTime: '2024-01-17 14:10:00', endTime: '2024-01-17 14:55:00', weight: 3.1, length: 1040, costTime: 2700, deviceId: 'DEMO-PRINTER-2', amsDetailMapping: ams('2E8B57FF', 'GFG00', 'PETG') },
  { id: 'demo-task-4', title: 'demo_gear_set.3mf', cover: '', status: 4, startTime: '2024-01-18 18:00:00', endTime: '2024-01-18 23:30:00', weight: 61.8, length: 20700, costTime: 19800, deviceId: 'DEMO-PRINTER-2', amsDetailMapping: ams('222222FF', 'GFB00', 'ABS') },
]

export async function fetchBambuTasks(
  _token: string,
  opts: { limit?: number; corsProxy?: string } = {},
): Promise<BambuTask[]> {
  const { limit = 20 } = opts
  return FAKE_TASKS.slice(0, limit).map((t) => ({ ...t, amsDetailMapping: t.amsDetailMapping.map((a) => ({ ...a })) }))
}
