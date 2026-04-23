import type { Product, VolumePriceTier } from '../types'
import { SITE_NAME } from '../config/site'
import { RETAIL_REFERENCE_DIVISOR, roundMoney } from '../utils/pricingConstants'

const titleBrand = (line: string) => `${line} | ${SITE_NAME}`

/** One open-ended band from supplier-reference unit economics (same numeric input as legacy `retailRates`). */
function singleTierFromRefDaily(refDaily: number): VolumePriceTier[] {
  return [{ minQty: 1, maxQty: null, supplierReferenceUnitPrice: roundMoney(refDaily) }]
}

/** One open-ended band from an already-retail shelf unit price (undoes ×1.5 to store reference). */
function singleTierFromRetailUnit(retailUnit: number): VolumePriceTier[] {
  const ref = roundMoney(retailUnit / RETAIL_REFERENCE_DIVISOR)
  return [{ minQty: 1, maxQty: null, supplierReferenceUnitPrice: ref }]
}

/** TSS-style volume bands (shelf prices $24.85 / $23.25 / $21.85 on comparable 28" cone listing). */
const cone28TssVolumeTiers: VolumePriceTier[] = [
  { minQty: 1, maxQty: 14, supplierReferenceUnitPrice: roundMoney(24.85 / RETAIL_REFERENCE_DIVISOR) },
  { minQty: 15, maxQty: 49, supplierReferenceUnitPrice: roundMoney(23.25 / RETAIL_REFERENCE_DIVISOR) },
  { minQty: 50, maxQty: null, supplierReferenceUnitPrice: roundMoney(21.85 / RETAIL_REFERENCE_DIVISOR) },
]

/**
 * Purchase tiers use supplier-reference unit price per band; retail uses `applyRetailMarkup` (×1.5).
 * When adjusting reference costs, keep tiers in `singleTierFromRefDaily` / explicit `VolumePriceTier[]` aligned.
 */
/** Traffic Safety Store CDN — product-matched photos (same transforms as `scripts/generate-tss-catalog.mjs`). */
const cdn = (path: string) =>
  `https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/${path}`
/** Self-hosted hero shots so cards always match copy (TSS CDN can swap assets behind the same public_id). */
const cone28img = '/catalog/cone-28-orange-7lb.webp'
const cone36img = '/catalog/cone-36-orange-10lb.webp'
const drumImg = '/catalog/channelizing-drum-6in-hi-tire-base.webp'
const signRWAimg = cdn('images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp')
const signFLGimg = cdn('images/products/thumb/heavy-duty-roll-up-sign-flagger-ahead-text-hip-roll-up-sign-mutcd.webp')
const signOLRimg = cdn('images/products/thumb/heavy-duty-roll-up-sign-one-lane-road-ahead-hip-roll-up-sign-mutcd.webp')
const signStandImg = cdn(
  'i/little-buster-dual-spring-telescoping-sign-stand-w-safesleeve-350-bracket-rigid-bracket.webp',
)
const barT3img = cdn(
  'i/break-away-system-type-3-barricade-with-8-ft-plastic-rails-no-customization-engineer-grade-eg-single.webp',
)
const barT2img = cdn('i/economy-type-ii-barricade-with-steel-legs-plastic-panels-eg-reflective-sheeting.webp')
const barWFimg = cdn('i/yodock-2001mb-barrier-orange-without-optional-fence-water-filled-barricade.webp')
const arrowTrailerImg = 'https://www.wanco.com/wp-content/uploads/2020/03/featr-prod-arrowbd-trailer-folding-585x400.jpg'
const arrowTruckImg = 'https://www.wanco.com/wp-content/uploads/2017/02/featr-prod-arrowbd-truck.jpg'
const msgBoardImg =
  'https://vermaccom-218d5.kxcdn.com/media/product/image/image/bpcms-1210_deploye_g3_face_1000x1000_left_lane_closed_v2.png.1000x1000_q85_crop-center_upscale.png'
const flasherImg = cdn('i/economy-solar-assist-type-b-flasher-red.webp')
const flareImg = cdn('i/orion-15-minute-road-flares-case-of-72-without-wire-stand.webp')
const urbanitePedImg = cdn('i/urbanite-crowd-control-barricades-white-none-no-sheeting-water-filled-barricade.webp')
const parkingBlueImg = cdn(
  'i/commercial-parking-block-3ft-blue-18-galv-steel-spikes-asphalt-gravel-or-dirt-rubber-wheel-stop-parking-curb-ada-compliant.webp',
)
const speedHumpImg = cdn(
  'i/economy-rubber-speed-hump-middle-section-18-galv-steel-spikes-asphalt-gravel-or-dirt-traffic-calming.webp',
)
const vestMeshImg =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp'
const kaskZenithImg =
  'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/kask-zenith-x2-helmets-white.webp'
const aervoePaintImg = cdn('i/blue-construction-marking-paint-case-of-12-aervoe.webp')
const fenceBridgeImg = cdn('i/galv-steel-crowd-control-fence-bridge-feet.webp')
const harnessImg = cdn('i/radians-high-visibility-breakaway-by-back-safety-harness-lime.webp')
const bollardCoverImg = cdn('i/tall-bollard-cover-5-inch-diameter-52in-blue.webp')

const TRANS = 'Trans-Supply'
const TSP = 'Traffic Safety Products'
const CORAL = 'Coral Sales (Ver-Mac)'

