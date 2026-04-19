/**
 * AI-powered MUTCD-compliant workzone layout planner.
 *
 * Sends the drawn polygon + cart items to the AI, which acts as an expert
 * Traffic Control Supervisor and returns precise lat/lng positions for every
 * piece of equipment following MUTCD Part 6 standards.
 */

import type { MapArea } from '../types'
import { SITE_NAME } from '../config/site'

const CHAT_PROXY_URL = '/api/chat'

export interface WorkzonePlacement {
  productId: string
  productName: string
  lat: number
  lng: number
  /** Clockwise degrees from north — used to rotate icons */
  rotation: number
  zone: 'advance_warning' | 'transition' | 'buffer' | 'work_zone' | 'termination'
  label: string
  notes: string
}

export interface WorkzoneZone {
  name: string
  color: string
  description: string
  /** Distance from start of polygon (upstream end) in feet */
  startDistanceFt: number
  endDistanceFt: number
}

export interface WorkzonePlan {
  planTitle: string
  trafficFlowDirection: string
  zones: WorkzoneZone[]
  placements: WorkzonePlacement[]
  planningNotes: string[]
  disclaimer: string
  /** Which end of the polygon is "upstream" (approach side) */
  upstreamEnd: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest'
}

interface CartItemInput {
  productId: string
  productName: string
  quantity: number
  category: string
  dimensions?: string
  specs?: Record<string, string>
}

function ftToLatDeg(): number {
  // 1 foot = 1/364000 degrees latitude (approx, valid globally)
  return 1 / 364000
}

function ftToLngDeg(lat: number): number {
  return 1 / (364000 * Math.cos((lat * Math.PI) / 180))
}

type LL = { lat: number; lng: number }

/** Local equirectangular feet (x east, y north) relative to `origin`. */
const R_FT = 6371000 * 3.280839895

function llDeltaToFt(p: LL, origin: LL): { x: number; y: number } {
  const m = (origin.lat * Math.PI) / 180
  const dLatRad = ((p.lat - origin.lat) * Math.PI) / 180
  const dLngRad = ((p.lng - origin.lng) * Math.PI) / 180
  return { x: R_FT * Math.cos(m) * dLngRad, y: R_FT * dLatRad }
}

function ftDeltaToLl(xy: { x: number; y: number }, origin: LL): LL {
  const m = (origin.lat * Math.PI) / 180
  const lat = origin.lat + (xy.y / R_FT) * (180 / Math.PI)
  const lng = origin.lng + (xy.x / (R_FT * Math.cos(m))) * (180 / Math.PI)
  return { lat, lng }
}

function polygonCentroid(path: LL[]): LL {
  let la = 0
  let ln = 0
  for (const p of path) {
    la += p.lat
    ln += p.lng
  }
  const n = path.length || 1
  return { lat: la / n, lng: ln / n }
}

function nearestPointOnSegmentXY(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): { x: number; y: number } {
  const abx = bx - ax
  const aby = by - ay
  const apx = px - ax
  const apy = py - ay
  const ab2 = abx * abx + aby * aby
  let t = ab2 < 1e-20 ? 0 : (apx * abx + apy * aby) / ab2
  t = Math.max(0, Math.min(1, t))
  return { x: ax + t * abx, y: ay + t * aby }
}

function nearestOnPolygonBoundaryFt(p: LL, path: LL[], origin: LL): { point: LL; distFt: number } {
  const xyP = llDeltaToFt(p, origin)
  let bestD = Infinity
  let best = { x: xyP.x, y: xyP.y }
  for (let i = 0; i < path.length; i++) {
    const a = path[i]
    const b = path[(i + 1) % path.length]
    const xyA = llDeltaToFt(a, origin)
    const xyB = llDeltaToFt(b, origin)
    const q = nearestPointOnSegmentXY(xyP.x, xyP.y, xyA.x, xyA.y, xyB.x, xyB.y)
    const d = Math.hypot(xyP.x - q.x, xyP.y - q.y)
    if (d < bestD) {
      bestD = d
      best = q
    }
  }
  return { point: ftDeltaToLl(best, origin), distFt: bestD }
}

