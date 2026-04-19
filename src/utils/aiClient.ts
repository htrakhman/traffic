import type { JobDetails, MapArea, RecommendationItem, AIRecommendation } from '../types'
import { curatedProducts, getProductById } from '../data/products'
import { normalizeRecommendationPricing } from './pricing'
import { SITE_NAME } from '../config/site'

// Route chat through our serverless proxy at /api/chat (OpenAI / Gemini / Perplexity on the server).
// Set OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), and/or PERPLEXITY_API_KEY — never VITE_*.
// Optional: CHAT_AI_FALLBACK_ORDER=gemini,openai,perplexity
//
// Demo mode (no live AI) is triggered by VITE_AI_DEMO_MODE=true in the client
// env or by the proxy returning 500 (e.g. in previews where the key is absent).
const CHAT_PROXY_URL = '/api/chat'
const DEMO_MODE = (import.meta.env.VITE_AI_DEMO_MODE as string | undefined) === 'true'

/** Collapse HTML-ish bodies (e.g. Vercel error pages) into readable text */
function stripHtmlish(s: string): string {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Avoid echoing common API key shapes into the chat transcript */
function redactLikelySecrets(s: string): string {
  return s
    .replace(/\bsk-[a-zA-Z0-9_-]{12,}\b/g, '[redacted]')
    .replace(/\bAIza[a-zA-Z0-9_-]{20,}\b/g, '[redacted]')
    .replace(/\bpplx-[a-zA-Z0-9_-]{12,}\b/g, '[redacted]')
    .replace(/\bsk-ant-[a-zA-Z0-9_-]{12,}\b/g, '[redacted]')
}

/** User-visible explanation when /api/chat returns a non-2xx body */
function formatChatHttpError(status: number, rawBody: string): string {
  let err = ''
  let detail = ''
  let hint = ''
  try {
    const j = JSON.parse(rawBody) as { error?: unknown; detail?: unknown; hint?: unknown }
    if (typeof j.error === 'string') err = j.error.trim()
    if (typeof j.detail === 'string') detail = j.detail.trim()
    if (typeof j.hint === 'string') hint = j.hint.trim()
  } catch {
    /* plain text / HTML */
  }
  const fallback = stripHtmlish(rawBody).slice(0, 1400)
  const lines: string[] = [`Chat request failed (HTTP ${status}).`]
  if (err) lines.push(redactLikelySecrets(err))
  if (detail) lines.push(redactLikelySecrets(detail))
  if (hint) lines.push(redactLikelySecrets(hint))
  if (!err && !detail && !hint && fallback) lines.push(redactLikelySecrets(fallback))
  if (status === 404) {
    lines.push(
      'Deploy check: the server must expose POST /api/chat (e.g. Vercel `api/chat.ts` at the repo root). A static-only build will not run this route.',
    )
  }
  if (status >= 500) {
    lines.push(
      'Next step: Vercel → your project → Logs → filter by `/api/chat` or `chat` and open the failed invocation for the stack trace.',
    )
    lines.push(
      'Env check: Production must have at least one of OPENAI_API_KEY, GEMINI_API_KEY (or GOOGLE_AI_API_KEY), PERPLEXITY_API_KEY — save variables, then redeploy.',
    )
  }
  return lines.join('\n\n')
}

const CATALOG_PROMPT_LINES = curatedProducts
  .map(
    (p) =>
      `- ${p.id}: ${p.name} — $${p.dailyRate.toFixed(2)}/day retail (you MUST use this exact dailyRate in JSON)`,
  )
  .join('\n')

/** One line for streaming cart instructions */
const STREAM_CART_PRODUCT_RATES = curatedProducts
  .map((p) => `${p.id}: ${p.name} ($${p.dailyRate.toFixed(2)}/day)`)
  .join(' | ')

/** Human-readable lines for a drawn work zone (form job prompt + chat API suffix). */
function mapAreaPromptLines(mapArea: MapArea): string[] {
  const lines = [
    `Work zone area (drawn on map): ${mapArea.areaLabel} (${Math.round(mapArea.areaFt2).toLocaleString()} sq ft)`,
    `Work zone perimeter: ${mapArea.perimeterLabel} (${Math.round(mapArea.perimeterFt).toLocaleString()} ft)`,
  ]
  if (mapArea.address) lines.push(`Map location: ${mapArea.address}`)
  if (mapArea.postedSpeedMph != null && mapArea.postedSpeedLabel) {
    lines.push(`Roadway posted speed (near work zone center): ${mapArea.postedSpeedLabel}`)
  }
  if (
    mapArea.footprintMinSpanFt != null &&
    mapArea.footprintMaxSpanFt != null &&
    mapArea.footprintMinSpanFt > 0 &&
    mapArea.footprintMaxSpanFt > 0
  ) {
    lines.push(
      `Drawn outline footprint (axis-aligned bounds, approximate): ~${Math.round(mapArea.footprintMinSpanFt)} ft × ~${Math.round(mapArea.footprintMaxSpanFt)} ft — compare min span to typical lane/roadway widths when inferring shoulder vs multi-lane/full-width coverage.`,
    )
  }
  return lines
}

function mapWorkZoneChatSuffix(mapArea: MapArea): string {
  return `\n\n[Map work zone]\n${mapAreaPromptLines(mapArea).join('\n')}`
}

function augmentLastUserMessageWithMapArea(
  messages: { role: 'user' | 'assistant'; content: string }[],
  mapArea: MapArea | undefined,
): { role: 'user' | 'assistant'; content: string }[] {
  if (!mapArea || messages.length === 0) return messages
  let lastUser = -1
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      lastUser = i
      break
    }
  }
  if (lastUser < 0) return messages
  return messages.map((m, i) =>
    i === lastUser ? { ...m, content: m.content + mapWorkZoneChatSuffix(mapArea) } : m,
  )
}

