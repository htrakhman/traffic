#!/usr/bin/env node
/**
 * Downloads Traffic Safety Store sitemap, extracts /shop/{slug}/{sku} product URLs,
 * infers colorways / reflective “schemes” from URL slugs, groups sibling SKUs, and writes
 * public/tss-catalog.json with purchase volume tiers (supplier ref ×1.5 at checkout).
 */
import { createHash } from 'node:crypto'
import { writeFileSync, mkdirSync, renameSync, unlinkSync, existsSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITEMAP = 'https://www.trafficsafetystore.com/sitemap.xml'
const OUT = fileURLToPath(new URL('../public/tss-catalog.json', import.meta.url))
const CACHE = fileURLToPath(new URL('../public/.tss-price-cache.json', import.meta.url))
const SUPPLIER = 'Traffic Safety Store'

const FETCH_DELAY_MS = 350
const PRICE_FETCH_TIMEOUT_MS = 12_000
const MAX_RETRIES = 2

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function loadPriceCache() {
  if (existsSync(CACHE)) {
    try { return JSON.parse(readFileSync(CACHE, 'utf8')) } catch { /* ignore */ }
  }
  return {}
}

function savePriceCache(cache) {
  writeFileSync(CACHE, JSON.stringify(cache), 'utf8')
}

/**
 * Parse the TSS "Volume Pricing:" table from a product page HTML.
 * Returns { volumePriceTiers } or null if the table is absent / unparseable.
 */
function parseVolumePricingFromHtml(html) {
  const vpIdx = html.indexOf('Volume Pricing:')
  if (vpIdx === -1) return null
  const tableStart = html.indexOf('<table', vpIdx)
  if (tableStart === -1) return null
  const tableEnd = html.indexOf('</table>', tableStart)
  if (tableEnd === -1) return null
  const tableHtml = html.slice(tableStart, tableEnd + 8)

  const theadMatch = tableHtml.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
  if (!theadMatch) return null
  // "Quantity<br /> 1-14"  or  "Quantity<br /> 50+"
  const qtyRe = /Quantity<br\s*\/?>\s*(\d+)(?:\s*[-–]\s*(\d+)|\+)/gi
  const ranges = []
  let qm
  while ((qm = qtyRe.exec(theadMatch[1]))) {
    ranges.push({ min: parseInt(qm[1], 10), max: qm[2] ? parseInt(qm[2], 10) : null })
  }
  if (!ranges.length) return null

  const tbodyMatch = tableHtml.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (!tbodyMatch) return null
  const priceRe = /\$(\d+\.\d{2})/g
  const allPrices = []
  let pm
  while ((pm = priceRe.exec(tbodyMatch[1]))) allPrices.push(parseFloat(pm[1]))
  if (!allPrices.length) return null

  const n = ranges.length
  const rows = []
  for (let i = 0; i + n <= allPrices.length; i += n) rows.push(allPrices.slice(i, i + n))
  if (!rows.length) return null

  // TSS sometimes shows original (black) and sale (orange) rows; pick lowest-sum row = current active price
  const bestRow = rows.reduce((best, row) =>
    row.reduce((s, p) => s + p, 0) < best.reduce((s, p) => s + p, 0) ? row : best,
  )

  return {
    volumePriceTiers: ranges.map((range, i) => ({
      minQty: range.min,
      maxQty: range.max,
      supplierReferenceUnitPrice: Math.round((bestRow[i] / 1.5) * 100) / 100,
    })),
  }
}

/**
 * Fetch a TSS product page and extract real volume price tiers.
 * Returns { volumePriceTiers } or null on failure (caller falls back to category estimate).
 */
async function fetchProductPriceTiers(url) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), PRICE_FETCH_TIMEOUT_MS)
      const res = await fetch(url, {
        headers: { 'user-agent': 'TrafficControlRental-catalog-sync/1.0' },
        signal: controller.signal,
      })
      clearTimeout(timer)
      if (res.status === 429) { await sleep(2000 * (attempt + 1)); continue }
      if (!res.ok) return null
      return parseVolumePricingFromHtml(await res.text())
    } catch {
      if (attempt < MAX_RETRIES) await sleep(1000 * (attempt + 1))
    }
  }
  return null
}

