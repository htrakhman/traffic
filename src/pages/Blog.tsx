import { Link } from 'react-router-dom'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { getAllArticlesMeta } from '../data/articles'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'
import { SITE_NAME, SITE_ORIGIN } from '../config/site'

/**
 * /blog — article index. SEO-owned by the seo-specialist subagent.
 * Lists articles newest-first with keyword-rich excerpts + read time.
 */
export default function Blog() {
  const posts = getAllArticlesMeta()

  return (
    <div className="pt-10 pb-24 sm:pt-14">
      <SEO
        title={`Work Zone & Traffic Control Guides | ${SITE_NAME}`}
        description="Practical, contractor-voiced guides on traffic control equipment, MUTCD work zone setup, arrow boards, barricades, and job-site safety. Written for crews, not SEO bots."
        canonicalPath="/blog"
        ogType="website"
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${SITE_NAME} \u2014 Work Zone Guides`,
          url: `${SITE_ORIGIN}/blog`,
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE_ORIGIN}/blog/${p.slug}`,
            datePublished: p.datePublished,
            description: p.excerpt,
          })),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-zone text-sm font-semibold uppercase tracking-wider mb-3">
            <BookOpen size={16} />
            Field Notes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Work Zone & Traffic Control Guides
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            Practical writeups on buying, specifying, and running traffic control equipment. Written by people who
            have actually dropped 120 cones at 5&nbsp;AM.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface p-10 text-center">
            <p className="text-muted">No articles yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface hover:border-zone hover:bg-paper transition-all"
              >
                {p.heroImage && (
                  <div className="aspect-[16/9] overflow-hidden bg-line">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-muted mb-2">
                    <time dateTime={p.datePublished}>
                      {new Date(p.datePublished).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-line" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {p.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-ink group-hover:text-zone transition-colors leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{p.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-zone">
                    Read the guide <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
