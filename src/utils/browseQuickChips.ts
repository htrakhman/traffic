import { categories } from '../data/categories'
import { getProducts, filterProductsBySearchQuery } from '../data/products'

export type BrowseQuickChip = { label: string; category: string }

/** Short labels for common slugs (matches hero defaults where possible). */
const SLUG_LABEL: Record<string, string> = {
  'cones-drums': 'Traffic Cones',
  'signs-sign-stands': 'Roll-Up Signs',
  'barricades-barriers': 'Barricades',
  'message-boards': 'Message Boards',
  'safety-lighting': 'Warning Lights',
  'pedestrian-control': 'Pedestrian',
  'accessories-hardware': 'Accessories',
  'parking-blocks': 'Parking blocks',
  'speed-bumps-humps': 'Speed bumps',
  'safety-vests-hi-vis': 'Hi-vis vests',
  'ppe-helmets-gloves-shoes': 'PPE',
  'striping-pavement-paint': 'Striping & paint',
  'fencing-site-safety': 'Fencing',
  'fall-protection': 'Fall protection',
  'bollards-chocks-corners': 'Bollards & chocks',
  'flares-markers-wands-flags': 'Flagger supplies',
}

const DEFAULT_CHIPS: BrowseQuickChip[] = [
  { label: 'Traffic Cones', category: 'cones-drums' },
  { label: 'Roll-Up Signs', category: 'signs-sign-stands' },
  { label: 'Barricades', category: 'barricades-barriers' },
  { label: 'Message Boards', category: 'message-boards' },
  { label: 'Warning Lights', category: 'safety-lighting' },
]

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

function labelForSlug(slug: string): string {
  if (SLUG_LABEL[slug]) return SLUG_LABEL[slug]
  const cat = categoryBySlug[slug]
  if (cat?.name) return cat.name.split(',')[0]?.trim() || cat.name
  return slug.replace(/-/g, ' ')
}

/**
 * When the query is empty, returns the default starter chips.
 * When typing, returns up to 8 categories that contain matches, ordered by hit count (then slug).
 */
export function getBrowseQuickChips(query: string): BrowseQuickChip[] {
  const q = query.trim()
  if (!q) return DEFAULT_CHIPS

  const matches = filterProductsBySearchQuery(getProducts(), query)
  if (matches.length === 0) return DEFAULT_CHIPS

  const counts = new Map<string, number>()
  for (const p of matches) {
    counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1)
  }

  const ordered = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))

  return ordered.slice(0, 8).map(([slug]) => ({
    category: slug,
    label: labelForSlug(slug),
  }))
}
