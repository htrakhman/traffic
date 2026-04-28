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

export interface Article {
  slug: string
  title: string
  /** Short dek shown on the listing card, also used as meta description fallback. */
  excerpt: string
  /** Meta description (150–160 chars). If omitted, excerpt is used. */
  metaDescription?: string
  /** Primary keyword this article targets (must exist in seo/keywords.json). */
  primaryKeyword: string
  /** Secondary/semantic keywords, for internal tracking + meta keywords tag. */
  secondaryKeywords?: string[]
  /** Average monthly search volume for the primary keyword, at publish time. */
  targetVolume: number
  /** ISO 8601 date (YYYY-MM-DD). */
  datePublished: string
  dateModified?: string
  author?: string
  /** Estimated read time in minutes. */
  readMinutes: number
  /** Hero image URL (absolute or root-relative). */
  heroImage?: string
  /** The article body. Use article-body Tailwind utilities. */
  body: ReactNode
  /** 5–8 Q/A pairs rendered as accordion + FAQPage JSON-LD. */
  faqs?: ArticleFAQ[]
  /** Internal links shown in a "Related equipment" block. */
  relatedProducts?: RelatedLink[]
  /** Sibling articles shown in "Keep reading". */
  relatedArticles?: string[]
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

export const articles: Article[] = [
  articleParkingConesBuyingGuide,
  articleTrafficSafetyConesPillarGuide,
  articlePedestrianCrossingSignsMutcdGuide,
  articleWhatIsATrafficPylon,
  articleHazardConesVsTrafficCones,
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
