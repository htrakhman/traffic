# GTM Memory — how this works

This folder is the **persistent brain** for TrafficKit's go-to-market work.
Every scheduled task reads from and writes to these files so the system
compounds over time instead of starting from zero each run.

## Files

- `business-profile.md` — what TrafficKit is, who we sell to, ICP. Update
  when anything about the business changes.
- `lead-tracker.md` — running log of who we've contacted, when, with
  which template, and what they said back. This is the source of truth
  for "who's already been messaged."
- `seo-roadmap.md` — audit findings + prioritized SEO/AEO backlog with
  ship status per item.
- `content-calendar.md` — queue of blog/article topics, with status
  (idea → outlined → drafted → shipped) and target keywords.
- `competitor-watch.md` — notes on competing NJ traffic-control rental
  shops: pricing, positioning, gaps we can exploit.
- `weekly-log.md` — week-by-week summary of wins, losses, experiments,
  and what changed. Lets us look back and see progress.

## How to use

- **Harold:** feel free to edit any of these by hand. The scheduled tasks
  will respect manual changes.
- **Scheduled tasks (me):** on each run, I read the relevant files,
  do the work, and append updates with a date stamp so the history is
  preserved.
- **Ad-hoc sessions:** when you start a chat, say "load GTM memory" and
  I'll read everything in this folder to re-sync before doing anything.
