#!/usr/bin/env python3
"""
Nationwide Construction Bid Monitor.

Tracks bid lettings, bid tabulations, and contract awards across all
50 state DOTs (plus federal SAM.gov / USASpending sources) and alerts
when contractors from contractors.csv are involved or when qualifying
projects are let.

Modes
-----
    python bids.py --setup    # validate sources, pull 90-day baseline
    python bids.py --run      # daily incremental run + digest
    python bids.py --status   # coverage report by state

Files written
-------------
    seen_projects.json           {state: [project_number, ...]}
    bid_alerts.csv               every alert ever generated
    prospects_from_awards.csv    new contractors discovered via awards
    digests/digest-YYYY-MM-DD.txt
    error_log.txt
    source_status.json           per-state status from latest run
"""

from __future__ import annotations

import argparse
import asyncio
import csv
import importlib
import json
import logging
import os
import sys
from dataclasses import asdict
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

import aiohttp

from scrapers.bidbase import (
    Award, Bid, Letting, StateRunResult, StateScraper,
    DomainRateLimiter, fuzzy_contractor_match,
)
from scrapers.enrich import enrich_contractor

ROOT = Path(__file__).parent
SEEN_PATH = ROOT / "seen_projects.json"
ALERTS_PATH = ROOT / "bid_alerts.csv"
PROSPECTS_PATH = ROOT / "prospects_from_awards.csv"
ERROR_LOG = ROOT / "error_log.txt"
SOURCE_STATUS = ROOT / "bid_source_status.json"  # separate from the permit project's file
DIGEST_DIR = ROOT / "digests"
CONTRACTORS_CSV = ROOT / "contractors.csv"

USER_AGENT = "BidMonitor/1.0 (+contact: haroldtrakhman@gmail.com)"
MATCH_THRESHOLD = 80
MAX_CONCURRENT = 12  # global cap; per-domain cap is 2 inside the limiter

ALL_STATES: list[tuple[str, str]] = [
    ("al", "Alabama"), ("ak", "Alaska"), ("az", "Arizona"),
    ("ar", "Arkansas"), ("ca", "California"), ("co", "Colorado"),
    ("ct", "Connecticut"), ("de", "Delaware"), ("fl", "Florida"),
    ("ga", "Georgia"), ("hi", "Hawaii"), ("id", "Idaho"),
    ("il", "Illinois"), ("in", "Indiana"), ("ia", "Iowa"),
    ("ks", "Kansas"), ("ky", "Kentucky"), ("la", "Louisiana"),
    ("me", "Maine"), ("md", "Maryland"), ("ma", "Massachusetts"),
    ("mi", "Michigan"), ("mn", "Minnesota"), ("ms", "Mississippi"),
    ("mo", "Missouri"), ("mt", "Montana"), ("ne", "Nebraska"),
    ("nv", "Nevada"), ("nh", "New Hampshire"), ("nj", "New Jersey"),
    ("nm", "New Mexico"), ("ny", "New York"), ("nc", "North Carolina"),
    ("nd", "North Dakota"), ("oh", "Ohio"), ("ok", "Oklahoma"),
    ("or", "Oregon"), ("pa", "Pennsylvania"), ("ri", "Rhode Island"),
    ("sc", "South Carolina"), ("sd", "South Dakota"), ("tn", "Tennessee"),
    ("tx", "Texas"), ("ut", "Utah"), ("vt", "Vermont"),
    ("va", "Virginia"), ("wa", "Washington"), ("wv", "West Virginia"),
    ("wi", "Wisconsin"), ("wy", "Wyoming"),
]
FEDERAL_SOURCES: list[str] = ["scrapers.federal.sam_gov",
                              "scrapers.federal.usaspending"]


