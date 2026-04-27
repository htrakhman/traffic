"""One-shot generator for the 50 state scraper files.

This is meta-tooling — it writes scrapers/{state}.py files based on the
data tables below. Edits made directly to the generated state files
will be overwritten if you re-run this generator. Tweak the tables here
(or edit individual state files directly afterward) to add real
endpoints.

Run:  python _gen_state_scrapers.py
"""
from __future__ import annotations

from pathlib import Path
from pprint import pformat

HERE = Path(__file__).resolve().parent
SCRAPERS = HERE / "scrapers"


# ---------------------------------------------------------------------------
# Helpers used to assemble a state's SOURCES list.
# ---------------------------------------------------------------------------
def stub(key: str, name: str, url: str, reason: str) -> dict:
    """A `kind="unimplemented"` source — at runtime it surfaces in
    source_status.json as `not_implemented` with the given reason."""
    return {
        "key": key,
        "name": name,
        "kind": "unimplemented",
        "url": url,
        "reason": reason,
    }


def city_stub(state_code: str, city: str, url: str,
              reason: str = "needs scraper implementation — start by inspecting the linked portal") -> dict:
    return stub(
        key=f"{state_code.upper()}_{city.replace(' ', '')}",
        name=f"{city} Permits",
        url=url,
        reason=reason,
    )


