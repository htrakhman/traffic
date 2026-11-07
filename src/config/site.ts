/** Registered domain. */
export const SITE_DOMAIN = 'trafficcontrolsupply.com'

/** Canonical origin. The apex 308-redirects to www, so canonicals must use www. */
export const SITE_ORIGIN = `https://www.${SITE_DOMAIN}`

/** Brand / legal line — matches public domain. */
export const SITE_NAME = 'Traffic Control Supply'

/** Logo asset (served from `public/brand/`). */
export const SITE_LOGO_PATH = '/brand/traffic-control-supply-logo.png'

/** Primary homepage SERP title (HTML `<title>` / Google title link). */
export const DEFAULT_PAGE_TITLE = 'Traffic Control & Safety Equipment'

/** Byline for guides and the About page. Shown as a Person in Article schema. */
export const SITE_AUTHOR = {
  name: 'Harold Trakhman',
  jobTitle: 'Founder, Traffic Control Supply',
  bio: 'Harold founded Traffic Control Supply in New Jersey. He sources crowd control barricades, water-filled barriers and work zone equipment from manufacturers and distributors across the US for contractors, towns and event producers, and writes these guides from the questions buyers ask him.',
  path: '/about',
}

/** Public contact email shown across the site. */
export const SITE_CONTACT_EMAIL = 'harold@trafficcontrolsupply.com'
