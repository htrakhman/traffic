#!/usr/bin/env python3
"""
Nationwide Permit Pull Monitor.

Modes:
  --setup    Discover sources, pull the last N days as a baseline (no alerts).
  --run      Daily run: diff against seen_permits.json, write a digest, alert.
  --status   Show which sources are live / blocked / auth_required.

Each state scraper runs concurrently and is fully isolated — one state's
failure can never affect another. All matching, de-duping, and alerting
happens in this file; the scrapers only return normalized Permit records.
"""

from __future__ import annotations

import argparse
import asyncio
import csv
import json
import logging
import re
import sys
import traceback
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import aiohttp
from fuzzywuzzy import fuzz, process

# We import the scraper package lazily inside main() so --status doesn't fail
# if a single state file has a syntax error.
HERE = Path(__file__).resolve().parent

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("permits")


# ---------------------------------------------------------------------------
# Config + persistence
# ---------------------------------------------------------------------------
def load_config() -> dict[str, Any]:
    with (HERE / "config.json").open("r", encoding="utf-8") as fh:
        return json.load(fh)


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        with path.open("r", encoding="utf-8") as fh:
            return json.load(fh)
    except json.JSONDecodeError:
        log.warning("malformed JSON at %s — starting fresh", path)
        return default


def save_json(path: Path, payload: Any) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("w", encoding="utf-8") as fh:
        json.dump(payload, fh, indent=2, sort_keys=True)
    tmp.replace(path)


