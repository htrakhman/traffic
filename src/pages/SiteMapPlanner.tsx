import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import {
  Download,
  MapPin,
  Navigation,
  Search,
  Trash2,
  X,
  MousePointer2,
  Layers,
  Package,
  Square,
  Circle,
  Hexagon,
  GripVertical,
  Sparkles,
  Pencil,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
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
import {
  getLowestRetailUnitPrice,
  getMinimumOrderQuantity,
  getPurchaseLineSubtotal,
  getRetailUnitPriceForQty,
  normalizeRecommendationPricing,
} from '../utils/pricing'

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || undefined
const MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID'

const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 }
const DEFAULT_ZOOM = 4
const GEOLOC_ZOOM = 16
/** Pixels per click for on-screen pan arrows (Google `panBy`: +x → east, +y → south). */
const MAP_PAN_STEP_PX = 140

const DRAG_MIME = 'application/x-traffickit-product'

type MapsAuthWindow = Window & { gm_authFailure?: () => void }

type MarkerMeta = {
  marker: google.maps.marker.AdvancedMarkerElement
  shell: HTMLDivElement
  size: number
  productId: string
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

type PlainLatLng = { lat: number; lng: number }

/** Turn a freehand polyline into a closed corridor polygon for zone-based AI (half-width ≈ feet each side). */
function bufferPolylineToPolygon(path: PlainLatLng[], halfWidthFt = 48): PlainLatLng[] | null {
  if (path.length < 2) return null
  const left: PlainLatLng[] = []
  const right: PlainLatLng[] = []
  for (let i = 0; i < path.length; i++) {
    const i0 = Math.max(0, i - 1)
    const i1 = Math.min(path.length - 1, i + 1)
    const dLng = path[i1]!.lng - path[i0]!.lng
    const dLat = path[i1]!.lat - path[i0]!.lat
    const len = Math.hypot(dLng, dLat) || 1e-12
    const tLng = dLng / len
    const tLat = dLat / len
    const nLng = -tLat
    const nLat = tLng
    const lat = path[i]!.lat
    const latScale = halfWidthFt / 364000
    const lngScale = halfWidthFt / (364000 * Math.cos((lat * Math.PI) / 180))
    left.push({ lat: lat + nLat * latScale, lng: path[i]!.lng + nLng * lngScale })
    right.push({ lat: lat - nLat * latScale, lng: path[i]!.lng - nLng * lngScale })
  }
  return [...left, ...[...right].reverse()]
}

function applyMarkerShellLayout(shell: HTMLDivElement, sizeMultiplier: number) {
  const px = Math.round(44 * sizeMultiplier)
  const capMaxWidth = Math.round(72 * sizeMultiplier)
  const capFontSize = Math.max(7, Math.round(9 * Math.min(sizeMultiplier, 1.5)))

  const card = shell.querySelector('[data-marker-card]') as HTMLDivElement | null
  if (card) {
    card.style.width = `${px}px`
    card.style.height = `${px}px`
  }
  const cap = shell.querySelector('[data-marker-cap]') as HTMLDivElement | null
  if (cap) {
    cap.style.maxWidth = `${capMaxWidth}px`
    cap.style.font = `600 ${capFontSize}px/1.1 system-ui,sans-serif`
  }
  const sizeRow = shell.querySelector('[data-marker-size-row]') as HTMLDivElement | null
  if (sizeRow) {
    sizeRow.style.maxWidth = `${Math.max(capMaxWidth, px)}px`
  }
  const slider = shell.querySelector('[data-size-slider]') as HTMLInputElement | null
  if (slider) {
    const cur = parseFloat(slider.value)
    if (!Number.isFinite(cur) || Math.abs(cur - sizeMultiplier) > 0.001) {
      slider.value = String(sizeMultiplier)
    }
  }
  const readout = shell.querySelector('[data-size-readout]') as HTMLSpanElement | null
  if (readout) readout.textContent = `${sizeMultiplier.toFixed(1)}×`
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
  card.setAttribute('data-marker-card', '')
  card.style.cssText = [
    'position:relative',
    `width:${px}px`,
    `height:${px}px`,
    'border-radius:8px',
    'overflow:visible',
    'background:#0f172a',
    'box-shadow:0 4px 14px rgba(0,0,0,0.45)',
    'border:2px solid',
    selected ? 'border-color:#fb923c' : 'border-color:rgba(255,255,255,0.35)',
  ].join(';')

  const del = document.createElement('button')
  del.type = 'button'
  del.setAttribute('data-delete-placement', '')
  del.setAttribute('aria-label', 'Remove from map')
  del.textContent = '×'
  del.style.cssText = [
    'position:absolute',
    'top:3px',
    'right:3px',
    'z-index:6',
    'width:18px',
    'height:18px',
    'padding:0',
    'margin:0',
    'border:none',
    'border-radius:999px',
    'cursor:pointer',
    'font:700 12px/1 system-ui,sans-serif',
    'color:#fff',
    'background:rgba(185,28,28,0.95)',
    'box-shadow:0 2px 8px rgba(0,0,0,0.5)',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'line-height:1',
    'pointer-events:auto',
  ].join(';')

  const imgHost = document.createElement('div')
  imgHost.style.cssText = 'position:absolute;inset:0;border-radius:6px;overflow:hidden;pointer-events:none'

  const img = document.createElement('img')
  img.src = product.imageUrl
  img.alt = ''
  img.draggable = false
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
  img.referrerPolicy = 'no-referrer-when-downgrade'
  img.onerror = () => {
    img.style.display = 'none'
    imgHost.textContent = '•'
    imgHost.style.display = 'flex'
    imgHost.style.alignItems = 'center'
    imgHost.style.justifyContent = 'center'
    imgHost.style.fontSize = '20px'
    imgHost.style.color = '#fb923c'
  }

  imgHost.appendChild(img)
  card.appendChild(imgHost)
  card.appendChild(del)

  const sizeRow = document.createElement('div')
  sizeRow.setAttribute('data-marker-size-row', '')
  sizeRow.style.cssText = [
    'display:flex',
    'flex-direction:row',
    'align-items:center',
    'gap:3px',
    `max-width:${Math.max(capMaxWidth, px)}px`,
    'width:100%',
    'padding:1px 0',
    'pointer-events:auto',
    'cursor:default',
  ].join(';')

  const readout = document.createElement('span')
  readout.setAttribute('data-size-readout', '')
  readout.textContent = `${sizeMultiplier.toFixed(1)}×`
  readout.style.cssText =
    'font:600 8px/1.1 ui-monospace,monospace;color:#cbd5e1;min-width:22px;text-align:center;user-select:none'

  const minus = document.createElement('button')
  minus.type = 'button'
  minus.setAttribute('data-size-minus', '')
  minus.textContent = '−'
  minus.style.cssText = [
    'flex-shrink:0',
    'width:18px',
    'height:18px',
    'padding:0',
    'border-radius:4px',
    'border:1px solid #475569',
    'background:#1e293b',
    'color:#e2e8f0',
    'font:700 12px/1 system-ui',
    'cursor:pointer',
    'line-height:1',
  ].join(';')

  const slider = document.createElement('input')
  slider.type = 'range'
  slider.setAttribute('data-size-slider', '')
  slider.min = '0.5'
  slider.max = '3'
  slider.step = '0.25'
  slider.value = String(sizeMultiplier)
  slider.style.cssText = [
    'flex:1',
    'min-width:0',
    'height:4px',
    'accent-color:#f97316',
    'cursor:pointer',
  ].join(';')

  const plus = document.createElement('button')
  plus.type = 'button'
  plus.setAttribute('data-size-plus', '')
  plus.textContent = '+'
  plus.style.cssText = minus.style.cssText

  sizeRow.appendChild(readout)
  sizeRow.appendChild(minus)
  sizeRow.appendChild(slider)
  sizeRow.appendChild(plus)

  const cap = document.createElement('div')
  cap.setAttribute('data-marker-cap', '')
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
  shell.appendChild(sizeRow)
  shell.appendChild(cap)
  return shell
}

function wireMarkerShellControls(
  shell: HTMLDivElement,
  rowId: string,
  ctl: MutableRefObject<{
    removePlacement: (id: string) => void
    setPlacementSize: (id: string, size: number) => void
  }>,
) {
  if (shell.dataset.markerControlsWired === '1') return
  shell.dataset.markerControlsWired = '1'

  const stopPe = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const stopPtr = (e: Event) => {
    e.stopPropagation()
  }

  const del = shell.querySelector('[data-delete-placement]')
  del?.addEventListener(
    'click',
    (e) => {
      stopPe(e)
      ctl.current.removePlacement(rowId)
    },
    true,
  )

  const slider = shell.querySelector('[data-size-slider]') as HTMLInputElement | null
  const bump = (delta: number) => {
    if (!slider) return
    const cur = parseFloat(slider.value) || 1
    const next = Math.min(3, Math.max(0.5, Math.round((cur + delta) * 4) / 4))
    slider.value = String(next)
    ctl.current.setPlacementSize(rowId, next)
  }

  shell.querySelector('[data-size-minus]')?.addEventListener('click', (e) => {
    stopPe(e)
    bump(-0.25)
  })
  shell.querySelector('[data-size-plus]')?.addEventListener('click', (e) => {
    stopPe(e)
    bump(0.25)
  })

  slider?.addEventListener('input', (e) => {
    e.stopPropagation()
    const v = parseFloat(slider.value)
    if (!Number.isFinite(v)) return
    ctl.current.setPlacementSize(rowId, v)
  })

  for (const el of [del, slider, shell.querySelector('[data-size-minus]'), shell.querySelector('[data-size-plus]')]) {
    el?.addEventListener('pointerdown', stopPtr, true)
    el?.addEventListener('mousedown', stopPtr, true)
  }

  const sizeRow = shell.querySelector('[data-marker-size-row]')
  sizeRow?.addEventListener('pointerdown', stopPtr, true)
  sizeRow?.addEventListener('mousedown', stopPtr, true)
}

type SiteMapPlannerProps = {
  /** When true, fills a parent with fixed height (e.g. homepage hero card) instead of full viewport under the header. */
  embedded?: boolean
}

export default function SiteMapPlanner({ embedded = false }: SiteMapPlannerProps) {
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
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)
  const suggestDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<google.maps.OverlayView | null>(null)
  const markersRef = useRef<Map<string, MarkerMeta>>(new Map())
  const advancedMarkerCtorRef = useRef<typeof google.maps.marker.AdvancedMarkerElement | null>(null)
  const pinElementCtorRef = useRef<typeof google.maps.marker.PinElement | null>(null)
  /** Geocoded / coordinate search result — distinct from equipment markers and the blue “your location” dot. */
  const addressReferenceMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const userLocationMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const workZonePolyRef = useRef<google.maps.Polygon | null>(null)
  const workZonePathRef = useRef(plannerBoot.workZonePath)
  const initialMapViewRef = useRef(plannerBoot.initialMapView)
  const placedRef = useRef(plannerBoot.placements)
  const searchDraftRef = useRef(plannerBoot.searchDraftInit)

  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [noKey, setNoKey] = useState(false)
  const [searchDraft, setSearchDraft] = useState(plannerBoot.searchDraftInit)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [placePredictions, setPlacePredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [suggestLoading, setSuggestLoading] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [placed, setPlaced] = useState<SiteMapPlacedRow[]>(plannerBoot.placements)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  /** Tap-to-place: pick a product, then click the map (mobile-friendly). */
  const [pendingProductId, setPendingProductId] = useState<string | null>(null)

  type DrawMode = 'select' | 'freehand' | 'polygon' | 'rectangle' | 'circle'
  const [drawMode, setDrawMode] = useState<DrawMode>('select')
  const [drawColor, setDrawColor] = useState('#f97316')
  const [drawnCount, setDrawnCount] = useState(0)
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const drawingMgrRef = useRef<google.maps.drawing.DrawingManager | null>(null)
  const drawnOverlaysRef = useRef<Map<string, google.maps.MVCObject>>(new Map())
  const drawColorRef = useRef(drawColor)
  const drawModeRef = useRef(drawMode)
  const pendingProductIdRef = useRef(pendingProductId)
  /** In-progress freehand stroke (pointer captured on map div). */
  const freehandStrokeRef = useRef<{ path: PlainLatLng[]; lastPx: { x: number; y: number } } | null>(null)
  const suppressNextMapClickRef = useRef(false)

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
      const card = meta.shell.querySelector('[data-marker-card]') as HTMLDivElement | null
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

  const markerShellControlRef = useRef({
    removePlacement: (_id: string) => {},
    setPlacementSize: (_id: string, _size: number) => {},
  })
  markerShellControlRef.current.removePlacement = removePlacement
  markerShellControlRef.current.setPlacementSize = (id, size) => {
    const clamped = Math.min(3, Math.max(0.5, size))
    setPlaced((prev) => prev.map((r) => (r.id === id ? { ...r, size: clamped } : r)))
  }

  const upsertMarker = useCallback(
    (row: SiteMapPlacedRow, product: Product) => {
      const AdvancedMarkerElement = advancedMarkerCtorRef.current
      const map = mapRef.current
      if (!AdvancedMarkerElement || !map) return

      const rowSize = row.size ?? 1
      let meta = markersRef.current.get(row.id)

      if (meta && meta.productId !== row.productId) {
        meta.marker.map = null
        markersRef.current.delete(row.id)
        meta = undefined
      }

      if (!meta) {
        const shell = buildMarkerShell(product, false, rowSize)
        wireMarkerShellControls(shell, row.id, markerShellControlRef)
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

        meta = { marker, shell, size: rowSize, productId: row.productId }
        markersRef.current.set(row.id, meta)
      } else {
        meta.marker.position = { lat: row.lat, lng: row.lng }
        applyMarkerShellLayout(meta.shell, rowSize)
        meta.size = rowSize
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
  drawModeRef.current = drawMode
  pendingProductIdRef.current = pendingProductId

  const panMapByPixels = useCallback((dx: number, dy: number) => {
    mapRef.current?.panBy(dx, dy)
  }, [])

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
      libraries: ['marker', 'drawing', 'places'],
      mapIds: [MAP_ID],
    })

    let cancelled = false
    let idleListener: google.maps.MapsEventListener | null = null
    let idlePersistTimer: number | null = null

    Promise.all([importLibrary('maps'), importLibrary('marker'), importLibrary('drawing'), importLibrary('places')])
      .then(([_, markerLib]) => {
        if (cancelled || !mapDivRef.current) return
        const ml = markerLib as google.maps.MarkerLibrary
        advancedMarkerCtorRef.current = ml.AdvancedMarkerElement
        pinElementCtorRef.current = ml.PinElement
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
        autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()

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

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              if (cancelled || !mapRef.current) return
              const m = mapRef.current
              const here = { lat: pos.coords.latitude, lng: pos.coords.longitude }
              m.setCenter(here)
              m.setZoom(GEOLOC_ZOOM)

              const AdvancedMarkerElement = advancedMarkerCtorRef.current
              if (!AdvancedMarkerElement) return
              const prevUserLoc = userLocationMarkerRef.current
              if (prevUserLoc) prevUserLoc.map = null
              const dot = document.createElement('div')
              dot.style.cssText = [
                'width:16px',
                'height:16px',
                'border-radius:999px',
                'background:#2563eb',
                'border:2px solid #fff',
                'box-shadow:0 2px 8px rgba(0,0,0,0.45)',
              ].join(';')
              dot.title = 'Your location'
              userLocationMarkerRef.current = new AdvancedMarkerElement({
                map: m,
                position: here,
                content: dot,
                zIndex: 200,
                title: 'Your location',
              })
            },
            () => {},
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 30_000 },
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
      if (suggestDebounceRef.current) {
        clearTimeout(suggestDebounceRef.current)
        suggestDebounceRef.current = null
      }
      idleListener?.remove()
      workZonePolyRef.current?.setMap(null)
      workZonePolyRef.current = null
      const addrRefMarker = addressReferenceMarkerRef.current
      if (addrRefMarker) addrRefMarker.map = null
      addressReferenceMarkerRef.current = null
      const userLocMarker = userLocationMarkerRef.current
      if (userLocMarker) userLocMarker.map = null
      userLocationMarkerRef.current = null
      markersRef.current.forEach((m) => {
        m.marker.map = null
      })
      markersRef.current.clear()
      drawnOverlaysRef.current.forEach((o) => (o as google.maps.Polyline).setMap(null))
      drawnOverlaysRef.current.clear()
      drawingMgrRef.current = null
      advancedMarkerCtorRef.current = null
      pinElementCtorRef.current = null
      overlayRef.current = null
      autocompleteServiceRef.current = null
      sessionTokenRef.current = null
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

  const placeAddressReferenceMarker = useCallback((lat: number, lng: number, title?: string) => {
    const map = mapRef.current
    const AdvancedMarkerElement = advancedMarkerCtorRef.current
    const PinElement = pinElementCtorRef.current
    if (!map || !AdvancedMarkerElement || !PinElement) return

    const prev = addressReferenceMarkerRef.current
    if (prev) {
      prev.map = null
      addressReferenceMarkerRef.current = null
    }

    const pin = new PinElement({
      background: '#f43f5e',
      borderColor: '#9f1239',
      glyphColor: '#ffffff',
      scale: 1.12,
    })
    addressReferenceMarkerRef.current = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      content: pin,
      title: title?.trim() || 'Searched address',
      zIndex: 85,
      gmpClickable: false,
    })
  }, [])

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
      placeAddressReferenceMarker(plain.lat, plain.lng, q)
      setSuggestionsOpen(false)
      setPlacePredictions([])
      setHighlightIdx(-1)
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
      const lat = first.geometry.location.lat()
      const lng = first.geometry.location.lng()
      placeAddressReferenceMarker(lat, lng, first.formatted_address ?? q)
      setSuggestionsOpen(false)
      setPlacePredictions([])
      setHighlightIdx(-1)
      window.setTimeout(() => schedulePersistSession(), 100)
    } catch {
      setSearchError('Search failed.')
    }
  }, [searchDraft, schedulePersistSession, placeAddressReferenceMarker])

  const selectPlacePrediction = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      if (!geocoderRef.current) return
      geocoderRef.current.geocode({ placeId: prediction.place_id }, (results, geostatus) => {
        if (geostatus !== 'OK' || !results?.[0]?.geometry?.location) {
          setSearchError('Could not resolve that place. Try another result or press Go.')
          return
        }
        const m = mapRef.current
        if (!m) return
        const loc = results[0].geometry.location
        m.setCenter(loc)
        m.setZoom(15)
        placeAddressReferenceMarker(
          loc.lat(),
          loc.lng(),
          results[0].formatted_address ?? prediction.description,
        )
        setSearchDraft(results[0].formatted_address ?? prediction.description)
        setSearchError(null)
        setSuggestionsOpen(false)
        setPlacePredictions([])
        setHighlightIdx(-1)
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
        window.setTimeout(() => schedulePersistSession(), 100)
      })
    },
    [schedulePersistSession, placeAddressReferenceMarker],
  )

  const pickSuggestionByFlatIndex = useCallback(
    (idx: number) => {
      const q = searchDraft.trim()
      const coord = parseLatLngPlain(q)
      let at = 0
      if (coord) {
        if (idx === at) {
          const m = mapRef.current
          if (!m) return
          m.setCenter(coord)
          m.setZoom(17)
          placeAddressReferenceMarker(coord.lat, coord.lng, q)
          setSearchError(null)
          setSuggestionsOpen(false)
          setPlacePredictions([])
          setHighlightIdx(-1)
          sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
          window.setTimeout(() => schedulePersistSession(), 100)
          return
        }
        at += 1
      }
      const pi = idx - at
      if (pi >= 0 && pi < placePredictions.length) {
        selectPlacePrediction(placePredictions[pi])
      }
    },
    [searchDraft, placePredictions, selectPlacePrediction, schedulePersistSession, placeAddressReferenceMarker],
  )

  useEffect(() => {
    setHighlightIdx(-1)
  }, [searchDraft])

  useEffect(() => {
    if (status !== 'ready') return
    const onDoc = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) {
        setSuggestionsOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [status])

  /** Debounced Places address suggestions while typing (same service as Job Assistant map search). */
  useEffect(() => {
    if (status !== 'ready' || !autocompleteServiceRef.current) return
    const q = searchDraft.trim()
    if (suggestDebounceRef.current) clearTimeout(suggestDebounceRef.current)

    if (q.length < 2) {
      setPlacePredictions([])
      setSuggestLoading(false)
      setHighlightIdx(-1)
      return
    }

    setSuggestLoading(true)
    suggestDebounceRef.current = setTimeout(() => {
      void (async () => {
        const m = mapRef.current
        const coordDirect = parseLatLngPlain(q)

        if (!coordDirect) {
          sessionTokenRef.current ??= new google.maps.places.AutocompleteSessionToken()
          const preds = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve) => {
            autocompleteServiceRef.current!.getPlacePredictions(
              {
                input: q,
                sessionToken: sessionTokenRef.current!,
                bounds: m?.getBounds() ?? undefined,
              },
              (predictions, st) => {
                if (st !== 'OK' && st !== 'ZERO_RESULTS') resolve([])
                else resolve(predictions?.slice(0, 8) ?? [])
              },
            )
          })
          setPlacePredictions(preds)
        } else {
          setPlacePredictions([])
        }
        setSuggestLoading(false)
      })()
    }, 280)

    return () => {
      if (suggestDebounceRef.current) clearTimeout(suggestDebounceRef.current)
    }
  }, [searchDraft, status])

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
      if (suppressNextMapClickRef.current) {
        suppressNextMapClickRef.current = false
        return
      }
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
        if (freehandStrokeRef.current) {
          freehandStrokeRef.current = null
          mapRef.current?.setOptions({ draggable: true })
        }
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
    if (drawMode === 'select' || drawMode === 'freehand') {
      mgr.setDrawingMode(null)
    } else {
      mgr.setDrawingMode(drawMode as google.maps.drawing.OverlayType)
    }
  }, [drawMode])

  /** Cancel in-progress freehand if user switches tools or leaves freehand mode. */
  useEffect(() => {
    if (drawMode === 'freehand') return
    if (!freehandStrokeRef.current) return
    freehandStrokeRef.current = null
    mapRef.current?.setOptions({ draggable: true })
  }, [drawMode])

  /** Freehand draw: pointer-drag on the map builds a {@link google.maps.Polyline}. */
  useEffect(() => {
    if (status !== 'ready' || drawMode !== 'freehand') return
    const el = mapDivRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    const pxToLl = (clientX: number, clientY: number): PlainLatLng | null => {
      const projection = overlay.getProjection()
      if (!projection) return null
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const ll = projection.fromContainerPixelToLatLng(new google.maps.Point(x, y))
      return ll ? { lat: ll.lat(), lng: ll.lng() } : null
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      if (drawModeRef.current !== 'freehand' || pendingProductIdRef.current) return
      const ll = pxToLl(e.clientX, e.clientY)
      if (!ll) return
      e.preventDefault()
      mapRef.current?.setOptions({ draggable: false })
      freehandStrokeRef.current = { path: [ll], lastPx: { x: e.clientX, y: e.clientY } }
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* already captured or unsupported */
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const stroke = freehandStrokeRef.current
      if (!stroke) return
      const dx = e.clientX - stroke.lastPx.x
      const dy = e.clientY - stroke.lastPx.y
      if (dx * dx + dy * dy < 16) return
      const ll = pxToLl(e.clientX, e.clientY)
      if (!ll) return
      stroke.path.push(ll)
      stroke.lastPx = { x: e.clientX, y: e.clientY }
    }

    const finishStroke = (e: PointerEvent) => {
      if (!freehandStrokeRef.current) return
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* not captured */
      }
      const stroke = freehandStrokeRef.current
      freehandStrokeRef.current = null
      const map = mapRef.current
      if (map) map.setOptions({ draggable: true })
      if (!stroke || stroke.path.length < 2) return
      if (!map) return
      const id = crypto.randomUUID()
      const poly = new google.maps.Polyline({
        path: stroke.path,
        map,
        strokeColor: drawColorRef.current,
        strokeWeight: 3,
        strokeOpacity: 1,
        clickable: true,
        zIndex: 5,
      })
      drawnOverlaysRef.current.set(id, poly)
      google.maps.event.addListener(poly, 'click', () => {
        setSelectedShapeId(id)
      })
      suppressNextMapClickRef.current = true
      setDrawMode('select')
      setDrawnCount((n) => n + 1)
      setSelectedShapeId(id)
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', finishStroke)
    el.addEventListener('pointercancel', finishStroke)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', finishStroke)
      el.removeEventListener('pointercancel', finishStroke)
      if (freehandStrokeRef.current) {
        freehandStrokeRef.current = null
        mapRef.current?.setOptions({ draggable: true })
      }
    }
  }, [status, drawMode])

  const deleteSelectedShape = useCallback(() => {
    if (!selectedShapeId) return
    const overlay = drawnOverlaysRef.current.get(selectedShapeId)
    if (overlay) {
      (overlay as google.maps.Polyline).setMap(null)
      drawnOverlaysRef.current.delete(selectedShapeId)
      setDrawnCount((n) => n - 1)
    }
    setSelectedShapeId(null)
  }, [selectedShapeId])

  const clearAllDrawings = useCallback(() => {
    drawnOverlaysRef.current.forEach((o) => (o as google.maps.Polyline).setMap(null))
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
    const noKeyBody = (
      <>
        <MapPin className="mx-auto mb-3 text-slate-500" size={28} />
        <p className="text-sm leading-relaxed">
          Add <code className="text-brand-300">VITE_GOOGLE_MAPS_API_KEY</code> to your{' '}
          <code className="text-brand-300">.env</code> file to use the layout planner (same key as the rest of the site).
        </p>
      </>
    )
    if (embedded) {
      return (
        <div
          role="region"
          aria-label="Site map planner"
          className="h-full min-h-[220px] flex items-center justify-center p-6 text-center text-slate-300 bg-slate-950/40"
        >
          <div className="max-w-md rounded-xl border border-slate-700 bg-slate-900/60 p-6">{noKeyBody}</div>
        </div>
      )
    }
    return (
      <main className="min-h-screen pt-24 px-4 pb-16 bg-slate-950">
        <div className="max-w-lg mx-auto rounded-xl border border-slate-700 bg-slate-900/60 p-8 text-center text-slate-300">
          {noKeyBody}
        </div>
      </main>
    )
  }

  if (status === 'error') {
    const errBody = (
      <p className="text-sm text-red-200/90 leading-relaxed">
        Google Maps did not load. Confirm your API key, billing, and that the{' '}
        <strong className="text-red-100">Maps JavaScript API</strong>, <strong className="text-red-100">Places API</strong>, and{' '}
        <strong className="text-red-100">Geocoding API</strong> are enabled for this origin.
      </p>
    )
    if (embedded) {
      return (
        <div
          role="region"
          aria-label="Site map planner"
          className="h-full min-h-[220px] flex items-center justify-center p-6 bg-slate-950/40"
        >
          <div className="max-w-md rounded-xl border border-red-800/40 bg-red-950/30 p-6">{errBody}</div>
        </div>
      )
    }
    return (
      <main className="min-h-screen pt-24 px-4 pb-16 bg-slate-950">
        <div className="max-w-lg mx-auto rounded-xl border border-red-800/40 bg-red-950/30 p-6">{errBody}</div>
      </main>
    )
  }

  const rootClass = embedded
    ? 'h-full min-h-0 flex flex-col overflow-hidden bg-slate-950'
    : 'h-screen pt-16 bg-slate-950 flex flex-col overflow-hidden'

  const PlannerShell = embedded ? 'div' : 'main'
  const plannerShellProps = embedded
    ? ({ role: 'region' as const, 'aria-label': 'Site map planner' as const } as const)
    : ({} as const)

  const searchTrim = searchDraft.trim()
  const coordHint = parseLatLngPlain(searchTrim)
  const suggestionCount = (coordHint ? 1 : 0) + placePredictions.length
  const showSuggestDropdown = suggestionsOpen && searchTrim.length >= 2 && status === 'ready'

  return (
    <PlannerShell className={rootClass} {...plannerShellProps}>
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
          <div ref={searchWrapRef} className="relative flex-1 min-w-0 z-50">
            <Search size={12} className="absolute left-2 top-1/2 z-[1] -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="planner-address-search"
              type="text"
              value={searchDraft}
              onChange={(e) => {
                setSearchDraft(e.target.value)
                setSuggestionsOpen(true)
              }}
              onFocus={() => setSuggestionsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSuggestionsOpen(false)
                  setHighlightIdx(-1)
                  return
                }
                if (!showSuggestDropdown) return
                if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && suggestionCount === 0) return
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setHighlightIdx((i) => (i < 0 ? 0 : Math.min(i + 1, Math.max(suggestionCount - 1, 0))))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setHighlightIdx((i) => {
                    if (suggestionCount <= 0) return -1
                    if (i <= 0) return suggestionCount - 1
                    return i - 1
                  })
                } else if (e.key === 'Enter' && highlightIdx >= 0 && suggestionCount > 0) {
                  e.preventDefault()
                  pickSuggestionByFlatIndex(highlightIdx)
                }
              }}
              placeholder="Search address or lat, lng"
              role="combobox"
              aria-expanded={showSuggestDropdown}
              aria-controls="planner-search-suggestions"
              autoComplete="off"
              className="w-full rounded-md border border-slate-700 bg-slate-800/90 py-1 pl-6 pr-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-brand-500/50"
            />
            {showSuggestDropdown && (
              <div
                id="planner-search-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-full z-[60] mt-0.5 max-h-64 overflow-y-auto rounded-md border border-slate-600 bg-slate-900 shadow-xl"
              >
                {suggestLoading && suggestionCount === 0 && (
                  <div className="px-2.5 py-2 text-xs text-slate-400">Searching addresses…</div>
                )}
                {coordHint && (
                  <button
                    type="button"
                    role="option"
                    aria-selected={highlightIdx === 0}
                    onMouseDown={(ev) => ev.preventDefault()}
                    onClick={() => pickSuggestionByFlatIndex(0)}
                    className={`flex w-full items-start gap-2 px-2.5 py-2 text-left text-xs transition-colors ${
                      highlightIdx === 0 ? 'bg-brand-500/25 text-white' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <MapPin size={13} className="mt-0.5 shrink-0 text-brand-400" aria-hidden />
                    <span>
                      <span className="block font-medium text-slate-100">Coordinates</span>
                      <span className="text-[10px] text-slate-500">
                        {coordHint.lat.toFixed(5)}, {coordHint.lng.toFixed(5)}
                      </span>
                    </span>
                  </button>
                )}
                {placePredictions.length > 0 && (
                  <>
                    <div
                      className={`px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500 ${
                        coordHint ? 'border-t border-slate-700/80' : ''
                      }`}
                    >
                      Addresses
                    </div>
                    {placePredictions.map((p, i) => {
                      const idx = (coordHint ? 1 : 0) + i
                      const main = p.structured_formatting?.main_text ?? p.description
                      const sec = p.structured_formatting?.secondary_text
                      return (
                        <button
                          key={p.place_id}
                          type="button"
                          role="option"
                          aria-selected={highlightIdx === idx}
                          onMouseDown={(ev) => ev.preventDefault()}
                          onClick={() => pickSuggestionByFlatIndex(idx)}
                          className={`flex w-full items-start gap-2 px-2.5 py-2 text-left text-xs transition-colors ${
                            highlightIdx === idx ? 'bg-brand-500/25 text-white' : 'text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <Navigation size={13} className="mt-0.5 shrink-0 text-sky-400/90" aria-hidden />
                          <span>
                            <span className="block text-slate-100">{main}</span>
                            {sec && <span className="text-[10px] text-slate-500">{sec}</span>}
                          </span>
                        </button>
                      )
                    })}
                  </>
                )}
                {!suggestLoading && !coordHint && placePredictions.length === 0 && (
                  <div className="px-2.5 py-2 text-xs leading-snug text-slate-500">
                    No matches yet. Press <span className="text-slate-400">Go</span> to search, or keep typing.
                  </div>
                )}
              </div>
            )}
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
                    { mode: 'freehand', label: 'Draw', Icon: Pencil },
                    { mode: 'polygon', label: 'Zone', Icon: Hexagon },
                    { mode: 'rectangle', label: 'Box', Icon: Square },
                    { mode: 'circle', label: 'Circle', Icon: Circle },
                  ] as const
                ).map(({ mode, label, Icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDrawMode(mode)}
                    title={mode === 'freehand' ? 'Freehand — click and drag on the map' : label}
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
            {status === 'ready' && (
              <div
                className="absolute top-14 right-2 z-30 flex flex-col items-center gap-px rounded-lg border border-slate-500/35 bg-slate-900/40 p-0.5 shadow-md backdrop-blur-md pointer-events-auto"
                role="group"
                aria-label="Pan map with arrow buttons"
              >
                <button
                  type="button"
                  onClick={() => panMapByPixels(0, -MAP_PAN_STEP_PX)}
                  className="flex h-6 w-6 items-center justify-center rounded border border-slate-500/40 bg-slate-800/45 text-slate-100 hover:bg-slate-800/70 hover:text-white"
                  aria-label="Pan map north"
                >
                  <ChevronUp size={12} strokeWidth={2.25} />
                </button>
                <div className="flex gap-px">
                  <button
                    type="button"
                    onClick={() => panMapByPixels(-MAP_PAN_STEP_PX, 0)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-slate-500/40 bg-slate-800/45 text-slate-100 hover:bg-slate-800/70 hover:text-white"
                    aria-label="Pan map west"
                  >
                    <ChevronLeft size={12} strokeWidth={2.25} />
                  </button>
                  <button
                    type="button"
                    onClick={() => panMapByPixels(MAP_PAN_STEP_PX, 0)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-slate-500/40 bg-slate-800/45 text-slate-100 hover:bg-slate-800/70 hover:text-white"
                    aria-label="Pan map east"
                  >
                    <ChevronRight size={12} strokeWidth={2.25} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => panMapByPixels(0, MAP_PAN_STEP_PX)}
                  className="flex h-6 w-6 items-center justify-center rounded border border-slate-500/40 bg-slate-800/45 text-slate-100 hover:bg-slate-800/70 hover:text-white"
                  aria-label="Pan map south"
                >
                  <ChevronDown size={12} strokeWidth={2.25} />
                </button>
              </div>
            )}
            {status === 'loading' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 text-slate-400 text-sm">
                Loading map…
              </div>
            )}
            <div
              ref={mapDivRef}
              className={`absolute inset-0 w-full h-full ${pendingProductId || drawMode === 'freehand' ? 'cursor-crosshair' : ''}`}
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
    </PlannerShell>
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
        {rec.items.map((item, i) => {
          const p = getProductById(item.productId)
          const line = p ? getPurchaseLineSubtotal(p, item.quantity) : item.unitPrice * item.quantity
          return (
          <div key={i} className="flex items-start gap-2 px-2.5 py-1.5">
            <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              item.priority === 'required' ? 'bg-brand-400' :
              item.priority === 'recommended' ? 'bg-amber-400' : 'bg-slate-500'
            }`} />
            <span className="flex-1 text-slate-200 leading-snug">{item.quantity}× {item.productName}</span>
            <span className="text-slate-500 whitespace-nowrap">${line.toFixed(0)} line</span>
          </div>
          )
        })}
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
          ${rec.estimatedMerchandiseSubtotal.toFixed(0)}<span className="text-slate-500 font-normal"> merch</span>
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
  'Describe your closure, speed, and crew — I’ll suggest a MUTCD Part 6–style layout. Draw a zone to auto-place cart items.'

const ADVISOR_EXAMPLES: { title: string; blurb: string; prompt: string }[] = [
  {
    title: 'Urban lane closure',
    blurb: 'One lane, 35 mph, short daytime shift, small crew',
    prompt:
      'Single-lane closure on a 35 mph two-lane road, utility work, 3 workers, about 4 hours daytime. What advance signs, taper length, and channelizing devices do I need?',
  },
  {
    title: 'Shoulder / high-speed',
    blurb: '55 mph state route, shoulder work only',
    prompt:
      'Shoulder-only maintenance on a 55 mph state highway, 5 workers, single daytime shift. What’s the minimum advance warning and buffer setup?',
  },
  {
    title: 'Overnight paving',
    blurb: '45 mph arterial, one lane closed, flaggers',
    prompt:
      'Overnight paving: 45 mph arterial, one lane closed overnight for two nights, alternating traffic with flaggers, 8-person crew. Key compliance reminders?',
  },
]

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

  // ── ask clarifying questions when a new zone is drawn ───────────────────
  // Capture drawnCount at mount so we only react to NEW draws, not session-restored ones
  const initialDrawCountRef = useRef(drawnCount)
  useEffect(() => {
    if (drawnCount <= initialDrawCountRef.current) return
    const polygons = getDrawnPolygons()
    if (polygons.length === 0) return
    const path = polygons[polygons.length - 1]!
    const mapArea = buildMapAreaFromPath(path, { address: locationHint || undefined })
    setOpen(true)
    setAwaitingScenario(true)
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant' as const,
        content: `I see you've drawn a work zone — ${mapArea.areaLabel}, ${mapArea.perimeterLabel} perimeter${locationHint ? ` near ${locationHint}` : ''}. Answer these so I can size an NJDOT/MUTCD Part 6 compliant layout:

[Q: What type of work?]
[A: Lane closure]
[A: Shoulder work]
[A: Full road closure]
[A: Intersection work]
[A: Utility / patch]
[A: Flagging operation]

[Q: Road & posted speed?${mapArea.postedSpeedMph ? ` (map ~${mapArea.postedSpeedMph} mph)` : ''}]
[A: Local / residential — under 35 mph]
[A: 35 mph local road]
[A: 45 mph arterial]
[A: 55 mph state highway]
[A: 65+ mph interstate]

[Q: Duration & time of day?]
[A: Short daytime shift (under 4 hrs)]
[A: Single daytime shift]
[A: Multi-day daytime]
[A: Overnight single shift]
[A: Multi-day / 24-hour]

[Q: Lanes affected?]
[A: Shoulder only]
[A: One lane closed]
[A: Two lanes closed]
[A: Alternating one-lane with flaggers]
[A: Full closure]

[Q: Crew size?]
[A: 1–2 workers]
[A: 3–5 workers]
[A: 6–10 workers]
[A: More than 10]`,
      },
    ])
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
        .map((p) => {
          const moq = getMinimumOrderQuantity(p)
          const low = getLowestRetailUnitPrice(p)
          return `  id:"${p.id}" name:"${p.name}" cat:"${p.categorySlug}" minQty:${moq} lowestTierUnit:$${low.toFixed(2)}`
        })
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
      "unitPrice": number (retail $ per unit at this line's quantity — must match catalog tier for that quantity)
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
          unitPrice: number
        }>
        setupNotes: string[]
        estimatedDurationDays: number
        disclaimer: string
      }

      const rec: AIRecommendation = normalizeRecommendationPricing({
        summary: parsed.summary,
        items: parsed.items.map((item) => {
          const legacy = item as { unitPrice?: number; dailyRate?: number }
          const unitPriceGuess =
            typeof legacy.unitPrice === 'number'
              ? legacy.unitPrice
              : typeof legacy.dailyRate === 'number'
                ? legacy.dailyRate
                : 0
          return {
            productId: item.productId,
            productName: item.productName,
            category: getProductById(item.productId)?.categorySlug ?? 'equipment',
            quantity: item.quantity,
            rationale: item.rationale,
            priority: item.priority,
            unitPrice: unitPriceGuess,
          }
        }),
        estimatedMerchandiseSubtotal: 0,
        estimatedDurationDays: parsed.estimatedDurationDays,
        setupNotes: parsed.setupNotes,
        disclaimer: parsed.disclaimer,
      })

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
    } catch (err) {
      console.error('[advisor] analyzeDrawnZone failed', err)
      // If the user already answered the clarifying questions, don't re-ask —
      // surface the failure so they can retry or describe in free text.
      {
        setAwaitingScenario(false)
        // Build a rules-based recommendation locally so the user still gets a
        // cart-ready layout when the AI service misbehaves.
        const ctx = (userContext ?? '').toLowerCase()
        const speedMatch = ctx.match(/(\d{2})\s*mph/)
        const speed = speedMatch ? Number(speedMatch[1]) : mapArea.postedSpeedMph ?? 35
        const fullClosure = /full closure|road closed/.test(ctx)
        const twoLanes = /two lanes|2 lanes/.test(ctx)
        const tangentSpacing = speed >= 50 ? 80 : speed >= 40 ? 60 : 40
        const coneQty = Math.max(12, Math.ceil(mapArea.perimeterFt / tangentSpacing) * 2)
        const fallbackItems: Array<{
          productId: string
          productName: string
          quantity: number
          rationale: string
          priority: 'required' | 'recommended' | 'optional'
          category: string
          unitPrice: number
        }> = []
        const allProducts = getProducts()
        const findBy = (predicate: (p: ReturnType<typeof getProducts>[number]) => boolean) =>
          allProducts.find(predicate)
        const push = (
          p: ReturnType<typeof getProducts>[number] | undefined,
          qty: number,
          rationale: string,
          priority: 'required' | 'recommended' | 'optional',
        ) => {
          if (!p || qty <= 0) return
          fallbackItems.push({
            productId: p.id,
            productName: p.name,
            quantity: qty,
            rationale,
            priority,
            category: p.categorySlug,
            unitPrice: getRetailUnitPriceForQty(p, qty),
          })
        }
        const cone = findBy((p) => p.categorySlug === 'cones-drums' && /cone/i.test(p.name))
        const sign = findBy((p) => p.categorySlug === 'signs-sign-stands' && /road work|rwa|work ahead/i.test(p.name)) ?? findBy((p) => p.categorySlug === 'signs-sign-stands')
        const barricade = findBy((p) => p.categorySlug === 'barricades-barriers' && /type iii|type 3|barricade/i.test(p.name)) ?? findBy((p) => p.categorySlug === 'barricades-barriers')
        const arrowBoard = findBy((p) => p.categorySlug === 'arrow-boards')
        const messageBoard = findBy((p) => p.categorySlug === 'message-boards')
        const vest = findBy((p) => /vest|ansi class/i.test(p.name))
        push(cone, coneQty, `NJDOT SDTTC channelizing spacing at ${speed} mph (${tangentSpacing} ft tangent).`, 'required')
        push(sign, fullClosure ? 3 : 2, 'Advance warning per MUTCD Table 6C-1.', 'required')
        push(barricade, fullClosure ? 4 : 2, 'End-of-closure delineation; NJDOT requires Type III barricades at closure termini.', 'required')
        push(arrowBoard, speed >= 45 || fullClosure || twoLanes ? 1 : 0, `Arrow board required for lane closures at ${speed} mph per NJDOT.`, 'required')
        push(messageBoard, speed >= 45 ? 1 : 0, 'PCMS advised for ≥45 mph arterials/expressways.', 'recommended')
        push(vest, 2, 'ANSI Class 2/3 PPE for workers.', 'required')
        const rec: AIRecommendation = normalizeRecommendationPricing({
          summary: `Rules-based NJDOT fallback for ~${Math.round(mapArea.perimeterFt)} ft perimeter at ${speed} mph${fullClosure ? ', full closure' : twoLanes ? ', two-lane closure' : ''}. AI service was unavailable — these quantities follow NJDOT SDTTC and MUTCD Part 6 spacing tables.`,
          items: fallbackItems,
          estimatedMerchandiseSubtotal: 0,
          estimatedDurationDays: 1,
          setupNotes: [
            'Verify against your approved TCP and NJDOT permit conditions.',
            'Field conditions govern — adjust taper length and device spacing as required.',
          ],
          disclaimer: 'Rules-based fallback (AI service unavailable). Verify against your approved TCP and NJDOT permit.',
        })
        // Auto-place fallback items on the map.
        try {
          const cartItems = fallbackItems.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            quantity: i.quantity,
            category: i.category,
          }))
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
        } catch {
          /* best-effort placement */
        }
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant' as const,
            content: `**NJDOT rules-based layout** — ${rec.summary} Click Add to Cart to check out.`,
            recommendation: rec,
          },
        ])
        return
      }
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
          let plan: Awaited<ReturnType<typeof planWorkzoneLayout>>
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
        // Polyline (freehand) → corridor polygon for zone-based planning
        if (o instanceof google.maps.Polyline) {
          const path = o.getPath().getArray().map((ll) => ({ lat: ll.lat(), lng: ll.lng() }))
          if (path.length >= 2) {
            const buff = bufferPolylineToPolygon(path)
            if (buff && buff.length >= 3) polys.push(buff)
          }
          return
        }
        // Polygon (Zone tool)
        if (o instanceof google.maps.Polygon) {
          const path = o.getPath().getArray().map((ll) => ({ lat: ll.lat(), lng: ll.lng() }))
          if (path.length >= 3) polys.push(path)
          return
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
  const dispatchUserMessage = async (rawText: string) => {
    const text = rawText.trim()
    if (!text || loading) return
    const userMsg = { role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    const next = [...messages, userMsg]

    if (awaitingScenario && getDrawnPolygons().length > 0) {
      void analyzeDrawnZone(text, { addDrawingAckBubble: false })
      return
    }

    const welcomeRef = messages[0]
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system: buildSystemPrompt(),
          messages: next.filter((m) => m.role !== 'assistant' || m !== welcomeRef).map((m) => ({
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

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    await dispatchUserMessage(text)
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
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80 min-h-[80px]">
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
                  <div
                    className={`rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-sm ${
                      i === 0
                        ? 'px-2.5 py-2 text-[11px] leading-snug'
                        : 'px-3.5 py-2.5 text-sm leading-relaxed'
                    }`}
                  >
                    <div className="space-y-3">
                      {nonCartSegs.map((seg, si) =>
                        seg.type === 'text' ? (
                          seg.content.trim() ? (
                            <p
                              key={si}
                              className={i === 0 ? 'whitespace-pre-wrap leading-snug' : 'whitespace-pre-wrap leading-relaxed'}
                            >
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
                {i === 0 && (
                  <div className="space-y-1">
                    <p className="text-[9px] font-medium uppercase tracking-wide text-slate-500">Examples — tap to ask</p>
                    <div className="flex flex-col gap-1.5">
                      {ADVISOR_EXAMPLES.map((ex) => {
                        const busy = loading || analyzing || generating
                        return (
                          <button
                            key={ex.title}
                            type="button"
                            disabled={busy}
                            onClick={() => void dispatchUserMessage(ex.prompt)}
                            className="rounded-lg border border-slate-700/90 bg-slate-800/40 px-2 py-1.5 text-left transition-colors hover:border-brand-500/45 hover:bg-slate-800/70 disabled:cursor-not-allowed disabled:opacity-45"
                          >
                            <p className="text-[11px] font-semibold text-slate-100 leading-tight">{ex.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{ex.blurb}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                {m.recommendation && (
                  <ZoneRecommendationCard
                    rec={m.recommendation}
                    onAddToCart={() => {
                      for (const item of m.recommendation!.items) {
                        const p = getProductById(item.productId)
                        if (p) addItem(p, item.quantity)
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
