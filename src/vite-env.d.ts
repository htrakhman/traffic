/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY?: string
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
  /** Cloud Map ID for vector maps + AdvancedMarkerElement; omit to use DEMO_MAP_ID in dev. */
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
