import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { Download, MapPin, Search, Trash2, X, MousePointer2, Layers, Package, Square, Circle, Hexagon, ZoomIn, ZoomOut, GripVertical, Sparkles } from 'lucide-react'
import type { Product, AIRecommendation } from '../types'
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
import { clampLatLngToPolygonInterior, buildMapAreaFromPath, planWorkzoneLayout, buildDemoPlan } from '../utils/workzonePlannerClient'
import { parseQASegments } from '../utils/chatQAParse'
import type { MutableRefObject } from 'react'

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
  size: number
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

function buildMarkerShell(product: Product, selected: boolean, sizeMultiplier = 1): HTMLDivElement {
  const px = Math.round(44 * sizeMultiplier)
  const capMaxWidth = Math.round(72 * sizeMultiplier)
  const capFontSize = Math.max(7, Math.round(9 * Math.min(sizeMultiplier, 1.5)))

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
    `width:${px}px`,
    `height:${px}px`,
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
    `max-width:${capMaxWidth}px`,
    `font:600 ${capFontSize}px/1.1 system-ui,sans-serif`,
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

  type DrawMode = 'select' | 'polygon' | 'rectangle' | 'circle'
  const [drawMode, setDrawMode] = useState<DrawMode>('select')
  const [drawColor, setDrawColor] = useState('#f97316')
  const [drawnCount, setDrawnCount] = useState(0)
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const drawingMgrRef = useRef<google.maps.drawing.DrawingManager | null>(null)
  const drawnOverlaysRef = useRef<Map<string, google.maps.MVCObject>>(new Map())
  const drawColorRef = useRef(drawColor)

  const { paletteItems, paletteNote } = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase()
    if (!q) {
      const featured = getFeaturedProducts()
      if (featured.length >= 6) {
        return {
          paletteItems: featured,
          paletteNote:
            catalog.length > featured.length
              ? `Search to find any of ${catalog.length.toLocaleString()} products.`
              : null,
        }
      }
      return {
        paletteItems: catalog.slice(0, 150),
        paletteNote:
          catalog.length > 150
            ? `Search to find any of ${catalog.length.toLocaleString()} products.`
            : null,
      }
    }
    const matches = catalog.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
    if (matches.length > 500) {
      return {
        paletteItems: matches.slice(0, 500),
        paletteNote: `Showing 500 of ${matches.length} matches — refine your search.`,
      }
    }
    return { paletteItems: matches, paletteNote: null }
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
      const rowSize = row.size ?? 1
      // Rebuild shell if size changed
      if (meta && Math.abs(meta.size - rowSize) > 0.01) {
        meta.marker.map = null
        markersRef.current.delete(row.id)
        meta = undefined
      }
      if (!meta) {
        const shell = buildMarkerShell(product, false, rowSize)
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

        meta = { marker, shell, size: rowSize }
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
  drawColorRef.current = drawColor

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
      libraries: ['marker', 'drawing'],
      mapIds: [MAP_ID],
    })

    let cancelled = false
    let idleListener: google.maps.MapsEventListener | null = null
    let idlePersistTimer: number | null = null

    Promise.all([importLibrary('maps'), importLibrary('marker'), importLibrary('drawing')])
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

        // Set up drawing manager
        const drawingMgr = new google.maps.drawing.DrawingManager({
          drawingMode: null,
          drawingControl: false,
          polygonOptions: {
            fillColor: drawColorRef.current,
            fillOpacity: 0.45,
            strokeColor: drawColorRef.current,
            strokeWeight: 2,
            clickable: true,
            editable: false,
            zIndex: 5,
          },
          rectangleOptions: {
            fillColor: drawColorRef.current,
            fillOpacity: 0.45,
            strokeColor: drawColorRef.current,
            strokeWeight: 2,
            clickable: true,
            editable: false,
            zIndex: 5,
          },
          circleOptions: {
            fillColor: drawColorRef.current,
            fillOpacity: 0.45,
            strokeColor: drawColorRef.current,
            strokeWeight: 2,
            clickable: true,
            editable: false,
            zIndex: 5,
          },
        })
        drawingMgr.setMap(map)
        drawingMgrRef.current = drawingMgr

        google.maps.event.addListener(drawingMgr, 'overlaycomplete', (e: google.maps.drawing.OverlayCompleteEvent) => {
          const id = crypto.randomUUID()
          const overlay = e.overlay as google.maps.MVCObject
          drawnOverlaysRef.current.set(id, overlay)
          // Switch back to select mode after drawing
          drawingMgr.setDrawingMode(null)
          setDrawMode('select')
          setDrawnCount((n) => n + 1)
          // Click to select shape
          google.maps.event.addListener(overlay, 'click', () => {
            setSelectedShapeId(id)
          })
        })

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

        // Google Maps Weekly manages its own internal ResizeObserver — do NOT call
        // google.maps.event.trigger(map, 'resize') manually. Doing so causes Google Maps to
        // re-measure its container, which can reflux the flex layout, which fires Google Maps'
        // own observer again, creating a tight loop that freezes the tab.

        idleListener = map.addListener('idle', () => {
          if (idlePersistTimer) window.clearTimeout(idlePersistTimer)
          idlePersistTimer = window.setTimeout(() => {
            idlePersistTimer = null
            schedulePersistSession()
          }, 900)
        })

        setStatus('ready')
      })
      .catch(() => setStatus('error'))

    return () => {
      cancelled = true
      w.gm_authFailure = prevAuthFailure
      if (idlePersistTimer) window.clearTimeout(idlePersistTimer)
      idleListener?.remove()
      workZonePolyRef.current?.setMap(null)
      workZonePolyRef.current = null
      markersRef.current.forEach((m) => {
        m.marker.map = null
      })
      markersRef.current.clear()
      drawnOverlaysRef.current.forEach((o) => (o as google.maps.Polygon).setMap(null))
      drawnOverlaysRef.current.clear()
      drawingMgrRef.current = null
      advancedMarkerCtorRef.current = null
      overlayRef.current = null
      geocoderRef.current = null
      mapRef.current = null
    }
  }, [schedulePersistSession])

  // Keep drawing manager shape options in sync with the selected color
  useEffect(() => {
    const mgr = drawingMgrRef.current
    if (!mgr) return
    const shapeOpts = {
      fillColor: drawColor,
      fillOpacity: 0.45,
      strokeColor: drawColor,
      strokeWeight: 2,
      clickable: true,
      editable: false,
      zIndex: 5,
    }
    mgr.setOptions({
      polygonOptions: shapeOpts,
      rectangleOptions: shapeOpts,
      circleOptions: shapeOpts,
    })
  }, [drawColor])

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

  useEffect(() => {
    const mgr = drawingMgrRef.current
    if (!mgr) return
    if (drawMode === 'select') {
      mgr.setDrawingMode(null)
    } else {
      mgr.setDrawingMode(drawMode as google.maps.drawing.OverlayType)
    }
  }, [drawMode])

  const deleteSelectedShape = useCallback(() => {
    if (!selectedShapeId) return
    const overlay = drawnOverlaysRef.current.get(selectedShapeId)
    if (overlay) {
      (overlay as google.maps.Polygon).setMap(null)
      drawnOverlaysRef.current.delete(selectedShapeId)
      setDrawnCount((n) => n - 1)
    }
    setSelectedShapeId(null)
  }, [selectedShapeId])

  const clearAllDrawings = useCallback(() => {
    drawnOverlaysRef.current.forEach((o) => (o as google.maps.Polygon).setMap(null))
    drawnOverlaysRef.current.clear()
    setDrawnCount(0)
    setSelectedShapeId(null)
  }, [])

  const clearAll = useCallback(() => {
    markersRef.current.forEach((m) => {
      m.marker.map = null
    })
    markersRef.current.clear()
    setPlaced([])
    setSelectedId(null)
    clearAllDrawings()
  }, [clearAllDrawings])

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
    <main className="h-screen pt-16 bg-slate-950 flex flex-col overflow-hidden">
      {/* Compact single-row toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-800/60 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <Layers size={13} className="text-brand-400" />
          <span className="text-sm font-semibold text-white hidden sm:block">Site Map Planner</span>
        </div>
        <div className="w-px h-4 bg-slate-700 mx-1 hidden sm:block" />
        <form
          className="flex flex-1 gap-1.5 min-w-0 max-w-sm"
          onSubmit={(e) => { e.preventDefault(); void runSearch() }}
        >
          <div className="relative flex-1 min-w-0">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Search address or lat, lng"
              className="w-full rounded-md border border-slate-700 bg-slate-800/90 py-1 pl-6 pr-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/50"
            />
          </div>
          <button type="submit" className="shrink-0 rounded-md border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700">Go</button>
        </form>
        {searchError && <p className="text-[10px] text-amber-400/95 shrink-0 hidden sm:block">{searchError}</p>}
        <div className="flex-1" />
        <span className="text-[10px] text-slate-500 shrink-0">{placed.length} placed</span>
        {selectedId && (
          <button type="button" onClick={() => removePlacement(selectedId)} className="rounded border border-slate-600 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white shrink-0">
            Remove selected
          </button>
        )}
        <button
          type="button"
          onClick={exportJson}
          className="inline-flex items-center gap-1 rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-100 hover:bg-slate-700 shrink-0"
        >
          <Download size={12} />
          Export
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1 rounded-md border border-red-800/50 bg-red-950/40 px-2 py-1 text-xs font-medium text-red-200 hover:bg-red-950/70 shrink-0"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Palette — full catalog; quick-drag strip also sits on the map below */}
        <aside
          id="planner-equipment-catalog"
          className="w-full lg:w-[260px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 flex flex-col max-h-[35vh] lg:max-h-none"
        >
          <div className="p-2 border-b border-slate-800 space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Package size={12} className="text-brand-400 shrink-0" aria-hidden />
              Drag any item directly onto the map
            </label>
            <input
              value={paletteQuery}
              onChange={(e) => setPaletteQuery(e.target.value)}
              placeholder="Filter cones, barricades…"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/50"
            />
            {paletteNote && <p className="text-[10px] text-slate-500 leading-snug px-0.5">{paletteNote}</p>}
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
            {paletteItems.length === 0 && (
              <p className="text-xs text-slate-500 px-2 py-4 text-center">No products match that filter.</p>
            )}
            {paletteItems.map((p) => (
              <PaletteItem key={p.id} product={p} onPick={() => setPendingProductId(p.id)} />
            ))}
          </div>
          <div className="px-3 py-1.5 border-t border-slate-800 text-[10px] text-slate-600">
            Mobile: tap item → tap map
          </div>
        </aside>

        {/* Map canvas */}
        <section className="flex-1 flex flex-col min-w-0 min-h-0">
          <div className="relative flex-1 min-h-0">
            {/* Drawing toolbar — floating overlay on the map */}
            {status === 'ready' && (
              <div className="absolute top-2 left-2 z-20 flex flex-wrap items-center gap-1 rounded-xl border border-slate-600/70 bg-slate-900/90 px-2 py-1.5 shadow-xl backdrop-blur-sm pointer-events-auto">
                {(
                  [
                    { mode: 'select', label: 'Select', Icon: MousePointer2 },
                    { mode: 'polygon', label: 'Zone', Icon: Hexagon },
                    { mode: 'rectangle', label: 'Box', Icon: Square },
                    { mode: 'circle', label: 'Circle', Icon: Circle },
                  ] as const
                ).map(({ mode, label, Icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDrawMode(mode)}
                    title={label}
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
                      drawMode === mode
                        ? 'border-brand-500 bg-brand-500/20 text-brand-200'
                        : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon size={11} />
                    {label}
                  </button>
                ))}
                <div className="w-px h-4 bg-slate-600 mx-0.5" />
                <div className="flex items-center gap-1">
                  {['#f97316', '#ef4444', '#facc15', '#ffffff', '#3b82f6', '#22c55e'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setDrawColor(c)}
                      title={c}
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-transform ${
                        drawColor === c ? 'border-white scale-125' : 'border-slate-600'
                      }`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                {selectedShapeId && (
                  <>
                    <div className="w-px h-4 bg-slate-600 mx-0.5" />
                    <button
                      type="button"
                      onClick={deleteSelectedShape}
                      className="inline-flex items-center gap-1 rounded-md border border-red-800/50 bg-red-950/40 px-2 py-1 text-[10px] font-medium text-red-200 hover:bg-red-950/70"
                    >
                      <Trash2 size={10} />
                      Delete
                    </button>
                  </>
                )}
                {drawnCount > 0 && !selectedShapeId && (
                  <>
                    <div className="w-px h-4 bg-slate-600 mx-0.5" />
                    <button
                      type="button"
                      onClick={clearAllDrawings}
                      className="text-[10px] text-slate-400 hover:text-red-400"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            )}
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

            {/* Size control for selected marker */}
            {selectedId && (() => {
              const row = placed.find((r) => r.id === selectedId)
              const product = row ? getProductById(row.productId) : null
              if (!row || !product) return null
              const size = row.size ?? 1
              return (
                <div className="pointer-events-auto absolute top-2 right-2 z-30 rounded-xl border border-slate-600/80 bg-slate-900/95 shadow-2xl backdrop-blur-md p-3 w-52">
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <p className="text-[11px] font-semibold text-slate-100 leading-tight line-clamp-2">{product.name}</p>
                    <button
                      type="button"
                      aria-label="Deselect"
                      onClick={() => setSelectedId(null)}
                      className="shrink-0 p-0.5 rounded text-slate-400 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <label className="text-[10px] text-slate-400 flex items-center justify-between mb-1">
                    <span>Size</span>
                    <span className="text-slate-300 font-mono">{size.toFixed(1)}×</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPlaced((prev) => prev.map((r) => r.id === selectedId ? { ...r, size: Math.max(0.5, (r.size ?? 1) - 0.25) } : r))}
                      className="shrink-0 rounded border border-slate-600 p-1 text-slate-300 hover:bg-slate-700"
                    >
                      <ZoomOut size={10} />
                    </button>
                    <input
                      type="range"
                      min={0.5}
                      max={3}
                      step={0.25}
                      value={size}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value)
                        setPlaced((prev) => prev.map((r) => r.id === selectedId ? { ...r, size: v } : r))
                      }}
                      className="flex-1 h-1 accent-brand-500"
                    />
                    <button
                      type="button"
                      onClick={() => setPlaced((prev) => prev.map((r) => r.id === selectedId ? { ...r, size: Math.min(3, (r.size ?? 1) + 0.25) } : r))}
                      className="shrink-0 rounded border border-slate-600 p-1 text-slate-300 hover:bg-slate-700"
                    >
                      <ZoomIn size={10} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlacement(selectedId)}
                    className="mt-2 w-full inline-flex items-center justify-center gap-1 rounded-md border border-red-800/50 bg-red-950/30 py-1 text-[10px] font-medium text-red-200 hover:bg-red-950/60"
                  >
                    <Trash2 size={10} />
                    Remove from map
                  </button>
                </div>
              )
            })()}

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

      {/* AI chat panel — only shown once map is ready */}
      {status === 'ready' && (
        <AIChatPanel
          placed={placed}
          cartLines={cartLines}
          locationHint={searchDraft}
          drawnOverlaysRef={drawnOverlaysRef}
          drawnCount={drawnCount}
          addPlacements={(rows) => {
            setPlaced((prev) => [...prev, ...rows])
            setSelectedId(rows[0]?.id ?? null)
          }}
          replacePlacementsByIds={(removeIds, rows) => {
            const remove = new Set(removeIds)
            remove.forEach((id) => {
              const meta = markersRef.current.get(id)
              if (meta) {
                meta.marker.map = null
                markersRef.current.delete(id)
              }
            })
            setPlaced((prev) => [...prev.filter((r) => !remove.has(r.id)), ...rows])
            setSelectedId(rows[0]?.id ?? null)
          }}
        />
      )}
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

interface AIChatPanelProps {
  placed: SiteMapPlacedRow[]
  cartLines: { productId: string; quantity: number }[]
  locationHint: string
  drawnOverlaysRef: MutableRefObject<Map<string, google.maps.MVCObject>>
  addPlacements: (rows: SiteMapPlacedRow[]) => void
  replacePlacementsByIds: (removeIds: string[], rows: SiteMapPlacedRow[]) => void
  drawnCount: number
}

type ChatMsg = { role: 'assistant' | 'user'; content: string; recommendation?: AIRecommendation }

function ZoneRecommendationCard({ rec, onAddToCart }: { rec: AIRecommendation; onAddToCart: () => void }) {
  const [added, setAdded] = useState(false)
  const handleAdd = () => { onAddToCart(); setAdded(true) }
  return (
    <div className="mt-1.5 rounded-xl border border-brand-500/30 bg-slate-900/80 overflow-hidden text-[10px]">
      <div className="divide-y divide-slate-800/60 max-h-44 overflow-y-auto">
        {rec.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 px-2.5 py-1.5">
            <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              item.priority === 'required' ? 'bg-brand-400' :
              item.priority === 'recommended' ? 'bg-amber-400' : 'bg-slate-500'
            }`} />
            <span className="flex-1 text-slate-200 leading-snug">{item.quantity}× {item.productName}</span>
            <span className="text-slate-500 whitespace-nowrap">${(item.dailyRate * item.quantity).toFixed(0)}/day</span>
          </div>
        ))}
      </div>
      {rec.setupNotes.length > 0 && (
        <div className="px-2.5 py-1.5 border-t border-slate-800/60 bg-slate-950/30">
          {rec.setupNotes.slice(0, 2).map((n, i) => (
            <p key={i} className="text-[9px] text-amber-300/70 leading-snug">{n}</p>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-2 px-2.5 py-2 bg-slate-800/60 border-t border-slate-700/60">
        <div className="text-slate-300 font-semibold">
          ${rec.totalDailyRate.toFixed(0)}<span className="text-slate-500 font-normal">/day</span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={added}
          className="rounded-lg bg-brand-500 px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-brand-600 disabled:opacity-60 transition-colors"
        >
          {added ? '✓ Added to cart' : 'Add all to cart'}
        </button>
      </div>
    </div>
  )
}

const WELCOME =
  "Hello! I'm your AI Traffic Control Advisor. Describe your work zone scenario — lane closure type, road speed, crew size — and I'll recommend a compliant MUTCD Part 6 layout. If you've drawn a zone on the map, I can also place your equipment directly."

/** Same [Q:]/[A:] format as homepage JobAssistant / aiClient so choice chips + batch submit match. */
const SCENARIO_DETAIL_PROMPT = `I've measured your work zone — let me get a few quick details to generate the right NJDOT layout.

[Q: What type of work?]
[A: Utility / pipe work]
[A: Paving]
[A: Signal repair]
[A: Sidewalk / curb]
[A: Other / mixed]

[Q: Posted speed limit?]
[A: 25 mph]
[A: 30 mph]
[A: 35 mph]
[A: 45 mph]
[A: 50+ mph]
[A: Not sure]

[Q: How many lanes are closed or affected?]
[A: Shoulder only]
[A: One lane]
[A: Two lanes]
[A: Full closure]
[A: Other]`

function AIChatPanel({ placed, cartLines, locationHint, drawnOverlaysRef, addPlacements, replacePlacementsByIds, drawnCount }: AIChatPanelProps) {
  const aiPlacedIdsRef = useRef<string[]>([])
  const { addItem } = useCart()
  const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'assistant', content: WELCOME },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)
  const [awaitingScenario, setAwaitingScenario] = useState(false)
  const [choiceSelections, setChoiceSelections] = useState<Map<string, string>>(() => new Map())
  const [lockedQuestionMessages, setLockedQuestionMessages] = useState<Set<number>>(() => new Set())
  // Drag state — offset from default anchored position
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragStateRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open, messages.length])

  // ── drag ──────────────────────────────────────────────────────────────────
  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: dragOffset.x,
      originY: dragOffset.y,
    }
    const onMove = (ev: MouseEvent) => {
      if (!dragStateRef.current) return
      setDragOffset({
        x: dragStateRef.current.originX + ev.clientX - dragStateRef.current.startX,
        y: dragStateRef.current.originY + ev.clientY - dragStateRef.current.startY,
      })
    }
    const onUp = () => {
      dragStateRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // ── auto-analyze when zone is drawn ──────────────────────────────────────
  // Capture drawnCount at mount so we only react to NEW draws, not session-restored ones
  const initialDrawCountRef = useRef(drawnCount)
  useEffect(() => {
    if (drawnCount <= initialDrawCountRef.current) return
    void analyzeDrawnZone()
  }, [drawnCount]) // eslint-disable-line react-hooks/exhaustive-deps

  const analyzeDrawnZone = async (
    userContext?: string,
    options?: { addDrawingAckBubble?: boolean },
  ) => {
    const polygons = getDrawnPolygons()
    if (polygons.length === 0) return
    setOpen(true)
    setAnalyzing(true)
    setAwaitingScenario(false)
    const path = polygons[polygons.length - 1]!
    const mapArea = buildMapAreaFromPath(path, { address: locationHint || undefined })

    const addDrawingAckBubble = options?.addDrawingAckBubble !== false
    if (addDrawingAckBubble) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `I see you've drawn a work zone — ${mapArea.areaLabel}, ${mapArea.perimeterLabel} perimeter${locationHint ? ` near ${locationHint}` : ''}. Analyzing for NJDOT/MUTCD Part 6 compliance…`,
        },
      ])
    }

    try {
      const catalog = getProducts()
        .filter((p) =>
          ['cone', 'drum', 'sign', 'barricade', 'arrow', 'message', 'board', 'flash', 'vest', 'sandbag'].some((kw) =>
            p.name.toLowerCase().includes(kw) || p.categorySlug.includes(kw),
          ),
        )
        .slice(0, 50)

      const catalogStr = catalog
        .map((p) => `  id:"${p.id}" name:"${p.name}" cat:"${p.categorySlug}" rate:$${p.dailyRate}/day`)
        .join('\n')

      const speedNote = mapArea.postedSpeedMph
        ? `Posted speed: ${mapArea.postedSpeedMph} mph`
        : 'Posted speed: unknown — assume 35 mph for spacing'

      const footprintNote =
        mapArea.footprintMinSpanFt && mapArea.footprintMaxSpanFt
          ? `Footprint: ~${Math.round(mapArea.footprintMinSpanFt)} ft × ~${Math.round(mapArea.footprintMaxSpanFt)} ft`
          : ''

      const prompt = `You are a certified Traffic Control Supervisor (TCS) with deep expertise in NJDOT (New Jersey Department of Transportation) standards, the NJDOT Standard Details for Temporary Traffic Control (SDTTC), and MUTCD Part 6. You have extensive field experience in New Jersey and know exactly what is required vs. what is overkill.

A contractor has drawn a work zone on their site map. Analyze it and provide the MINIMUM legally required and practically necessary equipment under NJDOT rules. Do not pad the list — every item must justify its inclusion with a specific NJDOT or MUTCD reference.

KEY NJDOT RULES TO APPLY:
- Channelizing device spacing: 35 mph and below = 20 ft in taper, 40 ft in tangent; 40-45 mph = 30 ft taper, 60 ft tangent; 50+ mph = 40 ft taper, 80 ft tangent (NJDOT SDTTC)
- Advance warning sign spacing (Table 6C-1 MUTCD, enforced by NJDOT): <25 mph = 100 ft; 25-30 mph = 350 ft; 35 mph = 500 ft; 40-45 mph = 1000 ft; 50+ mph = 1500 ft
- Taper length: L = WS (W=lane width in ft, S=speed in mph) for speeds ≥ 45 mph; L = WS²/60 for <45 mph
- Arrow boards required when a lane is closed on roads ≥ 45 mph, or when directed by engineer
- Portable message boards (PCMs) required for work on NJ expressways and freeways and for overnight closures on arterials ≥ 45 mph
- Flaggers required when signal control is not in place and traffic must alternate; use Type III barricades at ends of one-lane alternating sections
- NJDOT requires retroreflective vests (ANSI Class 2 min daytime, Class 3 night) for ALL workers
- Sandbags: required to ballast signs and barricades on NJ roads (min 2 per sign stand, 4 per Type III barricade)
- Drums preferred over cones on NJ state highways ≥ 50 mph

WORK ZONE DATA:
- Area: ${mapArea.areaLabel} (${Math.round(mapArea.areaFt2).toLocaleString()} sq ft)
- Perimeter: ${mapArea.perimeterLabel}
- ${speedNote}
${locationHint ? `- Location: ${locationHint}` : ''}
${footprintNote ? `- ${footprintNote}` : ''}
${userContext ? `- Contractor-provided scenario details: ${userContext}` : ''}

CATALOG (use ONLY these product IDs — do not invent IDs):
${catalogStr}

INSTRUCTIONS:
1. Infer the scenario from zone dimensions (small zone ≈ utility/patch work; long narrow zone ≈ lane closure; wide zone ≈ intersection or ramp work)
2. Calculate actual device counts using NJDOT spacing rules above based on zone perimeter and estimated taper length
3. Select products from catalog that best match each required device type
4. Mark items "required" if mandated by NJDOT/MUTCD, "recommended" if strongly advised, "optional" if situational
5. Include rationale with specific rule citation (e.g. "MUTCD 6C-1, 35 mph spacing")

Return VALID JSON ONLY — no markdown fences, no prose before or after:
{
  "scenarioType": "concise label e.g. 'Single-lane closure on 35 mph arterial'",
  "summary": "3-4 sentences: scenario identification, key NJDOT requirements that apply, traffic impact, and any critical compliance notes",
  "items": [
    {
      "productId": "exact id from catalog list above",
      "productName": "exact name from catalog list above",
      "quantity": number,
      "rationale": "specific reason + NJDOT/MUTCD rule reference",
      "priority": "required|recommended|optional",
      "dailyRate": number (from catalog)
    }
  ],
  "setupNotes": [
    "NJDOT-specific setup or compliance note (e.g. permit requirements, inspector notification, etc.)"
  ],
  "estimatedDurationDays": number,
  "disclaimer": "AI-generated planning estimate only. Verify against your approved TCP and NJDOT permit conditions."
}`

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system:
            'You are an NJDOT/MUTCD Part 6 traffic control expert. Output ONLY valid JSON — no markdown, no prose, no code fences.',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2500,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { content?: { text: string }[] }
      const raw = data.content?.[0]?.text ?? ''
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON in response')

      const parsed = JSON.parse(jsonMatch[0]) as {
        scenarioType: string
        summary: string
        items: Array<{
          productId: string
          productName: string
          quantity: number
          rationale: string
          priority: 'required' | 'recommended' | 'optional'
          dailyRate: number
        }>
        setupNotes: string[]
        estimatedDurationDays: number
        disclaimer: string
      }

      const rec: AIRecommendation = {
        summary: parsed.summary,
        items: parsed.items.map((item) => ({
          ...item,
          category: getProductById(item.productId)?.categorySlug ?? 'equipment',
        })),
        totalDailyRate: parsed.items.reduce((s, i) => s + i.dailyRate * i.quantity, 0),
        estimatedDurationDays: parsed.estimatedDurationDays,
        setupNotes: parsed.setupNotes,
        disclaimer: parsed.disclaimer,
      }

      // Auto-place on map
      const cartItems = parsed.items.map((item) => {
        const p = getProductById(item.productId)
        return {
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          category: p?.categorySlug ?? 'equipment',
        }
      })

      let placedCount = 0
      try {
        let plan
        try {
          plan = await planWorkzoneLayout(mapArea, cartItems)
        } catch {
          plan = buildDemoPlan(mapArea, cartItems)
        }
        const newRows: SiteMapPlacedRow[] = plan.placements.map((pl) => ({
          id: crypto.randomUUID(),
          productId: pl.productId,
          lat: pl.lat,
          lng: pl.lng,
        }))
        replacePlacementsByIds(aiPlacedIdsRef.current, newRows)
        aiPlacedIdsRef.current = newRows.map((r) => r.id)
        placedCount = newRows.length
      } catch {
        /* placement failed — still show recommendation */
      }

      const placedNote =
        placedCount > 0
          ? ` I've placed ${placedCount} items on your map — drag any pin to adjust.`
          : ' Use the Generate Layout button to place these on the map.'

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `**${parsed.scenarioType}** — ${parsed.summary}${placedNote}`,
          recommendation: rec,
        },
      ])
    } catch {
      setAwaitingScenario(true)
      // Baseline NJDOT placement so the zone is populated immediately while
      // we wait for the contractor's clarifying answers. Defaults assume a
      // 35 mph single-lane closure — swapped out once real details arrive.
      let baselineCount = 0
      try {
        const speed = mapArea.postedSpeedMph ?? 35
        const baselineItems = [
          { productId: 'CON-28-STD', productName: '28" Traffic Cone', quantity: Math.max(12, Math.ceil(mapArea.perimeterFt / (speed >= 45 ? 30 : 20))), category: 'cones' },
          { productId: 'SGN-RU-RWA-36', productName: 'Road Work Ahead Sign', quantity: 2, category: 'signs' },
          { productId: 'BAR-T3-8FT', productName: 'Type III Barricade', quantity: 2, category: 'barricades' },
          { productId: 'ARR-TRL-15L', productName: 'Arrow Board Trailer', quantity: speed >= 45 ? 1 : 0, category: 'boards' },
        ].filter((i) => i.quantity > 0 && getProductById(i.productId))
        if (baselineItems.length > 0) {
          let plan
          try {
            plan = await planWorkzoneLayout(mapArea, baselineItems)
          } catch {
            plan = buildDemoPlan(mapArea, baselineItems)
          }
          const newRows: SiteMapPlacedRow[] = plan.placements.map((pl) => ({
            id: crypto.randomUUID(),
            productId: pl.productId,
            lat: pl.lat,
            lng: pl.lng,
          }))
          replacePlacementsByIds(aiPlacedIdsRef.current, newRows)
          aiPlacedIdsRef.current = newRows.map((r) => r.id)
          baselineCount = newRows.length
        }
      } catch {
        /* baseline placement best-effort */
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content:
            (baselineCount > 0
              ? `I've placed a baseline NJDOT layout (${baselineCount} items) — it will live-update as you answer below.\n\n`
              : '') + SCENARIO_DETAIL_PROMPT,
        },
      ])
    } finally {
      setAnalyzing(false)
    }
  }

  // ── context helpers ───────────────────────────────────────────────────────
  const getDrawnPolygons = () => {
    const polys: { lat: number; lng: number }[][] = []
    drawnOverlaysRef.current.forEach((o) => {
      try {
        // Polygon (Zone tool)
        const poly = o as google.maps.Polygon
        if (typeof poly.getPath === 'function') {
          const path = poly.getPath().getArray().map((ll) => ({ lat: ll.lat(), lng: ll.lng() }))
          if (path.length >= 3) { polys.push(path); return }
        }
        // Rectangle (Box tool)
        const rect = o as google.maps.Rectangle
        if (typeof rect.getBounds === 'function') {
          const b = rect.getBounds()
          if (b) {
            const ne = b.getNorthEast(), sw = b.getSouthWest()
            polys.push([
              { lat: ne.lat(), lng: sw.lng() },
              { lat: ne.lat(), lng: ne.lng() },
              { lat: sw.lat(), lng: ne.lng() },
              { lat: sw.lat(), lng: sw.lng() },
            ])
          }
          return
        }
        // Circle — approximate as 16-point polygon
        const circle = o as google.maps.Circle
        if (typeof circle.getCenter === 'function' && typeof circle.getRadius === 'function') {
          const center = circle.getCenter(), r = circle.getRadius()
          if (center && r > 0) {
            const pts = Array.from({ length: 16 }, (_, i) => {
              const angle = (i * Math.PI * 2) / 16
              return {
                lat: center.lat() + (r * Math.cos(angle)) / 111320,
                lng: center.lng() + (r * Math.sin(angle)) / (111320 * Math.cos((center.lat() * Math.PI) / 180)),
              }
            })
            polys.push(pts)
          }
        }
      } catch { /* unrecognized shape */ }
    })
    return polys
  }

  const buildSystemPrompt = () => {
    const placedSummary =
      placed.length === 0
        ? 'No equipment placed yet.'
        : placed
            .reduce<{ name: string; count: number }[]>((acc, r) => {
              const p = getProductById(r.productId)
              const name = p?.name ?? r.productId
              const ex = acc.find((a) => a.name === name)
              if (ex) ex.count++
              else acc.push({ name, count: 1 })
              return acc
            }, [])
            .map((a) => `${a.count}× ${a.name}`)
            .join(', ')

    const cartSummary =
      cartLines.length === 0
        ? 'Cart is empty.'
        : cartLines
            .map((l) => {
              const p = getProductById(l.productId)
              return `${l.quantity}× ${p?.name ?? l.productId}`
            })
            .join(', ')

    const polygonCount = getDrawnPolygons().length

    return `You are an expert Traffic Control Supervisor (TCS) and AI assistant for Traffic Control Rental — a professional traffic equipment rental service. Help contractors plan safe, MUTCD Part 6-compliant temporary traffic control setups.

CURRENT MAP STATE
- Location: ${locationHint || 'not specified'}
- Equipment placed on map: ${placedSummary}
- Cart items available: ${cartSummary}
- Drawn work zones on map: ${polygonCount === 0 ? 'none' : `${polygonCount} polygon(s)`}

INSTRUCTIONS
- Be concise, professional, and actionable — this is a working contractor tool.
- Reference specific cart items when giving placement advice.
- Base spacing and zone layout on MUTCD Part 6 (these are planning guidelines; field conditions govern).
- If the user wants to auto-place equipment on the map, tell them to click the "Generate Layout" button (it requires a drawn polygon zone on the map).
- Do NOT invent equipment not in the cart. If the cart is empty, recommend what to add.
- Keep responses under 120 words unless more detail is clearly needed.`
  }

  // ── send message ──────────────────────────────────────────────────────────
  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg = { role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])

    // If we were waiting for scenario details and a polygon exists, re-run full analysis
    if (awaitingScenario && getDrawnPolygons().length > 0) {
      void analyzeDrawnZone(text, { addDrawingAckBubble: false })
      return
    }

    const next = [...messages, userMsg]
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system: buildSystemPrompt(),
          messages: next.filter((m) => m.role !== 'assistant' || m !== messages[0]).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          max_tokens: 400,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as { content?: { text: string }[] }
      const reply = data.content?.[0]?.text ?? 'Sorry, I could not generate a response.'
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Unable to reach the AI — check your connection and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  // ── generate layout ───────────────────────────────────────────────────────
  const generateLayout = async () => {
    setGenError(null)
    const polygons = getDrawnPolygons()
    if (polygons.length === 0) {
      setGenError('Draw a zone on the map first, then click Generate.')
      return
    }
    if (cartLines.length === 0) {
      setGenError('Add equipment to your cart before generating a layout.')
      return
    }
    setGenerating(true)
    const path = polygons[0]!
    const mapArea = buildMapAreaFromPath(path, { address: locationHint || undefined })
    const items = cartLines.map((l) => {
      const p = getProductById(l.productId)
      return {
        productId: l.productId,
        productName: p?.name ?? l.productId,
        quantity: l.quantity,
        category: p?.categorySlug ?? 'equipment',
        dimensions: p?.specs?.dimensions,
      }
    })
    try {
      let plan
      try {
        plan = await planWorkzoneLayout(mapArea, items)
      } catch {
        plan = buildDemoPlan(mapArea, items)
      }
      const newRows: SiteMapPlacedRow[] = plan.placements.map((pl) => ({
        id: crypto.randomUUID(),
        productId: pl.productId,
        lat: pl.lat,
        lng: pl.lng,
      }))
      addPlacements(newRows)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `✓ Layout applied — ${newRows.length} items placed on your map based on the drawn zone. Drag any pin to fine-tune positions. Remember: these are planning guidelines; always verify against your project TCP and applicable state standards.`,
        },
      ])
    } catch {
      setGenError('Layout generation failed. Try again or simplify your cart.')
    } finally {
      setGenerating(false)
    }
  }

  const hasPolygon = getDrawnPolygons().length > 0

  const selectChoiceOption = (msgIndex: number, segIndex: number, option: string) => {
    if (loading || analyzing || lockedQuestionMessages.has(msgIndex)) return
    setChoiceSelections((prev) => new Map(prev).set(`${msgIndex}-${segIndex}`, option))
  }

  const submitScenarioChoiceBatch = (msgIndex: number) => {
    if (loading || analyzing || lockedQuestionMessages.has(msgIndex)) return
    const msg = messages[msgIndex]
    if (!msg || msg.role !== 'assistant') return
    const nonCartSegs = parseQASegments(msg.content)
    const choiceBlocks = nonCartSegs
      .map((seg, si) => ({ seg, si }))
      .filter(
        (x): x is { seg: { type: 'choices'; question: string; options: string[] }; si: number } =>
          x.seg.type === 'choices',
      )
    if (choiceBlocks.length === 0) return
    const allChosen = choiceBlocks.every(({ si }) => choiceSelections.has(`${msgIndex}-${si}`))
    if (!allChosen) return

    const body =
      'Here are my answers:\n' +
      choiceBlocks
        .map(({ seg, si }) => {
          const ans = choiceSelections.get(`${msgIndex}-${si}`)!
          return `• ${seg.question} ${ans}`
        })
        .join('\n')

    setLockedQuestionMessages((prev) => new Set(prev).add(msgIndex))
    setMessages((prev) => [...prev, { role: 'user', content: body }])
    void analyzeDrawnZone(body, { addDrawingAckBubble: false })
  }

  // ── collapsed trigger button ───────────────────────────────────────────────
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
        className="fixed bottom-[5.5rem] right-3 z-40 flex items-center gap-2 rounded-full border border-brand-500/60 bg-slate-900/95 px-3 py-2 text-xs font-semibold text-brand-200 shadow-2xl backdrop-blur-sm hover:bg-slate-800 transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
        </span>
        AI Layout Advisor
      </button>
    )
  }

  // ── expanded panel ─────────────────────────────────────────────────────────
  return (
    <div
      style={{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
      className="fixed bottom-[5.5rem] right-3 z-40 w-80 flex flex-col rounded-2xl border border-slate-600/80 bg-slate-900/95 shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Header / drag handle */}
      <div
        onMouseDown={onDragStart}
        className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-slate-700 cursor-grab active:cursor-grabbing select-none bg-slate-800/60"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
          </span>
          <span className="text-xs font-semibold text-slate-100 truncate">AI Traffic Control Advisor</span>
        </div>
        <button
          type="button"
          aria-label="Close advisor"
          onClick={() => setOpen(false)}
          className="shrink-0 p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X size={13} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-72 min-h-[80px]">
        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <div key={i} className="flex justify-end animate-slide-up">
                <div className="max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed bg-brand-500/20 border border-brand-500/30 text-white rounded-tr-sm whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            )
          }

          const segments = parseQASegments(m.content)
          const nonCartSegs = segments
          const choiceSegIndices = nonCartSegs
            .map((seg, si) => ({ seg, si }))
            .filter(
              (x): x is { seg: { type: 'choices'; question: string; options: string[] }; si: number } =>
                x.seg.type === 'choices',
            )
          const allChoicesPicked =
            choiceSegIndices.length > 0 &&
            choiceSegIndices.every(({ si }) => choiceSelections.has(`${i}-${si}`))
          const showBatchSubmit = choiceSegIndices.length > 0 && !lockedQuestionMessages.has(i) && !analyzing && !loading

          return (
            <div key={i} className="flex gap-2 min-w-0 animate-slide-up">
              <div className="w-6 h-6 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={11} className="text-brand-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                {nonCartSegs.length > 0 && (
                  <div className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-sm">
                    <div className="space-y-3">
                      {nonCartSegs.map((seg, si) =>
                        seg.type === 'text' ? (
                          seg.content.trim() ? (
                            <p key={si} className="whitespace-pre-wrap leading-relaxed">
                              {seg.content.trim()}
                            </p>
                          ) : null
                        ) : (
                          <div key={si} className="pt-0.5">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                              {seg.question}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {seg.options.map((opt) => {
                                const mapKey = `${i}-${si}`
                                const picked = choiceSelections.get(mapKey)
                                const isSelected = picked === opt
                                const locked = lockedQuestionMessages.has(i)
                                const isDisabled = locked || analyzing || loading
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => !isDisabled && selectChoiceOption(i, si, opt)}
                                    className={`px-2.5 py-1.5 text-xs rounded-lg border transition-all duration-150 ${
                                      isSelected
                                        ? 'bg-brand-500/30 border-brand-500/60 text-brand-200 font-medium'
                                        : isDisabled
                                          ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-default'
                                          : 'bg-slate-700/60 hover:bg-brand-500/20 border-slate-600 hover:border-brand-500/50 text-slate-300 hover:text-white cursor-pointer'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ),
                      )}
                      {showBatchSubmit && (
                        <div className="pt-2 border-t border-slate-700/60 space-y-2">
                          <p className="text-[11px] text-slate-500">
                            Pick one option for each question, then send them together.
                          </p>
                          <button
                            type="button"
                            onClick={() => submitScenarioChoiceBatch(i)}
                            disabled={!allChoicesPicked}
                            className="w-full rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            Send answers to AI
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {m.recommendation && (
                  <ZoneRecommendationCard
                    rec={m.recommendation}
                    onAddToCart={() => {
                      const days = Math.max(1, Math.floor(m.recommendation!.estimatedDurationDays))
                      for (const item of m.recommendation!.items) {
                        const p = getProductById(item.productId)
                        if (p) addItem(p, item.quantity, days)
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
        {(loading || analyzing) && (
          <div className="flex gap-2 min-w-0">
            <div className="w-6 h-6 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles size={11} className="text-brand-400" aria-hidden />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-slate-400 italic bg-slate-800/80 border border-slate-700">
              {analyzing ? 'Analyzing zone & preparing NJDOT recommendation…' : 'Thinking…'}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Generate layout CTA */}
      <div className="px-3 pt-1 pb-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() => void generateLayout()}
          disabled={generating || !hasPolygon || cartLines.length === 0}
          title={
            !hasPolygon
              ? 'Draw a zone on the map to enable this'
              : cartLines.length === 0
              ? 'Add equipment to your cart first'
              : 'Place your cart equipment inside the drawn zone'
          }
          className="w-full rounded-lg border border-brand-500/50 bg-brand-500/15 py-1.5 text-[11px] font-semibold text-brand-200 hover:bg-brand-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {generating ? 'Generating layout…' : '✦ Generate AI Equipment Layout'}
        </button>
        {genError && <p className="mt-1 text-[10px] text-amber-400/90">{genError}</p>}
        {!hasPolygon && (
          <p className="mt-0.5 text-[10px] text-slate-500 text-center">
            Draw a zone on the map to auto-place equipment
          </p>
        )}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
          placeholder="Describe your scenario or ask for advice…"
          rows={2}
          className="flex-1 resize-none rounded-lg border border-slate-700 bg-slate-800/90 px-2.5 py-2 text-[11px] text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/60 leading-snug"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={loading || !input.trim()}
          className="shrink-0 rounded-lg bg-brand-500 px-3 py-2 text-[11px] font-semibold text-white hover:bg-brand-600 disabled:opacity-40"
        >
          Send
        </button>
      </div>
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
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onPick}
      title={`Drag onto the map — or tap to place: ${product.name}`}
      className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/40 p-1.5 cursor-grab active:cursor-grabbing hover:border-brand-500/50 hover:bg-slate-800/70 transition-colors group select-none"
    >
      <div className="relative h-11 w-11 shrink-0 rounded-md overflow-hidden border border-slate-600 group-hover:border-brand-500/60 transition-colors">
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover pointer-events-none" draggable={false} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-100 leading-tight line-clamp-2">{product.name}</p>
        <p className="text-[9px] text-slate-500 mt-0.5">{product.sku}</p>
      </div>
      <GripVertical size={14} className="shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
    </div>
  )
}