# ------------------------------------------------------------------
# Logging
# ------------------------------------------------------------------
def setup_logging(verbose: bool = False) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
    fh = logging.FileHandler(ERROR_LOG)
    fh.setLevel(logging.WARNING)
    fh.setFormatter(logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s: %(message)s"))
    logging.getLogger().addHandler(fh)


# ------------------------------------------------------------------
# Data loading
# ------------------------------------------------------------------
def load_contractors() -> list[dict[str, str]]:
    if not CONTRACTORS_CSV.exists():
        logging.warning("contractors.csv not found - creating template")
        CONTRACTORS_CSV.write_text(
            "business_name,email,phone,city,state,zip,primary_trade\n")
        return []
    with CONTRACTORS_CSV.open() as f:
        return list(csv.DictReader(f))


def load_seen() -> dict[str, list[str]]:
    if not SEEN_PATH.exists():
        return {}
    try:
        return json.loads(SEEN_PATH.read_text())
    except json.JSONDecodeError:
        logging.warning("seen_projects.json is corrupt - starting fresh")
        return {}


def save_seen(seen: dict[str, list[str]]) -> None:
    SEEN_PATH.write_text(json.dumps(seen, indent=2, sort_keys=True))


# ------------------------------------------------------------------
# Scraper loading
# ------------------------------------------------------------------
def load_scraper_module(state_code: str):
    # Bid-monitor state modules live under scrapers/bid_states/ so they
    # don't collide with the permit-monitor's scrapers/<state>.py files.
    mod_name = f"scrapers.bid_states.{state_code}"
    return importlib.import_module(mod_name)


def instantiate_scrapers(session: aiohttp.ClientSession,
                         limiter: DomainRateLimiter,
                         include_federal: bool = True) -> list[StateScraper]:
    scrapers: list[StateScraper] = []
    for code, _ in ALL_STATES:
        try:
            mod = load_scraper_module(code)
            cls = getattr(mod, "Scraper", None) or getattr(mod, f"{code.upper()}Scraper", None)
            if cls is None:
                logging.warning("scrapers.%s has no Scraper class - skipping",
                                code)
                continue
            scrapers.append(cls(session, limiter, USER_AGENT))
        except Exception as e:  # noqa: BLE001
            logging.warning("Could not load scrapers.%s: %s", code, e)
    if include_federal:
        for fed in FEDERAL_SOURCES:
            try:
                mod = importlib.import_module(fed)
                cls = getattr(mod, "Scraper")
                scrapers.append(cls(session, limiter, USER_AGENT))
            except Exception as e:  # noqa: BLE001
                logging.warning("Could not load %s: %s", fed, e)
    return scrapers


# ------------------------------------------------------------------
# Async runner
# ------------------------------------------------------------------
async def run_all_scrapers(scrapers: list[StateScraper]) -> list[StateRunResult]:
    sem = asyncio.Semaphore(MAX_CONCURRENT)

    async def _wrap(s: StateScraper) -> StateRunResult:
        async with sem:
            return await s.run()

    return await asyncio.gather(*(_wrap(s) for s in scrapers))


# ------------------------------------------------------------------
# Alert generation
# ------------------------------------------------------------------
ALERT_FIELDS = [
    "alert_date", "alert_type", "contractor_name", "contractor_email",
    "contractor_phone", "project_number", "project_name", "project_state",
    "project_location", "bid_amount", "award_amount", "letting_date",
    "award_date", "source_url", "notes",
]
PROSPECT_FIELDS = [
    "date_found", "contractor_name", "contractor_email", "contractor_phone",
    "contractor_website", "contractor_address", "contractor_city",
    "contractor_state", "contractor_zip", "poc_name",
    "project_name", "project_state", "award_amount", "award_date",
    "source_url", "enrichment_source", "enrichment_status",
]


def _append_csv(path: Path, fields: list[str], rows: list[dict[str, Any]]) -> None:
    # Treat zero-byte files as new so the header gets written even after
    # someone manually truncates the file.
    new_file = (not path.exists()) or path.stat().st_size == 0
    with path.open("a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        if new_file:
            w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, "") for k in fields})


def _today() -> str:
    return datetime.now().date().isoformat()


