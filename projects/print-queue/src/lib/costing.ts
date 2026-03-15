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
 * Requirements with a specific filament_id are priced using that filament.
 * Requirements with filament_id=null (colour-agnostic, set by migration 006)
 * are priced using the corresponding entry in `selectedFilaments` (indexed by
 * requirement position) when provided; otherwise that requirement is skipped.
 *
 * For backward compatibility, a single filament can be passed as a one-element
 * array (or wrapped externally) when all requirements share one colour.
 */
export function calculateItemCost(
  model: Pick<PrintModel, 'filament_requirements' | 'post_processing_mins'>,
  allFilaments: Pick<Filament, 'id' | 'roll_cost' | 'roll_size_g'>[],
  laborRatePerHour: number,
  selectedFilaments?: (Pick<Filament, 'id' | 'roll_cost' | 'roll_size_g'> | null)[] | null,
): CostBreakdown {
  let material_cost = 0
  for (let i = 0; i < model.filament_requirements.length; i++) {
    const req = model.filament_requirements[i]
    const fil = req.filament_id
      ? allFilaments.find(f => f.id === req.filament_id)
      : (selectedFilaments?.[i] ?? null)
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