def load_contractors(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        log.warning("contractors.csv not found at %s — no matches will fire", path)
        return []
    with path.open("r", encoding="utf-8", newline="") as fh:
        return [dict(row) for row in csv.DictReader(fh)]


# ---------------------------------------------------------------------------
# Matching
# ---------------------------------------------------------------------------
_NORMALIZE_RE = re.compile(r"\b(inc|llc|llp|corp|co|company|ltd|limited|"
                           r"the|and|of|&)\b", re.IGNORECASE)


def normalize_name(s: str) -> str:
    s = s or ""
    s = _NORMALIZE_RE.sub(" ", s)
    s = re.sub(r"[^A-Za-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s


def match_contractor(applicant: str,
                     contractors: list[dict[str, str]],
                     threshold: int = 80,
                     partial_threshold: int = 90
                     ) -> tuple[dict[str, str] | None, int]:
    """Return (matched_contractor_row, score) or (None, best_score).

    Tries token_set_ratio for normal matching, then partial_ratio for the
    truncation case where government systems chop the applicant field.
    """
    if not applicant or not contractors:
        return None, 0

    norm_app = normalize_name(applicant)
    if not norm_app:
        return None, 0

    choices = {normalize_name(c.get("business_name", "")): c
               for c in contractors if c.get("business_name")}
    choices = {k: v for k, v in choices.items() if k}
    if not choices:
        return None, 0

    # Pass 1 — token_set_ratio (handles word-order and minor typos)
    best, score = process.extractOne(norm_app, list(choices.keys()),
                                     scorer=fuzz.token_set_ratio)
    if score >= threshold:
        return choices[best], score

    # Pass 2 — partial_ratio for truncated fields. Only credible when the
    # candidate is a strict substring or vice-versa.
    if len(norm_app) <= 25 or any(len(k) <= 25 for k in choices):
        best2, score2 = process.extractOne(norm_app, list(choices.keys()),
                                           scorer=fuzz.partial_ratio)
        if score2 >= partial_threshold:
            return choices[best2], score2
        if score2 > score:
            best, score = best2, score2

    return None, score


def is_relevant_permit(permit, trade_keywords: list[str],
                       permit_type_keywords: list[str]) -> bool:
    """Check if the permit type or work description hits a target keyword."""
    haystack = " ".join([
        permit.permit_type or "",
        permit.work_description or "",
    ]).lower()
    if not haystack:
        return False
    for kw in trade_keywords + permit_type_keywords:
        if kw.lower() in haystack:
            return True
    return False


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------
def append_match(matches_path: Path, *,
                 contractor: dict[str, str], permit, score: int) -> None:
    new = not matches_path.exists() or matches_path.stat().st_size == 0
    with matches_path.open("a", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh)
        if new:
            w.writerow([
                "match_date", "contractor_name", "contractor_email",
                "contractor_phone", "applicant_phone_from_permit",
                "applicant_license", "applicant_license_type",
                "permit_number", "permit_location", "work_description",
                "issue_date", "source_state", "source_municipality",
                "match_score", "source_url",
            ])
        w.writerow([
            datetime.now(timezone.utc).date().isoformat(),
            contractor.get("business_name", ""),
            contractor.get("email", ""),
            contractor.get("phone", ""),
            permit.applicant_phone,
            permit.applicant_license,
            permit.applicant_license_type,
            permit.permit_number,
            permit.job_address,
            permit.work_description,
            permit.issue_date or permit.filed_date,
            permit.source_state,
            permit.source_municipality,
            score,
            permit.source_url,
        ])


def append_prospect(prospects_path: Path, permit) -> None:
    new = not prospects_path.exists() or prospects_path.stat().st_size == 0
    with prospects_path.open("a", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh)
        if new:
            w.writerow([
                "date_found", "applicant_name", "applicant_phone",
                "applicant_license", "applicant_license_type",
                "applicant_city", "applicant_state", "applicant_zip",
                "permit_number", "permit_location", "work_description",
                "issue_date", "source_state", "source_municipality",
                "source_url",
                "enriched_email", "enriched_website", "enriched_facebook",
                "enrichment_status",
            ])
        w.writerow([
            datetime.now(timezone.utc).date().isoformat(),
            permit.applicant_name,
            permit.applicant_phone,
            permit.applicant_license,
            permit.applicant_license_type,
            permit.applicant_city,
            permit.applicant_state,
            permit.applicant_zip,
            permit.permit_number,
            permit.job_address,
            permit.work_description,
            permit.issue_date or permit.filed_date,
            permit.source_state,
            permit.source_municipality,
            permit.source_url,
            "", "", "",     # enriched_* — blank until enrich_prospects.py fills them
            "",             # enrichment_status — blank to start
        ])


# ---------------------------------------------------------------------------
# Digest writer
# ---------------------------------------------------------------------------
def write_digest(digests_dir: Path, *,
                 states_checked: int,
                 sources_live: int,
                 sources_blocked: int,
                 new_permits: int,
                 matches: list[tuple[dict[str, str], Any, int]],
                 prospects: list[Any]) -> Path:
    digests_dir.mkdir(parents=True, exist_ok=True)
    today = datetime.now(timezone.utc).date()
    path = digests_dir / f"{today.isoformat()}.txt"

    out: list[str] = []
    out.append(f"PERMIT MONITOR DIGEST — {today.strftime('%B %d %Y')}")
    out.append(
        f"States checked: {states_checked} | "
        f"Sources live: {sources_live} | "
        f"Sources blocked: {sources_blocked}"
    )
    out.append(
        f"New permits found: {new_permits} | "
        f"Contractor matches: {len(matches)} | "
        f"New prospects: {len(prospects)}"
    )
    out.append("")
    out.append("CONTRACTOR MATCHES (reach out today)")
    out.append("--------------------------------------")
    if not matches:
        out.append("(none)")
    for c, p, score in matches:
        out.append(c.get("business_name", ""))
        contact_bits = []
        if c.get("email"):
            contact_bits.append(f"Email: {c['email']}")
        if c.get("phone"):
            contact_bits.append(f"Phone: {c['phone']}")
        if contact_bits:
            out.append(" | ".join(contact_bits))
        muni = p.source_municipality or p.source_state
        out.append(f"Permit: {muni} {p.permit_number}")
        if p.job_address:
            out.append(f"Location: {p.job_address}")
        if p.work_description:
            out.append(f"Work: {p.work_description}")
        if p.issue_date or p.filed_date:
            out.append(f"Filed: {p.issue_date or p.filed_date}")
        out.append(f"Match score: {score}")
        if p.source_url:
            out.append(f"Source: {p.source_url}")
        out.append("")

    out.append("NEW PROSPECTS (not in your list yet)")
    out.append("--------------------------------------")
    if not prospects:
        out.append("(none)")
    for p in prospects[:50]:    # cap noise in the digest
        out.append(p.applicant_name or "(applicant blank)")
        muni = p.source_municipality or p.source_state
        out.append(f"Permit: {muni} {p.permit_number}")
        if p.work_description:
            out.append(f"Work: {p.work_description}")
        if p.issue_date or p.filed_date:
            out.append(f"Filed: {p.issue_date or p.filed_date}")
        out.append(f"Source: {p.source_municipality or p.source_state}")
        out.append("")
    if len(prospects) > 50:
        out.append(f"... and {len(prospects) - 50} more — see prospects.csv")

    path.write_text("\n".join(out), encoding="utf-8")
    return path


# ---------------------------------------------------------------------------
# Error log
# ---------------------------------------------------------------------------
def log_errors(error_log_path: Path, state: str, errors: list[str]) -> None:
    if not errors:
        return
    with error_log_path.open("a", encoding="utf-8") as fh:
        ts = datetime.now(timezone.utc).isoformat()
        for e in errors:
            fh.write(f"[{ts}] {state}: {e}\n")


# ---------------------------------------------------------------------------
# Scraper dispatch
# ---------------------------------------------------------------------------
async def run_one_state(state: str, cls, *,
                        session: aiohttp.ClientSession,
                        config: dict[str, Any],
                        lookback_days: int):
    try:
        scraper = cls(session=session, config=config, lookback_days=lookback_days)
        return await scraper.run()
    except Exception as e:                                                # noqa: BLE001
        # Last-resort fence — any unhandled exception inside a scraper
        # gets converted to a synthetic ScrapeResult so one bad state
        # cannot poison the run.
        from scrapers.base import ScrapeResult
        result = ScrapeResult(state=state)
        result.errors.append(f"top-level: {type(e).__name__}: {e}\n"
                             f"{traceback.format_exc()}")
        result.sources[f"{state}_topfail"] = {
            "status": "error",
            "reason": f"{type(e).__name__}: {e}",
        }
        return result


async def run_all(*, mode: str, config: dict[str, Any]) -> dict[str, Any]:
    from scrapers import iter_scraper_modules

    if mode == "setup":
        lookback = int(config.get("baseline_lookback_days", 30))
    else:
        lookback = int(config.get("daily_lookback_days", 3))

    max_concurrent = int(config.get("max_concurrent_scrapers", 12))
    sem = asyncio.Semaphore(max_concurrent)

    async def _wrapped(state, cls, session):
        async with sem:
            return await run_one_state(state, cls, session=session,
                                       config=config, lookback_days=lookback)

    timeout = aiohttp.ClientTimeout(total=config.get("request_timeout_seconds", 45) * 2)
    connector = aiohttp.TCPConnector(limit=max_concurrent * 2,
                                     ssl=False)        # some gov sites still misconfigure SSL
    async with aiohttp.ClientSession(connector=connector,
                                     timeout=timeout) as session:
        tasks = [_wrapped(state, cls, session)
                 for state, cls in iter_scraper_modules()]
        if not tasks:
            log.error("No scraper modules found under scrapers/. Did you run install?")
            return {"results": [], "lookback_days": lookback}
        results = await asyncio.gather(*tasks, return_exceptions=False)

    return {"results": results, "lookback_days": lookback}


# ---------------------------------------------------------------------------
# Modes
# ---------------------------------------------------------------------------
def cmd_setup(config: dict[str, Any]) -> int:
    files = config["files"]
    bundle = asyncio.run(run_all(mode="setup", config=config))
    results = bundle["results"]
    contractors = load_contractors(HERE / files["contractors"])
    seen = load_json(HERE / files["seen_permits"], {})
    source_status = load_json(HERE / files["source_status"], {})
    error_log = HERE / files["error_log"]

    new_permits = 0
    for r in results:
        # Persist all baseline permits to seen_permits.json — but do NOT alert.
        bucket = seen.setdefault(r.state, [])
        existing = set(bucket)
        for p in r.permits:
            if p.permit_number and p.permit_number not in existing:
                bucket.append(p.permit_number)
                existing.add(p.permit_number)
                new_permits += 1
        for k, v in r.sources.items():
            prev = source_status.get(k, {})
            v["permits_found_lifetime"] = (
                prev.get("permits_found_lifetime", 0)
                + v.get("permits_found_this_run", 0)
            )
            source_status[k] = v
        log_errors(error_log, r.state, r.errors)

    save_json(HERE / files["seen_permits"], seen)
    save_json(HERE / files["source_status"], source_status)

    # Coverage report
    states_with_live = {r.state for r in results
                        if any(s.get("status") == "live"
                               for s in r.sources.values())}
    states_with_zero = sorted({r.state for r in results} - states_with_live)
    print()
    print("=" * 60)
    print("SETUP COMPLETE")
    print("=" * 60)
    print(f"States scanned:           {len(results)}")
    print(f"States with live sources: {len(states_with_live)}")
    print(f"Baseline permits saved:   {new_permits}")
    print(f"Contractors loaded:       {len(contractors)}")
    print(f"Lookback window:          {bundle['lookback_days']} days")
    if states_with_zero:
        print()
        print("STATES WITH ZERO LIVE SOURCES (need wiring up):")
        # 8 per row
        for i in range(0, len(states_with_zero), 8):
            print("  " + " ".join(states_with_zero[i:i + 8]))
    print()
    print("Run `python permits.py --status` for the full source matrix.")
    return 0


def cmd_run(config: dict[str, Any]) -> int:
    files = config["files"]
    bundle = asyncio.run(run_all(mode="run", config=config))
    results = bundle["results"]
    contractors = load_contractors(HERE / files["contractors"])
    seen = load_json(HERE / files["seen_permits"], {})
    source_status = load_json(HERE / files["source_status"], {})
    error_log = HERE / files["error_log"]

    matches: list[tuple[dict[str, str], Any, int]] = []
    prospects: list[Any] = []
    new_permit_count = 0
    sources_live = 0
    sources_blocked = 0

    threshold = int(config.get("match_threshold", 80))
    partial_threshold = int(config.get("partial_match_threshold", 90))
    trade_kw = config.get("trade_keywords", [])
    type_kw = config.get("permit_type_keywords", [])

    for r in results:
        bucket = seen.setdefault(r.state, [])
        existing = set(bucket)
        for p in r.permits:
            if not p.permit_number or p.permit_number in existing:
                continue
            bucket.append(p.permit_number)
            existing.add(p.permit_number)
            new_permit_count += 1

            # Match against contractors
            c, score = match_contractor(
                p.applicant_name, contractors,
                threshold=threshold, partial_threshold=partial_threshold)
            if c:
                matches.append((c, p, score))
                append_match(HERE / files["matches"],
                             contractor=c, permit=p, score=score)
                continue

            # Else — promote to prospect if relevant
            if is_relevant_permit(p, trade_kw, type_kw):
                prospects.append(p)
                append_prospect(HERE / files["prospects"], p)

        for k, v in r.sources.items():
            prev = source_status.get(k, {})
            v["permits_found_lifetime"] = (
                prev.get("permits_found_lifetime", 0)
                + v.get("permits_found_this_run", 0)
            )
            source_status[k] = v
            if v.get("status") == "live":
                sources_live += 1
            elif v.get("status") in ("blocked", "auth_required"):
                sources_blocked += 1
        log_errors(error_log, r.state, r.errors)

    save_json(HERE / files["seen_permits"], seen)
    save_json(HERE / files["source_status"], source_status)

    digest_path = write_digest(
        HERE / files["digests_dir"],
        states_checked=len(results),
        sources_live=sources_live,
        sources_blocked=sources_blocked,
        new_permits=new_permit_count,
        matches=matches,
        prospects=prospects,
    )
    print(f"Digest written: {digest_path}")
    print(f"  states={len(results)} live={sources_live} "
          f"blocked={sources_blocked} new_permits={new_permit_count} "
          f"matches={len(matches)} prospects={len(prospects)}")
    return 0


def cmd_status(config: dict[str, Any]) -> int:
    files = config["files"]
    source_status = load_json(HERE / files["source_status"], {})
    if not source_status:
        print("No source_status.json yet — run `python permits.py --setup` first.")
        return 0

    by_status: dict[str, list[tuple[str, dict[str, Any]]]] = {}
    for k, v in sorted(source_status.items()):
        by_status.setdefault(v.get("status", "unknown"), []).append((k, v))

    label_order = ["live", "blocked", "auth_required",
                   "not_implemented", "error", "unknown"]
    print()
    print(f"SOURCE STATUS ({len(source_status)} sources)")
    print("=" * 60)
    for label in label_order:
        items = by_status.get(label, [])
        if not items:
            continue
        print(f"\n[{label.upper()}] {len(items)}")
        for k, v in items:
            life = v.get("permits_found_lifetime", 0)
            last = v.get("last_checked") or v.get("last_attempted") or "—"
            extra = ""
            if v.get("reason"):
                extra = f" :: {v['reason']}"
            print(f"  {k:<28s}  lifetime={life:<6}  last={last}{extra}")
    print()
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main(argv: list[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    p = argparse.ArgumentParser(description=__doc__)
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--setup",  action="store_true",
                   help="Index sources & pull baseline (no alerts)")
    g.add_argument("--run",    action="store_true",
                   help="Daily run: diff, alert, write digest")
    g.add_argument("--status", action="store_true",
                   help="Show live/blocked/auth_required matrix")
    args = p.parse_args(argv)

    config = load_config()
    if args.setup:
        return cmd_setup(config)
    if args.run:
        return cmd_run(config)
    if args.status:
        return cmd_status(config)
    return 1


if __name__ == "__main__":
    sys.exit(main())
