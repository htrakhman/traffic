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
- **2026-04-29** — **Daily SEO autopublish run.** Shipped 5 posts continuing the top-of-file High-comp 50K-vol cone + ped-signal cluster:
  - `traffic-cones-buying-guide` → primary "traffic cones" (50K, High, ci=100) — pillar buying guide.
  - `orange-cones-explained` → primary "orange cones" (50K, High, ci=100) — definitional / spec breakdown.
  - `street-cones-guide` → primary "street cones" (50K, High, ci=100) — application-by-scenario guide.
  - `safety-pylons-vs-traffic-cones` → primary "safety pylons" (50K, High, ci=100) — terminology comparison (pylon vs cone vs delineator vs bollard).
  - `pedestrian-crossing-signal-mutcd-guide` → primary "pedestrian crossing signal" (50K, High, ci=94) — FAQ-heavy AEO/MUTCD regulatory.
  All registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Article structures varied across the 5 (pillar with full spec tables, definitional with sheeting/visibility table, prose-heavy scenario guide, terminology comparison table, FAQ-heavy regulatory) per anti-pattern-detection guidance. Cluster strategy continues — the cone family pillar (`traffic-cones-buying-guide`) now anchors the previously-published siblings (`parking-cones-buying-guide`, `road-cones-vs-traffic-cones`, `traffic-safety-cones-pillar-guide`, `hazard-cones-vs-traffic-cones`, `what-is-a-traffic-pylon`) with strong internal linking, building the topical authority Harold directed on 2026-04-27.
- **2026-04-28** — **Daily SEO autopublish run.** Shipped 5 posts targeting top-of-file High-comp 50K-vol cone + sign cluster:
  - `parking-cones-buying-guide` → primary "parking cones" (50K, High, ci=100) — commercial buyer's guide.
  - `traffic-safety-cones-pillar-guide` → primary "traffic safety cones" (50K, High, ci=100) — pillar.
  - `pedestrian-crossing-signs-mutcd-guide` → primary "pedestrian crossing signs" (50K, High, ci=94) — FAQ-heavy AEO/MUTCD.
  - `what-is-a-traffic-pylon` → primary "traffic pylon" (50K, High, ci=100) — "what is X" definitional.
  - `hazard-cones-vs-traffic-cones` → primary "hazard cones" (50K, High, ci=100) — commercial-intent comparison.
  All registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Article structures varied across the 5 (table-heavy commercial, pillar with size tables, FAQ-heavy regulatory, definitional with terminology table, comparison-table commercial) per the autopublish anti-pattern-detection guidance. Cluster strategy per Harold's 2026-04-27 directive: building topical authority around the cone family (we already had `road-cones-vs-traffic-cones`) by attacking parallel high-volume search terms with internal-link reinforcement.
- **2026-04-30** — **Daily SEO autopublish run.** Top-of-file High-comp 50K-vol cone/barricade/ped-sign cluster terms are now all covered, so today's batch moved to the next tier (5K-vol High-comp) and rotated topics into barriers + speed bumps + collapsibles to seed adjacent clusters:
  - `crowd-control-barriers-buying-guide` → primary "crowd control barriers" (5K, High, ci=100) — definitional + commercial buying guide.
  - `traffic-barriers-types-comparison` → primary "traffic barriers" (5K, High, ci=100) — pillar comparison across concrete jersey / plastic jersey / water-filled / steel guardrail with a decision tree.
  - `traffic-barrels-buying-guide` → primary "traffic barrels" (5K, High, ci=100) — FAQ-heavy AEO on MUTCD channelizer drums (vs cones, why DOTs require them).
  - `rubber-speed-bumps-buying-guide` → primary "rubber speed bumps" (5K, High, ci=100) — install + commercial buying guide for property managers / HOAs.
  - `collapsible-traffic-cones-guide` → primary "collapsible traffic cones" (5K, High, ci=100) — commercial-intent comparison vs traditional MUTCD cones (fleet / EMS / parking enforcement).
  All registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Article structures varied across the 5 (definitional + commercial, pillar comparison with decision tree, FAQ-heavy AEO regulatory, install-step parking-lot guide, side-by-side comparison-table commercial) per the autopublish anti-pattern-detection guidance. Cluster expansion: introduces a barriers cluster (jersey, water-filled, crowd control) and a property-management cluster (speed bumps) alongside the existing cone cluster. Each new article internal-links into a sibling article + the relevant /category/ + a tool page (/quote, /assistant, /planner) per the autopublish brief.
