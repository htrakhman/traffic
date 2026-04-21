/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
  /** Cloud Map ID for vector maps + AdvancedMarkerElement; omit to use DEMO_MAP_ID in dev. */
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string
  /** Set to "true" to force the AI client into offline/demo mode without hitting /api/chat. */
  readonly VITE_AI_DEMO_MODE?: string
  /** PostHog project API key (Project settings → Project API key). Required for analytics. */
  readonly VITE_PUBLIC_POSTHOG_TOKEN?: string
  /** PostHog ingest API host, e.g. `https://us.i.posthog.com` or EU `https://eu.i.posthog.com`. */
  readonly VITE_PUBLIC_POSTHOG_HOST?: string
  /** Same as project key; exposed when `envPrefix` includes `NEXT_PUBLIC_` (e.g. Vercel). */
  readonly NEXT_PUBLIC_POSTHOG_KEY?: string
  readonly NEXT_PUBLIC_POSTHOG_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
