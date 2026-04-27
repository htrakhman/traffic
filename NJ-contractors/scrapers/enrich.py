"""
Prospect enrichment.

When the bid monitor flags an unknown contractor (Alert Type 4), we
need contact info before the user can reach out. This module pulls
business name, address, phone, and email from public sources:

  1. SAM.gov entity-information API (preferred, structured, free)
       https://api.sam.gov/entity-information/v3/entities
       Requires SAM_GOV_API_KEY env var.

  2. USASpending recipient profile (free, no key)
       Returns aggregate award history but limited contact detail.
       Used as a backstop when SAM has no record.

  3. Web heuristic fallback
       Tries to guess <company>.com, fetches /contact, and pulls
       any visible email/phone via regex.

Cached by company name in `enrichment_cache.json` so we never hammer
SAM/USASpending for the same prospect twice.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any

import aiohttp

logger = logging.getLogger("bids.enrich")

CACHE_PATH = Path(__file__).resolve().parents[1] / "enrichment_cache.json"
SAM_API = "https://api.sam.gov/entity-information/v3/entities"
USASPEND_API = ("https://api.usaspending.gov/api/v2/recipient/"
                "duns/?award_type=contracts")

EMAIL_RE = re.compile(r"[\w\.+-]+@[\w-]+\.[\w\.-]+")
PHONE_RE = re.compile(r"\(?\d{3}\)?[\s\.-]?\d{3}[\s\.-]?\d{4}")


@dataclass
class Enrichment:
    business_name: str = ""
    legal_name: str = ""
    dba: str = ""
    email: str = ""
    phone: str = ""
    address: str = ""
    city: str = ""
    state: str = ""
    zip: str = ""
    website: str = ""
    poc_name: str = ""
    source: str = ""           # which provider supplied the data
    confidence: str = "low"    # low | medium | high

    def has_contact(self) -> bool:
        return bool(self.email or self.phone)


# ---------------------------------------------------------------------
# Cache
# ---------------------------------------------------------------------
def _load_cache() -> dict[str, dict[str, Any]]:
    if not CACHE_PATH.exists():
        return {}
    try:
        return json.loads(CACHE_PATH.read_text())
    except json.JSONDecodeError:
        return {}


def _save_cache(cache: dict[str, dict[str, Any]]) -> None:
    try:
        CACHE_PATH.write_text(json.dumps(cache, indent=2, sort_keys=True))
    except OSError as e:  # noqa: BLE001
        logger.warning("Could not write enrichment cache: %s", e)


def _cache_key(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip().lower())


# ---------------------------------------------------------------------
# SAM.gov entity lookup
# ---------------------------------------------------------------------
async def _sam_lookup(name: str,
                      session: aiohttp.ClientSession) -> Enrichment | None:
    api_key = os.environ.get("SAM_GOV_API_KEY")
    if not api_key:
        return None
    params = {
        "api_key": api_key,
        "qterms": name,
        "registrationStatus": "A",  # active registrants
        "includeSections": ("entityRegistration,coreData,assertions,"
                            "pointsOfContact"),
    }
    try:
        async with session.get(SAM_API, params=params,
                               timeout=aiohttp.ClientTimeout(total=20)) as r:
            if r.status >= 400:
                return None
            data = await r.json(content_type=None)
    except (aiohttp.ClientError, asyncio.TimeoutError, json.JSONDecodeError):
        return None
    entities = data.get("entityData") or []
    if not entities:
        return None
    e = entities[0]
    reg = e.get("entityRegistration") or {}
    core = e.get("coreData") or {}
    poc_list = (e.get("pointsOfContact") or {})
    # pointsOfContact has a few subkeys; government and electronic POC
    # carry the contact info we want.
    poc = (poc_list.get("governmentBusinessPOC")
           or poc_list.get("electronicBusinessPOC")
           or poc_list.get("pastPerformancePOC")
           or {})
    addr = (core.get("physicalAddress") or core.get("mailingAddress") or {})
    return Enrichment(
        business_name=reg.get("legalBusinessName") or name,
        legal_name=reg.get("legalBusinessName") or "",
        dba=reg.get("dbaName") or "",
        email=(poc.get("email") or "").strip(),
        phone=(poc.get("usPhone") or poc.get("phone") or "").strip(),
        address=addr.get("addressLine1") or "",
        city=addr.get("city") or "",
        state=(addr.get("stateOrProvinceCode")
               or addr.get("state") or ""),
        zip=addr.get("zipCode") or "",
        website=(core.get("entityInformation") or {}).get("entityURL") or "",
        poc_name=" ".join(filter(None, [
            poc.get("firstName"), poc.get("lastName")
        ])).strip(),
        source="sam.gov",
        confidence="high",
    )


# ---------------------------------------------------------------------
# USASpending recipient profile
# ---------------------------------------------------------------------
async def _usaspending_lookup(name: str,
                              session: aiohttp.ClientSession
                              ) -> Enrichment | None:
    # USASpending exposes /api/v2/recipient/?keyword= which returns
    # recipient records; from there we can hit /api/v2/recipient/<id>/
    # for full detail (address + duns/uei).
    search_url = "https://api.usaspending.gov/api/v2/recipient/"
    try:
        async with session.get(search_url,
                               params={"keyword": name, "limit": 5},
                               timeout=aiohttp.ClientTimeout(total=20)) as r:
            if r.status >= 400:
                return None
            data = await r.json(content_type=None)
    except (aiohttp.ClientError, asyncio.TimeoutError, json.JSONDecodeError):
        return None
    results = data.get("results") or []
    if not results:
        return None
    top = results[0]
    rid = top.get("id")
    detail = {}
    if rid:
        try:
            async with session.get(f"{search_url}{rid}/",
                                   timeout=aiohttp.ClientTimeout(total=20)
                                   ) as r2:
                if r2.status < 400:
                    detail = await r2.json(content_type=None)
        except (aiohttp.ClientError, asyncio.TimeoutError,
                json.JSONDecodeError):
            pass
    loc = detail.get("location") or {}
    return Enrichment(
        business_name=top.get("name") or name,
        address=loc.get("address_line1") or "",
        city=loc.get("city_name") or "",
        state=loc.get("state_code") or "",
        zip=loc.get("zip5") or "",
        source="usaspending.gov",
        confidence="medium",
    )


# ---------------------------------------------------------------------
# Web heuristic — guess <slug>.com, scrape /contact for an email/phone
# ---------------------------------------------------------------------
_SUFFIXES = {
    "inc", "llc", "lp", "ltd", "co", "corp", "corporation", "company",
    "construction", "constructors", "paving", "contracting",
    "contractors", "engineering", "infrastructure", "industries",
    "group", "holdings", "services", "ent", "enterprises",
}
_DIRECTIONS = {"east", "west", "north", "south", "central"}


def _slug_candidates(name: str) -> list[str]:
    """Return slug candidates ranked from most-likely-correct domain down.

    For "KIEWIT INFRASTRUCTURE WEST CO." we want to try:
      kiewit, kiewitinfrastructure, kiewitinfrastructurewest
    The first one (just the brand word) wins for almost every major
    federal contractor.
    """
    cleaned = re.sub(r"[^a-zA-Z0-9 ]+", " ", name)
    words = [w for w in cleaned.lower().split()
             if w and w not in _SUFFIXES and w not in _DIRECTIONS]
    cands: list[str] = []
    if words:
        cands.append(words[0])
        if len(words) >= 2:
            cands.append(words[0] + words[1])
        if len(words) >= 3:
            cands.append(words[0] + words[1] + words[2])
    # Also the full collapsed form as a final fallback
    full = re.sub(r"[^a-z0-9]+", "", name.lower())
    for suf in ("inc", "llc", "co", "corp", "company"):
        if full.endswith(suf):
            full = full[: -len(suf)]
            break
    if full and full not in cands:
        cands.append(full)
    # Dedupe + min length
    seen = set()
    out: list[str] = []
    for c in cands:
        if len(c) >= 4 and c not in seen:
            out.append(c); seen.add(c)
    return out


async def _web_heuristic(name: str,
                         session: aiohttp.ClientSession) -> Enrichment | None:
    candidates: list[str] = []
    for slug in _slug_candidates(name):
        candidates.extend([f"https://www.{slug}.com",
                           f"https://{slug}.com",
                           f"https://www.{slug}.net"])
    if not candidates:
        return None
    for url in candidates:
        try:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=10),
                                   allow_redirects=True) as r:
                if r.status >= 400:
                    continue
                home = await r.text(errors="replace")
        except (aiohttp.ClientError, asyncio.TimeoutError):
            continue
        contact_html = home
        # Try /contact too
        for path in ("/contact", "/contact-us", "/about"):
            try:
                async with session.get(url + path,
                                       timeout=aiohttp.ClientTimeout(total=10),
                                       allow_redirects=True) as r:
                    if r.status < 400:
                        contact_html += "\n" + await r.text(errors="replace")
            except (aiohttp.ClientError, asyncio.TimeoutError):
                pass
        emails = EMAIL_RE.findall(contact_html)
        phones = PHONE_RE.findall(contact_html)
        # Prefer a contact-looking email (info@, contact@, sales@)
        emails = [e for e in emails if not e.lower().endswith(
            (".png", ".jpg", ".gif", ".webp"))]
        emails.sort(key=lambda e: 0 if e.split("@")[0].lower() in
                    ("info", "contact", "sales", "office", "admin",
                     "estimating", "bids") else 1)
        return Enrichment(
            business_name=name,
            email=emails[0] if emails else "",
            phone=phones[0] if phones else "",
            website=url,
            source="web",
            confidence="medium" if (emails or phones) else "low",
        )
    return None


# ---------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------
async def enrich_contractor(name: str,
                            session: aiohttp.ClientSession,
                            cache: dict[str, dict[str, Any]] | None = None
                            ) -> Enrichment:
    """Look up contact info for a contractor by name.

    Tries SAM.gov, then USASpending, then a web heuristic. Caches by
    normalised name so subsequent runs are free. Returns an
    `Enrichment` (which may have empty fields if nothing was found).
    """
    if not name or not name.strip():
        return Enrichment()
    cache_supplied = cache is not None
    if cache is None:
        cache = _load_cache()
    key = _cache_key(name)
    if key in cache:
        return Enrichment(**cache[key])

    out: Enrichment | None = None
    for fn in (_sam_lookup, _usaspending_lookup, _web_heuristic):
        try:
            out = await fn(name, session)
        except Exception as e:  # noqa: BLE001
            logger.debug("enrichment %s failed for %r: %s",
                         fn.__name__, name, e)
            out = None
        if out and out.has_contact():
            break

    if not out:
        out = Enrichment(business_name=name, source="none", confidence="low")

    cache[key] = asdict(out)
    if not cache_supplied:
        _save_cache(cache)
    return out


async def enrich_many(names: list[str],
                      session: aiohttp.ClientSession,
                      concurrency: int = 4) -> dict[str, Enrichment]:
    """Enrich a batch of contractor names. Uses a single shared cache
    so duplicates within the batch are deduplicated."""
    cache = _load_cache()
    sem = asyncio.Semaphore(concurrency)
    results: dict[str, Enrichment] = {}

    async def _one(n: str) -> None:
        async with sem:
            results[n] = await enrich_contractor(n, session, cache)

    await asyncio.gather(*(_one(n) for n in dict.fromkeys(names)))
    _save_cache(cache)
    return results
