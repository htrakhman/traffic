"""
Google Places API scraper for Central NJ contractors.

Finds contractors in: road construction, excavation, sewage/sewer, underground
utility, grading, paving, and site work categories.

Usage:
    python scraper.py                       # Uses defaults, writes raw_leads.json
    python scraper.py --output leads.json   # Custom output path
    python scraper.py --max-per-query 60    # Pull more results per query

Requires a GOOGLE_PLACES_API_KEY env var. See README.md for setup.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from dataclasses import dataclass, asdict, field
from typing import Any

import requests


# --- Central NJ coverage ------------------------------------------------------
# Center points + radius for each Central NJ county. Google Places Nearby Search
# caps at 50km radius and ~60 results per query, so we blanket the region.
CENTRAL_NJ_LOCATIONS: list[tuple[str, float, float, int]] = [
    # (label, lat, lng, radius_meters)
    ("Middlesex County",  40.4862, -74.4518, 20000),
    ("Monmouth County",   40.2871, -74.1820, 25000),
    ("Mercer County",     40.2206, -74.7597, 20000),
    ("Somerset County",   40.5657, -74.6097, 20000),
    ("Union County",      40.6600, -74.3100, 15000),
    ("Hunterdon County",  40.5687, -74.9121, 25000),
    ("Ocean County (N)",  40.0583, -74.1901, 25000),
]

SEARCH_QUERIES: list[str] = [
    "road construction contractor",
    "excavation contractor",
    "site excavation",
    "sewer contractor",
    "sewage contractor",
    "underground utility contractor",
    "utility contractor",
    "grading contractor",
    "paving contractor",
    "site work contractor",
    "asphalt paving contractor",
    "demolition and excavation",
]

PLACES_TEXT_SEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json"
PLACES_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json"


@dataclass
class Lead:
    place_id: str
    name: str
    category_query: str
    county: str
    address: str = ""
    phone: str = ""
    website: str = ""
    rating: float | None = None
    review_count: int | None = None
    latitude: float | None = None
    longitude: float | None = None
    google_maps_url: str = ""
    business_status: str = ""
    types: list[str] = field(default_factory=list)


class PlacesClient:
    def __init__(self, api_key: str, request_delay: float = 0.2):
        self.api_key = api_key
        self.delay = request_delay

    def text_search(self, query: str, lat: float, lng: float, radius: int) -> list[dict[str, Any]]:
        """Paginated text search. Google returns up to ~60 results across 3 pages."""
        results: list[dict[str, Any]] = []
        params: dict[str, Any] = {
            "query": query,
            "location": f"{lat},{lng}",
            "radius": radius,
            "key": self.api_key,
        }
        for page in range(3):
            r = requests.get(PLACES_TEXT_SEARCH, params=params, timeout=30)
            r.raise_for_status()
            data = r.json()
            status = data.get("status")
            if status not in ("OK", "ZERO_RESULTS"):
                print(f"  ! Places API status: {status} - {data.get('error_message','')}", file=sys.stderr)
                break
            results.extend(data.get("results", []))
            token = data.get("next_page_token")
            if not token:
                break
            # Google requires a short wait before next_page_token becomes valid.
            time.sleep(2.0)
            params = {"pagetoken": token, "key": self.api_key}
        time.sleep(self.delay)
        return results

    def details(self, place_id: str) -> dict[str, Any]:
        params = {
            "place_id": place_id,
            "fields": "name,formatted_address,formatted_phone_number,international_phone_number,"
                      "website,url,rating,user_ratings_total,geometry,business_status,types",
            "key": self.api_key,
        }
        r = requests.get(PLACES_DETAILS, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        time.sleep(self.delay)
        return data.get("result", {})


def collect_leads(api_key: str, max_per_query: int = 60) -> list[Lead]:
    client = PlacesClient(api_key)
    seen: dict[str, Lead] = {}

    total_queries = len(SEARCH_QUERIES) * len(CENTRAL_NJ_LOCATIONS)
    q_num = 0

    for query in SEARCH_QUERIES:
        for label, lat, lng, radius in CENTRAL_NJ_LOCATIONS:
            q_num += 1
            print(f"[{q_num}/{total_queries}] {label}: '{query}'", flush=True)
            try:
                raw = client.text_search(query, lat, lng, radius)[:max_per_query]
            except requests.RequestException as e:
                print(f"  ! request error: {e}", file=sys.stderr)
                continue
            new_count = 0
            for r in raw:
                pid = r.get("place_id")
                if not pid or pid in seen:
                    continue
                # Filter: must look like an NJ result. Places returns things just
                # outside the radius sometimes; also skip permanently-closed ones.
                address = r.get("formatted_address", "")
                if "NJ" not in address and "New Jersey" not in address:
                    continue
                if r.get("business_status") == "CLOSED_PERMANENTLY":
                    continue
                geom = r.get("geometry", {}).get("location", {})
                seen[pid] = Lead(
                    place_id=pid,
                    name=r.get("name", ""),
                    category_query=query,
                    county=label,
                    address=address,
                    rating=r.get("rating"),
                    review_count=r.get("user_ratings_total"),
                    latitude=geom.get("lat"),
                    longitude=geom.get("lng"),
                    google_maps_url=f"https://www.google.com/maps/place/?q=place_id:{pid}",
                    business_status=r.get("business_status", ""),
                    types=r.get("types", []),
                )
                new_count += 1
            print(f"  + {new_count} new (running total: {len(seen)})")

    # Enrich with details (phone + website)
    print(f"\nFetching details for {len(seen)} leads...", flush=True)
    for i, lead in enumerate(seen.values(), 1):
        if i % 25 == 0:
            print(f"  details {i}/{len(seen)}", flush=True)
        try:
            d = client.details(lead.place_id)
        except requests.RequestException as e:
            print(f"  ! details error for {lead.name}: {e}", file=sys.stderr)
            continue
        lead.phone = d.get("formatted_phone_number", "") or d.get("international_phone_number", "")
        lead.website = d.get("website", "")
        if d.get("url"):
            lead.google_maps_url = d["url"]

    return list(seen.values())


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--output", default="raw_leads.json", help="JSON output path")
    ap.add_argument("--max-per-query", type=int, default=60,
                    help="Cap results per (query, location) pair")
    ap.add_argument("--api-key", default=os.environ.get("GOOGLE_PLACES_API_KEY", ""),
                    help="Google Places API key (or set GOOGLE_PLACES_API_KEY env var)")
    args = ap.parse_args()

    if not args.api_key:
        print("ERROR: set GOOGLE_PLACES_API_KEY env var or pass --api-key", file=sys.stderr)
        print("See README.md for how to get a key (Google gives $200/mo free credit).", file=sys.stderr)
        return 1

    leads = collect_leads(args.api_key, args.max_per_query)
    with open(args.output, "w") as f:
        json.dump([asdict(l) for l in leads], f, indent=2)
    print(f"\nSaved {len(leads)} leads -> {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
