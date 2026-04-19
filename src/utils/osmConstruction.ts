/** Road segments tagged as under construction in OpenStreetMap (community-sourced; active projects). */

import { fetchOverpassInterpreter } from './overpassClient'

export type OsmConstructionItem = {
  id: string
  lat: number
  lng: number
  label: string
  highway?: string
}

/**
 * Query Overpass for ways tagged `highway=construction` near a point.
 * Large `radiusM` when the map is zoomed out can be slow — callers should use a modest radius.
 */
export async function fetchOsmConstructionNear(
  lat: number,
  lng: number,
  radiusM: number,
  signal?: AbortSignal,
): Promise<OsmConstructionItem[]> {
  const query = `[out:json][timeout:20];
(
  way["highway"="construction"](around:${radiusM},${lat},${lng});
);
out center tags;`

  const res = await fetchOverpassInterpreter(query, signal)
  if (!res.ok) return []

  const data = (await res.json()) as {
    elements?: Array<{
      type: string
      id: number
      center?: { lat: number; lon: number }
      tags?: Record<string, string>
    }>
  }

  const out: OsmConstructionItem[] = []
  for (const el of data.elements ?? []) {
    if (el.type !== 'way' || !el.center) continue
    const tags = el.tags ?? {}
    const label =
      tags.name || tags.ref || tags.description || 'Road work (OSM)'
    out.push({
      id: `osm-way-${el.id}`,
      lat: el.center.lat,
      lng: el.center.lon,
      label,
      highway: tags.highway,
    })
  }
  return out
}