# ---------------------------------------------------------------------------
# State definitions. Each value is a list of source dicts.
# ---------------------------------------------------------------------------
STATE_DEFS: dict[str, dict] = {
    # =================================================================
    # States with at least one REAL Socrata endpoint wired up.
    # Dataset IDs and field names are best-effort — first `--setup`
    # run will tell you which ones actually return data.
    # =================================================================
    "ny": {
        "name": "New York",
        "sources": [
            {
                "key": "NY_NYC_DOB",
                "name": "NYC DOB Permit Issuance",
                "kind": "socrata",
                "domain": "data.cityofnewyork.us",
                "dataset": "ipu4-2q9a",
                "url": "https://data.cityofnewyork.us/Housing-Development/DOB-Permit-Issuance/ipu4-2q9a",
                "issue_date_field": "issuance_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "job__",
                    # Applicant is reconstructed in the subclass below.
                    "applicant": "__merged_applicant",
                    "address": "house__",
                    "permit_type": "permit_type",
                    "issue_date": "issuance_date",
                    "filed_date": "filing_date",
                    "expiration_date": "expiration_date",
                    "description": "work_type",
                },
            },
            stub("NY_NYC_DOT_StreetWork",
                 "NYC DOT Street Construction Permits",
                 "https://www1.nyc.gov/html/dot/html/infrastructure/streetwork-permits.shtml",
                 "DOT Permit Search requires session token / form POST"),
            stub("NY_State_DOT",
                 "NYSDOT Highway Work Permits",
                 "https://www.dot.ny.gov/main/business-center/engineering/specifications-engineering/work-permits",
                 "NYSDOT permits aren't published as a public dataset"),
        ],
        "extra_methods": "_NYC_APPLICANT_OVERRIDE",
    },

    "ca": {
        "name": "California",
        "sources": [
            {
                "key": "CA_LA_Building",
                "name": "Los Angeles Building & Safety Permits",
                "kind": "socrata",
                "domain": "data.lacity.org",
                "dataset": "nbyu-2ha9",
                "url": "https://data.lacity.org/A-Prosperous-City/Building-and-Safety-Permit-Information/nbyu-2ha9",
                "issue_date_field": "issue_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "permit_nbr",
                    "applicant": "contractor_s_business_name",
                    "address": "address_start",
                    "permit_type": "permit_type",
                    "issue_date": "issue_date",
                    "filed_date": "status_date",
                    "expiration_date": "permit_expiration_date",
                    "description": "permit_sub_type",
                },
            },
            {
                "key": "CA_SF_Building",
                "name": "San Francisco Building Permits",
                "kind": "socrata",
                "domain": "data.sfgov.org",
                "dataset": "i98e-djp9",
                "url": "https://data.sfgov.org/Housing-and-Buildings/Building-Permits/i98e-djp9",
                "issue_date_field": "issued_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "permit_number",
                    "applicant": "first_construction_document_type",
                    "address": "street_number",
                    "permit_type": "permit_type_definition",
                    "issue_date": "issued_date",
                    "filed_date": "filed_date",
                    "expiration_date": "permit_expiration_date",
                    "description": "description",
                },
            },
            stub("CA_SF_StreetUse",
                 "San Francisco Street-Use Permits",
                 "https://sfdpw.org/permits",
                 "DPW street-use permits aren't on a Socrata dataset"),
            stub("CA_Caltrans_Encroachment",
                 "Caltrans Encroachment Permits",
                 "https://encroachmentpermits.dot.ca.gov/",
                 "Caltrans EPMS portal — JS-rendered + captcha; needs Playwright + likely auth"),
        ],
    },

    "il": {
        "name": "Illinois",
        "sources": [
            {
                "key": "IL_Chicago_Building",
                "name": "Chicago Building Permits",
                "kind": "socrata",
                "domain": "data.cityofchicago.org",
                "dataset": "ydr8-5enu",
                "url": "https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu",
                "issue_date_field": "issue_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "permit_",
                    "applicant": "contractor_1_name",
                    "address": "street_number",
                    "permit_type": "permit_type",
                    "issue_date": "issue_date",
                    "filed_date": "application_start_date",
                    "expiration_date": "expiration_date",
                    "description": "work_description",
                },
            },
            stub("IL_IDOT",
                 "IDOT Highway Permits",
                 "https://idot.illinois.gov/transportation-system/local-transportation-partners/county-engineers-and-local-public-agencies/permits",
                 "IDOT permits filed via local district offices; no public listing"),
        ],
    },

    "wa": {
        "name": "Washington",
        "sources": [
            {
                "key": "WA_Seattle_Building",
                "name": "Seattle SDCI Built-Environment Permits",
                "kind": "socrata",
                "domain": "data.seattle.gov",
                "dataset": "76t5-zqzr",
                "url": "https://data.seattle.gov/Permitting/Built-Environment-Permits/76t5-zqzr",
                "issue_date_field": "issueddate",
                "limit": 5000,
                "fields": {
                    "permit_number": "permitnum",
                    "applicant": "contractor",
                    "address": "originaladdress1",
                    "permit_type": "permitclass",
                    "issue_date": "issueddate",
                    "filed_date": "applieddate",
                    "expiration_date": "expiresdate",
                    "description": "description",
                },
            },
            stub("WA_WSDOT_Permits",
                 "WSDOT Access & Utility Permits",
                 "https://wsdot.wa.gov/business-wsdot/permits-applications",
                 "WSDOT permits aren't published as a single public dataset"),
        ],
    },

    "ma": {
        "name": "Massachusetts",
        "sources": [
            {
                "key": "MA_Boston_Permits",
                "name": "Boston ISD Approved Building Permits",
                "kind": "socrata",
                "domain": "data.boston.gov",
                "dataset": "6ddb-23h5",
                "url": "https://data.boston.gov/dataset/approved-building-permits",
                "issue_date_field": "issued_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "permitnumber",
                    "applicant": "applicant",
                    "address": "address",
                    "permit_type": "permittypedescr",
                    "issue_date": "issued_date",
                    "filed_date": "applicant_business_name",
                    "expiration_date": "expiration_date",
                    "description": "description",
                },
            },
        ],
    },

    "tx": {
        "name": "Texas",
        "sources": [
            {
                "key": "TX_Austin_Construction",
                "name": "Austin Issued Construction Permits",
                "kind": "socrata",
                "domain": "data.austintexas.gov",
                "dataset": "3syk-w9eu",
                "url": "https://data.austintexas.gov/Building-and-Development/Issued-Construction-Permits/3syk-w9eu",
                "issue_date_field": "issued_date",
                "limit": 5000,
                "fields": {
                    "permit_number": "permit_number",
                    "applicant": "contractor_company_name",
                    "address": "original_address1",
                    "permit_type": "permit_type_desc",
                    "issue_date": "issued_date",
                    "filed_date": "applied_date",
                    "expiration_date": "expires_date",
                    "description": "description",
                },
            },
            stub("TX_Houston_Permits",
                 "Houston Public Works Permits",
                 "https://www.houstonpermittingcenter.org/",
                 "Houston permits live behind ILMS — no public dataset"),
            stub("TX_Dallas_Permits",
                 "Dallas Building Permits",
                 "https://www.dallasopendata.com/",
                 "Dataset ID needs verification — see DallasOpenData portal"),
            stub("TX_TxDOT_ROW",
                 "TxDOT Right-of-Way Permits",
                 "https://www.txdot.gov/business/resources/right-of-way.html",
                 "TxDOT ROW permits aren't published as a queryable dataset"),
        ],
    },

    # =================================================================
    # States where we know the portal but haven't wired anything yet.
    # =================================================================
    "co": {
        "name": "Colorado",
        "sources": [
            stub("CO_Denver_Permits", "Denver Building Permits",
                 "https://opendata-geospatialdenver.hub.arcgis.com/",
                 "Denver publishes through ArcGIS Hub — needs FeatureServer URL"),
            stub("CO_CDOT", "CDOT Access & Utility Permits",
                 "https://www.codot.gov/business/permits",
                 "CDOT permits via OnBase portal — auth required"),
        ],
    },

    "pa": {
        "name": "Pennsylvania",
        "sources": [
            stub("PA_Philly_Permits", "Philadelphia L&I Building Permits",
                 "https://www.opendataphilly.org/dataset/licenses-and-inspections-building-permits",
                 "Philadelphia L&I uses Carto, not Socrata — needs separate fetch impl"),
            stub("PA_Pittsburgh_Permits", "Pittsburgh PLI Permits",
                 "https://data.wprdc.org/dataset/pittsburgh-pli-permits-issued",
                 "WPRDC CKAN — needs separate fetch impl"),
            stub("PA_PennDOT", "PennDOT Highway Occupancy Permits",
                 "https://www.dot.state.pa.us/Public/PdfForms/Forms/M-945A.pdf",
                 "PennDOT HOPs filed via ePermitting — auth required"),
        ],
    },

    "or": {
        "name": "Oregon",
        "sources": [
            stub("OR_Portland_ROW", "Portland ROW Permits",
                 "https://www.portland.gov/transportation/permitting",
                 "PBOT permits via Cityworks portal — auth required for full data"),
            stub("OR_ODOT_Permits", "ODOT Permits",
                 "https://www.oregon.gov/odot/Permits/",
                 "ODOT ROW permits aren't published as a public dataset"),
        ],
    },

    "fl": {
        "name": "Florida",
        "sources": [
            stub("FL_Miami_Permits", "Miami-Dade Permits",
                 "https://gis-mdc.opendata.arcgis.com/",
                 "Miami-Dade ArcGIS Hub — FeatureServer URL needs sniffing"),
            stub("FL_FDOT_Permits", "FDOT Permits",
                 "https://www.fdot.gov/permits/default.shtm",
                 "FDOT One-Stop Permitting — auth required"),
        ],
    },

    "ga": {
        "name": "Georgia",
        "sources": [
            stub("GA_Atlanta_Permits", "Atlanta Building Permits",
                 "https://aurora.atlantaga.gov/",
                 "Aurora portal — JS-rendered, needs Playwright"),
            stub("GA_GDOT_Permits", "GDOT Permits",
                 "https://www.dot.ga.gov/PartnerSmart/Business/Pages/Permits.aspx",
                 "GDOT permits via GUPS — auth required"),
        ],
    },

    "az": {
        "name": "Arizona",
        "sources": [
            stub("AZ_Phoenix_Permits", "Phoenix PDD Permits",
                 "https://www.phoenix.gov/pdd/permits",
                 "Phoenix PlanIt portal — JS-rendered"),
            stub("AZ_ADOT_Permits", "ADOT Encroachment Permits",
                 "https://azdot.gov/business/engineering-and-construction/permits",
                 "ADOT permits via Permitting Portal — auth required"),
        ],
    },

    "nc": {
        "name": "North Carolina",
        "sources": [
            stub("NC_Charlotte_Permits", "Charlotte Building Permits",
                 "https://data.charlottenc.gov/",
                 "Charlotte ArcGIS Hub — FeatureServer URL needs sniffing"),
            stub("NC_Raleigh_Permits", "Raleigh Building Permits",
                 "https://data.raleighnc.gov/",
                 "Raleigh ArcGIS Hub — FeatureServer URL needs sniffing"),
            stub("NC_NCDOT_Permits", "NCDOT Encroachment Permits",
                 "https://connect.ncdot.gov/business/Pages/Permits.aspx",
                 "NCDOT encroachment permits filed via PEPS — auth required"),
        ],
    },
}