function buildJobPrompt(jobDetails: Partial<JobDetails>, userMessage?: string): string {
  const parts: string[] = []

  if (userMessage) {
    parts.push(`User's job description: "${userMessage}"`)
  }

  if (jobDetails.jobType) parts.push(`Job type: ${jobDetails.jobType.replace(/_/g, ' ')}`)
  if (jobDetails.roadType) parts.push(`Road type: ${jobDetails.roadType.replace(/_/g, ' ')}`)
  if (jobDetails.speedLimit) parts.push(`Speed limit: ${jobDetails.speedLimit} mph`)
  if (jobDetails.laneImpact) parts.push(`Lane impact: ${jobDetails.laneImpact.replace(/_/g, ' ')}`)
  if (jobDetails.workTime) parts.push(`Work time: ${jobDetails.workTime}`)
  if (jobDetails.durationDays) parts.push(`Duration: ${jobDetails.durationDays} days`)
  if (jobDetails.pedestrianExposure) parts.push(`Pedestrian exposure: ${jobDetails.pedestrianExposure}`)
  if (jobDetails.crewCount) parts.push(`Number of crews: ${jobDetails.crewCount}`)
  if (jobDetails.location) parts.push(`Location: ${jobDetails.location}`)
  if (jobDetails.equipmentOwned) parts.push(`Equipment already owned: ${jobDetails.equipmentOwned}`)
  if (jobDetails.deliveryNeeded !== undefined) parts.push(`Delivery needed: ${jobDetails.deliveryNeeded ? 'yes' : 'no'}`)
  if (jobDetails.mapArea) parts.push(...mapAreaPromptLines(jobDetails.mapArea))

  return parts.join('\n')
}