- **2026-05-01** — **Daily SEO autopublish run.** Shipped 5 posts continuing the 5K-vol High-comp tier — broadening the cone cluster with two commercial-intent pages, expanding the barriers cluster, and seeding two new clusters (delineators and signs):
  - `traffic-cones-for-sale` → primary "traffic cones for sale" (5K, High, ci=100) — commercial-intent buying guide with size/price table.
  - `construction-cones-explained` → primary "construction cones" (5K, High, ci=100) — definitional / "what makes a cone construction-grade."
  - `road-barriers-buying-guide` → primary "road barriers" (5K, High, ci=100) — pillar comparison (concrete jersey / plastic / water-filled / steel guardrail) with MASH crash-rating table and decision tree.
  - `traffic-delineators-guide` → primary "traffic delineators" (5K, High, ci=100) — "what is X" definitional separating post / tubular / panel / RPM types.
  - `traffic-control-signs-mutcd-guide` → primary "traffic control signs" (5K, High, ci=100) — FAQ-heavy AEO/MUTCD regulatory across the three categories (regulatory / warning / guide), with advance-warning spacing table.
  All registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Article structures varied across the 5 (commercial buying guide, definitional explainer, pillar comparison with decision tree, "what is X" definitional, FAQ-heavy regulatory) per the autopublish anti-pattern-detection guidance. Cluster expansion: extends the cone cluster with the missing commercial-intent ("for sale") and definitional ("construction cones") pages, expands the barriers cluster (now: traffic-barriers / road-barriers / crowd-control / jersey-barricades / type-iii-barricade), and seeds two new clusters — delineators (post / tubular / panel / RPM) and traffic-control signs (R / W / G series). Each new article internal-links a sibling + a /category/ + a tool page (/quote, /assistant, /planner) per the brief. Note for next run: the top-tier 50K and many 5K High-comp cone/barrier/sign keywords are now covered; tomorrow we should move to the next 5K-vol High-comp tier (traffic safety supply, traffic signs for sale, road safety cones, traffic delineator-adjacent, etc.) or pivot to MUTCD-specific long-tail.
- **2026-05-02** — **Daily SEO autopublish run.** Shipped 7 posts in two recovery commits (`59e3b65` + `99394e5`) after the May 2 run hit an `API Error: Stream idle timeout - partial response received` mid-batch. The first 3 were the orphan files the timed-out run had left on disk; the next 4 were re-drafted and salvaged. Spec change going forward: commit-after-each-article so a stream timeout never loses more than one in-progress draft.
  - `safety-cones-buying-guide` → primary "safety cones" (5K, High, ci=100) — pillar buying guide w/ size + ANSI Z535 color-code tables (workplace, parking-lot, road).
  - `traffic-barricades-pillar-guide` → primary "traffic barricades" (5K, High, ci=100) — pillar comparison spanning Type I/II/III + jersey + plastic + water-filled + crowd control with a price + decision-tree section.
  - `rubber-speed-humps-vs-speed-bumps` → primary "rubber speed humps" (5K, High, ci=100) — "vs" comparison piece (humps vs bumps; sub-types: cushions, tables, raised crosswalks).
  - `traffic-cones-near-me-same-day-delivery` → primary "traffic cones near me" (5K, High, ci=100) — local commercial-intent FAQ-heavy AEO; aligns with the BUY/DELIVERY pivot.
  - `yellow-caution-tape-buying-guide` → primary "yellow caution tape" (5K, High, ci=100) — definitional + commercial product page; OSHA color codes + APWA underground colors + mil thickness reference.
  - `water-filled-barriers-buying-guide` → primary "water filled barriers" (~500, High) — pillar buying guide for water-filled barrier category w/ MASH/NCHRP-350 crashworthiness table.
  - `bike-rack-barricades-events-guide` → primary "bike rack barricade" (~500, High) — event/parade crowd-control buying guide (interlocking + French-barrier).
  All 7 registered in `articles.ts` (newest-first), `npx tsc --noEmit` clean. Structures varied across the 7 (pillar buying guide w/ tables, pillar comparison + decision tree, "vs" comparison, FAQ-heavy local commercial intent, definitional + product spec, pillar buying guide w/ crash-rating table, event-vertical buying guide) per the autopublish anti-pattern-detection guidance. Cluster expansion: extends the cone family with the workplace pillar (`safety-cones-buying-guide`) and the local-commercial-intent page (`traffic-cones-near-me-same-day-delivery`); seeds a new barricade-tape cluster (`yellow-caution-tape-buying-guide`); broadens the barricade cluster with two new pillar/sub-pillar pieces (`traffic-barricades-pillar-guide`, `water-filled-barriers-buying-guide`) plus an event-vertical entry (`bike-rack-barricades-events-guide`); and pairs the existing `rubber-speed-bumps-buying-guide` with the humps comparison page so we own both halves of the speed-bump SERP. Each new article internal-links a sibling + a `/category/` + a tool page (`/quote`, `/assistant`, `/planner`) per the brief. Note for next run: the next 5K-vol High-comp tier still has uncovered terms — `traffic safety supply`, `orange traffic cones`, `safety cones for sale`, `traffic signs for sale`, `large traffic cones`, `pedestrian signs`, `small traffic cones`, `red cones`, `highway cones` — pick 5 from the top tomorrow.