export const curatedProducts: Product[] = [
  // --- Cones & Drums ---
  {
    id: 'prod-1',
    categoryId: 'cat-1',
    categorySlug: 'cones-drums',
    name: '28" Traffic Cone — 7 lb, Orange',
    slug: '28-inch-traffic-cone',
    description: 'Lakeside Plastics 28" 7 lb flow-molded orange PVC cone, NCHRP 350 / MASH accepted',
    longDescription:
      'Exact product: Lakeside Plastics C28S, 28" orange flow-molded PVC traffic cone. One-piece construction with cleated base, UV inhibitors, 15"×15" base. Meets MUTCD, NCHRP-350, and MASH crashworthiness standards. Ideal for lane closures, shoulder work, and general delineation at speeds up to 65 mph. Add reflective collar option at checkout if needed.',
    volumePriceTiers: cone28TssVolumeTiers,
    unit: 'each',
    imageUrl: cone28img,
    images: [cone28img, cone36img, drumImg],
    specs: {
      Height: '28"',
      Base: '15" × 15"',
      Weight: '7 lbs',
      Material: 'Flow-molded PVC',
      Construction: 'One-piece with cleated base',
      Compliance: 'MUTCD / NCHRP-350 / MASH',
    },
    features: [
      'UV-stabilized orange PVC',
      'One-piece flow-molded — no seams to split',
      'Cleated base for stability',
      'Stackable for easy transport',
      'NCHRP 350 & MASH accepted',
    ],
    compliance: ['MUTCD', 'NCHRP-350', 'MASH'],
    useCases: [
      {
        title: 'Lane Closures',
        description: 'Space cones every 20–40 ft in the taper and throughout the lane closure buffer zone to guide drivers safely around the work area.',
      },
      {
        title: 'Shoulder Work',
        description: 'Create a visible edge delineation between active lanes and shoulder work zones. Ideal for utility work, guardrail repair, and mowing operations.',
      },
      {
        title: 'Parking & Site Control',
        description: 'Define temporary no-parking areas, job-site entrance controls, and pedestrian detour corridors without permanent hardware.',
      },
    ],
    faqs: [
      {
        question: 'How many 28" traffic cones do I need for a lane closure?',
        answer: 'A standard single-lane closure on a 45 mph road requires approximately 30–50 cones: roughly 10 in the advance warning area, 15–20 in the taper (placed every 20 ft), and 10+ in the buffer zone. Use our AI Job Planner for a site-specific count.',
      },
      {
        question: 'Are 28" cones approved for use on highways?',
        answer: 'The MUTCD requires a minimum cone height of 28" for roads with speed limits of 45 mph or less. For roads 45 mph and above, 36" cones are required. These 28" cones are NCHRP-350 and MASH crash-tested and compliant for lower-speed applications.',
      },
      {
        question: 'Do your rental cones come with reflective collars?',
        answer: 'Standard rental cones ship without reflective collars. If your work zone operates at night or in low-visibility conditions, we recommend upgrading to our 36" reflective cone rentals or adding reflective collar sleeves — mention this in your quote request.',
      },
      {
        question: 'How do cones get to and from my job site?',
        answer: 'Cones ship stacked on pallets or in crates to your job site. We coordinate return at the end of your rental period. Transport fees vary by location — request a quote for exact costs.',
      },
    ],
    tags: ['cone', 'channelization', 'lane closure', 'reflective'],
    inStock: true,
    stockCount: 500,
    popular: true,
    sku: 'CON-28-STD',
    supplierSku: 'C28S',
    supplierUrl: '',
    supplier: 'Lakeside Plastics',
    weight: '7 lbs',
    dimensions: '28" H × 15" × 15" base',
    metaTitle: titleBrand('Rent 28" Traffic Cones | MUTCD / MASH Compliant'),
    metaDescription: 'Rent NCHRP-350 & MASH-accepted 28" orange traffic cones starting at $2.25/day. 500+ in stock. Perfect for lane closures and shoulder work up to 45 mph. Fast dispatch.',
  },
  {
    id: 'prod-2',
    categoryId: 'cat-1',
    categorySlug: 'cones-drums',
    name: '36" Traffic Cone — 10 lb, Orange w/ Reflective Collars',
    slug: '36-inch-traffic-cone',
    description: 'JBC 36" 10 lb orange injection-molded cone with 6" & 4" high-intensity reflective collars',
    longDescription:
      'Exact product: JBC CR36SRC64, 36" 10 lb orange traffic cone with black recycled rubber base and two molded-in high-intensity reflective collars (6" + 4"). Injection-molded for durability. Over 50% post-consumer recycled materials. Meets MUTCD, FDOT, FHWA, NFPA, and NCHRP-350 crash test standards. Required by many state DOTs for 55+ mph work zones.',
    volumePriceTiers: singleTierFromRetailUnit(3.38),
    unit: 'each',
    imageUrl: cone36img,
    images: [cone36img, cone28img, drumImg],
    specs: {
      Height: '36"',
      Base: '14" × 14" black rubber',
      Weight: '10 lbs',
      Material: 'Injection-molded PVC',
      Reflective: '6" + 4" high-intensity collars',
      Compliance: 'MUTCD / FDOT / FHWA / NCHRP-350',
    },
    features: [
      'Taller for high-speed visibility',
      'Black recycled rubber base for stability',
      'Molded-in high-intensity reflective collars',
      'Over 50% post-consumer recycled materials',
      'NCHRP-350 crash tested',
    ],
    compliance: ['MUTCD', 'FDOT', 'FHWA', 'NFPA', 'NCHRP-350'],
    useCases: [
      {
        title: 'High-Speed Highway Work Zones',
        description: 'Required by MUTCD for road speeds of 45 mph and above. The 36" height and high-intensity reflective collars provide the visibility margin drivers need at highway speeds.',
      },
      {
        title: 'Night Work Operations',
        description: 'Molded-in 6" and 4" high-intensity reflective collars bounce headlights back to drivers for maximum nighttime conspicuity without requiring add-on collar sleeves.',
      },
      {
        title: 'DOT-Required Zones',
        description: 'Many state DOT contracts specifically require 36" cones for collector and arterial road work. These cones meet FDOT, FHWA, and NFPA requirements by design.',
      },
    ],
    faqs: [
      {
        question: 'When are 36" traffic cones required instead of 28"?',
        answer: 'The MUTCD requires 36" cones on roadways with posted speed limits above 45 mph. Many state DOTs also mandate 36" cones on arterial and collector roads regardless of speed. When in doubt, the taller cone is always the safer and more compliant choice.',
      },
      {
        question: 'Do the reflective collars on these cones meet MUTCD standards?',
        answer: 'Yes. The molded-in 6" and 4" high-intensity (HI) reflective collars exceed MUTCD sheeting requirements for nighttime work zones. High-intensity sheeting is significantly brighter than engineer-grade sheeting — the same retroreflective standard used on highway signs.',
      },
      {
        question: 'Are these cones suitable for interstate highway work?',
        answer: 'Absolutely. These cones are NCHRP-350 crash-tested and comply with FHWA and FDOT requirements, making them suitable for interstate, US highway, and state route work zones.',
      },
      {
        question: 'What is the minimum rental period?',
        answer: 'Our minimum rental period is 1 day. Weekly and monthly rates offer significant savings for longer projects — a 7-day weekly rental is equivalent to just 4 daily rates.',
      },
    ],
    tags: ['cone', 'highway', 'high-speed', 'channelization'],
    inStock: true,
    stockCount: 300,
    popular: false,
    sku: 'CON-36-HD',
    supplierSku: 'CR36SRC64',
    supplierUrl: '',
    supplier: 'JBC Safety Plastic',
    weight: '10 lbs',
    dimensions: '36" H × 14" × 14" base',
    metaTitle: titleBrand('Rent 36" Reflective Traffic Cones | Highway-Grade MUTCD'),
    metaDescription: 'Rent MUTCD-compliant 36" orange traffic cones with high-intensity reflective collars. Required for 45+ mph work zones. NCHRP-350 crash tested. From $3.38/day.',
  },
  {
    id: 'prod-3',
    categoryId: 'cat-1',
    categorySlug: 'cones-drums',
    name: 'Channelizing Drum — 37", 6" HI Reflective, Tire Base',
    slug: 'channelizing-drum',
    description: 'MUTCD / NCHRP-350 channelizing drum with 6" high-intensity reflective sheeting and recycled tire ring base',
    longDescription:
      'Exact product: DRUM6HITIRE-class channelizing drum. 37" tall polyethylene channelizing drum with 6" high-intensity orange and white reflective stripes. 23" diameter recycled tire ring base prevents rolling into traffic. ~10 lb drum body + ~22 lb tire base. Exceeds MUTCD standards and meets NCHRP-350 crash test rating. High visibility day and night.',
    volumePriceTiers: singleTierFromRetailUnit(6.75),
    unit: 'each',
    imageUrl: drumImg,
    images: [drumImg, cone28img, cone36img],
    specs: {
      Height: '37"',
      'Base Diameter': '23" recycled tire ring',
      'Drum Weight': '~10 lbs',
      'Base Weight': '~22 lbs',
      'Total Weight': '~32 lbs',
      Sheeting: '6" high-intensity (HI) orange & white',
      Compliance: 'MUTCD / NCHRP-350',
    },
    features: [
      '6" high-intensity reflective stripes',
      'Tire ring base prevents rolling into traffic',
      'UV-resistant polyethylene',
      'Compatible with barricade lights and signs',
      'Exceeds MUTCD standards',
    ],
    compliance: ['MUTCD', 'NCHRP-350'],
    useCases: [
      {
        title: 'Long-Duration Lane Closures',
        description: 'Drums provide superior nighttime visibility and wind resistance compared to cones. Ideal for utility cuts, pavement rehabilitation, and multi-day construction sites on arterial roads.',
      },
      {
        title: 'Night Work & Low-Visibility Zones',
        description: 'The 6" high-intensity reflective bands and large profile make drums the preferred channelizing device for night operations where maximum driver conspicuity is critical.',
      },
      {
        title: 'High-Wind Environments',
        description: 'The heavy tire ring base (~22 lbs) keeps drums stable in wind conditions that would topple lighter cones — essential for open highway work zones.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a channelizing drum and a traffic cone?',
        answer: 'Channelizing drums are larger (37" tall vs. 28"–36" for cones) and have a much heavier base (~32 lbs total vs. 7–10 lbs for cones). Drums offer higher nighttime visibility, greater wind resistance, and can support barricade flasher lights and small signs. They are preferred for long-duration, high-speed, or night work zones.',
      },
      {
        question: 'Can barricade flasher lights be mounted on these drums?',
        answer: 'Yes. The top of the drum is designed to accept standard MUTCD Type A and Type B barricade flasher lights. This is one of the key advantages of drums over cones — they can become lighted channelizing devices for nighttime operations.',
      },
      {
        question: 'How many drums do I need for a standard lane closure taper?',
        answer: 'MUTCD taper length formula is L = W × S (in feet, where W = lane width in feet and S = speed limit in mph). For a 12-foot lane on a 45 mph road, the taper is 540 ft. Drums are typically placed every 40 ft in the taper, requiring about 13–14 drums. Use our AI Job Planner for a site-specific layout.',
      },
      {
        question: 'Are the tire ring bases included in the rental?',
        answer: 'Yes. Every drum rental includes the 23" recycled tire ring base. The base and drum ship as a unit.',
      },
    ],
    tags: ['drum', 'channelizing', 'lane closure', 'night work', 'reflective'],
    inStock: true,
    stockCount: 150,
    popular: true,
    sku: 'DRM-36-RETRO',
    supplierSku: 'DRUM6HITIRE',
    supplierUrl: '',
    supplier: 'OEM channelizing drum',
    weight: '~32 lbs (drum + base)',
    dimensions: '37" H × 23" base diameter',
    metaTitle: titleBrand('Rent Channelizing Drums | 37" HI Reflective Tire Base'),
    metaDescription: 'Rent MUTCD/NCHRP-350 channelizing drums with 6" high-intensity reflective stripes and 22-lb tire ring base. Ideal for night work and long-duration closures. From $6.75/day.',
  },

  // --- Signs & Sign Stands ---
  {
    id: 'prod-4',
    categoryId: 'cat-2',
    categorySlug: 'signs-sign-stands',
    name: '36" Reflective Roll-Up Sign — Road Work Ahead (W20-1)',
    slug: 'roll-up-road-work-ahead',
    description: 'Heavy-duty 36"×36" reflective vinyl roll-up sign, MUTCD W20-1, fiberglass ribs',
    longDescription:
      'Exact product: RU-36-REF-RWAHD — 36"×36" heavy-duty high-visibility reflective vinyl roll-up sign with fiberglass cross-ribs and plastic corner pockets. MUTCD code W20-1. Compatible with all standard roll-up sign stands. Made in USA. Ships same day.',
    volumePriceTiers: singleTierFromRetailUnit(7.5),
    unit: 'each',
    imageUrl: signRWAimg,
    images: [signRWAimg, signFLGimg, signOLRimg],
    specs: {
      Size: '36" × 36"',
      Shape: 'Diamond',
      Material: 'Reflective vinyl',
      'Cross-Ribs': 'Fiberglass',
      Pockets: 'Plastic corner pockets',
      'MUTCD Code': 'W20-1',
      Origin: 'Made in USA',
    },
    features: [
      'High-visibility reflective vinyl',
      'Fiberglass cross-ribs for rigidity',
      'Folds compactly for storage',
      'Compatible with all roll-up sign stands',
      'MUTCD W20-1 compliant',
    ],
    compliance: ['MUTCD W20-1', 'FHWA'],
    useCases: [
      {
        title: 'Advance Warning for All Work Zones',
        description: 'The "Road Work Ahead" sign (W20-1) is the first sign drivers encounter in any work zone sequence. Required by MUTCD for virtually every construction and maintenance operation affecting traffic.',
      },
      {
        title: 'Utility & Excavation Work',
        description: 'Water main breaks, gas line repair, and electrical work all require advance warning signs. This roll-up sign deploys in seconds and stores flat in any service truck.',
      },
      {
        title: 'Paving & Resurfacing Projects',
        description: 'Place this sign 500–1,000 ft in advance of paving crews on arterial roads. Reflective vinyl ensures visibility during early morning and evening shift operations.',
      },
    ],
    faqs: [
      {
        question: 'How far in advance should the Road Work Ahead sign be placed?',
        answer: 'MUTCD Table 6C-1 specifies advance warning sign placement by road type and speed. For urban roads (35 mph), place 350 ft ahead. For rural roads (55 mph), place 1,000–1,500 ft ahead. Use multiple signs in sequence for higher-speed roads.',
      },
      {
        question: 'Does this sign need to face traffic at night?',
        answer: 'Yes. The reflective vinyl sheeting on this sign retroreflects headlights back to drivers for nighttime visibility. No additional lighting is required for standard night operations, though high-intensity sheeting signs offer improved conspicuity.',
      },
      {
        question: 'What sign stand should I use with this roll-up sign?',
        answer: 'This 36"×36" sign is compatible with our Cortina Tri-Pod Sign Stand rental (SKU: STD-TEL-ALU). The tripod stand accepts both 36" and 48" roll-up and rigid signs and folds flat for truck storage.',
      },
      {
        question: 'Is the W20-1 sign required for all construction work zones?',
        answer: 'Yes. MUTCD Part 6 requires the "Road Work Ahead" (W20-1) sign as the primary advance warning sign for virtually all highway construction and maintenance operations. It is one of the most universally required traffic control devices.',
      },
    ],
    tags: ['sign', 'roll-up', 'road work ahead', 'warning', 'advance warning'],
    inStock: true,
    stockCount: 80,
    popular: true,
    sku: 'SGN-RU-RWA-36',
    supplierSku: 'RU-36-REF-RWAHD',
    supplierUrl: '',
    supplier: 'MUTCD roll-up sign (OEM)',
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: titleBrand('Rent Road Work Ahead Sign (W20-1) | 36" Reflective Roll-Up'),
    metaDescription: 'Rent MUTCD W20-1 "Road Work Ahead" 36" reflective roll-up signs from $7.50/day. Required for all work zones. Fiberglass ribs, reflective vinyl. Same-day dispatch available.',
  },
  {
    id: 'prod-5',
    categoryId: 'cat-2',
    categorySlug: 'signs-sign-stands',
    name: '36" Reflective Roll-Up Sign — Flagger Ahead (W20-7a)',
    slug: 'roll-up-flagger-ahead',
    description: 'Heavy-duty 36"×36" reflective vinyl roll-up sign, MUTCD W20-7a, fiberglass ribs',
    longDescription:
      'Exact product: RU-36-REF-FLGAHD — 36"×36" heavy-duty high-visibility reflective vinyl "Flagger Ahead" roll-up sign. MUTCD code W20-7a. Required whenever a flagger is controlling traffic in a work zone. Fiberglass cross-ribs, plastic corner pockets. Made in USA.',
    volumePriceTiers: singleTierFromRetailUnit(7.5),
    unit: 'each',
    imageUrl: signFLGimg,
    images: [signFLGimg, signRWAimg, signOLRimg],
    specs: {
      Size: '36" × 36"',
      Shape: 'Diamond',
      Material: 'Reflective vinyl',
      'Cross-Ribs': 'Fiberglass',
      Pockets: 'Plastic corner pockets',
      'MUTCD Code': 'W20-7a',
      Origin: 'Made in USA',
    },
    features: [
      'Required when flaggers are present',
      'High-visibility reflective vinyl',
      'Fiberglass cross-ribs for rigidity',
      'MUTCD W20-7a compliant',
    ],
    compliance: ['MUTCD W20-7a', 'FHWA'],
    useCases: [
      {
        title: 'Flagger-Controlled Single-Lane Alternating Traffic',
        description: 'Any time a flagger is used to control one-way alternating traffic through a work zone, a W20-7a sign must be placed in the advance warning area to alert drivers before they encounter the flagger.',
      },
      {
        title: 'Bridge & Culvert Work',
        description: 'Narrow bridge or culvert repairs often require single-lane flagging operations. This sign gives drivers early warning to slow down and follow flagger instructions.',
      },
      {
        title: 'Emergency Repair Operations',
        description: 'When emergency flaggers are deployed for quick-response utility failures or accident cleanup, this sign provides the advance warning MUTCD requires.',
      },
    ],
    faqs: [
      {
        question: 'Is a Flagger Ahead sign legally required when using a flagger?',
        answer: 'Yes. MUTCD Section 6E requires the W20-7a "Flagger" sign to be placed in the advance warning area whenever a flagger is used for traffic control. Failure to display this sign can result in OSHA violations and liability issues.',
      },
      {
        question: 'How far before the flagger should this sign be placed?',
        answer: 'Flagger signs should be placed at the beginning of the advance warning area — typically 350–1,000 ft ahead of the flagger depending on road speed. MUTCD Table 6C-1 provides exact distances for each speed and road type.',
      },
      {
        question: 'Can I use the same sign stand for multiple signs?',
        answer: 'Each sign requires its own stand. Our Cortina Tri-Pod Stand (STD-TEL-ALU) accommodates 36" roll-up signs and is available to rent alongside your signs.',
      },
      {
        question: 'Do I need both a Road Work Ahead and Flagger Ahead sign?',
        answer: 'Yes. In a typical flagger operation, you place the "Road Work Ahead" (W20-1) sign first, followed by the "Flagger" (W20-7a) sign closer to the work area. Both signs work together as part of the MUTCD-compliant advance warning sequence.',
      },
    ],
    tags: ['sign', 'flagger', 'roll-up', 'warning'],
    inStock: true,
    stockCount: 60,
    popular: false,
    sku: 'SGN-RU-FLG-36',
    supplierSku: 'RU-36-REF-FLGAHD',
    supplierUrl: '',
    supplier: 'MUTCD roll-up sign (OEM)',
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: titleBrand('Rent Flagger Ahead Sign (W20-7a) | 36" Reflective Roll-Up'),
    metaDescription: 'Rent MUTCD W20-7a "Flagger Ahead" 36" reflective roll-up signs from $7.50/day. Required by law when flaggers control traffic. Rapid dispatch to job sites.',
  },
  {
    id: 'prod-6',
    categoryId: 'cat-2',
    categorySlug: 'signs-sign-stands',
    name: 'Cortina Tri-Pod Sign Stand — 36" or 48" Signs',
    slug: 'telescoping-sign-stand',
    description: 'Cortina tri-pod steel sign stand, MPN 07-822, for 36" or 48" roll-up or rigid signs',
    longDescription:
      'Exact product: Cortina TRI-POD-STD (MPN 07-822). Economical, versatile powder-coated steel tripod stand designed for 36" or 48" rigid or roll-up traffic signs. Compact, lightweight, and folds flat for storage. Three-leg configuration for stable deployment on varied terrain.',
    volumePriceTiers: singleTierFromRetailUnit(6),
    unit: 'each',
    imageUrl: signStandImg,
    images: [signStandImg, signRWAimg, signFLGimg],
    specs: {
      Brand: 'Cortina',
      MPN: '07-822',
      Material: 'Powder-coated steel',
      'Sign Compatibility': '36" or 48" rigid or roll-up',
      Configuration: 'Tripod (3-leg)',
      Folds: 'Yes — flat for storage',
    },
    features: [
      'Supports 36" or 48" roll-up and rigid signs',
      'Powder-coated steel frame',
      'Lightweight and compact',
      'Folds flat for truck storage',
      'Stable tripod base',
    ],
    compliance: ['MUTCD'],
    useCases: [
      {
        title: 'All MUTCD Roll-Up Sign Deployments',
        description: 'The Cortina tri-pod is the standard stand for all 36" MUTCD roll-up signs including Road Work Ahead (W20-1), Flagger Ahead (W20-7a), One Lane Road (W20-4), and more. Always pair a sign with a stand.',
      },
      {
        title: 'Uneven Terrain & Shoulders',
        description: 'The three adjustable legs independently adapt to uneven road shoulders, gravel, or sloped terrain where two-legged stands would tip.',
      },
      {
        title: 'Quick-Setup Operations',
        description: 'Folds completely flat — a crew member can carry multiple stands to the deployment area in seconds. Ideal for short-duration operations requiring rapid setup and breakdown.',
      },
    ],
    faqs: [
      {
        question: 'What size signs does this stand support?',
        answer: 'The Cortina Tri-Pod Stand is rated for 36" and 48" roll-up and rigid traffic signs. It does not support larger 48"×48" diamond signs — contact us for heavy-duty sign stand options.',
      },
      {
        question: 'Is the sign stand included when I rent a roll-up sign?',
        answer: 'No. Signs and stands are rented separately so you can mix and match quantities. Most operations need one stand per sign, but you may need more signs than stands if signs are carried by moving vehicles.',
      },
      {
        question: 'Can this stand be used in wind?',
        answer: 'Yes, for normal wind conditions. In sustained high-wind areas (25+ mph), we recommend sandbag ballast on the stand legs. Our team can advise on wind-rating at time of quote.',
      },
      {
        question: 'How does the sign attach to the stand?',
        answer: 'The sign corner pockets slip over the stand arms using plastic pocket clips. Roll-up signs tension against the frame to hold their shape. Setup takes under 60 seconds per sign.',
      },
    ],
    tags: ['sign stand', 'tripod', 'cortina', 'sign support'],
    inStock: true,
    stockCount: 120,
    popular: true,
    sku: 'STD-TEL-ALU',
    supplierSku: 'TRI-POD-STD',
    supplierUrl: '',
    supplier: 'Cortina Safety Products',
    weight: '~10 lbs',
    dimensions: 'Folds flat for storage',
    metaTitle: titleBrand('Rent Cortina Tri-Pod Sign Stand | 36" & 48" Signs'),
    metaDescription: 'Rent Cortina powder-coated steel tri-pod sign stands for 36" and 48" roll-up traffic signs from $6/day. Folds flat, stable tripod base. Pair with any MUTCD sign rental.',
  },
  {
    id: 'prod-7',
    categoryId: 'cat-2',
    categorySlug: 'signs-sign-stands',
    name: '36" Non-Reflective Roll-Up Sign — One Lane Road Ahead (W20-4)',
    slug: 'roll-up-one-lane-road',
    description: 'Heavy-duty 36"×36" non-reflective orange vinyl roll-up sign, MUTCD W20-4',
    longDescription:
      'Exact product: RU-36-NON-OLRA — 36"×36" heavy-duty non-reflective bright orange vinyl "One Lane Road Ahead" roll-up sign. MUTCD code W20-4. Fiberglass cross-ribs and plastic corner pockets. Compatible with all standard roll-up sign stands.',
    volumePriceTiers: singleTierFromRetailUnit(7.5),
    unit: 'each',
    imageUrl: signOLRimg,
    images: [signOLRimg, signRWAimg, signFLGimg],
    specs: {
      Size: '36" × 36"',
      Shape: 'Diamond',
      Material: 'Non-reflective orange vinyl',
      'Cross-Ribs': 'Fiberglass',
      Pockets: 'Plastic corner pockets',
      'MUTCD Code': 'W20-4',
    },
    features: [
      'Heavy-duty non-reflective vinyl',
      'Fiberglass cross-ribs for rigidity',
      'MUTCD W20-4 compliant',
      'Compatible with all roll-up sign stands',
    ],
    compliance: ['MUTCD W20-4'],
    useCases: [
      {
        title: 'Single-Lane Alternating Traffic',
        description: 'When a construction zone reduces two-way traffic to a single shared lane, the W20-4 sign prepares drivers for the narrowed roadway ahead and the need to yield to oncoming vehicles.',
      },
      {
        title: 'Daytime-Only Operations',
        description: 'The non-reflective version is suitable for daytime operations where the work zone is inactive at night and signs will be removed or covered after hours.',
      },
      {
        title: 'Bridge Repair & Culvert Work',
        description: 'Bridge deck repairs often require one-lane traffic flow. The W20-4 sign is the correct MUTCD advance warning sign for these operations.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between the reflective and non-reflective version of this sign?',
        answer: 'The non-reflective version (W20-4) is suitable for daytime-only operations where signs are removed at night. If your work zone operates after dark or in low-visibility conditions, use the reflective vinyl version for MUTCD nighttime compliance.',
      },
      {
        question: 'When should I use a One Lane Road Ahead sign vs. a Flagger Ahead sign?',
        answer: 'Use "One Lane Road Ahead" (W20-4) when traffic is controlled by temporary traffic signals or pilot vehicles. Use "Flagger Ahead" (W20-7a) when a human flagger is present. Both signs may be used together in some operations.',
      },
      {
        question: 'How far in advance should this sign be placed?',
        answer: 'Placement distance follows MUTCD Table 6C-1: approximately 350 ft for 35 mph zones, 500 ft for 45 mph, and 800–1,000 ft for 55 mph zones. Always place in advance of the lane closure taper.',
      },
    ],
    tags: ['sign', 'one lane', 'lane closure', 'warning'],
    inStock: true,
    stockCount: 45,
    popular: false,
    sku: 'SGN-RU-OLR-36',
    supplierSku: 'RU-36-NON-OLRA',
    supplierUrl: '',
    supplier: 'MUTCD roll-up sign (OEM)',
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: titleBrand('Rent One Lane Road Ahead Sign (W20-4) | 36" Roll-Up'),
    metaDescription: 'Rent MUTCD W20-4 "One Lane Road Ahead" 36" roll-up signs from $7.50/day. Required for single-lane alternating traffic operations. Fiberglass ribs, durable vinyl.',
  },

  // --- Barricades & Barriers ---
  {
    id: 'prod-8',
    categoryId: 'cat-3',
    categorySlug: 'barricades-barriers',
    name: 'Type III Barricade — 8 ft Break-Away, EG Sheeting',
    slug: 'type-iii-barricade',
    description: '60" tall MUTCD Type III break-away barricade with three 8 ft EG reflective plastic rails',
    longDescription:
      'Exact product: T3-BA-EG-8 (MPN 313-ASBL). 60" tall MUTCD Type III barricade with break-away fold-flat design. Three 8-foot plastic rails with engineer grade (EG) orange and white reflective sheeting. NCHRP-350 accepted. Accommodates two barricade flashers. Complete assembly with plastic uprights, feet, and hardware.',
    volumePriceTiers: singleTierFromRetailUnit(12),
    unit: 'each',
    imageUrl: barT3img,
    images: [barT3img, barT2img, barWFimg],
    specs: {
      Height: '60"',
      'Rail Length': '8 ft (three rails)',
      'Rail Material': 'Extruded plastic',
      Sheeting: 'Engineer Grade (EG) orange & white',
      Type: 'MUTCD Type III',
      MPN: '313-ASBL',
      Compliance: 'NCHRP-350 accepted',
    },
    features: [
      'Break-away fold-flat design for storage',
      'Three 8-foot EG reflective rails',
      'Accommodates two barricade flashers',
      'Complete assembly kit included',
      'NCHRP-350 accepted',
    ],
    compliance: ['MUTCD Type III', 'NCHRP-350'],
    useCases: [
      {
        title: 'Road Closures & Dead-End Barriers',
        description: 'Type III barricades are the MUTCD-required device for completely closing a roadway to through traffic. Their wide profile and multiple reflective rails maximize conspicuity for approaching drivers.',
      },
      {
        title: 'Intersection Closures',
        description: 'Block street intersections temporarily for events, emergency operations, or construction. The break-away design prevents vehicle damage if struck.',
      },
      {
        title: 'End-of-Road Work Zone Marking',
        description: 'Place at the termination point of construction zones to mark where active work ends. Flasher-equipped barricades alert nighttime drivers to the zone boundary.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a Type II and Type III barricade?',
        answer: 'Type III barricades have three 8-foot rails and stand 60" tall — they are used to completely close roads or indicate road endings. Type II barricades are smaller (2 rails, 45"×24") and are used for lane closures and channelization where some traffic still passes by. MUTCD Section 6F specifies when each type is required.',
      },
      {
        question: 'Do these barricades require flashing lights at night?',
        answer: 'MUTCD requires Type B flashing amber lights on barricades used for road closures at night. Our Type B LED Barricade Flasher (SKU: LGT-B-FLSH) is compatible with these barricades and available to rent alongside them.',
      },
      {
        question: 'What does "break-away" mean for barricades?',
        answer: 'Break-away design means the barricade is engineered to collapse and fold flat if struck by a vehicle, rather than causing a rigid impact. This NCHRP-350 crash-tested feature reduces injury risk to vehicle occupants when barriers are accidentally struck.',
      },
      {
        question: 'Can I add custom signage to these barricades?',
        answer: 'Yes, Type III barricades can accommodate sign panels on the rails. Common additions include detour signs, road closed signs, and directional arrows. Contact us to include sign rentals with your barricade order.',
      },
    ],
    tags: ['barricade', 'type III', 'road closure', 'reflective', 'warning'],
    inStock: true,
    stockCount: 80,
    popular: true,
    sku: 'BAR-T3-8FT',
    supplierSku: 'T3-BA-EG-8',
    supplierUrl: '',
    supplier: 'OEM Type III barricade',
    weight: '~25 lbs',
    dimensions: '96" W × 60" H',
    metaTitle: titleBrand('Rent Type III Road Closure Barricades | 8 ft Break-Away'),
    metaDescription: 'Rent MUTCD Type III break-away barricades with 3×8 ft EG reflective rails from $12/day. NCHRP-350 crash-tested. Required for complete road closures. Flasher-ready.',
  },
  {
    id: 'prod-9',
    categoryId: 'cat-3',
    categorySlug: 'barricades-barriers',
    name: 'Type II Barricade — 45"H × 24"W Folding Plastic, HI Sheeting',
    slug: 'type-ii-barricade',
    description: '45"×24" folding plastic MUTCD Type II barricade with high-intensity reflective sheeting',
    longDescription:
      'Exact product: TYPE 2HI (MPN 37408-FHIP). 45" tall × 24" wide folding plastic Type II barricade with high-intensity (HI) reflective sheeting. Impact-resistant polyethylene, stackable with molded lugs. ~12 lbs. Commonly used for lane closures, channelization, and temporary closures where traffic may still pass.',
    volumePriceTiers: singleTierFromRetailUnit(8.25),
    unit: 'each',
    imageUrl: barT2img,
    images: [barT2img, barT3img, barWFimg],
    specs: {
      Height: '45"',
      Width: '24"',
      Material: 'Impact-resistant polyethylene',
      Sheeting: 'High-intensity (HI) reflective',
      Rails: '2 reflective panels',
      Type: 'MUTCD Type II',
      MPN: '37408-FHIP',
    },
    features: [
      'MUTCD Type II compliant',
      'Two high-intensity reflective rails',
      'Folds flat — stackable with molded lugs',
      'Impact-resistant polyethylene',
      'Made in USA',
    ],
    compliance: ['MUTCD Type II'],
    useCases: [
      {
        title: 'Lane Closure Channelization',
        description: 'Type II barricades create a more substantial physical barrier than cones for lane closures where the work zone is adjacent to active traffic lanes. The wider profile and reflective rails improve nighttime visibility.',
      },
      {
        title: 'Pedestrian Detour Corridors',
        description: 'Create defined, visible pedestrian pathways around construction sites in urban areas where sidewalks are temporarily blocked.',
      },
      {
        title: 'Temporary Traffic Separation',
        description: 'Separate opposing traffic flows in construction zones where centerline striping has been removed or altered during pavement work.',
      },
    ],
    faqs: [
      {
        question: 'Can Type II barricades be used for nighttime operations?',
        answer: 'Yes. These barricades feature high-intensity (HI) reflective sheeting, which is the brightest standard retroreflective sheeting available. They provide excellent nighttime visibility. For complete road closures at night, add our Type B LED Barricade Flashers.',
      },
      {
        question: 'How are Type II barricades different from plastic water-filled barriers?',
        answer: 'Type II barricades are lightweight (~12 lbs), easily repositioned, and used for channelization where a physical crash barrier is not required. Water-filled barriers like the Yodock provide genuine crash protection (900 lbs filled) but are intended for positive protection applications.',
      },
      {
        question: 'How many Type II barricades do I need for a lane closure?',
        answer: 'For short-duration lane closures, barricades are typically used at the transition taper and in the activity area, while cones fill the longer taper. A typical setup uses 8–20 barricades depending on work zone width and duration.',
      },
    ],
    tags: ['barricade', 'type II', 'lane closure', 'channelization'],
    inStock: true,
    stockCount: 120,
    popular: false,
    sku: 'BAR-T2-24',
    supplierSku: 'TYPE 2HI',
    supplierUrl: '',
    supplier: 'OEM Type II barricade',
    weight: '~12 lbs',
    dimensions: '24" W × 45" H',
    metaTitle: titleBrand('Rent Type II Traffic Barricades | HI Reflective Sheeting'),
    metaDescription: 'Rent MUTCD Type II folding plastic barricades with high-intensity reflective sheeting from $8.25/day. 120 in stock. Ideal for lane closures, pedestrian detours, and channelization.',
  },
  {
    id: 'prod-10',
    categoryId: 'cat-3',
    categorySlug: 'barricades-barriers',
    name: 'Yodock 2001MB Water-Filled Barrier — 6 ft (Orange)',
    slug: 'water-filled-barrier-6ft',
    description: 'Yodock 2001MB HDPE water-filled construction barrier, 72"L × 32"H × 18"W, NCHRP-350',
    longDescription:
      'Exact product: Yodock 2001MBORG (MPN 148002B). Orange HDPE water-filled construction barrier. 72"L × 32"H × 18"W. Ships at 85 lbs empty; weighs ~900 lbs when filled with water. Links together for any run length. Meets NCHRP Report 350 standards. Compatible with optional fence panel toppers.',
    volumePriceTiers: singleTierFromRetailUnit(27),
    unit: 'each',
    imageUrl: barWFimg,
    images: [barWFimg, barT3img, barT2img],
    specs: {
      Length: '72" (6 ft)',
      Height: '32"',
      Width: '18"',
      'Empty Weight': '85 lbs',
      'Filled Weight': '~900 lbs',
      Material: 'HDPE',
      Color: 'Orange',
      MPN: '148002B',
      Compliance: 'NCHRP Report 350',
    },
    features: [
      'Ships empty at 85 lbs — easy crew deployment',
      '~900 lbs when water-filled for positive protection',
      'Interlocking — creates runs of any length',
      'NCHRP-350 compliant',
      'Optional fence topper compatible',
    ],
    compliance: ['NCHRP-350', 'MUTCD'],
    useCases: [
      {
        title: 'Positive Protection for Workers',
        description: 'When workers are exposed to traffic within feet of active lanes — such as bridge work, utility trenches, or express lane conversions — water-filled barriers provide crash-rated positive protection that cones and barricades cannot.',
      },
      {
        title: 'Long-Duration Highway Projects',
        description: 'For projects lasting weeks or months, water-filled barriers create a stable, semi-permanent separation between work zones and active lanes without requiring daily repositioning.',
      },
      {
        title: 'Pedestrian Protection Corridors',
        description: 'Create safe pedestrian passageways through urban construction sites, protecting walkers from both vehicular traffic and construction equipment.',
      },
    ],
    faqs: [
      {
        question: 'Do water-filled barriers require a water source on site?',
        answer: 'Yes. Barriers ship empty and must be filled with water on site using a garden hose, water truck, or on-site water supply. Filling takes approximately 5–10 minutes per barrier. Barriers must be emptied before return (or we can drain them for an additional fee).',
      },
      {
        question: 'How many Yodock barriers do I need per 100 feet of run?',
        answer: 'Each Yodock barrier is 6 feet long. For a 100-foot run, you need approximately 17 barriers. Barriers interlock end-to-end and can be configured in straight lines or curves.',
      },
      {
        question: 'Are water-filled barriers NCHRP-350 crash rated?',
        answer: 'Yes. The Yodock 2001MB meets NCHRP Report 350 standards. When filled with water to the specified level, the interlocked barrier system is crash-tested to redirect impacting vehicles and protect the work zone.',
      },
      {
        question: 'What is the minimum rental period for water-filled barriers?',
        answer: 'Our minimum rental for water-filled barriers is 3 days due to the setup and breakdown time involved in filling and draining the barriers. Weekly and monthly rates offer significant savings.',
      },
    ],
    tags: ['barrier', 'water-filled', 'yodock', 'positive protection', 'long duration'],
    inStock: true,
    stockCount: 200,
    popular: false,
    sku: 'BAR-WF-6FT',
    supplierSku: '2001MBORG',
    supplierUrl: '',
    supplier: 'Yodock / OEM',
    weight: '85 lbs empty / ~900 lbs filled',
    dimensions: '72" L × 18" W × 32" H',
    metaTitle: titleBrand('Rent Water-Filled Barriers | Yodock 2001MB NCHRP-350'),
    metaDescription: 'Rent Yodock 2001MB NCHRP-350 water-filled construction barriers from $27/day. 900 lbs filled for positive worker protection. Interlocking 6-ft sections. 3-day minimum.',
  },

  // --- Arrow Boards ---
  {
    id: 'prod-11',
    categoryId: 'cat-4',
    categorySlug: 'arrow-boards',
    name: 'Hi-Way Safety M90 Solar Arrow Board Trailer — 15-Lamp',
    slug: 'trailer-mounted-arrow-board-15',
    description: 'Hi-Way Safety M90 solar-assisted towable arrow board trailer, 15 amber LED PAR46 lamps',
    longDescription:
      'Exact product: Hi-Way Safety / Trans-Supply WAAW-PL25C (15-lamp configuration). M90 Next Generation Solar-Assisted Arrow Board Trailer. 15 amber PAR 46 sealed-beam LED lamps. 48"H × 96"W sign panel. Solar panel + two 12V 22AH sealed batteries with 30-day backup. 5-year lamp warranty. Optional GPS/remote modem. Easily towed by most full-size trucks.',
    volumePriceTiers: singleTierFromRetailUnit(142.5),
    unit: 'each',
    imageUrl: arrowTrailerImg,
    images: [arrowTrailerImg, arrowTruckImg],
    specs: {
      Brand: 'Hi-Way Safety',
      Model: 'M90 Next Generation',
      Lamps: '15 amber PAR 46 LED',
      'Panel Size': '48" H × 96" W',
      Power: 'Solar + 2× 12V 22AH sealed battery',
      'Battery Backup': '30-day',
      'Tongue Weight': '95–100 lbs',
      'Lamp Warranty': '5 years',
    },
    features: [
      '15 amber PAR 46 LED lamps',
      'Solar-assisted — 2.5 hrs sun = 24 hrs operation',
      '30-day battery backup',
      'Optional GPS/remote modem',
      '5-year lamp warranty',
      'Easily towed by most full-size trucks',
    ],
    compliance: ['MUTCD', 'FHWA', 'NCHRP-350'],
    useCases: [
      {
        title: 'Highway Lane Closure Advance Warning',
        description: 'Arrow boards are required by MUTCD for lane closures on high-speed roadways. The trailer-mounted unit positions conspicuously in the advance warning area, displaying directional arrows that guide drivers out of closed lanes with ample stopping distance.',
      },
      {
        title: 'Moving Work Zone Operations',
        description: 'Slow-moving operations like pothole patching, striping, and highway mowing use arrow boards on the rear of work vehicles to warn following traffic. The trailer version can be towed alongside the operation or stationed upstream.',
      },
      {
        title: 'Night Construction on Interstates',
        description: '15 amber LED lamps provide maximum nighttime conspicuity required for interstate work zones. Solar + battery power means no generator noise or fuel management for the board itself.',
      },
    ],
    faqs: [
      {
        question: 'What display modes does the arrow board support?',
        answer: 'The M90 arrow board supports sequential arrow (right, left, or double), caution/chevron mode (all lamps flashing), and off. The controller allows instant mode switching. Sequential arrow mode provides the clearest lane-change guidance for drivers.',
      },
      {
        question: 'Do I need a special hitch to tow the arrow board trailer?',
        answer: 'The trailer uses a standard 2" ball hitch. Most full-size trucks, SUVs, or heavy equipment with a standard 2" receiver can tow the M90 trailer. Tongue weight is 95–100 lbs — well within the capacity of any tow-rated vehicle.',
      },
      {
        question: 'How long will the battery run without solar charging?',
        answer: 'The dual 12V 22AH sealed batteries provide up to 30 days of battery backup in case of extended cloudy conditions. Under normal solar charging conditions (2.5 hours of direct sun), the batteries maintain a full charge indefinitely.',
      },
      {
        question: 'Is an arrow board required for all highway lane closures?',
        answer: 'MUTCD recommends arrow boards for all high-speed roadway lane closures. Many state DOT specifications mandate them for closures on roads above 45 mph. They are effectively required for interstate and US highway lane closures on all projects.',
      },
    ],
    tags: ['arrow board', 'lane closure', 'sequential', 'trailer', 'solar'],
    inStock: true,
    stockCount: 15,
    popular: true,
    sku: 'ARR-TRL-15L',
    supplierSku: 'WAAW-PL25C',
    supplierUrl: 'https://www.trans-supply.com/pg/187/solar-arrow-board-trailers?ProductID=7382',
    supplier: TRANS,
    weight: '~1,000 lbs',
    dimensions: '48" H × 96" W panel; 95" L trailer',
    metaTitle: titleBrand('Rent Arrow Board Trailer | Hi-Way Safety M90 Solar 15-Lamp'),
    metaDescription: 'Rent Hi-Way Safety M90 solar arrow board trailers with 15 amber LED PAR46 lamps from $142.50/day. 30-day battery backup. MUTCD required for highway lane closures.',
  },
  {
    id: 'prod-12',
    categoryId: 'cat-4',
    categorySlug: 'arrow-boards',
    name: 'Gregory Industries AVP15 Arrow Board — 15-Light LED, Battery Powered',
    slug: 'truck-mounted-arrow-board-15',
    description: 'Gregory Industries AVP15 vehicle-mounted 15-light LED arrow board panel with wireless controller',
    longDescription:
      'Exact product: Traffic Safety Products AVP15. Gregory Industries 15-light LED arrow board panel with wireless remote controller, battery powered. 100 lbs. Mounts to truck bed or hitch mount bracket (sold separately). Wireless controller for remote operation. Same directional modes as trailer units. Compact and easily transferred between vehicles.',
    volumePriceTiers: singleTierFromRetailUnit(97.5),
    unit: 'each',
    imageUrl: arrowTruckImg,
    images: [arrowTruckImg, arrowTrailerImg],
    specs: {
      Brand: 'Gregory Industries',
      Model: 'AVP15',
      Lights: '15 LED',
      Controller: 'Wireless remote included',
      Power: 'Battery powered',
      Weight: '100 lbs',
      Mounting: 'Vehicle bed / hitch bracket',
    },
    features: [
      '15 LED lights with wireless remote',
      'Battery powered — no shore power needed',
      'Vehicle bed or hitch mount',
      'Compact at 100 lbs',
      'Remote control operation',
    ],
    compliance: ['MUTCD', 'FHWA'],
    useCases: [
      {
        title: 'Moving Operations & Shadow Vehicles',
        description: 'Truck-mounted arrow boards are the standard for moving work zone shadow vehicles — they mount directly to the truck bed and face following traffic to warn of the slow-moving work operation.',
      },
      {
        title: 'Urban Lane Closures with Limited Space',
        description: 'When road shoulder space prevents trailer deployment, a truck-mounted panel integrates into the work zone vehicle setup without requiring additional towing equipment.',
      },
      {
        title: 'Multi-Site Operations',
        description: 'The AVP15 panel can be quickly transferred between vehicles throughout the day. Ideal for contractors running multiple simultaneous work zones with a shared equipment pool.',
      },
    ],
    faqs: [
      {
        question: 'How does a truck-mounted arrow board differ from a trailer arrow board?',
        answer: 'Trailer arrow boards are standalone units that are towed and parked independently of the work vehicle. Truck-mounted panels attach directly to a work truck and move with it. Trailers offer more flexibility in positioning; truck-mounted panels are more compact and easier to deploy.',
      },
      {
        question: 'What vehicle do I need to mount the AVP15?',
        answer: 'The AVP15 mounts to any standard truck bed or hitch receiver. A 2" receiver hitch bracket is needed for hitch-mount configuration (available separately). The panel weighs 100 lbs — most half-ton and larger trucks handle this without issue.',
      },
      {
        question: 'How long does the battery last?',
        answer: 'Battery runtime varies by lamp brightness setting and mode. Typical operation yields 8–12 hours per charge. Units ship with fully charged batteries. For multi-day operations, a solar charging kit can be requested.',
      },
    ],
    tags: ['arrow board', 'truck mounted', 'vehicle mounted', 'LED', 'wireless'],
    inStock: true,
    stockCount: 12,
    popular: false,
    sku: 'ARR-TCK-15L',
    supplierSku: 'AVP15',
    supplierUrl: 'https://trafficsafetyproducts.net/workzone-products/workzone-lighting/arrow-board-15-light-led-panel-wireless-controller-battery-poweredavp15.html',
    supplier: TSP,
    weight: '100 lbs',
    dimensions: 'Contact supplier for panel dimensions',
    metaTitle: titleBrand('Rent Truck-Mounted Arrow Board | Gregory AVP15 15-LED Wireless'),
    metaDescription: 'Rent Gregory Industries AVP15 truck-mounted 15-LED arrow boards with wireless remote from $97.50/day. Battery powered. Ideal for moving operations and shadow vehicles.',
  },

  // --- Message Boards ---
  {
    id: 'prod-13',
    categoryId: 'cat-5',
    categorySlug: 'message-boards',
    name: 'Ver-Mac PCMS-1210 Pro — 3-Line Portable Message Board',
    slug: 'portable-message-board-3line',
    description: 'Ver-Mac PCMS-1210 Pro solar trailer-mounted 3-line LED portable changeable message sign, NTCIP compliant',
    longDescription:
      'Exact product: Ver-Mac PCMS-1210 Pro (available via Coral Sales). Full-size trailer-mounted 3-line portable changeable message sign. 71"×133" display, 18" character height per line, 8 characters per line. V-Touch touchscreen controller, V-Sync WiFi + 4G LTE, tilt-and-rotate solar panels, sealed maintenance-free batteries (Stealth Technology). NTCIP compliant. JamLogic fleet management ready.',
    volumePriceTiers: singleTierFromRetailUnit(262.5),
    unit: 'each',
    imageUrl: msgBoardImg,
    images: [msgBoardImg, arrowTrailerImg],
    specs: {
      Brand: 'Ver-Mac',
      Model: 'PCMS-1210 Pro',
      Display: '3-line, 8 chars/line',
      'Character Height': '18" per line',
      'Display Size': '71" × 133"',
      Controller: 'V-Touch (touchscreen)',
      Communication: 'WiFi V-Sync + 4G LTE',
      Power: 'Tilt/rotate solar + sealed batteries',
      Compliance: 'NTCIP compliant',
    },
    features: [
      '3-line × 8-character LED display',
      'Touchscreen V-Touch controller',
      'WiFi + 4G LTE remote programming',
      'Solar-powered with theft-proof sealed batteries',
      'NTCIP compliant',
      'JamLogic fleet management ready',
    ],
    compliance: ['NTCIP', 'MUTCD', 'FHWA'],
    useCases: [
      {
        title: 'Work Zone Motorist Messaging',
        description: 'Display real-time messages to approaching drivers: lane closure schedules, detour routes, speed reductions, and safety warnings. Far more flexible than static signs for changing work zone conditions.',
      },
      {
        title: 'Traffic Management During Events',
        description: 'Festivals, sporting events, and large gatherings use portable message boards to direct parking, communicate road closures, and manage pedestrian flow — programmable remotely via 4G LTE.',
      },
      {
        title: 'Emergency & Incident Response',
        description: 'Emergency management agencies deploy portable message boards to communicate evacuation routes, shelter locations, and road conditions during natural disasters and major incidents.',
      },
    ],
    faqs: [
      {
        question: 'Can the message board be programmed remotely?',
        answer: 'Yes. The Ver-Mac PCMS-1210 Pro includes WiFi (V-Sync) and 4G LTE connectivity. You can program messages, schedule display changes, and monitor the unit from any internet-connected device. JamLogic fleet management software enables centralized control of multiple boards.',
      },
      {
        question: 'How many characters per line can the display show?',
        answer: 'The PCMS-1210 Pro displays 8 characters per line across 3 lines. Characters are 18" tall. Common abbreviations are used (e.g., "ROAD CLSD", "DETOUR →", "SLOW DOWN"). We provide a recommended message guide with your rental.',
      },
      {
        question: 'Does the message board need to be plugged in?',
        answer: 'No. The unit is fully solar-powered with tilt-and-rotate solar panels and sealed maintenance-free batteries (Ver-Mac Stealth Technology). The batteries provide days of operation in overcast conditions. No generator or shore power is needed.',
      },
      {
        question: 'What is the minimum rental period for a portable message board?',
        answer: 'Minimum rental is 1 day, but weekly rates offer the best value for most projects. Message boards are a significant investment in driver communication — most projects use them for the full project duration.',
      },
    ],
    tags: ['message board', 'PCMS', 'variable message sign', 'VMS', 'solar', 'ver-mac'],
    inStock: true,
    stockCount: 8,
    popular: true,
    sku: 'MSG-3L-SOL',
    supplierSku: 'PCMS-1210-PRO',
    supplierUrl: 'https://coralsales.com/products/pcms-1210-pro-message-board',
    supplier: CORAL,
    weight: 'Contact supplier',
    dimensions: '71" × 133" display',
    metaTitle: titleBrand('Rent Portable Message Board | Ver-Mac PCMS-1210 Pro 3-Line Solar'),
    metaDescription: 'Rent Ver-Mac PCMS-1210 Pro 3-line portable message boards from $262.50/day. WiFi + 4G LTE remote programming, solar-powered, NTCIP compliant. Ideal for work zones and events.',
  },

  // --- Safety Lighting ---
  {
    id: 'prod-14',
    categoryId: 'cat-6',
    categorySlug: 'safety-lighting',
    name: '3-Volt D-Cell LED Barricade Flasher — Amber, Type B',
    slug: 'type-b-flashing-warning-light',
    description: '3-volt D-cell LED amber barricade flasher, photo-cell controlled, MUTCD Type B',
    longDescription:
      'Exact product: OEM 3VOLT LED (MPN 99-02006). Amber 3-volt D-cell LED barricade flasher. Photo-cell activated — automatically turns off during daylight to conserve battery. Two modes: Steady-On or Flash. Mounts to barricades, drums, cones, and sign stands. Made in USA. Ships same day.',
    volumePriceTiers: singleTierFromRetailUnit(2.25),
    unit: 'each',
    imageUrl: flasherImg,
    images: [flasherImg, flareImg],
    specs: {
      MPN: '99-02006',
      Type: 'MUTCD Type B',
      Lens: 'Amber',
      Power: '2× D-cell batteries',
      Modes: 'Steady-On / Flash',
      'Photo-Cell': 'Yes — auto daylight shutoff',
      Origin: 'Made in USA',
    },
    features: [
      'Photo-cell auto daylight shutoff',
      'Steady-On and Flash modes',
      'Amber LED — MUTCD Type B compliant',
      'Mounts to barricades, drums, and cones',
      'Made in USA',
    ],
    compliance: ['MUTCD Type B', 'FHWA'],
    useCases: [
      {
        title: 'Nighttime Barricade Lighting',
        description: 'MUTCD requires Type B flashing lights on all barricades and channelizing devices used for road closures and lane restrictions after dark. These flashers clip directly to Type II and III barricades and drum tops.',
      },
      {
        title: 'Low-Visibility & Fog Conditions',
        description: 'Even during daytime, foggy or low-visibility conditions may require activated flashers. The photo-cell can be overridden to run lights continuously in daytime conditions when visibility is poor.',
      },
      {
        title: 'Cone Top Warning Lights',
        description: 'Clip flashers to cone tops for enhanced nighttime visibility at critical delineation points — lane diverges, ramp closures, and high-hazard areas within work zones.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a Type A and Type B barricade flasher?',
        answer: 'MUTCD Type A flashers (low-intensity) are used on advance warning devices away from traffic. Type B flashers (higher-intensity) are required for barricades and devices at the edge of the travel lane. These are Type B — the correct specification for work zone barricade and drum mounting.',
      },
      {
        question: 'How long do the batteries last?',
        answer: 'In flash mode with the photo-cell active (nighttime only), two D-cell batteries last approximately 300–500 hours of active operation — enough for 30–60 nights. Flashers ship with fresh batteries.',
      },
      {
        question: 'Do I need one flasher per barricade?',
        answer: 'MUTCD requires at least one Type B flasher per barricade for road closures at night. For Type III barricades (3 rails), two flashers are recommended for optimal visibility. For channelizing drums, one flasher per drum at critical points is standard.',
      },
      {
        question: 'Can these flashers be used on traffic cones?',
        answer: 'Yes. These flashers can be placed on top of 28" and 36" traffic cones or clipped to the collar. This is common practice for marking the front of lane closures and other critical points where additional nighttime conspicuity is needed.',
      },
    ],
    tags: ['warning light', 'flashing', 'type B', 'amber', 'night work', 'barricade light'],
    inStock: true,
    stockCount: 400,
    popular: true,
    sku: 'LGT-B-FLSH',
    supplierSku: '3VOLT LED',
    supplierUrl: '',
    supplier: 'OEM Type B flasher',
    weight: '~1 lb',
    dimensions: '~5" diameter',
    metaTitle: titleBrand('Rent Type B Barricade Flashers | Amber LED MUTCD Compliant'),
    metaDescription: 'Rent MUTCD Type B amber LED barricade flashers from $2.25/day. Photo-cell auto shutoff, steady or flash mode. Required for nighttime barricade and drum lighting. 400+ in stock.',
  },
  {
    id: 'prod-15',
    categoryId: 'cat-17',
    categorySlug: 'flares-markers-wands-flags',
    name: 'Orion 30-Minute Road Flares — Pack of 6',
    slug: 'road-flares-6-pack',
    description: 'Six Orion 30-minute waxed road flares in nylon carrying case with orange safety vest',
    longDescription:
      'Exact product: Orion ORION6030 (MPN 6030). Six-pack of Orion 30-minute waxed road flares. Includes high-visibility red nylon carrying case and orange safety vest. Waxed construction is weather-resistant — works in fog, rain, and snow. DOT approved. Visible day or night. Standard for work zone and emergency delineation where open-flame flares are permitted.',
    volumePriceTiers: singleTierFromRetailUnit(18),
    unit: 'set',
    imageUrl: flareImg,
    images: [flareImg, flasherImg],
    specs: {
      Brand: 'Orion',
      MPN: '6030',
      Quantity: '6 flares per set',
      'Burn Time': '30 minutes each',
      Construction: 'Waxed — weather resistant',
      Accessories: 'Nylon case + orange safety vest',
      Compliance: 'DOT approved',
    },
    features: [
      '30-minute burn time per flare',
      'Weather-resistant waxed construction',
      'Works in fog, rain, and snow',
      'Includes nylon case and safety vest',
      'DOT approved',
    ],
    compliance: ['DOT', 'MUTCD'],
    useCases: [
      {
        title: 'Emergency Incident Delineation',
        description: 'Road flares are the fastest-deploying traffic control device for first responders and utility crews managing sudden lane blockages, vehicle accidents, and equipment breakdowns.',
      },
      {
        title: 'Low-Light & Night Emergency Repair',
        description: 'In emergency repair situations where setting up a full work zone is impractical, road flares provide immediate visible delineation while a proper traffic control plan is established.',
      },
      {
        title: 'Short-Duration Utility Operations',
        description: 'For quick access to utility infrastructure requiring brief traffic control (under 30 minutes), flares provide rapid deployment with no equipment setup time.',
      },
    ],
    faqs: [
      {
        question: 'Are road flares legal to use in work zones?',
        answer: 'Road flares are DOT-approved and legal in most jurisdictions, but some states and municipalities restrict open-flame devices near fuel pipelines, in tunnels, or in areas with spilled fuel. Check local regulations. Electronic flares (LED) are a non-combustion alternative where open-flame flares are restricted.',
      },
      {
        question: 'How visible are flares in daylight?',
        answer: 'Orion road flares produce intense red light and smoke visible in daylight at 500+ feet. The bright red flame and smoke column make them highly conspicuous even in sunny conditions.',
      },
      {
        question: 'What is included in the 6-pack rental set?',
        answer: 'Each rental set includes 6 Orion 30-minute road flares, a high-visibility red nylon carrying case, and an orange safety vest. The safety vest is required PPE when deploying flares in active traffic.',
      },
      {
        question: 'Do I return unused flares?',
        answer: 'Yes. Return unused flares at the end of your rental period. Used/burned flares are consumed and do not need to be returned. We track flare usage and replenish the set between rentals.',
      },
    ],
    tags: ['flare', 'road flare', 'orion', 'emergency', 'night', 'delineation'],
    inStock: true,
    stockCount: 60,
    popular: false,
    sku: 'FLR-ORI-6PK',
    supplierSku: 'ORION6030',
    supplierUrl: '',
    supplier: 'Orion Safety Products',
    weight: '~3 lbs (set)',
    dimensions: '6 flares in nylon case',
    metaTitle: titleBrand('Rent Road Flares | Orion 30-Min 6-Pack DOT Approved'),
    metaDescription: 'Rent Orion 30-minute DOT-approved road flares (6-pack) from $18/day. Weather-resistant waxed construction, nylon case and safety vest included. Ideal for emergency delineation.',
  },

  // --- Safety Lighting (additional) ---
  {
    id: 'prod-16',
    categoryId: 'cat-6',
    categorySlug: 'safety-lighting',
    name: 'Solar-Assist LED Barricade Warning Light — High-Output Amber',
    slug: 'solar-led-barricade-warning-light-high-output',
    description: 'Solar-charged amber LED barricade light with dusk-to-dawn operation for drums, barricades, and sign stands',
    longDescription:
      'Exact product line: solar-assist LED barricade warning light (amber lens). High-output LEDs for MUTCD nighttime conspicuity on channelizing devices. Integrated photocell, sealed housing, and rechargeable battery pack reduce D-cell swaps vs. traditional flashers. Mounts to Type I–III barricades, drums, and compatible sign hardware.',
    volumePriceTiers: singleTierFromRefDaily(3),
    unit: 'each',
    imageUrl: flasherImg,
    images: [flasherImg, drumImg, barT2img],
    specs: {
      Lens: 'Amber LED',
      Power: 'Solar assist + sealed rechargeable battery',
      Mount: 'Universal barricade / drum top clip',
      Modes: 'Steady / flash (model dependent)',
      'Photo-Cell': 'Yes — dusk-to-dawn',
    },
    features: [
      'Solar assist extends runtime between charges',
      'High-intensity amber LEDs for lane-edge devices',
      'Sealed weather-resistant housing',
      'Photocell for automatic night activation',
      'Fits common barricade and drum mounts',
    ],
    compliance: ['MUTCD', 'FHWA'],
    useCases: [
      {
        title: 'Long-Duration Night Work',
        description: 'Solar-assist lights reduce battery swaps on multi-night lane closures while keeping barricades and drums visible from dusk to dawn.',
      },
      {
        title: 'Drum and Channelizer Lighting',
        description: 'Mount on channelizing drums at merge points and lane drops where continuous flashing improves driver guidance.',
      },
      {
        title: 'Backup to Type B D-Cell Flashers',
        description: 'Pair with or substitute for D-cell flashers on projects that prioritize lower battery handling and sealed electronics.',
      },
    ],
    faqs: [
      {
        question: 'Is this the same as a MUTCD Type B flasher?',
        answer: 'Type A/B classifications describe intensity and application. This unit is positioned for barricade and channelizer lighting similar to Type B applications; confirm your state DOT or TCP for specific device approval and photometric requirements.',
      },
      {
        question: 'Does it need direct sunlight every day?',
        answer: 'Solar-assist models charge during daylight and run overnight. Extended overcast periods may shorten runtime—plan spare units or D-cell Type B flashers for critical redundancy.',
      },
      {
        question: 'What is the minimum rental period?',
        answer: 'Minimum rental is 1 day. Weekly and monthly rates apply the same ×4 / ×12 retail tiering used across our catalog.',
      },
      {
        question: 'Can it mount on traffic cones?',
        answer: 'Many models include adapters for cone tops and drum lids. Specify cone height and collar type in your quote so we ship the correct mounting hardware.',
      },
    ],
    tags: ['barricade light', 'solar', 'LED', 'night work', 'drum'],
    inStock: true,
    stockCount: 220,
    popular: false,
    sku: 'LGT-SOL-HO',
    supplierSku: 'SOLAR-LED-BARR',
    supplierUrl: '',
    supplier: TSP,
    weight: '~2 lbs',
    dimensions: 'Compact drum / barricade mount',
    metaTitle: titleBrand('Rent Solar LED Barricade Lights | Amber High-Output'),
    metaDescription: 'Rent solar-assist amber LED barricade warning lights with photocell operation. Ideal for drums and barricades on night work. Retail rental rates include 50% markup.',
  },

  // --- Pedestrian & Crowd Control ---
  {
    id: 'prod-17',
    categoryId: 'cat-7',
    categorySlug: 'pedestrian-control',
    name: 'Urbanite Water-Filled Pedestrian Barricade — White',
    slug: 'urbanite-water-filled-pedestrian-barricade',
    description: 'Low-profile water-filled pedestrian barricade for crowd lines, festivals, and sidewalk closures',
    longDescription:
      'Exact product family: Urbanite-style water-filled pedestrian barricade (white shell, interlocking feet). Ballast with water on site for stability without heavy steel barriers. Common for sidewalk detours, outdoor retail queues, stadium ingress, and short-term pedestrian channelization adjacent to low-speed traffic.',
    volumePriceTiers: singleTierFromRefDaily(5),
    unit: 'each',
    imageUrl: urbanitePedImg,
    images: [urbanitePedImg, barWFimg, barT2img],
    specs: {
      Style: 'Water-filled pedestrian barricade',
      Color: 'White (high-visibility shell)',
      Ballast: 'Water-filled on site',
      Connection: 'Interlocking ends',
      Typical: 'Crowd control / ped channelization',
    },
    features: [
      'Water ballast for stable pedestrian lines',
      'Interlocking layout for continuous runs',
      'Reusable across events and closures',
      'Lower trip profile than highway drums',
      'Fast deploy and strike for short-duration work',
    ],
    compliance: ['Local ped / event ordinances'],
    useCases: [
      {
        title: 'Sidewalk Detours',
        description: 'Create continuous pedestrian routes past building entrances, café seating, and construction facades while keeping walkers separated from adjacent curb lane.',
      },
      {
        title: 'Event Perimeters',
        description: 'Define ingress and egress chutes for concerts, races, and street fairs where controlled pedestrian flow matters more than vehicle impact performance.',
      },
      {
        title: 'Queue Management',
        description: 'Straight runs and gentle corners for ticketing, security screening, and valet staging without permanent bollards.',
      },
    ],
    faqs: [
      {
        question: 'Do I fill the units on site?',
        answer: 'Yes. Units ship empty for transport efficiency; fill with water after placement. Drain before return unless your contract specifies otherwise.',
      },
      {
        question: 'Are these MUTCD highway barriers?',
        answer: 'Urbanite-style barriers are primarily for pedestrian and low-speed control. For vehicle lane closures on traveled roadways, use MUTCD-tested longitudinal barriers and approved channelizing devices from our barricades category.',
      },
      {
        question: 'How many do I need for a run?',
        answer: 'Interlocking length and corner geometry drive counts. Send a sketch or call with footage — we can estimate a layout and scheduling windows.',
      },
      {
        question: 'What is the minimum rental period?',
        answer: 'Minimum rental is 1 day. Weekly and monthly tiers follow standard catalog pricing.',
      },
    ],
    tags: ['pedestrian', 'crowd control', 'water filled', 'urbanite', 'event'],
    inStock: true,
    stockCount: 140,
    popular: false,
    sku: 'PED-URB-WHT',
    supplierSku: 'URBANITE-WHT',
    supplierUrl: '',
    supplier: TSP,
    weight: 'Empty — fills on site',
    dimensions: 'Low-profile ped barricade module',
    metaTitle: titleBrand('Rent Urbanite Pedestrian Barricades | Water-Filled'),
    metaDescription: 'Rent white Urbanite-style water-filled pedestrian barricades for events and sidewalk detours. Stable interlocking runs. Retail rates with 50% markup.',
  },
  {
    id: 'prod-18',
    categoryId: 'cat-7',
    categorySlug: 'pedestrian-control',
    name: 'Economy Pedestrian Barricade — Orange, EG Reflective',
    slug: 'economy-pedestrian-barricade-orange-eg',
    description: 'Folding-style economy pedestrian barricade with engineer-grade reflective sheeting',
    longDescription:
      'Exact product line: economy pedestrian barricade (orange frame) with red/white engineer-grade reflective panels. Lightweight A-frame style for quick setup at sidewalk closures, parking garage entrances, and short-term ped routes. Pairs with ballast or sandbags in wind-exposed locations.',
    volumePriceTiers: singleTierFromRefDaily(2.5),
    unit: 'each',
    imageUrl: barT2img,
    images: [barT2img, urbanitePedImg, signStandImg],
    specs: {
      Frame: 'Orange folding pedestrian barricade',
      Sheeting: 'Engineer-grade red / white',
      Weight: 'Lightweight — ballast as needed',
      Use: 'Sidewalk / lot ped control',
    },
    features: [
      'Fast setup and strike',
      'EG reflective panels for night visibility',
      'Compact nesting for transport',
      'Compatible with sandbags for ballast',
      'Cost-effective for short closures',
    ],
    compliance: ['MUTCD-style ped channelization (verify locally)'],
    useCases: [
      {
        title: 'Sidewalk Work Adjacent to Pedestrians',
        description: 'Short closures for utility vaults, tree pits, and façade repair where a clear ped path must remain obvious.',
      },
      {
        title: 'Parking Structure Ramps',
        description: 'Temporary ped routing at garage entrances during sensor or gate maintenance.',
      },
      {
        title: 'Retail and Campus Events',
        description: 'Low-speed environments where lightweight barriers define lines without full crash-rated systems.',
      },
    ],
    faqs: [
      {
        question: 'Do I need sandbags?',
        answer: 'In wind or narrow channels, ballast the legs with sandbags or weights. We stock empty sandbags and ballast kits in Accessories & Hardware.',
      },
      {
        question: 'Is engineer-grade enough at night?',
        answer: 'EG is suitable for many low-speed ped environments. For high-contrast night needs near traffic, consider high-intensity sheeting upgrades or supplemental warning lights.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; weekly and monthly discounts apply.',
      },
      {
        question: 'Can these block vehicles?',
        answer: 'They are pedestrian-class devices—not longitudinal vehicle barriers. Use water-filled or crash-tested barriers for vehicle lane protection.',
      },
    ],
    tags: ['pedestrian barricade', 'A-frame', 'reflective', 'sidewalk'],
    inStock: true,
    stockCount: 200,
    popular: false,
    sku: 'PED-AFR-EG',
    supplierSku: 'PED-BARR-EG',
    supplierUrl: '',
    supplier: TSP,
    weight: '~12–18 lbs (typical)',
    dimensions: 'Folding barricade panel',
    metaTitle: titleBrand('Rent Economy Pedestrian Barricades | EG Reflective'),
    metaDescription: 'Rent orange economy pedestrian barricades with engineer-grade reflective sheeting. Fast setup for sidewalk and lot ped control.',
  },

  // --- Accessories & Hardware ---
  {
    id: 'prod-19',
    categoryId: 'cat-8',
    categorySlug: 'accessories-hardware',
    name: 'Empty Polypropylene Traffic Sandbag — 14" × 26"',
    slug: 'traffic-sandbag-14x26-empty',
    description: 'Woven polypropylene empty sandbag for ballasting signs, stands, and lightweight barricades',
    longDescription:
      'Exact product: standard 14" × 26" woven polypropylene traffic sandbag (empty). UV-treated fabric resists tearing when filled. Tie or clip closure. Used for sign stand ballast, pedestrian barricade legs, and temporary message board anchoring in moderate wind.',
    volumePriceTiers: singleTierFromRefDaily(1.5),
    unit: 'each',
    imageUrl: signStandImg,
    images: [signStandImg, barT2img, cone28img],
    specs: {
      Size: '14" × 26" (empty)',
      Material: 'Woven polypropylene',
      Fill: 'Sand or gravel (customer-supplied on site)',
      Closure: 'Tie top',
    },
    features: ['UV-stabilized fabric', 'High tear strength when filled', 'Reusable across jobs', 'Stackable when empty'],
    compliance: [],
    useCases: [
      {
        title: 'Sign Stand Ballast',
        description: 'Place filled bags on roll-up sign stand legs and tripod feet to resist gusts along open roadways.',
      },
      {
        title: 'Pedestrian Barricade Leg Ballast',
        description: 'Stabilize folding pedestrian barricades in breezy parking lots and plaza work.',
      },
      {
        title: 'Temporary Anchor Weights',
        description: 'Low-profile anchoring where water-filled barriers are impractical.',
      },
    ],
    faqs: [
      {
        question: 'Is sand included?',
        answer: 'Bags rent empty; source clean dry sand or gravel on site. Return empty bags at end of rental unless otherwise agreed.',
      },
      {
        question: 'How many bags per stand?',
        answer: 'Wind exposure and stand height drive counts—two to four filled bags per leg is common in moderate wind.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Can I buy instead of rent?',
        answer: 'Yes—ask for purchase pricing on high-consumption projects.',
      },
    ],
    tags: ['sandbag', 'ballast', 'sign stand', 'weight'],
    inStock: true,
    stockCount: 800,
    popular: true,
    sku: 'ACC-SB-1426',
    supplierSku: 'SB-14X26-PP',
    supplierUrl: '',
    supplier: TSP,
    weight: '~0.2 lb empty',
    dimensions: '14" × 26" flat',
    metaTitle: titleBrand('Rent Traffic Sandbags | 14×26 Polypropylene'),
    metaDescription: 'Rent empty 14×26 woven polypropylene traffic sandbags for sign stand and barricade ballast. Durable UV-treated fabric.',
  },
  {
    id: 'prod-20',
    categoryId: 'cat-8',
    categorySlug: 'accessories-hardware',
    name: 'Rubber Sign Stand Base Weight — Dual-Handle',
    slug: 'rubber-sign-stand-base-weight',
    description: 'Recycled-rubber donut weight for telescoping sign stands and roll-up hardware',
    longDescription:
      'Exact product line: recycled rubber sign stand base weight with dual handles. Slides over common telescoping mast tubes to lower center of gravity for roll-up signs in wind. Faster reposition than sandbags alone for crews that strike and reset layouts daily.',
    volumePriceTiers: singleTierFromRefDaily(1.5),
    unit: 'each',
    imageUrl: signStandImg,
    images: [signStandImg, cone28img, drumImg],
    specs: {
      Material: 'Recycled rubber',
      Interface: 'Common telescoping mast / stand families',
      Handles: 'Dual lift handles',
      Use: 'Roll-up and rigid sign stands',
    },
    features: ['Adds low-center ballast', 'Tool-free slide-on (compatible models)', 'Durable rubber compound', 'Dual handles for faster moves'],
    compliance: [],
    useCases: [
      {
        title: 'Windy Roll-Up Sign Placement',
        description: 'Combine rubber weights with sandbags on gusty arterials for redundant ballast.',
      },
      {
        title: 'Lane Closure Tapers',
        description: 'Crews resetting advance warning signs nightly benefit from quicker weight handling vs. bags alone.',
      },
      {
        title: 'Parking Lot Messaging',
        description: 'Stabilize temporary directional signs at retail and logistics sites.',
      },
    ],
    faqs: [
      {
        question: 'Will it fit my stand?',
        answer: 'Compatibility varies by mast diameter and foot design. Send your stand model or a photo of the foot plate—we match weights to common Traffic Safety Store stand families.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Do I still need sandbags?',
        answer: 'In extreme wind, yes—layer sandbags in addition to rubber weights.',
      },
      {
        question: 'Weight of the unit?',
        answer: 'Typical recycled rubber weights range ~28–40 lb depending on SKU—confirm on quote.',
      },
    ],
    tags: ['sign stand', 'ballast', 'rubber weight', 'roll-up'],
    inStock: true,
    stockCount: 350,
    popular: false,
    sku: 'ACC-RSW-DH',
    supplierSku: 'STAND-RUB-WT',
    supplierUrl: '',
    supplier: TSP,
    weight: '~28–40 lb (SKU dependent)',
    dimensions: 'Fits common mast tubes',
    metaTitle: titleBrand('Rent Sign Stand Rubber Weights | Dual-Handle'),
    metaDescription: 'Rent recycled rubber base weights for telescoping sign stands. Faster ballast handling for roll-up signs in wind.',
  },

  // --- Parking Blocks ---
  {
    id: 'prod-21',
    categoryId: 'cat-9',
    categorySlug: 'parking-blocks',
    name: 'Commercial Rubber Parking Block — 6 ft, Blue, Spiked',
    slug: 'commercial-rubber-parking-block-6ft-blue',
    description: 'Six-foot recycled rubber wheel stop with galvanized spikes for asphalt installs',
    longDescription:
      'Exact product line: commercial recycled rubber parking block, 6 ft length, blue with pre-drilled galvanized spike holes. Low-profile design for cars and light trucks in lots and garages. Spikes anchor into asphalt; alternate hardware available for concrete (request in quote).',
    volumePriceTiers: singleTierFromRefDaily(2.25),
    unit: 'each',
    imageUrl: parkingBlueImg,
    images: [parkingBlueImg, cone28img, barT2img],
    specs: {
      Length: '6 ft',
      Material: 'Recycled rubber',
      Color: 'Blue',
      Anchoring: 'Galvanized spikes (asphalt typical)',
      Profile: 'ADA-friendly low profile (verify layout)',
    },
    features: ['UV-stable rubber compound', 'Reflective tape options available', 'Spiked asphalt install', 'Reusable across lot projects', 'High visibility blue shell'],
    compliance: ['ADA layout review recommended'],
    useCases: [
      {
        title: 'Retail and Office Lots',
        description: 'Define stall noses and end-of-aisle stops to reduce bumper strikes and pedestrian pinch points.',
      },
      {
        title: 'Distribution Centers',
        description: 'Protect dock doors and pedestrian walkways inside yards with repeated truck traffic.',
      },
      {
        title: 'Temporary Lot Re-striping Projects',
        description: 'Hold stall geometry while new striping cures or while phased paving completes.',
      },
    ],
    faqs: [
      {
        question: 'Can these install in concrete?',
        answer: 'Yes with wedge anchors or epoxy—specify substrate in your quote so we ship the correct fastener kit.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; weekly and monthly tiers available.',
      },
      {
        question: 'Can you place these on site?',
        answer: 'On-site placement can be quoted separately; ask when you request a quote.',
      },
      {
        question: 'Are blue blocks required anywhere?',
        answer: 'Some owners and EV charging layouts specify color for visibility. Confirm with your architect or municipal guidance.',
      },
    ],
    tags: ['parking block', 'wheel stop', 'rubber', 'asphalt'],
    inStock: true,
    stockCount: 260,
    popular: false,
    sku: 'PRK-BLK-6BL',
    supplierSku: 'PK-BLK-6-BLU',
    supplierUrl: '',
    supplier: TSP,
    weight: '~34 lb (typical)',
    dimensions: '6 ft × ~7–8 in height (typical)',
    metaTitle: titleBrand('Rent 6 ft Rubber Parking Blocks | Blue Wheel Stops'),
    metaDescription: 'Rent 6 ft commercial recycled rubber parking blocks with asphalt spikes. High-visibility blue for lots and garages.',
  },
  {
    id: 'prod-22',
    categoryId: 'cat-9',
    categorySlug: 'parking-blocks',
    name: 'Recycled Rubber Wheel Stop — 4 ft, Yellow Stripes',
    slug: 'rubber-wheel-stop-4ft-yellow-stripes',
    description: 'Four-foot recycled rubber wheel stop with molded yellow chevron or stripe visibility',
    longDescription:
      'Exact product line: 4 ft recycled rubber wheel stop with high-visibility yellow stripe or chevron molding. Shorter length fits compact stalls and angled parking. Pre-drilled for mechanical anchoring; specify asphalt vs. concrete in your quote.',
    volumePriceTiers: singleTierFromRefDaily(2.25),
    unit: 'each',
    imageUrl: parkingBlueImg,
    images: [parkingBlueImg, parkingBlueImg, cone28img],
    specs: {
      Length: '4 ft',
      Material: 'Recycled rubber',
      Visibility: 'Molded yellow stripes / chevrons',
      Anchoring: 'Mechanical fasteners (substrate-specific)',
    },
    features: ['Shorter length for tight stalls', 'High daytime conspicuity', 'Impact-resistant rubber', 'Pre-drilled fastener pattern', 'Reusable'],
    compliance: [],
    useCases: [
      {
        title: 'Compact Parking Stalls',
        description: 'Shorter stops reduce interference with curbs and planters in tight geometry.',
      },
      {
        title: 'Garage Level Transitions',
        description: 'Mark maximum forward point before slope changes or speed bumps.',
      },
      {
        title: 'Loading Zones',
        description: 'Hold box trucks short of overhead doors without oversized 6 ft hardware.',
      },
    ],
    faqs: [
      {
        question: 'Yellow vs. blue—does it matter?',
        answer: 'Both improve visibility vs. plain black. Pick based on owner standards and contrast with pavement color.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Do I return damaged units?',
        answer: 'Normal wear is expected; cracked or cut units should be noted at return for fair billing.',
      },
      {
        question: 'Spacing from the wall?',
        answer: 'Follow your civil details—typical nose clearance is project-specific.',
      },
    ],
    tags: ['wheel stop', 'parking curb', '4 ft', 'yellow'],
    inStock: true,
    stockCount: 310,
    popular: false,
    sku: 'PRK-BLK-4YL',
    supplierSku: 'PK-BLK-4-YL',
    supplierUrl: '',
    supplier: TSP,
    weight: '~22–28 lb (typical)',
    dimensions: '4 ft length',
    metaTitle: titleBrand('Rent 4 ft Rubber Wheel Stops | Yellow Stripes'),
    metaDescription: 'Rent 4 ft recycled rubber wheel stops with yellow visibility stripes. Ideal for compact stalls and garages.',
  },

  // --- Speed Bumps & Humps ---
  {
    id: 'prod-23',
    categoryId: 'cat-10',
    categorySlug: 'speed-bumps-humps',
    name: 'Economy Rubber Speed Hump — Middle Section',
    slug: 'economy-rubber-speed-hump-middle',
    description: 'Modular rubber speed hump middle section with asphalt spikes for traffic calming',
    longDescription:
      'Exact product line: economy modular rubber speed hump middle section with integrated cable channels (model dependent) and galvanized spikes for asphalt. Combine with end caps to create full-width humps on private drives, logistics yards, and temporary lot controls.',
    volumePriceTiers: singleTierFromRefDaily(4),
    unit: 'each',
    imageUrl: speedHumpImg,
    images: [speedHumpImg, parkingBlueImg, cone28img],
    specs: {
      Type: 'Modular rubber speed hump — middle',
      Anchoring: 'Galvanized spikes (asphalt)',
      System: 'Requires matching end caps',
      Use: 'Private roads / lots (verify public ROW rules)',
    },
    features: ['Modular layout for any road width', 'Durable rubber compound', 'Asphalt spike pattern', 'Reflective tape options', 'Repeatable rental inventory'],
    compliance: ['Local fire / EMS clearance rules apply'],
    useCases: [
      {
        title: 'Distribution Yard Internal Roads',
        description: 'Calm forklift and truck speeds between buildings without cast-in-place concrete.',
      },
      {
        title: 'Event Parking Fields',
        description: 'Temporary humps for gravel or asphalt lanes during festivals and fairs.',
      },
      {
        title: 'School and Campus Service Drives',
        description: 'Reduce cut-through speeds on private campus loops.',
      },
    ],
    faqs: [
      {
        question: 'Can I install this on a public street?',
        answer: 'Public roadway installations require engineering, fire/EMS clearance, and municipal approval. Many rentals are for private property only—confirm jurisdiction.',
      },
      {
        question: 'Do I need end caps?',
        answer: 'Yes. Middle sections alone are incomplete—quote end caps for tapered entry geometry.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Removal marks?',
        answer: 'Spike holes remain in asphalt—plan patch or sealcoat after removal.',
      },
    ],
    tags: ['speed hump', 'rubber', 'traffic calming', 'modular'],
    inStock: true,
    stockCount: 120,
    popular: false,
    sku: 'SPD-HMP-MID',
    supplierSku: 'HUMP-ECO-MID',
    supplierUrl: '',
    supplier: TSP,
    weight: '~45–60 lb (section dependent)',
    dimensions: 'Modular middle section',
    metaTitle: titleBrand('Rent Rubber Speed Hump Sections | Modular'),
    metaDescription: 'Rent economy modular rubber speed hump middle sections with asphalt spikes. Pair with end caps for full-width calming.',
  },
  {
    id: 'prod-24',
    categoryId: 'cat-10',
    categorySlug: 'speed-bumps-humps',
    name: 'Portable Rubber Speed Bump — 6 ft, Portable Kit',
    slug: 'portable-rubber-speed-bump-6ft',
    description: 'Six-foot portable rubber speed bump for temporary lot and lane speed reduction',
    longDescription:
      'Exact product line: 6 ft portable rubber speed bump kit with carry handles and cat’s-eye reflectors (model dependent). Designed for repeated deploy/strike on lots where permanent asphalt milling is not allowed. Anchor with spikes or lag bolts per substrate.',
    volumePriceTiers: singleTierFromRefDaily(4),
    unit: 'each',
    imageUrl: speedHumpImg,
    images: [speedHumpImg, barT2img, cone28img],
    specs: {
      Length: '6 ft (typical kit)',
      Material: 'Recycled / composite rubber',
      Reflectors: 'Molded or adhesive reflectors',
      Portable: 'Handles for two-person carry',
    },
    features: ['Portable for events and seasonal lots', 'High visibility reflectors', 'Asphalt or concrete anchoring options', 'Durable rubber wear surface', 'Reusable rental inventory'],
    compliance: ['Private property typical—verify public ROW'],
    useCases: [
      {
        title: 'Seasonal Campgrounds and Parks',
        description: 'Install for peak season, remove for winter maintenance access.',
      },
      {
        title: 'Film and Production Bases',
        description: 'Temporary traffic calming on private base camps.',
      },
      {
        title: 'School student loading zones',
        description: 'Short-term calming during construction detours.',
      },
    ],
    faqs: [
      {
        question: 'How is it different from a hump system?',
        answer: 'Portable bumps are often single-piece or two-piece kits for narrower paths; modular humps span full road widths with middle + end geometry.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Fire lane concerns?',
        answer: 'Do not block required fire lanes—confirm AHJ requirements before placement.',
      },
      {
        question: 'Snow plow compatibility?',
        answer: 'Temporary bumps may conflict with plowing—remove before winter ops unless designed for snow routes.',
      },
    ],
    tags: ['speed bump', 'portable', 'rubber', 'lot'],
    inStock: true,
    stockCount: 95,
    popular: false,
    sku: 'SPD-BMP-6PT',
    supplierSku: 'BUMP-6-PORT',
    supplierUrl: '',
    supplier: TSP,
    weight: '~50–70 lb (typical)',
    dimensions: '6 ft length',
    metaTitle: titleBrand('Rent Portable Rubber Speed Bumps | 6 ft'),
    metaDescription: 'Rent 6 ft portable rubber speed bumps for temporary lot and lane calming. Reflectors and handles for crew handling.',
  },

  // --- Safety Vests & Hi-Vis ---
  {
    id: 'prod-25',
    categoryId: 'cat-11',
    categorySlug: 'safety-vests-hi-vis',
    name: 'ANSI Class 2 Mesh Safety Vest — Orange, Contrasting Trim',
    slug: 'ansi-class-2-mesh-vest-orange',
    description: 'ANSI/ISEA 107 Class 2 mesh vest with contrasting trim for roadway work',
    longDescription:
      'Exact product line: ANSI/ISEA 107 Class 2 mesh safety vest, fluorescent orange with contrasting silver reflective trim. Breathable mesh for warm climates. Sized for roadway workers in 25 mph+ applications where Class 2 minimum applies—confirm your state hi-vis rules.',
    volumePriceTiers: singleTierFromRefDaily(2),
    unit: 'each',
    imageUrl: vestMeshImg,
    images: [vestMeshImg, cone36img, signFLGimg],
    specs: {
      Class: 'ANSI/ISEA 107 Class 2',
      Color: 'Fluorescent orange',
      Material: 'Polyester mesh',
      Reflective: 'Contrasting silver trim',
    },
    features: ['ANSI Class 2 visibility minimum (speed-dependent)', 'Breathable mesh body', 'Front hook/zip closure (model dependent)', 'Multiple pocket options on some SKUs', 'Launderable for multi-week crews'],
    compliance: ['ANSI/ISEA 107 Type R Class 2 (verify label)'],
    useCases: [
      {
        title: 'Lane Closure Flagging',
        description: 'Equip flaggers and TCPs with Class 2 or higher as required by speed and risk assessment.',
      },
      {
        title: 'Utility and Distribution Crews',
        description: 'Daytime shoulder and lot work with mixed equipment traffic.',
      },
      {
        title: 'Survey and Layout',
        description: 'Hi-vis for short stops along active shoulders.',
      },
    ],
    faqs: [
      {
        question: 'When do I need Class 3 instead of Class 2?',
        answer: 'Class 3 adds more background and reflective square inches for higher speeds and complex backgrounds. Use your TCP or ANSI risk assessment to pick Class 2 vs. 3.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; volume pricing for large crews.',
      },
      {
        question: 'Do you rent laundered sets?',
        answer: 'Yes—ask for laundered multi-week crew packs.',
      },
      {
        question: 'Sizing?',
        answer: 'Provide chest size ranges—we ship SM–5XL mixes to match rosters.',
      },
    ],
    tags: ['vest', 'ANSI Class 2', 'hi-vis', 'mesh', 'orange'],
    inStock: true,
    stockCount: 900,
    popular: true,
    sku: 'HVY-C2-ORG',
    supplierSku: 'VEST-C2-MESH-ORG',
    supplierUrl: '',
    supplier: TSP,
    weight: '~0.4 lb',
    dimensions: 'Sized garment',
    metaTitle: titleBrand('Rent ANSI Class 2 Safety Vests | Orange Mesh'),
    metaDescription: 'Rent ANSI/ISEA Class 2 orange mesh safety vests with reflective trim. Ideal for roadway and utility crews.',
  },
  {
    id: 'prod-26',
    categoryId: 'cat-11',
    categorySlug: 'safety-vests-hi-vis',
    name: 'ANSI Class 3 Surveyors Vest — Lime, Silver Stripes',
    slug: 'ansi-class-3-surveyors-vest-lime',
    description: 'Class 3 hi-vis surveyors vest with expanded reflective for high-speed or complex backgrounds',
    longDescription:
      'Exact product line: ANSI/ISEA 107 Class 3 surveyors vest, fluorescent lime with silver reflective stripes on torso and shoulders. Additional background material for complex visual environments. Common for highway work, night operations, and layouts requiring maximum conspicuity.',
    volumePriceTiers: singleTierFromRefDaily(2),
    unit: 'each',
    imageUrl: vestMeshImg,
    images: [vestMeshImg, vestMeshImg, signRWAimg],
    specs: {
      Class: 'ANSI/ISEA 107 Class 3',
      Color: 'Fluorescent lime',
      Style: 'Surveyors / engineer (multi-pocket layouts vary)',
      Reflective: 'Silver striping',
    },
    features: ['Class 3 background and reflective coverage', 'High-contrast lime shell', 'Pockets for field notes and radios (SKU dependent)', 'Compatible with fall-harness openings on select models', 'Durable polyester shell'],
    compliance: ['ANSI/ISEA 107 Type R Class 3 (verify label)'],
    useCases: [
      {
        title: 'High-Speed Highway Work',
        description: 'Class 3 vests improve recognition when drivers scan complex work zones.',
      },
      {
        title: 'Night Striping and Layout',
        description: 'Extra reflective for low-angle headlight glare.',
      },
      {
        title: 'Survey Crews Near Live Traffic',
        description: 'Maximum hi-vis for short-duration measurements on shoulders.',
      },
    ],
    faqs: [
      {
        question: 'Does Class 3 replace a harness?',
        answer: 'No—fall protection requires an ANSI Z359 harness system. Some vests include harness pass-throughs; verify compatibility.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Lime vs. orange?',
        answer: 'Both are common; lime often contrasts against orange work zone devices—pick per company standard.',
      },
      {
        question: 'Laundry?',
        answer: 'Industrial laundry extends garment life—ask for laundered rental packs.',
      },
    ],
    tags: ['Class 3', 'surveyors vest', 'lime', 'hi-vis'],
    inStock: true,
    stockCount: 420,
    popular: false,
    sku: 'HVY-C3-LIM',
    supplierSku: 'VEST-C3-SURV-LIM',
    supplierUrl: '',
    supplier: TSP,
    weight: '~0.7 lb',
    dimensions: 'Sized garment',
    metaTitle: titleBrand('Rent ANSI Class 3 Surveyors Vests | Lime Hi-Vis'),
    metaDescription: 'Rent ANSI Class 3 lime surveyors vests with expanded reflective for highway and night operations.',
  },

  // --- PPE ---
  {
    id: 'prod-27',
    categoryId: 'cat-12',
    categorySlug: 'ppe-helmets-gloves-shoes',
    name: 'Kask Zenith X2 Safety Helmet — White, Vented',
    slug: 'kask-zenith-x2-helmet-white',
    description: 'ANSI Z89.1 Type I safety helmet with wheel ratchet suspension and vented shell',
    longDescription:
      'Exact product line: Kask Zenith X2 safety helmet, vented ABS shell, wheel ratchet harness, chin strap included. ANSI Z89.1 Type I for top-of-head protection. Popular upgrade from hard hats for crews wanting improved retention, accessory mounts, and comfort padding.',
    volumePriceTiers: singleTierFromRefDaily(3.5),
    unit: 'each',
    imageUrl: kaskZenithImg,
    images: [kaskZenithImg, vestMeshImg, cone28img],
    specs: {
      Standard: 'ANSI Z89.1 Type I (verify label)',
      Shell: 'ABS — vented',
      Suspension: 'Wheel ratchet',
      Color: 'White',
    },
    features: ['Accessory-ready mounts (SKU dependent)', 'Improved side and rear coverage vs. cap-style hats', 'Moisture-wicking harness padding', 'Chin strap for retention', 'Premium brand support and parts'],
    compliance: ['ANSI Z89.1'],
    useCases: [
      {
        title: 'Utility Climb and Bucket Work',
        description: 'Better retention and accessory integration for aerial devices.',
      },
      {
        title: 'General Construction Supervisors',
        description: 'Comfort for all-day site walks and inspections.',
      },
      {
        title: 'DOT-Style Inspection Teams',
        description: 'Professional appearance and standardized PPE photos for submittals.',
      },
    ],
    faqs: [
      {
        question: 'Is a helmet the same as a hard hat?',
        answer: 'Helmets often add lateral coverage and accessory integration beyond traditional cap-style hard hats. Both must meet ANSI Z89.1 when used as head protection PPE.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; disinfect between users per your safety plan.',
      },
      {
        question: 'Do you rent visors and earmuffs?',
        answer: 'Yes—request faceshield and hearing protection bundles in your quote.',
      },
      {
        question: 'Sizing?',
        answer: 'Wheel ratchet fits a wide head range—confirm if you need XL pads.',
      },
    ],
    tags: ['Kask', 'helmet', 'ANSI Z89.1', 'white', 'vented'],
    inStock: true,
    stockCount: 85,
    popular: true,
    sku: 'PPE-HEL-KZX2',
    supplierSku: 'KASK-ZENITH-X2-WHT',
    supplierUrl: '',
    supplier: 'Kask',
    weight: '~1.3 lb',
    dimensions: 'Universal shell sizes',
    metaTitle: titleBrand('Rent Kask Zenith X2 Safety Helmets | ANSI Z89.1'),
    metaDescription: 'Rent Kask Zenith X2 vented safety helmets (white). ANSI Z89.1 Type I head protection with wheel ratchet fit.',
  },
  {
    id: 'prod-28',
    categoryId: 'cat-12',
    categorySlug: 'ppe-helmets-gloves-shoes',
    name: 'High-Dexterity Work Gloves — Nitrile Palm, Cut Level A4',
    slug: 'work-gloves-nitrile-cut-a4',
    description: '13-gauge HPPE shell with sandy nitrile palm for grip and ANSI A4 cut resistance',
    longDescription:
      'Exact product line: 13-gauge HPPE knit shell with sandy nitrile palm coating, ANSI/ISEA 105 cut level A4 (label verified per SKU). Touchscreen-compatible fingertips on select models. For material handling, sign hardware, and general construction where cut and abrasion risks exist.',
    volumePriceTiers: singleTierFromRefDaily(1.4),
    unit: 'pair',
    imageUrl: kaskZenithImg,
    images: [kaskZenithImg, vestMeshImg, signStandImg],
    specs: {
      Liner: '13-gauge HPPE',
      Coating: 'Sandy nitrile palm',
      'Cut Level': 'ANSI A4 (verify glove label)',
      Closure: 'Knit cuff',
    },
    features: ['High dexterity for hardware and tools', 'Oil-resistant nitrile palm', 'Breathable knit back', 'Touchscreen variants available', 'Launderable limited cycles'],
    compliance: ['ANSI/ISEA 105 cut resistance (label)'],
    useCases: [
      {
        title: 'Sign and Stand Hardware',
        description: 'Protect hands from sharp edges on brackets and sheeting.',
      },
      {
        title: 'Material Handling',
        description: 'Grip banding and stakes with cut protection vs. bare hands.',
      },
      {
        title: 'Striping and Paint Crews',
        description: 'Chemical and abrasion resistance for solvent handling (verify chemical compatibility).',
      },
    ],
    faqs: [
      {
        question: 'What does A4 mean?',
        answer: 'ANSI/ISEA 105 assigns A1–A9 cut scores. A4 is mid-high protection—match to your JHA.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; box quantities for large crews.',
      },
      {
        question: 'Latex allergies?',
        answer: 'Nitrile coatings are latex-free—confirm if you need powder-free liners.',
      },
      {
        question: 'Disposable vs. reusable?',
        answer: 'These are reusable coated gloves with finite life—replace when coating wears through.',
      },
    ],
    tags: ['gloves', 'cut resistant', 'nitrile', 'ANSI 105'],
    inStock: true,
    stockCount: 600,
    popular: false,
    sku: 'PPE-GLV-A4',
    supplierSku: 'GLV-HPPE-A4-NIT',
    supplierUrl: '',
    supplier: TSP,
    weight: '~0.15 lb / pair',
    dimensions: 'SM–2XL mixes',
    metaTitle: titleBrand('Rent Cut-Resistant Work Gloves | ANSI A4 Nitrile'),
    metaDescription: 'Rent ANSI A4 cut-level work gloves with sandy nitrile palms for grip and durability on job sites.',
  },
  {
    id: 'prod-29',
    categoryId: 'cat-12',
    categorySlug: 'ppe-helmets-gloves-shoes',
    name: 'Clear Anti-Fog Safety Glasses — UV400, Scratch-Resistant',
    slug: 'safety-glasses-clear-antifog',
    description: 'Polycarbonate wraparound safety glasses with anti-fog and UV400 protection',
    longDescription:
      'Exact product line: polycarbonate wraparound safety glasses, clear lens, anti-fog coating (model dependent), UV400 protection, scratch-resistant hardcoat. For dust, wind, and incidental impact hazards during daytime flagging and utility work.',
    volumePriceTiers: singleTierFromRefDaily(1.25),
    unit: 'each',
    imageUrl: vestMeshImg,
    images: [vestMeshImg, kaskZenithImg, signStandImg],
    specs: {
      Lens: 'Clear polycarbonate',
      Coatings: 'Anti-fog + hardcoat (SKU dependent)',
      UV: 'UV400',
      Standard: 'ANSI Z87.1+ (verify label)',
    },
    features: ['Wide field of view', 'Lightweight for all-day wear', 'Compatible with many helmets', 'UV protection for outdoor crews', 'Bulk rental packs'],
    compliance: ['ANSI Z87.1+ (verify label)'],
    useCases: [
      {
        title: 'Dusty Mowing and Shoulder Work',
        description: 'Eye protection from debris thrown by adjacent mowing operations.',
      },
      {
        title: 'Flagging in Blowing Rain',
        description: 'Anti-fog coatings help when humidity and temperature swing.',
      },
      {
        title: 'Warehouse and Yard Walks',
        description: 'General-purpose impact protection for supervisors.',
      },
    ],
    faqs: [
      {
        question: 'Do these work over prescription glasses?',
        answer: 'Some crews need OTG (over-the-glass) models—request OTG in your quote if needed.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Anti-fog lifetime?',
        answer: 'Coatings wear with cleaning—replace when fogging returns.',
      },
      {
        question: 'Tinted lenses?',
        answer: 'Yes—ask for gray or mirror outdoor lenses.',
      },
    ],
    tags: ['safety glasses', 'Z87', 'anti-fog', 'polycarbonate'],
    inStock: true,
    stockCount: 750,
    popular: false,
    sku: 'PPE-EYE-AF',
    supplierSku: 'GLS-Z87-AF-CLR',
    supplierUrl: '',
    supplier: TSP,
    weight: '~1 oz',
    dimensions: 'One size fits most',
    metaTitle: titleBrand('Rent ANSI Z87 Safety Glasses | Clear Anti-Fog'),
    metaDescription: 'Rent clear anti-fog polycarbonate safety glasses with UV400. ANSI Z87.1+ eye protection for crews.',
  },

  // --- Striping, Paint & Pavement Marking ---
  {
    id: 'prod-30',
    categoryId: 'cat-13',
    categorySlug: 'striping-pavement-paint',
    name: 'Aervoe Water-Based Construction Marking Paint — Case of 12',
    slug: 'aervoe-construction-marking-paint-case-12',
    description: 'Case of 12 aerosol marking paint cans for layout, utility locate, and temp marks',
    longDescription:
      'Exact product line: Aervoe-style water-based construction marking paint, case of 12 aerosol cans. Bright colors for survey layout, utility locates, and short-duration pavement marks that wear with traffic. VOC and color availability vary by SKU—specify color in quote.',
    volumePriceTiers: singleTierFromRefDaily(2.5),
    unit: 'case',
    imageUrl: aervoePaintImg,
    images: [aervoePaintImg, cone28img, speedHumpImg],
    specs: {
      Pack: '12 aerosol cans / case',
      Chemistry: 'Water-based construction marking (SKU dependent)',
      Colors: 'White / yellow / blue / red / orange (request)',
      Application: 'Upside-down spray tips on many SKUs',
    },
    features: ['Case pricing for crew efficiency', 'Bright temporary marks', 'Upside-down capable tips (model dependent)', 'Common for locate and layout', 'Store cool and dry'],
    compliance: ['MSDS / SDS provided with your order'],
    useCases: [
      {
        title: 'Utility Locate Marking',
        description: 'Paint proposed trench lines and vault corners before hydrovac or open cut.',
      },
      {
        title: 'Layout for Temporary Striping',
        description: 'Snap lines and hash previews before thermoplastic or tape crews arrive.',
      },
      {
        title: 'Parking Lot Reconfiguration Sketches',
        description: 'Low-cost color trials before permanent striping.',
      },
    ],
    faqs: [
      {
        question: 'Is this the same as traffic enamel?',
        answer: 'Construction marking paints are often formulated for temporary marks; long-life traffic enamels differ. Tell us expected wear life and we match chemistry.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum per case.',
      },
      {
        question: 'Returns on partial cases?',
        answer: 'We bill per opened case; unopened cans may credit depending on contract.',
      },
      {
        question: 'Cold weather?',
        answer: 'Aerosol performance drops near freezing—plan storage above 50°F before use.',
      },
    ],
    tags: ['marking paint', 'aerosol', 'layout', 'locate'],
    inStock: true,
    stockCount: 180,
    popular: false,
    sku: 'STR-PNT-12',
    supplierSku: 'AERVOE-MARK-12',
    supplierUrl: '',
    supplier: 'Aervoe',
    weight: '~18 lb / case (approx.)',
    dimensions: '12 cans',
    metaTitle: titleBrand('Rent Construction Marking Paint | Case of 12'),
    metaDescription: 'Rent Aervoe-style water-based construction marking paint by the case. Ideal for layout and utility locates.',
  },
  {
    id: 'prod-31',
    categoryId: 'cat-13',
    categorySlug: 'striping-pavement-paint',
    name: 'Temporary Pavement Marking Tape — White, High-Adhesion',
    slug: 'temporary-pavement-marking-tape-white',
    description: 'Roll of temporary white pavement marking tape for short-duration lane lines and symbols',
    longDescription:
      'Exact product line: temporary pavement marking tape roll, white, high-adhesion rubberized backing for asphalt and concrete (primer may be required). Used for short work zones, pilot lines, and experimental lane shifts before permanent thermoplastic.',
    volumePriceTiers: singleTierFromRefDaily(2),
    unit: 'roll',
    imageUrl: aervoePaintImg,
    images: [aervoePaintImg, speedHumpImg, parkingBlueImg],
    specs: {
      Color: 'White (other colors on request)',
      Width: '4 in typical (SKU dependent)',
      Length: 'Roll length per SKU',
      Adhesive: 'High-tack pressure sensitive',
    },
    features: ['Rapid line installation vs. paint cure', 'Reflective beads embedded on many SKUs', 'Clean removal window when properly primed', 'Compatible with temp symbol layouts', 'Night visibility with retroreflectivity'],
    compliance: ['MUTCD layouts require engineer approval'],
    useCases: [
      {
        title: 'Pilot Lane Shifts',
        description: 'Test driver behavior before milling permanent markings.',
      },
      {
        title: 'Short Utility Cuts',
        description: 'Restore line visibility overnight across trench patches.',
      },
      {
        title: 'Event Traffic Plans',
        description: 'Temporary channelization on closed courses.',
      },
    ],
    faqs: [
      {
        question: 'Do I need primer?',
        answer: 'Many high-performance tapes require primer on asphalt—specify substrate and expected duration.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum per roll.',
      },
      {
        question: 'Removal?',
        answer: 'Heat or grind removal may be needed if left too long—follow manufacturer limits.',
      },
      {
        question: 'Rain?',
        answer: 'Initial tack times vary—avoid wet installs.',
      },
    ],
    tags: ['pavement tape', 'temporary marking', 'white', 'reflective'],
    inStock: true,
    stockCount: 95,
    popular: false,
    sku: 'STR-TPE-W4',
    supplierSku: 'TAPE-TEMP-WHT-4',
    supplierUrl: '',
    supplier: TSP,
    weight: '~15–25 lb / roll (SKU dependent)',
    dimensions: '4 in × roll length',
    metaTitle: titleBrand('Rent Temporary Pavement Marking Tape | White'),
    metaDescription: 'Rent temporary white pavement marking tape for short-duration lines and pilot layouts.',
  },

  // --- Fencing, Cable Covers & Site Safety ---
  {
    id: 'prod-32',
    categoryId: 'cat-14',
    categorySlug: 'fencing-site-safety',
    name: 'Galvanized Crowd Control Fence Panel — 6 ft × 10 ft',
    slug: 'galvanized-crowd-control-fence-panel-6x10',
    description: 'Interlocking steel crowd control fence panel with bridge feet for events and sites',
    longDescription:
      'Exact product line: galvanized steel crowd control fence panel, ~6 ft × 10 ft mesh panel with tubular frame and interlocking hooks. Bridge feet distribute load on turf, asphalt, and concrete. Common for concerts, parades, construction laydown yards, and secured pedestrian corridors.',
    volumePriceTiers: singleTierFromRefDaily(4.5),
    unit: 'each',
    imageUrl: fenceBridgeImg,
    images: [fenceBridgeImg, urbanitePedImg, barWFimg],
    specs: {
      Panel: '~6 ft × 10 ft (SKU dependent)',
      Frame: 'Galvanized steel tube',
      Feet: 'Bridge feet (ballast as needed)',
      Mesh: 'Welded wire mesh',
    },
    features: ['Fast interlocking install', 'Galvanized corrosion resistance', 'Reusable rental inventory', 'Compatible with privacy screens (request)', 'Stable on varied surfaces with ballast'],
    compliance: ['Event and fire code reviews required'],
    useCases: [
      {
        title: 'Concert Pit and Stage Lines',
        description: 'Create performer and crew separation from public zones.',
      },
      {
        title: 'Construction Laydown Yards',
        description: 'Perimeter control for materials and equipment overnight.',
      },
      {
        title: 'Parade Routes',
        description: 'Channel spectators at intersections and VIP crossings.',
      },
    ],
    faqs: [
      {
        question: 'How many panels per 100 ft?',
        answer: 'Panel width drives counts—roughly ten 10 ft panels per 100 ft of run before corners.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Wind bracing?',
        answer: 'Add ballast or angled braces per engineer or venue requirements.',
      },
      {
        question: 'Gates?',
        answer: 'Yes—request swing gate panels for equipment access.',
      },
    ],
    tags: ['fence', 'crowd control', 'galvanized', 'event'],
    inStock: true,
    stockCount: 220,
    popular: false,
    sku: 'FNC-CCP-610',
    supplierSku: 'FENCE-CC-6X10',
    supplierUrl: '',
    supplier: TSP,
    weight: '~55–75 lb / panel (typical)',
    dimensions: '6 ft × 10 ft panel',
    metaTitle: titleBrand('Rent Crowd Control Fence Panels | Galvanized 6×10'),
    metaDescription: 'Rent galvanized steel crowd control fence panels with bridge feet for events and secured sites.',
  },
  {
    id: 'prod-33',
    categoryId: 'cat-14',
    categorySlug: 'fencing-site-safety',
    name: 'Drop-Over Cable Protector — 2-Channel, Black/Yellow',
    slug: 'drop-over-cable-protector-2-channel',
    description: 'Two-channel drop-over cable guard for hoses and cords up to ~2 in OD in work zones',
    longDescription:
      'Exact product line: economy two-channel drop-over cable protector, black lid with yellow lid hinges / sides (brand varies). Protects extension cords, ethernet, and small hoses from cart and vehicle crush in lots and indoor venues. Modular end caps available for tapered entries.',
    volumePriceTiers: singleTierFromRefDaily(2.8),
    unit: 'each',
    imageUrl: fenceBridgeImg,
    images: [fenceBridgeImg, parkingBlueImg, speedHumpImg],
    specs: {
      Channels: '2',
      'Typical OD': '~1.0–2.0 in per channel (SKU dependent)',
      Material: 'Polyurethane / rubber composite',
      Style: 'Drop-over modular',
    },
    features: ['Fast deploy for live events', 'High-visibility yellow/black pattern', 'Modular connection (SKU dependent)', 'Indoor/outdoor use', 'Reduces trip hazards vs. loose cords'],
    compliance: ['NFPA and venue rules may require covers in public aisles'],
    useCases: [
      {
        title: 'Film and Broadcast Sets',
        description: 'Protect camera tether and power across pedestrian aisles.',
      },
      {
        title: 'Warehouse Retrofits',
        description: 'Cover temporary power drops during rack moves.',
      },
      {
        title: 'Outdoor Festivals',
        description: 'Guard feeder cords in vendor rows.',
      },
    ],
    faqs: [
      {
        question: 'What OD fits?',
        answer: 'Measure your bundle diameter—channels vary by SKU. Oversized bundles need 3- or 5-channel models.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'ADA aisles?',
        answer: 'Covers change rolling resistance—confirm slope and width with your accessibility reviewer.',
      },
      {
        question: 'End caps?',
        answer: 'Request end caps for smooth vehicle transitions.',
      },
    ],
    tags: ['cable protector', 'hose bridge', 'drop over', 'two channel'],
    inStock: true,
    stockCount: 160,
    popular: false,
    sku: 'FNC-CBL-2CH',
    supplierSku: 'CABLE-GUARD-2',
    supplierUrl: '',
    supplier: TSP,
    weight: '~18–28 lb / section (typical)',
    dimensions: 'Modular length per SKU',
    metaTitle: titleBrand('Rent 2-Channel Cable Protectors | Drop-Over'),
    metaDescription: 'Rent two-channel drop-over cable protectors for cords and hoses in lots, venues, and work zones.',
  },

  // --- Fall Protection ---
  {
    id: 'prod-34',
    categoryId: 'cat-15',
    categorySlug: 'fall-protection',
    name: 'Radians Hi-Vis Full-Body Harness — Breakaway Chest, D-Ring Back',
    slug: 'radians-hivis-full-body-harness-back-d-ring',
    description: 'ANSI Z359.11-style full-body harness with hi-vis webbing and pass-through buckles',
    longDescription:
      'Exact product line: Radians-style hi-vis full-body harness with dorsal D-ring, pass-through leg and chest buckles, and breakaway / friction chest styles (SKU dependent). For fall arrest systems when paired with an approved anchor, lanyard, and competent person inspection per OSHA 1926 Subpart M.',
    volumePriceTiers: singleTierFromRefDaily(5.5),
    unit: 'each',
    imageUrl: harnessImg,
    images: [harnessImg, vestMeshImg, kaskZenithImg],
    specs: {
      Standard: 'ANSI Z359.11 (verify label)',
      Webbing: 'Hi-vis polyester',
      'D-Ring': 'Dorsal back',
      Buckles: 'Pass-through (SKU dependent)',
    },
    features: ['Hi-vis web for supervisor visibility', 'Adjustable shoulder and leg straps', 'Dorsal D-ring for fall arrest', 'Compatible with many lanyards', 'Inspection log card included'],
    compliance: ['OSHA 1926 Subpart M when used as system', 'ANSI Z359.11 (verify label)'],
    useCases: [
      {
        title: 'Aerial Lift Work',
        description: '100% tie-off with appropriate lanyards and shorter connection lengths.',
      },
      {
        title: 'Bridge Inspection Platforms',
        description: 'Harness baseline for crews near unprotected edges.',
      },
      {
        title: 'Rigging and Steel Erection Support',
        description: 'Baseline PPE when combined with qualified rigging plans.',
      },
    ],
    faqs: [
      {
        question: 'Is a harness alone enough?',
        answer: 'No. You need an approved anchor capable of 5,000 lb per worker (typical rule of thumb), a shock-absorbing lanyard or SRL, clearance calculations, and rescue planning.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum; inspection required before each use.',
      },
      {
        question: 'Sizing?',
        answer: 'Universal fits many workers—XL harnesses available on request.',
      },
      {
        question: 'Can I rent without training?',
        answer: 'Employers must provide competent person oversight—rental does not replace training.',
      },
    ],
    tags: ['harness', 'fall protection', 'ANSI Z359', 'hi-vis'],
    inStock: true,
    stockCount: 110,
    popular: false,
    sku: 'FAL-HAR-RAD',
    supplierSku: 'HAR-RAD-HV-D',
    supplierUrl: '',
    supplier: 'Radians',
    weight: '~3 lb',
    dimensions: 'Universal adjustable',
    metaTitle: titleBrand('Rent Hi-Vis Full-Body Harnesses | ANSI Z359'),
    metaDescription: 'Rent Radians-style hi-vis ANSI Z359.11 full-body harnesses with dorsal D-ring. Pair with approved anchors and lanyards.',
  },
  {
    id: 'prod-35',
    categoryId: 'cat-15',
    categorySlug: 'fall-protection',
    name: 'Shock-Absorbing Lanyard — 6 ft, Single Leg, Snap Hooks',
    slug: 'shock-absorbing-lanyard-6ft-single-leg',
    description: '6 ft single-leg shock-absorbing lanyard with steel snap hooks for fall arrest systems',
    longDescription:
      'Exact product line: 6 ft single-leg shock-absorbing lanyard with rebar hooks or steel snap hooks (SKU dependent). Integrates with full-body harness and approved anchor points. Inspect before each use; retire after deployment or per manufacturer limits.',
    volumePriceTiers: singleTierFromRefDaily(3),
    unit: 'each',
    imageUrl: harnessImg,
    images: [harnessImg, harnessImg, kaskZenithImg],
    specs: {
      Length: '6 ft including shock pack',
      Legs: 'Single-leg',
      Hooks: 'Steel snaps / rebar hooks (SKU dependent)',
      Standard: 'ANSI Z359.12 / Z359.13 elements (verify label)',
    },
    features: ['Shock pack limits arrest forces', 'Single-leg simplicity', 'Compatible with dorsal D-rings', 'Visual stitch indicators on many models', 'Serialized inspection tracking'],
    compliance: ['ANSI Z359 series (verify label)', 'OSHA 1926 Subpart M when used as system'],
    useCases: [
      {
        title: 'Steel Erection Connectors',
        description: '6 ft lanyards common when working at fixed anchor spacing—verify free fall and clearance.',
      },
      {
        title: 'Precast Panel Setting',
        description: 'Short connections while near leading edges.',
      },
      {
        title: 'Maintenance on Open Grating',
        description: 'Pair with harness for elevated walkways.',
      },
    ],
    faqs: [
      {
        question: 'What is clearance to obstruction?',
        answer: 'Calculate total fall distance including sag, deceleration, harness stretch, and safety margin—competent person required.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Twin-leg needed?',
        answer: '100% tie-off while moving anchors often needs a twin-leg Y lanyard or SRL—request upgrade.',
      },
      {
        question: 'After a fall?',
        answer: 'Remove from service and replace per manufacturer—never reuse after arrest event.',
      },
    ],
    tags: ['lanyard', 'shock absorber', 'fall arrest', 'Z359'],
    inStock: true,
    stockCount: 140,
    popular: false,
    sku: 'FAL-LAN-6SL',
    supplierSku: 'LAN-6-SA-SNAP',
    supplierUrl: '',
    supplier: TSP,
    weight: '~2.5 lb',
    dimensions: '6 ft single leg',
    metaTitle: titleBrand('Rent Shock-Absorbing Lanyards | 6 ft Single Leg'),
    metaDescription: 'Rent 6 ft single-leg shock-absorbing lanyards with steel snap hooks. Use only as part of a complete fall protection system.',
  },

  // --- Bollards, Chocks & Corner Guards ---
  {
    id: 'prod-36',
    categoryId: 'cat-16',
    categorySlug: 'bollards-chocks-corners',
    name: 'Tall Polyethylene Bollard Cover — 5" × 52", Blue',
    slug: 'tall-bollard-cover-5in-blue-52in',
    description: 'Sleeve-style HDPE bollard cover for steel pipe bollards in lots and storefronts',
    longDescription:
      'Exact product line: tall polyethylene bollard cover, ~5 in inner diameter × 52 in height, blue HDPE shell. Slips over installed steel pipe bollards to improve visibility and reduce maintenance painting. UV-stabilized resin for outdoor lots.',
    volumePriceTiers: singleTierFromRefDaily(3),
    unit: 'each',
    imageUrl: bollardCoverImg,
    images: [bollardCoverImg, parkingBlueImg, cone28img],
    specs: {
      'Inner Diameter': '~5 in (verify post size)',
      Height: '52 in',
      Material: 'HDPE',
      Color: 'Blue',
    },
    features: ['UV-stabilized colorfast resin', 'Tool-free slip fit over posts', 'Bright color for lot visibility', 'Reduces scrape rust bleed', 'Multiple colors on request'],
    compliance: [],
    useCases: [
      {
        title: 'Retail Storefront Curb Lines',
        description: 'Refresh appearance without sandblasting steel posts.',
      },
      {
        title: 'EV Charger Islands',
        description: 'High-visibility sleeves around charging pedestal bollards.',
      },
      {
        title: 'Warehouse Door Protection',
        description: 'Visual cues for dock door corners.',
      },
    ],
    faqs: [
      {
        question: 'How do I size to my post?',
        answer: 'Measure outside diameter and squareness—covers are slightly oversized for slip fit. Ask for sizing chart.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Reflective tape?',
        answer: 'Yes—request reflective collar kits.',
      },
      {
        question: 'Do covers provide crash rating?',
        answer: 'No—covers are cosmetic and visibility aids, not vehicle barriers.',
      },
    ],
    tags: ['bollard cover', 'HDPE', 'blue', 'parking lot'],
    inStock: true,
    stockCount: 190,
    popular: false,
    sku: 'BOL-CVR-5BL',
    supplierSku: 'BOLL-CVR-5-BLU',
    supplierUrl: '',
    supplier: TSP,
    weight: '~3 lb',
    dimensions: '5" ID × 52" H',
    metaTitle: titleBrand('Rent Bollard Covers | 5" Blue HDPE Sleeves'),
    metaDescription: 'Rent tall blue polyethylene bollard covers for 5 in posts. UV-stable sleeves for lots and storefronts.',
  },
  {
    id: 'prod-37',
    categoryId: 'cat-16',
    categorySlug: 'bollards-chocks-corners',
    name: 'Urethane Wheel Chock — Truck / Trailer Size',
    slug: 'urethane-wheel-chock-truck-trailer',
    description: 'Heavy urethane wheel chock with grip base for service trucks and trailers on grade',
    longDescription:
      'Exact product line: heavy urethane wheel chock, truck/trailer class, aggressive grip base for asphalt and concrete. For DOT-style chocking of unattended trailers on shallow grades when paired with proper procedures and secondary brakes.',
    volumePriceTiers: singleTierFromRefDaily(1.5),
    unit: 'each',
    imageUrl: bollardCoverImg,
    images: [bollardCoverImg, parkingBlueImg, drumImg],
    specs: {
      Material: 'Urethane',
      Class: 'Truck / trailer (verify GVWR guidance)',
      Base: 'Serrated grip pattern',
      Color: 'Safety orange or black (SKU dependent)',
    },
    features: ['Oil and chemical resistant', 'Lightweight vs. steel chocks', 'High visibility options', 'Grip base for smooth surfaces', 'Chaining holes on many models'],
    compliance: ['FMCSA / DOT chocking rules apply to CMVs'],
    useCases: [
      {
        title: 'Box trucks at loading docks',
        description: 'Chock both sides on grade during hand unload.',
      },
      {
        title: 'Construction Equipment Trailers',
        description: 'Stabilize ramps while detached from tow vehicle.',
      },
      {
        title: 'Rail and Yard Intermodal Lots',
        description: 'Supplemental chocking per site rules.',
      },
    ],
    faqs: [
      {
        question: 'One chock or two?',
        answer: 'Best practice is chocking both sides of a tire set on grade—ask your safety officer.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Ice and snow?',
        answer: 'Grip decreases on ice—clean surface or use grit.',
      },
      {
        question: 'GVWR limits?',
        answer: 'Match chock size to tire diameter and gross weight—provide tire section height in quote.',
      },
    ],
    tags: ['wheel chock', 'urethane', 'truck', 'trailer'],
    inStock: true,
    stockCount: 260,
    popular: false,
    sku: 'BOL-CHK-TK',
    supplierSku: 'CHOCK-URE-TK',
    supplierUrl: '',
    supplier: TSP,
    weight: '~8–12 lb (typical)',
    dimensions: 'Truck class chock',
    metaTitle: titleBrand('Rent Truck Wheel Chocks | Urethane'),
    metaDescription: 'Rent heavy urethane truck and trailer wheel chocks with aggressive grip bases for lot and yard use.',
  },

  // --- Flares, Markers, Wands & Flags (additional) ---
  {
    id: 'prod-38',
    categoryId: 'cat-17',
    categorySlug: 'flares-markers-wands-flags',
    name: 'Flexible Surface-Mounted Delineator Post — 42", White HI',
    slug: 'flexible-delineator-post-42-white-hi',
    description: 'Spring-return delineator post with high-intensity sheeting for bike lanes and gore markings',
    longDescription:
      'Exact product line: flexible surface-mounted delineator post, ~42 in height, white post with high-intensity reflective bands. Spring-return base reduces damage from occasional tire strikes while keeping lane edge cues visible for bikes and low-speed traffic.',
    volumePriceTiers: singleTierFromRefDaily(2.2),
    unit: 'each',
    imageUrl: drumImg,
    images: [drumImg, cone36img, flareImg],
    specs: {
      Height: '~42 in above grade',
      Sheeting: 'High-intensity reflective bands',
      Base: 'Surface mount spring-return (SKU dependent)',
      Color: 'White post (typical)',
    },
    features: ['Flexible post reduces knockdown damage', 'HI reflective for night bike lanes', 'Surface anchor kits available', 'Repeatable rental inventory', 'Pairs with pavement epoxy anchors'],
    compliance: ['MUTCD bike facility markings (verify design)'],
    useCases: [
      {
        title: 'Buffered Bike Lanes',
        description: 'Edge delineation between parking and bike travel paths.',
      },
      {
        title: 'Gore Area Rebuilds',
        description: 'Temporary edge definition during pavement replacement.',
      },
      {
        title: 'Parking Lot Ped Channels',
        description: 'Low-speed separation between ped and vehicle aisles.',
      },
    ],
    faqs: [
      {
        question: 'Anchor type?',
        answer: 'Asphalt epoxy vs. mechanical anchors depend on substrate—specify in quote.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Snow plow hits?',
        answer: 'Spring-return helps but is not immune—inspect after storms.',
      },
      {
        question: 'Spacing?',
        answer: 'Follow MUTCD or local bike design guide spacing for your speed class.',
      },
    ],
    tags: ['delineator', 'flexible post', 'bike lane', 'HI reflective'],
    inStock: true,
    stockCount: 170,
    popular: false,
    sku: 'FLR-DEL-FLX',
    supplierSku: 'DEL-POST-42-HI',
    supplierUrl: '',
    supplier: TSP,
    weight: '~4–6 lb',
    dimensions: '42 in post typical',
    metaTitle: titleBrand('Rent Flexible Delineator Posts | 42" White HI'),
    metaDescription: 'Rent 42 in flexible surface-mounted delineator posts with high-intensity reflective sheeting.',
  },
  {
    id: 'prod-39',
    categoryId: 'cat-17',
    categorySlug: 'flares-markers-wands-flags',
    name: 'LED Traffic Wand — 21", Amber Flashlight Mode',
    slug: 'led-traffic-wand-21-amber',
    description: '21-inch amber LED traffic wand with steady, flash, and flashlight modes for flagging',
    longDescription:
      'Exact product line: 21 in amber LED traffic wand with wrist lanyard, steady / flash modes, and flashlight tip (SKU dependent). For night flagging, tapers, and parking direction where illuminated paddles improve motorist recognition beyond handheld flashlights alone.',
    volumePriceTiers: singleTierFromRefDaily(1.8),
    unit: 'each',
    imageUrl: flasherImg,
    images: [flasherImg, flareImg, vestMeshImg],
    specs: {
      Length: '21 in',
      LED: 'Amber',
      Modes: 'Steady / flash / flashlight (SKU dependent)',
      Power: 'AA or rechargeable (SKU dependent)',
    },
    features: ['High visibility amber LEDs', 'Wrist lanyard reduces drops', 'Multiple flash patterns on some models', 'Lightweight for long shifts', 'Bulk rental for large flagging teams'],
    compliance: ['MUTCD flagger illumination supplements (verify TCP)'],
    useCases: [
      {
        title: 'Night Lane Closures',
        description: 'Supplement STOP/SLOW paddles with active illumination.',
      },
      {
        title: 'Parking and Venue Traffic',
        description: 'Direct ingress in low light without flare open flame.',
      },
      {
        title: 'Emergency Detours',
        description: 'Rapid deployment for law enforcement assist roles when approved.',
      },
    ],
    faqs: [
      {
        question: 'Batteries included?',
        answer: 'We ship ready-to-use with fresh cells or charged packs—specify rechargeable preference.',
      },
      {
        question: 'Minimum rental?',
        answer: '1 day minimum.',
      },
      {
        question: 'Does this replace a paddle?',
        answer: 'No—wands supplement proper STOP/SLOW procedures per MUTCD and agency training.',
      },
      {
        question: 'Colors?',
        answer: 'Amber is standard for traffic; red/green available for specialized roles on request.',
      },
    ],
    tags: ['traffic wand', 'LED', 'flagging', 'amber'],
    inStock: true,
    stockCount: 320,
    popular: true,
    sku: 'FLR-WND-21AM',
    supplierSku: 'WAND-LED-21-AM',
    supplierUrl: '',
    supplier: TSP,
    weight: '~0.4 lb',
    dimensions: '21 in length',
    metaTitle: titleBrand('Rent LED Traffic Wands | 21" Amber'),
    metaDescription: 'Rent 21 in amber LED traffic wands with flash and flashlight modes for night flagging and parking control.',
  },
]

