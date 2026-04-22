import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { Download, MapPin, Search, Trash2, X, MousePointer2, Layers, Package } from 'lucide-react'
import type { Product } from '../types'
import { getProducts, getProductById, getFeaturedProducts } from '../data/products'
import { useCatalogSync } from '../context/CatalogSyncContext'
import { useCart } from '../context/CartContext'
import { parseLatLngPlain } from '../utils/locationParse'
import { getLatestJobAssistantPersisted } from '../utils/jobAssistantSessionStorage'
import {
  readSiteMapPlannerSession,
  writeSiteMapPlannerSession,
  seedPlacementsFromCart,
  type SiteMapPlacedRow,
} from '../utils/siteMapPlannerSessionStorage'
import { clampLatLngToPolygonInterior } from '../utils/workzonePlannerClient'

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || undefined
const MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID'

const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 }
const DEFAULT_ZOOM = 4

const DRAG_MIME = 'application/x-traffickit-product'

type MapsAuthWindow = Window & { gm_authFailure?: () => void }

type MarkerMeta = {
  marker: google.maps.marker.AdvancedMarkerElement
  shell: HTMLDivElement
}

/** Minimal overlay so we can convert container pixels → LatLng on drop. */
function attachPixelToLatLngOverlay(map: google.maps.Map): google.maps.OverlayView {
  class Ov extends google.maps.OverlayView {
    onAdd() {}
    draw() {}
  }
  const o = new Ov()
  o.setMap(map)
  return o
}

function readLatLng(
  pos: google.maps.LatLng | google.maps.LatLngLiteral | google.maps.LatLngAltitudeLiteral | null | undefined,
): { lat: number; lng: number } | null {
  if (!pos) return null
  const lat = typeof (pos as google.maps.LatLng).lat === 'function' ? (pos as google.maps.LatLng).lat() : (pos as { lat: number }).lat
  const lng = typeof (pos as google.maps.LatLng).lng === 'function' ? (pos as google.maps.LatLng).lng() : (pos as { lng: number }).lng
  if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) return null
  return { lat, lng }
}

function buildMarkerShell(product: Product, selected: boolean): HTMLDivElement {
  const shell = document.createElement('div')
  shell.style.cssText = [
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'gap:2px',
    'pointer-events:auto',
    'cursor:grab',
    'user-select:none',
    '-webkit-user-select:none',
  ].join(';')

  const card = document.createElement('div')
  card.style.cssText = [
    'width:44px',
    'height:44px',
    'border-radius:8px',
    'overflow:hidden',
    'background:#0f172a',
    'box-shadow:0 4px 14px rgba(0,0,0,0.45)',
    'border:2px solid',
    selected ? 'border-color:#fb923c' : 'border-color:rgba(255,255,255,0.35)',
  ].join(';')

  const img = document.createElement('img')
  img.src = product.imageUrl
  img.alt = ''
  img.draggable = false
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
  img.referrerPolicy = 'no-referrer-when-downgrade'
  img.onerror = () => {
    img.style.display = 'none'
    card.textContent = '•'
    card.style.display = 'flex'
    card.style.alignItems = 'center'
    card.style.justifyContent = 'center'
    card.style.fontSize = '20px'
    card.style.color = '#fb923c'
  }

  card.appendChild(img)

  const cap = document.createElement('div')
  cap.textContent = product.sku || product.slug.slice(0, 8)
  cap.style.cssText = [
    'max-width:72px',
    'font:600 9px/1.1 system-ui,sans-serif',
    'color:#fff',
    'text-align:center',
    'text-shadow:0 1px 2px rgba(0,0,0,0.85)',
    'overflow:hidden',
    'text-overflow:ellipsis',
    'white-space:nowrap',
  ].join(';')

  shell.appendChild(card)
  shell.appendChild(cap)
  return shell
}

