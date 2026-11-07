/**
 * Collects <head> tags while a route is pre-rendered at build time
 * (scripts/prerender.mjs). In the browser `active` stays null and SEO/JsonLd
 * manage <head> through effects as before.
 */
export interface SsrHead {
  title?: string
  tags: Map<string, string>
  jsonLd: Set<string>
}

export const ssrHead: { active: SsrHead | null } = { active: null }

export function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function serializeHead(head: SsrHead): string {
  const out: string[] = []
  if (head.title) out.push(`<title>${escapeAttr(head.title)}</title>`)
  out.push(...head.tags.values())
  for (const json of head.jsonLd) {
    out.push(`<script type="application/ld+json" data-ssr>${json.replace(/</g, '\\u003c')}</script>`)
  }
  return out.join('\n    ')
}
