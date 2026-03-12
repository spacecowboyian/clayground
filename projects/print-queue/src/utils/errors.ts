/** Extract a human-readable message from any thrown value.
 *  Supabase returns PostgrestError objects (not Error instances), so we
 *  explicitly check for a `.message` property before falling back to the
 *  provided default string. */
export function extractMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) return err.message
  if (
    err &&
    typeof err === 'object' &&
    'message' in err &&
    typeof (err as { message: unknown }).message === 'string'
  ) {
    return (err as { message: string }).message
  }
  return fallback
}
