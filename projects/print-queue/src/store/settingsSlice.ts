import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadSettings, saveSettings } from '../lib/settings'
import type { FarmSettings } from '../types/FarmSettings'

// ── State ─────────────────────────────────────────────────────────────────────

interface SettingsState {
  settings: FarmSettings
}

const initialState: SettingsState = {
  settings: loadSettings(),
}

// ── Slice ─────────────────────────────────────────────────────────────────────

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<FarmSettings>) => {
      state.settings = action.payload
      saveSettings(action.payload)
    },
  },
})

export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
