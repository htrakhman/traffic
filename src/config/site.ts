/** Apex production host (set DNS + TLS at Netlify/Vercel; optional www → redirect). */
export const SITE_DOMAIN = 'trafficcontrolrental.com'

export const SITE_ORIGIN = `https://${SITE_DOMAIN}`

/** Brand / legal line — matches public domain. */
export const SITE_NAME = 'Traffic Control Rental'

/** Primary homepage SERP title (HTML `<title>` / Google title link). */
export const DEFAULT_PAGE_TITLE = 'Traffic Control & Safety Equipment Rentals'

export const SITE_CONTACT_EMAIL = `rent@${SITE_DOMAIN}`