/**
 * Fallback: one open-ended purchase tier from a category-level TSS estimate.
 * Stored ref divides by 1.5; app-side ×2.025 yields TSS×1.35 (35% markup).
 */
function purchaseTiersFromRefDaily(tssRetail) {
  const ref = Math.round((tssRetail / 1.5) * 100) / 100
  return {
    volumePriceTiers: [{ minQty: 1, maxQty: null, supplierReferenceUnitPrice: ref }],
  }
}

const RULES = [
  { re: /fall-?protection|body-?harness|harness-|lanyard|retractable|self-?retract|carabiner|rope-?grab|vertical-?lifeline/i, cat: 'cat-15', slug: 'fall-protection', ref: 60 },
  { re: /speed-?bump|speed-?hump/i, cat: 'cat-10', slug: 'speed-bumps-humps', ref: 80 },
  { re: /parking-?block|wheel-?stop|parking-?curb/i, cat: 'cat-9', slug: 'parking-blocks', ref: 40 },
  { re: /chock|wheel-?chock/i, cat: 'cat-16', slug: 'bollards-chocks-corners', ref: 95 },
  { re: /bollard|corner-?guard/i, cat: 'cat-16', slug: 'bollards-chocks-corners', ref: 35 },
  { re: /kask|hard-?hat|safety-?helmet|helmet/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 60 },
  { re: /safety-?shoe|work-?boot|boot waterproof/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 80 },
  { re: /work-?glove|glove/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 8 },
  { re: /safety-?glass|eye-?protection|goggle/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 15 },
  { re: /hi-?vis|hi-?visibility|vest|ansi class|apparel-?shirt|survey-?vest/i, cat: 'cat-11', slug: 'safety-vests-hi-vis', ref: 20 },
  { re: /yodock|water-?filled|jersey|plasticade|longitudinal-?channelizer|sand-?filled|concrete-?barrier/i, cat: 'cat-3', slug: 'barricades-barriers', ref: 425 },
  { re: /cable-?protector|hose-?bridge|drop-?over|cord-?cover/i, cat: 'cat-14', slug: 'fencing-site-safety', ref: 75 },
  { re: /fence|fencing|crowd-?control|plastic-?barrier|net-?ting|site-?safety/i, cat: 'cat-14', slug: 'fencing-site-safety', ref: 110 },
  { re: /striping|marking-?paint|spray-?stripe|thermoplastic|traffic-?paint/i, cat: 'cat-13', slug: 'striping-pavement-paint', ref: 65 },
  { re: /pavement-?marking|preformed|tape-?roll|temporary-?tape/i, cat: 'cat-13', slug: 'striping-pavement-paint', ref: 95 },
  { re: /reflective-?tape|conspicuity/i, cat: 'cat-8', slug: 'accessories-hardware', ref: 50 },
  { re: /orion|road-?flare|flare/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 25 },
  { re: /marker|delineator|delineation|tab-marker|raised-?pavement/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 30 },
  { re: /wand|paddle|flag(?!ger)/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 20 },
  { re: /triangle|reflector-?kit/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 30 },
  { re: /valet|velvet-?rope|stanchion/i, cat: 'cat-7', slug: 'pedestrian-control', ref: 80 },
  { re: /pedestrian|urbanite|crowd|bike-?rack|bike-?lane/i, cat: 'cat-7', slug: 'pedestrian-control', ref: 130 },
  { re: /type-?i{1,3}\b|barricade|a-cade|cade-?barricade|folding-?plastic|mutcd-?(i{1,3})/i, cat: 'cat-3', slug: 'barricades-barriers', ref: 150 },
  { re: /arrow-?board|wanco|gregory.*arrow|solar-?arrow/i, cat: 'cat-4', slug: 'arrow-boards', ref: 2500 },
  { re: /message-?board|PCMS|variable-?message|VMS|ver-?mac.*cms/i, cat: 'cat-5', slug: 'message-boards', ref: 5000 },
  { re: /PCMS|bpcms/i, cat: 'cat-5', slug: 'message-boards', ref: 5000 },
  { re: /sign-?stand|trip-?od|quad-?pod|roll-?up|roll-?up-?sign|mutcd.*sign|rigid-?sign|sign-?mate/i, cat: 'cat-2', slug: 'signs-sign-stands', ref: 80 },
  { re: /traffic-?sign|warning-?sign|legend|sheet-?sign|aluminum-?sign|mutcd-?w\d/i, cat: 'cat-2', slug: 'signs-sign-stands', ref: 50 },
  { re: /channelizer|looper|delineator-?tube|tube-?delineator|grabber|channelizing-?cone/i, cat: 'cat-1', slug: 'cones-drums', ref: 25 },
  { re: /drum\b|traffic-?drum|construction-?barrel/i, cat: 'cat-1', slug: 'cones-drums', ref: 70 },
  { re: /cone\b|cones|enviro-?cone|slimline|traffix|cone-?weight/i, cat: 'cat-1', slug: 'cones-drums', ref: 25 },
  { re: /solar-?assist|flasher|barricade-?light|strobe|warning-?light|beacon|type-?[ab]\b.*flash/i, cat: 'cat-6', slug: 'safety-lighting', ref: 130 },
  { re: /accessory|attachment|bracket|sand-?bag|ballast|weight-?bag|cone-?bar|adapter|clip|mount/i, cat: 'cat-8', slug: 'accessories-hardware', ref: 25 },
]

