import { useEffect } from 'react'

/**
 * Lightweight <head> manager. No react-helmet dependency — mutates document.head
 * directly on mount/update and restores previous values on unmount so per-route
 * titles, descriptions, canonicals, and OG tags stay in sync.
 *
 * Consumed by: Home, Category, Product, Blog, Article. Owned by the seo-specialist
 * subagent — see `.claude/agents/seo-specialist.md`.
 */
export interface SEOProps {
  title: string
  description: string
  /** Absolute or root-relative path (e.g. `/blog/foo`). Converted to full URL. */
  canonicalPath?: string
  /** Absolute URL for social preview image (1200x630 ideal). */
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  /** ISO 8601 publication date for Article OG. */
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  /** Set to true to tell crawlers not to index (e.g. admin pages). */
  noindex?: boolean
}

const SITE_ORIGIN = 'https://trafficcontrolrental.com'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    canonicalPath,
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    keywords,
    noindex,
  } = props

  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const canonical =
      canonicalPath && canonicalPath.startsWith('http')
        ? canonicalPath
        : SITE_ORIGIN + (canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/'))

    const tags: HTMLElement[] = []
    tags.push(upsertMeta('name', 'description', description))
    tags.push(upsertLink('canonical', canonical))
    tags.push(upsertMeta('property', 'og:title', title))
    tags.push(upsertMeta('property', 'og:description', description))
    tags.push(upsertMeta('property', 'og:type', ogType))
    tags.push(upsertMeta('property', 'og:url', canonical))
    tags.push(upsertMeta('property', 'og:site_name', 'Traffic Control Rental'))
    tags.push(upsertMeta('name', 'twitter:card', 'summary_large_image'))
    tags.push(upsertMeta('name', 'twitter:title', title))
    tags.push(upsertMeta('name', 'twitter:description', description))
    if (ogImage) {
      tags.push(upsertMeta('property', 'og:image', ogImage))
      tags.push(upsertMeta('name', 'twitter:image', ogImage))
    }
    if (publishedTime) tags.push(upsertMeta('property', 'article:published_time', publishedTime))
    if (modifiedTime) tags.push(upsertMeta('property', 'article:modified_time', modifiedTime))
    if (keywords && keywords.length) tags.push(upsertMeta('name', 'keywords', keywords.join(', ')))
    tags.push(upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'))

    return () => {
      document.title = prevTitle
    }
  }, [title, description, canonicalPath, ogImage, ogType, publishedTime, modifiedTime, keywords?.join(','), noindex])

  return null
}
