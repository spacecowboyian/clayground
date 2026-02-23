# Gearhead

The **clayground design system** — a shared React component library used by all projects in this repo.

Built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility and [Tailwind CSS v4](https://tailwindcss.com/) for styling. Documented with [Storybook 8](https://storybook.js.org/).

🔗 **Live Storybook:** `https://spacecowboyian.github.io/clayground/gearhead/`

---

## Quick start

```bash
cd projects/gearhead
npm install
npm run dev        # Storybook on http://localhost:6006
```

---

## Folder structure

```
projects/gearhead/
├── src/
│   ├── index.ts             ← Barrel export — import components from here
│   ├── components/          ← One folder per component
│   │   ├── Button/Button.tsx
│   │   ├── TextField/TextField.tsx
│   │   ├── Select/Select.tsx
│   │   └── ... (21 components total)
│   ├── stories/             ← Storybook story file for every component
│   ├── styles/
│   │   ├── index.css        ← Import this in your app entry point
│   │   ├── theme.css        ← CSS custom property tokens
│   │   ├── tailwind.css     ← Tailwind v4 + tw-animate-css
│   │   └── fonts.css        ← Font face declarations
│   └── utils/
│       └── cn.ts            ← clsx + tailwind-merge helper
├── .storybook/
│   ├── main.ts              ← Storybook + Vite config
│   └── preview.ts           ← Global decorators & dark background default
├── package.json             ← name: @gearhead/ui
├── tsconfig.json
└── vite.config.ts
```

---

## Using Gearhead in another project in this repo

Add to the consuming project's `package.json`:

```json
"dependencies": {
  "@gearhead/ui": "file:../gearhead"
}
```

Then `npm install` and import:

```tsx
import { Button, TextField, Select } from '@gearhead/ui';
import '@gearhead/ui/styles';  // or: import '../gearhead/src/styles/index.css'
```

**Next.js projects** also need `transpilePackages` in `next.config.js`:

```js
const nextConfig = {
  transpilePackages: ['@gearhead/ui'],
  // ...
};
```

---

## Adding a new component

1. Create `src/components/<ComponentName>/<ComponentName>.tsx`
2. Wrap the relevant `react-aria-components` primitive using Tailwind classes and CSS tokens from `src/styles/theme.css`
3. Export it from `src/index.ts`
4. Create `src/stories/<ComponentName>.stories.tsx`
5. Run Storybook and verify it renders correctly

### Component template

```tsx
import { SomePrimitive, type SomePrimitiveProps } from 'react-aria-components';
import { cn } from '../../utils/cn';

interface MyComponentProps extends SomePrimitiveProps {
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

export function MyComponent({ color = 'blue', className, ...props }: MyComponentProps) {
  return (
    <SomePrimitive
      className={cn('base-classes', colorMap[color], className)}
      {...props}
    />
  );
}
```

---

## Design tokens

All values come from CSS custom properties in `src/styles/theme.css`.

| Token family       | Examples                                                    |
|--------------------|-------------------------------------------------------------|
| Background/Surface | `--background`, `--card`, `--popover`                      |
| Text               | `--foreground`, `--muted-foreground`                       |
| Borders            | `--border`, `--ring`                                       |
| Accent colors      | `--accent-orange`, `--accent-blue`, `--accent-green`, `--accent-purple`, `--accent-red` |
| Interactive light  | `--accent-*-light` (hover backgrounds)                     |
| Interactive hover  | `--accent-*-hover` (darker fills)                          |

---

## Design principles

- **React Aria first.** Never hand-roll keyboard nav, focus management, or ARIA attributes.
- **Tokens over values.** No hardcoded hex codes — use `var(--token-name)`.
- **`className` passthrough.** Every component accepts `className` for consumer overrides.
- **Dark-first.** The base palette is `#222222` dark. All components work on dark backgrounds.
- **Orange is primary.** `--accent-orange` is the default brand action color.
- **Story before shipping.** A component without a story doesn't exist yet.

---

## CI / GitHub Actions

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `deploy.yml` | Any push to `main` | Builds ALL projects (including Gearhead) and deploys to GitHub Pages |
| `storybook.yml` | Push to `projects/gearhead/**` or manual | Builds ONLY Gearhead and deploys Storybook to GitHub Pages faster |

Both workflows share the `pages` concurrency group — `cancel-in-progress: true` means only the fastest winner deploys. On gearhead-only changes, `storybook.yml` typically wins.
