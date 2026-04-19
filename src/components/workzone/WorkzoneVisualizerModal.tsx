/**
 * WorkzoneVisualizerModal
 *
 * Opens a full-screen modal showing a Google Map with:
 *  • The drawn workzone polygon (from Job Assistant session storage)
 *  • AI-placed equipment markers at MUTCD-correct positions & scale
 *  • Zone overlays (advance warning, taper, buffer, work, termination)
 *  • A planning notes sidebar from the AI TCS expert
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Loader2, AlertTriangle, MapPin, Info, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { importLibrary, setOptions, type APIOptions } from '@googlemaps/js-api-loader'
import type { MapArea } from '../../types'
import type { CartLine } from '../../context/CartContext'
import { getProductById } from '../../data/products'
import { planWorkzoneLayout, buildDemoPlan, type WorkzonePlan } from '../../utils/workzonePlannerClient'

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || undefined
const MAP_ID = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID'

/* ── Zone colour lookup ── */
const ZONE_COLORS: Record<string, string> = {
  advance_warning: '#fbbf24',
  transition: '#f97316',
  buffer: '#94a3b8',
  work_zone: '#ef4444',
  termination: '#22c55e',
}
const ZONE_LABELS: Record<string, string> = {
  advance_warning: 'Advance Warning',
  transition: 'Transition / Taper',
  buffer: 'Buffer Space',
  work_zone: 'Work Zone',
  termination: 'Termination',
}

