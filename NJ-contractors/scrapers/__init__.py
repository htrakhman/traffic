"""State scraper package for the permit-pull monitor.

Each state module under this package exports a class named `Scraper`
that subclasses `scrapers.base.BasePermitScraper`.

`iter_scraper_modules()` walks every two-letter state code and yields
(state_code, ScraperClass) pairs for the modules that are present.
"""
from __future__ import annotations

import importlib
from typing import Iterator

from .base import BasePermitScraper

ALL_STATES = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
    "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
    "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
    "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
    "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
]


def iter_scraper_modules() -> Iterator[tuple[str, type[BasePermitScraper]]]:
    pkg = __name__
    for state in ALL_STATES:
        modname = f"{pkg}.{state}"
        try:
            mod = importlib.import_module(modname)
        except ModuleNotFoundError:
            continue
        cls = getattr(mod, "Scraper", None)
        if cls is None:
            continue
        if not isinstance(cls, type) or not issubclass(cls, BasePermitScraper):
            continue
        yield state.upper(), cls


def all_scraper_classes() -> dict[str, type[BasePermitScraper]]:
    return dict(iter_scraper_modules())