const DEFAULT_RULE = { cat: 'cat-8', slug: 'accessories-hardware', ref: 25 }

function classify(slugPath) {
  const s = slugPath.toLowerCase()
  for (const r of RULES) {
    if (r.re.test(s)) return { categoryId: r.cat, categorySlug: r.slug, refDaily: r.ref }
  }
  return { categoryId: DEFAULT_RULE.cat, categorySlug: DEFAULT_RULE.slug, refDaily: DEFAULT_RULE.ref }
}

const IMG_BY_CAT = {
  'cat-1': '/catalog/cone-28-orange-7lb.webp',
  'cat-2': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp',
  'cat-3': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/break-away-system-type-3-barricade-with-8-ft-plastic-rails-no-customization-engineer-grade-eg-single.webp',
  'cat-4': 'https://www.wanco.com/wp-content/uploads/2020/03/featr-prod-arrowbd-trailer-folding-585x400.jpg',
  'cat-5': 'https://vermaccom-218d5.kxcdn.com/media/product/image/image/bpcms-1210_deploye_g3_face_1000x1000_left_lane_closed_v2.png.1000x1000_q85_crop-center_upscale.png',
  'cat-6': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-solar-assist-type-b-flasher-red.webp',
  'cat-7': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/urbanite-crowd-control-barricades-white-none-no-sheeting-water-filled-barricade.webp',
  'cat-8': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/cone-bar-signs-danger-jbc-safety-cone-construction-cone-roll-up-sign.webp',
  'cat-9': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/commercial-parking-block-3ft-blue-18-galv-steel-spikes-asphalt-gravel-or-dirt-rubber-wheel-stop-parking-curb-ada-compliant.webp',
  'cat-10': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/economy-rubber-speed-hump-middle-section-18-galv-steel-spikes-asphalt-gravel-or-dirt-traffic-calming.webp',
  'cat-11': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp',
  'cat-12': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/kask-zenith-x2-helmets-white.webp',
  'cat-13': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/blue-construction-marking-paint-case-of-12-aervoe.webp',
  'cat-14': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/galv-steel-crowd-control-fence-bridge-feet.webp',
  'cat-15': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/radians-high-visibility-breakaway-by-back-safety-harness-lime.webp',
  'cat-16': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/tall-bollard-cover-5-inch-diameter-52in-blue.webp',
  'cat-17': 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/orion-15-minute-road-flares-case-of-72-without-wire-stand.webp',
}

