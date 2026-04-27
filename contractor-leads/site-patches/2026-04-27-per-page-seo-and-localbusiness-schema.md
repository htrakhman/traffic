# Site patch — Per-page SEO meta + LocalBusiness/Product schema factories

**Date:** 2026-04-27
**Author:** GTM (Monday SEO run)
**Status:** Drafted — awaiting Harold review + apply
**Targets in `seo-roadmap.md`:** P0 #4 (extends), P1 #7 (LocalBusiness on Home, Product factory)
**Risk:** Low — additive only. No behavior changes; pure `<head>` mutations + JSON-LD scripts.

## Why this matters

Audit found that `<SEO>` is only mounted on **Home, Blog, Article, Product**. The rest of the routes — **Browse, Category, Assistant, SiteMapPlanner, Quote** — render with whatever `<title>` and meta description was set last by another page (or the static `index.html` defaults if hit cold). For Google and AEO crawlers that arrive directly on those URLs, the entire `<head>` is the index.html boilerplate. Five high-intent pages are silently un-targetable today.

Two of those (Assistant, SiteMapPlanner) are the brand differentiators called out in `business-profile.md` ("competitors don't have these"). They should be ranking for "AI traffic control planner" / "MUTCD work zone layout generator" — they aren't, because they don't even tell crawlers their own name.

This patch:

1. Adds `<SEO>` to **Browse, Category, Assistant, SiteMapPlanner, Quote**.
2. Adds `localBusiness()` and `product()` factories to `JsonLd.tsx`.
3. Mounts `LocalBusiness` + `Organization` + `WebSite` schema on Home.
4. (Optional, second commit) Refactors `Product.tsx` to use the new `schema.product()` factory instead of inline JSON-LD.

Skip #4 in this patch if review time is tight — items 1–3 are the higher-leverage shipment.

---

## File-by-file

### 1) `src/components/seo/JsonLd.tsx` — add factories

Add to the exported `schema` object:

```ts
  localBusiness: (opts?: { areaServed?: string[] }) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#localbusiness`,
    name: 'Traffic Control Rental',
    alternateName: 'TrafficKit',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
    image: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
    telephone: '+1-732-675-2499',
    email: 'rent@trafficcontrolrental.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: (opts?.areaServed ?? [
      'Middlesex County, NJ',
      'Monmouth County, NJ',
      'Mercer County, NJ',
      'Somerset County, NJ',
      'Union County, NJ',
      'Hunterdon County, NJ',
      'Northern Ocean County, NJ',
    ]).map((name) => ({ '@type': 'AdministrativeArea', name })),
    knowsAbout: [
      'MUTCD traffic control',
      'Work zone setup',
      'Arrow board rental',
      'Barricade rental',
      'Traffic cone rental',
      'Temporary traffic control plans',
    ],
    sameAs: [] as string[],
  }),

  product: (p: {
    name: string
    slug: string
    description: string
    image?: string
    sku?: string
    brand?: string
    category?: string
    priceLow?: number
    priceHigh?: number
    inStock?: boolean
    aggregateRating?: { ratingValue: number; reviewCount: number }
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image
      ? [p.image.startsWith('http') ? p.image : SITE_ORIGIN + (p.image.startsWith('/') ? p.image : '/' + p.image)]
      : undefined,
    sku: p.sku,
    brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
    category: p.category,
    url: `${SITE_ORIGIN}/product/${p.slug}`,
    offers:
      p.priceLow !== undefined
        ? {
            '@type': p.priceHigh && p.priceHigh !== p.priceLow ? 'AggregateOffer' : 'Offer',
            priceCurrency: 'USD',
            price: p.priceHigh && p.priceHigh !== p.priceLow ? undefined : p.priceLow,
            lowPrice: p.priceHigh && p.priceHigh !== p.priceLow ? p.priceLow : undefined,
            highPrice: p.priceHigh && p.priceHigh !== p.priceLow ? p.priceHigh : undefined,
            availability: p.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `${SITE_ORIGIN}/product/${p.slug}`,
            seller: { '@type': 'Organization', name: 'Traffic Control Rental' },
          }
        : undefined,
    aggregateRating: p.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: p.aggregateRating.ratingValue,
          reviewCount: p.aggregateRating.reviewCount,
        }
      : undefined,
  }),
