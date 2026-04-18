/**
 * Google Roads API (nearest roads + speed limits) for posted speed near a point.
 * Speed Limits may require an Asset Tracking license; see:
 * https://developers.google.com/maps/documentation/roads/speed-limits
 *
 * Browser calls must go through a same-origin proxy (`/roads-api/*`) because
 * roads.googleapis.com does not allow CORS from web apps. Vite proxies in dev/preview;
 * use vercel.json / netlify.toml rewrites in production, or set VITE_ROADS_API_BASE.
 */

import { fetchPostedSpeedFromOsm } from './osmRoadSpeed'

/** Override proxy target, e.g. `https://roads.googleapis.com/v1` from a backend you control. */
function roadsBaseUrl(): string {
  const explicit = (import.meta.env.VITE_ROADS_API_BASE as string | undefined)?.trim()
  if (explicit) return explicit.replace(/\/$/, '')
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}/roads-api/v1`
}

type NearestRoadsResponse = {
  snappedPoints?: Array<{
    location: { latitude: number; longitude: number }
    placeId: string
  }>
  error?: { code: number; message: string; status: string }
}

type SpeedLimitsResponse = {
  speedLimits?: Array<{
    placeId: string
    speedLimit?: number | string
    units?: string
  }>
  error?: { code: number; message: string; status: string }
}

function toMph(speed: number, units: string | undefined): number {
  const u = (units ?? '').toUpperCase()
  if (u.includes('MPH') || u === 'SPEED_UNIT_MPH') return speed
  if (u.includes('KPH') || u === 'SPEED_UNIT_KPH') return speed * 0.621371
  return speed
}

function parseSpeedLimit(entry: { speedLimit?: number | string; units?: string }): number | undefined {
  const raw = entry.speedLimit
  const n = typeof raw === 'number' ? raw : raw != null ? Number.parseFloat(String(raw)) : Number.NaN
  if (!Number.isFinite(n)) return undefined
  return Math.round(toMph(n, entry.units))
}

function uniquePlaceIds(points: { placeId: string }[], max: number): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const p of points) {
    if (!p.placeId || seen.has(p.placeId)) continue
    seen.add(p.placeId)
    out.push(p.placeId)
    if (out.length >= max) break
  }
  return out
}

export type PostedSpeedFromRoads = {
  postedSpeedMph: number
  postedSpeedLabel: string
  /** Present when Google returned limits; omitted when only OSM fallback succeeded */
  source?: 'google' | 'osm'
}

async function fetchPostedSpeedFromGoogle(
  lat: number,
  lng: number,
  apiKey: string,
  signal?: AbortSignal,
): Promise<PostedSpeedFromRoads | undefined> {
  if (!apiKey) return undefined

  const base = roadsBaseUrl()
  const nrUrl = `${base}/nearestRoads?points=${encodeURIComponent(`${lat},${lng}`)}&key=${encodeURIComponent(apiKey)}`
  const nrRes = await fetch(nrUrl, { signal })
  if (!nrRes.ok) return undefined

  const nrJson = (await nrRes.json()) as NearestRoadsResponse
  if (nrJson.error?.message) return undefined
  const snapped = nrJson.snappedPoints ?? []
  if (snapped.length === 0) return undefined

  const placeIds = uniquePlaceIds(snapped, 8)
  if (placeIds.length === 0) return undefined

  const sp = new URLSearchParams()
  for (const id of placeIds) sp.append('placeId', id)
  sp.set('key', apiKey)
  sp.set('units', 'MPH')
  const slUrl = `${base}/speedLimits?${sp.toString()}`
  const slRes = await fetch(slUrl, { signal })
  if (!slRes.ok) return undefined

  const slJson = (await slRes.json()) as SpeedLimitsResponse
  if (slJson.error?.message) return undefined
  const limits = slJson.speedLimits ?? []
  const mphVals = limits.map(parseSpeedLimit).filter((v): v is number => v != null && v > 0)
  if (mphVals.length === 0) return undefined

  const maxMph = Math.max(...mphVals)
  const minMph = Math.min(...mphVals)
  const label =
    minMph === maxMph
      ? `Posted ~${maxMph} mph (Google Roads, nearest segment)`
      : `Posted limits ~${minMph}–${maxMph} mph nearby (Google Roads — use higher for advance-warning spacing)`

  return { postedSpeedMph: maxMph, postedSpeedLabel: label, source: 'google' }
}

/**
 * Posted speed near a point: Google Roads when the proxy + licensing allow it,
 * otherwise OpenStreetMap maxspeed tags (no API key).
 */
export async function fetchPostedSpeedNearPoint(
  lat: number,
  lng: number,
  apiKey: string,
  signal?: AbortSignal,
): Promise<PostedSpeedFromRoads | undefined> {
  if (apiKey) {
    try {
      const g = await fetchPostedSpeedFromGoogle(lat, lng, apiKey, signal)
      if (g) return g
    } catch {
      // CORS, network, or invalid JSON
    }
  }

  try {
    const o = await fetchPostedSpeedFromOsm(lat, lng, signal)
    if (o) return o
  } catch {
    // Overpass timeout / network
  }

  return undefined
}
