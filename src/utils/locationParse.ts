/** Decimal degrees only (addresses and mileposts use Geocoder separately). */

function validLatLng(lat: number, lng: number): boolean {
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
}

/** Parse "lat, lng" from one line only (map search box). */
export function parseLatLngPlain(s: string): { lat: number; lng: number } | null {
  const t = s.trim()
  const m = t.match(/^(-?\d{1,2}(?:\.\d+)?)\s*[,;]\s*(-?\d{1,3}(?:\.\d+)?)$/)
  if (!m) return null
  const lat = Number.parseFloat(m[1])
  const lng = Number.parseFloat(m[2])
  return validLatLng(lat, lng) ? { lat, lng } : null
}

/**
 * Find WGS84 decimal degrees in free text (own line, after Location:, or loose pair).
 */
export function parseLatLngFromMessage(text: string): { lat: number; lng: number } | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  const whole = parseLatLngPlain(trimmed)
  if (whole) return whole

  for (const line of trimmed.split(/\n/)) {
    const loc = line.match(
      /^(?:location|address|site|map|center|pin|coords?|lat\s*\/\s*lng)\s*[:#]\s*(.+)$/i,
    )
    if (loc?.[1]) {
      const inner = parseLatLngPlain(loc[1])
      if (inner) return inner
    }
    const pair = parseLatLngPlain(line)
    if (pair) return pair
  }

  const loose = trimmed.match(
    /(-?\d{1,2}(?:\.\d{5,}))\s*[,; ]\s*(-?\d{1,3}(?:\.\d{5,}))/,
  )
  if (loose) {
    const lat = Number.parseFloat(loose[1])
    const lng = Number.parseFloat(loose[2])
    if (validLatLng(lat, lng)) return { lat, lng }
  }

  return null
}

/**
 * First explicit address / place line for Geocoder (highways, mileposts, city addresses).
 * Skips lines that look like pure coordinates (handled by parseLatLngFromMessage).
 */
export function extractGeocodeQueryFromMessage(text: string): string | null {
  for (const line of text.split('\n')) {
    const raw = line.trim()
    if (!raw) continue
    if (parseLatLngPlain(raw)) continue
    const m = raw.match(
      /^(?:location|address|site|map(?:\s+to)?|go\s+to|center|near|pin)\s*[:#]\s*(.+)$/i,
    )
    if (m?.[1]) {
      const q = m[1].trim()
      if (q.length >= 3) return q
    }
  }
  return null
}
