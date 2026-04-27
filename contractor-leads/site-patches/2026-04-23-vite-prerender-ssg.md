# Site Patch: Vite Prerendering (P0 #3)

**Date:** 2026-04-23  
**Priority:** P0  
**Estimated effort:** 2–3 hours to apply and test  
**Why this matters:** The site is a client-side React SPA. Until prerendering ships, every page Google and every AEO crawler (Perplexity, ChatGPT, ClaudeBot) fetches returns an empty `<div id="root">`. Google can execute JS and eventually index the content, but it's slow and unreliable. AEO crawlers often don't run JS at all — so the site is effectively invisible to them despite the great content we're building. This is the single biggest SEO unlock after deployment.

**Approach chosen:** `vite-plugin-ssg` with `critters` for CSS inlining. This is faster to adopt than migrating to Next.js and keeps the existing Vite + React Router setup intact. All routes get a pre-rendered HTML snapshot at build time; React hydrates in the browser as normal. Zero change to routing logic.

**Do NOT apply to:** `/cart`, `/quote/thank-you`, `/account` — these are private/transient pages that should stay dynamic (and are already in `robots.txt` Disallow).

---

## Step 1 — Install packages

```bash
npm install -D vite-plugin-ssg critters
```

`vite-plugin-ssg` handles the multi-route static build. `critters` inlines critical CSS so pages aren't blank while the stylesheet loads (improves FCP / Core Web Vitals).

---

## Step 2 — Update `vite.config.ts`

Current file likely has something like:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Replace with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // Inline critical CSS on every prerendered page
    crittersOptions: {},
    // Pages where SSG should bail out and leave dynamic
    // (cart, auth, checkout are CSR-only)
    excludeRoutes: ['/cart', '/account', '/quote/thank-you'],
  },
})
```

Note: `ssgOptions` is read by `vite-plugin-ssg`'s build hook, not by Vite core — Vite ignores unknown top-level keys safely.

---

## Step 3 — Update `src/main.tsx`

Current `src/main.tsx` likely looks like:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Replace `ReactDOM.createRoot` with `vite-plugin-ssg`'s `ViteSSG`:

```tsx
import { ViteSSG } from 'vite-plugin-ssg'
import App from './App'
import './index.css'

// ViteSSG wraps your app and handles both SSG (at build) and hydration (in browser).
// The routes array tells it which URLs to prerender.
export const createApp = ViteSSG(
  App,
  {
    // Pass your existing React Router routes here.
    // If App already uses <BrowserRouter> internally, switch it to use
    // the router provided by ViteSSG (see Step 4).
    base: import.meta.env.BASE_URL,
  },
)
```

---

## Step 4 — Ensure React Router uses the SSG-provided router

Open `src/App.tsx` (or wherever `<BrowserRouter>` / `<RouterProvider>` lives). `vite-plugin-ssg` provides its own router context during SSG build. You need to remove the top-level `<BrowserRouter>` wrapper and let ViteSSG inject it.

**Before:**

```tsx
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      {/* routes */}
    </BrowserRouter>
  )
}
```

**After:**

```tsx
// No BrowserRouter wrapper — ViteSSG provides it.
export default function App() {
  return (
    <>
      {/* routes — same as before, just no BrowserRouter */}
    </>
  )
}
```

Then pass your routes to `ViteSSG` in `main.tsx`:

```tsx
import { ViteSSG } from 'vite-plugin-ssg'
import { routes } from './router' // extract routes array from App if not already
import App from './App'
import './index.css'

