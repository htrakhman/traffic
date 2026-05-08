/**
 * Article registry powering /blog and /blog/:slug.
 *
 * OWNED BY THE seo-specialist SUBAGENT — see `.claude/agents/seo-specialist.md`.
 * Do not add articles here by hand. The specialist creates one file per article
 * in `src/data/articles/` and re-exports it from the `articles` array below.
 */

import type { ReactNode } from 'react'

export interface ArticleFAQ {
  q: string
  a: string
}

export interface RelatedLink {
  label: string
  /** Root-relative URL, e.g. "/category/arrow-boards" or "/product/wanco-arrow-board" */
  path: string
}

/**
 * Metadata-only slice of an article — everything the blog listing needs.
 * Does NOT include `body`, so the listing page does not pull in heavy ReactNode
 * trees for articles the visitor has not clicked into yet.
 */
export interface ArticleMeta {
  slug: string
  title: string
  excerpt: string
  metaDescription?: string
  primaryKeyword: string
  secondaryKeywords?: string[]
  targetVolume: number
  datePublished: string
  dateModified?: string
  author?: string
  readMinutes: number
  heroImage?: string
  faqs?: ArticleFAQ[]
  relatedProducts?: RelatedLink[]
  relatedArticles?: string[]
}

/** Full article — ArticleMeta plus the rendered body. Used by /blog/:slug. */
export interface Article extends ArticleMeta {
  /** The article body. Use article-body Tailwind utilities. */
  body: ReactNode
}

// Imports are kept static so Vite tree-shakes and includes the bodies in the bundle.
import { articleTrafficControlRentalGuide } from './articles/traffic-control-rental-guide'
import { articleUniformTrafficControlDevicesMutcdGuide } from './articles/uniform-traffic-control-devices-mutcd-guide'
import { articleArrowBoardRentalGuide } from './articles/arrow-board-rental-guide'
import { articleAutomatedFlaggerAssistanceDeviceAfadGuide } from './articles/automated-flagger-assistance-device-afad-guide'
import { articleBarricadeRentalNearMeGuide } from './articles/barricade-rental-near-me-guide'
import { articlePortableTrafficControlDevicesGuide } from './articles/portable-traffic-control-devices-guide'
import { articleTrafficControlEquipmentRental } from './articles/traffic-control-equipment-rental'
import { articleTrafficControlDevicesGuide } from './articles/traffic-control-devices-guide'
import { articleTrafficConeRentalGuide } from './articles/traffic-cone-rental-guide'
import { articleHowManyConesForLaneClosure } from './articles/how-many-cones-for-lane-closure-nj'
import { articleTrafficControlTrailerRentalGuide } from './articles/traffic-control-trailer-rental-guide'
import { articleTypeIiiBarricadeVsTypeITypeIi } from './articles/type-iii-barricade-vs-type-i-type-ii'
import { articleMutcdTaperLengthFormulaNj } from './articles/mutcd-taper-length-formula-nj'
import { articleTemporaryTrafficControlPlanUtilityJob } from './articles/temporary-traffic-control-plan-utility-job'
import { articleRentVsBuyTrafficControlEquipment } from './articles/rent-vs-buy-traffic-control-equipment'
import { articleNjdotWorkZoneStandardsContractorReference } from './articles/njdot-work-zone-standards-contractor-reference'
import { articleRoadConesVsTrafficCones } from './articles/road-cones-vs-traffic-cones'
import { articleConeZoneWorkZoneGuide } from './articles/cone-zone-work-zone-guide'
import { articleBarricadesTypesUsesGuide } from './articles/barricades-types-uses-guide'
import { articleJerseyBarricadesGuide } from './articles/jersey-barricades-guide'
import { articleRoadSignalsAndSignsGuide } from './articles/road-signals-and-signs-guide'
import { articlePedestrianCrosswalkSignsMutcd } from './articles/pedestrian-crosswalk-signs-mutcd'
import { articleParkingConesBuyingGuide } from './articles/parking-cones-buying-guide'
import { articleTrafficSafetyConesPillarGuide } from './articles/traffic-safety-cones-pillar-guide'
import { articlePedestrianCrossingSignsMutcdGuide } from './articles/pedestrian-crossing-signs-mutcd-guide'
import { articleWhatIsATrafficPylon } from './articles/what-is-a-traffic-pylon'
import { articleHazardConesVsTrafficCones } from './articles/hazard-cones-vs-traffic-cones'
import { articleMassDotQualifiedTrafficControlEquipment } from './articles/massdot-qualified-traffic-control-equipment'
import { articleOfficialTrafficControlDeviceMutcd } from './articles/official-traffic-control-device-mutcd'
import { articlePortableTrafficBarrierRentalGuide } from './articles/portable-traffic-barrier-rental-guide'
import { articleTrafficControllerSignMutcd } from './articles/traffic-controller-sign-mutcd'
import { articleTrafficControlTruckRentalGuide } from './articles/traffic-control-truck-rental-guide'
import { articleTrafficConesBuyingGuide } from './articles/traffic-cones-buying-guide'
import { articleOrangeConesExplained } from './articles/orange-cones-explained'
import { articleStreetConesGuide } from './articles/street-cones-guide'
import { articleSafetyPylonsVsTrafficCones } from './articles/safety-pylons-vs-traffic-cones'
import { articlePedestrianCrossingSignalMutcdGuide } from './articles/pedestrian-crossing-signal-mutcd-guide'
import { articleCrowdControlBarriersBuyingGuide } from './articles/crowd-control-barriers-buying-guide'
import { articleTrafficBarriersTypesComparison } from './articles/traffic-barriers-types-comparison'
import { articleTrafficBarrelsBuyingGuide } from './articles/traffic-barrels-buying-guide'
import { articleRubberSpeedBumpsBuyingGuide } from './articles/rubber-speed-bumps-buying-guide'
import { articleCollapsibleTrafficConesGuide } from './articles/collapsible-traffic-cones-guide'
import { articleTrafficConesForSaleBuyingGuide } from './articles/traffic-cones-for-sale-buying-guide'
import { articleConstructionConesExplained } from './articles/construction-cones-explained'
import { articleRoadBarriersTypesComparison } from './articles/road-barriers-types-comparison'
import { articleTrafficDelineatorsGuide } from './articles/traffic-delineators-guide'
import { articleTrafficControlSignsMutcdGuide } from './articles/traffic-control-signs-mutcd-guide'
import { articleSafetyConesBuyingGuide } from './articles/safety-cones-buying-guide'
import { articleTrafficBarricadesPillarGuide } from './articles/traffic-barricades-pillar-guide'
import { articleRubberSpeedHumpsVsSpeedBumps } from './articles/rubber-speed-humps-vs-speed-bumps'
import { articleTrafficConesNearMeSameDayDelivery } from './articles/traffic-cones-near-me-same-day-delivery'
import { articleYellowCautionTapeBuyingGuide } from './articles/yellow-caution-tape-buying-guide'
import { articleWaterFilledBarriersBuyingGuide } from './articles/water-filled-barriers-buying-guide'
import { articleBikeRackBarricadesEventsGuide } from './articles/bike-rack-barricades-events-guide'

