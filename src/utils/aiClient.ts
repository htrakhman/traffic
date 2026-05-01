import type { JobDetails, MapArea, RecommendationItem, AIRecommendation } from '../types'
import { curatedProducts, getProductById } from '../data/products'
import {
  getLowestRetailUnitPrice,
  getMinimumOrderQuantity,
  getRetailUnitPriceForQty,
  normalizeRecommendationPricing,
  type RecommendationFootprintGuard,
} from './pricing'
import { extractChatCartRecommendation } from './chatCartParse'
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
  .map((p) => {
    const moq = getMinimumOrderQuantity(p)
    const low = getLowestRetailUnitPrice(p)
    return `- ${p.id}: ${p.name} — min order ${moq} ${p.unit}, lowest-tier retail $${low.toFixed(2)}/${p.unit} (unitPrice in JSON must equal catalog retail for that line's quantity)`
  })
  .join('\n')

/** One line for streaming cart instructions */
const STREAM_CART_PRODUCT_RATES = curatedProducts
  .map((p) => {
    const moq = getMinimumOrderQuantity(p)
    const low = getLowestRetailUnitPrice(p)
    return `${p.id}: ${p.name} (moq ${moq} @ $${low.toFixed(2)}/${p.unit})`
  })
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

/** Shared instructions for job JSON + streaming chat — single source of truth. */
const TTC_EXPERT_DOCTRINE = `Expert doctrine (follow in every reply):
- Regulatory stack: Treat the U.S. MUTCD as general national guidance. State DOT / municipal supplements, permits, and project-specific Traffic Control Plans (TCP), engineer-stamped layouts, and inspector direction always override generic app advice. Never present this output as legal sign-off or as a substitute for field-ready approvals.
- Honest language: Describe setups as typical MUTCD-based practice or common state patterns unless the user supplied exact specs or code citations. Do not invent specific MUTCD table, figure, or section references.
- Right-sizing: Default to the smallest professional equipment set that matches the described operation, drawn map footprint, posted speed, lane impact, and work time. Use priority "optional" aggressively for extras and redundant messaging hardware.
- Answer discipline: Answer the user's actual question first in the fewest words that stay safe and useful. Ask clarifying questions only when blocking for safety or sizing—when collecting context, batch questions instead of ping-ponging.
- Catalog honesty: Recommend catalog SKUs only where there is a clear operational need; omit unrelated categories instead of padding the list.`

/** Same as TTC_EXPERT_DOCTRINE but for text-only chat (no map / drawn footprint). */
const TTC_EXPERT_DOCTRINE_CHAT = TTC_EXPERT_DOCTRINE.replace(
  'drawn map footprint, posted speed',
  'linear limits or footprint the user describes, posted speed',
)

const SYSTEM_PROMPT = `You are the AI Work Zone Planner for ${SITE_NAME} — an expert assistant that helps contractors determine what temporary traffic control (TTC) equipment they need to purchase for work zones. You have deep knowledge of MUTCD (Manual on Uniform Traffic Control Devices) frameworks, ATSSA guidance, and common work zone setups.

${TTC_EXPERT_DOCTRINE}

Your available equipment catalog (retail purchase unit price by volume tier — already includes our standard 50% markup on supplier-reference economics; copy unitPrice exactly for each line's quantity):
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
      "unitPrice": X.XX
    }
  ],
  "estimatedMerchandiseSubtotal": XX.XX,
  "estimatedDurationDays": N,
  "setupNotes": ["Note 1", "Note 2"],
  "disclaimer": "Standard disclaimer about planning guidance vs compliance requirements"
}

For the productId field, use the prod-* IDs listed above when they match the need. Each item's unitPrice must match the catalog retail unit price for that ID at the quantity on that line (do not invent rates).

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
      max_tokens: 4096,
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

  const mapFootprint = jobDetails.mapArea
    ? { perimeterFt: jobDetails.mapArea.perimeterFt, areaFt2: jobDetails.mapArea.areaFt2 }
    : undefined
  return normalizeRecommendationPricing(JSON.parse(jsonMatch[0]) as AIRecommendation, mapFootprint)
}

/** Streaming chat for the AI Job Planner — text-only; map/drawing live on the Site Map Planner page only. */
const STREAM_JOB_CHAT_SYSTEM = `You are the AI Work Zone Planner for ${SITE_NAME}. Help contractors find the right temporary traffic control equipment to purchase. Be brief and direct.

${TTC_EXPERT_DOCTRINE_CHAT}