function titleize(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Slugs encode mixed numbers as N-num-den-inch (e.g. 12-3-4-inch → "12 3 4 Inch"); restore readable fractions. */
function repairMixedFractionDimensions(s) {
  return s.replace(/\b(\d+) (\d{1,2}) (\d{1,2}) Inch\b/g, '$1 $2/$3 Inch')
}

/** Rare TSS slug typo: …-double-sided-sided → "Double Sided Sided" in title copy. */
function repairDuplicateSidedWord(s) {
  return s.replace(/\b(Single|Double) Sided Sided\b/gi, '$1 Sided')
}

function polishTitleFromSlugTitle(s) {
  return repairDuplicateSidedWord(repairMixedFractionDimensions(s))
}

function hashId(url) {
  return `tss-${createHash('sha256').update(url).digest('hex').slice(0, 16)}`
}

const NOT_COLOR = new Set(['economy', 'heavy', 'duty', 'standard', 'premium', 'max', 'mini', 'kit'])

const COLOR_SEGMENTS = new Set([
  'orange',
  'lime',
  'yellow',
  'white',
  'black',
  'blue',
  'red',
  'green',
  'pink',
  'purple',
  'brown',
  'gray',
  'grey',
  'silver',
  'tan',
  'beige',
  'navy',
  'teal',
  'magenta',
  'chrome',
  'clear',
  'opaque',
  'solid',
  'fluorescent',
  'colored',
  'multicolor',
  'multicolour',
])

const VARIANT_STRIP_PHRASES = ['fluorescent-lime', 'fluorescent-orange', 'orange-lime', 'lime-green', 'high-visibility', 'hi-vis']

function variantGroupKeyFromSlug(slugSeg) {
  let s = slugSeg.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  for (const ph of VARIANT_STRIP_PHRASES) {
    s = s.split(ph).join('-')
  }
  const parts = s.split('-').filter(Boolean)
  const out = []
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (p === 'fluorescent' && (parts[i + 1] === 'lime' || parts[i + 1] === 'orange')) {
      i++
      continue
    }
    if (NOT_COLOR.has(p)) {
      out.push(p)
      continue
    }
    if (COLOR_SEGMENTS.has(p)) continue
    out.push(p)
  }
  const key = out.join('-')
  if (key.length < 12) return null
  return key
}

function extractColorLabel(slugSeg) {
  const norm = slugSeg.toLowerCase().replace(/-/g, ' ')
  if (/\bfluorescent\s+lime\b/.test(norm)) return 'Fluorescent Lime'
  if (/\bfluorescent\s+orange\b/.test(norm)) return 'Fluorescent Orange'
  if (/\borange\s+lime\b/.test(norm) || /\blime\s+orange\b/.test(norm)) return 'Orange / Lime'
  if (/\bhi\s*vis\b|\bhigh\s+visibility\b/.test(norm)) return 'Hi-Vis'
  const singles = [
    ['lime green', 'Lime Green'],
    ['fluorescent', 'Fluorescent'],
    ['orange', 'Orange'],
    ['lime', 'Lime'],
    ['yellow', 'Yellow'],
    ['white', 'White'],
    ['black', 'Black'],
    ['blue', 'Blue'],
    ['red', 'Red'],
    ['green', 'Green'],
    ['pink', 'Pink'],
    ['purple', 'Purple'],
    ['brown', 'Brown'],
    ['gray', 'Gray'],
    ['grey', 'Grey'],
    ['silver', 'Silver'],
    ['tan', 'Tan'],
    ['beige', 'Beige'],
    ['navy', 'Navy'],
    ['teal', 'Teal'],
    ['magenta', 'Magenta'],
    ['chrome', 'Chrome'],
    ['clear', 'Clear'],
  ]
  for (const [pat, label] of singles) {
    const re = new RegExp(`\\b${pat.replace(/ /g, '\\s+')}\\b`)
    if (re.test(norm)) return label
  }
  return undefined
}

function extractFinishLabel(slugSeg) {
  const s = slugSeg.toLowerCase()
  if (/diamond[\s-]*grade|diamond-grade/i.test(s)) return 'Diamond-grade'
  if (/high[\s-]*intensity|high-intensity|hi-[\w]*reflect|hi-drum|\bhi\b.*sheeting/i.test(s)) return 'High-intensity'
  if (/engineer[\s-]*grade|engineer-grade|\b-eg-\b|^eg-\b|-eg$/i.test(s)) return 'Engineer-grade'
  if (/non[\s-]*reflective|non-reflective/i.test(s)) return 'Non-reflective'
  if (/reflective/i.test(s) && !/non/i.test(s)) return 'Reflective'
  return undefined
}

