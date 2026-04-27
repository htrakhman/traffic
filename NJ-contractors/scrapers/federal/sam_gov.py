"""
SAM.gov scraper.

Pulls federal opportunities (which include FHWA federal-aid jobs that
also show up on state lettings) filtered to heavy-construction NAICS:

    237310 - Highway, Street, and Bridge Construction
    237110 - Water and Sewer Line and Related Structures
    237130 - Power and Communication Line and Related Structures
    237990 - Other Heavy and Civil Engineering Construction

SAM.gov has a public Opportunities API at https://api.sam.gov/opportunities/v2/search
which requires an API key passed as `api_key`. If no key is configured
this scraper falls back to scraping the public HTML search page.

Set the API key in the SAM_GOV_API_KEY environment variable to enable
the structured API path.
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timedelta
from urllib.parse import urlencode

import aiohttp

from scrapers.bidbase import (
    Award, Letting, StateScraper, BlockedError, FormatChangedError,
)

NAICS_CODES = ["237310", "237110", "237130", "237990"]


class Scraper(StateScraper):
    state_code = "US-SAM"
    state_name = "SAM.gov (federal)"
    parser_kind = "json_api"
    API_BASE = "https://api.sam.gov/opportunities/v2/search"
    HTML_BASE = "https://sam.gov/opp/"

    @property
    def lettings_url(self) -> str:  # type: ignore[override]
        return f"{self.API_BASE}?{urlencode(self._common_params())}"

    awards_url = None  # SAM.gov merges opps + awards in the same feed

    def _common_params(self) -> dict[str, str]:
        # Last 90 days of opportunities, NAICS-filtered
        posted_from = (datetime.utcnow() - timedelta(days=90)
                       ).strftime("%m/%d/%Y")
        posted_to = datetime.utcnow().strftime("%m/%d/%Y")
        return {
            "limit": "200",
            "ncode": ",".join(NAICS_CODES),
            "postedFrom": posted_from,
            "postedTo": posted_to,
            "ptype": "k,o",  # combined synopsis + solicitation
        }

    async def fetch_lettings(self) -> list[Letting]:
        api_key = os.environ.get("SAM_GOV_API_KEY")
        if not api_key:
            # No API key - keep this source disabled gracefully rather
            # than scraping HTML (which is heavier and easily blocked).
            return []
        params = self._common_params()
        params["api_key"] = api_key
        url = f"{self.API_BASE}?{urlencode(params)}"
        text, status = await self._fetch(url)
        if status == 429:
            raise BlockedError("SAM.gov rate limit (429)")
        if status >= 400:
            raise FormatChangedError(f"SAM.gov returned {status}")
        try:
            data = json.loads(text)
        except json.JSONDecodeError as e:
            raise FormatChangedError(f"SAM.gov JSON parse: {e}") from e
        out: list[Letting] = []
        for opp in data.get("opportunitiesData", []) or []:
            naics = (opp.get("naicsCode")
                     or (opp.get("naicsCodes") or [None])[0])
            place = (opp.get("placeOfPerformance") or {})
            state = (place.get("state") or {}).get("code") or "US"
            location = ", ".join(filter(None, [
                (place.get("city") or {}).get("name"),
                state,
            ])) or ""
            out.append(Letting(
                project_number=opp.get("noticeId") or opp.get("solicitationNumber") or "",
                name=opp.get("title") or "",
                description=opp.get("description") or "",
                state=state,
                location=location,
                letting_date=(opp.get("responseDeadLine")
                              or opp.get("postedDate") or "")[:10] or None,
                estimate=None,
                naics=naics,
                source_url=opp.get("uiLink")
                or f"{self.HTML_BASE}{opp.get('noticeId', '')}",
            ))
        return out
