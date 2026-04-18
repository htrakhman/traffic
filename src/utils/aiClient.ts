import type { JobDetails, RecommendationItem } from '../types'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined

export interface AIRecommendation {
  summary: string
  items: RecommendationItem[]
  totalDailyRate: number
  estimatedDurationDays: number
  setupNotes: string[]
  disclaimer: string
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
  if (jobDetails.mapArea) {
    const a = jobDetails.mapArea
    parts.push(`Work zone area (drawn on map): ${a.areaLabel} (${Math.round(a.areaFt2).toLocaleString()} sq ft)`)
    parts.push(`Work zone perimeter: ${a.perimeterLabel} (${Math.round(a.perimeterFt).toLocaleString()} ft)`)
    if (a.address) parts.push(`Map location: ${a.address}`)
  }

  return parts.join('\n')
}

const SYSTEM_PROMPT = `You are TrafficKit's AI Work Zone Planner — an expert assistant that helps contractors determine what temporary traffic control (TTC) equipment they need to rent for work zones. You have deep knowledge of MUTCD (Manual on Uniform Traffic Control Devices) requirements, ATSSA standards, and common work zone setups.

Your available rental equipment catalog includes:
- Traffic Cones: 28" cones ($1.50/day), 36" cones ($2.25/day)
- Channelizing Drums: 36" drums with retroreflective sheeting ($4.50/day)
- Roll-Up Signs: Road Work Ahead ($5/day), Flagger Ahead ($5/day), One Lane Road ($5/day), and many others
- Sign Stands: Telescoping aluminum ($4/day)
- Barricades: Type III 8ft ($8/day), Type II ($5.50/day)
- Water-Filled Barriers: 6ft sections ($18/day)
- Arrow Boards: Trailer-mounted 15-light ($95/day), Truck-mounted 15-light ($65/day)
- Message Boards: 3-line PCMS solar ($175/day)
- Warning Lights: Type B flashing ($1.50/day)
- LED Flares: 6-pack ($12/day)

When a user describes their job, provide a structured equipment recommendation. Be specific about quantities. Consider:
1. Advance warning area needs (signs, spacing based on speed)
2. Transition area (tapers — cones/drums) — if a drawn map area is provided, use the perimeter to calculate exact taper/channelization lengths and cone spacing
3. Buffer/work space — scale barrier and cone quantities to the drawn area size when available
4. Night vs day (add lights/drums if night)
5. Pedestrian exposure (may need additional devices)
6. Whether they already own some gear
7. If a drawn work zone area (sq ft / perimeter in ft) is given, use those dimensions to calculate precise cone counts, drum spacing, and barrier lengths rather than estimating

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

For the productId, use these exact IDs from the catalog:
- prod-1: 28" Traffic Cone
- prod-2: 36" Traffic Cone
- prod-3: Channelizing Drum
- prod-4: Roll-Up Sign — Road Work Ahead
- prod-5: Roll-Up Sign — Flagger Ahead
- prod-6: Telescoping Sign Stand
- prod-7: Roll-Up Sign — One Lane Road
- prod-8: Type III Barricade
- prod-9: Type II Barricade
- prod-10: Water-Filled Barrier
- prod-11: Trailer-Mounted Arrow Board
- prod-12: Truck-Mounted Arrow Board
- prod-13: Portable Message Board
- prod-14: Type B Warning Light
- prod-15: LED Flare 6-Pack

Always remind users that recommendations are planning guidance only and that final requirements depend on project conditions and applicable state/local standards. Keep the tone contractor-friendly and practical.`

export async function getJobRecommendation(
  jobDetails: Partial<JobDetails>,
  userMessage?: string,
): Promise<AIRecommendation> {
  if (!API_KEY) {
    // Return demo recommendation when no API key
    return getDemoRecommendation(jobDetails, userMessage)
  }

  const jobPrompt = buildJobPrompt(jobDetails, userMessage)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
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
    const err = await response.text()
    throw new Error(`API error: ${response.status} — ${err}`)
  }

  const data = await response.json()
  const text = data.content[0]?.text ?? ''

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in AI response')

  return JSON.parse(jsonMatch[0]) as AIRecommendation
}