const SYSTEM_PROMPT = `You are the AI Work Zone Planner for ${SITE_NAME} — an expert assistant that helps contractors determine what temporary traffic control (TTC) equipment they need to rent for work zones. You have deep knowledge of MUTCD (Manual on Uniform Traffic Control Devices) requirements, ATSSA standards, and common work zone setups.

Your available rental equipment catalog (retail daily rental rates — already include our standard 50% markup on supplier-reference economics; copy dailyRate values exactly):
${CATALOG_PROMPT_LINES}

When a user describes their job, provide a structured equipment recommendation. Be specific about quantities. Consider:
1. Advance warning area needs (signs, spacing based on speed)
2. Transition area (tapers — cones/drums) — if a drawn map area is provided, use the perimeter to calculate exact taper/channelization lengths and cone spacing
3. Buffer/work space — scale barrier and cone quantities to the drawn area size when available
4. Night vs day (add lights/drums if night)
5. Pedestrian exposure (may need additional devices)
6. Whether they already own some gear
7. If a drawn work zone area (sq ft / perimeter in ft) is given, use those dimensions to calculate precise cone counts, drum spacing, and barrier lengths rather than estimating
8. If "Roadway posted speed" from the map is provided, treat it as authoritative for sign spacing and taper length unless the user explicitly states a different regulatory/design speed
9. Users can search the map or type Location:/coordinates in chat to pan the view; only a drawn polygon provides measurable work zone dimensions—remind them to outline the site if they only searched without drawing
10. Small / localized footprints: The drawn polygon is the on-map work occupation area—not automatic proof of a miles-long lane closure or every MUTCD advance device. If area is modest (e.g. under ~12,000 sq ft) and footprint spans suggest a local street or small patch, scale drums, barricades, and channelization to securing that footprint plus tapers the user actually describes—avoid highway-style fleets (e.g. 25+ drums or 20+ Type III barricades) unless lane-impact and taper length clearly justify it. Sanity: devices lining one work edge rarely need to exceed about ceil(perimeter_ft / 20) unless the user described multi-lane tapers or many legs. Prefer one primary high-visibility message source per approach (PCMS or trailer arrow board), not both by default. Mark aggressive extras as "optional" when scope is ambiguous.
11. Quantity hard sanity (when perimeter_ft is known from a drawn zone): treat ceil(perimeter_ft / 22) as a practical upper bound for the **total** count of channelizing drums OR cones lining one continuous edge of that footprint unless the user explicitly asked for multi-leg channelization or multiple tapers. For modest footprints under ~15,000 sq ft, cap Type III barricades near ceil(perimeter_ft / 35) and water-filled barriers near ceil(perimeter_ft / 25) unless they clearly need a full run. If the job sounds like a patch/utility cut, prefer fewer, higher-priority devices over maxing every line item.

Respond in valid JSON format:
{
  "summary": "Brief 2-3 sentence summary of the recommended setup",
  "items": [
    {
      "productId": "prod-X",
      "productName": "Item name",
      "category": "Category name",
      "quantity": N,
      "rationale": "Brief reason why this quantity",
      "priority": "required|recommended|optional",
      "dailyRate": X.XX
    }
  ],
  "totalDailyRate": XX.XX,
  "estimatedDurationDays": N,
  "setupNotes": ["Note 1", "Note 2"],
  "disclaimer": "Standard disclaimer about planning guidance vs compliance requirements"
}

For the productId field, use the prod-* IDs listed above when they match the need. Each item's dailyRate must match the catalog rate for that ID (do not invent rates).

Always remind users that recommendations are planning guidance only and that final requirements depend on project conditions and applicable state/local standards. Keep the tone contractor-friendly and practical.`

export async function getJobRecommendation(
  jobDetails: Partial<JobDetails>,
  userMessage?: string,
): Promise<AIRecommendation> {
  if (DEMO_MODE) {
    return getDemoRecommendation(jobDetails, userMessage)
  }

  const jobPrompt = buildJobPrompt(jobDetails, userMessage)

  const response = await fetch(CHAT_PROXY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please recommend traffic control equipment for this job:\n\n${jobPrompt}\n\nRespond with valid JSON only.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    const useDemo =
      (response.status === 500 || response.status === 502) &&
      /no chat API keys|GEMINI_API_KEY missing/i.test(raw)
    if (useDemo) {
      return getDemoRecommendation(jobDetails, userMessage)
    }
    throw new Error(formatChatHttpError(response.status, raw))
  }

  const data = await response.json()
  const text = data.content[0]?.text ?? ''

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in AI response')

  return normalizeRecommendationPricing(JSON.parse(jsonMatch[0]) as AIRecommendation)
}

