"""
Enrichment module: given raw leads (from scraper.py), find each company's
Facebook, Instagram, LinkedIn, YouTube, Twitter/X, TikTok, and email addresses
by crawling their website (homepage + /contact + /about) and falling back to
a Google search for their Facebook page if nothing turns up on-site.

Priority (per user spec):
    facebook > instagram > linkedin > other > website > email

Usage:
    python enricher.py --input raw_leads.json --output enriched_leads.json

Respects rate limits. Runs sequentially with per-site timeout and backoff.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import asdict, dataclass, field
from typing import Any, Iterable
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

EMAIL_RE = re.compile(
    r"[A-Za-z0-9][A-Za-z0-9._%+-]{0,63}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
)

# Paths likely to contain contact info / social links
CONTACT_PATHS = ["", "/contact", "/contact-us", "/contact.html", "/about",
                 "/about-us", "/about.html", "/get-a-quote", "/quote"]

SOCIAL_DOMAINS = {
    "facebook": ["facebook.com", "fb.com", "fb.me"],
    "instagram": ["instagram.com"],
    "linkedin": ["linkedin.com"],
    "twitter": ["twitter.com", "x.com"],
    "youtube": ["youtube.com", "youtu.be"],
    "tiktok": ["tiktok.com"],
}

# Junk emails we don't want
EMAIL_BLACKLIST = {
    "example.com", "yourdomain.com", "domain.com", "email.com",
    "sentry.io", "wixpress.com", "godaddy.com", "google.com",
}
GENERIC_EMAIL_PREFIXES = ("example@", "you@", "name@", "your@")


@dataclass
class EnrichedLead:
    # Carry-over from scraper
    place_id: str
    name: str
    category_query: str
    county: str
    address: str
    phone: str
    website: str
    rating: float | None
    review_count: int | None
    google_maps_url: str
    business_status: str
    # New enrichment fields
    facebook: str = ""
    instagram: str = ""
    linkedin: str = ""
    twitter: str = ""
    youtube: str = ""
    tiktok: str = ""
    emails: list[str] = field(default_factory=list)
    primary_contact_url: str = ""
    enrichment_notes: str = ""


def normalize_url(url: str) -> str:
    if not url:
        return ""
    url = url.strip()
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    return url


def fetch(url: str, session: requests.Session, timeout: int = 15) -> str | None:
    try:
        r = session.get(url, timeout=timeout, allow_redirects=True)
        if r.status_code == 200 and "text/html" in r.headers.get("Content-Type", ""):
            return r.text
    except requests.RequestException:
        return None
    return None


def extract_social_links(html: str, base_url: str) -> dict[str, str]:
    """Return dict like {"facebook": "https://facebook.com/...", "instagram": "..."}."""
    soup = BeautifulSoup(html, "html.parser")
    found: dict[str, str] = {}
    for a in soup.find_all("a", href=True):
        href = urljoin(base_url, a["href"])
        host = urlparse(href).netloc.lower().removeprefix("www.")
        for platform, domains in SOCIAL_DOMAINS.items():
            if platform in found:
                continue
            if any(host == d or host.endswith("." + d) for d in domains):
                # Skip share/intent URLs
                if any(junk in href.lower() for junk in ("/sharer", "/share?", "/intent/",
                                                         "/login", "/plugins/")):
                    continue
                found[platform] = href.split("?")[0].rstrip("/")
    return found


def extract_emails(html: str) -> list[str]:
    candidates = set(m.group(0).lower() for m in EMAIL_RE.finditer(html))
    cleaned = []
    for e in candidates:
        domain = e.split("@", 1)[1]
        if domain in EMAIL_BLACKLIST:
            continue
        if e.startswith(GENERIC_EMAIL_PREFIXES):
            continue
        if any(e.endswith(ext) for ext in (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")):
            continue
        cleaned.append(e)
    # Preserve order: prefer info@, contact@, sales@, then rest
    priority = ("info@", "contact@", "sales@", "office@", "hello@", "admin@")
    cleaned.sort(key=lambda x: (0 if x.startswith(priority) else 1, x))
    return cleaned


def crawl_site(website: str, session: requests.Session, delay: float = 0.5) -> dict[str, Any]:
    """Crawl homepage + contact/about pages for socials and emails."""
    base = normalize_url(website)
    if not base:
        return {"socials": {}, "emails": [], "visited": []}

    all_socials: dict[str, str] = {}
    all_emails: list[str] = []
    visited: list[str] = []

    for path in CONTACT_PATHS:
        url = urljoin(base + "/", path.lstrip("/"))
        html = fetch(url, session)
        time.sleep(delay)
        if not html:
            continue
        visited.append(url)
        socials = extract_social_links(html, url)
        for k, v in socials.items():
            all_socials.setdefault(k, v)
        for e in extract_emails(html):
            if e not in all_emails:
                all_emails.append(e)
        # Stop early if we have both FB and at least one email
        if "facebook" in all_socials and all_emails:
            break

    return {"socials": all_socials, "emails": all_emails, "visited": visited}


def fallback_facebook_search(company_name: str, county: str,
                             session: requests.Session) -> str:
    """Very conservative fallback: try a DuckDuckGo HTML search for the company's
    Facebook page. Avoids Google's anti-bot.
    """
    q = f'"{company_name}" {county} site:facebook.com'
    try:
        r = session.get("https://duckduckgo.com/html/",
                        params={"q": q}, timeout=15)
        if r.status_code != 200:
            return ""
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.select("a.result__a, a.result__url"):
            href = a.get("href", "")
            if "facebook.com/" in href:
                # Skip non-page URLs
                if any(b in href for b in ("/sharer", "/login", "/pages/category")):
                    continue
                return href.split("?")[0].rstrip("/")
    except requests.RequestException:
        pass
    return ""


def enrich_one(raw: dict[str, Any], session: requests.Session) -> EnrichedLead:
    lead = EnrichedLead(
        place_id=raw.get("place_id", ""),
        name=raw.get("name", ""),
        category_query=raw.get("category_query", ""),
        county=raw.get("county", ""),
        address=raw.get("address", ""),
        phone=raw.get("phone", ""),
        website=raw.get("website", ""),
        rating=raw.get("rating"),
        review_count=raw.get("review_count"),
        google_maps_url=raw.get("google_maps_url", ""),
        business_status=raw.get("business_status", ""),
    )

    notes = []
    if lead.website:
        result = crawl_site(lead.website, session)
        socials = result["socials"]
        lead.facebook = socials.get("facebook", "")
        lead.instagram = socials.get("instagram", "")
        lead.linkedin = socials.get("linkedin", "")
        lead.twitter = socials.get("twitter", "")
        lead.youtube = socials.get("youtube", "")
        lead.tiktok = socials.get("tiktok", "")
        lead.emails = result["emails"]
        if result["visited"]:
            lead.primary_contact_url = result["visited"][-1]
        notes.append(f"crawled {len(result['visited'])} pages")
    else:
        notes.append("no website on record")

    if not lead.facebook:
        fb = fallback_facebook_search(lead.name, lead.county, session)
        if fb:
            lead.facebook = fb
            notes.append("FB via DDG fallback")
        time.sleep(1.0)

    lead.enrichment_notes = "; ".join(notes)
    return lead


def enrich_all(raws: Iterable[dict[str, Any]]) -> list[EnrichedLead]:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept-Language": "en-US,en;q=0.9"})
    out: list[EnrichedLead] = []
    raws_list = list(raws)
    for i, raw in enumerate(raws_list, 1):
        print(f"[{i}/{len(raws_list)}] {raw.get('name','?')}", flush=True)
        try:
            out.append(enrich_one(raw, session))
        except Exception as e:
            print(f"  ! enrichment failure: {e}", file=sys.stderr)
            # Still include the raw data so it doesn't vanish
            out.append(EnrichedLead(
                place_id=raw.get("place_id", ""),
                name=raw.get("name", ""),
                category_query=raw.get("category_query", ""),
                county=raw.get("county", ""),
                address=raw.get("address", ""),
                phone=raw.get("phone", ""),
                website=raw.get("website", ""),
                rating=raw.get("rating"),
                review_count=raw.get("review_count"),
                google_maps_url=raw.get("google_maps_url", ""),
                business_status=raw.get("business_status", ""),
                enrichment_notes=f"error: {e}",
            ))
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--input", default="raw_leads.json")
    ap.add_argument("--output", default="enriched_leads.json")
    args = ap.parse_args()

    with open(args.input) as f:
        raws = json.load(f)

    enriched = enrich_all(raws)
    with open(args.output, "w") as f:
        json.dump([asdict(l) for l in enriched], f, indent=2)

    with_fb = sum(1 for l in enriched if l.facebook)
    with_email = sum(1 for l in enriched if l.emails)
    print(f"\nEnriched {len(enriched)} leads "
          f"({with_fb} with Facebook, {with_email} with email) -> {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