def build_alerts(results: list[StateRunResult],
                 contractors: list[dict[str, str]],
                 seen: dict[str, list[str]]) -> dict[str, list[dict[str, Any]]]:
    """Produce the four alert types using only items not previously seen.

    Returns a dict with keys: lettings, bids, awards_match, awards_unknown.
    """
    today = _today()
    new_lettings: list[dict[str, Any]] = []
    new_bids: list[dict[str, Any]] = []
    won_by_yours: list[dict[str, Any]] = []
    new_prospects: list[dict[str, Any]] = []

    for r in results:
        seen_for_state = set(seen.get(r.state_code, []))

        # Alert 1: new qualifying lettings
        for lt in r.lettings:
            if lt.project_number in seen_for_state:
                continue
            seen_for_state.add(lt.project_number)
            if not lt.matches_keyword():
                continue
            new_lettings.append({
                "alert_date": today,
                "alert_type": "letting",
                "project_number": lt.project_number,
                "project_name": lt.name,
                "project_state": lt.state,
                "project_location": lt.location,
                "letting_date": lt.letting_date or "",
                "bid_amount": "",
                "award_amount": lt.estimate or "",
                "award_date": "",
                "source_url": lt.source_url,
                "contractor_name": "",
                "contractor_email": "",
                "contractor_phone": "",
                "notes": (lt.description or "")[:300],
            })

        # Alert 2: contractor on bid tab
        for bid in r.bids:
            match = fuzzy_contractor_match(bid.bidder_name, contractors,
                                           MATCH_THRESHOLD)
            if not match:
                continue
            new_bids.append({
                "alert_date": today,
                "alert_type": "bid_submitted",
                "contractor_name": match["business_name"],
                "contractor_email": match.get("email", ""),
                "contractor_phone": match.get("phone", ""),
                "project_number": bid.project_number,
                "project_name": bid.project_name,
                "project_state": bid.state,
                "project_location": "",
                "bid_amount": bid.bid_amount or "",
                "award_amount": "",
                "letting_date": bid.bid_opening_date or "",
                "award_date": "",
                "source_url": bid.source_url,
                "notes": (f"rank {bid.rank} of {bid.total_bidders}"
                          if bid.rank and bid.total_bidders else ""),
            })

        # Alerts 3 & 4: awards
        # Federal sources (US-SAM, US-AWD) are pre-filtered to highway/
        # heavy-construction NAICS at the API level, so the keyword-regex
        # filter is redundant there and rejects valid leads where the
        # description field is sparse. Skip the keyword check for federal.
        is_federal = r.state_code.startswith("US")
        for aw in r.awards:
            key = f"award:{aw.project_number}"
            if key in seen_for_state:
                continue
            seen_for_state.add(key)
            if not is_federal and not aw.matches_keyword():
                continue
            match = fuzzy_contractor_match(aw.contractor_name, contractors,
                                           MATCH_THRESHOLD)
            if match:
                won_by_yours.append({
                    "alert_date": today,
                    "alert_type": "award_match",
                    "contractor_name": match["business_name"],
                    "contractor_email": match.get("email", ""),
                    "contractor_phone": match.get("phone", ""),
                    "project_number": aw.project_number,
                    "project_name": aw.project_name,
                    "project_state": aw.state,
                    "project_location": aw.location,
                    "bid_amount": "",
                    "award_amount": aw.award_amount or "",
                    "letting_date": "",
                    "award_date": aw.award_date or "",
                    "source_url": aw.source_url,
                    "notes": "REACH OUT TODAY",
                })
            else:
                new_prospects.append({
                    "alert_date": today,
                    "alert_type": "award_prospect",
                    "contractor_name": aw.contractor_name,
                    "contractor_email": "",
                    "contractor_phone": "",
                    "project_number": aw.project_number,
                    "project_name": aw.project_name,
                    "project_state": aw.state,
                    "project_location": aw.location,
                    "bid_amount": "",
                    "award_amount": aw.award_amount or "",
                    "letting_date": "",
                    "award_date": aw.award_date or "",
                    "source_url": aw.source_url,
                    "notes": "Unknown contractor - research and add",
                })

        seen[r.state_code] = sorted(seen_for_state)

    return {
        "lettings": new_lettings,
        "bids": new_bids,
        "awards_match": won_by_yours,
        "awards_unknown": new_prospects,
    }


# ------------------------------------------------------------------
# Digest renderer
# ------------------------------------------------------------------
def _money(x: Any) -> str:
    try:
        v = float(x)
        return f"${v:,.0f}"
    except (TypeError, ValueError):
        return str(x or "n/a")