function perimeterLengthFt(path: LL[], origin: LL): number {
  let s = 0
  for (let i = 0; i < path.length; i++) {
    const a = path[i]
    const b = path[(i + 1) % path.length]
    const xyA = llDeltaToFt(a, origin)
    const xyB = llDeltaToFt(b, origin)
    s += Math.hypot(xyB.x - xyA.x, xyB.y - xyA.y)
  }
  return Math.max(s, 1)
}

/** Point at arc-length `s` (ft, mod perimeter) along closed polygon. */
function pointOnPolygonPerimeter(path: LL[], origin: LL, s: number): LL {
  const total = perimeterLengthFt(path, origin)
  let u = ((s % total) + total) % total
  for (let i = 0; i < path.length; i++) {
    const a = path[i]
    const b = path[(i + 1) % path.length]
    const xyA = llDeltaToFt(a, origin)
    const xyB = llDeltaToFt(b, origin)
    const L = Math.hypot(xyB.x - xyA.x, xyB.y - xyA.y)
    if (u <= L) {
      const t = L < 1e-9 ? 0 : u / L
      const xy = { x: xyA.x + t * (xyB.x - xyA.x), y: xyA.y + t * (xyB.y - xyA.y) }
      return ftDeltaToLl(xy, origin)
    }
    u -= L
  }
  return path[0]
}

/** Upstream unit vector in ft space + a vertex on that end of the footprint (for demo signs). */
function upstreamFrame(path: LL[], origin: LL): { uUp: { x: number; y: number }; upstreamVertex: LL } {
  const xyVerts = path.map((p) => llDeltaToFt(p, origin))
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const v of xyVerts) {
    minX = Math.min(minX, v.x)
    maxX = Math.max(maxX, v.x)
    minY = Math.min(minY, v.y)
    maxY = Math.max(maxY, v.y)
  }
  const sx = maxX - minX
  const sy = maxY - minY
  if (sx >= sy) {
    const idx = xyVerts.reduce((ib, v, i) => (v.x < xyVerts[ib].x ? i : ib), 0)
    return { uUp: { x: -1, y: 0 }, upstreamVertex: path[idx] }
  }
  const idx = xyVerts.reduce((ib, v, i) => (v.y < xyVerts[ib].y ? i : ib), 0)
  return { uUp: { x: 0, y: -1 }, upstreamVertex: path[idx] }
}

function normalizeXY(v: { x: number; y: number }): { x: number; y: number } {
  const h = Math.hypot(v.x, v.y)
  if (h < 1e-9) return { x: 1, y: 0 }
  return { x: v.x / h, y: v.y / h }
}

/** Pull rogue coordinates back toward the drawn polygon so previews stay on the job site. */
function clampPlacementsToDrawnZone(mapArea: MapArea, placements: WorkzonePlacement[]): void {
  const path = mapArea.path
  if (!path?.length) return
  const origin = polygonCentroid(path)
  const perim = mapArea.perimeterFt > 0 ? mapArea.perimeterFt : perimeterLengthFt(path, origin)

  for (const pl of placements) {
    const p = { lat: pl.lat, lng: pl.lng }
    const { point: q, distFt } = nearestOnPolygonBoundaryFt(p, path, origin)

    const isUpstream = pl.zone === 'advance_warning'
    const maxBand = isUpstream
      ? Math.min(1400, Math.max(380, perim * 0.55))
      : Math.min(220, Math.max(50, perim * 0.11 + 40))

    if (distFt <= maxBand) continue

    const xyP = llDeltaToFt(p, origin)
    const xyQ = llDeltaToFt(q, origin)
    const vx = xyP.x - xyQ.x
    const vy = xyP.y - xyQ.y
    const h = Math.hypot(vx, vy)
    if (h < 1e-9) {
      pl.lat = q.lat
      pl.lng = q.lng
      continue
    }
    const xyN = { x: xyQ.x + (vx / h) * maxBand, y: xyQ.y + (vy / h) * maxBand }
    const nxt = ftDeltaToLl(xyN, origin)
    pl.lat = nxt.lat
    pl.lng = nxt.lng
  }
}

