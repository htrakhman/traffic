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

  return plan
}

/** Demo/fallback plan when AI is unavailable — generates a synthetic MUTCD layout */
export function buildDemoPlan(mapArea: MapArea, items: CartItemInput[]): WorkzonePlan {
  const { center, footprintMinSpanFt = 40, footprintMaxSpanFt = 120, postedSpeedMph = 35 } = mapArea

  const latDeg = ftToLatDeg()
  const lngDeg = ftToLngDeg(center.lat)

  // Road runs along long axis; assume northbound traffic by default
  const roadRunsNS = (footprintMaxSpanFt ?? 120) >= (footprintMinSpanFt ?? 40) * 1.5

  const placements: WorkzonePlacement[] = []

  // Advance warning distance based on speed
  const awDist = postedSpeedMph >= 55 ? 1200 : postedSpeedMph >= 45 ? 800 : postedSpeedMph >= 25 ? 450 : 250

  let placementIndex = 0

  for (const item of items) {
    for (let q = 0; q < item.quantity; q++) {
      // Spread items along the road axis
      const fraction = item.quantity > 1 ? q / (item.quantity - 1) : 0.5
      const cat = item.category.toLowerCase()

      let lat = center.lat
      let lng = center.lng
      let zone: WorkzonePlacement['zone'] = 'work_zone'
      let label = `${item.productName} ${q + 1}`
      let notes = ''

      if (cat.includes('sign')) {
        // Signs go upstream in advance warning
        const dist = awDist + q * 150
        lat = roadRunsNS
          ? center.lat + dist * latDeg
          : center.lat + (q * 30) * latDeg
        lng = roadRunsNS
          ? center.lng + (q % 2 === 0 ? -8 : 8) * lngDeg
          : center.lng - dist * lngDeg
        zone = 'advance_warning'
        notes = `Advance warning sign ~${dist} ft upstream of taper`
      } else if (cat.includes('arrow') || cat.includes('board')) {
        // Arrow board at taper start
        const dist = 50
        lat = roadRunsNS ? center.lat + dist * latDeg : center.lat
        lng = roadRunsNS ? center.lng - 6 * lngDeg : center.lng - dist * lngDeg
        zone = 'transition'
        notes = 'Trailer arrow board at upstream end of taper'
      } else if (cat.includes('cone') || cat.includes('drum') || cat.includes('barrel')) {
        // Cones/drums along taper and work zone edges
        const spacing = postedSpeedMph >= 45 ? 40 : 20
        const taperLen = Math.min(footprintMaxSpanFt * 0.4, 200)
        const taperCones = Math.ceil(taperLen / spacing)
        if (q < taperCones) {
          // Taper placement
          const progress = q / Math.max(taperCones - 1, 1)
          const distAlong = taperLen * (1 - progress) // upstream first
          const lateralOffset = footprintMinSpanFt * 0.5 * (1 - progress) // diagonal
          lat = roadRunsNS ? center.lat + distAlong * latDeg : center.lat - lateralOffset * latDeg
          lng = roadRunsNS ? center.lng - lateralOffset * lngDeg : center.lng - distAlong * lngDeg
          zone = 'transition'
          notes = `Taper device ${q + 1} of ${taperCones}`
        } else {
          // Work zone edge
          const edgeIdx = q - taperCones
          const edgeDist = -(edgeIdx * (postedSpeedMph >= 45 ? 60 : 40))
          lat = roadRunsNS ? center.lat + edgeDist * latDeg : center.lat + edgeIdx * 30 * latDeg
          lng = roadRunsNS ? center.lng - (footprintMinSpanFt * 0.5) * lngDeg : center.lng + edgeDist * lngDeg
          zone = 'work_zone'
          notes = `Work zone edge device — ${Math.abs(Math.round(edgeDist))} ft into work area`
        }
      } else if (cat.includes('barricade') || cat.includes('barrier')) {
        const spacing = 20
        const offsetAlongRoad = -(q * spacing)
        lat = roadRunsNS ? center.lat + offsetAlongRoad * latDeg : center.lat + fraction * 40 * latDeg
        lng = roadRunsNS ? center.lng - (footprintMinSpanFt * 0.45) * lngDeg : center.lng + offsetAlongRoad * lngDeg
        zone = 'work_zone'
        notes = `Work zone barricade ${q + 1} — active edge protection`
      } else if (cat.includes('light') || cat.includes('flash')) {
        const spacing = 30
        const offsetAlongRoad = -(q * spacing)
        lat = roadRunsNS ? center.lat + offsetAlongRoad * latDeg : center.lat + fraction * 30 * latDeg
        lng = roadRunsNS ? center.lng - (footprintMinSpanFt * 0.46) * lngDeg : center.lng + offsetAlongRoad * lngDeg
        zone = 'work_zone'
        notes = `Warning light ${q + 1} — mounted on adjacent device`
      } else {
        // Generic: spread around work zone
        lat = center.lat + (fraction - 0.5) * footprintMaxSpanFt * latDeg * 0.8
        lng = center.lng
        zone = 'work_zone'
        notes = `Work zone device ${q + 1}`
      }

      placements.push({
        productId: item.productId,
        productName: item.productName,
        lat,
        lng,
        rotation: 0,
        zone,
        label,
        notes,
      })
      placementIndex++
    }
  }

  return {
    planTitle: `MUTCD Part 6 Traffic Control Plan — ${mapArea.address ?? 'Work Zone'}`,
    trafficFlowDirection: 'northbound',
    upstreamEnd: 'north' as const,
    placements,
    zones: [
      { name: 'Advance Warning Area', color: '#fbbf24', description: 'Warning signs alert approaching drivers of upcoming work zone conditions.', startDistanceFt: awDist + 200, endDistanceFt: awDist },
      { name: 'Transition/Taper Area', color: '#f97316', description: 'Cones/drums guide traffic laterally into the adjusted lane path.', startDistanceFt: awDist, endDistanceFt: 0 },
      { name: 'Buffer Space', color: '#64748b', description: 'Safety buffer between taper and active work area — keep clear of workers and equipment.', startDistanceFt: 0, endDistanceFt: -100 },
      { name: 'Work Zone', color: '#dc2626', description: 'Active construction/maintenance area. Workers and equipment present.', startDistanceFt: -100, endDistanceFt: -(footprintMaxSpanFt + 100) },
      { name: 'Termination Area', color: '#22c55e', description: 'Traffic transitions back to normal lane configuration downstream.', startDistanceFt: -(footprintMaxSpanFt + 100), endDistanceFt: -(footprintMaxSpanFt + 250) },
    ],
    planningNotes: [
      `Advance warning signs placed ~${awDist} ft upstream based on ${postedSpeedMph} mph posted speed (MUTCD Table 6C-1)`,
      `Taper length calculated per MUTCD formula: L = W × S (${Math.round(footprintMinSpanFt / 2)} ft × ${postedSpeedMph} mph)`,
      'All retroreflective devices must meet MUTCD Section 6F standards',
      'Assign a qualified flagger if single-lane alternating traffic is required',
      'Verify placement with your state DOT TCP before opening to traffic',
    ],
    disclaimer: 'These positions are AI-generated planning guidance based on MUTCD Part 6 standards. Field conditions, state DOT supplements, and project-specific TCP requirements take precedence. A certified Traffic Control Supervisor must approve the final plan.',
  }
}