const SWATCH = {
  Orange: '#ea580c',
  Lime: '#84cc16',
  'Fluorescent Lime': '#a3e635',
  'Fluorescent Orange': '#fb923c',
  Yellow: '#eab308',
  White: '#f1f5f9',
  Black: '#171717',
  Blue: '#2563eb',
  Red: '#dc2626',
  Green: '#16a34a',
  Pink: '#ec4899',
  Purple: '#9333ea',
  Brown: '#92400e',
  Gray: '#64748b',
  Grey: '#64748b',
  Silver: '#94a3b8',
  Tan: '#d6d3d1',
  Beige: '#e7e5e4',
  Navy: '#1e3a8a',
  Teal: '#0d9488',
  Magenta: '#c026d3',
  Chrome: '#cbd5e1',
  Clear: '#e2e8f0',
  'Hi-Vis': '#bef264',
  'Orange / Lime': '#f97316',
  Fluorescent: '#bef264',
  Reflective: '#f59e0b',
  'Non-reflective': '#64748b',
  'High-intensity': '#fbbf24',
  'Engineer-grade': '#94a3b8',
  'Diamond-grade': '#fcd34d',
}

function swatchHex(label) {
  if (!label) return undefined
  return SWATCH[label] ?? SWATCH[label.split(' ')[0]]
}

const IMG_CONE_ORANGE = '/catalog/cone-28-orange-7lb.webp'
const IMG_CONE_LIME = '/catalog/cone-36-lime.png'
/** TSS yellow cone asset 404s; reuse orange hero until a stable yellow asset is bundled. */
const IMG_CONE_YELLOW = '/catalog/cone-28-orange-7lb.webp'
const IMG_YODOCK_ORANGE =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-barrier-orange-without-optional-fence-water-filled-barricade.webp'
const IMG_YODOCK_WHITE =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-barrier-white-without-optional-fence-water-filled-barricade.webp'
const IMG_VEST_LIME =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp'
const IMG_DRUM_ORANGE = '/catalog/channelizing-drum-6in-hi-tire-base.webp'
const IMG_ORION_FLARE =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/orion-15-minute-road-flares-case-of-72-without-wire-stand.webp'
const IMG_TYPE_B_FLASH =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-solar-assist-type-b-flasher-red.webp'
const IMG_TYPE2_BARRICADE =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-type-ii-barricade-with-steel-legs-plastic-panels-eg-reflective-sheeting.webp'
const IMG_ROLL_ROAD_WORK = IMG_BY_CAT['cat-2']
const IMG_ROLL_FLAGGER =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-flagger-ahead-text-hip-roll-up-sign-mutcd.webp'
const IMG_ROLL_ONE_LANE =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-one-lane-road-ahead-hip-roll-up-sign-mutcd.webp'