function spreadCollidingPlacements(mapArea: MapArea, placements: WorkzonePlacement[], minFt: number): void {
  const path = mapArea.path
  if (!path?.length || placements.length < 2) return
  const origin = polygonCentroid(path)
  const passes = Math.min(5, placements.length)
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 0; i < placements.length; i++) {
      for (let j = 0; j < i; j++) {
        const xyI = llDeltaToFt({ lat: placements[i].lat, lng: placements[i].lng }, origin)
        const xyJ = llDeltaToFt({ lat: placements[j].lat, lng: placements[j].lng }, origin)
        let dx = xyI.x - xyJ.x
        let dy = xyI.y - xyJ.y
        let d = Math.hypot(dx, dy)
        if (d >= minFt || d < 1e-8) continue
        dx /= d
        dy /= d
        const push = (minFt - d) / 2 + 4
        const perp = pass % 2 === 0 ? { x: -dy, y: dx } : { x: dy, y: -dx }
        const k = 1 + (i % 3)
        xyI.x += dx * push + perp.x * k * 5
        xyI.y += dy * push + perp.y * k * 5
        const out = ftDeltaToLl(xyI, origin)
        placements[i].lat = out.lat
        placements[i].lng = out.lng
      }
    }
  }
}

/** Post-process AI or demo layouts: keep devices hugging the drawn footprint and separate pile-ups. */
export function finalizeWorkzonePlan(mapArea: MapArea, plan: WorkzonePlan): WorkzonePlan {
  const placements = plan.placements.map((p) => ({ ...p }))
  clampPlacementsToDrawnZone(mapArea, placements)
  spreadCollidingPlacements(mapArea, placements, 26)
  clampPlacementsToDrawnZone(mapArea, placements)
  return { ...plan, placements }
}