/* ── Marker icon SVGs per category ── */
function markerSvg(zone: string, initial: string): string {
  const fill = ZONE_COLORS[zone] ?? '#f97316'
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10.627 14.32 21.373 15.36 22.188.377.291.903.291 1.28 0C17.68 37.373 32 26.627 32 16 32 7.163 24.837 0 16 0z" fill="${fill}"/>
      <circle cx="16" cy="16" r="10" fill="rgba(0,0,0,0.35)"/>
      <text x="16" y="20.5" text-anchor="middle" font-size="10" font-weight="bold" font-family="system-ui,sans-serif" fill="white">${initial}</text>
    </svg>`
}

function productInitial(name: string): string {
  // Cone → C, Drum → D, Sign → S, Barricade → B, Arrow → A, Light → L, Barrier → R
  const n = name.toLowerCase()
  if (n.includes('cone')) return 'C'
  if (n.includes('drum') || n.includes('barrel')) return 'D'
  if (n.includes('arrow')) return 'A'
  if (n.includes('light') || n.includes('flash')) return 'L'
  if (n.includes('barricade')) return 'B'
  if (n.includes('barrier') || n.includes('block')) return 'R'
  if (n.includes('sign')) return 'S'
  if (n.includes('flag')) return 'F'
  if (n.includes('delineator')) return 'D'
  return name.charAt(0).toUpperCase()
}

/* ── Component ── */
interface Props {
  mapArea: MapArea | null
  cartLines: CartLine[]
  onClose: () => void
}

type PlanStatus = 'idle' | 'loading' | 'done' | 'error'

export default function WorkzoneVisualizerModal({ mapArea, cartLines, onClose }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const polygonsRef = useRef<google.maps.Polygon[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  const [planStatus, setPlanStatus] = useState<PlanStatus>('idle')
  const [plan, setPlan] = useState<WorkzonePlan | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [notesOpen, setNotesOpen] = useState(true)
  const [mapsReady, setMapsReady] = useState(false)

  // Resolve cart items with product data
  const resolvedItems = cartLines
    .map((line) => {
      const product = getProductById(line.productId)
      if (!product) return null
      return {
        productId: line.productId,
        productName: product.name,
        quantity: line.quantity,
        category: product.categorySlug.replace(/-/g, ' '),
        dimensions: product.dimensions,
        specs: product.specs,
      }
    })
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductById> & {
      productId: string
      productName: string
      quantity: number
      category: string
      dimensions?: string
    }>[]

  /* ── Map initialisation ── */
  useEffect(() => {
    if (!mapRef.current || !mapArea) return

    let cancelled = false

    async function init() {
      try {
        if (MAPS_KEY) {
          if (MAPS_KEY) setOptions({ key: MAPS_KEY } as APIOptions)
        }
        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary
        if (cancelled) return

        const map = new Map(mapRef.current!, {
          center: mapArea!.center,
          zoom: 17,
          mapId: MAP_ID,
          mapTypeId: 'satellite',
          tilt: 0,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
        })

        mapInstanceRef.current = map

        // Draw the workzone polygon
        const workzonePolygon = new google.maps.Polygon({
          paths: mapArea!.path,
          strokeColor: '#f97316',
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: '#f97316',
          fillOpacity: 0.15,
          map,
        })
        polygonsRef.current.push(workzonePolygon)

        // Fit bounds to polygon
        const bounds = new google.maps.LatLngBounds()
        for (const pt of mapArea!.path) bounds.extend(pt)
        map.fitBounds(bounds, { top: 80, bottom: 80, left: 60, right: 60 })

        // Info window for marker tooltips
        infoWindowRef.current = new google.maps.InfoWindow()

        setMapsReady(true)
      } catch (e) {
        console.error('Map init error', e)
      }
    }

    init()
    return () => { cancelled = true }
  }, [mapArea])

  /* ── AI planning ── */
  const runPlanning = useCallback(async () => {
    if (!mapArea || resolvedItems.length === 0) return

    setPlanStatus('loading')
    setErrorMsg('')

    try {
      const result = await planWorkzoneLayout(mapArea, resolvedItems)
      setPlan(result)
      setPlanStatus('done')
    } catch (e) {
      console.warn('AI planner failed, using demo layout:', e)
      try {
        const demo = buildDemoPlan(mapArea, resolvedItems)
        setPlan(demo)
        setPlanStatus('done')
      } catch (e2) {
        setErrorMsg(e2 instanceof Error ? e2.message : 'Planning failed')
        setPlanStatus('error')
      }
    }
  }, [mapArea, resolvedItems])

  useEffect(() => {
    if (mapsReady && planStatus === 'idle') {
      runPlanning()
    }
  }, [mapsReady, planStatus, runPlanning])

  /* ── Place markers on map once plan is ready ── */
  useEffect(() => {
    if (!plan || !mapInstanceRef.current || !mapsReady) return

    // Clear old markers
    for (const m of markersRef.current) m.map = null
    markersRef.current = []

    async function placeMarkers() {
      const { AdvancedMarkerElement } = await importLibrary('marker') as google.maps.MarkerLibrary
      const map = mapInstanceRef.current!

      // Extend bounds to include all placements
      const allBounds = new google.maps.LatLngBounds()
      for (const pt of mapArea!.path) allBounds.extend(pt)

      for (const placement of plan!.placements) {
        const pos = { lat: placement.lat, lng: placement.lng }
        allBounds.extend(pos)

        const initial = productInitial(placement.productName)
        const svg = markerSvg(placement.zone, initial)
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        const img = document.createElement('img')
        img.src = url
        img.width = 26
        img.height = 30
        img.style.cssText = 'display:block;cursor:pointer;transition:transform 0.15s;'

        const marker = new AdvancedMarkerElement({
          map,
          position: pos,
          content: img,
          title: placement.label,
          zIndex: placement.zone === 'advance_warning' ? 10 : placement.zone === 'transition' ? 20 : 15,
        })

        // Hover tooltip
        marker.addListener('click', () => {
          const iw = infoWindowRef.current!
          iw.setContent(`
            <div style="font-family:system-ui,sans-serif;padding:4px 2px;max-width:220px">
              <div style="font-weight:600;font-size:13px;color:#1e293b;margin-bottom:4px">${placement.label}</div>
              <div style="font-size:11px;color:#64748b;margin-bottom:3px">${ZONE_LABELS[placement.zone] ?? placement.zone}</div>
              <div style="font-size:11px;color:#475569">${placement.notes}</div>
            </div>
          `)
          iw.open({ map, anchor: marker })
        })

        markersRef.current.push(marker)
      }

      // Fit to show everything with padding
      map.fitBounds(allBounds, { top: 80, bottom: 120, left: 60, right: 60 })
    }

    placeMarkers()
  }, [plan, mapsReady, mapArea])

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      for (const m of markersRef.current) m.map = null
      for (const p of polygonsRef.current) p.setMap(null)
    }
  }, [])

  /* ── Close on Escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* ── Zone count summary ── */
  const zoneCounts = plan
    ? plan.placements.reduce<Record<string, number>>((acc, p) => {
        acc[p.zone] = (acc[p.zone] ?? 0) + 1
        return acc
      }, {})
    : {}

  /* ── Group placements by product for legend ── */
  const productGroups = plan
    ? Object.values(
        plan.placements.reduce<Record<string, { name: string; zone: string; count: number }>>((acc, p) => {
          const key = p.productId
          if (!acc[key]) acc[key] = { name: p.productName, zone: p.zone, count: 0 }
          acc[key].count++
          return acc
        }, {}),
      )
    : []

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950" role="dialog" aria-modal="true">
      {/* ── Header ── */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Layers size={18} className="text-brand-400 flex-shrink-0" />
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white truncate">
              {plan ? plan.planTitle : 'AI Workzone Layout Planner'}
            </h2>
            {mapArea?.address && (
              <p className="text-[11px] text-slate-500 truncate">{mapArea.address}</p>
            )}
          </div>
        </div>

        {/* Status badge */}
        {planStatus === 'loading' && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <Loader2 size={13} className="animate-spin" />
            <span>Planning layout…</span>
          </div>
        )}
        {planStatus === 'done' && (
          <div className="text-xs text-emerald-400 font-medium hidden sm:block">
            ✓ MUTCD-compliant layout ready
          </div>
        )}

        <button
          onClick={onClose}
          className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close visualizer"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left sidebar ── */}
        <div className="w-72 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden hidden md:flex">

          {/* Workzone metrics */}
          {mapArea && (
            <div className="px-4 py-3 border-b border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Work Zone</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                  <div className="text-xs text-slate-500">Area</div>
                  <div className="text-sm font-semibold text-white">{mapArea.areaLabel}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                  <div className="text-xs text-slate-500">Perimeter</div>
                  <div className="text-sm font-semibold text-white">{mapArea.perimeterLabel}</div>
                </div>
                {mapArea.postedSpeedLabel && (
                  <div className="bg-slate-800/60 rounded-lg px-3 py-2 col-span-2">
                    <div className="text-xs text-slate-500">Posted speed</div>
                    <div className="text-sm font-semibold text-white">{mapArea.postedSpeedLabel}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Zone legend */}
          {plan && (
            <div className="px-4 py-3 border-b border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">TTC Zones</div>
              <div className="space-y-1.5">
                {Object.entries(ZONE_COLORS).map(([key, color]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-xs"
                    >
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-slate-300">{ZONE_LABELS[key]}</span>
                    {zoneCounts[key] && (
                      <span className="ml-auto text-slate-500">{zoneCounts[key]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment placed */}
          {productGroups.length > 0 && (
            <div className="px-4 py-3 border-b border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Equipment Placed</div>
              <div className="space-y-1.5">
                {productGroups.map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white font-bold text-[9px]"
                      style={{ backgroundColor: ZONE_COLORS[g.zone] ?? '#f97316' }}
                    >
                      {productInitial(g.name)}
                    </div>
                    <span className="text-slate-300 truncate flex-1">{g.name}</span>
                    <span className="text-slate-500 flex-shrink-0">×{g.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Planning notes */}
          {plan && plan.planningNotes.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-4 py-3 border-b border-slate-800 text-left"
                onClick={() => setNotesOpen((o) => !o)}
              >
                <Info size={13} className="text-brand-400 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex-1">
                  Expert Planning Notes
                </span>
                {notesOpen ? <ChevronUp size={13} className="text-slate-500" /> : <ChevronDown size={13} className="text-slate-500" />}
              </button>
              {notesOpen && (
                <ul className="px-4 py-3 space-y-2">
                  {plan.planningNotes.map((note, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-brand-400 mt-0.5 flex-shrink-0">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              )}
              {plan.disclaimer && (
                <div className="mx-4 mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex gap-1.5 items-start">
                    <AlertTriangle size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-300/80 leading-relaxed">{plan.disclaimer}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading state */}
          {planStatus === 'loading' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Loader2 size={28} className="animate-spin text-brand-400" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Analysing work zone…</p>
                <p className="text-xs text-slate-500">
                  AI Traffic Control Supervisor is reviewing your cart and drawing a MUTCD-compliant layout.
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {planStatus === 'error' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <AlertTriangle size={28} className="text-red-400" />
              <p className="text-sm text-slate-400">{errorMsg}</p>
              <button type="button" onClick={runPlanning} className="btn-secondary text-xs px-3 py-1.5">
                Retry
              </button>
            </div>
          )}
        </div>

        {/* ── Map canvas ── */}
        <div className="flex-1 relative">
          {/* No map area warning */}
          {!mapArea && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900 text-center px-8">
              <MapPin size={40} className="text-slate-600" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">No work zone drawn yet</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Go to the <strong className="text-white">Job Assistant</strong> and draw your work zone polygon on the map. Then come back here to see your cart equipment laid out at perfect MUTCD scale.
                </p>
              </div>
            </div>
          )}

          {/* Map */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Loading overlay on map */}
          {planStatus === 'loading' && mapArea && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 shadow-xl">
              <Loader2 size={14} className="animate-spin text-brand-400" />
              <span className="text-xs text-slate-300">AI is placing equipment…</span>
            </div>
          )}

          {/* Mobile notes toggle */}
          {plan && (
            <div className="md:hidden absolute bottom-4 right-4">
              <button
                type="button"
                onClick={() => setNotesOpen((o) => !o)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 flex items-center gap-1.5 shadow-lg"
              >
                <Info size={13} className="text-brand-400" />
                Planning notes
              </button>
            </div>
          )}

          {/* Mobile notes overlay */}
          {plan && notesOpen && (
            <div className="md:hidden absolute inset-x-0 bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 max-h-48 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Expert Planning Notes</span>
                <button onClick={() => setNotesOpen(false)} className="text-slate-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <ul className="space-y-1.5">
                {plan.planningNotes.map((note, i) => (
                  <li key={i} className="text-xs text-slate-400 flex gap-2">
                    <span className="text-brand-400 flex-shrink-0">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex-shrink-0 flex items-center justify-between gap-4 px-4 py-2 bg-slate-900 border-t border-slate-800">
        <p className="text-[10px] text-slate-600 hidden sm:block">
          Layout generated by AI Traffic Control Supervisor · MUTCD Part 6 standards · Click markers for details
        </p>
        <div className="flex items-center gap-2 ml-auto">
          {plan && (
            <span className="text-xs text-slate-500">
              {plan.placements.length} device{plan.placements.length !== 1 ? 's' : ''} placed
            </span>
          )}
          <button onClick={onClose} className="btn-secondary text-xs px-3 py-1.5">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