const curatedSupplierUrls = new Set(curatedProducts.map((p) => p.supplierUrl).filter(Boolean))
const curatedSlugs = new Set(curatedProducts.map((p) => p.slug))
let extendedProducts: Product[] = []

/** Merged list + id index — rebuilt when `registerExtendedCatalog` runs. */
let mergedProducts: Product[] | null = null
let productById: Map<string, Product> | null = null

function rebuildExtendedIndexes() {
  mergedProducts = [...curatedProducts, ...extendedProducts]
  const m = new Map<string, Product>()
  for (const p of mergedProducts) m.set(p.id, p)
  productById = m
}

function migrateLegacyCatalogRow(row: unknown): Product | null {
  if (!row || typeof row !== 'object') return null
  const p = row as Record<string, unknown> & { volumePriceTiers?: VolumePriceTier[]; dailyRate?: number }
  if (Array.isArray(p.volumePriceTiers) && p.volumePriceTiers.length) return p as unknown as Product
  if (typeof p.dailyRate === 'number') {
    const ref = roundMoney(p.dailyRate / RETAIL_REFERENCE_DIVISOR)
    const { dailyRate: _d, weeklyRate: _w, monthlyRate: _m, minimumRentalDays: _min, ...rest } = p as Record<
      string,
      unknown
    >
    return { ...rest, volumePriceTiers: [{ minQty: 1, maxQty: null, supplierReferenceUnitPrice: ref }] } as Product
  }
  return null
}

