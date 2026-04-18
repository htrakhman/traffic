import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { MapPin, MapPinned, Navigation, Trash2, PenLine, RotateCcw, Search } from 'lucide-react'
import type { MapArea } from '../../types'
import { fetchPostedSpeedNearPoint } from '../../utils/roadsApi'
import { parseLatLngPlain } from '../../utils/locationParse'
import { fetchOsmConstructionNear, type OsmConstructionItem } from '../../utils/osmConstruction'

interface Props {
  value?: MapArea
  onChange: (area: MapArea | undefined) => void
  /** Shorter map + tighter copy for the chat composer strip */
  variant?: 'default' | 'compact'
  /** Compact mode only: map canvas grows with parent (“large map” layout in Job Assistant). */
  fillHeight?: boolean
  /** Compact + fillHeight: use a much taller map (XL layout / fullscreen). */
  tallFrame?: boolean
  /**
   * Compact + fillHeight only (not `tallFrame`): stronger minimum map height for in-panel “larger map”
   * without browser fullscreen — avoids the default ~180px floor feeling too small.
   */
  fillHeightBoost?: boolean
}

export type MapAreaSelectorHandle = {
  flyTo: (lat: number, lng: number, zoom?: number) => void
  searchAndFocus: (query: string) => Promise<{ ok: boolean; error?: string; label?: string }>
  /** Same as the on-map “Draw work zone” control — enters polygon mode when the map is ready. */
  startWorkZoneDraw: () => void
}

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || undefined
/** Required for {@link google.maps.marker.AdvancedMarkerElement}; matches Google's <gmp-map map-id="DEMO_MAP_ID"> samples until you set your own in Cloud Console. */
const MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID'

/** Default center/zoom aligned with Google's web component "Simple Marker" sample (`<gmp-map center="…" zoom="4">`). */
const DEFAULT_MAP_CENTER = { lat: 40.12150192260742, lng: -100.45039367675781 }
const DEFAULT_MAP_ZOOM = 4

/**
 * Same “map + one marker” idea as Google’s native samples, but this repo is **web-only** (Maps JavaScript API):
 * - iOS (Swift, `GMSMapView` + `GMSMarker`): https://github.com/googlemaps-samples/maps-sdk-for-ios-samples/blob/main/tutorials/map-with-marker/map-with-marker/ViewController.swift
 * - Android (Kotlin): https://github.com/googlemaps-samples/android-samples/tree/main/tutorials/kotlin/MapWithMarker
 */

type MapsAuthWindow = Window & { gm_authFailure?: () => void }

/** Convert meters to feet */
const M_TO_FT = 3.28084

/** Compute polygon area in m² using the spherical excess formula via google.maps.geometry */
function computeAreaM2(path: google.maps.LatLng[]): number {
  return google.maps.geometry.spherical.computeArea(path)
}

/** Compute polygon perimeter in m */
function computePerimeterM(path: google.maps.LatLng[]): number {
  let total = 0
  for (let i = 0; i < path.length; i++) {
    const a = path[i]
    const b = path[(i + 1) % path.length]
    total += google.maps.geometry.spherical.computeDistanceBetween(a, b)
  }
  return total
}

function centroid(path: { lat: number; lng: number }[]): { lat: number; lng: number } {
  const lat = path.reduce((s, p) => s + p.lat, 0) / path.length
  const lng = path.reduce((s, p) => s + p.lng, 0) / path.length
  return { lat, lng }
}

function fmt(n: number, unit: string): string {
  return `${Math.round(n).toLocaleString()} ${unit}`
}

