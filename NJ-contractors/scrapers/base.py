"""
BasePermitScraper — common contract for every state permit scraper.

Each state subclass declares a `STATE` two-letter code and a `SOURCES`
list. SOURCES entries are dicts of the form:

    {
        "key":  "OR_Portland",          # unique id, used in source_status.json
        "name": "City of Portland ROW",  # human label for digests
        "kind": "socrata" | "arcgis" | "html" | "playwright" | "unimplemented",
        "url":  "https://...",           # endpoint or discovery URL
        "domain": "data.portlandoregon.gov",   # socrata only
        "dataset": "abcd-1234",                 # socrata only
        "fields": {"applicant": "...", ...},
    }

A scraper's job is to return a list of `Permit` objects for the
configured lookback window — nothing more. All matching, de-duping,
alerting, and persistence is handled by `permits.py`.
"""

from __future__ import annotations

import asyncio
import logging
import traceback
from dataclasses import dataclass, field, asdict
from datetime import datetime, timedelta, timezone
from typing import Any, Iterable

import aiohttp

log = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Permit dataclass
# ---------------------------------------------------------------------------
@dataclass
class Permit:
    """Normalized permit record. Every field is optional except permit_number
    + source_state so the rest of the pipeline can de-dupe safely."""

    permit_number: str
    source_state: str
    applicant_name: str = ""
    applicant_phone: str = ""           # raw 10-digit string when available
    applicant_license: str = ""         # contractor license number
    applicant_license_type: str = ""    # GC / EC / PE / etc.
    applicant_city: str = ""            # contractor's billing city, useful for enrichment
    applicant_state: str = ""
    applicant_zip: str = ""
    job_address: str = ""
    permit_type: str = ""
    issue_date: str = ""           # ISO-8601 string ("" if unknown)
    filed_date: str = ""
    expiration_date: str = ""
    work_description: str = ""
    source_municipality: str = ""
    source_url: str = ""
    raw: dict[str, Any] = field(default_factory=dict)   # debug payload, not exported

    def to_export(self) -> dict[str, Any]:
        d = asdict(self)
        d.pop("raw", None)
        return d

    @property
    def dedupe_key(self) -> str:
        return f"{self.source_state}::{self.permit_number}".strip().upper()


# ---------------------------------------------------------------------------
# Result envelope
# ---------------------------------------------------------------------------
@dataclass
class ScrapeResult:
    """What every scraper returns to the runner."""
    state: str
    sources: dict[str, dict[str, Any]] = field(default_factory=dict)
    permits: list[Permit] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Custom exceptions so the runner can categorize source health correctly.
# ---------------------------------------------------------------------------
class SourceBlocked(Exception):
    """Source is rate-limiting, captcha-walled, or otherwise unreachable."""


class SourceAuthRequired(Exception):
    """Source needs login credentials we don't have."""


