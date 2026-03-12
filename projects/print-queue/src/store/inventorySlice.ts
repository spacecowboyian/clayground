import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  listModels,
  createModel,
  updateModel,
  deleteModel,
  listFilaments,
  createFilament,
  updateFilament,
  deleteFilament,
} from '../lib/inventory'
import type { PrintModel, PrintModelInput, Filament, FilamentInput } from '../types/Inventory'

// ── State ─────────────────────────────────────────────────────────────────────

interface InventoryState {
  models: PrintModel[]
  filaments: Filament[]
  loading: boolean
  error: string | null
}

const initialState: InventoryState = {
  models: [],
  filaments: [],
  loading: false,
  error: null,
}

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchInventory = createAsyncThunk<
  { models: PrintModel[]; filaments: Filament[] },
  void,
  { rejectValue: string }
>(
  'inventory/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [models, filaments] = await Promise.all([listModels(), listFilaments()])
      return { models, filaments }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load inventory'
      return rejectWithValue(msg)
    }
  }
)

// ── Model thunks ──────────────────────────────────────────────────────────────

export const addModel = createAsyncThunk<PrintModel, PrintModelInput, { rejectValue: string }>(
  'inventory/addModel',
  async (input, { rejectWithValue }) => {
    try {
      return await createModel(input)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create model'
      return rejectWithValue(msg)
    }
  }
)

export const editModel = createAsyncThunk<
  PrintModel,
  { id: string; patch: Partial<PrintModelInput> },
  { rejectValue: string }
>(
  'inventory/editModel',
  async ({ id, patch }, { rejectWithValue }) => {
    try {
      return await updateModel(id, patch)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update model'
      return rejectWithValue(msg)
    }
  }
)

export const removeModel = createAsyncThunk<string, string, { rejectValue: string }>(
  'inventory/removeModel',
  async (id, { rejectWithValue }) => {
    try {
      await deleteModel(id)
      return id
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete model'
      return rejectWithValue(msg)
    }
  }
)

// ── Filament thunks ───────────────────────────────────────────────────────────

export const addFilament = createAsyncThunk<Filament, FilamentInput, { rejectValue: string }>(
  'inventory/addFilament',
  async (input, { rejectWithValue }) => {
    try {
      return await createFilament(input)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create filament'
      return rejectWithValue(msg)
    }
  }
)

export const editFilament = createAsyncThunk<
  Filament,
  { id: string; patch: Partial<FilamentInput> },
  { rejectValue: string }
>(
  'inventory/editFilament',
  async ({ id, patch }, { rejectWithValue }) => {
    try {
      return await updateFilament(id, patch)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update filament'
      return rejectWithValue(msg)
    }
  }
)

export const removeFilament = createAsyncThunk<string, string, { rejectValue: string }>(
  'inventory/removeFilament',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFilament(id)
      return id
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete filament'
      return rejectWithValue(msg)
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────────────────────

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearInventoryError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    // fetchInventory
    builder.addCase(fetchInventory.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.loading = false
      state.models = action.payload.models
      state.filaments = action.payload.filaments
    })
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload ?? 'Failed to load inventory'
    })

    // addModel
    builder.addCase(addModel.fulfilled, (state, action) => {
      state.models.push(action.payload)
    })
    builder.addCase(addModel.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to create model'
    })

    // editModel
    builder.addCase(editModel.fulfilled, (state, action) => {
      const idx = state.models.findIndex(m => m.id === action.payload.id)
      if (idx !== -1) state.models[idx] = action.payload
    })
    builder.addCase(editModel.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to update model'
    })

    // removeModel
    builder.addCase(removeModel.fulfilled, (state, action) => {
      state.models = state.models.filter(m => m.id !== action.payload)
    })
    builder.addCase(removeModel.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to delete model'
    })

    // addFilament
    builder.addCase(addFilament.fulfilled, (state, action) => {
      state.filaments.push(action.payload)
    })
    builder.addCase(addFilament.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to create filament'
    })

    // editFilament
    builder.addCase(editFilament.fulfilled, (state, action) => {
      const idx = state.filaments.findIndex(f => f.id === action.payload.id)
      if (idx !== -1) state.filaments[idx] = action.payload
    })
    builder.addCase(editFilament.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to update filament'
    })

    // removeFilament
    builder.addCase(removeFilament.fulfilled, (state, action) => {
      state.filaments = state.filaments.filter(f => f.id !== action.payload)
    })
    builder.addCase(removeFilament.rejected, (state, action) => {
      state.error = action.payload ?? 'Failed to delete filament'
    })
  },
})

export const { clearInventoryError } = inventorySlice.actions
export default inventorySlice.reducer
