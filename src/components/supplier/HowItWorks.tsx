const STEPS = [
  {
    n: '01',
    title: 'Tell us what you cover',
    detail: 'Product lines and territory. A cone supplier in three states is a different setup than a national barricade distributor.',
  },
  {
    n: '02',
    title: 'We set a price on a call',
    detail: "Pricing depends on your territory and how much volume is actually there. We don't publish a rate card because it isn't the same number for everyone.",
  },
  {
    n: '03',
    title: 'Leads start routing to you',
    detail: 'Matched to what you sell and where you deliver. Nothing outside your coverage area shows up.',
  },
  {
    n: '04',
    title: 'You work the lead',
    detail: "You call or quote, same as any other request. If one doesn't meet the definition on this page, tell us and it gets credited.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-tcsDisplay text-3xl font-bold text-ink sm:text-4xl">How it works</h2>
        <div className="mt-12 space-y-10">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="tcs-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zone bg-surface text-xs font-medium text-zone">
                  {step.n}
                </span>
                {i < STEPS.length - 1 ? <span className="tcs-road-line mt-2 flex-1" aria-hidden="true" /> : null}
              </div>
              <div className="max-w-2xl pb-2">
                <h3 className="font-tcsDisplay text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