```

Notes:
- `priceRange: '$$'` is the schema.org placeholder — `$` to `$$$$`. Pick what fits our positioning; we're mid-market for rentals so `$$` is reasonable.
- `areaServed` defaults to the Central NJ counties from `business-profile.md`; pass `{ areaServed: ['New Jersey'] }` once we expand statewide.
- Empty `sameAs` is intentional — populate once we ship social handles.

### 2) `src/pages/Home.tsx` — add LocalBusiness + Organization + WebSite

Add imports + JsonLd blocks below `<SEO>`:

```diff
 import SEO from '../components/seo/SEO'
+import JsonLd, { schema } from '../components/seo/JsonLd'
 import Hero from '../components/home/Hero'
 ...
       <SEO
         title={DEFAULT_PAGE_TITLE}
         description={`Buy MUTCD-aware traffic control and safety equipment with delivery. Cones, signs, barricades, arrow boards, and more at ${SITE_DOMAIN}.`}
         canonicalPath="/"
       />
+      <JsonLd data={schema.organization()} />
+      <JsonLd data={schema.website()} />
+      <JsonLd data={schema.localBusiness()} />
       <Hero
```

### 3) `src/pages/Browse.tsx` — add `<SEO>`

```diff
 import { useState, useMemo, useEffect, useCallback } from 'react'
 import { useSearchParams } from 'react-router-dom'
 import { Search, SlidersHorizontal, X } from 'lucide-react'
