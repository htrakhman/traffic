import { createElement as h, Fragment } from 'react'
import type { Article } from '../articles'

/**
 * Targets "massdot qualified traffic control equipment" (50/mo, CI=3, score=16.67).
 * Geo-tactical article — MA-specific MassDOT/MassHighway compliance angle.
 */
export const articleMassDotQualifiedTrafficControlEquipment: Article = {
  slug: 'massdot-qualified-traffic-control-equipment',
  title: 'MassDOT-Qualified Traffic Control Equipment: A Contractor Guide',
  excerpt:
    'What "MassDOT qualified" actually means for traffic control equipment, which devices need formal qualification, and how Massachusetts contractors keep their work zones inspection-ready.',
  metaDescription:
    'MassDOT qualified traffic control equipment: which devices need MASH eligibility, how MassHighway Section 850 maps to MUTCD, and a contractor-side compliance checklist.',
  primaryKeyword: 'massdot qualified traffic control equipment',
  secondaryKeywords: [
    'MassDOT traffic control',
    'MassHighway Section 850',
    'Massachusetts work zone equipment',
    'MassDOT MASH approved',
    'Massachusetts temporary traffic control',
    'MassDOT qualified products list',
  ],
  targetVolume: 50,
  datePublished: '2026-04-27',
  readMinutes: 7,
  body: h(
    Fragment,
    null,

    h(
      'p',
      { className: 'lead' },
      '"MassDOT qualified" traffic control equipment means devices that meet the federal MUTCD standard plus the state-specific requirements written into MassDOT Highway Division specifications — most notably Section 850 (Traffic Control Equipment) and the Highway Division Construction Standard Details. In practice, a Massachusetts contractor needs three things on every state-funded job: MASH-eligible crashworthy hardware, devices that match the typical applications shown on the MassDOT Construction Standard Details, and visible labeling or documentation that ties each item back to the federal acceptance letter or the state Qualified Products List.',
    ),

    h('h2', null, 'What does "MassDOT qualified" actually require?'),
    h(
      'p',
      null,
      'MassDOT does not run a single combined "qualified products list" for every traffic control device. The state layers three separate qualification paths on top of the federal MUTCD baseline. Crashworthy hardware (longitudinal barriers, attenuators, sign supports, work-zone barriers) must be on the federal MASH eligibility list. Permanent and temporary signing must conform to MassDOT Highway Division Standard Details and the current MUTCD. Items like portable changeable message signs, arrow boards, AFADs, and TMAs must be functional matches for the typical applications shown in the temporary traffic control plans the Highway Division publishes.',
    ),
    h(
      'p',
      null,
      'For a contractor, the practical impact is that "qualified" is rarely a single sticker — it is a paper trail. Keep the FHWA acceptance letter or eligibility entry for each barrier and attenuator on file, keep the manufacturer cut sheet and MUTCD reference for each sign and channelizer, and keep the rental invoice that ties each item on site to the inventory you brought.',
    ),

    h('h2', null, 'Which traffic control devices need formal qualification on a MassDOT job?'),
    h(
      'p',
      null,
      'Three categories trigger formal qualification review on most Highway Division contracts: anything crashworthy, anything programmable, and anything carrying its own power source. Type III barricades, water-filled and concrete longitudinal barriers, truck and trailer mounted attenuators (TMAs), and breakaway sign supports all fall into the crashworthy bucket and must be MASH-eligible at the appropriate test level (TL-2 for posted speeds at or below 45 mph, TL-3 for higher-speed work). Portable changeable message signs and AFADs fall into the programmable bucket and must match the functional spec on the contract drawings — character height, message library, NTCIP compatibility, controller security. Light towers and PCMS trailers fall into the powered bucket, where the project specifications usually call out battery capacity, panel watts, and runtime requirements.',
    ),
    h(
      'p',
      null,
      'Lower-risk devices — 28" and 36" traffic cones, channelizing drums, Type I and Type II barricades, roll-up signs, sign stands — still must conform to MUTCD §6F dimensional and retroreflectivity rules but rarely require their own paperwork past the rental invoice. The exception is when the project specifications cross-reference Section 850 specifically, in which case the rental supplier should be able to confirm compliance in writing.',
    ),

    h('h2', null, 'How does MassDOT compliance map to federal MUTCD and MASH?'),
    h(
      'p',
      null,
      'Massachusetts adopts the federal MUTCD by reference and overlays state-specific construction details rather than rewriting the whole standard. The federal handoff from NCHRP 350 to MASH for crashworthy hardware is tracked by the ',
      h(
        'a',
        {
          href: 'https://highways.dot.gov/safety/other/roadside-departure/roadside-hardware',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'FHWA Office of Safety roadside hardware program',
      ),
      ', and any device on that federal eligibility list is also accepted by MassDOT unless the contract documents specifically restrict the list further. That federal alignment is why a Wanco arrow board or a Yodock water-filled barrier rented in New Jersey is also acceptable for a Massachusetts paving job, provided the test level matches the road class.',
    ),
    h(
      'p',
      null,
      'OSHA 1926.201 governs the flagger and signaling rules that sit alongside the MassDOT specs — flagger placement, garment requirements, and shift duration are federal, not state. The state layer kicks in primarily on signing details, supplemental warning device patterns, and the typical applications drawn in the Highway Division plan sheets.',
    ),

    h('h2', null, 'How do I document compliance on a Massachusetts work zone?'),
    h(
      'p',
      null,
      'Build a binder (or a shared folder) with five sections. First, the contract-document references for traffic control — Section 850 callouts, plan-sheet typical applications, and any pay items that reference specific equipment. Second, the FHWA acceptance letters for every crashworthy device on site. Third, the manufacturer cut sheets for arrow boards, PCMS, AFADs, and TMAs, each annotated with the MUTCD reference (§6F.61, §6F.60, §6E.04, §6F.81 respectively). Fourth, the rental invoice or purchase order for each item, dated to the work-zone deployment. Fifth, the daily inspection log — a one-line entry per device per shift confirming retroreflectivity, lamp operation, panel readability, and battery state.',
    ),
    h(
      'p',
      null,
      'The binder is what the resident engineer or the MassDOT inspector wants to see if anything goes sideways. It is also what the rental supplier can pre-build for you on quoted equipment if you ask up front.',
    ),

    h('h2', null, 'How do I rent MassDOT-compliant traffic control equipment?'),
    h(
      'p',
      null,
      'Send the rental request with the Highway Division project number, the relevant typical-application sheet from the contract plans, and the work-zone duration class (mobile, short-duration, short-term, intermediate-term, long-term per MUTCD §6G.02). The rental coordinator can then match each line item to a MASH-eligible or MUTCD-compliant equivalent, attach the federal acceptance documentation, and confirm delivery to the job site. Lead times in eastern Massachusetts run 24–48 hours for cones, drums, signs, and arrow boards, and 2–5 business days for TMAs, AFADs, and longer barrier runs.',
    ),

    h(
      'p',
      null,
      h('a', { href: '/quote', className: 'cta-inline' }, 'Request a MassDOT-ready traffic control quote'),
      ' — share the project number and the typical-application sheet, and we will line up qualified equipment and the supporting paperwork.',
    ),
  ),

  faqs: [
    {
      q: 'Is there a single MassDOT qualified products list for traffic control?',
      a: 'No single combined list. Crashworthy hardware uses the federal MASH eligibility list maintained by FHWA, signs and channelizers follow MUTCD §6F and the MassDOT Highway Division Construction Standard Details, and programmable or powered devices are evaluated against the project specifications and Section 850. The "qualified" status is a paper trail across those sources, not one sticker.',
    },
    {
      q: 'Does MassDOT require MASH TL-3 on every job?',
      a: 'No. The required test level follows the posted operating speed. MASH TL-2 is acceptable on roads at or below 45 mph; TL-3 is required at higher speeds. The contract documents will specify the test level, and the FHWA acceptance letter for the device must match it.',
    },
    {
      q: 'Are out-of-state rental devices acceptable on MassDOT projects?',
      a: 'Generally yes, provided the device appears on the federal MASH/NCHRP 350 eligibility list and conforms to MUTCD §6F dimensions and retroreflectivity. Massachusetts adopts the federal MUTCD and the federal eligibility list by reference. The contract documents may add state-specific labeling or signing details that the rental supplier should confirm in writing.',
    },
    {
      q: 'What signs need to be MUTCD-compliant on a Massachusetts work zone?',
      a: 'All temporary traffic control signs in active use — W20-1 ROAD WORK AHEAD, W21-7 FLAGGER, W4-2 LANE ENDS, R2-5b SPEED LIMIT, and the rest of the §6F sign series. Roll-up signs must meet the same retroreflectivity grade as rigid signs (Type IV or higher sheeting under §6F.03) and the same minimum sizes scaled to road speed.',
    },
    {
      q: 'Do AFADs need a separate MassDOT approval?',
      a: 'AFADs operate under MUTCD §6E.04 with a trained flagger holding the remote control. MassDOT does not maintain a separate AFAD approval list, but the project specifications typically require the unit to match a typical application sheet — STOP/SLOW or red/yellow lens, single-lane two-way operation, and a mounting structure that survives the contract duration.',
    },
    {
      q: 'How long should I keep traffic control compliance documentation after a MassDOT job?',
      a: 'Most state-funded contracts require records to be kept for the duration of the contract plus three to seven years, depending on funding source. Federally funded projects typically require seven years post-final-payment. Keeping the rental invoices, FHWA acceptance letters, and daily inspection logs in a single binder makes any post-project audit a non-event.',
    },
    {
      q: 'Are water-filled barriers acceptable for full-time use on MassDOT highways?',
      a: 'Water-filled longitudinal channelizing devices are MUTCD-recognized for delineation but are not crashworthy at TL-3 unless specifically certified, and most are limited to TL-2 (≤45 mph) applications. For high-speed work, MassDOT specifications typically require concrete or steel barrier with a current MASH eligibility letter at TL-3.',
    },
  ],

  relatedProducts: [
    { label: 'Type III Barricade', path: '/product/type-iii-barricade' },
    { label: 'Trailer-Mounted Arrow Board (15-Lamp)', path: '/product/trailer-mounted-arrow-board-15' },
    { label: 'Water-Filled Barrier (6 ft)', path: '/product/water-filled-barrier-6ft' },
    { label: 'Barricades & Barriers', path: '/category/barricades-barriers' },
    { label: 'Arrow Boards', path: '/category/arrow-boards' },
  ],

  relatedArticles: [
    'traffic-control-equipment-rental',
    'traffic-control-trailer-rental-guide',
    'uniform-traffic-control-devices-mutcd-guide',
  ],
}