function buildPlannerPrompt(mapArea: MapArea, items: CartItemInput[]): string {
  const { center, path, areaFt2, perimeterFt, areaLabel, perimeterLabel, address, postedSpeedMph, footprintMinSpanFt, footprintMaxSpanFt } = mapArea

  const latDeg = ftToLatDeg()
  const lngDeg = ftToLngDeg(center.lat)

  const verticesStr = path
    .map((p, i) => `  Vertex ${i + 1}: {lat: ${p.lat.toFixed(7)}, lng: ${p.lng.toFixed(7)}}`)
    .join('\n')

  const itemsStr = items
    .map((item) => {
      const dimStr = item.dimensions ? ` | Dimensions: ${item.dimensions}` : ''
      return `  - productId: "${item.productId}", name: "${item.productName}", qty: ${item.quantity}, category: "${item.category}"${dimStr}`
    })
    .join('\n')

  const speedNote = postedSpeedMph
    ? `Posted speed limit: ${postedSpeedMph} mph`
    : 'Posted speed: unknown (assume 35 mph for spacing calculations)'

  const footprintNote =
    footprintMinSpanFt && footprintMaxSpanFt
      ? `Axis-aligned bounding box: ~${Math.round(footprintMinSpanFt)} ft (narrow) × ~${Math.round(footprintMaxSpanFt)} ft (long)`
      : ''

  return `You are an expert certified Traffic Control Supervisor (TCS) with MUTCD Part 6 mastery and 20 years of field experience. A contractor has drawn their work zone on a map and has rental equipment in their cart. Your job is to produce a professional, MUTCD-compliant traffic control layout — placing every piece of equipment at the exact correct lat/lng position following applicable standards.

## WORK ZONE DATA
Centroid: {lat: ${center.lat.toFixed(7)}, lng: ${center.lng.toFixed(7)}}
Area: ${areaLabel} (${Math.round(areaFt2).toLocaleString()} sq ft)
Perimeter: ${perimeterLabel} (${Math.round(perimeterFt).toLocaleString()} ft)
${address ? `Address: ${address}` : ''}
${speedNote}
${footprintNote}

Polygon vertices (the drawn work zone boundary):
${verticesStr}

## COORDINATE MATH (use these exact conversion factors)
At lat ${center.lat.toFixed(4)}°:
  1 foot NORTH  = +${latDeg.toFixed(9)} degrees latitude
  1 foot SOUTH  = -${latDeg.toFixed(9)} degrees latitude
  1 foot EAST   = +${lngDeg.toFixed(9)} degrees longitude
  1 foot WEST   = -${lngDeg.toFixed(9)} degrees longitude

## CART EQUIPMENT (place ALL of these, total each quantity)
${itemsStr}

## YOUR TASK
1. Examine the polygon shape to determine the road's long axis (north-south, east-west, etc.) and which end is upstream (where traffic approaches from).
2. Apply MUTCD Part 6 spacing rules:
   - Advance warning signs: ${postedSpeedMph && postedSpeedMph >= 55 ? '1000–1500 ft' : postedSpeedMph && postedSpeedMph >= 45 ? '500–1000 ft' : postedSpeedMph && postedSpeedMph >= 25 ? '350–500 ft' : '100–350 ft'} upstream of the taper for the posted speed
   - Taper/transition cones or drums: at ${postedSpeedMph && postedSpeedMph >= 45 ? '40 ft' : '20 ft'} intervals along the taper diagonal
   - Buffer space cones/drums: ${postedSpeedMph && postedSpeedMph >= 45 ? '60 ft' : '40 ft'} spacing along work zone edges
   - Work zone barricades/barriers: line the active work edge
   - Arrow board (if present): at the upstream end of the taper
   - Termination: downstream end, channelizing back to full lanes
3. Generate a lat/lng position for EVERY individual unit of each item (if quantity=20 cones, produce 20 separate placement entries).
4. Keep placement coordinates within a logical distance from the polygon — advance warning signs may be 500–1500 ft upstream but should not be miles away.
5. Spread equipment realistically — do not stack all items on the centroid.
6. CRITICAL — stay on the job geometry: channelizing devices (cones, drums, barricades, water barriers, delineators) and buffer/work-zone lights MUST lie within about 200 ft of the drawn polygon boundary OR inside the polygon—place them along the polygon edges and realistic taper legs, never in a single vertical/horizontal pile far from the outline (e.g. not on adjacent buildings or parking lots). Consecutive like devices along one edge should be spaced roughly 20–40 ft apart unless forming a continuous barrier line.
7. Use the polygon vertices to infer where the roadway runs; advance-warning signs may sit farther upstream along that approach axis, but still on/near the same road centerline—not offset hundreds of feet sideways into unrelated parcels.

## OUTPUT FORMAT
Respond with VALID JSON ONLY — no markdown, no prose before or after, no code fences. Schema:
{
  "planTitle": "string — descriptive title for this TTC plan",
  "trafficFlowDirection": "northbound|southbound|eastbound|westbound|northeast|...",
  "upstreamEnd": "north|south|east|west|northeast|northwest|southeast|southwest",
  "zones": [
    {
      "name": "Advance Warning Area",
      "color": "#fbbf24",
      "description": "string",
      "startDistanceFt": 1200,
      "endDistanceFt": 500
    },
    {
      "name": "Transition/Taper Area",
      "color": "#f97316",
      "description": "string",
      "startDistanceFt": 500,
      "endDistanceFt": 100
    },
    {
      "name": "Buffer Space",
      "color": "#64748b",
      "description": "string",
      "startDistanceFt": 100,
      "endDistanceFt": 0
    },
    {
      "name": "Work Zone",
      "color": "#dc2626",
      "description": "string",
      "startDistanceFt": 0,
      "endDistanceFt": -300
    },
    {
      "name": "Termination Area",
      "color": "#22c55e",
      "description": "string",
      "startDistanceFt": -300,
      "endDistanceFt": -500
    }
  ],
  "placements": [
    {
      "productId": "prod-X",
      "productName": "...",
      "lat": 40.1234567,
      "lng": -100.1234567,
      "rotation": 0,
      "zone": "advance_warning|transition|buffer|work_zone|termination",
      "label": "Sign 1",
      "notes": "Road Work Ahead — 800 ft upstream of taper"
    }
  ],
  "planningNotes": [
    "string note 1",
    "string note 2"
  ],
  "disclaimer": "These positions are AI-generated planning guidance. Field conditions, state DOT supplements, and project-specific TCP requirements take precedence."
}

CRITICAL: Place ALL ${items.reduce((s, i) => s + i.quantity, 0)} individual equipment units. Every item in the cart must appear in placements[] with correct lat/lng calculated using the coordinate math above.`
}