function pickHeroImage(categoryId, categorySlug, slugSeg, colorLabel) {
  const c = (colorLabel || '').toLowerCase()
  const s = slugSeg.toLowerCase()

  if (/\borion\b|road-flare|\bflar(es)?\b/i.test(s)) return IMG_ORION_FLARE
  if (/\bflasher\b|\bstrobe\b|\bbeacon\b|solar-assist|barricade-light|warning-light|led-barricade/i.test(s)) return IMG_TYPE_B_FLASH
  if (/message-board|variable-message|PCMS|pcms|changeable-message|\bVMS\b/i.test(s)) return IMG_BY_CAT['cat-5']

  if (/\bdrum\b|barrel|channelizing|construction-barrel/i.test(s)) return IMG_DRUM_ORANGE

  if (/yodock|water-filled|jersey-style|plasticade/i.test(s)) {
    if (c.includes('white')) return IMG_YODOCK_WHITE
    return IMG_YODOCK_ORANGE
  }

  if (/type-ii\b|type-2\b|type\s*ii\b/i.test(s)) return IMG_TYPE2_BARRICADE

  if (/roll-up|rollup|roll\s*up/i.test(s)) {
    if (/flagger|w20-7/i.test(s)) return IMG_ROLL_FLAGGER
    if (/one-lane|w20-4|lane-closed/i.test(s)) return IMG_ROLL_ONE_LANE
    return IMG_ROLL_ROAD_WORK
  }

  if (
    categorySlug === 'cones-drums' ||
    /\bcones?\b|delineator|channelizer|looper|\btube\b|grabber|enviro-cone|slimline|traffix/i.test(s)
  ) {
    if (c.includes('lime') || c.includes('fluorescent lime')) return IMG_CONE_LIME
    if (c.includes('yellow')) return IMG_CONE_YELLOW
    if (c.includes('orange')) return IMG_CONE_ORANGE
    return IMG_CONE_ORANGE
  }

  if (categorySlug === 'safety-vests-hi-vis' || /vests?|hi-vis|ansi-class/i.test(s)) return IMG_VEST_LIME
  return IMG_BY_CAT[categoryId] ?? IMG_BY_CAT['cat-8']
}


function attachVariantGroups(products) {
  const groups = new Map()
  for (const p of products) {
    let slugSeg
    try {
      const path = new URL(p.supplierUrl).pathname.split('/').filter(Boolean)
      slugSeg = path[0] === 'shop' ? path[1] : ''
    } catch {
      continue
    }
    if (!slugSeg) continue
    const rawKey = variantGroupKeyFromSlug(slugSeg)
    if (!rawKey) continue
    const gk = `${p.categorySlug}::${rawKey}`
    if (!groups.has(gk)) groups.set(gk, [])
    groups.get(gk).push(p)
  }
  for (const group of groups.values()) {
    if (group.length < 2) continue
    for (const p of group) {
      const variants = group
        .map((v) => {
          let seg = ''
          try {
            const path = new URL(v.supplierUrl).pathname.split('/').filter(Boolean)
            seg = path[0] === 'shop' ? path[1] : ''
          } catch {
            /* skip */
          }
          const lab = v.colorLabel ?? extractColorLabel(seg) ?? v.supplierSku
          return {
            label: lab,
            slug: v.slug,
            supplierSku: v.supplierSku,
            supplierUrl: v.supplierUrl,
            volumePriceTiers: v.volumePriceTiers,
            swatch: swatchHex(v.colorLabel ?? extractColorLabel(seg)),
          }
        })
        .sort((a, b) => a.label.localeCompare(b.label))
      const seen = new Set()
      p.colorVariants = variants.filter((x) => {
        if (seen.has(x.slug)) return false
        seen.add(x.slug)
        return true
      })
      const first = new URL(p.supplierUrl).pathname.split('/').filter(Boolean)[1] ?? ''
      p.variantGroupKey = variantGroupKeyFromSlug(first) ?? undefined
    }
  }
}

