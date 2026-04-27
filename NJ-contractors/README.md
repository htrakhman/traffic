# Nationwide Permit Pull Monitor

Tracks new right-of-way and road-work permits across all 50 states and alerts you
when a contractor on your target list pulls a permit.

## Quick start

```bash
pip install -r requirements.txt
playwright install chromium    # only needed for scrapers that fall back to a browser

# 1. Edit contractors.csv with your target list
# 2. First run — discovers sources, pulls a 30-day baseline (no alerts)
python permits.py --setup
# 3. Daily run — diffs against seen_permits.json and writes a digest
python permits.py --run
# 4. Health check
python permits.py --status
```

Cron the daily run:

```
0 7 * * * cd /path/to/permits && /usr/bin/python3 permits.py --run
```

## What's actually live vs. template

This system was designed to be a **scaffold**: every state has a scraper file
that implements the contract from `scrapers/base.py`, but only a subset
have real, validated endpoints wired up. The rest are template scrapers
that report `auth_required` or `not_implemented` in `source_status.json` and
fail closed (no fake data).

Real Socrata-API endpoints (the most reliable sources) are wired up for:
NYC, Los Angeles, Chicago, San Francisco, Seattle, Boston, Austin, Denver,
Philadelphia, Charlotte, Cincinnati / a handful of other cities that publish
permit datasets through the Socrata Open Data Network. See `--status` for
the full live-vs-blocked matrix on first run.

State-DOT encroachment portals are mostly JavaScript-heavy, gated by a session
token, or behind ArcGIS/Tyler-Cityworks logins. The matching template scrapers
mark themselves `auth_required` and surface a `discovery_url` you can plug in
once you've negotiated access. Search hooks are in place — see
`scrapers/base.py::BasePermitScraper.discover()`.

## Output files

| File | Purpose |
|---|---|
| `matches.csv` | Permits where the applicant fuzzy-matches your contractors list |
| `prospects.csv` | Permits in a target trade category but **not** matched — new leads |
| `seen_permits.json` | De-dupe cache, keyed by `{state: [permit_numbers]}` |
| `source_status.json` | Health of each source: live / blocked / auth_required |
| `digests/YYYY-MM-DD.txt` | Human-readable daily digest |
| `error_log.txt` | Per-source errors with timestamps and stack traces |

## Adding a new source

1. Open the right `scrapers/<state>.py`.
2. Add an entry to `SOURCES` with `name`, `url`, and `kind`
   (`socrata` / `arcgis` / `html` / `playwright`).
3. Implement (or override) `fetch_one(source)` if it's not a standard kind.
4. `python permits.py --status` will show it live on the next run.

## Match logic

- Token-set ratio fuzzy match against `business_name` (threshold 80 default).
- Falls through to a stricter "partial" match (threshold 90) when the
  permit's applicant field is suspiciously short — government systems
  truncate at 30/40/60 chars all the time.
- Only permits whose type/description hits a `trade_keywords` term are
  promoted to `prospects.csv` if they don't match a contractor.