import { articlePedestrianSignsPillarGuide } from './articles/pedestrian-signs-pillar-guide'

import { articleConstructionCautionTapeBuyingGuide } from './articles/construction-caution-tape-buying-guide'

import { articleTrafficSafetyStoresBuyingGuide } from './articles/traffic-safety-stores-buying-guide'

import { articleWhatAreBarricadeCovers } from './articles/what-are-barricade-covers'

import { articleNoParkingConesGuide } from './articles/no-parking-cones-guide'

import { articleRedConesExplained } from './articles/red-cones-explained'
import { articleTrafficSignsForSaleBuyingGuide } from './articles/traffic-signs-for-sale-buying-guide'
import { articleSafetyConesNearMeNj } from './articles/safety-cones-near-me-nj'
import { articleLargeTrafficConesBuyingGuide } from './articles/large-traffic-cones-buying-guide'
import { articleHighwayConesGuide } from './articles/highway-cones-guide'
import { articleTrafficSafetySupplyBuyingGuide } from './articles/traffic-safety-supply-buying-guide'
import { articleSmallTrafficConesBuyingGuide } from './articles/small-traffic-cones-buying-guide'
import { articleTrafficSafetySignsBuyingGuide } from './articles/traffic-safety-signs-buying-guide'
import { articlePedestrianBarriersGuide } from './articles/pedestrian-barriers-guide'
import { articlePlasticJerseyBarriersVsConcrete } from './articles/plastic-jersey-barriers-vs-concrete'
import { articleAFrameBarricadesGuide } from './articles/a-frame-barricades-guide'
import { articleDangerTapeVsCautionTapeGuide } from './articles/danger-tape-vs-caution-tape-guide'
import { articleMetalBarricadesBuyingGuide } from './articles/metal-barricades-buying-guide'
import { articleParkingLotBarricadesGuide } from './articles/parking-lot-barricades-guide'
import { articleTrafficConeSignsGuide } from './articles/traffic-cone-signs-guide'
import { articleConcreteBarriersForSaleGuide } from './articles/concrete-barriers-for-sale-guide'
import { articlePlasticBarricadesPillarGuide } from './articles/plastic-barricades-pillar-guide'
import { articleRoadBarricadesExplained } from './articles/road-barricades-explained'
import { articleWhiteTrafficConesGuide } from './articles/white-traffic-cones-guide'
import { articleBlueTrafficConesGuide } from './articles/blue-traffic-cones-guide'

