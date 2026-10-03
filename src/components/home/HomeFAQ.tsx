export const HOME_FAQS = [
  {
    q: "What's the difference between wholesale and retail?",
    a: 'Retail is for buying what a job needs, with no minimum order. Wholesale is for buyers who order in volume or resell, such as rental companies, distributors and larger contractors, and is priced in quantity tiers.',
  },
  {
    q: 'Is there a minimum order?',
    a: 'Not for retail. Wholesale pricing starts at volume quantities. Send your list and we will tell you which tier it falls in.',
  },
  {
    q: 'Is your equipment MUTCD-compliant?',
    a: 'Yes. Cones, drums, barricades and signs we supply meet MUTCD requirements for size, color and retroreflectivity. If your state DOT or project spec has extra requirements, put them in your request and we will match them.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes. We deliver to job sites, yards and warehouses, and ship freight for larger orders. Delivery cost is included in your quote so there are no surprises.',
  },
  {
    q: 'Why is there no price list on the site?',
    a: 'Price depends on quantity, product mix and where it is going. A quote for your exact order is more useful than a list price that does not include freight or volume breaks.',
  },
  {
    q: 'Can you help me figure out what I need?',
    a: 'Yes. Tell us the road type, posted speed and what you are closing, and we will put together the cones, signs and devices the setup calls for.',
  },
]

export default function HomeFAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">FAQ</p>
        <h2 className="mt-3 font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">Common questions</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {HOME_FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-ink">
                {f.q}
                <span
                  className="text-xl leading-none text-zone transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
