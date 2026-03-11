export interface PrintModel {
  id: string
  name: string
  description: string
  model_url: string
  image_url: string
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
  created_at: string
  updated_at: string
}

export type FilamentInput = Omit<Filament, 'id' | 'created_at' | 'updated_at'>
