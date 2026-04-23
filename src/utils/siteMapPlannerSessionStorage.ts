import type { CartLine } from '../context/CartContext'
import { getProductById } from '../data/products'

const STORAGE_KEY = 'traffic:site-map-planner:v1'

export type SiteMapPlacedRow = {
  id: string
  productId: string
  lat: number
  lng: number
  size?: number  // 1.0 = default 44px marker
}

export interface SiteMapPlannerPersistedV1 {
  v: 1
  placements: SiteMapPlacedRow[]
  mapView?: { lat: number; lng: number; zoom: number }
  searchDraft?: string
}

function newPlacementId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/** Spread cart lines near center (first visit only — empty saved planner session). */
export function seedPlacementsFromCart(
  lines: CartLine[],
  center: { lat: number; lng: number },
  opts?: { maxMarkers?: number },
): SiteMapPlacedRow[] {
  const maxMarkers = opts?.maxMarkers ?? 72
  const out: SiteMapPlacedRow[] = []
  let idx = 0
  for (const line of lines) {
    const prod = getProductById(line.productId)
    if (!prod) continue
    const qty = Math.min(line.quantity, 24)
    for (let j = 0; j < qty && out.length < maxMarkers; j++) {
      const ring = Math.floor(idx / 8)
      const ang = (idx % 8) * ((Math.PI * 2) / 8)
      const step = 0.00012 * (1 + ring * 0.65)
      out.push({
        id: newPlacementId(),
        productId: line.productId,
        lat: center.lat + step * Math.cos(ang),
        lng: center.lng + step * Math.sin(ang) * 1.25,
      })
      idx++
    }
  }
  return out
}

export function readSiteMapPlannerSession(): SiteMapPlannerPersistedV1 | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as SiteMapPlannerPersistedV1
    if (p.v !== 1 || !Array.isArray(p.placements)) return null
    const placements = p.placements
      .filter(
        (row): row is SiteMapPlacedRow =>
          row &&
          typeof row === 'object' &&
          typeof row.id === 'string' &&
          typeof row.productId === 'string' &&
          typeof row.lat === 'number' &&
          typeof row.lng === 'number' &&
          Number.isFinite(row.lat) &&
          Number.isFinite(row.lng),
      )
      .map((row) => ({
        id: row.id,
        productId: row.productId,
        lat: row.lat,
        lng: row.lng,
        size: typeof row.size === 'number' && row.size > 0 ? row.size : undefined,
      }))
    const mapView =
      p.mapView &&
      typeof p.mapView.lat === 'number' &&
      typeof p.mapView.lng === 'number' &&
      typeof p.mapView.zoom === 'number'
        ? { lat: p.mapView.lat, lng: p.mapView.lng, zoom: p.mapView.zoom }
        : undefined
    return {
      v: 1,
      placements,
      mapView,
      searchDraft: typeof p.searchDraft === 'string' ? p.searchDraft : undefined,
    }
  } catch {
    return null
  }
}

export function writeSiteMapPlannerSession(payload: SiteMapPlannerPersistedV1): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota */
  }
}
