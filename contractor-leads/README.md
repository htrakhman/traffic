# Central NJ Contractor Lead Scraper

Pulls contractors (road construction, excavation, sewer/sewage, underground
utility, grading, paving, site work) in Central NJ from Google Maps, then
enriches each lead with Facebook, Instagram, LinkedIn, website, and email.

Output: a formatted `leads.xlsx` with a Summary sheet and a sorted, filterable
Leads table.

## What this does (and does not do)

**Does:** Uses Google's official Places API (legit, ToS-compliant) to pull
business listings in Central NJ, then crawls each company's public website
(homepage + /contact /about) for social links and email addresses. Falls back
to a DuckDuckGo search for a Facebook page when a site has none.

**Does not:** Scrape Google Maps HTML, bypass any rate limits, or harvest
private data. Respects per-request delays.

## Setup (one-time)

### 1. Install Python deps

```bash
cd contractor-leads
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Get a Google Places API key

1. Go to https://console.cloud.google.com/
2. Create a project (or pick one)
3. Enable **Places API** (search it in the library, click Enable)
4. Credentials → Create credentials → API key
5. Restrict the key: **API restrictions** → select only *Places API*
6. Billing: you must enable billing on the project, but Google gives you
   **$200 in free credit per month**. A full Central NJ run costs roughly
   **$10–25** depending on how many detail lookups it does, so you will
   not be charged for a typical pilot run.

Then set the env var:

```bash
export GOOGLE_PLACES_API_KEY="AIzaSy..."
```

(Add that line to `~/.zshrc` or `~/.bashrc` to persist it.)

### 3. Run it

Either the one-shot pipeline:

```bash
python run_all.py
```

Or step by step:

```bash
python scraper.py                                        # ~5-15 minutes
python enricher.py --input raw_leads.json \
                   --output enriched_leads.json          # ~20-60 minutes
python export_xlsx.py --input enriched_leads.json \
                      --output leads.xlsx
```

Open `leads.xlsx` — sorted so leads with Facebook pages are on top.

## Tuning

**Add/remove categories:** edit `SEARCH_QUERIES` in `scraper.py`.
**Change coverage area:** edit `CENTRAL_NJ_LOCATIONS` in `scraper.py`
(swap in Hudson/Bergen/Essex etc. for North Jersey, or narrow to just
Middlesex+Mercer for your own county).
**Speed up/slow down enrichment:** the `delay` arg in `enricher.crawl_site()`.

## Expected output

- `raw_leads.json` — Google Places results with phone/website/place_id
- `enriched_leads.json` — above + socials/emails/primary_contact_url
- `leads.xlsx` — the deliverable, sorted + filterable, with a Summary tab

## Troubleshooting

**`REQUEST_DENIED`:** billing not enabled on the GCP project, or the key is
restricted to a different API.
**`OVER_QUERY_LIMIT`:** you're hitting free-tier per-minute limits — let it
finish and retry, or add a longer `delay` in `PlacesClient`.
**Few Facebook hits:** contractors are old-school — many have sites but no
FB. The DDG fallback helps but isn't perfect; a manual pass on the top 20–30
leads fills the gaps fast.

## Outreach assets

See `outreach_templates.md` for the 3 A/B message variants and
`response_playbook.md` for how to handle common replies.
