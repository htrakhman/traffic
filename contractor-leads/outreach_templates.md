# TrafficKit Outreach Templates — A/B/C

**Business context:** TrafficKit rents MUTCD-compliant traffic-control
equipment (cones, barricades, arrow boards, message boards, full TTC
packages) to NJ contractors doing roadside/utility/excavation work.

## Channels — the real picture

**✅ Facebook Messenger to their business Page** — this is the channel.
Send manually from your account. **Cap: ~20–30 first-touch/day.** Do NOT
include links in the first message (FB throttles). Don't copy-paste the
exact same template 20 times — rotate variants + personalize line 1.

**❌ Facebook Marketplace** — skip. It's consumer-to-consumer for selling
items, not a B2B outreach channel. The "unlimited messaging" only applies
between buyers/sellers on specific listings. Using it to cold-pitch
contractors will get your account restricted and won't land in anyone's
inbox who actually makes buying decisions.

**✅ Email** — unlimited volume (if it passes SpamAssassin), links allowed,
follow-ups expected. Use for leads where we have an email but no FB, or
as a follow-up channel to warm/no-response FB threads.

**✅ Instagram DM** — secondary channel. Lower daily limit (~15/day) but
contractors increasingly use IG for posting completed jobs. Good for
visual-first follow-up (photo of your yard of gear).

**Don't automate any of these.** Meta/Google detect bulk patterns fast.
The scheduled task drafts messages *for you*; you send them.

---

## Variant A — Research / soft opener

> Hey — I'm doing some research on how contractors in {County} handle
> temporary traffic-control for roadside jobs. Do you guys usually own
> all your cones, barricades, and signage, or do you ever end up renting
> extra gear when a job needs more than you have on hand?

**Why it works:** no pitch, no ask. Opens the door.
**Best for:** cold-cold outreach to unfamiliar contractors.
**Goal:** get any reply.

---

## Variant B — Direct introduction

> Hey — saw your page while putting together a list of {category} outfits
> in {County}. Quick intro: I run TrafficKit, a small traffic-control
> rental setup out of NJ (cones, barricades, arrow boards, signage —
> whatever a roadside job needs). If you're ever short on gear or want a
> quote on rentals, shoot me a message. No pressure either way.

**Why it works:** honest, short, memorable. Positions TrafficKit.
**Best for:** leads who've been around a while and can tell when
someone's running a line on them.
**Goal:** be top-of-mind when they next need rental gear.

---

## Variant C — Value-first / problem-framed

> Hey — question for you: when a job's TTC plan changes last-minute and
> you need extra arrow boards / message boards / signage on short notice,
> where do you usually pull gear from? I run TrafficKit — a local rental
> shop that keeps MUTCD-compliant gear on standby specifically for those
> Friday-afternoon scrambles. Happy to share pricing if it's ever useful.

**Why it works:** shows insider fluency (TTC plan, MUTCD, the Friday
scramble). Signals you've been on a jobsite.
**Best for:** mid-to-large outfits that already own a lot of gear but
hit capacity spikes.
**Goal:** land as "the emergency-gear guy" in their mental rolodex.

---

## Personalization hooks (fill in line 1)

The scheduled task will pull one of these per lead from the scraper data:

- `{County}` — "in Monmouth County"
- `{category}` — "excavation crews" / "utility outfits" / "site work guys"
- `{recent post}` — if they posted a job recently, reference it:
  "saw the Mercer job you wrapped last week — nice work"
- `{review note}` — "saw y'all have a bunch of 5-star Google reviews"

---

## Subject lines (email)

- **Subject A:** "Quick question on how {company} handles TTC gear"
- **Subject B:** "TrafficKit intro — NJ traffic-control rentals"
- **Subject C:** "Backup gear for last-minute {category} jobs"

---

## What NOT to do (reminders)

- No links in the first FB message
- No identical text across 20 sends — rotate + personalize line 1
- No "just checking in" — if silent 4–5 days, send one thoughtful
  follow-up (see `response_playbook.md`), then let it rest 8–12 weeks
- No price quotes upfront — pricing depends on the job
- No automation tools (Jasper/Zapier FB bots, ManyChat for cold DMs, etc.)

---

## A/B/C assignment per lead

The scheduled daily-outreach task assigns templates in this rotation
so we get comparable data:

- Every 3rd lead → Variant A
- Every 3rd lead → Variant B
- Every 3rd lead → Variant C

After 50 first-touches per variant, the bi-weekly performance review
looks at reply rates and promotes the winner to 60% of sends, runners-up
to 20% each. New variants can be introduced any time as experiments.
