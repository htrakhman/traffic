import { useState, type FormEvent } from 'react'
import { categories } from '../../data/categories'

const VOLUME_OPTIONS = ['Under 20 leads/mo', '20 to 50 leads/mo', '50 to 150 leads/mo', '150+ leads/mo', 'Not sure yet']

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SignupForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [products, setProducts] = useState<string[]>([])

  const toggleProduct = (name: string) => {
    setProducts((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — real users never fill this field.
    if (String(data.get('company_site') || '').trim()) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/supplier-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          company: data.get('company'),
          email: data.get('email'),
          phone: data.get('phone'),
          website: data.get('website'),
          territory: data.get('territory'),
          products,
          otherProducts: data.get('otherProducts'),
          monthlyVolume: data.get('monthlyVolume'),
          source: 'homepage',
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Submission failed')
      }
      setStatus('success')
      form.reset()
      setProducts([])
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <section id="signup" className="bg-ink">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="font-tcsDisplay text-3xl font-bold text-white">Got it.</h2>
          <p className="mt-4 text-lg text-white/70">
            We'll follow up to talk territory and pricing. If your products or coverage are thin
            where the demand is, we'll tell you that too.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="bg-ink">
      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-tcsDisplay text-3xl font-bold text-white sm:text-4xl">
          Request lead access
        </h2>
        <p className="mt-3 text-white/70">
          Tell us what you sell and where. We'll call to talk territory and pricing.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <input
            type="text"
            name="company_site"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Company" name="company" required autoComplete="organization" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Website" name="website" placeholder="yourcompany.com" />
            <Field label="Territory" name="territory" required placeholder="States or regions you cover" />
          </div>

          <div>
            <label className="tcs-mono mb-2 block text-xs uppercase tracking-[0.1em] text-white/60">
              Product lines
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = products.includes(cat.name)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleProduct(cat.name)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                      active
                        ? 'border-zone bg-zone text-white'
                        : 'border-white/20 bg-transparent text-white/80 hover:border-white/40'
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
            <div className="mt-3">
              <label htmlFor="otherProducts" className="sr-only">
                Other product lines
              </label>
              <input
                id="otherProducts"
                name="otherProducts"
                type="text"
                maxLength={200}
                placeholder="Other — anything you sell that isn't listed above"
                className="w-full rounded-md border border-white/20 bg-transparent px-3.5 py-2.5 text-white placeholder-white/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="monthlyVolume" className="tcs-mono mb-2 block text-xs uppercase tracking-[0.1em] text-white/60">
              Rough lead volume you're looking for
            </label>
            <select
              id="monthlyVolume"
              name="monthlyVolume"
              className="w-full rounded-md border border-white/20 bg-transparent px-3.5 py-2.5 text-white [&>option]:text-ink"
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {VOLUME_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {status === 'error' ? (
            <p className="text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-md bg-zone px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85009] disabled:opacity-60 sm:w-auto"
          >
            {status === 'submitting' ? 'Sending…' : 'Request lead access'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="tcs-mono mb-2 block text-xs uppercase tracking-[0.1em] text-white/60">
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/20 bg-transparent px-3.5 py-2.5 text-white placeholder-white/30"
      />
    </div>
  )
}
