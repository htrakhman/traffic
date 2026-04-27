# SEO / AEO Roadmap — TrafficKit

*Last updated: 2026-04-27 (week 3 audit)*

## Current baseline

- **Site status:** Domain `trafficcontrolsupply.com` acquired BUT **still serving the GoDaddy Website Builder parking page** as of 2026-04-27 (verified via curl — `meta name="generator" content="Go Daddy Website Builder 8.0.0000"`). Deployment to Vercel/Netlify is the **single biggest blocker on the roadmap**. Until DNS flips, every patch and post we ship sits unindexed.
- **Framework:** Vite + React SPA + React Router. Client-side rendered, no SSR/SSG. Prerendering patch drafted (see `site-patches/2026-04-23-vite-prerender-ssg.md`).
- **Meta tags:** ⚠ **Partial.** `SEO.tsx` is wired into Home, Blog, Article, and Product. Audit 2026-04-27 found it is **NOT mounted** on Browse, Category, Assistant, SiteMapPlanner, or Quote — those routes inherit either `index.html` defaults or whatever the previous-visited page set. Patch drafted: `site-patches/2026-04-27-per-page-seo-and-localbusiness-schema.md`.
- **Schema.org markup:** Partial. `JsonLd.tsx` exposes Organization, WebSite, BreadcrumbList, Article, FAQPage factories. Article pages use them. Missing: `LocalBusiness` on Home, `Product` factory (Product.tsx has inline `@graph` logic). Both addressed in the 2026-04-27 patch above. robots.txt is excellent — explicitly allows GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot.
- **Sitemap:** ✅ `public/sitemap.xml` exists (2.7MB — likely includes all product pages). `robots.txt` correctly points crawlers to it. (P1 #8 DONE.)
- **Blog / guides route:** ✅ `/blog` and `/blog/:slug` routes live (Blog.tsx, Article.tsx). **11 articles** in `src/data/articles/` (count corrected — was previously listed as 6). Articles: arrow boards, AFAD, barricade rental, cone rental, traffic-control devices, equipment rental, MUTCD, portable devices, rental guide, trailer rental, and the new "How Many Cones for a Lane Closure" (commit 6417ea1, 2026-04-25). (P1 #10 and P1 #12 DONE — /guides redirects to /blog via vercel.json.)
- **Content:** Post 1 (cone count for lane closures) **published in codebase** (article entry exists, registered in `articles.ts`). Post 2 (Type I/II/III barricades) outline drafted 2026-04-27 — `contractor-leads/content/002-type-i-vs-type-ii-vs-type-iii-barricades-outline.md`. Next Monday: write the full draft.
- **Google Search Console:** Not set up. No rank data available. **Cannot start until site is actually deployed** — submitting a sitemap for a site that returns the GoDaddy parking page would just teach Google that this domain is parked.
- **Google Analytics:** Not set up (assumed).
- **Backlinks:** None confirmed (new site).

## Prioritized backlog

### P0 — Blockers (do these first, nothing else rings the cash register)

| # | Item | Effort | Status |
|---|------|--------|--------|
| 1 | **Register a domain.** Acquired: `trafficcontrolsupply.com` — point DNS at Netlify/Vercel and enable HTTPS. | 10 min | Done |
| 2 | **Deploy to Vercel or Netlify** (configs already exist — `vercel.json` and `netlify.toml`). Point domain at it. | 30 min | TODO |
| 3 | **Add prerendering or SSG.** Option A (fast): `vite-plugin-ssr` / `vite-plugin-prerender`. Option B (nicer long-term): migrate to Next.js. Recommend A for now. | 2–4 hrs | TODO |
| 4 | **Per-page meta tags** via `react-helmet-async`. Unique title + description for Home, Browse, each Category, each Product, Quote, Assistant, Planner. | 3–5 hrs | **Partial** — `SEO.tsx` wired into Home, Blog, Article, Product. Audit 2026-04-27 found Browse, Category, Assistant, SiteMapPlanner, Quote are NOT using it. Patch drafted (`site-patches/2026-04-27-per-page-seo-and-localbusiness-schema.md`) to fix. |
| 5 | ~~Set up Google Business Profile~~ **DEFERRED** per Harold 2026-04-18 — testing demand first; revisit once we have ≥3 paying customers or 1 month of organic traffic. | 45 min | Deferred |
| 6 | **Set up Google Search Console + Analytics.** Submit sitemap. | 30 min | TODO |

### P1 — Foundation (do these in weeks 1–3)

| # | Item | Effort | Status |
|---|------|--------|--------|
| 7 | **Schema.org markup.** Product schema on product pages, LocalBusiness on Home, FAQPage on FAQ (to be created), Organization sitewide. Massive AEO signal. | 4–6 hrs | **Partial** — Article + BreadcrumbList + FAQPage done via JsonLd.tsx. Product page has inline `@graph` JSON-LD. Missing: `LocalBusiness` factory, Home mount, `Product` factory in `JsonLd.tsx`. Patch drafted 2026-04-27 — adds `localBusiness()` + `product()` factories and mounts Org/WebSite/LocalBusiness on Home. |
| 8 | **Generate a sitemap.xml** (static, at build time). Update `robots.txt`. | 30 min | **Done** — `public/sitemap.xml` exists (2.7MB). `robots.txt` configured correctly with AEO crawlers. |
| 9 | **OpenGraph + Twitter cards** per page. Helps with social sharing and how AI assistants render links. | 1 hr | **Done** — SEO.tsx handles og: and twitter: tags per page. |
| 10 | **Launch a `/blog` route** with MDX support. Need at least 1 post per week to signal freshness. | 3 hrs | **Done** — `/blog` and `/blog/:slug` routes live. 6 articles published. |
| 11 | **Launch a `/locations/:county` route set.** One page per Central NJ county with local copy + Google Business Profile embed. Local SEO gold. | 1 day | TODO |
| 12 | **Launch a `/guides/:slug` route set** for evergreen how-to content. See `content-calendar.md`. | Ongoing | **Done** — `/guides/:slug` redirects to `/blog/:slug` via vercel.json. |

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
- **2026-04-18** — Domain acquired: `trafficcontrolsupply.com`. Deploying to Vercel. GBP deferred pending demand validation.
- **2026-04-18** — Added new P0: **ship Vercel serverless proxy for Anthropic API** (`/api/chat`). Current `aiClient.ts` leaks the key in the browser bundle. Patch drafted in `site-patches/2026-04-18-anthropic-serverless-proxy.md`. Until patch ships, cap Anthropic key at $10–20/mo.
- **2026-04-23** — Week 2 audit. Discovered several items already complete (P0 #4, P1 #8, #9, #10, #12). Updated roadmap statuses accordingly.
- **2026-04-23** — **Content:** Post 1 ("How Many Traffic Cones Do You Actually Need for a Lane Closure?") fully drafted — `contractor-leads/content/001-how-many-cones-for-lane-closure.md`. Calendar updated to `drafted`. Harold needs to create `src/data/articles/how-many-cones-for-lane-closure-nj.ts` and register it in `articles.ts` to publish.
- **2026-04-23** — **Patch drafted:** `site-patches/2026-04-23-vite-prerender-ssg.md` — adds `vite-plugin-ssg` to solve P0 #3 (CSR → prerendered HTML). Biggest remaining SEO code unlock. Harold to review and apply.
- **2026-04-23** — **Competitor scan:** Roadsafe Traffic Systems profiled. Key finding: zero informational content on their site — the entire "how many cones / taper length / barricade types" keyword space is wide open. This validates the content-first AEO strategy.
- **2026-04-23** — GSC still not set up. No rank data. P0 #6 remains TODO — Harold action needed after deployment.
- **2026-04-27** — **Week 3 audit (Monday SEO run).**
  - **Deployment status:** still on GoDaddy parking page (`curl -sI https://trafficcontrolsupply.com` returns Go Daddy Website Builder generator). P0 #2 remains the single biggest blocker — every shipped patch is dead weight until DNS flips.
  - **Site audit finding:** `<SEO>` component is missing from 5 routes — Browse, Category, Assistant, SiteMapPlanner, Quote. P0 #4 status corrected from "Done" → "Partial". This explains why those routes have no per-page targeting; Assistant + Planner are our differentiators per `business-profile.md` and they're shipping with the homepage's title.
  - **Patch drafted:** `site-patches/2026-04-27-per-page-seo-and-localbusiness-schema.md` — adds (a) `<SEO>` to the 5 missing routes, (b) `localBusiness()` and `product()` factories in `JsonLd.tsx`, (c) Organization + WebSite + LocalBusiness JSON-LD on Home. Closes P0 #4 gap and most of P1 #7.
  - **Article count corrected:** roadmap previously said "6 articles"; actual count is 11 (Post 1 / cone-count guide was published 2026-04-25, commit 6417ea1; trailer rental and several others also live).
  - **Content shipped:** Post 2 outline created — `contractor-leads/content/002-type-i-vs-type-ii-vs-type-iii-barricades-outline.md`. Calendar updated `queued` → `outlined`. Next Monday: write the full 1500–2500 word draft.
  - **Competitor scan:** Traffic Plan profiled (Farmingdale, NJ — direct geographic competitor, ~500 employees, WBENC women-owned, full flagging crews + rental + ATSSA training). Their blog content is brand/lifestyle, not technical SEO — same content gap as Roadsafe. Wedge thesis intact.
  - **GSC:** Still not set up. Skipped per task — cannot collect rank data while site is parked. After deployment, P0 #6 (GSC + Analytics + sitemap submission) becomes immediately actionable.
  - **New backlog item:** Post-deploy, run a Lighthouse audit and confirm Web Vitals (P2 #16) on the live SPA — current SPA is heavy (planner pulls Google Maps; product catalog is 1243-line products.ts). May surface new P1s.
