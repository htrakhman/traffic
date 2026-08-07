export const SUPPLIER_FAQS = [
  {
    q: 'Do you generate leads for anything besides equipment purchases?',
    a: 'No. Every lead is someone looking to buy and own the equipment outright. We built the whole site around purchase intent on purpose.',
  },
  {
    q: 'How much does a lead cost?',
    a: "We don't publish a number here because it isn't one number. Cost depends on your territory, the product category, and how much volume that area actually generates. You'll get a real figure on a call, not a range pulled out of thin air to look good on a landing page.",
  },
  {
    q: 'What if there is no demand in my area?',
    a: "We'll say so directly instead of signing you up anyway. Some territories are thin for some product categories. We'd rather tell you that up front than take a payment for leads that never show up.",
  },
  {
    q: 'Do I have to sign a contract?',
    a: "It's pay per lead. There's no bundled service package to cancel out of.",
  },
  {
    q: 'What product categories do you cover?',
    a: 'Traffic cones, Type II and Type III barricades, channelizing drums, roll-up signs and sign stands, hi-vis vests, wheel chocks, speed bumps, and parking lot safety equipment. See the full list above. If you sell something adjacent that isn\'t listed, ask on the call.',
  },
  {
    q: 'How do I know a lead is real?',
    a: 'Every lead has to clear the four checks on this page: a real contact, a specific product, a US delivery address, and a recent submission date. If one slips through that shouldn\'t have, tell us and it gets credited.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">
          Questions suppliers ask
        </h2>
        <div className="mt-10 divide-y divide-line border-t border-line">
          {SUPPLIER_FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-tcsDisplay text-base font-bold text-ink">
                {item.q}
                <span className="tcs-mono shrink-0 text-zone group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
