/**
 * Posted speed from OpenStreetMap `maxspeed` tags near a point.
 * Used when Google Roads speed limits are unavailable (CORS in browser, or Asset Tracking license).
 */

import { fetchOverpassInterpreter } from './overpassClient'

export type OsmPostedSpeed = {
  postedSpeedMph: number
  postedSpeedLabel: string
  source: 'osm'
}

function isLikelyUs(lat: number, lng: number): boolean {
  return lat > 24 && lat < 50 && lng > -125 && lng < -65
}

/** Parse OSM maxspeed values like "35", "35 mph", "56 km/h", "25; school". */
export function parseOsmMaxspeedMph(raw: string | undefined, lat: number, lng: number): number | undefined {
  if (!raw) return undefined
  const s = raw.trim().toLowerCase()
  const firstPart = s.split(';')[0]?.trim() ?? s
  const numMatch = firstPart.match(/(\d+(?:\.\d+)?)/)
  if (!numMatch) return undefined
  const n = Number.parseFloat(numMatch[1])
  if (!Number.isFinite(n) || n <= 0) return undefined

  if (firstPart.includes('km/h') || firstPart.includes('kmh') || firstPart.includes('kph')) {
    return Math.round(n * 0.621371)
  }
  if (firstPart.includes('mph')) return Math.round(n)

  if (isLikelyUs(lat, lng)) return Math.round(n)
  return Math.round(n * 0.621371)
}

/**
 * Nearest ways with maxspeed=*, within ~55 m (residential / local road context).
 */
export async function fetchPostedSpeedFromOsm(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<OsmPostedSpeed | undefined> {
  const radiusM = 85
  const query = `[out:json][timeout:18];
(
  way(around:${radiusM},${lat},${lng})["maxspeed"];
  way(around:${radiusM},${lat},${lng})["maxspeed:forward"];
);
out tags center;`

  const res = await fetchOverpassInterpreter(query, signal)
  if (!res.ok) return undefined

  const data = (await res.json()) as {
    elements?: Array<{
      type: string
      tags?: Record<string, string>
    }>
  }

  const mphVals: number[] = []
  for (const el of data.elements ?? []) {
    if (el.type !== 'way') continue
    const tags = el.tags ?? {}
    const raw = tags.maxspeed ?? tags['maxspeed:forward']
    const mph = parseOsmMaxspeedMph(raw, lat, lng)
    if (mph != null && mph > 0) mphVals.push(mph)
  }
  if (mphVals.length === 0) return undefined

  const maxMph = Math.max(...mphVals)
  const minMph = Math.min(...mphVals)
  const label =
    minMph === maxMph
      ? `Posted ~${maxMph} mph (OpenStreetMap near center — verify with local signage)`
      : `Posted ~${minMph}–${maxMph} mph from OSM ways nearby — verify with local signage`

  return { postedSpeedMph: maxMph, postedSpeedLabel: label, source: 'osm' as const }
}
