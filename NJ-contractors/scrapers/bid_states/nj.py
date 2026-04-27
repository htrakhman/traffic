"""
New Jersey DOT bid scraper.

Source pages
------------
  Lettings: https://www.state.nj.us/transportation/business/procurement/ConstSvcs/lettings.shtm
  Awards:   https://www.state.nj.us/transportation/business/procurement/ConstSvcs/results.shtm

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
    state_code = "NJ"
    state_name = "New Jersey"
    lettings_url = "https://www.state.nj.us/transportation/business/procurement/ConstSvcs/lettings.shtm"
    awards_url = "https://www.state.nj.us/transportation/business/procurement/ConstSvcs/results.shtm"
    parser_kind = "html_table"
