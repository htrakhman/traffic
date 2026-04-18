import type { Product } from '../types'

// Real product images sourced directly from supplier CDNs
const cone28img = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/orange-28in-7-0-lb-traffic-cone-jbc-safety-cone-construction-cone.webp'
const cone36img = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/traffic-cones-jbc-36in-black-base-10-lbs-orange-two-collars-safety-cone-construction-cone.webp'
const drumImg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/traffic-drum-with-6in-collars-and-tire-ring-base-high-intensity-hi-drum6hitire-construction-barrel.webp'
const signRWAimg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp'
const signFLGimg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-flagger-ahead-text-hip-roll-up-sign-mutcd.webp'
const signOLRimg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-non-roll-up-sign-one-lane-road-ahead-hip-roll-up-sign-mutcd.webp'
const signStandImg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/cortina-rigid-or-roll-up-tri-pod-sign-stand-hip-roll-up-sign-mutcd.webp'
const barT3img = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/break-away-system-type-3-barricade-with-8-ft-plastic-rails-no-customization-engineer-grade-eg-single.webp'
const barT2img = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/h-by-24in-w-folding-plastic-type-ii-barricade-high-intensity-sheeting-faa-water-filled-barricade.webp'
const barWFimg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-barrier-orange-without-optional-fence-water-filled-barricade.webp'
const arrowTrailerImg = 'https://www.wanco.com/wp-content/uploads/2020/03/featr-prod-arrowbd-trailer-folding-585x400.jpg'
const arrowTruckImg = 'https://www.wanco.com/wp-content/uploads/2017/02/featr-prod-arrowbd-truck.jpg'
const msgBoardImg = 'https://vermaccom-218d5.kxcdn.com/media/product/image/image/bpcms-1210_deploye_g3_face_1000x1000_left_lane_closed_v2.png.1000x1000_q85_crop-center_upscale.png'
const flasherImg = 'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/economy-solar-assist-type-b-flasher-red.webp'
const flareImg = 'https://www.superbrightleds.com/media/catalog/product/cache/ffce3dd14fea5b5f9369938b91f659bc/s/f/sf-x16r-store.jpg'

const TSS = 'Traffic Safety Store'
const TRANS = 'Trans-Supply'
const TSP = 'Traffic Safety Products'
const CORAL = 'Coral Sales (Ver-Mac)'

