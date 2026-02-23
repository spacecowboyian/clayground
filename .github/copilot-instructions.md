# Copilot Instructions for Clayground

You are an AI coding assistant working inside the **Clayground** monorepo — a collection of small MVP experiments built with Vite + React and deployed to GitHub Pages.

---

## 1. Always ask before committing

**Never commit or push code without explicit confirmation from the user.**

- Propose what you plan to commit (files, commit message, version bump).
- Wait for a "yes / go ahead" before running any git commit or push.
- This applies to `CHANGELOG.md` updates as well.

---

## 2. Conventional Commits — always

Every commit message must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <short description>

[optional body — wrap at 72 chars]

[optional footer — BREAKING CHANGE: ..., Closes #123]
```

### Allowed types

| Type | When to use |
|------|-------------|
| `feat` | New experiment, component, page, or capability |
| `fix` | Bug fix |
| `docs` | README, CHANGELOG, comments — no logic change |
| `style` | Formatting / whitespace only |
| `refactor` | Code restructure with no behaviour change |
| `test` | Adding or updating tests |
| `build` | Build config changes (vite, tsconfig, postcss) |
| `ci` | GitHub Actions workflow changes |
| `chore` | Dependency bumps, deleting unused files, tooling |
| `revert` | Reverting a previous commit |

### Allowed scopes

| Scope | Covers |
|-------|--------|
| `gearhead` | `projects/gearhead/**` |
| `template` | `projects/template/**` |
| `<project-name>` | Any specific experiment under `projects/` |
| `docs` | `docs/index.html`, `docs/projects.json` |
| `ci` | `.github/workflows/**` |
| *(omit)* | Repo-wide / cross-cutting changes |

---

## 3. Always update CHANGELOG.md

Before every commit:

1. Add entries under `## [Unreleased]` while working.
2. Before the final commit, move those entries into a new versioned section:
   ```
   ## [X.Y.Z] – YYYY-MM-DD
   ```
3. Follow [Semantic Versioning](https://semver.org/):
   - `PATCH` — `fix`, `docs`, `chore`, `ci`, `style`, `refactor`
   - `MINOR` — `feat` (new experiment, component, or capability)
   - `MAJOR` — breaking changes
4. Group entries under the same `type(scope)` headings used in the commit.

---

## 4. Gearhead design system — always use it, always contribute to it

**Before building any UI component**, check `projects/gearhead/src/components/` first.

- If the component exists → import it from `@gearhead/ui`.
- If the component does **not** exist → add it to Gearhead first, then use it.

### Adding a new Gearhead component

1. `projects/gearhead/src/components/<Name>/<Name>.tsx`
2. Build on the relevant `react-aria-components` primitive (see rule 5).
3. Style with Tailwind classes and CSS tokens from `src/styles/theme.css`.
4. Export from `projects/gearhead/src/index.ts`.
5. Write a Storybook story at `projects/gearhead/src/stories/<Name>.stories.tsx`.
6. Verify it renders correctly in Storybook before using it anywhere.

> **A component without a story doesn't ship.**

### Using Gearhead in a project

```json
// project/package.json
"dependencies": {
  "@gearhead/ui": "file:../gearhead"
}
```

```css
/* src/index.css */
@import '@gearhead/ui/styles';
@import 'tailwindcss';
```

```tsx
import { Button, TextField } from '@gearhead/ui'
```

---

## 5. React Aria Components — always the foundation

Every interactive or accessible UI primitive must be built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).

- **Never hand-roll** keyboard navigation, focus management, or ARIA attributes.
- Extend `react-aria-components` props through `interface MyProps extends AriaProps`.
- Use `mergeProps` when composing multiple ARIA behaviors.
- Test with a screen reader or the Storybook accessibility add-on before shipping.

---

## 6. Design token rules

- **No hardcoded hex values.** Use `var(--token-name)` from `src/styles/theme.css`.
- **No hardcoded spacing or font sizes.** Use Tailwind utility classes that map to tokens.
- Dark-first palette: baseline background is `#222222`. All components must look correct on dark backgrounds.
- Orange is primary: `--accent-orange` is the default brand action colour.
- `className` passthrough: every Gearhead component must accept and forward `className`.

---

## 7. MVP / vibe-coding principles

This repo is a **playground for small, fast experiments**. Keep scope ruthlessly small.

### Think first, build second
Before writing a single line of code:
1. Restate the goal in one sentence.
2. List the smallest set of features needed to validate the idea.
3. Identify which Gearhead components to reuse.
4. Propose the file structure and ask for approval.

### YAGNI — You Aren't Gonna Need It
- Don't add abstraction layers until the second use case appears.
- Don't add configuration options that aren't immediately required.
- Don't scaffold boilerplate beyond what the MVP needs.

### Ship the smallest thing
- Build the happy path first; edge cases come after user feedback.
- Stub out or skip non-critical features with a clear `// TODO:` comment.
- A rough working thing is better than a polished thing that doesn't exist yet.

### Iterate in small, atomic commits
- Each commit should represent one logical change.
- Never mix refactors, features, and bug fixes in the same commit.
- If a change spans more than ~150 lines of diff, look for a way to split it.

---

## 8. Code style and quality

### TypeScript
- Strict mode is on everywhere. No `any` unless absolutely unavoidable (add a comment explaining why).
- Prefer `interface` over `type` for object shapes; use `type` for unions/intersections.
- Export named exports only — no default exports from component files.

### React
- Functional components with hooks only. No class components.
- Keep components small: one responsibility, under ~150 lines.
- Lift state only when two components genuinely need to share it.
- Avoid `useEffect` for data transformations — use derived state or `useMemo`.
- Use `React.memo` only after a measured performance problem.

### File organisation
```
src/
  components/      ← one folder per component, PascalCase
  hooks/           ← custom hooks, camelCase, prefix "use"
  lib/             ← third-party client wrappers (supabase.ts, etc.)
  pages/           ← route-level components
  utils/           ← pure helpers, no side effects
```

### Naming
- Components: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Constants: `SCREAMING_SNAKE_CASE`
- Everything else: `camelCase`

---

## 9. Security

- **Never commit secrets.** API keys, tokens, passwords → `.env.local` only.
- Add `.env.local` to `.gitignore` (it already is; keep it there).
- Reference secrets via `import.meta.env.VITE_*` in Vite projects.
- Add required env var names as GitHub Actions secrets for CI builds.
- Sanitise any user-provided content before rendering it with `dangerouslySetInnerHTML` (and prefer alternatives).
- Do not log sensitive data to the console in production paths.

---

## 10. Accessibility

- All interactive elements must be reachable by keyboard.
- All images need descriptive `alt` text (or `alt=""` for decorative images).
- Colour contrast must meet WCAG AA (4.5 : 1 for normal text, 3 : 1 for large text).
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`) before ARIA roles.
- React Aria handles most of this automatically — don't work around it.

---

## 11. Adding a new project / experiment

1. Copy the template: `cp -r projects/template projects/my-experiment`
2. Install: `cd projects/my-experiment && npm install`
3. Add `@gearhead/ui` as a local dependency.
4. Develop locally with `npm run dev`.
5. Register it in `docs/projects.json`.
6. Build with `npm run build` (outputs to `docs/my-experiment/`).
7. Confirm with the user, then commit following rules 1–3 above.

---

## 12. Browser verification — always check your own work

Any change that could affect **page loading, layout, rendering, or styles** must be visually verified in a browser before declaring the work done. Do not rely on the build passing alone.

### When to open the browser

Open the dev server (`npm run dev`) and inspect the result in a browser whenever you change:

- Any CSS, Tailwind classes, or design token values
- Component markup, layout, or visual structure
- Routing, base paths, or `vite.config.ts` / `next.config.js`
- `docs/index.html` or `docs/projects.json` (homepage)
- Any file that feeds data directly into a rendered page

### What to check

1. **Page loads without errors** — open the browser console; zero red errors.
2. **Styles are applied correctly** — no unstyled elements, no broken layout, no visible tokens (e.g. `var(--color)` strings showing as text).
3. **Dark background is respected** — all text and components are legible on `#222222`.
4. **Interactive states work** — hover, focus, active, disabled all look correct.
5. **Responsive layout holds** — resize to mobile width; nothing overflows or breaks.
6. **No console warnings about a11y** — React Aria / axe warnings count as failures.

### Screenshot requirement

For any change that meaningfully affects the UI, **include screenshots of both mobile and desktop views** in your reply, progress report, or PR comment — even when a browser is available.

- **Desktop:** full-width viewport (≥ 1280 px).
- **Mobile:** narrow viewport (≤ 390 px), simulating a phone screen.
- Annotate or caption each screenshot so it is clear which view is which.

### Self-verification rule

> If you cannot open a browser (e.g. headless CI context), explicitly tell the user what to check and why, and do **not** mark the task as complete until the user confirms the visual result.

Take screenshots of both mobile and desktop views (or describe the verified state in detail if a browser is unavailable) and include them in your progress report or PR comment so the user can see the outcome.

---

## 13. Pre-commit checklist

Before proposing a commit to the user, verify:

- [ ] `CHANGELOG.md` updated with a versioned entry
- [ ] `docs/projects.json` updated if a new experiment was added
- [ ] Any new shared UI component added to Gearhead (not inline in a project)
- [ ] `npm run build` passes locally in every changed project
- [ ] No secrets or `.env` files staged
- [ ] All new Gearhead components have a Storybook story
- [ ] Screenshots of **both mobile (≤ 390 px) and desktop (≥ 1280 px) views** included in reply / PR comment for any meaningful UI change
- [ ] Browser verified: page loads, styles applied, no console errors (rule 12)
- [ ] Commit message follows Conventional Commits format