def render_digest(results: list[StateRunResult],
                  alerts: dict[str, list[dict[str, Any]]]) -> str:
    today = datetime.now().strftime("%B %d %Y")
    live = sum(1 for r in results if r.status == "live")
    blocked = sum(1 for r in results if r.status in
                  ("blocked", "auth_required", "format_changed",
                   "timeout", "error"))
    total_lettings = sum(len(r.lettings) for r in results)

    lines: list[str] = []
    lines.append(f"BID MONITOR DIGEST — {today}")
    lines.append(
        f"States checked: {len(results)} | Sources live: {live} | "
        f"Sources blocked: {blocked}")
    lines.append(
        f"New lettings found: {len(alerts['lettings'])} | "
        f"Contractor bids matched: {len(alerts['bids'])}")
    lines.append(
        f"Awards to your list: {len(alerts['awards_match'])} | "
        f"New prospects from awards: {len(alerts['awards_unknown'])}")
    lines.append("")

    if alerts["awards_match"]:
        lines.append("AWARDS — CALL TODAY")
        lines.append("-" * 20)
        for a in alerts["awards_match"]:
            lines.append("CONTRACT AWARDED — REACH OUT TODAY")
            lines.append(f"  Contractor: {a['contractor_name']}")
            lines.append(f"  Contact: {a['contractor_email']} | "
                         f"{a['contractor_phone']}")
            lines.append(f"  Project: {a['project_number']} {a['project_name']}")
            lines.append(f"  Location: {a['project_location']}")
            lines.append(f"  Award: {_money(a['award_amount'])}")
            lines.append(f"  Award date: {a['award_date']}")
            lines.append("  ACTION: Call and email within 24 hours.")
            lines.append("  They need traffic control equipment "
                         "starting in 30-60 days.")
            lines.append(f"  URL: {a['source_url']}")
            lines.append("")

    if alerts["bids"]:
        lines.append("BIDS SUBMITTED — Monitor for award")
        lines.append("-" * 36)
        for a in alerts["bids"]:
            lines.append("BID SUBMITTED — Contractor Match")
            lines.append(f"  Contractor: {a['contractor_name']}")
            lines.append(f"  Contact: {a['contractor_email']} | "
                         f"{a['contractor_phone']}")
            lines.append(f"  State: {a['project_state']}")
            lines.append(f"  Project: {a['project_number']} {a['project_name']}")
            lines.append(f"  Their bid: {_money(a['bid_amount'])} "
                         f"({a.get('notes') or ''})")
            lines.append(f"  Letting date: {a['letting_date']}")
            lines.append("  ACTION: Monitor for award. Reach out day of award.")
            lines.append(f"  URL: {a['source_url']}")
            lines.append("")

    if alerts["lettings"]:
        lines.append("NEW LETTINGS — Upcoming opportunities")
        lines.append("-" * 39)
        # Top 10 by estimate (treat blanks as 0 so they sort last)
        ranked = sorted(
            alerts["lettings"],
            key=lambda x: float(x["award_amount"]) if x["award_amount"] else 0,
            reverse=True,
        )[:10]
        for a in ranked:
            lines.append(f"NEW LETTING — {a['project_state']}")
            lines.append(f"  Project: {a['project_number']} {a['project_name']}")
            lines.append(f"  Location: {a['project_location']}, "
                         f"{a['project_state']}")
            lines.append(f"  Letting Date: {a['letting_date']}")
            lines.append(f"  Estimate: {_money(a['award_amount'])}")
            lines.append(f"  Description: {a.get('notes', '')[:200]}")
            lines.append(f"  URL: {a['source_url']}")
            lines.append("")

    if alerts["awards_unknown"]:
        lines.append("NEW PROSPECTS FROM AWARDS")
        lines.append("-" * 26)
        for a in alerts["awards_unknown"]:
            lines.append("NEW PROSPECT — Award to Unknown Contractor")
            lines.append(f"  Contractor: {a['contractor_name']} (not in your list)")
            email = a.get("contractor_email") or ""
            phone = a.get("contractor_phone") or ""
            site = a.get("contractor_website") or ""
            addr_bits = [a.get("contractor_address"),
                         a.get("contractor_city"),
                         a.get("contractor_state"),
                         a.get("contractor_zip")]
            addr = ", ".join(b for b in addr_bits if b)
            if email or phone:
                lines.append(f"  Contact: {email or 'n/a'} | "
                             f"{phone or 'n/a'}")
            else:
                lines.append("  Contact: not found - manual research needed")
            if a.get("poc_name"):
                lines.append(f"  POC: {a['poc_name']}")
            if site:
                lines.append(f"  Website: {site}")
            if addr:
                lines.append(f"  Address: {addr}")
            lines.append(f"  Project: {a['project_name']}")
            lines.append(f"  Award: {_money(a['award_amount'])} | "
                         f"State: {a['project_state']}")
            src = a.get("enrichment_source") or ""
            if src and src != "none":
                lines.append(f"  Enrichment source: {src}")
            lines.append("  ACTION: Research and add to outreach list.")
            lines.append(f"  URL: {a['source_url']}")
            lines.append("")

    return "\n".join(lines)