Chat output discipline:
- Outside [Q]/[A] blocks and the single cart lead-in sentence ("Here's your recommended equipment setup."), avoid long essays, markdown tables, and generic MUTCD lectures.
- Never duplicate a full equipment list in free text when a [CART_START]…[CART_END] JSON block is the right output.

This planner is chat-only: do not tell users to draw on a map, search a map, or outline a polygon. If you need distances or limits, ask them to state approximate linear feet of closure, taper length, lane width, or work limits in plain text.

When you need info, ask ALL remaining questions at once using this EXACT format for each question (each [Q:] followed by its [A:] lines):

[Q: Question?]
[A: Option 1]
[A: Option 2]
[A: Option 3]

Rules:
- If the user's message already gives enough context for a safe, reasonable cart (road class, speed, lane impact, duration, day/night, and approximate work limits), skip extra questions and output the cart.
- Otherwise, no preamble — go straight to the question blocks. Batch every still-needed question in one message (e.g. road type, regulatory/design speed, lane impact, duration, day vs night, pedestrian exposure, linear feet of lane closure or work limits if not stated).
- 3–5 options per question, include "Not sure" when useful
- Users may answer every question in one reply (bulleted list); treat all answers as your new context — do not re-ask what they already answered
- Once you have road type, speed limit, lane impact, duration, and day/night (and any critical limits they can give in text): OUTPUT A CART WIDGET (see below) — do NOT list equipment in plain text
- When the user gives distances in feet (closure length, taper, lane width), use those for taper/channelization and cone/drum counts; if distances are missing and matter for quantities, ask once in the batched questions
- Right-size quantities to the described scope — avoid highway-style fleet counts for small local jobs unless lane impact and speeds clearly justify it. Prefer one primary high-visibility message source per approach (PCMS or trailer arrow board), not both by default. Mark aggressive extras as "optional" when scope is ambiguous.

WHEN READY TO RECOMMEND — output exactly this (a brief sentence, then the cart block):
Here's your recommended equipment setup.
[CART_START]
{"summary":"...","items":[{"productId":"prod-X","productName":"...","category":"...","quantity":N,"rationale":"...","priority":"required|recommended|optional","unitPrice":X.XX}],"estimatedMerchandiseSubtotal":XX.XX,"estimatedDurationDays":N,"setupNotes":["..."],"disclaimer":"These recommendations are planning guidance only. Verify with your project engineer or state DOT."}
[CART_END]

Product IDs and catalog unit pricing (use these exact unitPrice values for each quantity in the cart JSON):
${STREAM_CART_PRODUCT_RATES}`

export async function streamJobChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
): Promise<void> {
  if (DEMO_MODE) {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? ''
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

    const demo = `Thanks for describing your job! A few quick details:

[Q: What type of road is this on?]
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

  const response = await fetch(CHAT_PROXY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      /** Cart JSON + rationales for many SKUs needs headroom; prefer recovery over user-visible truncation. */
      max_tokens: 8192,
      stream: true,
      system: STREAM_JOB_CHAT_SYSTEM,
      messages,
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

const CART_RECOVERY_USER = `Your previous reply in this thread started a [CART_START] equipment cart but the JSON was truncated or invalid before the UI could load it.

Output a single repair message for the chat UI only:
1) The exact line: Here's your recommended equipment setup.
2) Then one [CART_START] line, one JSON object (no markdown fences) with: summary, items (productId, productName, category, quantity, rationale, priority, unitPrice), estimatedMerchandiseSubtotal, estimatedDurationDays, setupNotes, disclaimer — same schema as the main planner.
3) Then [CART_END] on its own line.

Do not repeat [Q]/[A] blocks or a plain-text equipment list. Keep the item list focused; use priority "optional" for extras. unitPrice must match the catalog list in the system message for each line's quantity.`

const CART_RECOVERY_SYSTEM = `You complete truncated work-zone equipment carts for ${SITE_NAME}.

${TTC_EXPERT_DOCTRINE}

Reply discipline: output only the lead sentence, [CART_START], one JSON object, [CART_END] — nothing else.

Catalog product IDs and retail unit prices (copy unitPrice exactly for each quantity):
${STREAM_CART_PRODUCT_RATES}`

/**
 * Non-streaming follow-up when the streamed assistant reply contained [CART_START] but no loadable cart JSON.
 * Returns full assistant message text (prefix before [CART_START] preserved, then a fresh cart block).
 */
export async function recoverJobChatCart(
  priorMessages: { role: 'user' | 'assistant'; content: string }[],
  truncatedAssistantReply: string,
  options?: { mapFootprint?: RecommendationFootprintGuard },
): Promise<string> {
  const openIdx = truncatedAssistantReply.indexOf('[CART_START]')
  const head = (openIdx === -1 ? truncatedAssistantReply : truncatedAssistantReply.slice(0, openIdx)).trimEnd()

  if (DEMO_MODE) {
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
      options?.mapFootprint,
    )
    return `${head}\n\n[CART_START]\n${JSON.stringify(rec)}\n[CART_END]`
  }

  const recoveryMessages = [
    ...priorMessages,
    { role: 'assistant' as const, content: truncatedAssistantReply },
    { role: 'user' as const, content: CART_RECOVERY_USER },
  ]

  const response = await fetch(CHAT_PROXY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      max_tokens: 8192,
      stream: false,
      system: CART_RECOVERY_SYSTEM,
      messages: recoveryMessages,
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(formatChatHttpError(response.status, raw))
  }

  const data = (await response.json()) as { content?: Array<{ text?: string }> }
  const text = data.content?.[0]?.text ?? ''
  const rec = extractChatCartRecommendation(text, options?.mapFootprint)
  if (!rec) {
    throw new Error('Recovery model did not return a parseable equipment cart.')
  }

  return `${head}\n\n[CART_START]\n${JSON.stringify(rec)}\n[CART_END]`
}

