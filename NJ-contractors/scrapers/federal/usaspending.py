"""
USASpending.gov scraper.

USASpending exposes a public POST API at /api/v2/search/spending_by_award
that does not require an API key. We pull the last 90 days of awards
filtered to highway/bridge/utility/heavy-civil NAICS codes.

Doc: https://api.usaspending.gov/docs/endpoints
"""

from __future__ import annotations

import json
from datetime import datetime, timedelta

import aiohttp

from scrapers.bidbase import (
    Award, StateScraper, FormatChangedError,
)

NAICS_CODES = ["237310", "237110", "237130", "237990"]


class Scraper(StateScraper):
    state_code = "US-AWD"
    state_name = "USASpending.gov (federal awards)"
    parser_kind = "json_api"
    awards_url = "https://api.usaspending.gov/api/v2/search/spending_by_award/"

    async def fetch_awards(self) -> list[Award]:
        end = datetime.utcnow().date()
        start = end - timedelta(days=90)
        body = {
            "filters": {
                "award_type_codes": ["A", "B", "C", "D"],  # contract types
                "naics_codes": NAICS_CODES,
                "time_period": [{
                    "start_date": start.isoformat(),
                    "end_date": end.isoformat(),
                }],
            },
            "fields": [
                "Award ID", "Recipient Name", "Award Amount",
                "Awarding Agency", "Awarding Sub Agency",
                "Award Date", "Description",
                "Place of Performance State Code",
                "Place of Performance City Code",
                "generated_internal_id",
            ],
            "page": 1,
            "limit": 100,
            "sort": "Award Amount",
            "order": "desc",
        }
        sem = await self.limiter.acquire(self.awards_url)
        try:
            async with self.session.post(
                self.awards_url, json=body,
                headers={"User-Agent": self.user_agent,
                         "Content-Type": "application/json"},
                timeout=aiohttp.ClientTimeout(total=self.timeout_seconds),
            ) as resp:
                text = await resp.text(errors="replace")
                if resp.status >= 400:
                    raise FormatChangedError(
                        f"USASpending returned {resp.status}")
                try:
                    data = json.loads(text)
                except json.JSONDecodeError as e:
                    raise FormatChangedError(
                        f"USASpending JSON parse: {e}") from e
        finally:
            sem.release()

        out: list[Award] = []
        for r in data.get("results", []) or []:
            internal = r.get("generated_internal_id")
            url = (f"https://www.usaspending.gov/award/{internal}"
                   if internal else self.awards_url)
            out.append(Award(
                project_number=str(r.get("Award ID") or internal or ""),
                project_name=r.get("Description") or "",
                state=r.get("Place of Performance State Code") or "US",
                location=r.get("Place of Performance City Code") or "",
                contractor_name=r.get("Recipient Name") or "",
                award_amount=(float(r["Award Amount"])
                              if r.get("Award Amount") else None),
                award_date=r.get("Award Date"),
                source_url=url,
            ))
        return out
