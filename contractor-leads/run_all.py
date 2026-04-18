"""
One-shot pipeline: scrape -> enrich -> export xlsx.

    python run_all.py

Reads GOOGLE_PLACES_API_KEY from env. See README.md for setup.
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


def main() -> int:
    here = Path(__file__).parent
    if not os.environ.get("GOOGLE_PLACES_API_KEY"):
        print("ERROR: GOOGLE_PLACES_API_KEY is not set.", file=sys.stderr)
        print("Add it to your shell (see README.md Step 2).", file=sys.stderr)
        return 1

    steps = [
        ["python", str(here / "scraper.py"),
         "--output", str(here / "raw_leads.json")],
        ["python", str(here / "enricher.py"),
         "--input", str(here / "raw_leads.json"),
         "--output", str(here / "enriched_leads.json")],
        ["python", str(here / "export_xlsx.py"),
         "--input", str(here / "enriched_leads.json"),
         "--output", str(here / "leads.xlsx")],
    ]
    for cmd in steps:
        print("\n$ " + " ".join(cmd))
        rc = subprocess.call(cmd)
        if rc != 0:
            print(f"Step failed ({rc}). Stopping.", file=sys.stderr)
            return rc
    print("\nDone. Open leads.xlsx.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
