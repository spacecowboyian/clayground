# Three-arm definitions experiment (epic #82)

Question: do implementation-free Gearhead *definitions* let a model build UI as well as the tokens or the full source can?

| Arm | Model sees |
|---|---|
| `tokens-only` | resolved design tokens |
| `tokens-components` | tokens + the Gearhead source (`src/**`) |
| `definitions-only` | self-contained `definitions.json` (resolved token values inlined), no source |

Arms 1 and 3 must never contain Gearhead source; `build-bundles` asserts isolation and leak-scans them.
Nothing here changes Gearhead itself.

## Layout
- `definitions/*.json` – 32 definitions (29 components, 3 patterns); contract in `schema/recipe.schema.json`
- `manifest/coverage.json` – provenance only (never in a bundle)
- `tokens/tokens.json` – generated from `src/styles/theme.css`
- `fixtures/tasks.json` – shared task, output contract, required checks
- `scripts/` – `validate`, `extract-tokens`, `build-bundles`, `generate`, `evaluate`
- `dist/` – ignored: bundles, runs (archived `request.json` per run), report

## Run
```
npm install
npm run validate && npm run tokens -- --check
npm run bundles
node scripts/generate.mjs --renderer=playwright --repeats=3   # mock provider (pipeline check only)
npm run evaluate                                              # -> dist/report/index.html
npm test
```
Real generation: `--provider=replay --responses=DIR --model=NAME` replays responses written elsewhere (a model API, or isolated sub-agents that read only an arm's archived `request.json`) to `DIR/<arm>/<task>/rep-<n>.txt`.
Single comparison page (spec scoring + design-system judgments from `dist/judgments/{A,B,C}.json`, blinded A=definitions-only, B=tokens-only, C=tokens-components): `node scripts/compare.mjs --run=dist/runs/<run>` -> `dist/compare/index.html`.
Caveat: judges score against the definitions document, which favours the definitions-only arm; use the spec scores as the neutral comparison.
Set `CHROMIUM_PATH` if no cached Playwright Chromium is found.

## Limitations
- The mock provider is deterministic and validates the pipeline only; its results say nothing about models.
- Small sample (one fixture). Metrics are reported separately, never as one score; no universal claims.
- Token adherence is a proxy (colors/radii vs palette), not a visual diff.

## Baseline observations (reported, not fixed)
DetailsPage builds an unused `headerTitle`; FilterSidebar buttons lack focus-visible styling; Button `icon` variant has no color/hover; last Breadcrumb item uses `pointer-events-none`; OrderStatusTimeline stories pass `'Queue' | 'Printing' | 'Complete'` while the component expects `'waiting' | 'in_progress' | 'complete'`, so Storybook shows every state as pending. The Gearhead README says "21 components" (actual: 29 families + 3 patterns).

## Open owner decisions (block live runs only)
Whether definitions may inline resolved token values; model/provider/budget/repeats; HTML-only vs images first pass; final fixtures, viewports and rubric; repo-instruction exception for arms 1 and 3 (outputs must not use Gearhead); final file layout. No HTTP model provider is implemented (use `replay`); secrets must never go in `VITE_*` or artifacts.

## Reference page (real components)

`node scripts/reference.mjs [--run-id=live-1]` builds `reference/main.tsx` (the print-queue task composed from the real Gearhead components, imported read-only from `../../src`) into a single HTML file, renders it with the same harness and stores it as `dist/runs/<run>/reference/`. `scripts/compare.mjs` shows it as a baseline card. It is not a scored arm.