# ---------------------------------------------------------------------------
# Stub-only states — populated programmatically.
# (state_code, name, primary_city, portal_url)
# ---------------------------------------------------------------------------
STUB_ONLY_STATES = [
    ("al", "Alabama",       "Birmingham",     "https://www.birminghamal.gov/permits"),
    ("ak", "Alaska",        "Anchorage",      "https://www.muni.org/Departments/OCPD/permits"),
    ("ar", "Arkansas",      "Little Rock",    "https://www.littlerock.gov/"),
    ("ct", "Connecticut",   "Hartford",       "https://www.hartford.gov/government/departments/development-services"),
    ("de", "Delaware",      "Wilmington",     "https://www.wilmingtonde.gov/"),
    ("hi", "Hawaii",        "Honolulu",       "https://www.honolulu.gov/dpp"),
    ("id", "Idaho",         "Boise",          "https://www.cityofboise.org/departments/planning-and-development-services/"),
    ("in", "Indiana",       "Indianapolis",   "https://www.indy.gov/agency/department-of-business-and-neighborhood-services"),
    ("ia", "Iowa",          "Des Moines",     "https://www.dsm.city/"),
    ("ks", "Kansas",        "Wichita",        "https://www.wichita.gov/"),
    ("ky", "Kentucky",      "Louisville",     "https://louisvilleky.gov/government/develop-louisville/permits-licensing"),
    ("la", "Louisiana",     "New Orleans",    "https://www.nola.gov/safety-and-permits/"),
    ("me", "Maine",         "Portland",       "https://www.portlandmaine.gov/"),
    ("md", "Maryland",      "Baltimore",      "https://www.baltimorecity.gov/"),
    ("mi", "Michigan",      "Detroit",        "https://detroitmi.gov/departments/buildings-safety-engineering-and-environmental-department"),
    ("mn", "Minnesota",     "Minneapolis",    "https://www2.minneapolismn.gov/business/cspws/"),
    ("ms", "Mississippi",   "Jackson",        "https://www.jacksonms.gov/"),
    ("mo", "Missouri",      "Kansas City",    "https://www.kcmo.gov/city-hall/departments/city-planning-development"),
    ("mt", "Montana",       "Billings",       "https://www.billingsmt.gov/"),
    ("ne", "Nebraska",      "Omaha",          "https://permitsandinspections.cityofomaha.org/"),
    ("nv", "Nevada",        "Las Vegas",      "https://www.lasvegasnevada.gov/Business/Permits-Licenses"),
    ("nh", "New Hampshire", "Manchester",     "https://www.manchesternh.gov/"),
    ("nj", "New Jersey",    "Newark",         "https://www.newarknj.gov/"),
    ("nm", "New Mexico",    "Albuquerque",    "https://www.cabq.gov/planning"),
    ("nd", "North Dakota",  "Fargo",          "https://www.fargond.gov/city-government/departments/inspections"),
    ("oh", "Ohio",          "Columbus",       "https://www.columbus.gov/bzs/"),
    ("ok", "Oklahoma",      "Oklahoma City",  "https://www.okc.gov/departments/development-services"),
    ("ri", "Rhode Island",  "Providence",     "https://www.providenceri.gov/"),
    ("sc", "South Carolina","Columbia",       "https://www.columbiasc.gov/"),
    ("sd", "South Dakota",  "Sioux Falls",    "https://www.siouxfalls.org/"),
    ("tn", "Tennessee",     "Nashville",      "https://www.nashville.gov/departments/codes"),
    ("ut", "Utah",          "Salt Lake City", "https://www.slc.gov/buildingservices/"),
    ("vt", "Vermont",       "Burlington",     "https://www.burlingtonvt.gov/"),
    ("va", "Virginia",      "Virginia Beach", "https://www.vbgov.com/"),
    ("wv", "West Virginia", "Charleston",     "https://www.charlestonwv.gov/"),
    ("wi", "Wisconsin",     "Milwaukee",      "https://city.milwaukee.gov/permits"),
    ("wy", "Wyoming",       "Cheyenne",       "https://www.cheyennecity.org/"),
]


