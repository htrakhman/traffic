import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../../config/site'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-[#ff9a52]">
            Wholesale &amp; retail traffic control equipment
          </p>
          <h1 className="mt-4 font-tcsDisplay text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Gear for the work zone, by the piece or by the pallet.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Cones, drums, barricades, signs, arrow boards and barriers for contractors,
            municipalities, rental yards and resellers. Buy what one job needs, or set up a
            wholesale account and stock your own shelves.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="rounded-md bg-zone px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85009]"
            >
              Get a quote
            </a>
            <a
              href={`tel:${SITE_CONTACT_PHONE_E164}`}
              className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Call {SITE_CONTACT_PHONE_DISPLAY}
            </a>
          </div>
          <ul className="tcs-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.1em] text-white/60">
            <li>MUTCD-compliant</li>
            <li>No minimum on retail</li>
            <li>Volume pricing on wholesale</li>
          </ul>
        </div>
        <WorkZoneArt />
      </div>
      <div className="tcs-stripe-bold h-4 w-full" aria-hidden="true" />
    </section>
  )
}

/** A Type III barricade with two cones in front of it. Decorative only. */
function WorkZoneArt() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="mx-auto hidden w-full max-w-md lg:block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="tcs-stripes" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="28" fill="#e4620f" />
          <rect x="14" width="14" height="28" fill="#ffffff" />
        </pattern>
      </defs>
      {/* ground */}
      <rect x="0" y="292" width="400" height="4" rx="2" fill="#ffffff" opacity="0.12" />
      {/* barricade legs */}
      <rect x="62" y="40" width="12" height="252" rx="2" fill="#cfd8df" />
      <rect x="326" y="40" width="12" height="252" rx="2" fill="#cfd8df" />
      {/* barricade rails */}
      {[60, 120, 180].map((y) => (
        <rect key={y} x="40" y={y} width="320" height="36" rx="3" fill="url(#tcs-stripes)" />
      ))}
      {/* warning lights */}
      <circle cx="68" cy="30" r="10" fill="#ffb020" />
      <circle cx="332" cy="30" r="10" fill="#ffb020" />
      {/* cones */}
      <Cone x={110} />
      <Cone x={250} />
    </svg>
  )
}

function Cone({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 196)`}>
      <rect x="-6" y="88" width="52" height="8" rx="2" fill="#17222e" stroke="#3a4856" />
      <path d="M14 0 h12 l16 88 h-44 z" fill="#e4620f" />
      <path d="M10.2 22 h19.6 l3.4 18 h-26.4 z" fill="#ffffff" />
      <path d="M5.6 50 h28.8 l2.6 14 h-34 z" fill="#ffffff" />
    </g>
  )
}
