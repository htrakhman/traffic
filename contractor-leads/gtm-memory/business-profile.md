# TrafficKit — Business Profile

*Last updated: 2026-04-27 — pivot from rental → buy/sell + domain migration to trafficcontrolsupply.com*

## Brand / domain

- **Working name:** Traffic Control Supply (per `src/config/site.ts` `SITE_NAME`); "TrafficKit" still in page titles / brand kit as the secondary handle
- **Canonical domain:** **`trafficcontrolsupply.com`** (migrated 2026-04-27, commit `e359be1` — "seo: migrate canonical domain to trafficcontrolsupply.com")
- **Legacy domain:** `trafficcontrolrental.com` (originally acquired 2026-04-18). **Action item for Harold:** keep DNS for the legacy domain pointed at the new site with a permanent 301 redirect to `https://trafficcontrolsupply.com` so existing rental-targeted SEO equity carries over. If the legacy domain is dropped, all the rental-keyword content on the site loses its inbound links the moment Google re-crawls.
- **Email:** `orders@trafficcontrolsupply.com` (per `src/config/site.ts`)
- **Phone:** `(732) 675-2499`
- **Pivot context:** business model moved from RENTAL → BUY/SELL on 2026-04-27 (commits `8137595` + `4480967`), and the canonical domain followed (`e359be1`). All NEW content must be framed around purchase + same-day delivery, not rental. Existing rental-framed articles are preserved for SEO continuity (they still rank under rental keywords, which we capture as ambiguous-intent traffic and convert to purchase).

## What we are

**TrafficKit** is a traffic-control equipment ***seller*** (with delivery)
serving contractors working on roadside jobs. We sell cones, barricades,
arrow boards, message boards, signs, and full MUTCD-compliant TTC packages
for purchase, with same-day Central NJ delivery.

**Pivot history:** Originally launched as a rental business (Apr 2026).
Pivoted to buy/sell with delivery on 2026-04-27. Reasons (per commits 8137595
+ 4480967): rental coordination overhead, depreciation/damage liability on
high-value gear, simpler revenue recognition, easier customer ops. Existing
rental-targeted SEO content was preserved (still ranks for "rental"
keywords, which we capture as ambiguous-intent traffic and convert to
purchase).

**Differentiator:** the site ships with two AI-powered tools that
competitors don't have:
1. **Assistant** — a chat that helps contractors pick gear for a job.
2. **SiteMapPlanner** — generates MUTCD-compliant work-zone layouts.

This is a strong AEO wedge: we can become the AI-visible source for
"how much TTC gear do I need for X job?" queries.

## Service area

**Central NJ** (pilot): Middlesex, Monmouth, Mercer, Somerset, Union,
Hunterdon, northern Ocean. Expand to North NJ → whole state → tri-state
as capacity allows.

## Product catalog

Categories (from `src/data/categories.ts`):
- Cones, Drums & Channelizers
- Signs & Sign Stands
- Barricades & Barriers
- Arrow Boards
- (verify full list — 1243-line products.ts)

## Ideal Customer Profile (ICP)

**Primary:** small-to-mid NJ contractors in these categories:
road construction, excavation, sewer/sewage, underground utility,
grading, paving, site work. Typical signals:
- 5–50 employees
- Own some TTC gear but not enough for spike days
- Work for DOT / municipalities / private developers
- Active on Facebook/Google (proxy: digitally reachable)

**Refined 2026-04-18 based on first field feedback (Austen, grading contractor):**
Small/mid contractors typically OWN the commodity TTC gear (cones,
standard signs, Type I/II barricades). Rental demand concentrates
on **high-value, low-utilization gear**:
- Arrow boards (trailer-mount $150–250/day retail)
- Message boards (trailer-mount $200–300/day)
- Crash cushions / truck-mounted attenuators
- Type III barricades in bulk for longer closures
- Full MUTCD sign packages for short-notice jobs

Lead with these categories in outreach, not cones. Cones are a
commodity add-on after we've landed them on the expensive gear.

**Secondary (future):** municipalities, utility companies, event
organizers (parades, races, festivals).

## Pricing posture

TBD — currently quote-based via the site's /quote page. Rate card not
public. Keeps flexibility; forces contractors to reach out (good for
outreach conversion; bad for SEO because price-comparison searchers
can't get a number without contacting us).

## Brand voice

Practical, no-BS, blue-collar-adjacent. Not "solutions provider"
corporate speak. We sound like someone who's actually been on a
work zone.

## Inventory-sourcing notes

Austen (grading contractor, 2026-04-18) flagged **public auctions** as
a cheap source of used TTC gear. Worth investigating for getting the
first round of inventory up without capital outlay:
- GovDeals (municipal surplus)
- GSAAuctions (federal surplus)
- Municibid (NJ local govt surplus — especially strong in NJ)
- IronPlanet / Ritchie Bros (used construction equipment auctions)
- Check NJDOT surplus equipment auctions

## Alternative business models to watch

Austen also suggested **distribution/resale** rather than rental —
become a distributor of traffic safety supplies. Parked for now
since rental is the current thesis (better recurring revenue, lower
inventory turnover risk), but revisit if:
- Rental customer acquisition cost stays high >6 months
- We find a distribution partnership (supplier margin) that's too
  good to pass up
- Multiple rental customers ask "can I just buy a few cones from you"

## Competitors to watch

(Filled in by `competitor-watch.md` — first scheduled run will populate.)

Known NJ traffic-control rental players to benchmark:
- Roadsafe Traffic Systems (national, big)
- Traffic Plan (regional mid-Atlantic)
- Safety Services Northeast
- Plus regional small players to be discovered

## Key metrics we care about

- **Leads sourced per week** (from scraper)
- **First-touch response rate** per message template
- **Qualified conversations started per week** (replies that aren't "no")
- **Quote requests / month** (inbound from site)
- **Organic impressions** (Search Console)
- **Ranked keywords in top 20** (Search Console)
