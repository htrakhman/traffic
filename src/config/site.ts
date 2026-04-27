/** Apex production host (set DNS + TLS at Netlify/Vercel; optional www → redirect). */
export const SITE_DOMAIN = 'trafficcontrolsupply.com'

export const SITE_ORIGIN = `https://${SITE_DOMAIN}`

/** Brand / legal line — matches public domain. */
export const SITE_NAME = 'Traffic Control Supply'

/** Logo asset (served from `public/brand/`). */
export const SITE_LOGO_PATH = '/brand/traffic-control-rental-logo.png'

/** Primary homepage SERP title (HTML `<title>` / Google title link). */
export const DEFAULT_PAGE_TITLE = 'Traffic Control & Safety Equipment'

export const SITE_CONTACT_EMAIL = `orders@${SITE_DOMAIN}`

/** E.164 for `href="tel:..."` (include country code). */
export const SITE_CONTACT_PHONE_E164 = '+17326752499'

/** Shown in UI next to phone icon / in copy. */
export const SITE_CONTACT_PHONE_DISPLAY = '(732) 675-2499'
