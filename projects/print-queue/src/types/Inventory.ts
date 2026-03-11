/** A single filament requirement for one unit of a printed model */
export interface ModelFilamentRequirement {
  /** ID of the catalogued filament. Null when the filament hasn't been catalogued yet. */
  filament_id: string | null
  /** Grams of this filament required to print one unit */
  quantity_g: number
}

export interface PrintModel {
  id: string
  name: string
  description: string
  /** External source URL (MakerWorld, Thingiverse, etc.). May be empty for self-created models. */
  model_url: string
  image_url: string
  /** True when the model was designed by the farm owner */
  self_created: boolean
  /** Per-unit filament requirements. Up to four entries (one per filament/color used). */
  filament_requirements: ModelFilamentRequirement[]
  /** Manual post-processing time in minutes (cleanup, assembly, packaging, etc.) */
  post_processing_mins: number
  created_at: string
  updated_at: string
}

export type PrintModelInput = Omit<PrintModel, 'id' | 'created_at' | 'updated_at'>

export interface Filament {
  id: string
  brand: string
  material: string
  color: string
  color_hex: string
  in_stock: boolean
  /** Cost of one full roll in USD */
  roll_cost: number
  /** Weight of one full roll in grams */
  roll_size_g: number
  /** Current quantity of filament on hand in grams */
  current_quantity_g: number
  /** URL to purchase this filament (optional) */
  purchase_url: string
  created_at: string
  updated_at: string
}

export type FilamentInput = Omit<Filament, 'id' | 'created_at' | 'updated_at'>

// ── Filament stats ─────────────────────────────────────────────────────────────

export interface FilamentStats {
  filament_id: string
  /** Grams consumed by completed orders */
  consumed_g: number
  /** Grams reserved by active (Queue / Printing) orders */
  reserved_g: number
  /** Grams remaining after reservations: current_quantity_g - reserved_g */
  remaining_g: number
}