export async function streamJobChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  options?: { mapArea?: MapArea },
): Promise<void> {
  if (DEMO_MODE) {
    const messagesForDemo = augmentLastUserMessageWithMapArea(messages, options?.mapArea)
    const lastUser = [...messagesForDemo].reverse().find((m) => m.role === 'user')?.content ?? ''
    if (lastUser.includes('Here are my answers')) {
      const rec = normalizeRecommendationPricing(
        getDemoRecommendation({
          jobType: 'paving',
          roadType: 'arterial',
          speedLimit: 45,
          laneImpact: 'one_lane_closed',
          workTime: 'day',
          durationDays: 5,
          pedestrianExposure: 'low',
        }),
      )
      const demo = `Here's your recommended equipment setup.

[CART_START]
${JSON.stringify(rec)}
[CART_END]`
      for (const char of demo) {
        onChunk(char)
        await new Promise((r) => setTimeout(r, 3))
      }
      onDone()
      return
    }

    const hasMapBlock = lastUser.includes('[Map work zone]')
    const mapQuestion = hasMapBlock
      ? ''
      : `[Q: Work zone on the map — what's your next step?]
[A: Polygon is drawn — ready]
[A: Not yet — I'll search / move the map, then draw the outline]
[A: I'll describe the footprint in text instead]

`
    const ma = options?.mapArea
    const mapBits: string[] = []
    if (ma?.address) mapBits.push(`location ${ma.address}`)
    if (ma?.postedSpeedLabel) mapBits.push(ma.postedSpeedLabel)
    if (ma?.footprintMinSpanFt != null && ma?.footprintMaxSpanFt != null) {
      mapBits.push(`outline ~${Math.round(ma.footprintMinSpanFt)}×${Math.round(ma.footprintMaxSpanFt)} ft`)
    }
    const mapLead =
      hasMapBlock && mapBits.length > 0
        ? `From your map (${mapBits.join('; ')}), I'm using that outline for sizing — please confirm a few details:\n\n`
        : hasMapBlock
          ? `From your drawn work zone on the map, I'm using that outline for sizing — please confirm a few details:\n\n`
          : ''
    const demo = `${mapLead}${hasMapBlock ? '' : `Thanks for describing your job! Use the search bar on the map (or type Location: … / lat,lng in chat) to jump to the site, then draw your work zone polygon — that calibrates quantities. A few quick details:\n\n`}${mapQuestion}[Q: What type of road is this on?]
[A: Interstate / Freeway (65+ mph)]
[A: US or State Highway (45–65 mph)]
[A: County or Arterial Road (35–45 mph)]
[A: Local / Residential Street (under 35 mph)]

[Q: How much of the road will you be blocking?]
[A: Shoulder only — no lane closed]
[A: One lane closed]
[A: Two or more lanes closed]
[A: Full closure — all traffic stopped]`
    for (const char of demo) {
      onChunk(char)
      await new Promise((r) => setTimeout(r, 8))
    }
    onDone()
    return
  }

  const messagesForApi = augmentLastUserMessageWithMapArea(messages, options?.mapArea)

  const response = await fetch(CHAT_PROXY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      /** Cart JSON + rationales for many SKUs needs headroom; 1024 often truncates mid-[CART_START]. */
      max_tokens: 4096,
      stream: true,
      system: `You are the AI Work Zone Planner for ${SITE_NAME}. Help contractors find the right temporary traffic control equipment to rent. Be brief and direct.

The UI shows a Google Map directly above the chat input with a search field: users can jump to an address, highway + milepost (Geocoder resolves natural language), or decimal lat/lng. In chat they can also type "Location: …" / "Address: …" or a coordinate pair such as 40.7128, -74.0060 — the client recenters the map when they send. They still need a drawn polygon for the [Map work zone] block (area/perimeter); search only moves the map view.

When you need info, ask ALL remaining questions at once using this EXACT format for each question (each [Q:] followed by its [A:] lines):

[Q: Question?]
[A: Option 1]
[A: Option 2]
[A: Option 3]

Rules:
- If the latest user message does NOT contain a [Map work zone] block: no preamble — go straight to the question blocks.
- If the latest user message DOES contain [Map work zone]: FIRST output one short sentence (max ~35 words) that explicitly references what that block says (Map location/address, posted speed if present, area/perimeter, footprint spans if present). Treat that block as the user's prior map work — do not tell them to search or draw again unless something is inconsistent or missing.
- Map-informed follow-ups: use posted speed (when present) to pick the most likely road-type bucket and ask confirmation (put your best match as the first [A:] option). Use footprint min/max spans heuristically (~≤18 ft narrow vs ~≥22–40+ ft often suggests multiple lanes or full roadway width vs shoulder/single lane) combined with the user's text to propose a default lane-impact option first — still offer alternatives and "Not sure".
- Do not ask generic road-type or lane-impact questions as if no map context exists when [Map work zone] is present; prefer "Confirm …" phrasing grounded in the map fields.
- If the latest user message does NOT contain a [Map work zone] block, your FIRST batch of questions MUST start with a map question before road/lane questions, using this exact wording:
  [Q: Work zone on the map — what's your next step?]
  [A: Polygon is drawn — ready]
  [A: Not yet — I'll search / move the map, then draw the outline]
  [A: I'll describe the footprint in text instead]
  If [Map work zone] is already present, skip that map question — do not ask them to draw again unless something is unclear
- Ask all other still-needed questions in the same message (anything not inferable: duration, day/night, regulatory speed if it clearly differs from posted map speed, etc.)
- Users may answer every question in one reply (bulleted list); treat all answers as your new context — do not re-ask what they already answered
- 3–5 options per question, include "Not sure" when useful
- Once you have road type, speed limit, lane impact, duration, and day/night: OUTPUT A CART WIDGET (see below) — do NOT list equipment in plain text
- If a user message ends with a [Map work zone] block (sq ft, perimeter ft, optional address), use those dimensions to calibrate cone/drum counts, taper and channelization length, and barrier quantities—do not ignore the drawn area when recommending
- Small-drawn-footprint rule: When [Map work zone] is compact (rough guide: area under ~12,000 sq ft and/or the smaller footprint span under ~40 ft), treat the polygon as a localized work patch on the roadway—not evidence of a long-distance lane closure unless the user said so. Keep drums/barricades/flashers proportional to lining that footprint and reasonable, user-described tapers; do not inflate counts to template values meant for long high-speed closures. As a soft sanity cap for a simple patch, total channelizing drums (or equivalent cones) needed just to edge the drawn zone is often on the order of ceil(perimeter_ft / 25) or less unless multi-lane or multi-leg channelization is explicit. Avoid recommending both a portable changeable message sign and a trailer arrow board for the same small local job unless the user clearly needs redundancy on separate approaches.
- When quantities would look excessive next to the given sq ft / perimeter (e.g. dozens of Type III barricades for under ~10k sq ft), reduce counts, explain the assumption in each rationale, and push nice-to-have duplicates to "optional" priority.

WHEN READY TO RECOMMEND — output exactly this (a brief sentence, then the cart block):
Here's your recommended equipment setup.
[CART_START]
{"summary":"...","items":[{"productId":"prod-X","productName":"...","category":"...","quantity":N,"rationale":"...","priority":"required|recommended|optional","dailyRate":X.XX}],"totalDailyRate":XX.XX,"estimatedDurationDays":N,"setupNotes":["..."],"disclaimer":"These recommendations are planning guidance only. Verify with your project engineer or state DOT."}
[CART_END]

Product IDs and retail daily rates (use these exact dailyRate values in the cart JSON):
${STREAM_CART_PRODUCT_RATES}`,
      messages: messagesForApi,
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    const note = formatChatHttpError(response.status, raw)
    for (const char of note) {
      onChunk(char)
      await new Promise((r) => setTimeout(r, 2))
    }
    onDone()
    return
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') continue
        try {
          const parsed = JSON.parse(data)
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            onChunk(parsed.delta.text)
          }
        } catch {
          // skip malformed chunks
        }
      }
    }
  }

  onDone()
}

