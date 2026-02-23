# Agent Instructions — Clayground

> **What this file is:** Rules every AI coding assistant must follow when working in this repository.
> It mirrors `.github/copilot-instructions.md` and is recognized by Cursor, Claude Code, and other tools.

---

## Cardinal rules

1. **Ask before committing.** Never commit or push without explicit user approval.
2. **Conventional Commits.** Every commit message must follow the spec (see below).
3. **Update the changelog.** Every commit that ships code also ships a `CHANGELOG.md` entry.
4. **Gearhead first.** All shared UI lives in `projects/gearhead/`. Check there before writing new components.
5. **React Aria foundation.** Every interactive primitive is built on `react-aria-components`.

---

## Conventional Commits

```
<type>(<scope>): <short description>

[optional body]
[optional footer: BREAKING CHANGE or Closes #N]
```

| Type | Use for |
|------|---------|
| `feat` | New experiment, component, page, or capability |
| `fix` | Bug fix |
| `docs` | Docs/comments only |
| `style` | Formatting only |
| `refactor` | Code restructure, no behaviour change |
| `test` | Test additions or updates |
| `build` | Build config (vite, tsconfig, postcss) |
| `ci` | GitHub Actions changes |
| `chore` | Dependency bumps, cleanup |
| `revert` | Reverting a commit |

Scopes: `gearhead`, `template`, `<project-name>`, `docs`, `ci`, or omit for repo-wide changes.

---

## CHANGELOG rules

- Add entries under `## [Unreleased]` while working.
- Before the final commit, convert to a versioned section: `## [X.Y.Z] – YYYY-MM-DD`
- Semver: `PATCH` for fixes/docs/chore, `MINOR` for new features, `MAJOR` for breaking changes.
- Group under the same `type(scope)` headings used in the commit message.

---

## Gearhead — shared design system

Path: `projects/gearhead/`  
Package name: `@gearhead/ui`  
Live docs: `https://spacecowboyian.github.io/clayground/gearhead/`

### Workflow

1. Need a UI component? **Check `projects/gearhead/src/components/` first.**
2. Component exists → `import { It } from '@gearhead/ui'`.
3. Component missing → **add it to Gearhead, then use it.**

### Adding a component to Gearhead

```
projects/gearhead/src/
  components/<Name>/<Name>.tsx   ← implementation
  stories/<Name>.stories.tsx     ← Storybook story (required)
  index.ts                       ← add the export here
```

Template:

```tsx
import { SomePrimitive, type SomePrimitiveProps } from 'react-aria-components';
import { cn } from '../../utils/cn';

interface MyComponentProps extends SomePrimitiveProps {
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

export function MyComponent({ color = 'orange', className, ...props }: MyComponentProps) {
  return (
    <SomePrimitive
      className={cn('base-classes', colorMap[color], className)}
      {...props}
    />
  );
}
```

### Adding Gearhead to a project

```json
// project/package.json
"dependencies": { "@gearhead/ui": "file:../gearhead" }
```

```css
/* src/index.css */
@import '@gearhead/ui/styles';
@import 'tailwindcss';
```

---

## React Aria rules

- **Never hand-roll** keyboard nav, focus rings, or ARIA attributes.
- Extend component props via `interface MyProps extends AriaXxxProps`.
- Use `mergeProps` for composing multiple ARIA behaviors.
- Test keyboard navigation and screen reader output before every component ships.

---

## Design tokens

- No hardcoded hex values — use `var(--token-name)` from `src/styles/theme.css`.
- No hardcoded spacing or font sizes — use Tailwind utility classes.
- Dark-first: base background is `#222222`. Components must look correct on dark.
- Primary accent: `--accent-orange`.
- Every component accepts and forwards `className`.

---

## MVP / vibe-coding mindset

### Before writing code

1. Restate the goal in one sentence.
2. List the minimum features needed to validate the idea.
3. Identify Gearhead components to reuse.
4. Propose the file/component structure and get approval.

### During development

- **YAGNI.** Don't add abstractions until the second use case appears.
- Build the happy path first. Mark edge cases with `// TODO:` and come back after feedback.
- Keep components under ~150 lines. Split when they grow larger.
- One logical change per commit. Never mix refactors, features, and fixes.
- Stub non-critical features rather than leaving half-baked implementations.

### Scope discipline

- A rough working thing ships faster than a polished thing that doesn't exist yet.
- If a change spans more than ~150 lines of diff, look for a natural split point.
- Propose scope reductions when a request risks ballooning the PR.

---

## TypeScript & React standards

- Strict mode everywhere. No `any` without a comment explaining why.
- `interface` for object shapes; `type` for unions/intersections.
- Named exports only from component files — no default exports.
- Functional components and hooks only. No class components.
- Lift state only when two components genuinely share it.
- Avoid `useEffect` for data transformations (use derived state or `useMemo`).

### File layout

```
src/
  components/     ← PascalCase folders, one component per folder
  hooks/          ← camelCase, "use" prefix
  lib/            ← third-party client wrappers (supabase.ts, etc.)
  pages/          ← route-level components
  utils/          ← pure helpers, no side effects
```

---

## Security

- Never commit API keys, tokens, or passwords — `.env.local` only (already in `.gitignore`).
- Reference via `import.meta.env.VITE_*` in Vite projects.
- Add required env var names as GitHub Actions secrets for CI.
- No sensitive data in console logs on production code paths.
- Prefer safe rendering over `dangerouslySetInnerHTML`.

---

## Accessibility

- All interactive elements keyboard-reachable (React Aria handles this).
- All images need `alt` text; decorative images use `alt=""`.
- WCAG AA colour contrast: 4.5 : 1 normal text, 3 : 1 large text.
- Semantic HTML first (`<button>`, `<nav>`, `<main>`) before ARIA roles.

---

## Adding a new experiment

1. `cp -r projects/template projects/my-experiment`
2. `cd projects/my-experiment && npm install`
3. Add `"@gearhead/ui": "file:../gearhead"` to `package.json`.
4. Develop with `npm run dev`.
5. Register in `docs/projects.json`.
6. Build with `npm run build` (outputs to `docs/my-experiment/`).
7. Update `CHANGELOG.md`, confirm with user, then commit.

---

## Pre-commit checklist

- [ ] `CHANGELOG.md` has a versioned entry for this work
- [ ] `docs/projects.json` updated if a new experiment was added
- [ ] New shared UI components are in Gearhead (not inline in a project)
- [ ] Every new Gearhead component has a Storybook story
- [ ] `npm run build` passes in every changed project
- [ ] No secrets or `.env` files staged
- [ ] Commit message follows Conventional Commits format
- [ ] User has approved the commit
