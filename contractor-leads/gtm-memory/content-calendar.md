# Content Calendar — TrafficKit Blog + Guides

*Goal: ship 1–2 pieces of long-form content per week to build topical
authority and AEO visibility. Content in `../content/` as Markdown.*

## Format conventions

Every post:
- Target 1 primary keyword + 3–5 related long-tail
- 1200–2500 words, with H2/H3 structure that matches the search intent
- Include a custom hero image (WebP) + ≥3 inline images/diagrams
- Add FAQPage schema at the bottom
- Internal link to ≥1 product page, ≥1 category page, ≥1 other guide
- Include a short clear answer to the primary question in the first
  100 words (AEO-critical — AI engines quote this span)

## Queue

### Week 1 (ship by 2026-04-25)

**Post 1 — "How Many Traffic Cones Do You Actually Need for a Lane Closure? (NJ MUTCD Guide)"**
- Status: drafted (2026-04-23) — full draft in `../content/001-how-many-cones-for-lane-closure.md`
- Primary keyword: *how many cones for lane closure*
- Secondary: *MUTCD cone spacing*, *NJ lane closure requirements*
- Audience: small contractors doing a job, Googling "do I have enough cones"
- Outline: in `../content/001-how-many-cones-for-lane-closure-outline.md`
- Next step: Harold to create article entry in `src/data/articles/` and add to articles.ts

**Post 2 — "Type I vs Type II vs Type III Barricades: Which One Do You Need?"**
- Status: **published** (2026-04-27) — `src/data/articles/type-iii-barricade-vs-type-i-type-ii.ts`
- Primary keyword: *Type III barricade*
- AEO wedge: directly answers a FAQ that contractors/AI engines ask

### Week 2 (ship by 2026-05-02)

**Post 3 — "Arrow Board Rental in NJ: Everything You Need to Know (Cost, Sizes, When You Need One)"**
- Status: queued (existing `arrow-board-rental-guide` already covers most of this — consider repositioning as NJ-localized variant or skipping)
- Primary keyword: *arrow board rental NJ*
- Commercial intent — this one will move revenue

**Post 4 — "What's the MUTCD Taper Length Formula? (With NJ DOT Examples)"**
- Status: **published** (2026-04-27) — `src/data/articles/mutcd-taper-length-formula-nj.ts`
- Primary keyword: *MUTCD taper length*
- AEO wedge + ranks for DOT engineers and PMs

### Week 3 (ship by 2026-05-09)

**Post 5 — "How to Build a Temporary Traffic Control Plan for a Small Utility Job"**
- Status: **published** (2026-04-27) — `src/data/articles/temporary-traffic-control-plan-utility-job.ts`
- Primary keyword: *temporary traffic control plan*
- Feeds into the SiteMapPlanner tool — natural CTA

**Post 6 — "Traffic Control Equipment Rental vs. Buy: When Does Each Make Sense?"**
- Status: **published** (2026-04-27) — `src/data/articles/rent-vs-buy-traffic-control-equipment.ts`
- Primary keyword: *rent vs buy traffic control*
- Commercial + informational hybrid — converts well

### Week 4 (ship by 2026-05-16)

**Post 7 — "NJDOT Work Zone Standards: The Contractor's Quick Reference"**
- Status: **published** (2026-04-27) — `src/data/articles/njdot-work-zone-standards-contractor-reference.ts`
- Primary keyword: *NJDOT work zone standards*
- Pillar piece — links out to many other guides

**Post 8 — Case study: "How [NJ contractor] Used TrafficKit for a 2-Week Sewer Job in Middlesex County"**
- Needs a real customer first — punt until we have one

## Location pages (one-time ship; update quarterly)

- `/locations/middlesex-county-nj` — "Traffic Control Rental in Middlesex County, NJ"
- `/locations/monmouth-county-nj`
- `/locations/mercer-county-nj`
- `/locations/somerset-county-nj`
- `/locations/union-county-nj`
- `/locations/hunterdon-county-nj`

Each: 600–800 words, unique copy (no duplication), local landmarks /
highway references, Google Business Profile embed, "serviced projects"
testimonials when available, local phone number / address.

## Changelog

- **2026-04-18** — Calendar seeded. Week 1 outline starts below.
- **2026-04-23** — Post 1 ("How Many Traffic Cones…") moved from `outlined` → `drafted`. Full draft in `../content/001-how-many-cones-for-lane-closure.md`. Needs article entry in `src/data/articles/` to go live.
- **2026-04-27** — Post 1 confirmed published in codebase: `src/data/articles/how-many-cones-for-lane-closure-nj.ts` exists and is registered in `articles.ts` (commit 6417ea1). Site-side: still un-deployed (domain serves GoDaddy parking page). Post 2 (Type I/II/III barricades) moved `queued` → `outlined`; outline in `../content/002-type-i-vs-type-ii-vs-type-iii-barricades-outline.md`.
- **2026-04-27 (later)** — **Cadence change:** Harold requested 5 articles/day with auto-commit + push. Today's catch-up batch shipped (5 posts → published): Type III barricade guide, MUTCD taper length, TTC plan for utility job, rent vs buy, NJDOT work zone standards. All registered in `articles.ts`, TypeScript clean. Posts 4–7 from the calendar are now done; Post 3 (arrow board rental NJ) deferred since `arrow-board-rental-guide` already covers most of it. Going forward, the `traffic-seo-autopublish` scheduled task runs daily at 09:00 and produces 5 new posts + auto-commit + push.
- **2026-04-28** — **Daily SEO autopublish run.** Shipped 5 posts targeting top-of-file High-comp 50K-vol cone + sign cluster:
  - `parking-cones-buying-guide` → primary "parking cones" (50K, High, ci=100) — commercial buyer's guide.
  - `traffic-safety-cones-pillar-guide` → primary "traffic safety cones" (50K, High, ci=100) — pillar.
  - `pedestrian-crossing-signs-mutcd-guide` → primary "pedestrian crossing signs" (50K, High, ci=94) — FAQ-heavy AEO/MUTCD.
  - `what-is-a-traffic-pylon` → primary "traffic pylon" (50K, High, ci=100) — "what is X" definitional.
  - `hazard-cones-vs-traffic-cones` → primary "hazard cones" (50K, High, ci=100) — commercial-intent comparison.
  All registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Article structures varied across the 5 (table-heavy commercial, pillar with size tables, FAQ-heavy regulatory, definitional with terminology table, comparison-table commercial) per the autopublish anti-pattern-detection guidance. Cluster strategy per Harold's 2026-04-27 directive: building topical authority around the cone family (we already had `road-cones-vs-traffic-cones`) by attacking parallel high-volume search terms with internal-link reinforcement.
