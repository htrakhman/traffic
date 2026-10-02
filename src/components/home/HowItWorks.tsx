const STEPS = [
  {
    title: 'Tell us what you need',
    body: 'Send the quantities, the job or the closure you are setting up, and where it is going. A rough list is fine.',
  },
  {
    title: 'Get a quote',
    body: 'We come back with pricing for your volume and delivery, and flag anything your setup is missing.',
  },
  {
    title: 'We deliver',
    body: 'Approve the quote and we ship it to the job site, your yard or your warehouse.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-[#ff9a52]">How ordering works</p>
        <h2 className="mt-3 max-w-2xl font-tcsDisplay text-3xl font-bold leading-tight text-white sm:text-4xl">
          From request to job site in three steps.
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zone font-tcsDisplay text-lg font-bold text-white">
                  {i + 1}
                </span>
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-tcsDisplay text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
