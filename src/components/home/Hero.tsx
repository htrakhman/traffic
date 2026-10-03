import { SITE_CONTACT_PHONE_DISPLAY, SITE_CONTACT_PHONE_E164 } from '../../config/site'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-16 lg:pt-20">
        <div>
          <p className="tcs-mono text-xs uppercase tracking-[0.14em] text-zone">
            Wholesale &amp; retail
          </p>
          <h1 className="mt-4 font-tcsDisplay text-4xl font-bold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
            Best priced traffic control equipment on the internet.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Cones, drums, barricades, signs and arrow boards. One piece or a full truckload,
            send us your list and get our price.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="rounded-md bg-zone px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#c85009]"
            >
              Get my price
            </a>
            <a
              href={`tel:${SITE_CONTACT_PHONE_E164}`}
              className="rounded-md border border-line px-7 py-3.5 text-base font-semibold text-ink transition hover:border-ink"
            >
              Call {SITE_CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-end justify-center lg:max-w-none" aria-hidden="true">
          <img
            src="/catalog/channelizing-drum-6in-hi-tire-base.webp"
            alt=""
            width={860}
            height={1120}
            className="relative z-0 w-[60%] max-w-[380px] mix-blend-multiply"
          />
          <img
            src="/catalog/cone-28-orange-7lb.webp"
            alt=""
            width={860}
            height={1120}
            className="relative z-10 -ml-[16%] w-[46%] max-w-[290px] mix-blend-multiply"
          />
        </div>
      </div>
      <div className="tcs-stripe-bold h-4 w-full" aria-hidden="true" />
    </section>
  )
}