export const products: Product[] = [
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
    dailyRate: 2.25,
    weeklyRate: 9,
    monthlyRate: 27,
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
        question: 'How are the cones delivered and picked up?',
        answer: 'Cones are delivered stacked on pallets or in crates to your job site. We schedule pickup at the end of your rental period. Delivery and pickup fees vary by location — request a quote for exact delivery costs.',
      },
    ],
    tags: ['cone', 'channelization', 'lane closure', 'reflective'],
    inStock: true,
    stockCount: 500,
    popular: true,
    sku: 'CON-28-STD',
    supplierSku: 'C28S',
    supplierUrl: 'https://www.trafficsafetystore.com/shop/orange-28-inch-7-0-lb-flow-molded-traffic-cone/C28S',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '7 lbs',
    dimensions: '28" H × 15" × 15" base',
    metaTitle: 'Rent 28" Traffic Cones | MUTCD / MASH Compliant | TrafficKit',
    metaDescription: 'Rent NCHRP-350 & MASH-accepted 28" orange traffic cones starting at $2.25/day. 500+ in stock. Perfect for lane closures and shoulder work up to 45 mph. Fast delivery.',
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
    dailyRate: 3.38,
    weeklyRate: 13.5,
    monthlyRate: 40.5,
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
    supplierUrl: 'https://www.trafficsafetystore.com/traffic-cones/36',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '10 lbs',
    dimensions: '36" H × 14" × 14" base',
    metaTitle: 'Rent 36" Reflective Traffic Cones | Highway-Grade MUTCD | TrafficKit',
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
      'Exact product: Traffic Safety Store DRUM6HITIRE. 37" tall polyethylene channelizing drum with 6" high-intensity orange and white reflective stripes. 23" diameter recycled tire ring base prevents rolling into traffic. ~10 lb drum body + ~22 lb tire base. Exceeds MUTCD standards and meets NCHRP-350 crash test rating. High visibility day and night.',
    dailyRate: 6.75,
    weeklyRate: 27,
    monthlyRate: 81,
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
    supplierUrl: 'https://www.trafficsafetystore.com/traffic-drums/plastic-drum-6-base',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~32 lbs (drum + base)',
    dimensions: '37" H × 23" base diameter',
    metaTitle: 'Rent Channelizing Drums | 37" HI Reflective Tire Base | TrafficKit',
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
      'Exact product: Traffic Safety Store RU-36-REF-RWAHD. 36"×36" heavy-duty high-visibility reflective vinyl roll-up sign with fiberglass cross-ribs and plastic corner pockets. MUTCD code W20-1. Compatible with all standard roll-up sign stands. Made in USA. Ships same day.',
    dailyRate: 7.5,
    weeklyRate: 30,
    monthlyRate: 90,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/36-inch-heavy-duty-reflective-roll-up-sign-road-work-ahead/RU-36-REF-RWAHD',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: 'Rent Road Work Ahead Sign (W20-1) | 36" Reflective Roll-Up | TrafficKit',
    metaDescription: 'Rent MUTCD W20-1 "Road Work Ahead" 36" reflective roll-up signs from $7.50/day. Required for all work zones. Fiberglass ribs, reflective vinyl. Same-day delivery available.',
  },
  {
    id: 'prod-5',
    categoryId: 'cat-2',
    categorySlug: 'signs-sign-stands',
    name: '36" Reflective Roll-Up Sign — Flagger Ahead (W20-7a)',
    slug: 'roll-up-flagger-ahead',
    description: 'Heavy-duty 36"×36" reflective vinyl roll-up sign, MUTCD W20-7a, fiberglass ribs',
    longDescription:
      'Exact product: Traffic Safety Store RU-36-REF-FLGAHD. 36"×36" heavy-duty high-visibility reflective vinyl "Flagger Ahead" roll-up sign. MUTCD code W20-7a. Required whenever a flagger is controlling traffic in a work zone. Fiberglass cross-ribs, plastic corner pockets. Made in USA.',
    dailyRate: 7.5,
    weeklyRate: 30,
    monthlyRate: 90,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/36-inch-heavy-duty-reflective-roll-up-sign-flagger-ahead-text/RU-36-REF-FLGAHD',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: 'Rent Flagger Ahead Sign (W20-7a) | 36" Reflective Roll-Up | TrafficKit',
    metaDescription: 'Rent MUTCD W20-7a "Flagger Ahead" 36" reflective roll-up signs from $7.50/day. Required by law when flaggers control traffic. Fast delivery to job sites.',
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
    dailyRate: 6,
    weeklyRate: 24,
    monthlyRate: 72,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/cortina-rigid-or-roll-up-tri-pod-sign-stand/TRI-POD-STD',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~10 lbs',
    dimensions: 'Folds flat for storage',
    metaTitle: 'Rent Cortina Tri-Pod Sign Stand | 36" & 48" Signs | TrafficKit',
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
      'Exact product: Traffic Safety Store RU-36-NON-OLRA. 36"×36" heavy-duty non-reflective bright orange vinyl "One Lane Road Ahead" roll-up sign. MUTCD code W20-4. Fiberglass cross-ribs and plastic corner pockets. Compatible with all standard roll-up sign stands.',
    dailyRate: 7.5,
    weeklyRate: 30,
    monthlyRate: 90,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/36-inch-heavy-duty-non-reflective-roll-up-sign-one-lane-road-ahead/RU-36-NON-OLRA',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '3 lbs',
    dimensions: '36" × 36"',
    metaTitle: 'Rent One Lane Road Ahead Sign (W20-4) | 36" Roll-Up | TrafficKit',
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
      'Exact product: Traffic Safety Store T3-BA-EG-8 (MPN 313-ASBL). 60" tall MUTCD Type III barricade with break-away fold-flat design. Three 8-foot plastic rails with engineer grade (EG) orange and white reflective sheeting. NCHRP-350 accepted. Accommodates two barricade flashers. Complete assembly with plastic uprights, feet, and hardware.',
    dailyRate: 12,
    weeklyRate: 48,
    monthlyRate: 144,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/break-away-system-type-3-barricade-with-8-ft-plastic-rails-no-customization-engineer-grade-eg-single/T3-BA-EG-8',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~25 lbs',
    dimensions: '96" W × 60" H',
    metaTitle: 'Rent Type III Road Closure Barricades | 8 ft Break-Away | TrafficKit',
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
      'Exact product: Traffic Safety Store TYPE 2HI (MPN 37408-FHIP). 45" tall × 24" wide folding plastic Type II barricade with high-intensity (HI) reflective sheeting. Impact-resistant polyethylene, stackable with molded lugs. ~12 lbs. Commonly used for lane closures, channelization, and temporary closures where traffic may still pass.',
    dailyRate: 8.25,
    weeklyRate: 33,
    monthlyRate: 99,
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
    supplierUrl: 'https://www.trafficsafetystore.com/shop/45-inch-h-by-24-inch-w-folding-plastic-type-ii-barricade-w-high-intensity-sheeting/TYPE%202HI',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~12 lbs',
    dimensions: '24" W × 45" H',
    metaTitle: 'Rent Type II Traffic Barricades | HI Reflective Sheeting | TrafficKit',
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
      'Exact product: Traffic Safety Store 2001MBORG (MPN 148002B). Yodock 2001MB orange HDPE water-filled construction barrier. 72"L × 32"H × 18"W. Ships at 85 lbs empty; weighs ~900 lbs when filled with water. Links together for any run length. Meets NCHRP Report 350 standards. Compatible with optional fence panel toppers.',
    dailyRate: 27,
    weeklyRate: 108,
    monthlyRate: 324,
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
        answer: 'Yes. Barriers ship empty and must be filled with water on site using a garden hose, water truck, or on-site water supply. Filling takes approximately 5–10 minutes per barrier. Barriers must be emptied before pickup (or we can drain them for an additional fee).',
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
    supplierUrl: 'https://www.trafficsafetystore.com/water-filled-barriers/yodock-2001-barrier',
    supplier: TSS,
    minimumRentalDays: 3,
    weight: '85 lbs empty / ~900 lbs filled',
    dimensions: '72" L × 18" W × 32" H',
    metaTitle: 'Rent Water-Filled Barriers | Yodock 2001MB NCHRP-350 | TrafficKit',
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
      'Exact product: Hi-Way Safety / Trans-Supply WAAW-PL25C (15-lamp configuration). M90 Next Generation Solar-Assisted Arrow Board Trailer. 15 amber PAR 46 sealed-beam LED lamps. 48"H × 96"W sign panel. Solar panel + two 12V 22AH sealed batteries with 30-day backup. 5-year lamp warranty. Optional GPS/remote modem. Easily towed by any pickup truck.',
    dailyRate: 142.5,
    weeklyRate: 570,
    monthlyRate: 1710,
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
      'Easily towed by any pickup',
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
        answer: 'The trailer uses a standard 2" ball hitch. Any pickup truck, SUV, or heavy equipment with a standard 2" receiver can tow the M90 trailer. Tongue weight is 95–100 lbs — well within the capacity of any tow-rated vehicle.',
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
    minimumRentalDays: 1,
    weight: '~1,000 lbs',
    dimensions: '48" H × 96" W panel; 95" L trailer',
    metaTitle: 'Rent Arrow Board Trailer | Hi-Way Safety M90 Solar 15-Lamp | TrafficKit',
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
    dailyRate: 97.5,
    weeklyRate: 390,
    monthlyRate: 1170,
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
        answer: 'Battery runtime varies by lamp brightness setting and mode. Typical operation yields 8–12 hours per charge. We deliver units with fully charged batteries. For multi-day operations, a solar charging kit can be requested.',
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
    minimumRentalDays: 1,
    weight: '100 lbs',
    dimensions: 'Contact supplier for panel dimensions',
    metaTitle: 'Rent Truck-Mounted Arrow Board | Gregory AVP15 15-LED Wireless | TrafficKit',
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
    dailyRate: 262.5,
    weeklyRate: 1050,
    monthlyRate: 3150,
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
    minimumRentalDays: 1,
    weight: 'Contact supplier',
    dimensions: '71" × 133" display',
    metaTitle: 'Rent Portable Message Board | Ver-Mac PCMS-1210 Pro 3-Line Solar | TrafficKit',
    metaDescription: 'Rent Ver-Mac PCMS-1210 Pro 3-line portable message boards from $262.50/day. WiFi + 4G LTE remote programming, solar-powered, NTCIP compliant. Ideal for work zones and events.',
  },

  // --- Safety Lighting ---
  {
    id: 'prod-14',
    categoryId: 'cat-6',
    categorySlug: 'safety-lighting',
    name: '3-Volt D-Cell LED Barricade Flasher — Amber, Type B',
    slug: 'type-b-flashing-warning-light',
    description: 'Traffic Safety Store 3VOLT LED amber barricade flasher, photo-cell controlled, MUTCD Type B',
    longDescription:
      'Exact product: Traffic Safety Store 3VOLT LED (MPN 99-02006). Amber 3-volt D-cell LED barricade flasher. Photo-cell activated — automatically turns off during daylight to conserve battery. Two modes: Steady-On or Flash. Mounts to barricades, drums, cones, and sign stands. Made in USA. Ships same day.',
    dailyRate: 2.25,
    weeklyRate: 9,
    monthlyRate: 27,
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
        answer: 'In flash mode with the photo-cell active (nighttime only), two D-cell batteries last approximately 300–500 hours of active operation — enough for 30–60 nights. We deliver flashers with fresh batteries.',
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
    supplierUrl: 'https://www.trafficsafetystore.com/barricade-lights-flashers/3-volt-led',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~1 lb',
    dimensions: '~5" diameter',
    metaTitle: 'Rent Type B Barricade Flashers | Amber LED MUTCD Compliant | TrafficKit',
    metaDescription: 'Rent MUTCD Type B amber LED barricade flashers from $2.25/day. Photo-cell auto shutoff, steady or flash mode. Required for nighttime barricade and drum lighting. 400+ in stock.',
  },
  {
    id: 'prod-15',
    categoryId: 'cat-6',
    categorySlug: 'safety-lighting',
    name: 'Orion 30-Minute Road Flares — Pack of 6',
    slug: 'road-flares-6-pack',
    description: 'Six Orion 30-minute waxed road flares in nylon carrying case with orange safety vest',
    longDescription:
      'Exact product: Traffic Safety Store ORION6030 (MPN 6030). Six-pack of Orion 30-minute waxed road flares. Includes high-visibility red nylon carrying case and orange safety vest. Waxed construction is weather-resistant — works in fog, rain, and snow. DOT approved. Visible day or night. Standard for work zone and emergency delineation where open-flame flares are permitted.',
    dailyRate: 18,
    weeklyRate: 72,
    monthlyRate: 216,
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
    sku: 'LGT-FLR-6PK',
    supplierSku: 'ORION6030',
    supplierUrl: 'https://www.trafficsafetystore.com/road-flares/orion-30-min-6-pack',
    supplier: TSS,
    minimumRentalDays: 1,
    weight: '~3 lbs (set)',
    dimensions: '6 flares in nylon case',
    metaTitle: 'Rent Road Flares | Orion 30-Min 6-Pack DOT Approved | TrafficKit',
    metaDescription: 'Rent Orion 30-minute DOT-approved road flares (6-pack) from $18/day. Weather-resistant waxed construction, nylon case and safety vest included. Ideal for emergency delineation.',
  },
]

export const getProductsByCategory = (categorySlug: string): Product[] =>
  products.filter((p) => p.categorySlug === categorySlug)

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.popular)

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  )
}
