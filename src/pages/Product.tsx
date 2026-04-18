import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star,
  Package,
  Check,
  ChevronRight,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Clock,
  Truck,
} from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/marketplace/ProductCard'

export default function Product() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // SEO meta tags
  useEffect(() => {
    if (!product) return
    const title = product.metaTitle ?? `Rent ${product.name} | Traffic Control Equipment Rental`
    const desc =
      product.metaDescription ??
      `Rent ${product.name} for $${product.dailyRate.toFixed(2)}/day. ${product.description}. Free delivery available. MUTCD-compliant traffic control equipment.`
    document.title = title
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = desc
  }, [product])

  // JSON-LD structured data
  useEffect(() => {
    if (!product) return
    const existingScript = document.getElementById('product-jsonld')
    if (existingScript) existingScript.remove()

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: product.longDescription,
      sku: product.sku,
      offers: {
        '@type': 'Offer',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        priceCurrency: 'USD',
        price: product.dailyRate,
        priceValidUntil: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        seller: { '@type': 'Organization', name: 'TrafficRent' },
      },
    }

    const schemas: object[] = [productSchema]

    if (product.faqs && product.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: product.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      })
    }

    const script = document.createElement('script')
    script.id = 'product-jsonld'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemas)
    document.head.appendChild(script)

    return () => {
      document.getElementById('product-jsonld')?.remove()
    }
  }, [product])

  if (!product) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link to="/browse" className="btn-primary">
            Browse Equipment
          </Link>
        </div>
      </main>
    )
  }

  const category = categories.find((c) => c.slug === product.categorySlug)
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
  const totalCost = product.dailyRate * quantity * rentalDays

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb — schema.org BreadcrumbList */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/browse" className="hover:text-slate-300 transition-colors">
            Equipment
          </Link>
          <ChevronRight size={12} />
          <Link
            to={`/category/${product.categorySlug}`}
            className="hover:text-slate-300 transition-colors"
          >
            {category?.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">{product.name}</span>
        </nav>

        {/* ── Top section: image + pricing ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden mb-3 relative">
              {product.popular && (
                <span className="absolute top-3 left-3 badge bg-brand-500/90 text-white z-10 text-xs font-semibold">
                  Popular Choice
                </span>
              )}
              <img
                src={product.images[selectedImage] ?? product.imageUrl}
                alt={`${product.name} — traffic control equipment for rent`}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-brand-500' : 'border-slate-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Compliance badges */}
            {product.compliance && product.compliance.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">
                  Compliance & Standards
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.compliance.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                    >
                      <ShieldCheck size={10} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trust signals */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
              <div className="card p-2">
                <Truck size={14} className="mx-auto mb-1 text-brand-400" />
                Free Delivery Available
              </div>
              <div className="card p-2">
                <Clock size={14} className="mx-auto mb-1 text-brand-400" />
                Same-Day Setup
              </div>
              <div className="card p-2">
                <MapPin size={14} className="mx-auto mb-1 text-brand-400" />
                Statewide Service
              </div>
            </div>
          </div>

          {/* Details + pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.popular && (
                <span className="badge bg-brand-500/20 border border-brand-500/30 text-brand-300">
                  <Star size={10} className="fill-current mr-1" />
                  Popular
                </span>
              )}
              <span
                className={`badge border ${
                  product.inStock
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {product.inStock ? '● In Stock' : '● Out of Stock'}
              </span>
              <span className="badge bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-slate-400 leading-relaxed mb-6">{product.longDescription}</p>

            {/* Pricing */}
            <div className="card p-5 mb-6">
              <h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                Rental Rates
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { period: 'Daily', rate: product.dailyRate },
                  { period: 'Weekly', rate: product.weeklyRate },
                  { period: 'Monthly', rate: product.monthlyRate },
                ].map(({ period, rate }) => (
                  <div key={period} className="text-center p-3 bg-slate-800/60 rounded-lg">
                    <div className="text-lg font-bold text-white">${rate.toFixed(2)}</div>
                    <div className="text-xs text-slate-500">{period}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="label text-xs">Quantity ({product.unit})</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full text-center input py-2"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label text-xs">
                    Rental days (min {product.minimumRentalDays})
                  </label>
                  <input
                    type="number"
                    value={rentalDays}
                    onChange={(e) =>
                      setRentalDays(Math.max(product.minimumRentalDays, Number(e.target.value)))
                    }
                    min={product.minimumRentalDays}
                    className="input py-2.5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-800 mb-4">
                <span className="text-sm text-slate-400">
                  Estimated total ({rentalDays}d × {quantity}×)
                </span>
                <span className="text-xl font-bold text-white">${totalCost.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/quote', { state: { product, quantity, rentalDays } })}
                disabled={!product.inStock}
                className="w-full btn-primary py-3 justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                <Package size={18} />
                Request Availability & Quote
              </button>
              <a
                href="tel:+18005551234"
                className="w-full btn-secondary py-3 mt-2 justify-center text-sm"
              >
                <Phone size={14} />
                Call to Reserve
              </a>
            </div>

            {/* AI upsell */}
            <div className="card p-4 border-brand-500/20 bg-brand-500/5 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Not sure how many you need?</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Use the AI Job Planner to get quantity recommendations based on your specific
                    job parameters.
                  </p>
                  <Link
                    to="/assistant"
                    className="text-xs text-brand-400 hover:text-brand-300 mt-2 inline-flex items-center gap-1"
                  >
                    Open Job Planner <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-semibold text-white mb-3">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                    <Check size={14} className="text-brand-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Specifications ── */}
        {Object.keys(product.specs).length > 0 && (
          <section aria-labelledby="specs-heading" className="mt-12">
            <h2 id="specs-heading" className="text-xl font-bold text-white mb-4">
              Technical Specifications
            </h2>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}>
                      <td className="px-5 py-3 text-slate-400 font-medium w-1/3">{key}</td>
                      <td className="px-5 py-3 text-slate-200">{value}</td>
                    </tr>
                  ))}
                  {product.weight && (
                    <tr className={Object.keys(product.specs).length % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}>
                      <td className="px-5 py-3 text-slate-400 font-medium">Weight</td>
                      <td className="px-5 py-3 text-slate-200">{product.weight}</td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr className={(Object.keys(product.specs).length + (product.weight ? 1 : 0)) % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}>
                      <td className="px-5 py-3 text-slate-400 font-medium">Dimensions</td>
                      <td className="px-5 py-3 text-slate-200">{product.dimensions}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Use Cases ── */}
        {product.useCases && product.useCases.length > 0 && (
          <section aria-labelledby="usecases-heading" className="mt-12">
            <h2 id="usecases-heading" className="text-xl font-bold text-white mb-6">
              Common Applications & Use Cases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.useCases.map((uc) => (
                <div key={uc.title} className="card p-5">
                  <h3 className="font-semibold text-brand-300 mb-2 text-sm">{uc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {product.faqs && product.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mt-12">
            <h2 id="faq-heading" className="text-xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {product.faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-medium text-white text-sm pr-4">{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-slate-800">
                      <p className="text-slate-400 text-sm leading-relaxed pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Rental process callout ── */}
        <section aria-labelledby="how-it-works" className="mt-12">
          <div className="card p-6 bg-gradient-to-r from-brand-500/10 to-slate-800/50 border border-brand-500/20">
            <h2 id="how-it-works" className="text-lg font-bold text-white mb-4">
              How the Rental Process Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Request a Quote',
                  desc: 'Select your quantity and rental dates, then submit a quote request. We respond within 2 hours on business days.',
                },
                {
                  step: '2',
                  title: 'Confirm & Schedule',
                  desc: 'We confirm availability, finalize your order, and schedule delivery or pickup at your convenience.',
                },
                {
                  step: '3',
                  title: 'Deploy & Return',
                  desc: 'Equipment arrives clean and ready to use. At the end of your rental, we pick it up — no hassle.',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{s.title}</p>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16">
            <h2 id="related-heading" className="text-xl font-bold text-white mb-6">
              More in {category?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
