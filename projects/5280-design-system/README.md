# 5280 Design System

The **5280 Creative** component library — a warm, human, faith-based branding system.
_"Creative with a heartbeat."_

🔗 Live: `https://spacecowboyian.github.io/clayground/5280-design-system/main/index.html`

## What this is

A single self-contained page (`index.html`) showcasing the 5280 brand system:

- **Foundations** — color palette (pine/jade core, red/periwinkle/gold accents, soft
  tints), typography (display / serif / UI voices), spacing & elevation.
- **Components** — pill buttons, navigation (desktop, over-imagery, mobile drawer),
  forms & inputs with a live newsletter signup, cards, count-up stats & award badges,
  logo marquee, testimonials, section headers, accordions, tabs, modals, and toasts.

All interactions are real: scroll-spy sidebar, reveal-on-scroll, animated count-up,
hover/focus states, the mobile-nav drawer, accordion expand/collapse, tab switching,
the modal, and auto-dismissing toasts.

## Source & build

Imported from **Claude Design** (`5280 Design System.dc.html`). The design-canvas DSL
(`style-hover`, `{{ bindings }}`, `<sc-if>`, `<sc-for>`) was translated to plain
HTML/CSS/JS with a tiny vanilla runtime — no framework, no bundler, **no build step**.

Because there is no `package.json`, the CI deploy skips building this project and
serves `docs/5280-design-system/main/index.html` as-is (same pattern as `oio-uploader`).

To regenerate from the original export, re-run the import transform and copy the output
to both `projects/5280-design-system/index.html` and
`docs/5280-design-system/main/index.html`.

## Run locally

```bash
open projects/5280-design-system/index.html
# or serve the repo root and visit /clayground/5280-design-system/main/index.html
```
