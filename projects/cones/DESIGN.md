---
version: alpha
name: Cones
description: Design system for the ksscca.org rebuild — bold, vintage, Americana motorsport branding built on React Aria Components + Tailwind CSS 4.
colors:
  primary: "#d97706"
  primary-hover: "#b45309"
  secondary: "#a3a3a3"
  neutral-bg: "#222222"
  neutral-fg: "#f5f5f5"
  card: "#2a2a2a"
  border: "#404040"
  status-info: "#3b82f6"
  status-success: "#059669"
  status-special: "#7c3aed"
  status-error-status: "#991b1b"
  destructive: "#dc2626"
typography:
  h1:
    fontFamily: Staatliches
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0.015em
  h2:
    fontFamily: Staatliches
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0.015em
  h3:
    fontFamily: Rajdhani
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.3
  h4:
    fontFamily: Rajdhani
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: Barlow
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.2em
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
components:
  button-primary:
    background: "{colors.primary}"
    text: "#ffffff"
    radius: "{rounded.lg}"
---

## Overview

Cones is bold, vintage, Americana motorsport branding — Staatliches's chunky, stencil-adjacent poster feel for headlines, Rajdhani's technical timing-screen edge for subheads, and Barlow's plain, high-contrast grotesque for body copy and UI so the racing flavor never compromises legibility on results tables and forms. The register is brand: the site should read as a real, active regional SCCA club, not a generic dashboard template with a checkered-flag icon bolted on. Avoid corporate-SaaS tells — no purple-to-blue gradients, no Inter-everywhere, no cards nested in cards.

## Colors

The palette is dark and high-contrast, anchored by a single cone-orange accent as the sole primary action color. A small status set (blue/green/purple/red) exists for state — badges, charts, timeline steps — and is not meant to appear on general-purpose buttons or interactive controls.

- **Primary (#d97706, "Cone Orange"):** The one primary-action color. Used for the main CTA in any given view (Register Now, primary Button variant) and nowhere else. **Known issue:** white text on this fill measures 3.2:1 contrast — below the 4.5:1 AA requirement. Flagged by the Impeccable detector 2026-07-14, not yet fixed.
- **Secondary (#a3a3a3, muted gray):** Used for de-emphasized text, captions, and metadata — not a competing action color.
- **Neutral background (#222222) / foreground (#f5f5f5):** The dark base and primary text color. Placeholder values pending the real KSSCCA brand color pass (see `theme.css` TODOs).
- **Card (#2a2a2a) / Border (#404040):** Surface and outline colors for cards, inputs, and dividers.
- **Status set (blue #3b82f6, green #059669, purple #7c3aed, red #991b1b):** Reserved for state — badges, StatCard, ProgressBar, OrderStatusTimeline. Not a decorative palette for buttons, checkboxes, or other general controls.

## Typography

Three locked families, chosen via a live font-combo comparison (Explorations story) and fixed in `theme.css` as `--font-heading`, `--font-subhead`, `--font-body`:

- **H1 / H2 — Staatliches:** Chunky, condensed, mid-century poster feel. Set with a touch of positive letter-spacing (0.015em) since the face runs tight by design. All caps is not required (unlike the earlier Racing Sans One candidate) — Staatliches has real lowercase forms.
- **H3 / H4 — Rajdhani:** Technical/dashboard character for secondary headings, e.g. a discipline strip or card subhead.
- **Body, UI text, and eyebrow labels — Barlow:** Grotesque with a slightly athletic/industrial lean. Buttons and form controls also use Barlow — display faces (the earlier Bebas Neue candidate) read shouty at UI scale and were rejected for that role.
- **Eyebrow / kicker unit:** A locked typography role (`.eyebrow` class in `theme.css`) — always Barlow, 12px, 0.2em tracking, uppercase, cone orange. Used above card headings and section labels; not meant to vary per component the way headings and body copy can.

## Layout

8px-derived spacing via Tailwind's default 4px-based scale (no custom overrides). Cards use consistent `px-7 py-6` padding with `rounded-2xl` corners and a `border border-border`. Foundations/reference pages cap prose width at `max-w-[60ch]` for readability (an Impeccable line-length finding — an earlier 70ch width rendered ~88 chars/line in practice).

## Shapes

Radius scale derived from a single `--radius` base (0.5rem / 8px): `sm` (4px), `md` (6px), `lg` (8px, the base), `xl` (12px). Buttons and cards default to `lg`.

## Components

- **Button:** `primary` (orange fill — the sole primary CTA color), `secondary`/`outline`/`ghost` (neutral, no competing hue), `destructive` (uses the dedicated destructive color, not the general status palette). **Contrast gap:** primary variant's white-on-orange text fails AA (3.2:1) — needs a fix, either a darker orange or darker button text.
- **Card:** `rounded-2xl`, `border border-border`, `bg-card`, `px-7 py-6` — the standard content container used throughout Foundations and component stories.
- **Eyebrow:** see Typography above — a fixed small-caps tracked label, not a component per se but a locked CSS unit (`.eyebrow`).
- Full component inventory lives in Storybook (`npm run dev` in `projects/cones`) under the Components group.

## Do's and Don'ts

- **Do** reserve cone orange for the single primary action per view. **Don't** use it as general decoration or apply it to secondary/tertiary actions.
- **Do** use the status color set (blue/green/purple/red) only where it carries meaning — badges, charts, timeline state. **Don't** let it become an arbitrary color-picker option on buttons, checkboxes, or other general controls (this was an open problem as of 2026-07-14, not yet resolved across all ~20 interactive components).
- **Do** keep body copy, buttons, and form fields in Barlow. **Don't** put a display/poster face (Staatliches, or the rejected Bebas Neue) into UI microcopy — it reads shouty or illegible at small sizes.
- **Do** give Staatliches headlines a touch of letter-spacing. **Don't** set it perfectly tight — it's a chunky, condensed face that needs room to breathe at heading sizes.
- **Don't** ship the known button-contrast gap (white on `#d97706` at 3.2:1) without a plan — either darken the fill or use a dark button label instead of white.