def write_digest(text: str) -> Path:
    DIGEST_DIR.mkdir(exist_ok=True)
    path = DIGEST_DIR / f"digest-{_today()}.txt"
    path.write_text(text)
    return path


# ------------------------------------------------------------------
# Modes
# ------------------------------------------------------------------
async def mode_setup() -> int:
    print("Bid Monitor — SETUP")
    print("Validating sources and pulling 90-day baseline...\n")
    contractors = load_contractors()
    limiter = DomainRateLimiter(per_domain=2)

    async with aiohttp.ClientSession() as session:
        scrapers = instantiate_scrapers(session, limiter)
        results = await run_all_scrapers(scrapers)

    seen: dict[str, list[str]] = {}
    historical_matches = 0
    for r in results:
        ids = [lt.project_number for lt in r.lettings]
        ids += [f"award:{aw.project_number}" for aw in r.awards]
        if ids:
            seen[r.state_code] = sorted(set(ids))
        for aw in r.awards:
            if fuzzy_contractor_match(aw.contractor_name, contractors,
                                      MATCH_THRESHOLD):
                historical_matches += 1
        sym = "✓" if r.status == "live" else "✗"
        count = len(r.lettings) + len(r.awards)
        if r.status == "live":
            print(f"  [{sym}] {r.state_name:<14} live, {count} projects indexed")
        else:
            print(f"  [{sym}] {r.state_name:<14} {r.status} - "
                  f"{r.error or ''}")

    save_seen(seen)
    SOURCE_STATUS.write_text(json.dumps(
        {r.state_code: {"status": r.status, "error": r.error,
                        "lettings": len(r.lettings),
                        "awards": len(r.awards)} for r in results},
        indent=2))

    live_states = [r for r in results if r.status == "live"]
    needs_review = [r.state_name for r in results if r.status != "live"]
    total_indexed = sum(len(v) for v in seen.values())

    print()
    print("=" * 50)
    print("SETUP SUMMARY")
    print("=" * 50)
    print(f"Total states with live bid data: {len(live_states)}/50")
    print(f"Total projects indexed as baseline: {total_indexed:,}")
    print(f"Contractor list matches found in historical data: "
          f"{historical_matches}")
    if needs_review:
        print(f"States needing manual review: {', '.join(needs_review)}")
    return 0


