import type { FarmSettings } from '../types/FarmSettings'
import { DEFAULT_FARM_SETTINGS } from '../types/FarmSettings'

// In-memory only: never touches the real app's localStorage.
let current: FarmSettings = { ...DEFAULT_FARM_SETTINGS }

export function loadSettings(): FarmSettings {
  return { ...current }
}

export function saveSettings(settings: FarmSettings): void {
  current = { ...settings }
}
