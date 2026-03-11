import type { PrintModel, ModelFilamentRequirement } from '../types/Inventory'
import type { Filament } from '../types/Inventory'

export interface CostBreakdown {
  material_cost: number
  labor_cost: number
  total_cost: number
}

/**
 * Calculate the estimated cost to produce one unit of a model.
 *
 * material_cost = sum over each filament requirement:
 *                   (quantity_g / roll_size_g) * roll_cost
 * labor_cost    = (post_processing_mins / 60) * labor_rate_per_hour
 * total_cost    = material_cost + labor_cost
 *
 * Requirements whose filament_id is null (not yet catalogued) are skipped.
 */
export function calculateItemCost(
  model: Pick<PrintModel, 'filament_requirements' | 'post_processing_mins'>,
  allFilaments: Pick<Filament, 'id' | 'roll_cost' | 'roll_size_g'>[],
  laborRatePerHour: number,
): CostBreakdown {
  let material_cost = 0
  for (const req of model.filament_requirements) {
    if (req.filament_id === null) continue
    const fil = allFilaments.find(f => f.id === req.filament_id)
    if (!fil || fil.roll_size_g <= 0) continue
    material_cost += (req.quantity_g / fil.roll_size_g) * fil.roll_cost
  }

  const labor_cost = (model.post_processing_mins / 60) * laborRatePerHour

  return {
    material_cost: Math.round(material_cost * 100) / 100,
    labor_cost: Math.round(labor_cost * 100) / 100,
    total_cost: Math.round((material_cost + labor_cost) * 100) / 100,
  }
}

/**
 * Returns the total grams of all filaments required to print one unit of a model.
 * Useful for display and quick estimates.
 */
export function totalFilamentUsageG(requirements: ModelFilamentRequirement[]): number {
  return requirements.reduce((sum, r) => sum + r.quantity_g, 0)
}
