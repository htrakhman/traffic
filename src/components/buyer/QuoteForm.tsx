import { useId, useState, type FormEvent } from 'react'
import { SITE_CONTACT_PHONE_DISPLAY } from '../../config/site'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]

const TIMELINES = ['ASAP', 'Within 2 weeks', 'Within a month', 'Just researching']

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function QuoteForm({
  productCategory,
  anchorId,
  heading = 'Get a quote',
  orderTypes,
}: {
  productCategory: string
  anchorId?: string
  heading?: string
  /** When set, shows a required "Order type" select (e.g. Retail / Wholesale) and
      appends the choice to productCategory on submit. */
  orderTypes?: string[]
}) {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (String(data.get('org_site') || '').trim()) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/buyer-lead-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          organization: data.get('organization'),
          productCategory: orderTypes ? `${productCategory} — ${data.get('orderType')}` : productCategory,
          quantity: data.get('quantity'),
          deliveryCity: data.get('deliveryCity'),
          deliveryState: data.get('deliveryState'),
          timeline: data.get('timeline'),
          notes: data.get('notes'),
          landingPage: window.location.pathname,
        }),
      })
      if (!res.ok) {
        throw new Error(`We couldn't send your request. Please try again, or call ${SITE_CONTACT_PHONE_DISPLAY}.`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div id={anchorId} className="rounded-lg border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-tcsDisplay text-xl font-bold text-ink">Got your request.</h2>
        <p className="mt-2 text-muted">
          We'll put together pricing for your order and get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <div id={anchorId} className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-tcsDisplay text-xl font-bold text-ink">{heading}</h2>
      <p className="mt-1 text-sm text-muted">No price posted here. Tell us what you need and where.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <input type="text" name="org_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="grid gap-4 sm:grid-cols-2">
          {orderTypes ? (
            <fieldset className="sm:col-span-2">
              <legend className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                Order type *
              </legend>
              <div className="flex flex-wrap gap-3">
                {orderTypes.map((t, i) => (
                  <label
                    key={t}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-paper px-4 py-2.5 text-ink has-[:checked]:border-zone has-[:checked]:bg-zone-soft"
                  >
                    <input type="radio" name="orderType" value={t} defaultChecked={i === 0} required className="accent-[var(--zone)]" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}
          <QField idPrefix={uid} label="Name" name="name" required autoComplete="name" />
          <QField idPrefix={uid} label="Email" name="email" type="email" required autoComplete="email" />
          <QField idPrefix={uid} label="Phone" name="phone" type="tel" autoComplete="tel" />
          <QField idPrefix={uid} label="Company (optional)" name="organization" autoComplete="organization" />
          <QField idPrefix={uid} label="Quantity" name="quantity" placeholder="e.g. 20" />
          <div>
            <label htmlFor={`${uid}-timeline`} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
              Timeline
            </label>
            <select
              id={`${uid}-timeline`}
              name="timeline"
              defaultValue=""
              className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink"
            >
              <option value="" disabled>
                Select one
              </option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <QField idPrefix={uid} label="Delivery city (optional)" name="deliveryCity" />
          <div>
            <label htmlFor={`${uid}-state`} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
              Delivery state *
            </label>
            <select
              id={`${uid}-state`}
              name="deliveryState"
              required
              defaultValue=""
              className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink"
            >
              <option value="" disabled>
                Select state
              </option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-notes`} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
            Notes (optional)
          </label>
          <textarea
            id={`${uid}-notes`}
            name="notes"
            rows={3}
            className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink"
          />
        </div>

        {status === 'error' ? (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-zone px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85009] disabled:opacity-60 sm:w-auto"
        >
          {status === 'submitting' ? 'Sending…' : 'Request a quote'}
        </button>
      </form>
    </div>
  )
}

function QField({
  idPrefix,
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  placeholder,
}: {
  idPrefix: string
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}) {
  const id = `${idPrefix}-${name}`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink placeholder-muted/60"
      />
    </div>
  )
}