# ---------------------------------------------------------------------------
# Base scraper
# ---------------------------------------------------------------------------
class BasePermitScraper:
    STATE: str = "??"            # subclasses override
    STATE_NAME: str = ""
    SOURCES: list[dict[str, Any]] = []

    def __init__(self, *, session: aiohttp.ClientSession,
                 config: dict[str, Any], lookback_days: int):
        self.session = session
        self.config = config
        self.lookback_days = lookback_days

    # ------------------------------------------------------------------
    # Public entry point — runner calls this.
    # ------------------------------------------------------------------
    async def run(self) -> ScrapeResult:
        result = ScrapeResult(state=self.STATE)

        if not self.SOURCES:
            result.sources[f"{self.STATE}_unconfigured"] = {
                "status": "not_implemented",
                "last_checked": _utc_now_iso(),
                "reason": "no sources defined for this state",
                "permits_found_this_run": 0,
            }
            return result

        for source in self.SOURCES:
            key = source["key"]
            try:
                permits = await self._fetch_with_retries(source)
                result.permits.extend(permits)
                result.sources[key] = {
                    "status": "live",
                    "last_checked": _utc_now_iso(),
                    "permits_found_this_run": len(permits),
                    "name": source.get("name", key),
                    "url": source.get("url", ""),
                }
            except SourceBlocked as e:
                result.sources[key] = {
                    "status": "blocked",
                    "reason": str(e),
                    "last_attempted": _utc_now_iso(),
                    "name": source.get("name", key),
                    "url": source.get("url", ""),
                }
                result.errors.append(f"{key}: blocked: {e}")
            except SourceAuthRequired as e:
                result.sources[key] = {
                    "status": "auth_required",
                    "reason": str(e),
                    "last_attempted": _utc_now_iso(),
                    "name": source.get("name", key),
                    "url": source.get("url", ""),
                }
                result.errors.append(f"{key}: auth_required: {e}")
            except NotImplementedError as e:
                result.sources[key] = {
                    "status": "not_implemented",
                    "reason": str(e) or "scraper not yet wired up",
                    "last_attempted": _utc_now_iso(),
                    "name": source.get("name", key),
                    "url": source.get("url", ""),
                }
            except Exception as e:                                       # noqa: BLE001
                tb = traceback.format_exc()
                result.sources[key] = {
                    "status": "error",
                    "reason": f"{type(e).__name__}: {e}",
                    "last_attempted": _utc_now_iso(),
                    "name": source.get("name", key),
                    "url": source.get("url", ""),
                }
                result.errors.append(f"{key}: {type(e).__name__}: {e}\n{tb}")

        return result

    # ------------------------------------------------------------------
    # Per-source dispatch with retry + exponential backoff.
    # Terminal exceptions (Blocked / AuthRequired / NotImplemented) skip
    # the retry loop so we don't pound a wall.
    # ------------------------------------------------------------------
    async def _fetch_with_retries(self, source: dict[str, Any]) -> list[Permit]:
        attempts = self.config.get("retry_attempts", 3)
        base = self.config.get("retry_backoff_base_seconds", 2)
        last_exc: Exception | None = None
        for attempt in range(attempts):
            try:
                return await self.fetch_one(source)
            except (SourceBlocked, SourceAuthRequired, NotImplementedError):
                raise
            except Exception as e:                                        # noqa: BLE001
                last_exc = e
                if attempt < attempts - 1:
                    await asyncio.sleep(base * (2 ** attempt))
        assert last_exc is not None
        raise last_exc

    # ------------------------------------------------------------------
    # Per-source fetch — dispatches by `kind`. Subclasses can override
    # for bespoke logic.
    # ------------------------------------------------------------------
    async def fetch_one(self, source: dict[str, Any]) -> list[Permit]:
        kind = source.get("kind", "unimplemented")
        if kind == "socrata":
            return await self._fetch_socrata(source)
        if kind == "arcgis":
            return await self._fetch_arcgis(source)
        if kind == "html":
            return await self._fetch_html(source)
        if kind == "playwright":
            return await self._fetch_playwright(source)
        if kind == "unimplemented":
            raise NotImplementedError(
                source.get("reason", "no scraper kind configured"))
        raise NotImplementedError(f"unknown source kind: {kind!r}")

    # ------------------------------------------------------------------
    # Socrata helper.
    # ------------------------------------------------------------------
    async def _fetch_socrata(self, source: dict[str, Any]) -> list[Permit]:
        domain = source["domain"]
        dataset = source["dataset"]
        issue_field = source.get("issue_date_field")
        url = f"https://{domain}/resource/{dataset}.json"

        params: dict[str, str] = {"$limit": str(source.get("limit", 5000))}
        clauses: list[str] = []
        if issue_field:
            since = (datetime.now(timezone.utc)
                     - timedelta(days=self.lookback_days)).date().isoformat()
            clauses.append(f"{issue_field} >= '{since}T00:00:00.000'")
            params["$order"] = f"{issue_field} DESC"
        if rf := source.get("relevant_filter"):
            clauses.append(f"({rf})")
        if clauses:
            params["$where"] = " AND ".join(clauses)

        headers = {"User-Agent": self.config.get("user_agent", "PermitMonitor/1.0")}
        if app_token := source.get("app_token"):
            headers["X-App-Token"] = app_token

        timeout = aiohttp.ClientTimeout(total=self.config.get("request_timeout_seconds", 45))
        async with self.session.get(url, params=params, headers=headers,
                                    timeout=timeout) as resp:
            if resp.status in (401, 403):
                raise SourceAuthRequired(f"socrata returned {resp.status}")
            if resp.status == 429:
                raise SourceBlocked("socrata rate-limited (429)")
            resp.raise_for_status()
            rows = await resp.json()

        return [self._socrata_row_to_permit(r, source) for r in rows]

    def _socrata_row_to_permit(self, row: dict[str, Any],
                               source: dict[str, Any]) -> Permit:
        f = source.get("fields", {})
        permit_no = str(row.get(f.get("permit_number", "permit_number"), "")).strip()

        def g(field_key: str) -> str:
            """Look up a configured field key, defaulting to '' if missing."""
            api_key = f.get(field_key)
            if not api_key:
                return ""
            return str(row.get(api_key, "") or "").strip()

        return Permit(
            permit_number=permit_no or _synth_id(row),
            source_state=self.STATE,
            applicant_name=g("applicant"),
            applicant_phone=g("applicant_phone"),
            applicant_license=g("applicant_license"),
            applicant_license_type=g("applicant_license_type"),
            applicant_city=g("applicant_city"),
            applicant_state=g("applicant_state"),
            applicant_zip=g("applicant_zip"),
            job_address=g("address"),
            permit_type=g("permit_type"),
            issue_date=g("issue_date"),
            filed_date=g("filed_date"),
            expiration_date=g("expiration_date"),
            work_description=g("description"),
            source_municipality=source.get("name", ""),
            source_url=source.get("url", ""),
            raw=row,
        )

    # ------------------------------------------------------------------
    # ArcGIS REST FeatureServer helper.
    # ------------------------------------------------------------------
    async def _fetch_arcgis(self, source: dict[str, Any]) -> list[Permit]:
        url = source["url"].rstrip("/") + "/query"
        issue_field = source.get("issue_date_field", "IssueDate")
        since = (datetime.now(timezone.utc)
                 - timedelta(days=self.lookback_days)).date().isoformat()
        where = source.get("where", f"{issue_field} >= DATE '{since}'")
        params = {
            "where": where,
            "outFields": source.get("out_fields", "*"),
            "returnGeometry": "false",
            "f": "json",
            "resultRecordCount": str(source.get("limit", 2000)),
            "orderByFields": f"{issue_field} DESC",
        }
        headers = {"User-Agent": self.config.get("user_agent", "PermitMonitor/1.0")}
        timeout = aiohttp.ClientTimeout(total=self.config.get("request_timeout_seconds", 45))
        async with self.session.get(url, params=params, headers=headers,
                                    timeout=timeout) as resp:
            if resp.status in (401, 403):
                raise SourceAuthRequired(f"arcgis returned {resp.status}")
            resp.raise_for_status()
            data = await resp.json()
        if "error" in data:
            raise RuntimeError(f"arcgis error: {data['error']}")
        f = source.get("fields", {})
        out: list[Permit] = []
        for feat in data.get("features", []):
            attrs = feat.get("attributes", {}) or {}
            permit_no = str(attrs.get(f.get("permit_number", "PermitNo"), "") or "").strip()
            out.append(Permit(
                permit_number=permit_no or _synth_id(attrs),
                source_state=self.STATE,
                applicant_name=str(attrs.get(f.get("applicant", "Applicant"), "") or "").strip(),
                job_address=str(attrs.get(f.get("address", "Address"), "") or "").strip(),
                permit_type=str(attrs.get(f.get("permit_type", "PermitType"), "") or "").strip(),
                issue_date=_arc_date(attrs.get(f.get("issue_date", issue_field))),
                filed_date=_arc_date(attrs.get(f.get("filed_date", ""))),
                expiration_date=_arc_date(attrs.get(f.get("expiration_date", ""))),
                work_description=str(attrs.get(f.get("description", "Description"), "") or "").strip(),
                source_municipality=source.get("name", ""),
                source_url=source.get("url", ""),
                raw=attrs,
            ))
        return out

    # ------------------------------------------------------------------
    # Generic HTML/BeautifulSoup helper. Default raises so we don't
    # pretend to scrape pages we haven't actually implemented.
    # ------------------------------------------------------------------
    async def _fetch_html(self, source: dict[str, Any]) -> list[Permit]:
        raise NotImplementedError(
            f"HTML scraper for {source.get('key')} not implemented — "
            "override _fetch_html in the subclass."
        )

    # ------------------------------------------------------------------
    # Playwright helper — heavy, only used when nothing else works.
    # ------------------------------------------------------------------
    async def _fetch_playwright(self, source: dict[str, Any]) -> list[Permit]:
        raise NotImplementedError(
            f"Playwright scraper for {source.get('key')} not implemented — "
            "override _fetch_playwright in the subclass."
        )

    # ------------------------------------------------------------------
    # Discovery hook for `--setup`. Default returns the static SOURCES
    # list so we don't make speculative network calls during setup.
    # ------------------------------------------------------------------
    async def discover(self) -> Iterable[dict[str, Any]]:
        return self.SOURCES


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def _synth_id(row: dict[str, Any]) -> str:
    """Synthetic id when the source has no explicit permit number — use
    a hash of the row so we de-dupe consistently."""
    import hashlib
    return "ROW-" + hashlib.sha1(
        repr(sorted(row.items())).encode("utf-8")).hexdigest()[:12].upper()


def _arc_date(v: Any) -> str:
    """ArcGIS dates are epoch-millis or ISO. Coerce to ISO-8601."""
    if not v:
        return ""
    if isinstance(v, (int, float)):
        try:
            return datetime.fromtimestamp(v / 1000, tz=timezone.utc).date().isoformat()
        except (OverflowError, OSError, ValueError):
            return ""
    return str(v)
