import type { PrintModel } from '../types/Inventory'
import type { Filament } from '../types/Inventory'

export interface CostBreakdown {
  material_cost: number
  labor_cost: number
  total_cost: number
}

/**
 * Calculate the estimated cost to produce one unit of a model.
 *
 * material_cost = (filament_usage_g / roll_size_g) * roll_cost
 * labor_cost    = (post_processing_mins / 60) * labor_rate_per_hour
 * total_cost    = material_cost + labor_cost
 */
export function calculateItemCost(
  model: Pick<PrintModel, 'filament_usage_g' | 'post_processing_mins'>,
  filament: Pick<Filament, 'roll_cost' | 'roll_size_g'>,
  laborRatePerHour: number,
): CostBreakdown {
  const material_cost =
    filament.roll_size_g > 0
      ? (model.filament_usage_g / filament.roll_size_g) * filament.roll_cost
      : 0

  const labor_cost = (model.post_processing_mins / 60) * laborRatePerHour

  return {
    material_cost: Math.round(material_cost * 100) / 100,
    labor_cost: Math.round(labor_cost * 100) / 100,
    total_cost: Math.round((material_cost + labor_cost) * 100) / 100,
  }
}