export async function streamJobChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
): Promise<void> {
  if (!API_KEY) {
    // Simulate streaming for demo
    const demo = `Thanks for describing your job! To build an accurate equipment list, I need a couple more details.

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

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      stream: true,
      system: `You are TrafficKit's AI Work Zone Planner. Help contractors find the right temporary traffic control equipment to rent. Be brief and direct.

When you need info, ask ALL remaining questions at once using this EXACT format — no extra text, one block per question:

[Q: Question?]
[A: Option 1]
[A: Option 2]
[A: Option 3]

Rules:
- No intro sentences — go straight to the question blocks
- Ask all needed questions in one message (road type, speed limit, lane impact, duration, day/night)
- 3–5 options per question, include "Not sure" when useful
- Once you have road type, speed limit, lane impact, duration, and day/night: OUTPUT A CART WIDGET (see below) — do NOT list equipment in plain text

WHEN READY TO RECOMMEND — output exactly this (a brief sentence, then the cart block):
Here's your recommended equipment setup.
[CART_START]
{"summary":"...","items":[{"productId":"prod-X","productName":"...","category":"...","quantity":N,"rationale":"...","priority":"required|recommended|optional","dailyRate":X.XX}],"totalDailyRate":XX.XX,"estimatedDurationDays":N,"setupNotes":["..."],"disclaimer":"These recommendations are planning guidance only. Verify with your project engineer or state DOT."}
[CART_END]

Product IDs to use:
prod-1: 28" Traffic Cone ($1.50/day) | prod-2: 36" Traffic Cone ($2.25/day) | prod-3: Channelizing Drum ($4.50/day) | prod-4: Roll-Up Sign — Road Work Ahead ($5/day) | prod-5: Roll-Up Sign — Flagger Ahead ($5/day) | prod-6: Telescoping Sign Stand ($4/day) | prod-7: Roll-Up Sign — One Lane Road ($5/day) | prod-8: Type III Barricade ($8/day) | prod-9: Type II Barricade ($5.50/day) | prod-10: Water-Filled Barrier ($18/day) | prod-11: Trailer-Mounted Arrow Board ($95/day) | prod-12: Truck-Mounted Arrow Board ($65/day) | prod-13: Portable Message Board ($175/day) | prod-14: Type B Warning Light ($1.50/day) | prod-15: LED Flare 6-Pack ($12/day)`,
      messages,
    }),
  })

  if (!response.ok) throw new Error(`Stream error: ${response.status}`)

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
  const isHighSpeed = Number(jobDetails.speedLimit) >= 45
  const isNight = jobDetails.workTime === 'night' || jobDetails.workTime === 'both'
  const isLaneClosure = jobDetails.laneImpact === 'one_lane_closed' || jobDetails.laneImpact === 'two_lanes_closed'
  const isHighPed = jobDetails.pedestrianExposure === 'high' || jobDetails.pedestrianExposure === 'moderate'
  const days = Number(jobDetails.durationDays) || 3

  const items: RecommendationItem[] = [
    {
      productId: isHighSpeed ? 'prod-2' : 'prod-1',
      productName: isHighSpeed ? '36" Traffic Cone' : '28" Traffic Cone',
      category: 'Cones & Drums',
      quantity: isLaneClosure ? 40 : 20,
      rationale: isHighSpeed
        ? '36" cones required for roads 45+ mph per most state standards'
        : 'Standard 28" cones for lane and shoulder delineation',
      priority: 'required',
      dailyRate: isHighSpeed ? 2.25 : 1.5,
    },
    {
      productId: 'prod-4',
      productName: 'Roll-Up Sign — Road Work Ahead',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'Required advance warning signs at both approach directions',
      priority: 'required',
      dailyRate: 5,
    },
    {
      productId: 'prod-6',
      productName: 'Telescoping Sign Stand',
      category: 'Signs & Sign Stands',
      quantity: 2,
      rationale: 'One stand per advance warning sign',
      priority: 'required',
      dailyRate: 4,
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
      dailyRate: 5,
    })
    items.push({
      productId: 'prod-11',
      productName: 'Trailer-Mounted Arrow Board',
      category: 'Arrow Boards',
      quantity: 1,
      rationale: 'DOT-required arrow board at the beginning of the lane taper',
      priority: 'required',
      dailyRate: 95,
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
      dailyRate: 4.5,
    })
    items.push({
      productId: 'prod-14',
      productName: 'Type B Warning Light',
      category: 'Safety Lighting',
      quantity: 15,
      rationale: 'Flashing amber lights on drums and barricades required for night work',
      priority: 'required',
      dailyRate: 1.5,
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
      dailyRate: 8,
    })
  }

  const totalDailyRate = items.reduce((sum, item) => sum + item.dailyRate * item.quantity, 0)

  const jobDesc = userMessage ? `for your described job (${userMessage.slice(0, 60)}...)` : 'for your work zone'

  return {
    summary: `Here's a recommended traffic control setup ${jobDesc}. This configuration covers advance warning, channelization${isLaneClosure ? ', and lane closure guidance' : ''}${isNight ? ', plus night-work lighting' : ''}. Quantities are estimated — your traffic control supervisor should verify against local standards.`,
    items,
    totalDailyRate,
    estimatedDurationDays: days,
    setupNotes: [
      `Advance warning signs should be placed ${isHighSpeed ? '1,000–1,500 ft' : '350–500 ft'} upstream of the work zone`,
      isLaneClosure ? 'Cone taper length should follow your state DOT guidelines based on speed' : 'Maintain clear channelization through the work area',
      isNight ? 'All retroreflective devices and lights must be operational before dark' : 'Check sign visibility angles before starting work',
      'Assign a qualified flagger if traffic alternates through a single open lane',
    ],
    disclaimer:
      'These recommendations are planning guidance to help you estimate rental needs. Final traffic control plan requirements depend on actual project conditions, applicable state/local standards, and may require a certified Traffic Control Supervisor or TCP. Verify requirements with your project engineer or state DOT.',
  }
}
