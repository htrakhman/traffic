/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
  /** Cloud Map ID for vector maps + AdvancedMarkerElement; omit to use DEMO_MAP_ID in dev. */
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string
  /** Set to "true" to force the AI client into offline/demo mode without hitting /api/chat. */
  readonly VITE_AI_DEMO_MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
