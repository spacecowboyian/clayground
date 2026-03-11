import { supabase, isSupabaseConfigured } from './supabase'
import type { PrintModel, PrintModelInput, Filament, FilamentInput } from '../types/Inventory'

// ── Seed data ──────────────────────────────────────────────────────────────────
const KAREN_URL_HEART =
  'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867'
const KAREN_URL_HOTWHEELS =
  'https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264'
const KAREN_URL_UNO =
  'https://makerworld.com/en/models/2175464-simple-customizable-card-box-parametric#profileId-2360117'

type ModelSeed = Omit<PrintModel, 'id' | 'created_at' | 'updated_at'>
type FilamentSeed = Omit<Filament, 'id' | 'created_at' | 'updated_at'>

const MODEL_SEEDS: ModelSeed[] = [
  { name: 'Heart curio shelf',  description: 'Small heart-shaped trinket shelf',  model_url: KAREN_URL_HEART,     image_url: '', filament_usage_g: 20, post_processing_mins: 5  },
  { name: 'Hot Wheels shelf',   description: 'Wall shelf for 10 Hot Wheels cars', model_url: KAREN_URL_HOTWHEELS, image_url: '', filament_usage_g: 80, post_processing_mins: 10 },
  { name: 'Uno card holder',    description: 'Simple customizable card box',       model_url: KAREN_URL_UNO,       image_url: '', filament_usage_g: 30, post_processing_mins: 5  },
]

const FILAMENT_SEEDS: FilamentSeed[] = [
  { brand: 'Generic', material: 'PLA', color: 'Pink',       color_hex: '#f472b6', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Purple',     color_hex: '#a855f7', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Light Blue', color_hex: '#7dd3fc', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Yellow',     color_hex: '#fde047', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Dark Blue',  color_hex: '#1e40af', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'White',      color_hex: '#f5f5f5', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Black',      color_hex: '#1a1a1a', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Red',        color_hex: '#ef4444', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
  { brand: 'Generic', material: 'PLA', color: 'Green',      color_hex: '#22c55e', in_stock: true,  roll_cost: 20, roll_size_g: 1000 },
]

const LS_MODELS_KEY    = 'print_queue_models'
const LS_FILAMENTS_KEY = 'print_queue_filaments'

function now(): string {
  return new Date().toISOString()
}

// ── LocalStorage helpers ───────────────────────────────────────────────────────
function lsLoadModels(): PrintModel[] {
  try {
    const raw = localStorage.getItem(LS_MODELS_KEY)
    if (raw) return JSON.parse(raw) as PrintModel[]
  } catch {
    // ignore
  }
  const seeded: PrintModel[] = MODEL_SEEDS.map(t => ({
    id: crypto.randomUUID(),
    ...t,
    created_at: now(),
    updated_at: now(),
  }))
  localStorage.setItem(LS_MODELS_KEY, JSON.stringify(seeded))
  return seeded
}

function lsSaveModels(models: PrintModel[]): void {
  localStorage.setItem(LS_MODELS_KEY, JSON.stringify(models))
}

function lsLoadFilaments(): Filament[] {
  try {
    const raw = localStorage.getItem(LS_FILAMENTS_KEY)
    if (raw) return JSON.parse(raw) as Filament[]
  } catch {
    // ignore
  }
  const seeded: Filament[] = FILAMENT_SEEDS.map(t => ({
    id: crypto.randomUUID(),
    ...t,
    created_at: now(),
    updated_at: now(),
  }))
  localStorage.setItem(LS_FILAMENTS_KEY, JSON.stringify(seeded))
  return seeded
}

function lsSaveFilaments(filaments: Filament[]): void {
  localStorage.setItem(LS_FILAMENTS_KEY, JSON.stringify(filaments))
}

// ── Models public API ──────────────────────────────────────────────────────────
export async function listModels(): Promise<PrintModel[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .order('name', { ascending: true })
    if (error) throw error
    return (data ?? []) as PrintModel[]
  }
  return lsLoadModels().sort((a, b) => a.name.localeCompare(b.name))
}

export async function createModel(input: PrintModelInput): Promise<PrintModel> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('models')
      .insert([input])
      .select()
      .single()
    if (error) throw error
    return data as PrintModel
  }
  const model: PrintModel = { id: crypto.randomUUID(), ...input, created_at: now(), updated_at: now() }
  const models = lsLoadModels()
  lsSaveModels([...models, model])
  return model
}

export async function updateModel(id: string, patch: Partial<PrintModelInput>): Promise<PrintModel> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('models')
      .update({ ...patch, updated_at: now() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as PrintModel
  }
  const models = lsLoadModels()
  const idx = models.findIndex(m => m.id === id)
  if (idx === -1) throw new Error('Model not found')
  const updated = { ...models[idx], ...patch, updated_at: now() }
  models[idx] = updated
  lsSaveModels(models)
  return updated
}

export async function deleteModel(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('models').delete().eq('id', id)
    if (error) throw error
    return
  }
  lsSaveModels(lsLoadModels().filter(m => m.id !== id))
}

// ── Filaments public API ───────────────────────────────────────────────────────
export async function listFilaments(): Promise<Filament[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('filaments')
      .select('*')
      .order('color', { ascending: true })
    if (error) throw error
    return (data ?? []) as Filament[]
  }
  return lsLoadFilaments().sort((a, b) => a.color.localeCompare(b.color))
}

export async function createFilament(input: FilamentInput): Promise<Filament> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('filaments')
      .insert([input])
      .select()
      .single()
    if (error) throw error
    return data as Filament
  }
  const filament: Filament = { id: crypto.randomUUID(), ...input, created_at: now(), updated_at: now() }
  const filaments = lsLoadFilaments()
  lsSaveFilaments([...filaments, filament])
  return filament
}

export async function updateFilament(id: string, patch: Partial<FilamentInput>): Promise<Filament> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('filaments')
      .update({ ...patch, updated_at: now() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as Filament
  }
  const filaments = lsLoadFilaments()
  const idx = filaments.findIndex(f => f.id === id)
  if (idx === -1) throw new Error('Filament not found')
  const updated = { ...filaments[idx], ...patch, updated_at: now() }
  filaments[idx] = updated
  lsSaveFilaments(filaments)
  return updated
}

export async function deleteFilament(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('filaments').delete().eq('id', id)
    if (error) throw error
    return
  }
  lsSaveFilaments(lsLoadFilaments().filter(f => f.id !== id))
}
