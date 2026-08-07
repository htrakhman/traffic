export default function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">
          For traffic control equipment suppliers
        </p>
        <h1 className="mt-4 font-tcsDisplay text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
          We find the buyers. You fill the orders.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          We generate purchase-intent demand for traffic control equipment nationwide. When a
          buyer fills out a request for cones, Type III barricades, arrow boards or signs, it
          comes to you. You sell what you already stock. We don't touch the equipment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#signup"
            className="rounded-md bg-zone px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85009]"
          >
            Request lead access
          </a>
          <a
            href="#faq"
            className="rounded-md border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
          >
            Read the FAQ
          </a>
        </div>
      </div>
    </section>
  )
}
