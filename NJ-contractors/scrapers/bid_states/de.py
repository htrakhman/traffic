"""
Delaware DOT bid scraper.

Source pages
------------
  Lettings: https://deldot.gov/Business/bids/index.shtml
  Awards:   https://deldot.gov/Business/bids/bid_results.shtml

Notes
-----
Most state DOTs publish lettings on a public page (no auth) and route
the actual bid documents through AASHTOWare Bid Express (which does
require an account). The free letting list is enough to detect new
qualifying projects and feed the contractor-on-bidtab alert from
publicly posted abstracts.

If this state changes its HTML structure the base parser will return
empty results and bids.py will mark the source as `format_changed`
in source_status.json so you can update the selectors here.
"""

from scrapers.bidbase import StateScraper


class Scraper(StateScraper):
    state_code = "DE"
    state_name = "Delaware"
    lettings_url = "https://deldot.gov/Business/bids/index.shtml"
    awards_url = "https://deldot.gov/Business/bids/bid_results.shtml"
    parser_kind = "html_table"