export const createApp = ViteSSG(App, { routes })
```

If your routes are defined inline in App.tsx today, extract them to `src/router.ts` first:

```ts
// src/router.ts
import type { RouteRecord } from 'vue-router' // ignore — use react-router type
import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/browse', element: <Browse /> },
  { path: '/category/:slug', element: <Category /> },
  { path: '/product/:slug', element: <Product /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <Article /> },
  { path: '/assistant', element: <Assistant /> },
  { path: '/planner', element: <SiteMapPlanner /> },
  { path: '/quote', element: <Quote /> },
  // Excluded from prerender (keep dynamic):
  { path: '/cart', element: <Cart /> },
  { path: '/account', element: <Account /> },
]
```

---

## Step 5 — Tell the SSG build which dynamic URLs to prerender

Product and category pages have dynamic slugs (e.g., `/product/28-in-traffic-cone-7lb`). You need to give ViteSSG the full URL list so it can crawl and render each one.

In `main.tsx`, add an `includedRoutes` callback:

```tsx
import { ViteSSG } from 'vite-plugin-ssg'
import { routes } from './router'
import { getAllProducts } from './data/products'
import { getAllCategories } from './data/categories'
import { getAllArticles } from './data/articles'
import App from './App'
import './index.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router, app, head }) => {
    // Optional: global setup (head tags, plugins, etc.)
  },
  {
    includedRoutes(paths) {
      const productPaths = getAllProducts().map((p) => `/product/${p.slug}`)
      const categoryPaths = getAllCategories().map((c) => `/category/${c.slug}`)
      const articlePaths = getAllArticles().map((a) => `/blog/${a.slug}`)
      return [
        ...paths.filter((p) => !p.includes(':') && !p.includes('*')),
        ...productPaths,
        ...categoryPaths,
        ...articlePaths,
      ]
    },
  },
)
```

---

## Step 6 — Update `package.json` build script

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "preview": "vite preview"
  }
}
```

The `vite-ssg build` command replaces `vite build`. It outputs a `dist/` folder with one `.html` file per route, each with full pre-rendered HTML.

---

## Step 7 — Verify the output

After running `npm run build`, check that `dist/` contains:

```
dist/
  index.html          ← Home page, full HTML
  browse/
    index.html        ← Browse page
  category/
    cones-drums/
      index.html      ← Category page pre-rendered
  product/
    28-in-traffic-cone-7lb/
      index.html      ← Product page pre-rendered
  blog/
    index.html
    how-many-cones-for-lane-closure-nj/
      index.html      ← Article pre-rendered
  ...
```

Open any `.html` file in a text editor and confirm the `<head>` contains the per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OG tags (not the generic ones from `index.html`). If they're there, the SEO component is working correctly at build time.

---

## Vercel-specific note

`vercel.json` currently has a catch-all rewrite:
```json
{ "source": "/(.*)", "destination": "/index.html" }
```

This is the SPA fallback. Once prerendering is active, Vercel will serve the pre-rendered `.html` file for each route first — the rewrite only fires for paths that don't match a static file. So **you don't need to change `vercel.json`**. It works correctly with prerendered output.

---

## Potential issues to watch

- **`window` / `document` references during SSG build:** Vite SSG runs in Node.js at build time. Any code that touches `window`, `document`, or `localStorage` at the module level (not inside `useEffect`) will throw. Fix by guarding: `if (typeof window !== 'undefined') { ... }`. The existing `SEO.tsx` component already has this guard.
- **`useEffect` for data fetching:** All data on product/category pages should come from the static data files (`products.ts`, `categories.ts`), not from runtime API calls. This is already the case for the product catalog. The `/api/chat` and assistant routes are excluded from prerendering.
- **Hero images:** Make sure image URLs are absolute or root-relative — SSG builds can resolve these differently than the dev server.

---

## After applying

1. Run `npm run build` locally and inspect `dist/`.
2. Deploy to Vercel (`vercel --prod` or push to main).
3. Use `curl https://trafficcontrolsupply.com/product/28-in-traffic-cone-7lb` and confirm the response body contains `<title>` and `<meta name="description">` in the raw HTML (not just in the browser's rendered DOM).
4. Submit `https://trafficcontrolsupply.com/sitemap.xml` to Google Search Console (P0 #6).
