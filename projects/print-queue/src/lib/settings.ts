import type { FarmSettings } from '../types/FarmSettings'
import { DEFAULT_FARM_SETTINGS } from '../types/FarmSettings'

const LS_KEY = 'print_queue_farm_settings'

export function loadSettings(): FarmSettings {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FarmSettings>
      return { ...DEFAULT_FARM_SETTINGS, ...parsed }
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_FARM_SETTINGS }
}

export function saveSettings(settings: FarmSettings): void {
  localStorage.setItem(LS_KEY, JSON.stringify(settings))
}