+import SEO from '../components/seo/SEO'
 ...
   return (
     <main className="min-h-screen pt-20">
+      <SEO
+        title={
+          query
+            ? `${query} — Traffic Control Equipment | Traffic Control Rental`
+            : 'Browse Traffic Control Equipment Rentals | NJ Contractors'
+        }
+        description="Browse cones, barricades, arrow boards, message boards, signs, and full MUTCD-compliant work zone equipment for rent in Central NJ. Same-day quotes."
+        canonicalPath="/browse"
+      />
```

### 4) `src/pages/Category.tsx` — add `<SEO>` + breadcrumb schema

```diff
 import { useEffect, useMemo, useState } from 'react'
 import { useParams, Link } from 'react-router-dom'
 import { ArrowLeft } from 'lucide-react'
 import { useCatalogSync } from '../context/CatalogSyncContext'
 import { categories } from '../data/categories'
 import { getProductsByCategory } from '../data/products'
 import ProductCard from '../components/marketplace/ProductCard'
+import SEO from '../components/seo/SEO'
+import JsonLd, { schema } from '../components/seo/JsonLd'
 ...
   return (
     <main className="min-h-screen pt-20">
+      <SEO
+        title={`${category.name} Rental in NJ | Traffic Control Rental`}
+        description={`${category.description} Rent ${category.name.toLowerCase()} in Central NJ — Middlesex, Monmouth, Mercer, Somerset, Union, Hunterdon. Same-day quotes.`}
+        canonicalPath={`/category/${category.slug}`}
+      />
+      <JsonLd
+        data={schema.breadcrumb([
+          { name: 'Home', path: '/' },
+          { name: 'Browse', path: '/browse' },
+          { name: category.name, path: `/category/${category.slug}` },
+        ])}
+      />
```

### 5) `src/pages/Assistant.tsx` — add `<SEO>`

This page IS the AEO wedge. Lean keyword-rich.

```diff
 import { useState } from 'react'
 import { useSearchParams } from 'react-router-dom'
 import { Sparkles, AlertCircle } from 'lucide-react'
 import JobAssistant from '../components/ai/JobAssistant'
 import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../config/site'
+import SEO from '../components/seo/SEO'
 ...
   return (
     <main className="min-h-screen pt-20 bg-slate-950">
+      <SEO
+        title="AI Work Zone Planner — Pick the Right Traffic Control Gear | Traffic Control Rental"
+        description="Describe your job; get a MUTCD-aware equipment list with quantities. Free AI assistant for contractors planning a lane closure, utility cut, or short-duration work zone in NJ."
+        canonicalPath="/assistant"
+        keywords={[
+          'AI traffic control planner',
+          'work zone equipment calculator',
+          'MUTCD work zone planner',
+          'lane closure equipment list',
+          'NJ traffic control assistant',
+        ]}
+      />
```

### 6) `src/pages/SiteMapPlanner.tsx` — add `<SEO>` (only in non-embedded mode)

The component is also rendered embedded inside Home's hero — we don't want a duplicate `<head>` mutation when embedded. Gate by `!embedded`.

```diff
 export default function SiteMapPlanner({ embedded = false }: SiteMapPlannerProps) {
   const { tick } = useCatalogSync()
   const { lines: cartLines } = useCart()
   const catalog = useMemo(() => getProducts(), [tick])
   ...
   // (later, in returned JSX before the page wrapper)
+  // Only mount SEO when this is the standalone page, not the Home hero embed.
```

Add at the top of the returned JSX (only in the non-embedded branch — see existing `embedded` branching around `return (`):

```jsx
{!embedded && (
  <SEO
    title="MUTCD Site Map Planner — Free Work Zone Layout Generator | Traffic Control Rental"
    description="Drop traffic control devices on a real map and generate an MUTCD-compliant work zone layout for your NJ job. Free planner from Traffic Control Rental."
    canonicalPath="/planner"
    keywords={[
      'MUTCD work zone layout',
      'traffic control plan generator',
      'site map planner',
      'work zone layout tool',
      'NJ traffic control plan',
    ]}
  />
)}
```

Add the import at the top of the file:

```diff
 import { parseQASegments } from '../utils/chatQAParse'
 import type { MutableRefObject } from 'react'
+import SEO from '../components/seo/SEO'
```

### 7) `src/pages/Quote.tsx` — add `<SEO>`

```diff
 import { useState } from 'react'
 import { useLocation, Link } from 'react-router-dom'
 import { CheckCircle, Package, Trash2, Plus, Minus } from 'lucide-react'
+import SEO from '../components/seo/SEO'
 ...
   // somewhere in the returned JSX, top of the wrapper
+  <SEO
+    title="Get a Quote — Traffic Control Equipment Rental NJ | Traffic Control Rental"
+    description="Request a same-day quote for traffic control equipment rental in Central NJ. Cones, barricades, arrow boards, message boards, MUTCD sign packages."
+    canonicalPath="/quote"
+    noindex={false}
+  />
```

(Note: Quote completion / thank-you pages should remain `noindex` — that's already handled in `robots.txt` for `/quote/thank-you`.)

### 8) (Optional) `src/pages/Product.tsx` — refactor to use `schema.product()`

Currently has inline `@graph` JSON-LD. Refactor to:

```ts
const productSchema = schema.product({
  name: product.name,
  slug: product.slug,
  description: product.description,
  image: product.imageUrl,
  sku: product.sku,
  brand: product.brand,
  category: product.category,
  priceLow: lowestPrice,
  priceHigh: highestPrice,
  inStock: product.inStock,
})
```

Skip if review time is tight — current inline schema works; this is just consistency.

---

## How to apply

```bash
# from repo root
git checkout -b seo/per-page-meta-and-localbusiness-2026-04-27
# apply edits in JsonLd.tsx, then Home/Browse/Category/Assistant/SiteMapPlanner/Quote
npm run build  # confirm no TS / lint failures
git add src/
git commit -m "seo: per-page meta on Browse/Category/Assistant/Planner/Quote + LocalBusiness schema on Home"
```

## Verification checklist

- `npm run build` clean (no TS errors from new schema fields).
- Visit `/browse`, `/category/cones-drums`, `/assistant`, `/planner`, `/quote` and confirm:
  - `<title>` matches the page (DevTools → Elements → `<head>`)
  - `<meta name="description">` is page-specific
  - `<link rel="canonical">` resolves to the right URL
- Home page: confirm three `<script type="application/ld+json">` blocks present (Organization, WebSite, LocalBusiness). Validate at https://validator.schema.org/.
- Mobile-share test: paste `/assistant` URL into Slack/Messages — preview should show the AI-planner title, not the homepage title.
- After deploy: re-submit sitemap to GSC, check that `/assistant` and `/planner` start showing up as discovered URLs.

## What's NOT in this patch

- **Deployment to Vercel** (P0 #2) — still blocked on Harold pointing DNS away from GoDaddy parking. This patch is dead weight until that lands.
- **Prerendering / SSG** (P0 #3) — separate patch already drafted: `2026-04-23-vite-prerender-ssg.md`. Apply that one too — meta tags only help if crawlers can see them without executing JS, which they currently can't. **These two patches compound; ship the prerender patch first or alongside this one.**
- **Location pages** (`/locations/:county`) — separate work, content+routing.
- **Internal linking audit** — separate ticket.