export const articles: Article[] = [
  articleBlueTrafficConesGuide,
  articleWhiteTrafficConesGuide,
  articleRoadBarricadesExplained,
  articlePlasticBarricadesPillarGuide,
  articleConcreteBarriersForSaleGuide,
  articleTrafficConeSignsGuide,
  articleParkingLotBarricadesGuide,
  articleMetalBarricadesBuyingGuide,
  articleDangerTapeVsCautionTapeGuide,
  articleAFrameBarricadesGuide,
  articlePlasticJerseyBarriersVsConcrete,
  articlePedestrianBarriersGuide,
  articleTrafficSafetySignsBuyingGuide,
  articleSmallTrafficConesBuyingGuide,
  articleTrafficSafetySupplyBuyingGuide,
  articleRedConesExplained,
  articleTrafficSignsForSaleBuyingGuide,
  articleSafetyConesNearMeNj,
  articleLargeTrafficConesBuyingGuide,
  articleHighwayConesGuide,
  articleNoParkingConesGuide,
  articleWhatAreBarricadeCovers,
  articleTrafficSafetyStoresBuyingGuide,
  articleConstructionCautionTapeBuyingGuide,
  articlePedestrianSignsPillarGuide,
  articleSafetyConesBuyingGuide,
  articleTrafficBarricadesPillarGuide,
  articleRubberSpeedHumpsVsSpeedBumps,
  articleTrafficConesNearMeSameDayDelivery,
  articleYellowCautionTapeBuyingGuide,
  articleWaterFilledBarriersBuyingGuide,
  articleBikeRackBarricadesEventsGuide,
  articleTrafficConesForSaleBuyingGuide,
  articleConstructionConesExplained,
  articleRoadBarriersTypesComparison,
  articleTrafficDelineatorsGuide,
  articleTrafficControlSignsMutcdGuide,
  articleCrowdControlBarriersBuyingGuide,
  articleTrafficBarriersTypesComparison,
  articleTrafficBarrelsBuyingGuide,
  articleRubberSpeedBumpsBuyingGuide,
  articleCollapsibleTrafficConesGuide,
  articleTrafficConesBuyingGuide,
  articleOrangeConesExplained,
  articleStreetConesGuide,
  articleSafetyPylonsVsTrafficCones,
  articlePedestrianCrossingSignalMutcdGuide,
  articleParkingConesBuyingGuide,
  articleTrafficSafetyConesPillarGuide,
  articlePedestrianCrossingSignsMutcdGuide,
  articleWhatIsATrafficPylon,
  articleHazardConesVsTrafficCones,
  articleMassDotQualifiedTrafficControlEquipment,
  articleOfficialTrafficControlDeviceMutcd,
  articlePortableTrafficBarrierRentalGuide,
  articleTrafficControllerSignMutcd,
  articleTrafficControlTruckRentalGuide,
  articleConeZoneWorkZoneGuide,
  articleBarricadesTypesUsesGuide,
  articleJerseyBarricadesGuide,
  articleRoadSignalsAndSignsGuide,
  articlePedestrianCrosswalkSignsMutcd,
  articleRoadConesVsTrafficCones,
  articleTypeIiiBarricadeVsTypeITypeIi,
  articleMutcdTaperLengthFormulaNj,
  articleTemporaryTrafficControlPlanUtilityJob,
  articleRentVsBuyTrafficControlEquipment,
  articleNjdotWorkZoneStandardsContractorReference,
  articleTrafficControlTrailerRentalGuide,
  articleHowManyConesForLaneClosure,
  articleTrafficConeRentalGuide,
  articleTrafficControlDevicesGuide,
  articleUniformTrafficControlDevicesMutcdGuide,
  articleArrowBoardRentalGuide,
  articleAutomatedFlaggerAssistanceDeviceAfadGuide,
  articleBarricadeRentalNearMeGuide,
  articlePortableTrafficControlDevicesGuide,
  articleTrafficControlEquipmentRental,
  articleTrafficControlRentalGuide,
]

/** Returns articles sorted newest-first. */
export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
}

/**
 * Returns article metadata sorted newest-first, with `body` stripped.
 * Use this on the /blog listing page so ReactNode bodies are not evaluated
 * for articles the visitor has not navigated to.
 */
export function getAllArticlesMeta(): ArticleMeta[] {
  return getAllArticles().map(({ body: _body, ...meta }) => meta)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return []
  const explicit = (current.relatedArticles || [])
    .map((s) => getArticleBySlug(s))
    .filter((a): a is Article => !!a)
  if (explicit.length >= limit) return explicit.slice(0, limit)
  // Fall back to most recent other articles.
  const others = getAllArticles().filter((a) => a.slug !== slug && !explicit.find((e) => e.slug === a.slug))
  return [...explicit, ...others].slice(0, limit)
}