function getDemoRecommendation(
  jobDetails: Partial<JobDetails>,
  userMessage?: string,
): AIRecommendation {
  const catalogUnit = (productId: string, qty: number) => {
    const p = getProductById(productId)
    if (!p) return 0
    return getRetailUnitPriceForQty(p, qty)
  }

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
      unitPrice: catalogUnit(coneId, isLaneClosure ? 40 : 20),
    },
    {
      productId: 'prod-4',
      productName: 'Roll-Up Sign — Road Work Ahead',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'Required advance warning signs at both approach directions',
      priority: 'required',
      unitPrice: catalogUnit('prod-4', 2),
    },
    {
      productId: 'prod-6',
      productName: 'Telescoping Sign Stand',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'One stand per advance warning sign',
      priority: 'required',
      unitPrice: catalogUnit('prod-6', 2),
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
      unitPrice: catalogUnit('prod-7', 2),
    })
    items.push({
      productId: 'prod-11',
      productName: 'Trailer-Mounted Arrow Board',
      category: 'Arrow Boards',
      quantity: 1,
      rationale: 'DOT-required arrow board at the beginning of the lane taper',
      priority: 'required',
      unitPrice: catalogUnit('prod-11', 1),
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
      unitPrice: catalogUnit('prod-3', 15),
    })
    items.push({
      productId: 'prod-14',
      productName: 'Type B Warning Light',
      category: 'Safety Lighting',
      quantity: 15,
      rationale: 'Flashing amber lights on drums and barricades required for night work',
      priority: 'required',
      unitPrice: catalogUnit('prod-14', 15),
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
      unitPrice: catalogUnit('prod-8', 4),
    })
  }

  const jobDesc = userMessage ? `for your described job (${userMessage.slice(0, 60)}...)` : 'for your work zone'

  return normalizeRecommendationPricing({
    summary: `Here's a recommended traffic control setup ${jobDesc}. This configuration covers advance warning, channelization${isLaneClosure ? ', and lane closure guidance' : ''}${isNight ? ', plus night-work lighting' : ''}. Quantities are estimated — your traffic control supervisor should verify against local standards.`,
    items,
    estimatedMerchandiseSubtotal: 0,
    estimatedDurationDays: days,
    setupNotes: [
      `Advance warning signs should be placed ${isHighSpeed ? '1,000–1,500 ft' : '350–500 ft'} upstream of the work zone`,
      isLaneClosure ? 'Cone taper length should follow your state DOT guidelines based on speed' : 'Maintain clear channelization through the work area',
      isNight ? 'All retroreflective devices and lights must be operational before dark' : 'Check sign visibility angles before starting work',
      'Assign a qualified flagger if traffic alternates through a single open lane',
    ],
    disclaimer:
      'These recommendations are planning guidance to help you estimate purchase quantities. Final traffic control plan requirements depend on actual project conditions, applicable state/local standards, and may require a certified Traffic Control Supervisor or TCP. Verify requirements with your project engineer or state DOT.',
  })
}
