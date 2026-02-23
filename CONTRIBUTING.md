# Contributing to Clayground

## Conventional Commits

All commits in this repo follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Format

```
<type>(<scope>): <short description>

[optional body — wrap at 72 chars]

[optional footer — BREAKING CHANGE: ..., Closes #123]
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | A new experiment, component, page, or capability |
| `fix` | A bug fix |
| `docs` | README, CHANGELOG, comments — no code change |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure with no behaviour change |
| `test` | Adding or updating tests |
| `build` | Changes to build config (vite, tsconfig, postcss) |
| `ci` | GitHub Actions workflow changes |
| `chore` | Dependency bumps, deleting unused files, tooling |
| `revert` | Reverting a previous commit |

### Scopes

Use the project or layer being changed:

| Scope | Covers |
|-------|--------|
| `gearhead` | `projects/gearhead/**` — design system / Storybook |
| `template` | `projects/template/**` — Vite starter |
| `<project-name>` | Any specific experiment under `projects/` |
| `docs` | `docs/index.html`, `docs/projects.json` |
| `ci` | `.github/workflows/**` |
| *(omit scope)* | Repo-wide / cross-cutting changes |

### Examples

```
feat(gearhead): add DatePicker component with story

fix(template): correct vite base path for gh-pages

docs: update projects/README with Gearhead usage guide

ci: add concurrency group to storybook workflow

chore(gearhead): bump storybook to 8.6.17

feat(my-experiment): add AI chat interface using GPT-4o
```

---

## CHANGELOG

`CHANGELOG.md` lives at the repo root and is updated **manually before every commit**.

### Rules

1. Add your entry under `## [Unreleased]` while you work.
2. Before committing, move all `[Unreleased]` entries into a new versioned section:
   ```
   ## [X.Y.Z] – YYYY-MM-DD
   ```
3. Version bumping follows [Semantic Versioning](https://semver.org/):
   - `PATCH` (0.0.x) — `fix`, `docs`, `chore`, `ci`, `style`, `refactor`
   - `MINOR` (0.x.0) — `feat` (new experiment, component, or capability)
   - `MAJOR` (x.0.0) — breaking changes (rare in a playground repo)
4. Group entries under the same `type(scope)` headings used in the commit.

### Template for a new entry

```markdown
## [0.X.0] – YYYY-MM-DD

### feat(<scope>)
- Description of what was added

### fix(<scope>)
- Description of what was fixed

### docs
- Description of documentation changes

### chore
- Description of housekeeping
```

---

## Commit checklist

Before pushing to `main`:

- [ ] `CHANGELOG.md` updated with a versioned entry
- [ ] Entry in `docs/projects.json` if a new experiment was added
- [ ] Any new shared components added to Gearhead (not inline in a project)
- [ ] `npm run build` passes locally in any changed project

---

## Per-branch preview deployments

Every push to a non-`main` branch automatically builds a preview and deploys it
to the `gh-pages` branch under `preview/<branch-slug>/`.

### One-time repository setup

These steps need to be done **once** by a repo admin after the first preview
workflow run (or after switching from the GitHub Actions Pages source):

1. Go to **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to
   **Deploy from a branch**.
3. Set **Branch** to `gh-pages` and folder to `/ (root)`.
4. Click **Save**.

> **Note:** switching to the `gh-pages` branch source means the
> `actions/deploy-pages` action is no longer used. The `deploy.yml` and
> `storybook.yml` workflows now push directly to `gh-pages` via
> `peaceiris/actions-gh-pages`.

### How it works

| Event | Workflow | Result |
|---|---|---|
| Push to any non-`main` branch | `preview.yml` | Builds projects with the correct preview base URL, pushes to `gh-pages/preview/<slug>/`, and comments the URL on any open PR |
| Push to `main` | `deploy.yml` | Full production deployment to the root of `gh-pages` (previews are preserved) |
| Branch deleted | `cleanup.yml` | Removes the `gh-pages/preview/<slug>/` folder |

### Preview URLs

```
https://<owner>.github.io/clayground/preview/<branch-slug>/
```

For example, a branch named `copilot/fix-youtube` produces:

```
https://spacecowboyian.github.io/clayground/preview/copilot-fix-youtube/
```

The preview includes all built projects at their correct sub-paths, e.g.:

```
…/preview/copilot-fix-youtube/somethings-happening/
```

### Cleanup

When a branch is **deleted** (which happens automatically when a PR is merged
with the default "delete branch" setting), `cleanup.yml` removes the preview
folder from `gh-pages`. No manual action is needed.

