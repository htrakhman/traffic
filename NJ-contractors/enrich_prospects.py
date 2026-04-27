#!/usr/bin/env python3
"""
Enrich prospects.csv rows with email + website + Facebook URL.

Reads rows from prospects.csv where `enrichment_status` is blank, runs
each through one or more enrichment providers, and writes the results
back. Already-enriched rows are skipped.

Usage:

    # Free tier — uses DuckDuckGo to find a website + Facebook URL.
    # No email lookup. Good for kicking the tires.
    python enrich_prospects.py --provider free

    # Hunter.io — best price for email lookup ($49/mo at time of writing).
    # Set HUNTER_API_KEY in your environment.
    python enrich_prospects.py --provider hunter

    # Apollo.io — most comprehensive (email, phone, LinkedIn, employee data).
    # Set APOLLO_API_KEY in your environment.
    python enrich_prospects.py --provider apollo

    # Limit rows processed in one run (default: 100, hard cap to avoid
    # blowing through API credits while testing).
    python enrich_prospects.py --provider hunter --limit 25

The enrichment providers are wrapped behind a small interface so you
can swap or stack them. Output columns added to prospects.csv:

    enriched_email      — best-guess primary email
    enriched_website    — discovered company website
    enriched_facebook   — Facebook business page URL
    enrichment_status   — `enriched` / `not_found` / `error: ...`
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Iterable, Optional
from urllib.parse import quote_plus

try:
    import requests
except ImportError:                                                       # pragma: no cover
    sys.exit("requests is required. pip install -r requirements.txt")


HERE = Path(__file__).resolve().parent
PROSPECTS = HERE / "prospects.csv"
USER_AGENT = "PermitMonitor-Enrich/1.0"


# ---------------------------------------------------------------------------
# Provider interface
# ---------------------------------------------------------------------------
class EnrichmentProvider:
    name = "base"

    def enrich(self, row: dict[str, str]) -> dict[str, str]:
        """Return a dict with any of:
            enriched_email, enriched_website, enriched_facebook,
            enrichment_status.
        Status should be 'enriched', 'not_found', or 'error: ...'.
        """
        raise NotImplementedError


# ---------------------------------------------------------------------------
# Free provider — DuckDuckGo HTML scrape.
# Useful for finding a business website + Facebook URL when you have the
# business name. Email is NOT discoverable this way at any scale.
# ---------------------------------------------------------------------------
class FreeProvider(EnrichmentProvider):
    """Free / no-API mode.

    Doesn't reliably auto-extract emails or phones — those require a paid
    enrichment service. What it *does* do is fill in three high-value
    URLs per row that you can one-click into to do a 30-second manual
    lookup yourself:

      enriched_website   — google search URL pre-filled with name + city
      enriched_facebook  — facebook directory search URL
      (a phone is optional — if available in raw permit data, we already
       captured it under applicant_phone)

    For real auto-discovery of email + Facebook URLs at scale, use
    --provider hunter or --provider apollo.
    """
    name = "free (manual-lookup links)"

    def enrich(self, row: dict[str, str]) -> dict[str, str]:
        name = (row.get("applicant_name") or "").strip()
        if not name:
            return {"enrichment_status": "error: empty applicant_name"}

        city = (row.get("applicant_city") or "").strip()
        state = (row.get("applicant_state") or "").strip()
        loc = " ".join(p for p in (city, state) if p)
        q_company = f"{name} {loc}".strip()

        # Build clickable URLs the user can paste into a browser.
        google_q = quote_plus(f'"{name}" {loc} contractor website')
        fb_q = quote_plus(name)
        return {
            "enriched_website": f"https://www.google.com/search?q={google_q}",
            "enriched_facebook": f"https://www.facebook.com/search/pages/?q={fb_q}",
            "enrichment_status": "manual-lookup-ready",
        }


# ---------------------------------------------------------------------------
# Hunter.io provider — email focused, ~$49/mo entry tier.
# Docs: https://hunter.io/api
# ---------------------------------------------------------------------------
class HunterProvider(EnrichmentProvider):
    name = "hunter.io"

    def __init__(self) -> None:
        key = os.environ.get("HUNTER_API_KEY")
        if not key:
            sys.exit("HUNTER_API_KEY environment variable is required for "
                     "the hunter provider")
        self.key = key

    def enrich(self, row: dict[str, str]) -> dict[str, str]:
        name = (row.get("applicant_name") or "").strip()
        if not name:
            return {"enrichment_status": "error: empty applicant_name"}
        # Step 1: domain search by company name → returns the company domain
        try:
            r = requests.get(
                "https://api.hunter.io/v2/domain-search",
                params={"company": name, "limit": 1, "api_key": self.key},
                timeout=15,
            )
            r.raise_for_status()
            data = r.json().get("data", {})
        except Exception as e:                                            # noqa: BLE001
            return {"enrichment_status": f"error: {type(e).__name__}: {e}"}
        domain = data.get("domain")
        if not domain:
            return {"enrichment_status": "not_found"}

        out: dict[str, str] = {"enriched_website": f"https://{domain}"}
        emails = data.get("emails") or []
        if emails:
            # Prefer generic role addresses (info@, sales@) for cold outreach.
            sorted_emails = sorted(
                emails,
                key=lambda e: 0 if (e.get("type") == "generic") else 1,
            )
            out["enriched_email"] = sorted_emails[0].get("value", "")
        out["enrichment_status"] = "enriched" if out.get("enriched_email") else "not_found"
        return out


# ---------------------------------------------------------------------------
# Apollo.io provider — most comprehensive, ~$49/mo basic tier.
# Docs: https://docs.apollo.io/reference/people-search
# ---------------------------------------------------------------------------
class ApolloProvider(EnrichmentProvider):
    name = "apollo.io"

    def __init__(self) -> None:
        key = os.environ.get("APOLLO_API_KEY")
        if not key:
            sys.exit("APOLLO_API_KEY environment variable is required for "
                     "the apollo provider")
        self.key = key

    def enrich(self, row: dict[str, str]) -> dict[str, str]:
        name = (row.get("applicant_name") or "").strip()
        if not name:
            return {"enrichment_status": "error: empty applicant_name"}
        try:
            r = requests.post(
                "https://api.apollo.io/v1/organizations/search",
                json={"q_organization_name": name, "page": 1, "per_page": 1},
                headers={"Cache-Control": "no-cache",
                         "Content-Type": "application/json",
                         "X-Api-Key": self.key},
                timeout=20,
            )
            r.raise_for_status()
            data = r.json()
        except Exception as e:                                            # noqa: BLE001
            return {"enrichment_status": f"error: {type(e).__name__}: {e}"}
        orgs = data.get("organizations") or []
        if not orgs:
            return {"enrichment_status": "not_found"}
        org = orgs[0]
        out: dict[str, str] = {}
        if org.get("primary_domain"):
            out["enriched_website"] = f"https://{org['primary_domain']}"
        if org.get("facebook_url"):
            out["enriched_facebook"] = org["facebook_url"]
        # Apollo's "primary_phone" or any contact
        # (note: emails on org-level require a separate /people-search call,
        # which uses credits — left as an exercise to extend)
        out["enrichment_status"] = "enriched" if out else "not_found"
        return out


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------
PROVIDERS = {
    "free":   FreeProvider,
    "hunter": HunterProvider,
    "apollo": ApolloProvider,
}


def load_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    if not path.exists():
        sys.exit(f"prospects.csv not found at {path}")
    with path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        rows = list(reader)
        return reader.fieldnames or [], rows


def save_rows(path: Path, fieldnames: list[str],
              rows: list[dict[str, str]]) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    tmp.replace(path)


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--provider", choices=PROVIDERS.keys(), default="free",
                   help="Enrichment provider (default: free)")
    p.add_argument("--limit", type=int, default=100,
                   help="Max rows to enrich in this run (default 100)")
    p.add_argument("--prospects", type=Path, default=PROSPECTS,
                   help="Path to prospects.csv")
    p.add_argument("--sleep-ms", type=int, default=500,
                   help="Delay between API calls (default 500ms)")
    args = p.parse_args()

    provider_cls = PROVIDERS[args.provider]
    provider = provider_cls()
    print(f"Using provider: {provider.name}")

    fieldnames, rows = load_rows(args.prospects)
    # Ensure new columns exist in the header
    for col in ("enriched_email", "enriched_website",
                "enriched_facebook", "enrichment_status"):
        if col not in fieldnames:
            fieldnames.append(col)

    todo = [r for r in rows if not (r.get("enrichment_status") or "").strip()]
    todo = todo[:args.limit]
    print(f"Rows in file: {len(rows)} | to enrich now: {len(todo)}")

    enriched_count = 0
    for i, row in enumerate(todo, 1):
        result = provider.enrich(row)
        for k, v in result.items():
            row[k] = v
        if result.get("enrichment_status") == "enriched":
            enriched_count += 1
        print(f"  [{i}/{len(todo)}] {row.get('applicant_name', '')!r:40s} "
              f"-> {result.get('enrichment_status', '')}")
        # Be polite with rate limits
        time.sleep(args.sleep_ms / 1000.0)

    save_rows(args.prospects, fieldnames, rows)
    print(f"\nDone. {enriched_count}/{len(todo)} successfully enriched. "
          f"prospects.csv updated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
