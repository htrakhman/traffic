import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { MapPin, Trash2, PenLine, RotateCcw } from 'lucide-react'
import type { MapArea } from '../../types'

interface Props {
  value?: MapArea
  onChange: (area: MapArea | undefined) => void
}

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

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

export default function MapAreaSelector({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const drawingRef = useRef<google.maps.drawing.DrawingManager | null>(null)
  const polygonRef = useRef<google.maps.Polygon | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [drawing, setDrawing] = useState(false)
  const [noKey, setNoKey] = useState(false)

  const clearPolygon = useCallback(() => {
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

      onChange({
        path: latLngs,
        areaFt2,
        perimeterFt,
        areaLabel: fmt(areaFt2, 'sq ft'),
        perimeterLabel: fmt(perimeterFt, 'ft'),
        address,
        center,
      })
    },
    [onChange],
  )

  const startDrawing = useCallback(() => {
    if (!drawingRef.current) return
    clearPolygon()
    drawingRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
    setDrawing(true)
  }, [clearPolygon])

  useEffect(() => {
    if (!MAPS_KEY) {
      setNoKey(true)
      return
    }
    setStatus('loading')

    const loader = new Loader({
      apiKey: MAPS_KEY,
      version: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    })

    loader
      .load()
      .then(() => {
        if (!containerRef.current) return

        const map = new google.maps.Map(containerRef.current, {
          center: { lat: 39.5, lng: -98.35 },
          zoom: 4,
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

        // Try to geolocate user
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
              map.setZoom(15)
            },
            () => {},
          )
        }

        geocoderRef.current = new google.maps.Geocoder()

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
      <div className="rounded-lg border border-red-800/50 bg-red-900/20 p-4 text-center text-sm text-red-400">
        Failed to load Google Maps. Check your API key.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Map container */}
      <div className="relative overflow-hidden rounded-lg border border-slate-700">
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
            <span className="text-sm text-slate-400 animate-pulse">Loading map…</span>
          </div>
        )}
        <div ref={containerRef} className="h-64 w-full" />

        {/* Drawing toolbar */}
        {status === 'ready' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
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
        <div className="flex flex-wrap gap-3 rounded-lg bg-brand-500/10 border border-brand-500/30 px-3 py-2.5">
          <div className="text-xs">
            <span className="text-slate-400">Area: </span>
            <span className="font-semibold text-brand-300">{value.areaLabel}</span>
          </div>
          <div className="text-xs">
            <span className="text-slate-400">Perimeter: </span>
            <span className="font-semibold text-brand-300">{value.perimeterLabel}</span>
          </div>
          {value.address && (
            <div className="text-xs w-full">
              <span className="text-slate-400">Location: </span>
              <span className="text-slate-300">{value.address}</span>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-slate-600">
        Draw a polygon around your work zone. The AI will use the area and dimensions to calibrate equipment quantities.
      </p>
    </div>
  )
}
