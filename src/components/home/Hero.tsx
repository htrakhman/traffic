import { SITE_CONTACT_EMAIL } from '../../config/site'

export const HERO_IMAGES = {
  crowdBarricade: '/catalog/metal-crowd-control-barricade.webp',
  waterBarrier: '/catalog/water-filled-barrier.webp',
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-16 lg:pt-20">
        <div>
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">
            Wholesale &amp; retail · Shipped nationwide
          </p>
          <h1 className="mt-4 font-tcsDisplay text-4xl font-bold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
            Metal crowd control barricades and water filled barriers, best priced online.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Galvanized steel bike rack barricades for events, parades and job sites. Plastic water
            filled barriers for work zones and perimeters. Plus cones, drums and signs. One piece or
            a full truckload, send us your list and get our price.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="rounded-md bg-zone px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#c85009]"
            >
              Get my price
            </a>
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="break-all rounded-md border border-line px-7 py-3.5 text-base font-semibold text-ink transition hover:border-ink"
            >
              {SITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md flex-col items-center lg:max-w-none">
          <img
            src={HERO_IMAGES.crowdBarricade}
            alt="Galvanized steel metal crowd control barricade (bike rack barricade)"
            width={998}
            height={708}
            className="relative z-0 -ml-[14%] w-[80%] max-w-[440px] mix-blend-multiply"
            fetchPriority="high"
          />
          <img
            src={HERO_IMAGES.waterBarrier}
            alt="Orange and white plastic water filled barriers connected end to end"
            width={1160}
            height={442}
            className="relative z-10 -mt-[11%] ml-[18%] w-[86%] max-w-[480px] mix-blend-multiply"
          />
        </div>
      </div>
      <div className="tcs-stripe-bold h-4 w-full" aria-hidden="true" />
    </section>
  )
}
