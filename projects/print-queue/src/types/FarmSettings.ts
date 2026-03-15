export interface FarmSettings {
  /** Labor rate in USD per hour for post-processing time */
  labor_rate_per_hour: number
  /** Bambu Lab API access token — stored locally, never sent to Supabase */
  bambu_access_token: string
  /**
   * Optional CORS proxy URL prefix for Bambu API calls.
   * The API URL is appended after this prefix (URL-encoded).
   * Example: "https://corsproxy.io/?"
   * Leave empty to call the Bambu API directly.
   */
  bambu_cors_proxy: string
}

export const DEFAULT_FARM_SETTINGS: FarmSettings = {
  labor_rate_per_hour: 30,
  bambu_access_token: '',
  bambu_cors_proxy: '',
}
