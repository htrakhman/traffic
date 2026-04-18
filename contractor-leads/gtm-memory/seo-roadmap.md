# SEO / AEO Roadmap — TrafficKit

*Last updated: 2026-04-18 (first audit)*

## Current baseline

- **Site status:** localhost-only. **Not crawlable. Cannot rank.**
  **Blocks everything else.**
- **Framework:** Vite + React SPA + React Router. Client-side rendered,
  no SSR/SSG, no prerendering. Means even once deployed, search engines
  see an empty `<div id="root">` until JS runs. Google handles this
  *okay* but not great; AEO crawlers (Perplexity, OpenAI, Anthropic)
  handle it much worse.
- **Meta tags:** a single `<title>` and `<meta description>` in
  `index.html`. Every page (Home, Browse, Category, Product, etc.)
  shares the same meta. **Bad for ranking individual pages.**
- **Schema.org markup:** none observed. **Missing a huge AEO signal.**
- **Content:** product/category pages exist, no blog or guide content.
  Informational keywords are 100% uncovered.
- **Google Business Profile:** not set up (assumed).
- **Google Search Console:** not set up (assumed).
- **Google Analytics:** not set up (assumed).
- **Backlinks:** none (new site).

## Prioritized backlog

### P0 — Blockers (do these first, nothing else rings the cash register)

| # | Item | Effort | Status |
|---|------|--------|--------|
| 1 | **Register a domain.** Suggest: `trafficKitNJ.com`, `trafficKit.io`, `rentTrafficKit.com`. Pick one. | 10 min | TODO |
| 2 | **Deploy to Vercel or Netlify** (configs already exist — `vercel.json` and `netlify.toml`). Point domain at it. | 30 min | TODO |
| 3 | **Add prerendering or SSG.** Option A (fast): `vite-plugin-ssr` / `vite-plugin-prerender`. Option B (nicer long-term): migrate to Next.js. Recommend A for now. | 2–4 hrs | TODO |
| 4 | **Per-page meta tags** via `react-helmet-async`. Unique title + description for Home, Browse, each Category, each Product, Quote, Assistant, Planner. | 3–5 hrs | TODO |
| 5 | **Set up Google Business Profile** for TrafficKit. Address, service areas (Central NJ counties), category "Equipment rental agency," photos, hours, phone. | 45 min | TODO |
| 6 | **Set up Google Search Console + Analytics.** Submit sitemap. | 30 min | TODO |

### P1 — Foundation (do these in weeks 1–3)

| # | Item | Effort | Status |
|---|------|--------|--------|
| 7 | **Schema.org markup.** Product schema on product pages, LocalBusiness on Home, FAQPage on FAQ (to be created), Organization sitewide. Massive AEO signal. | 4–6 hrs | TODO |
| 8 | **Generate a sitemap.xml** (static, at build time). Update `robots.txt`. | 30 min | TODO |
| 9 | **OpenGraph + Twitter cards** per page. Helps with social sharing and how AI assistants render links. | 1 hr | TODO |
| 10 | **Launch a `/blog` route** with MDX support. Need at least 1 post per week to signal freshness. | 3 hrs | TODO |
| 11 | **Launch a `/locations/:county` route set.** One page per Central NJ county with local copy + Google Business Profile embed. Local SEO gold. | 1 day | TODO |
| 12 | **Launch a `/guides/:slug` route set** for evergreen how-to content. See `content-calendar.md`. | Ongoing | TODO |

### P2 — Optimization (ongoing)

| # | Item | Effort | Status |
|---|------|--------|--------|
| 13 | Product page SEO: each page needs 300+ words of unique copy, internal links to category + related products, schema | 6–10 hrs | TODO |
| 14 | Internal linking audit. Every blog links to ≥2 product/category pages; every product links to ≥1 relevant guide. | 2 hrs | TODO |
| 15 | Image optimization: WebP, alt text on every image, lazy-load below fold. | 2 hrs | TODO |
| 16 | Core Web Vitals audit (Lighthouse). Target 90+ across all metrics. | 2–4 hrs | TODO |
| 17 | Local citation building (Yelp, Angie's, Thomasnet, BlueBook, industry directories). | 1 day | TODO |
| 18 | Outreach for backlinks: guest posts on construction blogs, be a source for NJ.com / DOT articles. | Ongoing | TODO |

## Keyword targets — first 30 to rank for

Group A — **local transactional** (hot, ranks faster):
1. traffic control equipment rental NJ
2. arrow board rental NJ
3. cone rental New Jersey
4. work zone equipment rental Central NJ
5. MUTCD sign rental NJ
6. barricade rental NJ
7. traffic control rental [Middlesex / Monmouth / Mercer / Somerset / Union / Hunterdon] County
8. message board rental NJ
9. crash cushion rental NJ
10. TTC equipment rental NJ

Group B — **informational** (AEO wedge, slower but compounding):
11. how much does it cost to rent traffic cones
12. MUTCD requirements for road construction
13. how many arrow boards do I need for a lane closure
14. temporary traffic control plan for excavation
15. Type III barricade vs Type II
16. what is a work zone buffer
17. work zone sign spacing chart
18. taper length formula MUTCD
19. NJDOT traffic control standards
20. how to set up a short-duration work zone

Group C — **commercial intent**:
21. traffic control rental near me
22. cheap traffic cone rental
23. arrow board for rent same day
24. emergency traffic control equipment NJ
25. weekend traffic control rental

Group D — **long-tail AEO** (pure AI-answer-engine wedge):
26. what's the difference between a Type I and Type III barricade
27. how do I calculate taper length for a lane closure in NJ
28. what signs do I need for a 1-day utility job
29. is a message board required for nighttime work
30. what's the minimum traffic control for a sidewalk excavation

## Weekly rituals

(Set up via scheduled tasks — see `scheduled-tasks.md` in the root folder.)

- **Monday 9am:** full SEO audit run + content idea generation + rank tracking
- **Friday 4pm (bi-weekly):** outreach + SEO performance review

## Changelog

- **2026-04-18** — Initial audit. Site is localhost-only. P0 blockers identified. No keywords ranked yet (site not indexable).