export async function planWorkzoneLayout(
  mapArea: MapArea,
  items: CartItemInput[],
): Promise<WorkzonePlan> {
  const prompt = buildPlannerPrompt(mapArea, items)

  const response = await fetch(CHAT_PROXY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      max_tokens: 8000,
      system: `You are an expert certified Traffic Control Supervisor for ${SITE_NAME}. You output MUTCD-compliant equipment layout plans as valid JSON only. No markdown fences, no prose — pure JSON object.`,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Planner AI request failed (HTTP ${response.status})`)
  }

  const data = await response.json() as { content: { text: string }[] }
  const raw = data.content?.[0]?.text ?? ''

  // Extract JSON — strip any accidental markdown fences
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in planner AI response')

  const plan = JSON.parse(jsonMatch[0]) as WorkzonePlan

  // Validate minimum structure
  if (!Array.isArray(plan.placements)) {
    throw new Error('Planner response missing placements array')
  }

  return finalizeWorkzonePlan(mapArea, plan)
}

/** Demo/fallback plan when AI is unavailable — devices hug the drawn polygon perimeter */
export function buildDemoPlan(mapArea: MapArea, items: CartItemInput[]): WorkzonePlan {
  const path = mapArea.path
  const { footprintMinSpanFt = 40, footprintMaxSpanFt = 120, postedSpeedMph = 35 } = mapArea
  const awDist =
    postedSpeedMph >= 55 ? 1100 : postedSpeedMph >= 45 ? 700 : postedSpeedMph >= 25 ? 420 : 260

  if (!path?.length) {
    return finalizeWorkzonePlan(mapArea, {
      planTitle: `Traffic Control Plan — ${mapArea.address ?? 'Work Zone'}`,
      trafficFlowDirection: 'northbound',
      upstreamEnd: 'north',
      placements: [],
      zones: [],
      planningNotes: ['Draw a work zone polygon to preview equipment on the map.'],
      disclaimer:
        'These positions are planning guidance only. A certified Traffic Control Supervisor must approve the final plan.',
    })
  }

  const origin = polygonCentroid(path)
  const perim = perimeterLengthFt(path, origin)
  const { uUp, upstreamVertex } = upstreamFrame(path, origin)
  const upUnit = normalizeXY(uUp)

  type Slot = { item: CartItemInput; unitIndex: number; cat: string }
  const slots: Slot[] = []
  for (const item of items) {
    const cat = item.category.toLowerCase()
    for (let q = 0; q < item.quantity; q++) slots.push({ item, unitIndex: q, cat })
  }

  const isSign = (s: Slot) => s.cat.includes('sign')
  const isArrow = (s: Slot) => s.cat.includes('arrow') || s.cat.includes('board')
  const isEdge = (s: Slot) =>
    s.cat.includes('cone') ||
    s.cat.includes('drum') ||
    s.cat.includes('barrel') ||
    s.cat.includes('barricade') ||
    s.cat.includes('barrier') ||
    s.cat.includes('light') ||
    s.cat.includes('flash')

  const signs = slots.filter(isSign)
  const arrows = slots.filter(isArrow)
  const edgeLike = slots.filter((s) => !isSign(s) && !isArrow(s) && isEdge(s))
  const misc = slots.filter((s) => !isSign(s) && !isArrow(s) && !isEdge(s))

  const placements: WorkzonePlacement[] = []

  signs.forEach((s, k) => {
    const xyV = llDeltaToFt(upstreamVertex, origin)
    const off = awDist + k * 130
    const ll = ftDeltaToLl({ x: xyV.x + upUnit.x * off, y: xyV.y + upUnit.y * off }, origin)
    placements.push({
      productId: s.item.productId,
      productName: s.item.productName,
      lat: ll.lat,
      lng: ll.lng,
      rotation: 0,
      zone: 'advance_warning',
      label: `${s.item.productName} ${k + 1}`,
      notes: `Advance warning ~${Math.round(off)} ft upstream along approach`,
    })
  })

  arrows.forEach((s, k) => {
    const xyV = llDeltaToFt(upstreamVertex, origin)
    const back = 55 + k * 28
    const ll = ftDeltaToLl({ x: xyV.x + upUnit.x * back, y: xyV.y + upUnit.y * back }, origin)
    placements.push({
      productId: s.item.productId,
      productName: s.item.productName,
      lat: ll.lat,
      lng: ll.lng,
      rotation: 0,
      zone: 'transition',
      label: `${s.item.productName} ${k + 1}`,
      notes: 'Arrow board near upstream taper (demo)',
    })
  })

  const nEdge = edgeLike.length
  edgeLike.forEach((s, i) => {
    const u = nEdge > 0 ? (i + 0.5) / nEdge : 0
    const arc = u * perim
    const ll = pointOnPolygonPerimeter(path, origin, arc)
    let zone: WorkzonePlacement['zone'] = 'work_zone'
    if (s.cat.includes('light') || s.cat.includes('flash')) zone = 'buffer'
    placements.push({
      productId: s.item.productId,
      productName: s.item.productName,
      lat: ll.lat,
      lng: ll.lng,
      rotation: 0,
      zone,
      label: `${s.item.productName} ${s.unitIndex + 1}`,
      notes: 'Along drawn work zone perimeter (demo layout)',
    })
  })

  const nMisc = misc.length
  misc.forEach((s, i) => {
    const span = 0.65
    const start = (1 - span) / 2
    const u = nMisc > 0 ? start + ((i + 0.5) / nMisc) * span : 0.5
    const arc = u * perim
    const ll = pointOnPolygonPerimeter(path, origin, arc)
    placements.push({
      productId: s.item.productId,
      productName: s.item.productName,
      lat: ll.lat,
      lng: ll.lng,
      rotation: 0,
      zone: 'work_zone',
      label: `${s.item.productName} ${s.unitIndex + 1}`,
      notes: 'Work area device (demo)',
    })
  })

  const raw: WorkzonePlan = {
    planTitle: `MUTCD Part 6 Traffic Control Plan — ${mapArea.address ?? 'Work Zone'}`,
    trafficFlowDirection: 'northbound',
    upstreamEnd: 'north',
    placements,
    zones: [
      {
        name: 'Advance Warning Area',
        color: '#fbbf24',
        description: 'Warning signs upstream of the drawn work space.',
        startDistanceFt: awDist + 200,
        endDistanceFt: awDist,
      },
      {
        name: 'Transition/Taper Area',
        color: '#f97316',
        description: 'Channelization at the approach to the footprint.',
        startDistanceFt: awDist,
        endDistanceFt: 0,
      },
      {
        name: 'Buffer Space',
        color: '#64748b',
        description: 'Buffer between traffic and active work.',
        startDistanceFt: 0,
        endDistanceFt: -80,
      },
      {
        name: 'Work Zone',
        color: '#dc2626',
        description: 'Area inside / along the drawn polygon.',
        startDistanceFt: -80,
        endDistanceFt: -(footprintMaxSpanFt + 80),
      },
      {
        name: 'Termination Area',
        color: '#22c55e',
        description: 'Downstream transition (conceptual).',
        startDistanceFt: -(footprintMaxSpanFt + 80),
        endDistanceFt: -(footprintMaxSpanFt + 220),
      },
    ],
    planningNotes: [
      `Demo layout: channelizing gear is distributed along your ${Math.round(perim)} ft outline instead of a single line off-site.`,
      `Advance spacing uses ~${awDist} ft for ${postedSpeedMph} mph (planning heuristic).`,
      `Footprint span ~${Math.round(footprintMinSpanFt)}×~${Math.round(footprintMaxSpanFt)} ft — adjust quantities in chat if this still feels heavy for the patch size.`,
      'Verify with your state DOT TCP before opening to traffic.',
    ],
    disclaimer:
      'These positions are AI/demo planning guidance based on MUTCD Part 6 concepts. Field conditions and agency requirements take precedence.',
  }

  return finalizeWorkzonePlan(mapArea, raw)
}
