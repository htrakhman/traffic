import { useEffect, useMemo } from 'react'
import { SITE_LOGO_PATH, SITE_ORIGIN } from '../../config/site'

/**
 * Injects a JSON-LD script tag into <head>. Each instance renders one block.
 * Use multiple instances to ship multiple schemas (e.g. Article + BreadcrumbList + FAQPage).
 *
 * Schema references:
 *   - https://schema.org/Article
 *   - https://schema.org/Product
 *   - https://schema.org/BreadcrumbList
 *   - https://schema.org/FAQPage
 *   - https://schema.org/LocalBusiness
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = useMemo(() => JSON.stringify(data), [data])
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = json
    document.head.appendChild(el)
    return () => {
      document.head.removeChild(el)
    }
  }, [json])
  return null
}

export const schema = {
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Traffic Control Rental',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
    sameAs: [] as string[],
  }),
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Traffic Control Rental',
    url: SITE_ORIGIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_ORIGIN}/browse?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),
  breadcrumb: (items: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_ORIGIN + it.path,
    })),
  }),
  article: (a: {
    headline: string
    description: string
    slug: string
    datePublished: string
    dateModified?: string
    author?: string
    image?: string
    keywords?: string[]
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/blog/${a.slug}`,
    },
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: {
      '@type': 'Organization',
      name: a.author || 'Traffic Control Rental',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Traffic Control Rental',
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}${SITE_LOGO_PATH}` },
    },
    image: a.image
      ? [
          a.image.startsWith('http://') || a.image.startsWith('https://')
            ? a.image
            : a.image.startsWith('/')
              ? SITE_ORIGIN + a.image
              : a.image,
        ]
      : undefined,
    keywords: a.keywords?.join(', '),
  }),
  faqPage: (qas: { q: string; a: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  }),
}
