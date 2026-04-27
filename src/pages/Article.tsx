import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { Clock, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react'
import { getArticleBySlug, getRelatedArticles } from '../data/articles'
import SEO from '../components/seo/SEO'
import JsonLd, { schema } from '../components/seo/JsonLd'

/**
 * /blog/:slug — individual article. SEO-owned by seo-specialist subagent.
 * Ships Article, BreadcrumbList, and FAQPage JSON-LD when applicable.
 */
export default function Article() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <Navigate to="/blog" replace />

  const related = getRelatedArticles(article.slug, 3)
  const canonical = `/blog/${article.slug}`

  return (
    <div className="pt-24 pb-24 bg-slate-950 min-h-screen">
      <SEO
        title={`${article.title} | Traffic Control Rental`}
        description={article.metaDescription || article.excerpt}
        canonicalPath={canonical}
        ogType="article"
        ogImage={article.heroImage}
        publishedTime={article.datePublished}
        modifiedTime={article.dateModified}
        keywords={[article.primaryKeyword, ...(article.secondaryKeywords || [])]}
      />
      <JsonLd
        data={schema.article({
          headline: article.title,
          description: article.metaDescription || article.excerpt,
          slug: article.slug,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          author: article.author,
          image: article.heroImage,
          keywords: [article.primaryKeyword, ...(article.secondaryKeywords || [])],
        })}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: canonical },
        ])}
      />
      {article.faqs && article.faqs.length > 0 && (
        <JsonLd data={schema.faqPage(article.faqs)} />
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> All guides
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
            <time dateTime={article.datePublished}>
              {new Date(article.datePublished).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {article.readMinutes} min read
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed">{article.excerpt}</p>
        </header>

        {article.heroImage && (
          <div className="mb-10 rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-900">
            <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="article-body">{article.body}</div>

        {article.faqs && article.faqs.length > 0 && <FAQBlock faqs={article.faqs} />}

        {article.relatedProducts && article.relatedProducts.length > 0 && (
          <section className="mt-14 p-6 rounded-xl border border-slate-800 bg-slate-900/50">
            <h2 className="text-lg font-bold text-white mb-4">Related equipment</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {article.relatedProducts.map((r) => (
                <Link
                  key={r.path}
                  to={r.path}
                  className="group flex items-center justify-between px-4 py-3 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-colors"
                >
                  <span className="text-sm text-slate-200 group-hover:text-white">{r.label}</span>
                  <ArrowRight
                    size={14}
                    className="text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-800 flex flex-wrap gap-3">
              <Link to="/quote" className="btn-primary text-sm py-2 px-4">
                Request a quote
              </Link>
              <Link
                to="/assistant"
                className="text-sm px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              >
                Plan your work zone
              </Link>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-white mb-4">Keep reading</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-brand-500/50 transition-colors"
                >
                  <div className="text-xs text-slate-500 mb-1">
                    {new Date(p.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="font-semibold text-white group-hover:text-brand-400 transition-colors">
                    {p.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 line-clamp-2">{p.excerpt}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}

function FAQBlock({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="mt-12 pt-10 border-t border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-900 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-5 pb-5 text-slate-300 leading-relaxed">{a}</div>}
    </div>
  )
}
