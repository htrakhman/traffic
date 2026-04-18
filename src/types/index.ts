export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  imageUrl: string
}

export interface ProductFAQ {
  question: string
  answer: string
}

export interface ProductUseCase {
  title: string
  description: string
}

export interface Product {
  id: string
  categoryId: string
  categorySlug: string
  name: string
  slug: string
  description: string
  longDescription: string
  dailyRate: number
  weeklyRate: number
  monthlyRate: number
  unit: string // 'each' | 'set' | 'pair'
  imageUrl: string
  images: string[]
  specs: Record<string, string>
  features: string[]
  tags: string[]
  inStock: boolean
  stockCount?: number
  popular: boolean
  sku: string
  supplierSku: string       // Exact SKU used to reorder from supplier
  supplierUrl: string       // Direct supplier product page URL
  supplier: string          // Supplier name (e.g. "Traffic Safety Store")
  minimumRentalDays: number
  weight?: string
  dimensions?: string
  faqs?: ProductFAQ[]
  useCases?: ProductUseCase[]
  compliance?: string[]     // MUTCD, NCHRP-350, MASH, DOT, etc.
  metaTitle?: string        // SEO page title override
  metaDescription?: string  // SEO meta description override
}

export interface Package {
  id: string
  name: string
  description: string
  useCase: string
  items: { productId: string; quantity: number }[]
  /** Bundle discount off the sum of included items’ retail daily rates */
  savingsPercent: number
  popular: boolean
}

export type JobType =
  | 'utility_work'
  | 'paving'
  | 'tree_work'
  | 'excavation'
  | 'striping'
  | 'bridge_work'
  | 'signal_work'
  | 'other'

export type RoadType =
  | 'interstate'
  | 'highway'
  | 'arterial'
  | 'local_street'
  | 'parking_lot'
  | 'private_road'

export type LaneImpact =
  | 'shoulder_only'
  | 'one_lane_closed'
  | 'two_lanes_closed'
  | 'full_closure'

export type WorkTime = 'day' | 'night' | 'both'

export type PedestrianExposure = 'none' | 'low' | 'moderate' | 'high'

export interface MapArea {
  /** Drawn polygon path as lat/lng pairs */
  path: { lat: number; lng: number }[]
  /** Area in square feet */
  areaFt2: number
  /** Perimeter in feet */
  perimeterFt: number
  /** Human-readable area label (e.g. "12,400 sq ft") */
  areaLabel: string
  /** Human-readable perimeter label (e.g. "440 ft") */
  perimeterLabel: string
  /** Reverse-geocoded street address of the centroid */
  address?: string
  /** Centroid lat/lng */
  center: { lat: number; lng: number }
}

export interface JobDetails {
  jobType: JobType | ''
  description: string
  roadType: RoadType | ''
  speedLimit: number | ''
  laneImpact: LaneImpact | ''
  workTime: WorkTime | ''
  durationDays: number | ''
  startDate: string
  pedestrianExposure: PedestrianExposure | ''
  crewCount: number | ''
  location: string
  equipmentOwned: string
  deliveryNeeded: boolean
  imageFile?: File | null
  imageBase64?: string
  /** Drawn map area defining the work zone */
  mapArea?: MapArea
}

export interface RecommendationItem {
  productId: string
  productName: string
  category: string
  quantity: number
  rationale: string
  priority: 'required' | 'recommended' | 'optional'
  dailyRate: number
}

/** AI / cart recommendation payload (aligned with catalog retail `dailyRate` values). */
export interface AIRecommendation {
  summary: string
  items: RecommendationItem[]
  totalDailyRate: number
  estimatedDurationDays: number
  setupNotes: string[]
  disclaimer: string
}

export interface Recommendation {
  summary: string
  items: RecommendationItem[]
  totalDailyRate: number
  estimatedDuration: number
  notes: string[]
  disclaimer: string
}

export interface QuoteItem {
  product: Product
  quantity: number
  days: number
}

export interface QuoteRequest {
  items: QuoteItem[]
  jobDetails?: Partial<JobDetails>
  contactName: string
  contactEmail: string
  contactPhone: string
  company: string
  jobSite: string
  startDate: string
  notes: string
  deliveryNeeded: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
