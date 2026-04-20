/**
 * WorkzoneVisualizerModal
 *
 * Opens a full-screen modal showing a Google Map with:
 *  • The drawn workzone polygon (from Job Assistant session storage)
 *  • AI-placed equipment markers (catalog product photos, zone-colored frames, zoom-scaled)
 *  • Zone overlays (advance warning, taper, buffer, work, termination)
 *  • A planning notes sidebar from the AI TCS expert
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Loader2, AlertTriangle, MapPin, Info, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { importLibrary, setOptions, type APIOptions } from '@googlemaps/js-api-loader'
import type { MapArea } from '../../types'
import type { CartLine } from '../../context/CartContext'
import { getProductById } from '../../data/products'
import {
  planWorkzoneLayout,
  buildDemoPlan,
  clampLatLngToPolygonInterior,
  type WorkzonePlan,
  type WorkzonePlacement,
} from '../../utils/workzonePlannerClient'

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

const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect fill="#1e293b" width="80" height="80" rx="10"/><path fill="#64748b" d="M28 52 L40 24 L52 52z"/></svg>',
)}`

function markerCategoryScale(productId: string): number {
  const p = getProductById(productId)
  const slug = (p?.categorySlug ?? '').toLowerCase()
  const name = (p?.name ?? '').toLowerCase()
  if (slug.includes('light') || name.includes('light') || name.includes('flash') || slug.includes('flag')) return 0.56
  if (slug.includes('cone') || slug.includes('drum') || name.includes('drum')) return 0.9
  if (slug.includes('barricade') || slug.includes('barrier') || slug.includes('sign')) return 0.85
  return 0.72
}

/**
 * Square marker width/height in CSS px — shrinks when zoomed out / many devices;
 * categoryScale makes lights/flags smaller than cones or drums at the same zoom.
 */
function markerFramePx(zoom: number, placementCount: number, categoryScale: number): number {
  const z = Number.isFinite(zoom) ? zoom : 17
  const t = Math.min(1, Math.max(0, (z - 12) / 8.5))
  let px = Math.min(76, Math.max(20, Math.round(26 + t * 46)))
  const density = Math.min(1, Math.max(0.28, 34 / Math.sqrt(Math.max(placementCount, 6))))
  px = Math.round(px * density * categoryScale)
  return Math.min(64, Math.max(16, px))
}

function clusterFramePx(zoom: number): number {
  const z = Number.isFinite(zoom) ? zoom : 16
  return Math.round(Math.min(54, Math.max(26, 30 + (z - 13) * 3.5)))
}

type DisplayEntry =
  | { kind: 'single'; placement: WorkzonePlacement }
  | { kind: 'cluster'; lat: number; lng: number; count: number }

function buildDisplayEntries(
  zoom: number,
  placements: WorkzonePlacement[],
  path: { lat: number; lng: number }[] | undefined,
): DisplayEntry[] {
  const n = placements.length
  const pathOk = path && path.length >= 3
  const clusterMode = pathOk && n > 10 && zoom <= 16
  if (!clusterMode) {
    return placements.map((placement) => ({ kind: 'single', placement }))
  }
  const cell = 0.00009 * Math.pow(2, Math.min(5, Math.max(0, 17 - zoom)))
  const buckets = new Map<string, WorkzonePlacement[]>()
  for (const p of placements) {
    const gx = Math.floor(p.lat / cell)
    const gy = Math.floor(p.lng / cell)
    const key = `${gx}|${gy}`
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(p)
  }
  const out: DisplayEntry[] = []
  for (const group of buckets.values()) {
    if (group.length <= 1) {
      out.push({ kind: 'single', placement: group[0]! })
      continue
    }
    let slat = 0
    let slng = 0
    for (const g of group) {
      slat += g.lat
      slng += g.lng
    }
    const raw = { lat: slat / group.length, lng: slng / group.length }
    const q = clampLatLngToPolygonInterior(raw, path!)
    out.push({ kind: 'cluster', lat: q.lat, lng: q.lng, count: group.length })
  }
  return out
}

