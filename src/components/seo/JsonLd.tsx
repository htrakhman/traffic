import { useEffect, useMemo } from 'react'
import { SITE_CONTACT_EMAIL, SITE_LOGO_PATH, SITE_NAME, SITE_ORIGIN } from '../../config/site'
import { ssrHead } from './ssrHead'

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
  ssrHead.active?.jsonLd.add(json)
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
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
    email: SITE_CONTACT_EMAIL,
    description:
      'Wholesale and retail supplier of steel crowd control barricades, water-filled barriers, traffic cones, delineator posts and temporary fence, delivered across the United States.',
    address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
    areaServed: { '@type': 'Country', name: 'United States' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_CONTACT_EMAIL,
      areaServed: 'US',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'crowd control barricades',
      'water-filled barriers',
      'traffic cones',
      'delineator posts',
      'temporary fence panels',
      'MUTCD temporary traffic control',
    ],
  }),
  service: () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Wholesale and retail traffic control equipment sales',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Contractors, municipalities, rental companies and resellers',
    },
  }),
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_ORIGIN,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
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
      name: a.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
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
  /**
   * No price/offers here on purpose — pricing is never published on this site.
   * Add AggregateOffer only if real offer data ever exists; never fabricate one.
   */
  product: (p: { name: string; description: string; slug: string; image?: string; category?: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    category: p.category,
    url: `${SITE_ORIGIN}/${p.slug}`,
    image: p.image ? (p.image.startsWith('http') ? p.image : SITE_ORIGIN + p.image) : undefined,
    brand: { '@type': 'Organization', name: SITE_NAME },
  }),
  itemList: (items: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: SITE_ORIGIN + it.path,
    })),
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
