import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { MapPin } from 'lucide-react'
import { readSiteMapPlannerSession } from '../../utils/siteMapPlannerSessionStorage'
import { getLatestJobAssistantPersisted } from '../../utils/jobAssistantSessionStorage'

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || undefined
const MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID'

/** When nothing is saved yet — Central NJ-ish default so the preview is “local” without geolocation. */
const FALLBACK_VIEW = { lat: 40.2171, lng: -74.7429, zoom: 10 }

type MapsAuthWindow = Window & { gm_authFailure?: () => void }

function readInitialMapView(): { lat: number; lng: number; zoom: number } {
  try {
    const sm = readSiteMapPlannerSession()
    if (sm?.v === 1 && sm.mapView) {
      const { lat, lng, zoom } = sm.mapView
      if (typeof lat === 'number' && typeof lng === 'number' && typeof zoom === 'number') {
        return { lat, lng, zoom }
      }
    }
  } catch {
    /* ignore */
  }
  try {
    const ja = getLatestJobAssistantPersisted()
    const c = ja?.mapArea?.center
    if (c && typeof c.lat === 'number' && typeof c.lng === 'number') {
      return { lat: c.lat, lng: c.lng, zoom: 15 }
    }
  } catch {
    /* ignore */
  }
  return FALLBACK_VIEW
}

type PlannerMiniMapProps = {
  /** When false, map is torn down to avoid background work. */
  active: boolean
}

/**
 * Read-only map preview for the floating AI Job Planner — same API key / Map ID as the full planner.
 */
export default function PlannerMiniMap({ active }: PlannerMiniMapProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const initialRef = useRef(readInitialMapView())
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'no-key' | 'error'>('idle')

  useEffect(() => {
    if (!active) {
      if (markerRef.current) markerRef.current.map = null
      markerRef.current = null
      mapRef.current = null
      setStatus('idle')
      return
    }

    initialRef.current = readInitialMapView()

    if (!MAPS_KEY) {
      setStatus('no-key')
      return
    }

    const el = divRef.current
    if (!el) return

    setStatus('loading')
    let cancelled = false

    const w = window as MapsAuthWindow
    const prevAuthFailure = w.gm_authFailure
    w.gm_authFailure = () => {
      if (!cancelled) setStatus('error')
    }

    setOptions({
      key: MAPS_KEY,
      v: 'weekly',
      libraries: ['marker'],
      mapIds: [MAP_ID],
    })

    Promise.all([importLibrary('maps'), importLibrary('marker')])
      .then(([, markerLib]) => {
        if (cancelled || !divRef.current) return
        const { AdvancedMarkerElement } = markerLib as google.maps.MarkerLibrary
        const boot = initialRef.current

        const map = new google.maps.Map(divRef.current, {
          center: { lat: boot.lat, lng: boot.lng },
          zoom: boot.zoom,
          mapId: MAP_ID,
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
          gestureHandling: 'greedy',
          clickableIcons: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        })
        mapRef.current = map

        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: boot.lat, lng: boot.lng },
          title: 'Saved site focus — open Site Map Planner to draw your work zone',
        })
        markerRef.current = marker

        requestAnimationFrame(() => {
          if (cancelled || !mapRef.current) return
          google.maps.event.trigger(mapRef.current, 'resize')
        })

        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    const ro = new ResizeObserver(() => {
      if (mapRef.current) google.maps.event.trigger(mapRef.current, 'resize')
    })
    ro.observe(el)

    return () => {
      cancelled = true
      ro.disconnect()
      w.gm_authFailure = prevAuthFailure
      if (markerRef.current) markerRef.current.map = null
      markerRef.current = null
      mapRef.current = null
    }
  }, [active])

  return (
    <div className="border-b border-slate-800 flex-shrink-0 px-3 pt-2 pb-2">
      <div className="relative h-[92px] rounded-lg overflow-hidden border border-slate-700 bg-slate-800/80">
        {status === 'no-key' || status === 'error' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
            <MapPin size={16} className="text-slate-500" aria-hidden />
            <p className="text-[10px] text-slate-500 leading-snug">
              {status === 'no-key'
                ? 'Map preview needs VITE_GOOGLE_MAPS_API_KEY.'
                : 'Map could not load. Check API key and billing.'}
            </p>
          </div>
        ) : (
          <>
            {status === 'loading' && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center bg-slate-900/70 text-[10px] text-slate-400">
                Loading map…
              </div>
            )}
            <div
              ref={divRef}
              className="h-full w-full"
              role="img"
              aria-label="Job site map preview — pan and zoom"
            />
          </>
        )}
      </div>
      <p className="text-[10px] text-slate-500 mt-1.5 text-center leading-snug">
        Preview only — draw lanes and equipment in{' '}
        <Link to="/planner" className="text-brand-400 hover:text-brand-300">
          Site Map Planner
        </Link>
      </p>
    </div>
  )
}