function getDemoRecommendation(
  jobDetails: Partial<JobDetails>,
  userMessage?: string,
): AIRecommendation {
  const catalogDaily = (productId: string) => getProductById(productId)!.dailyRate

  const isHighSpeed = Number(jobDetails.speedLimit) >= 45
  const isNight = jobDetails.workTime === 'night' || jobDetails.workTime === 'both'
  const isLaneClosure = jobDetails.laneImpact === 'one_lane_closed' || jobDetails.laneImpact === 'two_lanes_closed'
  const isHighPed = jobDetails.pedestrianExposure === 'high' || jobDetails.pedestrianExposure === 'moderate'
  const days = Number(jobDetails.durationDays) || 3

  const coneId = isHighSpeed ? 'prod-2' : 'prod-1'
  const items: RecommendationItem[] = [
    {
      productId: coneId,
      productName: isHighSpeed ? '36" Traffic Cone' : '28" Traffic Cone',
      category: 'Cones & Drums',
      quantity: isLaneClosure ? 40 : 20,
      rationale: isHighSpeed
        ? '36" cones required for roads 45+ mph per most state standards'
        : 'Standard 28" cones for lane and shoulder delineation',
      priority: 'required',
      dailyRate: catalogDaily(coneId),
    },
    {
      productId: 'prod-4',
      productName: 'Roll-Up Sign — Road Work Ahead',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'Required advance warning signs at both approach directions',
      priority: 'required',
      dailyRate: catalogDaily('prod-4'),
    },
    {
      productId: 'prod-6',
      productName: 'Telescoping Sign Stand',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'One stand per advance warning sign',
      priority: 'required',
      dailyRate: catalogDaily('prod-6'),
    },
  ]

  if (isLaneClosure) {
    items.push({
      productId: 'prod-7',
      productName: 'Roll-Up Sign — One Lane Road',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'Required when lane is closed to alert approaching traffic',
      priority: 'required',
      dailyRate: catalogDaily('prod-7'),
    })
    items.push({
      productId: 'prod-11',
      productName: 'Trailer-Mounted Arrow Board',
      category: 'Arrow Boards',
      quantity: 1,
      rationale: 'DOT-required arrow board at the beginning of the lane taper',
      priority: 'required',
      dailyRate: catalogDaily('prod-11'),
    })
  }

  if (isNight) {
    items.push({
      productId: 'prod-3',
      productName: 'Channelizing Drum',
      category: 'Cones & Drums',
      quantity: 15,
      rationale: 'Drums with retroreflective sheeting provide superior visibility at night',
      priority: 'recommended',
      dailyRate: catalogDaily('prod-3'),
    })
    items.push({
      productId: 'prod-14',
      productName: 'Type B Warning Light',
      category: 'Safety Lighting',
      quantity: 15,
      rationale: 'Flashing amber lights on drums and barricades required for night work',
      priority: 'required',
      dailyRate: catalogDaily('prod-14'),
    })
  }

  if (isHighPed) {
    items.push({
      productId: 'prod-8',
      productName: 'Type III Barricade',
      category: 'Barricades & Barriers',
      quantity: 4,
      rationale: 'Pedestrian channelization and protection in high-foot-traffic areas',
      priority: 'recommended',
      dailyRate: catalogDaily('prod-8'),
    })
  }

  const jobDesc = userMessage ? `for your described job (${userMessage.slice(0, 60)}...)` : 'for your work zone'

  return normalizeRecommendationPricing({
    summary: `Here's a recommended traffic control setup ${jobDesc}. This configuration covers advance warning, channelization${isLaneClosure ? ', and lane closure guidance' : ''}${isNight ? ', plus night-work lighting' : ''}. Quantities are estimated — your traffic control supervisor should verify against local standards.`,
    items,
    totalDailyRate: 0,
    estimatedDurationDays: days,
    setupNotes: [
      `Advance warning signs should be placed ${isHighSpeed ? '1,000–1,500 ft' : '350–500 ft'} upstream of the work zone`,
      isLaneClosure ? 'Cone taper length should follow your state DOT guidelines based on speed' : 'Maintain clear channelization through the work area',
      isNight ? 'All retroreflective devices and lights must be operational before dark' : 'Check sign visibility angles before starting work',
      'Assign a qualified flagger if traffic alternates through a single open lane',
    ],
    disclaimer:
      'These recommendations are planning guidance to help you estimate rental needs. Final traffic control plan requirements depend on actual project conditions, applicable state/local standards, and may require a certified Traffic Control Supervisor or TCP. Verify requirements with your project engineer or state DOT.',
  })
}