/** Merge extended catalog from `public/tss-catalog.json` (generated; see `scripts/generate-tss-catalog.mjs`). */
export function registerExtendedCatalog(raw: unknown[]) {
  extendedProducts = raw
    .map(migrateLegacyCatalogRow)
    .filter((p): p is Product => p != null)
    .filter((p) => !curatedSupplierUrls.has(p.supplierUrl) && !curatedSlugs.has(p.slug))
  mergedProducts = null
  productById = null
  if (extendedProducts.length) rebuildExtendedIndexes()
}

export function getProducts(): Product[] {
  if (extendedProducts.length === 0) return curatedProducts
  if (!mergedProducts) rebuildExtendedIndexes()
  return mergedProducts!
}

export const getProductsByCategory = (categorySlug: string): Product[] =>
  getProducts().filter((p) => p.categorySlug === categorySlug)

export const getProductBySlug = (slug: string): Product | undefined =>
  getProducts().find((p) => p.slug === slug)

export const getProductById = (id: string): Product | undefined => {
  if (extendedProducts.length === 0) return curatedProducts.find((p) => p.id === id)
  if (!productById) rebuildExtendedIndexes()
  return productById!.get(id)
}

export const getFeaturedProducts = (): Product[] =>
  curatedProducts.filter((p) => p.popular)

/** Text search within a product list (used after category / price filters so results are not wiped by empty intersections). */
export function filterProductsBySearchQuery(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...products]
  const variants = [q]
  if (q.endsWith('s') && q.length > 2) variants.push(q.slice(0, -1))
  const matchesField = (field: string) =>
    variants.some((v) => field.toLowerCase().includes(v))
  return products.filter(
    (p) =>
      matchesField(p.name) ||
      matchesField(p.description) ||
      matchesField(p.sku) ||
      matchesField(p.supplierSku) ||
      p.tags.some((t) => variants.some((v) => t.toLowerCase().includes(v))),
  )
}

export const searchProducts = (query: string): Product[] => filterProductsBySearchQuery(getProducts(), query)
