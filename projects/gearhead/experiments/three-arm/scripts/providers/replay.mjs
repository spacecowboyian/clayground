// Replay provider: returns responses that were produced elsewhere (a live model, a person, a sub-agent).
// Expects <settings.responsesDir>/<arm>/<task.id>/rep-<n>.txt containing the raw model response.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export async function generate({ arm, task, rep, settings }) {
  const file = join(settings.responsesDir, arm, task.id, `rep-${rep}.txt`);
  if (!existsSync(file)) throw new Error(`no recorded response at ${file}`);
  return { response: readFileSync(file, 'utf8'), usage: {} };
}
