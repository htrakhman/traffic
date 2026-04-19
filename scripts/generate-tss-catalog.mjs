#!/usr/bin/env node
/**
 * Downloads Traffic Safety Store sitemap, extracts /shop/{slug}/{sku} product URLs,
 * infers colorways / reflective “schemes” from URL slugs, groups sibling SKUs, and writes
 * public/tss-catalog.json with rental rates at 50% retail markup (×1.5).
 */
import { createHash } from 'node:crypto'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITEMAP = 'https://www.trafficsafetystore.com/sitemap.xml'
const OUT = fileURLToPath(new URL('../public/tss-catalog.json', import.meta.url))
const SUPPLIER = 'Traffic Safety Store'

function retailDaily(refDaily) {
  return Math.round(refDaily * 1.5 * 100) / 100
}

function tiersFromDaily(d) {
  return {
    dailyRate: d,
    weeklyRate: Math.round(d * 4 * 100) / 100,
    monthlyRate: Math.round(d * 12 * 100) / 100,
  }
}

const RULES = [
  { re: /fall-?protection|body-?harness|harness-|lanyard|retractable|self-?retract|carabiner|rope-?grab|vertical-?lifeline/i, cat: 'cat-15', slug: 'fall-protection', ref: 5.5 },
  { re: /speed-?bump|speed-?hump/i, cat: 'cat-10', slug: 'speed-bumps-humps', ref: 4 },
  { re: /parking-?block|wheel-?stop|parking-?curb/i, cat: 'cat-9', slug: 'parking-blocks', ref: 2.25 },
  { re: /chock|wheel-?chock/i, cat: 'cat-16', slug: 'bollards-chocks-corners', ref: 1.5 },
  { re: /bollard|corner-?guard/i, cat: 'cat-16', slug: 'bollards-chocks-corners', ref: 3 },
  { re: /kask|hard-?hat|safety-?helmet|helmet/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 3.5 },
  { re: /safety-?shoe|work-?boot|boot waterproof/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 4 },
  { re: /work-?glove|glove/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 1.4 },
  { re: /safety-?glass|eye-?protection|goggle/i, cat: 'cat-12', slug: 'ppe-helmets-gloves-shoes', ref: 1.25 },
  { re: /hi-?vis|hi-?visibility|vest|ansi class|apparel-?shirt|survey-?vest/i, cat: 'cat-11', slug: 'safety-vests-hi-vis', ref: 2 },
  { re: /yodock|water-?filled|jersey|plasticade|longitudinal-?channelizer|sand-?filled|concrete-?barrier/i, cat: 'cat-3', slug: 'barricades-barriers', ref: 12 },
  { re: /cable-?protector|hose-?bridge|drop-?over|cord-?cover/i, cat: 'cat-14', slug: 'fencing-site-safety', ref: 2.8 },
  { re: /fence|fencing|crowd-?control|plastic-?barrier|net-?ting|site-?safety/i, cat: 'cat-14', slug: 'fencing-site-safety', ref: 4.5 },
  { re: /striping|marking-?paint|spray-?stripe|thermoplastic|traffic-?paint/i, cat: 'cat-13', slug: 'striping-pavement-paint', ref: 2.5 },
  { re: /pavement-?marking|preformed|tape-?roll|temporary-?tape/i, cat: 'cat-13', slug: 'striping-pavement-paint', ref: 2 },
  { re: /reflective-?tape|conspicuity/i, cat: 'cat-8', slug: 'accessories-hardware', ref: 1.5 },
  { re: /orion|road-?flare|flare/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 3.5 },
  { re: /marker|delineator|delineation|tab-marker|raised-?pavement/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 2.2 },
  { re: /wand|paddle|flag(?!ger)/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 1.8 },
  { re: /triangle|reflector-?kit/i, cat: 'cat-17', slug: 'flares-markers-wands-flags', ref: 2 },
  { re: /valet|velvet-?rope|stanchion/i, cat: 'cat-7', slug: 'pedestrian-control', ref: 2.5 },
  { re: /pedestrian|urbanite|crowd|bike-?rack|bike-?lane/i, cat: 'cat-7', slug: 'pedestrian-control', ref: 5 },
  { re: /type-?i{1,3}\b|barricade|a-cade|cade-?barricade|folding-?plastic|mutcd-?(i{1,3})/i, cat: 'cat-3', slug: 'barricades-barriers', ref: 5.5 },
  { re: /arrow-?board|wanco|gregory.*arrow|solar-?arrow/i, cat: 'cat-4', slug: 'arrow-boards', ref: 95 },
  { re: /message-?board|PCMS|variable-?message|VMS|ver-?mac.*cms/i, cat: 'cat-5', slug: 'message-boards', ref: 175 },
  { re: /PCMS|bpcms/i, cat: 'cat-5', slug: 'message-boards', ref: 175 },
  { re: /sign-?stand|trip-?od|quad-?pod|roll-?up|roll-?up-?sign|mutcd.*sign|rigid-?sign|sign-?mate/i, cat: 'cat-2', slug: 'signs-sign-stands', ref: 3 },
  { re: /traffic-?sign|warning-?sign|legend|sheet-?sign|aluminum-?sign|mutcd-?w\d/i, cat: 'cat-2', slug: 'signs-sign-stands', ref: 3 },
  { re: /channelizer|looper|delineator-?tube|tube-?delineator|grabber|channelizing-?cone/i, cat: 'cat-1', slug: 'cones-drums', ref: 3 },
  { re: /drum\b|traffic-?drum|construction-?barrel/i, cat: 'cat-1', slug: 'cones-drums', ref: 4.5 },
  { re: /cone\b|cones|enviro-?cone|slimline|traffix|cone-?weight/i, cat: 'cat-1', slug: 'cones-drums', ref: 2.5 },
  { re: /solar-?assist|flasher|barricade-?light|strobe|warning-?light|beacon|type-?[ab]\b.*flash/i, cat: 'cat-6', slug: 'safety-lighting', ref: 2.25 },
  { re: /accessory|attachment|bracket|sand-?bag|ballast|weight-?bag|cone-?bar|adapter|clip|mount/i, cat: 'cat-8', slug: 'accessories-hardware', ref: 1.5 },
]

const DEFAULT_RULE = { cat: 'cat-8', slug: 'accessories-hardware', ref: 2 }

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
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-water-filled-construction-barrier-white-without-optional-fence-water-filled-barricade.webp'
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
            dailyRate: v.dailyRate,
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
    const d = retailDaily(refDaily)
    const pricing = tiersFromDaily(d)

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

    const minDays = /yodock|water-filled|jersey.*barrier/i.test(slugSeg) ? 3 : 1
    const shortDesc = `${nameParts[0]} (TSS SKU ${skuRaw}).`
    const longDesc = `Catalog match: Traffic Safety Store SKU ${skuRaw}. Rental rate = reference economics × 1.5 (50% retail markup).${colorLabel ? ` Colorway: ${colorLabel}.` : ''}${finishLabel ? ` Sheeting / scheme: ${finishLabel}.` : ''}`

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
      tags: [categorySlug.split('-')[0] ?? 'rental', ...(colorLabel ? [colorLabel.toLowerCase()] : [])].filter(Boolean),
      inStock: true,
      popular: false,
      sku: `TSS-${skuRaw.replace(/\s+/g, '-').slice(0, 40)}`,
      supplierSku: skuRaw,
      supplierUrl: url,
      supplier: SUPPLIER,
      minimumRentalDays: minDays,
      colorLabel,
      finishLabel,
    })
  }

  attachVariantGroups(products)

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify(products), 'utf8')
  console.log('Wrote', products.length, 'products →', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