export default function SiteMapPlanner() {
  const { tick } = useCatalogSync()
  const { lines: cartLines } = useCart()
  const catalog = useMemo(() => getProducts(), [tick])

  /** Cart lines at first paint — used only when no saved planner session (avoid resetting layout when cart changes). */
  const seedCartLinesRef = useRef<typeof cartLines | null>(null)
  if (seedCartLinesRef.current === null) seedCartLinesRef.current = cartLines

  const plannerBoot = useMemo(() => {
    const persisted = readSiteMapPlannerSession()
    const ja = getLatestJobAssistantPersisted()?.mapArea
    const seedLines = seedCartLinesRef.current ?? []
    const center = ja?.center ?? DEFAULT_CENTER
    const placements =
      persisted?.v === 1
        ? persisted.placements
        : seedPlacementsFromCart(seedLines, center)
    const searchDraftInit =
      persisted?.v === 1 ? (persisted.searchDraft ?? ja?.address ?? '') : (ja?.address ?? '')
    let initialMapView: { lat: number; lng: number; zoom: number } | undefined
    if (persisted?.v === 1 && persisted.mapView) initialMapView = persisted.mapView
    else if (ja?.center) initialMapView = { lat: ja.center.lat, lng: ja.center.lng, zoom: 16 }
    const workZonePath = ja?.path && ja.path.length >= 3 ? ja.path : []
    return { placements, searchDraftInit, initialMapView, workZonePath }
  }, [])

  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const overlayRef = useRef<google.maps.OverlayView | null>(null)
  const markersRef = useRef<Map<string, MarkerMeta>>(new Map())
  const advancedMarkerCtorRef = useRef<typeof google.maps.marker.AdvancedMarkerElement | null>(null)
  const workZonePolyRef = useRef<google.maps.Polygon | null>(null)
  const workZonePathRef = useRef(plannerBoot.workZonePath)
  const initialMapViewRef = useRef(plannerBoot.initialMapView)
  const placedRef = useRef(plannerBoot.placements)
  const searchDraftRef = useRef(plannerBoot.searchDraftInit)

  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [noKey, setNoKey] = useState(false)
  const [searchDraft, setSearchDraft] = useState(plannerBoot.searchDraftInit)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [placed, setPlaced] = useState<SiteMapPlacedRow[]>(plannerBoot.placements)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  /** Tap-to-place: pick a product, then click the map (mobile-friendly). */
  const [pendingProductId, setPendingProductId] = useState<string | null>(null)

  const filteredCatalog = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase()
    if (!q) return catalog
    return catalog.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [catalog, paletteQuery])

  /** Quick strip on the map: popular gear first so icons sit *on* the map, not only in the sidebar. */
  const dockProducts = useMemo(() => {
    const featured = getFeaturedProducts()
    if (featured.length >= 6) return featured.slice(0, 24)
    return catalog.slice(0, 24)
  }, [tick, catalog])

  const applySelectionStyles = useCallback((nextSelected: string | null) => {
    markersRef.current.forEach((meta, id) => {
      const card = meta.shell.firstElementChild as HTMLDivElement | null
      if (!card) return
      const on = id === nextSelected
      card.style.borderColor = on ? '#fb923c' : 'rgba(255,255,255,0.35)'
    })
  }, [])

  useEffect(() => {
    applySelectionStyles(selectedId)
  }, [selectedId, placed, applySelectionStyles])

  useLayoutEffect(() => {
    const path = plannerBoot.workZonePath
    if (path.length < 3) return
    setPlaced((prev) => {
      let changed = false
      const next = prev.map((r) => {
        const c = clampLatLngToPolygonInterior({ lat: r.lat, lng: r.lng }, path)
        if (Math.abs(c.lat - r.lat) > 1e-9 || Math.abs(c.lng - r.lng) > 1e-9) changed = true
        return { ...r, lat: c.lat, lng: c.lng }
      })
      return changed ? next : prev
    })
  }, [plannerBoot.workZonePath])

  const removePlacement = useCallback((id: string) => {
    const meta = markersRef.current.get(id)
    if (meta) {
      meta.marker.map = null
      markersRef.current.delete(id)
    }
    setPlaced((rows) => rows.filter((r) => r.id !== id))
    setSelectedId((s) => (s === id ? null : s))
  }, [])

  const upsertMarker = useCallback(
    (row: SiteMapPlacedRow, product: Product) => {
      const AdvancedMarkerElement = advancedMarkerCtorRef.current
      const map = mapRef.current
      if (!AdvancedMarkerElement || !map) return

      let meta = markersRef.current.get(row.id)
      if (!meta) {
        const shell = buildMarkerShell(product, false)
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: row.lat, lng: row.lng },
          content: shell,
          gmpDraggable: true,
          title: product.name,
          zIndex: 10,
        })

        marker.addEventListener('gmp-click', () => {
          setSelectedId(row.id)
        })

        google.maps.event.addListener(marker, 'dragend', () => {
          const ll = readLatLng(marker.position)
          if (!ll) return
          const path = workZonePathRef.current
          let lat = ll.lat
          let lng = ll.lng
          if (path.length >= 3) {
            const c = clampLatLngToPolygonInterior({ lat, lng }, path)
            lat = c.lat
            lng = c.lng
            marker.position = { lat, lng }
          }
          setPlaced((prev) => prev.map((r) => (r.id === row.id ? { ...r, lat, lng } : r)))
        })

        meta = { marker, shell }
        markersRef.current.set(row.id, meta)
      } else {
        meta.marker.position = { lat: row.lat, lng: row.lng }
      }
    },
    [],
  )

  /** After map + AdvancedMarkerElement are available, sync React rows → markers. */
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return
    const seen = new Set<string>()
    for (const row of placed) {
      const product = getProductById(row.productId)
      if (!product) continue
      seen.add(row.id)
      upsertMarker(row, product)
    }
    markersRef.current.forEach((meta, id) => {
      if (!seen.has(id)) {
        meta.marker.map = null
        markersRef.current.delete(id)
      }
    })
  }, [placed, status, upsertMarker])

  placedRef.current = placed
  searchDraftRef.current = searchDraft

  const schedulePersistSession = useCallback(() => {
    const map = mapRef.current
    let mapView: { lat: number; lng: number; zoom: number } | undefined
    if (map) {
      const c = map.getCenter()
      const z = map.getZoom()
      if (c && z != null) mapView = { lat: c.lat(), lng: c.lng(), zoom: z }
    }
    writeSiteMapPlannerSession({
      v: 1,
      placements: placedRef.current,
      searchDraft: searchDraftRef.current,
      mapView,
    })
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => schedulePersistSession(), 400)
    return () => window.clearTimeout(t)
  }, [placed, searchDraft, schedulePersistSession])

  /** Work zone polygon from AI Job Planner (read-only overlay). */
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return
    workZonePolyRef.current?.setMap(null)
    workZonePolyRef.current = null
    const path = workZonePathRef.current
    if (path.length < 3) return
    const poly = new google.maps.Polygon({
      paths: path,
      map: mapRef.current,
      fillColor: '#f97316',
      fillOpacity: 0.18,
      strokeColor: '#f97316',
      strokeWeight: 2,
      clickable: false,
      editable: false,
      zIndex: 1,
    })
    workZonePolyRef.current = poly
    return () => {
      poly.setMap(null)
      if (workZonePolyRef.current === poly) workZonePolyRef.current = null
    }
  }, [status])

  useEffect(() => {
    if (!MAPS_KEY) {
      setNoKey(true)
      return
    }
    setStatus('loading')

    const w = window as MapsAuthWindow
    const prevAuthFailure = w.gm_authFailure
    w.gm_authFailure = () => setStatus('error')

    setOptions({
      key: MAPS_KEY,
      v: 'weekly',
      libraries: ['marker'],
      mapIds: [MAP_ID],
    })

    let cancelled = false
    let ro: ResizeObserver | null = null
    let roDebounceTimer: number | null = null
    let lastROw = 0
    let lastROh = 0
    let idleListener: google.maps.MapsEventListener | null = null
    let idlePersistTimer: number | null = null

    Promise.all([importLibrary('maps'), importLibrary('marker')])
      .then(([_, markerLib]) => {
        if (cancelled || !mapDivRef.current) return
        advancedMarkerCtorRef.current = markerLib.AdvancedMarkerElement
        const boot = initialMapViewRef.current
        const map = new google.maps.Map(mapDivRef.current, {
          center: boot ? { lat: boot.lat, lng: boot.lng } : DEFAULT_CENTER,
          zoom: boot?.zoom ?? DEFAULT_ZOOM,
          mapId: MAP_ID,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          fullscreenControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        })
        mapRef.current = map
        overlayRef.current = attachPixelToLatLngOverlay(map)
        geocoderRef.current = new google.maps.Geocoder()

        if (navigator.geolocation && !boot) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const here = { lat: pos.coords.latitude, lng: pos.coords.longitude }
              map.setCenter(here)
              map.setZoom(16)
            },
            () => {},
          )
        }

        // Debounce + size threshold + brief disconnect: firing `resize` on every RO callback
        // can re-layout the map and retrigger ResizeObserver, freezing the main thread (tight loop).
        const RO_DEBOUNCE_MS = 150
        const onMapContainerResize = () => {
          const el = mapDivRef.current
          if (!el || !mapRef.current) return
          const r = el.getBoundingClientRect()
          const w = Math.round(r.width)
          const h = Math.round(r.height)
          if (w < 8 || h < 8) return
          if (Math.abs(w - lastROw) < 2 && Math.abs(h - lastROh) < 2) return
          lastROw = w
          lastROh = h
          ro?.disconnect()
          google.maps.event.trigger(mapRef.current, 'resize')
          window.requestAnimationFrame(() => {
            if (cancelled || !mapDivRef.current) return
            ro?.observe(mapDivRef.current)
          })
        }
        ro = new ResizeObserver(() => {
          if (roDebounceTimer != null) window.clearTimeout(roDebounceTimer)
          roDebounceTimer = window.setTimeout(() => {
            roDebounceTimer = null
            onMapContainerResize()
          }, RO_DEBOUNCE_MS)
        })
        const div = mapDivRef.current
        if (div) ro.observe(div)

        idleListener = map.addListener('idle', () => {
          if (idlePersistTimer) window.clearTimeout(idlePersistTimer)
          idlePersistTimer = window.setTimeout(() => {
            idlePersistTimer = null
            schedulePersistSession()
          }, 900)
        })

        setStatus('ready')

        window.setTimeout(() => onMapContainerResize(), 0)
      })
      .catch(() => setStatus('error'))

    return () => {
      cancelled = true
      w.gm_authFailure = prevAuthFailure
      if (idlePersistTimer) window.clearTimeout(idlePersistTimer)
      if (roDebounceTimer != null) window.clearTimeout(roDebounceTimer)
      idleListener?.remove()
      ro?.disconnect()
      workZonePolyRef.current?.setMap(null)
      workZonePolyRef.current = null
      markersRef.current.forEach((m) => {
        m.marker.map = null
      })
      markersRef.current.clear()
      advancedMarkerCtorRef.current = null
      overlayRef.current = null
      geocoderRef.current = null
      mapRef.current = null
    }
  }, [schedulePersistSession])

  const runSearch = useCallback(async () => {
    const q = searchDraft.trim()
    setSearchError(null)
    if (!q) {
      setSearchError('Enter an address or coordinates.')
      return
    }
    const map = mapRef.current
    if (!map) {
      setSearchError('Map is still loading.')
      return
    }
    const plain = parseLatLngPlain(q)
    if (plain) {
      map.setCenter(plain)
      map.setZoom(17)
      window.setTimeout(() => schedulePersistSession(), 100)
      return
    }
    if (!geocoderRef.current) {
      setSearchError('Geocoder not ready.')
      return
    }
    try {
      const { results } = await geocoderRef.current.geocode({ address: q })
      const first = results[0]
      if (!first?.geometry?.location) {
        setSearchError('No results — try a street, city, or lat/lng.')
        return
      }
      map.setCenter(first.geometry.location)
      map.setZoom(15)
      window.setTimeout(() => schedulePersistSession(), 100)
    } catch {
      setSearchError('Search failed.')
    }
  }, [searchDraft, schedulePersistSession])

  const latLngFromDropEvent = useCallback((e: React.DragEvent) => {
    const map = mapRef.current
    const div = mapDivRef.current
    const overlay = overlayRef.current
    if (!map || !div || !overlay) return null
    const projection = overlay.getProjection()
    if (!projection) return null
    const rect = div.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return projection.fromContainerPixelToLatLng(new google.maps.Point(x, y))
  }, [])

  const addPlacementAt = useCallback((productId: string, lat: number, lng: number) => {
    const product = getProductById(productId)
    if (!product) return
    const path = workZonePathRef.current
    let ll = { lat, lng }
    if (path.length >= 3) ll = clampLatLngToPolygonInterior(ll, path)
    const id = crypto.randomUUID()
    setPlaced((prev) => [...prev, { id, productId, lat: ll.lat, lng: ll.lng }])
    setSelectedId(id)
  }, [])

  const onMapDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const raw = e.dataTransfer.getData(DRAG_MIME) || e.dataTransfer.getData('text/plain')
      if (!raw) return
      let productId = raw
      try {
        const parsed = JSON.parse(raw) as { productId?: string }
        if (parsed?.productId) productId = parsed.productId
      } catch {
        /* plain id */
      }
      const ll = latLngFromDropEvent(e)
      if (!ll) return
      addPlacementAt(productId, ll.lat(), ll.lng())
    },
    [addPlacementAt, latLngFromDropEvent],
  )

  const onMapDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!pendingProductId || !e.latLng) return
      addPlacementAt(pendingProductId, e.latLng.lat(), e.latLng.lng())
      setPendingProductId(null)
    },
    [pendingProductId, addPlacementAt],
  )

  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return
    const map = mapRef.current
    const listener = map.addListener('click', onMapClick)
    return () => listener.remove()
  }, [status, onMapClick])

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setPendingProductId(null)
        return
      }
      if ((ev.key === 'Delete' || ev.key === 'Backspace') && selectedId) {
        const t = ev.target as HTMLElement
        if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return
        ev.preventDefault()
        removePlacement(selectedId)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, removePlacement])

  const exportJson = useCallback(() => {
    const map = mapRef.current
    const center = map?.getCenter()
    const zoom = map?.getZoom()
    const payload = {
      exportedAt: new Date().toISOString(),
      mapView: center
        ? { lat: center.lat(), lng: center.lng(), zoom: zoom ?? undefined }
        : undefined,
      placements: placed.map((p) => {
        const product = getProductById(p.productId)
        return {
          ...p,
          sku: product?.sku,
          name: product?.name,
        }
      }),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `site-layout-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [placed])

  const clearAll = useCallback(() => {
    markersRef.current.forEach((m) => {
      m.marker.map = null
    })
    markersRef.current.clear()
    setPlaced([])
    setSelectedId(null)
  }, [])

  if (noKey) {
    return (
      <main className="min-h-screen pt-24 px-4 pb-16 bg-slate-950">
        <div className="max-w-lg mx-auto rounded-xl border border-slate-700 bg-slate-900/60 p-8 text-center text-slate-300">
          <MapPin className="mx-auto mb-3 text-slate-500" size={28} />
          <p className="text-sm leading-relaxed">
            Add <code className="text-brand-300">VITE_GOOGLE_MAPS_API_KEY</code> to your{' '}
            <code className="text-brand-300">.env</code> file to use the layout planner (same key as the rest of the site).
          </p>
        </div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen pt-24 px-4 pb-16 bg-slate-950">
        <div className="max-w-lg mx-auto rounded-xl border border-red-800/40 bg-red-950/30 p-6 text-sm text-red-200/90">
          Google Maps did not load. Confirm your API key, billing, and that the{' '}
          <strong className="text-red-100">Maps JavaScript API</strong> is enabled for this origin.
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20 bg-slate-950 flex flex-col">
      <div className="border-b border-slate-800/60 bg-slate-900/40 shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider">
              <Layers size={14} aria-hidden />
              Interactive layout
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Site map planner</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              Drag catalog items onto the map to place cones, barricades, signs, and other gear. Drag pins to fine-tune. Export JSON to
              share coordinates with your crew or attach to a rental booking. While this tab stays open, your placements, pan/zoom, and search are
              remembered as you move around the site; a work zone from the AI Job Planner shows as an outline, and a brand-new layout picks
              up your cart automatically once.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportJson}
              disabled={placed.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 disabled:opacity-40"
            >
              <Download size={14} />
              Export JSON
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={placed.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-800/50 bg-red-950/40 px-3 py-2 text-xs font-medium text-red-200 hover:bg-red-950/70 disabled:opacity-40"
            >
              <Trash2 size={14} />
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 min-h-[calc(100dvh-12rem)]">
        {/* Palette — full catalog; quick-drag strip also sits on the map below */}
        <aside
          id="planner-equipment-catalog"
          className="w-full lg:w-[300px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 flex flex-col max-h-[40vh] lg:max-h-none"
        >
          <div className="p-3 border-b border-slate-800 space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Package size={12} className="text-brand-400 shrink-0" aria-hidden />
              Full catalog — drag thumbnail → map
            </label>
            <input
              value={paletteQuery}
              onChange={(e) => setPaletteQuery(e.target.value)}
              placeholder="Filter cones, barricades…"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/50"
            />
            {pendingProductId && (
              <div className="flex items-start justify-between gap-2 rounded-lg bg-brand-500/15 border border-brand-500/25 px-2.5 py-2">
                <p className="text-[10px] text-brand-100/90 leading-snug">
                  <MousePointer2 size={12} className="inline mr-1 opacity-80" aria-hidden />
                  Click the map to drop{' '}
                  <span className="font-semibold">{getProductById(pendingProductId)?.name ?? 'item'}</span>.
                </p>
                <button
                  type="button"
                  aria-label="Cancel placement"
                  onClick={() => setPendingProductId(null)}
                  className="shrink-0 p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredCatalog.length === 0 && (
              <p className="text-xs text-slate-500 px-2 py-4 text-center">No products match that filter.</p>
            )}
            {filteredCatalog.map((p) => (
              <PaletteItem key={p.id} product={p} onPick={() => setPendingProductId(p.id)} />
            ))}
          </div>
          <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed">
            Tip: on desktop, drag the thumbnail onto the map. On mobile, tap an item, then tap where it goes.
          </div>
        </aside>

        {/* Map + search */}
        <section className="flex-1 flex flex-col min-w-0 min-h-[320px] lg:min-h-0">
          <div className="p-2 sm:p-3 border-b border-slate-800 flex flex-col sm:flex-row gap-2 shrink-0">
            <form
              className="flex flex-1 gap-2 min-w-0"
              onSubmit={(e) => {
                e.preventDefault()
                void runSearch()
              }}
            >
              <div className="relative flex-1 min-w-0">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search address or lat, lng"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/90 py-2 pl-8 pr-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/50"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
              >
                Go
              </button>
            </form>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 sm:self-center shrink-0">
              <span>{placed.length} placed</span>
              {selectedId && (
                <button
                  type="button"
                  onClick={() => removePlacement(selectedId)}
                  className="rounded border border-slate-600 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Remove selected
                </button>
              )}
            </div>
          </div>
          {searchError && <p className="px-3 text-[10px] text-amber-400/95 shrink-0">{searchError}</p>}

          <div className="relative flex-1 min-h-[280px]">
            {status === 'loading' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 text-slate-400 text-sm">
                Loading map…
              </div>
            )}
            <div
              ref={mapDivRef}
              className={`absolute inset-0 w-full h-full ${pendingProductId ? 'cursor-crosshair' : ''}`}
              onDragOver={onMapDragOver}
              onDrop={onMapDrop}
              role="application"
              aria-label="Job site map — drop equipment here"
            />

            {/* On-map equipment dock: draggable icons live here so they sit visually on the layout */}
            {status === 'ready' && dockProducts.length > 0 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-2 pt-8 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent">
                <div className="pointer-events-auto w-full max-w-3xl px-2">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-slate-300 mb-1.5 drop-shadow-sm">
                    Drag icons onto the map · scroll for more · tap = place then tap map
                  </p>
                  <div className="flex gap-2 overflow-x-auto overflow-y-hidden rounded-xl border border-slate-600/90 bg-slate-900/95 px-2 py-2 shadow-2xl backdrop-blur-md">
                    {dockProducts.map((p) => (
                      <MapDockItem key={p.id} product={p} onArmPlace={() => setPendingProductId(p.id)} />
                    ))}
                  </div>
                  <p className="text-center mt-1.5">
                    <button
                      type="button"
                      className="text-[10px] font-medium text-brand-400 hover:text-brand-300 underline-offset-2 hover:underline"
                      onClick={() =>
                        document.getElementById('planner-equipment-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    >
                      Open full equipment list
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function setProductDragPayload(e: React.DragEvent, product: Product) {
  e.dataTransfer.setData(DRAG_MIME, JSON.stringify({ productId: product.id }))
  e.dataTransfer.setData('text/plain', product.id)
  e.dataTransfer.effectAllowed = 'copy'
}

function MapDockItem({ product, onArmPlace }: { product: Product; onArmPlace: () => void }) {
  const onDragStart = (e: React.DragEvent) => {
    setProductDragPayload(e, product)
    const img = (e.currentTarget as HTMLElement).querySelector('img')
    if (img) e.dataTransfer.setDragImage(img, 24, 24)
  }

  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5 w-[56px]">
      <button
        type="button"
        draggable
        onDragStart={onDragStart}
        onClick={onArmPlace}
        title={`${product.name} — drag onto map, or tap then tap map`}
        className="relative h-12 w-12 rounded-lg overflow-hidden border-2 border-slate-500 cursor-grab active:cursor-grabbing hover:border-brand-400/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 shadow-md"
      >
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover pointer-events-none" draggable={false} />
      </button>
      <span className="w-full text-center text-[8px] leading-tight text-slate-400 truncate px-0.5" title={product.name}>
        {product.sku}
      </span>
    </div>
  )
}

function PaletteItem({ product, onPick }: { product: Product; onPick: () => void }) {
  const onDragStart = (e: React.DragEvent) => {
    setProductDragPayload(e, product)
    const img = (e.currentTarget as HTMLElement).querySelector('img')
    if (img) e.dataTransfer.setDragImage(img, 22, 22)
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/40 p-1.5 hover:border-slate-600 transition-colors group">
      <div
        draggable
        onDragStart={onDragStart}
        className="relative h-11 w-11 shrink-0 rounded-md overflow-hidden border border-slate-600 cursor-grab active:cursor-grabbing"
        title={`Drag to map: ${product.name}`}
      >
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover pointer-events-none" draggable={false} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-100 leading-tight line-clamp-2">{product.name}</p>
        <p className="text-[9px] text-slate-500 mt-0.5">{product.sku}</p>
      </div>
      <button
        type="button"
        onClick={onPick}
        className="shrink-0 rounded-md border border-slate-600 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white opacity-80 group-hover:opacity-100"
      >
        Place
      </button>
    </div>
  )
}
