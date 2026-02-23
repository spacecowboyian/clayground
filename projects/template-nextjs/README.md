# template-nextjs

A minimal Next.js starter configured for **static export** and **GitHub Pages** hosting.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & deploy

```bash
npm run build        # static export → ../../docs/template-nextjs/
```

Or push to `main` — the GitHub Actions workflow will build and deploy automatically.

## Using Supabase

```bash
npm install @supabase/supabase-js
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then use it in any page/component:

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

> Add the env vars as **Repository Secrets** in GitHub so CI builds can access them.
