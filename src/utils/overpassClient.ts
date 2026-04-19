/**
 * Public Overpass instances — rotate on 429/503 so map speed lookups stay usable.
 * @see https://wiki.openstreetmap.org/wiki/Overpass_API
 */

const OVERPASS_INTERPRETER_BASES = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://z.overpass-api.de/api/interpreter',
]

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }
    const t = setTimeout(resolve, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

/** POST Overpass QL; tries mirrors with short backoff when rate-limited or overloaded. */
export async function fetchOverpassInterpreter(
  overpassQl: string,
  signal?: AbortSignal,
): Promise<Response> {
  let last: Response | undefined
  for (let i = 0; i < OVERPASS_INTERPRETER_BASES.length; i++) {
    const base = OVERPASS_INTERPRETER_BASES[i]!
    const url = `${base}?data=${encodeURIComponent(overpassQl)}`
    try {
      const res = await fetch(url, { signal })
      last = res
      if (res.ok) return res
      const retry =
        res.status === 429 || res.status === 503 || res.status === 504 || res.status === 502
      if (retry && i < OVERPASS_INTERPRETER_BASES.length - 1) {
        await sleep(900 + i * 500, signal)
      }
    } catch (e) {
      if (i < OVERPASS_INTERPRETER_BASES.length - 1) {
        await sleep(400, signal).catch(() => {})
        continue
      }
      throw e
    }
  }
  return last ?? new Response('', { status: 502 })
}
