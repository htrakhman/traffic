# SEO / AEO workspace

This folder is the dedicated workspace of the **seo-specialist** subagent (see
`.claude/agents/seo-specialist.md`). Don't edit its contents by hand — route
SEO/AEO work through that agent so the paper trail stays clean.

## Files

- `keywords.json` — parsed Google Ads Keyword Planner export (April 2025 – March 2026).
  Source of truth for what to rank for. The `avgMonthlySearches` and
  `competitionIndex` fields drive the specialist's targeting queue.
- `publish-log.json` — one entry per article shipped. Prevents the specialist
  from re-covering ground or forgetting what's live.

## How the specialist picks the next article

1. Reads `keywords.json` and `publish-log.json`.
2. Filters keywords to: `avgMonthlySearches >= 50`, `competitionIndex < 60`,
   not already in the publish log.
3. Ranks remaining by opportunity score
   (`avgMonthlySearches / max(competitionIndex, 1)`).
4. Picks top item, drafts, ships via auto-publish.

## How to invoke the specialist

Because this is an auto-publish setup, just ask:

> "Publish the next SEO article."
> "Optimize the /category/arrow-boards page."
> "Regenerate the sitemap."

The main agent will route these to the seo-specialist subagent automatically
because of the `description` field in its definition.

## npm scripts the specialist uses

- `npm run sitemap` — regenerates `public/sitemap.xml` from products + articles.
- `npm run rss` — regenerates `public/rss.xml` from articles.
- `npm run seo:build` — runs both. Wired into `npm run build` so every deploy
  ships a fresh sitemap and RSS.