async def mode_run() -> int:
    contractors = load_contractors()
    seen = load_seen()
    limiter = DomainRateLimiter(per_domain=2)

    async with aiohttp.ClientSession() as session:
        scrapers = instantiate_scrapers(session, limiter)
        results = await run_all_scrapers(scrapers)

    alerts = build_alerts(results, contractors, seen)

    # Enrich unknown-contractor prospects so the digest & CSV carry
    # email / phone / address. Uses SAM.gov first (if SAM_GOV_API_KEY
    # is set), then USASpending, then a domain-guess heuristic. Cached
    # in enrichment_cache.json.
    if alerts["awards_unknown"]:
        async with aiohttp.ClientSession() as enrich_sess:
            unique_names = list({a["contractor_name"]
                                 for a in alerts["awards_unknown"]
                                 if a.get("contractor_name")})
            from scrapers.enrich import enrich_many  # local import
            enrichments = await enrich_many(unique_names, enrich_sess,
                                            concurrency=4)
        for a in alerts["awards_unknown"]:
            e = enrichments.get(a["contractor_name"])
            if not e:
                continue
            a["contractor_email"] = e.email
            a["contractor_phone"] = e.phone
            a["contractor_website"] = e.website
            a["contractor_address"] = e.address
            a["contractor_city"] = e.city
            a["contractor_state"] = e.state
            a["contractor_zip"] = e.zip
            a["poc_name"] = e.poc_name
            a["enrichment_source"] = e.source

    # Persist
    save_seen(seen)
    rows_for_alerts = (alerts["lettings"] + alerts["bids"]
                       + alerts["awards_match"] + alerts["awards_unknown"])
    if rows_for_alerts:
        _append_csv(ALERTS_PATH, ALERT_FIELDS, rows_for_alerts)
    if alerts["awards_unknown"]:
        prospect_rows = [{
            "date_found": _today(),
            "contractor_name": a["contractor_name"],
            "contractor_email": a.get("contractor_email", ""),
            "contractor_phone": a.get("contractor_phone", ""),
            "contractor_website": a.get("contractor_website", ""),
            "contractor_address": a.get("contractor_address", ""),
            "contractor_city": a.get("contractor_city", ""),
            "contractor_state": a.get("contractor_state", ""),
            "contractor_zip": a.get("contractor_zip", ""),
            "poc_name": a.get("poc_name", ""),
            "project_name": a["project_name"],
            "project_state": a["project_state"],
            "award_amount": a["award_amount"],
            "award_date": a["award_date"],
            "source_url": a["source_url"],
            "enrichment_source": a.get("enrichment_source", ""),
            "enrichment_status": (
                "enriched" if (a.get("contractor_email")
                               or a.get("contractor_phone"))
                else "needs_manual_research"),
        } for a in alerts["awards_unknown"]]
        _append_csv(PROSPECTS_PATH, PROSPECT_FIELDS, prospect_rows)

    digest = render_digest(results, alerts)
    digest_path = write_digest(digest)
    print(digest)
    print(f"\nDigest saved to {digest_path}")

    SOURCE_STATUS.write_text(json.dumps(
        {r.state_code: {"status": r.status, "error": r.error,
                        "lettings": len(r.lettings),
                        "awards": len(r.awards)} for r in results},
        indent=2))
    return 0


def mode_status() -> int:
    print("Bid Monitor — STATUS")
    print("=" * 50)
    if not SOURCE_STATUS.exists() or SOURCE_STATUS.stat().st_size == 0:
        print("No source_status.json yet. Run --setup or --run first.")
        return 0
    try:
        data = json.loads(SOURCE_STATUS.read_text())
    except json.JSONDecodeError:
        print("source_status.json is corrupt. Run --setup again.")
        return 0
    # Filter to bid-monitor entries only. The permit project may write
    # to the same filename but with a different schema; ignore those.
    bid_entries = {k: v for k, v in data.items()
                   if isinstance(v, dict) and "lettings" in v
                   and "awards" in v}
    if not bid_entries:
        print("No bid-monitor data in source_status.json yet.")
        print("Run `python bids.py --setup` to populate it.")
        return 0
    seen = load_seen()
    live = [k for k, v in bid_entries.items() if v.get("status") == "live"]
    blocked = [k for k, v in bid_entries.items() if v.get("status") != "live"]
    total = sum(len(v) for v in seen.values())
    print(f"States live:    {len(live)}/{len(bid_entries)}")
    print(f"States blocked: {len(blocked)}")
    print(f"Projects indexed (cumulative): {total:,}")
    print()
    print(f"{'STATE':<8}{'STATUS':<18}{'LETTINGS':>10}{'AWARDS':>10}  ERROR")
    print("-" * 70)
    for state, v in sorted(bid_entries.items()):
        err = (v.get("error") or "")[:40]
        print(f"{state:<8}{v.get('status','?'):<18}"
              f"{v.get('lettings',0):>10}{v.get('awards',0):>10}  {err}")
    return 0


# ------------------------------------------------------------------
# CLI
# ------------------------------------------------------------------
def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Nationwide DOT Bid Monitor")
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--setup", action="store_true",
                   help="validate sources and pull 90-day baseline")
    g.add_argument("--run", action="store_true",
                   help="daily run: fetch new activity and alert")
    g.add_argument("--status", action="store_true",
                   help="print coverage report")
    p.add_argument("--verbose", action="store_true")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    setup_logging(args.verbose)
    try:
        if args.setup:
            return asyncio.run(mode_setup())
        if args.run:
            return asyncio.run(mode_run())
        if args.status:
            return mode_status()
    except KeyboardInterrupt:
        return 130
    return 0


if __name__ == "__main__":
    sys.exit(main())
