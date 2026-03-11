export interface FarmSettings {
  /** Labor rate in USD per hour for post-processing time */
  labor_rate_per_hour: number
}

export const DEFAULT_FARM_SETTINGS: FarmSettings = {
  labor_rate_per_hour: 30,
}
