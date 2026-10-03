const BUYERS = [
  'Road & highway contractors',
  'Utility & excavation crews',
  'Municipalities & DPWs',
  'Equipment rental companies',
  'Safety distributors & resellers',
  'Event & venue operators',
  'Parking & property managers',
  'Schools & campuses',
]

export default function WhoWeServe() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">Who we supply</p>
        <h2 className="mt-3 max-w-2xl font-tcsDisplay text-3xl font-bold leading-tight text-ink sm:text-4xl">
          If you close a lane, mark a hazard or move a crowd, we have you covered.
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {BUYERS.map((b) => (
            <li key={b} className="bg-surface px-5 py-5 font-medium text-ink">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