for code, name, city, url in STUB_ONLY_STATES:
    STATE_DEFS[code] = {
        "name": name,
        "sources": [city_stub(code, city, url)],
    }


# ---------------------------------------------------------------------------
# Renderers
# ---------------------------------------------------------------------------
NYC_APPLICANT_OVERRIDE = '''
    def _socrata_row_to_permit(self, row, source):
        # NYC DOB splits applicant across multiple fields; reconstruct.
        if source.get("dataset") == "ipu4-2q9a":
            biz = (row.get("applicant_s_business_name") or "").strip()
            first = (row.get("applicant_s_first_name") or "").strip()
            last  = (row.get("applicant_s_last_name") or "").strip()
            applicant = biz or " ".join(p for p in (first, last) if p)
            row = dict(row)
            row["__merged_applicant"] = applicant
        return super()._socrata_row_to_permit(row, source)
'''


SCRAPER_TEMPLATE = '''\
"""{state_name} permit scraper.

This file was generated by `_gen_state_scrapers.py`. Edits made directly
will be overwritten if you re-run the generator. To customize per-state
behavior beyond the SOURCES list, override `fetch_one()` or
`_socrata_row_to_permit()` here.
"""
from __future__ import annotations

from typing import Any

from .base import BasePermitScraper


class Scraper(BasePermitScraper):
    STATE = {state_code!r}
    STATE_NAME = {state_name!r}
    SOURCES: list[dict[str, Any]] = {sources}
{extra}
'''


def render(code: str, defn: dict) -> str:
    extra = ""
    if defn.get("extra_methods") == "_NYC_APPLICANT_OVERRIDE":
        extra = NYC_APPLICANT_OVERRIDE
    sources_repr = pformat(defn["sources"], width=100, sort_dicts=False)
    # Indent the sources list so it sits cleanly inside the class body.
    sources_repr = sources_repr.replace("\n", "\n    ")
    return SCRAPER_TEMPLATE.format(
        state_code=code.upper(),
        state_name=defn["name"],
        sources=sources_repr,
        extra=extra,
    )


def main() -> None:
    SCRAPERS.mkdir(exist_ok=True)
    written = 0
    for code, defn in sorted(STATE_DEFS.items()):
        path = SCRAPERS / f"{code}.py"
        path.write_text(render(code, defn), encoding="utf-8")
        written += 1
    print(f"wrote {written} state scraper files to {SCRAPERS}")


if __name__ == "__main__":
    main()