function buildClusterMarkerElement(count: number): HTMLDivElement {
  const root = document.createElement('div')
  root.dataset.wzCluster = '1'
  root.style.cssText =
    'transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;pointer-events:auto;cursor:pointer;'
  const disc = document.createElement('div')
  disc.textContent = String(count)
  disc.style.cssText = [
    'box-sizing:border-box',
    'min-width:2.25rem',
    'min-height:2.25rem',
    'padding:0 6px',
    'border-radius:9999px',
    'background:linear-gradient(145deg,rgba(251,146,60,0.95),rgba(234,88,12,0.92))',
    'border:2px solid rgba(255,255,255,0.35)',
    'box-shadow:0 4px 18px rgba(0,0,0,0.45)',
    'font:700 13px/1 system-ui,sans-serif',
    'color:#0f172a',
    'display:flex',
    'align-items:center',
    'justify-content:center',
  ].join(';')
  root.appendChild(disc)
  return root
}

function buildProductMarkerElement(placement: WorkzonePlacement, imageUrl: string): HTMLDivElement {
  const zoneColor = ZONE_COLORS[placement.zone] ?? '#f97316'
  const rotation = Number.isFinite(placement.rotation) ? placement.rotation : 0

  const root = document.createElement('div')
  root.dataset.wzMarker = '1'
  root.style.cssText =
    'transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;pointer-events:auto;cursor:pointer;'

  const frame = document.createElement('div')
  frame.style.cssText = [
    'box-sizing:border-box',
    `border:2px solid ${zoneColor}`,
    'border-radius:10px',
    'background:rgba(15,23,42,0.78)',
    'backdrop-filter:blur(6px)',
    '-webkit-backdrop-filter:blur(6px)',
    'box-shadow:0 4px 14px rgba(0,0,0,0.4)',
    'padding:3px',
    'width:100%',
    'aspect-ratio:1',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'overflow:hidden',
  ].join(';')

  const rot = document.createElement('div')
  rot.style.cssText = [
    'width:100%',
    'height:100%',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    `transform:rotate(${rotation}deg)`,
    'transition:transform 0.2s ease',
  ].join(';')

  const img = document.createElement('img')
  img.alt = ''
  img.draggable = false
  img.referrerPolicy = 'no-referrer'
  img.style.cssText =
    'max-width:92%;max-height:92%;width:auto;height:auto;object-fit:contain;display:block;pointer-events:none;'
  img.src = imageUrl || PLACEHOLDER_IMAGE
  img.onerror = () => {
    img.onerror = null
    img.src = PLACEHOLDER_IMAGE
  }

  rot.appendChild(img)
  frame.appendChild(rot)
  root.appendChild(frame)
  return root
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
  /** Bumps only when zoom crosses cluster vs individual marker layout. */
  const [layoutNonce, setLayoutNonce] = useState(0)

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

  /* ── Place markers on map once plan is ready (cluster when zoomed out, LOD sizing) ── */
  useEffect(() => {
    if (!plan || !mapInstanceRef.current || !mapsReady || !mapArea) return

    let cancelled = false
    const map = mapInstanceRef.current
    const listeners: google.maps.MapsEventListener[] = []

    const clearListeners = () => {
      for (const h of listeners) google.maps.event.removeListener(h)
      listeners.length = 0
    }

    const nPlaced = plan.placements.length

    type Sizeable = { root: HTMLDivElement; mode: 'product' | 'cluster'; productId?: string }

    const applyMarkerSizes = (items: Sizeable[]) => {
      const m = mapInstanceRef.current
      if (!m) return
      const z = m.getZoom() ?? 17
      for (const it of items) {
        if (it.mode === 'cluster') {
          const s = clusterFramePx(z)
          it.root.style.width = `${s}px`
          it.root.style.height = `${s}px`
        } else {
          const px = markerFramePx(z, nPlaced, markerCategoryScale(it.productId ?? ''))
          it.root.style.width = `${px}px`
        }
      }
    }

    ;(async () => {
      for (const mk of markersRef.current) mk.map = null
      markersRef.current = []

      const { AdvancedMarkerElement } = await importLibrary('marker') as google.maps.MarkerLibrary
      if (cancelled) return

      const sizeables: Sizeable[] = []
      const zForLayout = map.getZoom() ?? 17
      const display = buildDisplayEntries(zForLayout, plan.placements, mapArea.path)
      let displayLen = display.length

      const polyBounds = new google.maps.LatLngBounds()
      for (const pt of mapArea.path) polyBounds.extend(pt)

      for (const entry of display) {
        if (cancelled) return
        if (entry.kind === 'cluster') {
          const root = buildClusterMarkerElement(entry.count)
          sizeables.push({ root, mode: 'cluster' })
          root.addEventListener('mouseenter', () => {
            root.style.filter = 'brightness(1.05) drop-shadow(0 6px 18px rgba(0,0,0,0.45))'
          })
          root.addEventListener('mouseleave', () => {
            root.style.filter = ''
          })
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: entry.lat, lng: entry.lng },
            content: root,
            title: `${entry.count} devices in this area`,
            zIndex: 4,
          })
          marker.addListener('click', () => {
            const iw = infoWindowRef.current!
            iw.setContent(`
              <div style="font-family:system-ui,sans-serif;padding:6px 4px;max-width:220px">
                <div style="font-weight:600;font-size:13px;color:#1e293b;margin-bottom:4px">${entry.count} rentals</div>
                <div style="font-size:11px;color:#475569">Zoom in to see cones, drums, signs, and smaller lights separately.</div>
              </div>
            `)
            iw.open({ map, anchor: marker })
          })
          markersRef.current.push(marker)
          continue
        }

        const placement = entry.placement
        const pos = { lat: placement.lat, lng: placement.lng }
        const product = getProductById(placement.productId)
        const root = buildProductMarkerElement(placement, product?.imageUrl ?? '')
        sizeables.push({ root, mode: 'product', productId: placement.productId })

        root.addEventListener('mouseenter', () => {
          root.style.filter = 'brightness(1.06) drop-shadow(0 6px 18px rgba(0,0,0,0.5))'
        })
        root.addEventListener('mouseleave', () => {
          root.style.filter = ''
        })

        const zIndex =
          placement.zone === 'advance_warning' ? 10 : placement.zone === 'transition' ? 20 : 15

        const marker = new AdvancedMarkerElement({
          map,
          position: pos,
          content: root,
          title: placement.label,
          zIndex,
        })

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

      if (cancelled) return

      map.fitBounds(polyBounds, { top: 80, bottom: 120, left: 60, right: 60 })
      applyMarkerSizes(sizeables)

      const onZoomOrIdle = () => {
        applyMarkerSizes(sizeables)
        const z = map.getZoom() ?? 17
        const nextLen = buildDisplayEntries(z, plan.placements, mapArea.path).length
        if (nextLen !== displayLen) {
          displayLen = nextLen
          setLayoutNonce((n) => n + 1)
        }
      }
      listeners.push(google.maps.event.addListener(map, 'zoom_changed', onZoomOrIdle))
      listeners.push(google.maps.event.addListener(map, 'idle', onZoomOrIdle))
    })()

    return () => {
      cancelled = true
      clearListeners()
      for (const mk of markersRef.current) mk.map = null
      markersRef.current = []
    }
  }, [plan, mapsReady, mapArea, layoutNonce])

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
        plan.placements.reduce<
          Record<string, { productId: string; name: string; zone: string; count: number }>
        >((acc, p) => {
          const key = p.productId
          if (!acc[key]) acc[key] = { productId: key, name: p.productName, zone: p.zone, count: 0 }
          acc[key].count++
          return acc
        }, {}),
      )
    : []

  return (
    <div className="fixed inset-0 z-[250] flex flex-col bg-slate-950" role="dialog" aria-modal="true">
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
                {productGroups.map((g) => {
                  const thumb = getProductById(g.productId)
                  return (
                    <div key={g.productId} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border-2 bg-slate-800/80 flex items-center justify-center"
                        style={{ borderColor: ZONE_COLORS[g.zone] ?? '#f97316' }}
                      >
                        <img
                          src={thumb?.imageUrl ?? PLACEHOLDER_IMAGE}
                          alt=""
                          className="max-w-[90%] max-h-[90%] w-auto h-auto object-contain"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                          }}
                        />
                      </div>
                      <span className="text-slate-300 truncate flex-1">{g.name}</span>
                      <span className="text-slate-500 flex-shrink-0">×{g.count}</span>
                    </div>
                  )
                })}
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