async function main() {
  console.log('Fetching sitemap…')
  const res = await fetch(SITEMAP, { headers: { 'user-agent': 'TrafficControlRental-catalog-sync/1.0' } })
  if (!res.ok) throw new Error(`Sitemap HTTP ${res.status}`)
  const xml = await res.text()
  const locRe = /<loc>([^<]+)<\/loc>/g
  const shopUrls = []
  let m
  while ((m = locRe.exec(xml))) {
    const u = m[1].trim()
    if (u.includes('/shop/')) shopUrls.push(u)
  }
  console.log('Found', shopUrls.length, '/shop/ URLs')

  const priceCache = loadPriceCache()
  let cacheHits = 0
  let cacheMisses = 0

  const slugUsed = new Set()
  const seenPaths = new Set()
  const products = []

  for (const url of shopUrls) {
    let pathname
    try {
      pathname = new URL(url).pathname.replace(/\/$/, '')
    } catch {
      continue
    }
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] !== 'shop' || parts.length < 3) continue
    if (seenPaths.has(pathname)) continue
    seenPaths.add(pathname)
    const slugSeg = parts[1]
    const skuRaw = decodeURIComponent(parts.slice(2).join('/'))

    const { categoryId, categorySlug, refDaily } = classify(slugSeg)

    let pricing
    if (priceCache[url]) {
      pricing = priceCache[url]
      cacheHits++
    } else {
      await sleep(FETCH_DELAY_MS)
      const scraped = await fetchProductPriceTiers(url)
      pricing = scraped ?? purchaseTiersFromRefDaily(refDaily)
      priceCache[url] = pricing
      cacheMisses++
      if (cacheMisses % 100 === 0) {
        savePriceCache(priceCache)
        console.log(`  …${products.length + 1} processed, ${cacheMisses} fetched, ${cacheHits} cached`)
      }
    }

    let baseSlug = slugSeg.replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
    if (!baseSlug) baseSlug = 'item'
    const skuSlug = skuRaw.replace(/\s+/g, '-').slice(0, 32).replace(/[^a-z0-9-]/gi, '').toLowerCase()
    let slug = skuSlug ? `${baseSlug}-${skuSlug}` : baseSlug
    let n = 0
    while (slugUsed.has(slug)) {
      n += 1
      slug = `${baseSlug}-${skuSlug || 'n'}-${n}`
    }
    slugUsed.add(slug)

    const colorLabel = extractColorLabel(slugSeg)
    const finishLabel = extractFinishLabel(slugSeg)
    const hero = pickHeroImage(categoryId, categorySlug, slugSeg, colorLabel)

    const nameParts = [polishTitleFromSlugTitle(titleize(slugSeg) || skuRaw)]
    const metaBits = []
    if (colorLabel) metaBits.push(colorLabel)
    if (finishLabel) metaBits.push(finishLabel)
    const name = metaBits.length ? `${nameParts[0]} — ${metaBits.join(' · ')}` : nameParts[0]

    const shortDesc = `${nameParts[0]} (TSS SKU ${skuRaw}).`
    const longDesc = `Catalog match: Traffic Safety Store SKU ${skuRaw}. Purchase unit pricing = reference economics × 1.5 (50% retail markup).${colorLabel ? ` Colorway: ${colorLabel}.` : ''}${finishLabel ? ` Sheeting / scheme: ${finishLabel}.` : ''}`

    const specs = { SKU: skuRaw }
    if (colorLabel) specs.Color = colorLabel
    if (finishLabel) specs.Finish = finishLabel

    products.push({
      id: hashId(url),
      categoryId,
      categorySlug,
      name,
      slug,
      description: shortDesc,
      longDescription: longDesc,
      ...pricing,
      unit: 'each',
      imageUrl: hero,
      images: [hero],
      specs,
      features: ['TSS catalog match', colorLabel && `Color: ${colorLabel}`, finishLabel && `Finish: ${finishLabel}`].filter(
        Boolean,
      ),
      tags: [categorySlug.split('-')[0] ?? 'equipment', ...(colorLabel ? [colorLabel.toLowerCase()] : [])].filter(Boolean),
      inStock: true,
      popular: false,
      sku: `TSS-${skuRaw.replace(/\s+/g, '-').slice(0, 40)}`,
      supplierSku: skuRaw,
      supplierUrl: url,
      supplier: SUPPLIER,
      colorLabel,
      finishLabel,
    })
  }

  attachVariantGroups(products)

  savePriceCache(priceCache)
  console.log(`Price cache: ${cacheHits} hits, ${cacheMisses} fetched (${Object.keys(priceCache).length} total stored)`)

  mkdirSync(dirname(OUT), { recursive: true })
  const tmp = `${OUT}.tmp`
  const payload = JSON.stringify(products)
  try {
    JSON.parse(payload)
  } catch (e) {
    throw new Error(`Catalog JSON self-check failed: ${e}`)
  }
  writeFileSync(tmp, payload, 'utf8')
  try {
    renameSync(tmp, OUT)
  } catch (e) {
    try {
      unlinkSync(tmp)
    } catch {
      /* ignore */
    }
    throw e
  }
  console.log('Wrote', products.length, 'products →', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
