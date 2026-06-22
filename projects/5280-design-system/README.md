# 5280 Design System

The **5280 Creative** component library — a warm, human, faith-based branding system,
presented as an interactive **Storybook**. _"Creative with a heartbeat."_

🔗 Live: `https://spacecowboyian.github.io/clayground/5280-design-system/main/`

## Stack

Storybook 8 + Vite + React + TypeScript — the same stack as [Gearhead](../gearhead),
but its own bespoke brand system (no Tailwind / React Aria; components are inline-styled
ports driven by shared tokens).

## What's inside

- **Foundations** — `Foundations/Colors`, `Foundations/Typography`,
  `Foundations/Spacing & Elevation`.
- **Components** (each with stories for every variant/state):
  Button, Link, Navbar (+ mobile drawer), Field / Select / TextArea, NewsletterSignup,
  ContactForm, Card (work / case-study / blog), StatBar (scroll count-up), AwardBadge,
  LogoMarquee, Testimonial, SectionHeader, Accordion, Tabs, Modal, Toast, Footer.

Design tokens live in `src/tokens.ts` (colors, fonts, radii, spacing, elevation) and
`src/styles/theme.css` (CSS vars, fonts, keyframes). Hover/focus/in-view behavior comes
from the hooks in `src/utils/`.

## Develop

```bash
cd projects/5280-design-system
npm install
npm run dev        # Storybook on http://localhost:6007
```

## Build for GitHub Pages

```bash
npm run build      # → ../../docs/5280-design-system/main
```

CI (`.github/workflows/deploy.yml`) runs `npm ci && npm run build` for every project
with a `package.json`, so this Storybook is rebuilt and published on each push to `main`.

## Provenance

Imported from **Claude Design** (`5280 Design System.dc.html`) via the `claude_design`
MCP connector, then translated from the design-canvas DSL into React components + stories.