const MapAreaSelector = forwardRef<MapAreaSelectorHandle, Props>(function MapAreaSelector(
  { value, onChange, variant = 'default', fillHeight = false, tallFrame = false, fillHeightBoost = false },
  ref,
) {
  const compact = variant === 'compact'
  const stretch = compact && fillHeight
  const stretchMapMin =
    tallFrame
      ? 'min-h-[min(72svh,920px)]'
      : fillHeightBoost
        ? 'min-h-[min(48svh,560px)]'
        : 'min-h-[180px]'
  const containerRef = useRef<HTMLDivElement>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const drawingRef = useRef<google.maps.drawing.DrawingManager | null>(null)
  const polygonRef = useRef<google.maps.Polygon | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)
  const osmAbortRef = useRef<AbortController | null>(null)
  const suggestDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Bumps when the polygon is cleared or rebuilt so in-flight Roads requests do not overwrite state. */
  const roadsFetchGen = useRef(0)

  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [drawing, setDrawing] = useState(false)
  const [noKey, setNoKey] = useState(false)
  const [searchDraft, setSearchDraft] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchBusy, setSearchBusy] = useState(false)
  const [placePredictions, setPlacePredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [osmConstruction, setOsmConstruction] = useState<OsmConstructionItem[]>([])
  const [suggestLoading, setSuggestLoading] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)

  const applyCenter = useCallback((lat: number, lng: number, zoom: number) => {
    const map = mapRef.current
    if (!map) return
    map.setCenter({ lat, lng })
    map.setZoom(zoom)
    if (markerRef.current) markerRef.current.position = { lat, lng }
    google.maps.event.trigger(map, 'resize')
  }, [])

  const runSearch = useCallback(
    async (query: string): Promise<{ ok: boolean; error?: string; label?: string }> => {
      const q = query.trim()
      if (!q) return { ok: false, error: 'Enter a place or coordinates.' }
      const plain = parseLatLngPlain(q)
      if (plain) {
        if (!mapRef.current) return { ok: false, error: 'Map still loading — try again shortly.' }
        applyCenter(plain.lat, plain.lng, 17)
        return { ok: true, label: `${plain.lat.toFixed(5)}, ${plain.lng.toFixed(5)}` }
      }
      if (!mapRef.current || !geocoderRef.current) {
        return { ok: false, error: 'Map still loading — try again shortly.' }
      }
      try {
        const { results } = await geocoderRef.current.geocode({ address: q })
        const first = results[0]
        if (!first?.geometry?.location) {
          return {
            ok: false,
            error: 'No results. Try a street, city, or highway + milepost (e.g. I-95 mile 45 FL).',
          }
        }
        const lat = first.geometry.location.lat()
        const lng = first.geometry.location.lng()
        applyCenter(lat, lng, 15)
        return { ok: true, label: first.formatted_address }
      } catch {
        return { ok: false, error: 'Search failed.' }
      }
    },
    [applyCenter],
  )

  const selectPlacePrediction = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      if (!geocoderRef.current) return
      geocoderRef.current.geocode({ placeId: prediction.place_id }, (results, geostatus) => {
        if (geostatus !== 'OK' || !results?.[0]?.geometry?.location) {
          setSearchError('Could not resolve that place. Press Go or pick another result.')
          return
        }
        const loc = results[0].geometry.location
        applyCenter(loc.lat(), loc.lng(), 16)
        setSearchDraft(results[0].formatted_address ?? prediction.description)
        setSearchError(null)
        setSuggestionsOpen(false)
        setPlacePredictions([])
        setOsmConstruction([])
        setHighlightIdx(-1)
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
      })
    },
    [applyCenter],
  )

  const selectOsmItem = useCallback(
    (item: OsmConstructionItem) => {
      applyCenter(item.lat, item.lng, 17)
      setSearchDraft((d) => (d.trim().length >= 2 ? d : item.label))
      setSearchError(null)
      setSuggestionsOpen(false)
      setPlacePredictions([])
      setOsmConstruction([])
      setHighlightIdx(-1)
    },
    [applyCenter],
  )

  const pickSuggestionByFlatIndex = useCallback(
    (idx: number) => {
      const q = searchDraft.trim()
      const coord = parseLatLngPlain(q)
      let at = 0
      if (coord) {
        if (idx === at) {
          applyCenter(coord.lat, coord.lng, 17)
          setSearchError(null)
          setSuggestionsOpen(false)
          setHighlightIdx(-1)
          sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
          return
        }
        at += 1
      }
      const pi = idx - at
      if (pi >= 0 && pi < placePredictions.length) {
        selectPlacePrediction(placePredictions[pi])
        return
      }
      at += placePredictions.length
      const oi = idx - at
      if (oi >= 0 && oi < osmConstruction.length) {
        selectOsmItem(osmConstruction[oi])
      }
    },
    [searchDraft, placePredictions, osmConstruction, applyCenter, selectPlacePrediction, selectOsmItem],
  )

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSearchError(null)
    setSearchBusy(true)
    const r = await runSearch(searchDraft)
    setSearchBusy(false)
    if (r.ok) {
      setSearchError(null)
      setSuggestionsOpen(false)
      setPlacePredictions([])
      setOsmConstruction([])
      setHighlightIdx(-1)
    } else {
      setSearchError(r.error ?? 'Not found.')
    }
  }

  const clearPolygon = useCallback(() => {
    roadsFetchGen.current += 1
    polygonRef.current?.setMap(null)
    polygonRef.current = null
    onChange(undefined)
    setDrawing(false)
    drawingRef.current?.setDrawingMode(null)
  }, [onChange])

  const buildArea = useCallback(
    async (polygon: google.maps.Polygon) => {
      const path = polygon.getPath().getArray()
      const areaM2 = computeAreaM2(path)
      const perimeterM = computePerimeterM(path)
      const areaFt2 = areaM2 * M_TO_FT * M_TO_FT
      const perimeterFt = perimeterM * M_TO_FT

      const latLngs = path.map((p) => ({ lat: p.lat(), lng: p.lng() }))
      const center = centroid(latLngs)

      let address: string | undefined
      if (geocoderRef.current) {
        try {
          const result = await geocoderRef.current.geocode({ location: center })
          address = result.results[0]?.formatted_address
        } catch {
          // ignore geocoder errors
        }
      }

      const gen = ++roadsFetchGen.current
      const basePayload: MapArea = {
        path: latLngs,
        areaFt2,
        perimeterFt,
        areaLabel: fmt(areaFt2, 'sq ft'),
        perimeterLabel: fmt(perimeterFt, 'ft'),
        address,
        center,
      }
      onChange(basePayload)

      if (MAPS_KEY) {
        try {
          const road = await fetchPostedSpeedNearPoint(center.lat, center.lng, MAPS_KEY)
          if (gen !== roadsFetchGen.current || !road) return
          onChange({
            ...basePayload,
            postedSpeedMph: road.postedSpeedMph,
            postedSpeedLabel: road.postedSpeedLabel,
          })
        } catch {
          // Posted speed optional (Google license / OSM coverage)
        }
      }
    },
    [onChange],
  )

  const startDrawing = useCallback(() => {
    if (!drawingRef.current) return
    clearPolygon()
    drawingRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
    setDrawing(true)
  }, [clearPolygon])

  useImperativeHandle(
    ref,
    () => ({
      flyTo: (lat: number, lng: number, zoom = 17) => applyCenter(lat, lng, zoom),
      searchAndFocus: (q: string) => runSearch(q),
      startWorkZoneDraw: () => startDrawing(),
    }),
    [applyCenter, runSearch, startDrawing],
  )

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

  useEffect(() => {
    setHighlightIdx(-1)
  }, [searchDraft])

  /** Repaint tiles when entering/exiting browser fullscreen. */
  useEffect(() => {
    const onFs = () => {
      window.requestAnimationFrame(() => {
        if (mapRef.current) google.maps.event.trigger(mapRef.current, 'resize')
      })
    }
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [status])

  /** Debounced Places + construction (OSM) suggestions as the user types. */
  useEffect(() => {
    if (status !== 'ready' || !autocompleteServiceRef.current) return
    const q = searchDraft.trim()
    if (suggestDebounceRef.current) clearTimeout(suggestDebounceRef.current)

    if (q.length < 2) {
      osmAbortRef.current?.abort()
      setPlacePredictions([])
      setOsmConstruction([])
      setSuggestLoading(false)
      setHighlightIdx(-1)
      return
    }

    setSuggestLoading(true)
    suggestDebounceRef.current = setTimeout(() => {
      void (async () => {
        const map = mapRef.current
        const coordDirect = parseLatLngPlain(q)

        if (!coordDirect) {
          sessionTokenRef.current ??= new google.maps.places.AutocompleteSessionToken()
          const preds = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve) => {
            autocompleteServiceRef.current!.getPlacePredictions(
              {
                input: q,
                sessionToken: sessionTokenRef.current!,
                bounds: map?.getBounds() ?? undefined,
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

        osmAbortRef.current?.abort()
        const center = map?.getCenter()
        const zoom = map?.getZoom() ?? 0
        let osm: OsmConstructionItem[] = []
        if (center && zoom >= 11) {
          const radiusM = zoom >= 15 ? 4500 : zoom >= 13 ? 7500 : 12_000
          const ac = new AbortController()
          osmAbortRef.current = ac
          try {
            osm = await fetchOsmConstructionNear(center.lat(), center.lng(), radiusM, ac.signal)
            const qlow = q.toLowerCase()
            if (q.length >= 4) {
              osm = osm.filter(
                (it) =>
                  it.label.toLowerCase().includes(qlow) ||
                  qlow
                    .split(/\s+/)
                    .some((w) => w.length > 2 && it.label.toLowerCase().includes(w)),
              )
            }
            osm = osm.slice(0, 6)
          } catch {
            if (!ac.signal.aborted) osm = []
          }
        }
        setOsmConstruction(osm)
        setSuggestLoading(false)
      })()
    }, 280)

    return () => {
      if (suggestDebounceRef.current) clearTimeout(suggestDebounceRef.current)
    }
  }, [searchDraft, status])

  /** Google Maps does not always repaint when the container grows (e.g. “Large map” mode). */
  useEffect(() => {
    if (status !== 'ready' || !containerRef.current || !mapRef.current) return
    const el = containerRef.current
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        if (mapRef.current) google.maps.event.trigger(mapRef.current, 'resize')
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [status, fillHeight, tallFrame])

  useEffect(() => {
    if (!MAPS_KEY) {
      setNoKey(true)
      return
    }
    setStatus('loading')

    const w = window as MapsAuthWindow
    const prevAuthFailure = w.gm_authFailure
    w.gm_authFailure = () => {
      setStatus('error')
    }

    setOptions({
      key: MAPS_KEY,
      v: 'weekly',
      libraries: ['drawing', 'geometry', 'marker', 'places'],
      mapIds: [MAP_ID],
    })

    Promise.all([
      importLibrary('maps'),
      importLibrary('drawing'),
      importLibrary('geometry'),
      importLibrary('marker'),
      importLibrary('places'),
    ])
      .then((libs) => {
        if (!containerRef.current) return

        const { AdvancedMarkerElement } = libs[3] as google.maps.MarkerLibrary

        const map = new google.maps.Map(containerRef.current, {
          center: DEFAULT_MAP_CENTER,
          zoom: DEFAULT_MAP_ZOOM,
          mapId: MAP_ID,
          mapTypeId: 'roadmap',
          disableDefaultUI: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        })
        mapRef.current = map

        // Web equivalent of <gmp-advanced-marker> (requires mapId + marker library).
        markerRef.current = new AdvancedMarkerElement({
          map,
          position: DEFAULT_MAP_CENTER,
          title: 'Map center — draw a polygon for your work zone',
        })

        // Try to geolocate user
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const here = { lat: pos.coords.latitude, lng: pos.coords.longitude }
              map.setCenter(here)
              map.setZoom(15)
              if (markerRef.current) markerRef.current.position = here
            },
            () => {},
          )
        }

        geocoderRef.current = new google.maps.Geocoder()
        autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()

        const dm = new google.maps.drawing.DrawingManager({
          drawingMode: null,
          drawingControl: false,
          polygonOptions: {
            fillColor: '#f97316',
            fillOpacity: 0.25,
            strokeColor: '#f97316',
            strokeWeight: 2,
            editable: true,
            draggable: true,
          },
        })
        dm.setMap(map)
        drawingRef.current = dm

        google.maps.event.addListener(dm, 'polygoncomplete', (poly: google.maps.Polygon) => {
          polygonRef.current = poly
          dm.setDrawingMode(null)
          setDrawing(false)
          buildArea(poly)

          // Re-build area whenever the polygon is edited
          const updateArea = () => buildArea(poly)
          google.maps.event.addListener(poly.getPath(), 'set_at', updateArea)
          google.maps.event.addListener(poly.getPath(), 'insert_at', updateArea)
          google.maps.event.addListener(poly.getPath(), 'remove_at', updateArea)
        })

        setStatus('ready')
      })
      .catch(() => setStatus('error'))

    return () => {
      w.gm_authFailure = prevAuthFailure
      if (markerRef.current) {
        markerRef.current.map = null
        markerRef.current = null
      }
      polygonRef.current?.setMap(null)
      polygonRef.current = null
      drawingRef.current?.setMap(null)
      drawingRef.current = null
      autocompleteServiceRef.current = null
      sessionTokenRef.current = null
      mapRef.current = null
    }
  }, [buildArea])

  if (noKey) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-center text-sm text-slate-400">
        <MapPin size={20} className="mx-auto mb-2 text-slate-600" />
        Add <code className="text-slate-300">VITE_GOOGLE_MAPS_API_KEY</code> to your{' '}
        <code className="text-slate-300">.env</code> file to enable map area drawing.
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-red-800/50 bg-red-900/20 p-4 text-sm text-red-200/90 space-y-3">
        <p className="font-medium text-red-300">Google Maps did not load for this site.</p>
        <p className="text-xs text-red-200/70 leading-relaxed">
          In Google Cloud Console: enable billing, enable the <strong className="text-red-200">Maps JavaScript API</strong>,{' '}
          <strong className="text-red-200">Geocoding API</strong>, <strong className="text-red-200">Places API</strong> (for search
          suggestions), and (optional) <strong className="text-red-200">Roads API</strong> on the key if you use Google speed limits (Asset
          Tracking), and allow
          this origin under API key HTTP referrer restrictions (for local dev include{' '}
          <code className="text-red-100/90">http://localhost:*</code> or your exact Vite URL). Check the browser console for a specific
          Maps error code.
        </p>
        <a
          href="https://developers.google.com/maps/documentation/javascript/error-messages"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs font-medium text-brand-400 hover:text-brand-300"
        >
          Maps JavaScript API error reference →
        </a>
      </div>
    )
  }

  const searchTrim = searchDraft.trim()
  const coordHint = parseLatLngPlain(searchTrim)
  const suggestionCount =
    (coordHint ? 1 : 0) + placePredictions.length + osmConstruction.length
  const showSuggestDropdown = suggestionsOpen && searchTrim.length >= 2

  return (
    <div
      className={
        stretch ? 'flex flex-col flex-1 min-h-0 gap-2' : 'space-y-2'
      }
    >
      {status === 'ready' && (
        <form
          onSubmit={(e) => void handleSearchSubmit(e)}
          className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-1'}`}
        >
          {compact && (
            <div className="flex items-center gap-1.5 px-0.5">
              <Navigation size={12} className="shrink-0 text-sky-400/90" aria-hidden />
              <label
                htmlFor="map-area-search"
                className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-sky-400/90"
              >
                Map search
              </label>
              <span className="hidden min-[380px]:inline text-[10px] text-slate-500">Moves pin & view</span>
            </div>
          )}
          <div className="flex gap-1.5 items-stretch">
            <div ref={searchWrapRef} className="relative min-w-0 flex-1">
              <Search
                size={14}
                className={`pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 ${
                  compact ? 'text-sky-500/75' : 'text-slate-500'
                }`}
                aria-hidden
              />
              <input
                id={compact ? 'map-area-search' : undefined}
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
                  if (
                    (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
                    suggestionCount === 0
                  )
                    return
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
                placeholder={
                  compact
                    ? 'Address, highway + milepost, or coordinates…'
                    : 'Search address, highway + milepost, or coordinates'
                }
                disabled={searchBusy}
                role="combobox"
                aria-expanded={showSuggestDropdown}
                aria-controls="map-search-suggestions"
                autoComplete="off"
                className={
                  compact
                    ? 'w-full rounded-md border border-sky-500/30 bg-slate-950/75 py-2 pl-8 pr-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-sky-400/55 focus:ring-1 focus:ring-sky-500/25 disabled:opacity-50'
                    : 'w-full rounded-lg border border-slate-600/90 bg-slate-900/70 py-2 pl-8 pr-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-sky-500/45 focus:ring-1 focus:ring-sky-500/20 disabled:opacity-50'
                }
              />
              {showSuggestDropdown && (
                <div
                  id="map-search-suggestions"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-[30] mt-0.5 max-h-72 overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 shadow-xl"
                >
                  {suggestLoading && suggestionCount === 0 && (
                    <div className="px-3 py-2.5 text-xs text-slate-400">Searching places and nearby road data…</div>
                  )}
                  {coordHint && (
                    <button
                      type="button"
                      role="option"
                      aria-selected={highlightIdx === 0}
                      onMouseDown={(ev) => ev.preventDefault()}
                      onClick={() => pickSuggestionByFlatIndex(0)}
                      className={`flex w-full items-start gap-2 px-3 py-2 text-left text-xs transition-colors ${
                        highlightIdx === 0 ? 'bg-brand-500/25 text-white' : 'text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <MapPin size={14} className="mt-0.5 shrink-0 text-brand-400" aria-hidden />
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
                        className={`px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500 ${
                          coordHint ? 'border-t border-slate-700/80' : ''
                        }`}
                      >
                        Places
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
                            className={`flex w-full items-start gap-2 px-3 py-2 text-left text-xs transition-colors ${
                              highlightIdx === idx ? 'bg-brand-500/25 text-white' : 'text-slate-200 hover:bg-slate-800'
                            }`}
                          >
                            <Navigation size={14} className="mt-0.5 shrink-0 text-sky-400/90" aria-hidden />
                            <span>
                              <span className="block text-slate-100">{main}</span>
                              {sec && <span className="text-[10px] text-slate-500">{sec}</span>}
                            </span>
                          </button>
                        )
                      })}
                    </>
                  )}
                  {osmConstruction.length > 0 && (
                    <>
                      <div
                        className={`px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500 ${
                          coordHint || placePredictions.length > 0 ? 'border-t border-slate-700/80' : ''
                        }`}
                      >
                        Road work · OpenStreetMap
                      </div>
                      <p className="border-b border-slate-800 px-2.5 pb-1.5 text-[9px] leading-snug text-slate-600">
                        Near the current map view. Mostly active or recent projects; finished work is usually removed from the map.
                      </p>
                      {osmConstruction.map((it, i) => {
                        const idx = (coordHint ? 1 : 0) + placePredictions.length + i
                        return (
                          <button
                            key={it.id}
                            type="button"
                            role="option"
                            aria-selected={highlightIdx === idx}
                            onMouseDown={(ev) => ev.preventDefault()}
                            onClick={() => pickSuggestionByFlatIndex(idx)}
                            className={`flex w-full items-start gap-2 px-3 py-2 text-left text-xs transition-colors ${
                              highlightIdx === idx ? 'bg-brand-500/25 text-white' : 'text-slate-200 hover:bg-slate-800'
                            }`}
                          >
                            <MapPinned size={14} className="mt-0.5 shrink-0 text-amber-400/90" aria-hidden />
                            <span>
                              <span className="block text-slate-100">{it.label}</span>
                              <span className="text-[10px] text-slate-500">
                                Road construction · community map data
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </>
                  )}
                  {!suggestLoading &&
                    !coordHint &&
                    placePredictions.length === 0 &&
                    osmConstruction.length === 0 && (
                      <div className="px-3 py-2.5 text-xs leading-snug text-slate-500">
                        No autocomplete matches. Try <span className="text-slate-400">Go</span>, refine your text, or zoom in so road
                        projects near the map center can load (OpenStreetMap).
                      </div>
                    )}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={searchBusy || !searchDraft.trim()}
              className={
                compact
                  ? 'shrink-0 rounded-md border border-sky-500/35 bg-slate-950/80 px-3 py-2 text-xs font-medium text-sky-100/95 transition-colors hover:border-sky-400/45 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40'
                  : 'shrink-0 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40'
              }
            >
              Go
            </button>
          </div>
          {searchError && <p className="text-[10px] leading-snug text-amber-400/95">{searchError}</p>}
        </form>
      )}

      {/* Map container */}
      <div
        className={`relative overflow-hidden rounded-lg border border-slate-700 ${
          stretch ? `flex-1 ${stretchMapMin}` : ''
        }`}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
            <span className="text-sm text-slate-400 animate-pulse">Loading map…</span>
          </div>
        )}
        <div
          ref={containerRef}
          className={
            stretch
              ? `absolute inset-0 h-full w-full ${stretchMapMin}`
              : `w-full ${compact ? 'h-36 sm:h-40' : 'h-64'}`
          }
        />

        {/* Drawing toolbar */}
        {status === 'ready' && (
          <div className="pointer-events-auto absolute bottom-2 left-1/2 z-[20] flex -translate-x-1/2 gap-2">
            {!value ? (
              <button
                type="button"
                onClick={startDrawing}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg transition-all ${
                  drawing
                    ? 'bg-brand-500 text-white animate-pulse'
                    : 'bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <PenLine size={13} />
                {drawing ? 'Click to draw polygon…' : 'Draw work zone'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={startDrawing}
                  className="flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg hover:bg-slate-700"
                >
                  <RotateCcw size={13} />
                  Redraw
                </button>
                <button
                  type="button"
                  onClick={clearPolygon}
                  className="flex items-center gap-1.5 rounded-full bg-red-900/60 border border-red-700/50 px-3 py-1.5 text-xs font-medium text-red-300 shadow-lg hover:bg-red-900"
                >
                  <Trash2 size={13} />
                  Clear
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Area summary */}
      {value && (
        <div
          className={`flex flex-wrap gap-3 rounded-lg bg-brand-500/10 border border-brand-500/30 ${
            compact ? 'px-2.5 py-1.5 gap-2' : 'px-3 py-2.5'
          }`}
        >
          <div className="text-xs">
            <span className="text-slate-400">Area: </span>
            <span className="font-semibold text-brand-300">{value.areaLabel}</span>
          </div>
          <div className="text-xs">
            <span className="text-slate-400">Perimeter: </span>
            <span className="font-semibold text-brand-300">{value.perimeterLabel}</span>
          </div>
          {value.address && (
            <div className={`text-xs w-full ${compact ? 'line-clamp-2' : ''}`}>
              <span className="text-slate-400">Location: </span>
              <span className="text-slate-300">{value.address}</span>
            </div>
          )}
          {value.postedSpeedLabel && (
            <div className={`text-xs w-full ${compact ? 'line-clamp-2' : ''}`}>
              <span className="text-slate-400">Road speed (work zone centroid): </span>
              <span className="font-semibold text-emerald-300/90">{value.postedSpeedLabel}</span>
            </div>
          )}
        </div>
      )}

      {!compact && (
        <p className="text-xs text-slate-600">
          The pin marks the map center (or your location if the browser allows). Draw a polygon around your work zone — the AI uses
          area and perimeter to calibrate equipment quantities.
        </p>
      )}
      {compact && (
        <p className="text-[10px] text-slate-600 leading-snug">
          Pin ≈ site center. Use <span className="text-slate-500">Draw work zone</span> (on the map or in the map header), then click corners to close the polygon — the AI uses it when you send.
        </p>
      )}
    </div>
  )
})

export default MapAreaSelector
