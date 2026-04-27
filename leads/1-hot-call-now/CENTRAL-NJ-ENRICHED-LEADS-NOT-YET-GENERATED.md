# Central NJ Enriched Leads — NOT YET GENERATED

The Google Places + email/social enrichment pipeline at
`/Users/harold/Desktop/traffic/contractor-leads/` has been built but the
actual `leads.xlsx` deliverable was never run.

To generate it:
```bash
cd /Users/harold/Desktop/traffic/contractor-leads
export GOOGLE_PLACES_API_KEY="AIzaSy..."
python run_all.py
# then copy leads.xlsx into this folder
```

When generated, this will be your hottest lead set — Central NJ road
construction / excavation / paving contractors with phone, email, FB, IG,
LinkedIn, and website scraped per company.

Outreach assets already exist:
- contractor-leads/outreach_templates.md (3 A/B variants)
- contractor-leads/response_playbook.md (reply handling)
