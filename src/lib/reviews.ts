import type { Product, ProductReview, ReviewAggregate } from '../types'

// Deterministic, seeded generator. Same product slug → same reviews on every render.
// Persona pool is large enough that across the whole catalog (10k+ products × ~15 reviews)
// the same author+location combo essentially never repeats. We also dedupe within a product.

const FIRST_NAMES = [
  'Mike', 'Jason', 'Carlos', 'David', 'Tony', 'Brian', 'Mark', 'Steve', 'Greg', 'Frank',
  'Joe', 'Kevin', 'Ryan', 'Eric', 'Daniel', 'Chris', 'Matt', 'Andrew', 'Paul', 'Tim',
  'Scott', 'Jeff', 'Dave', 'Bill', 'Rick', 'Tom', 'Ray', 'Phil', 'Doug', 'Wayne',
  'Hector', 'Luis', 'Miguel', 'Juan', 'Diego', 'Roberto', 'Antonio', 'Manuel', 'Pedro', 'Jorge',
  'Sarah', 'Jen', 'Amanda', 'Jess', 'Lisa', 'Karen', 'Michelle', 'Heather', 'Stephanie', 'Nicole',
  'Linda', 'Donna', 'Debbie', 'Patty', 'Susan', 'Jackie', 'Cindy', 'Tracy', 'Beth', 'Maria',
  'Ahmed', 'Raj', 'Vinod', 'Suresh', 'Ali', 'Omar', 'Khalil', 'Sanjay', 'Dmitri', 'Sergey',
  'Brett', 'Cody', 'Dustin', 'Kyle', 'Travis', 'Trevor', 'Brad', 'Chad', 'Shane', 'Jared',
  'Earl', 'Vern', 'Walt', 'Roy', 'Lonnie', 'Buddy', 'Cliff', 'Hank', 'Dale', 'Curt',
  'Tasha', 'Yvette', 'Aisha', 'Renee', 'Brenda', 'Gail', 'Marlene', 'Pam', 'Joanne', 'Vicki',
]

const LAST_INITIALS = [
  'A.', 'B.', 'C.', 'D.', 'F.', 'G.', 'H.', 'J.', 'K.', 'L.',
  'M.', 'N.', 'P.', 'R.', 'S.', 'T.', 'V.', 'W.', 'Y.', 'Z.',
  'McK.', 'O\'B.', 'St.J.', 'Van H.', 'De L.',
]

const LOCATIONS = [
  'Newark, NJ', 'Jersey City, NJ', 'Trenton, NJ', 'Edison, NJ', 'Paterson, NJ', 'Elizabeth, NJ',
  'Philadelphia, PA', 'Pittsburgh, PA', 'Allentown, PA', 'Erie, PA', 'Reading, PA',
  'New York, NY', 'Buffalo, NY', 'Rochester, NY', 'Syracuse, NY', 'Albany, NY', 'Yonkers, NY',
  'Boston, MA', 'Worcester, MA', 'Springfield, MA',
  'Hartford, CT', 'New Haven, CT', 'Bridgeport, CT',
  'Baltimore, MD', 'Wilmington, DE', 'Providence, RI',
  'Atlanta, GA', 'Savannah, GA', 'Columbus, GA', 'Augusta, GA',
  'Charlotte, NC', 'Raleigh, NC', 'Greensboro, NC',
  'Charleston, SC', 'Columbia, SC',
  'Jacksonville, FL', 'Miami, FL', 'Tampa, FL', 'Orlando, FL', 'Fort Lauderdale, FL',
  'Houston, TX', 'Dallas, TX', 'Austin, TX', 'San Antonio, TX', 'El Paso, TX', 'Fort Worth, TX',
  'Phoenix, AZ', 'Tucson, AZ', 'Mesa, AZ',
  'Denver, CO', 'Colorado Springs, CO', 'Aurora, CO',
  'Las Vegas, NV', 'Reno, NV',
  'Salt Lake City, UT', 'Boise, ID', 'Albuquerque, NM',
  'Seattle, WA', 'Spokane, WA', 'Tacoma, WA',
  'Portland, OR', 'Eugene, OR',
  'Los Angeles, CA', 'San Diego, CA', 'San Jose, CA', 'Sacramento, CA', 'Fresno, CA', 'Long Beach, CA', 'Bakersfield, CA',
  'Chicago, IL', 'Springfield, IL', 'Rockford, IL',
  'Indianapolis, IN', 'Fort Wayne, IN',
  'Detroit, MI', 'Grand Rapids, MI', 'Lansing, MI',
  'Cleveland, OH', 'Columbus, OH', 'Cincinnati, OH', 'Toledo, OH',
  'Milwaukee, WI', 'Madison, WI',
  'Minneapolis, MN', 'St. Paul, MN',
  'St. Louis, MO', 'Kansas City, MO',
  'Memphis, TN', 'Nashville, TN', 'Knoxville, TN',
  'Birmingham, AL', 'Mobile, AL', 'Huntsville, AL',
  'New Orleans, LA', 'Baton Rouge, LA', 'Shreveport, LA',
  'Little Rock, AR', 'Tulsa, OK', 'Oklahoma City, OK',
  'Louisville, KY', 'Lexington, KY',
  'Richmond, VA', 'Norfolk, VA', 'Virginia Beach, VA',
  'Des Moines, IA', 'Omaha, NE',
  'Anchorage, AK', 'Honolulu, HI',
]

// Headlines: weighted toward positive (most ratings 4-5)
const POS_TITLES = [
  'Exactly what we needed',
  'Holds up on the job site',
  'Crew loves these',
  'Solid build, fast shipping',
  'Better than the last brand we used',
  'Great value for the price',
  'Reliable every shift',
  'Will buy again',
  'Quality you can feel',
  'Saved us a callback',
  'Survived the winter',
  'No complaints — works as advertised',
  'Foreman approved',
  'Bought a second set',
  'Highly visible day or night',
  'Built like a tank',
  'Replaced our old ones with these',
  'Glad we went with this brand',
  'Worth every penny',
  'Fits our setup perfectly',
]

const MID_TITLES = [
  'Pretty good overall',
  'Does the job',
  'Decent for the price',
  'Mostly happy',
  'Works, with a few quirks',
  'Good but not perfect',
  'Solid choice for short-term',
  'Met expectations',
  'No frills, gets it done',
  'Acceptable for the cost',
]

const POS_BODIES = [
  'Bought {qty} for our DOT-spec lane closure project on a state route. They survived the first week of nightly setup/teardown without showing wear. The {feature} makes a real difference at dusk and our flaggers report drivers slowing earlier than with our previous gear. Shipping arrived two days ahead of the estimate, which let us roll out on schedule. For a fleet purchase at this price point, this is the easiest call I\'ve had to make in months.',
  'Our utility crew runs three trucks daily and we needed something that wouldn\'t crack after the first cold snap. These have been through 4°F mornings and triple-digit afternoons in the same week with zero issues. The {feature} held up better than I expected — no fading after about six weeks of sun. I went back and bought a second batch for our other yard.',
  'Got these for a stretch of arterial roadwork where MUTCD compliance is non-negotiable. Inspector signed off without a single comment, which is more than I can say for the off-brand stuff we tried last quarter. The {feature} is genuinely useful — not a marketing bullet point. Setup takes one person about ten minutes for a full taper. Recommend.',
  'Replacing a competitor product that kept failing after 60-90 days. So far, six months in, these are still performing like day one. Crew picks them off the truck without complaints (which is the highest praise you\'ll get from a flagging crew). The {feature} is the differentiator for us. Pricing on the volume tier made it a no-brainer.',
  'Used these on a tree-trimming job over a county road and a highway shoulder closure the same week. Both sites went smoothly. Drivers actually moved over instead of squeezing through, which I credit to the {feature}. They pack flat enough that we got the whole set into one truck bed. Will reorder when we expand the fleet.',
  'Excellent quality. Heavier than I expected, which I take as a good sign — they don\'t tip over in moderate wind like our old ones did. The {feature} is well thought out. Customer support answered a sizing question within an hour and the order shipped same-day. This is how procurement should work.',
  'Bought for a parking-lot striping project for a property management client. The {feature} let us set up and break down twice a day without losing sleep over the gear. They look professional, which matters when you\'re billing a Class A property. No regrets.',
  'Our DPW uses these for emergency response — water main breaks, downed trees, that kind of work. They live in the back of the truck and get tossed around. After ~four months they still look almost new. The {feature} is what sold me originally and it\'s held up exactly as advertised.',
  'Solid product. We\'re a small paving outfit and this is our second order. The first batch is going on its second season. {feature} works as described — zero issues. The supplier paperwork was clean for our submittal package, which saved an admin round-trip with the GC.',
  'Honestly impressed. We\'ve cycled through three brands in the last two years and these are the first ones I\'d buy a third time. The {feature} is the biggest upgrade. Crew picked them out of the lineup unprompted on day one and asked if we could swap the rest of the fleet over.',
  'Picked these up after our previous gear started failing inspections. Zero issues since. The {feature} is well-engineered and the build feels substantially heavier-duty than what we were running. Volume pricing on the larger tier made the upgrade painless on the budget side too.',
]

const MID_BODIES = [
  'Generally happy with these. The {feature} works as described and they\'ve held up through normal use on our crew. One unit had a minor finishing flaw out of the box but it didn\'t affect function. Shipping was on time. For the price, hard to complain.',
  'Decent product. Does what it says. Not the most premium feeling in the category but the {feature} is solid and they\'ve survived a few months of regular use. I\'d buy them again for a backup set but might shop around for the primary fleet.',
  'Works fine. The {feature} is useful, though I wish the documentation was clearer on care/maintenance. Picked up two; one has a slight cosmetic issue that I just live with. For the price tier I think it\'s fair.',
  'These are okay. Nothing wrong with them, nothing exceptional either. The {feature} performs as described. If you need something reliable on a budget, these will work. If you need premium, look elsewhere in their catalog.',
  'Good for occasional use. Our crew uses these on lower-traffic jobs and they\'ve been fine. Heavier daily use I\'d probably step up. The {feature} is a nice touch at this price point though.',
]

const LOW_BODIES = [
  'They work but I expected a bit more given the brand reputation. The {feature} is fine but one of mine had a defect on arrival — vendor handled the replacement well, which is why I\'m not knocking another star. Mostly happy now.',
  'Mixed experience. The product itself is acceptable but the first unit had an issue with the {feature} that took a few weeks to resolve. After replacement it\'s been fine. Three stars feels right — adequate, not great.',
  'Okay product. Honestly the {feature} works but feels a little less robust than I hoped. They\'ll do for the application I bought them for but I probably wouldn\'t order again at full price.',
  'They do the job but I had a few small issues out of the box. Customer service was responsive. The {feature} works but isn\'t as polished as competing options I\'ve used. Fine for the price.',
]

const FEATURE_PHRASES = [
  'reflective banding',
  'weighted base',
  'high-vis finish',
  'reinforced collar',
  'UV-stable PVC',
  'stackable design',
  'MUTCD-compliant marking',
  'flexible body',
  'powder-coated frame',
  'rubberized base',
  'snap-fit assembly',
  'replaceable sheeting',
  'wind-rated stability',
  'drop-tested shell',
  'engineer-grade reflectivity',
  'low-profile footprint',
  'steel-reinforced spine',
  'integrated handle',
]

// Mulberry32 PRNG — deterministic, fast, no deps
function seededRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6D2B79F5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

function formatDate(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

const cache = new Map<string, ProductReview[]>()

export function getReviews(product: Pick<Product, 'slug' | 'name'>): ProductReview[] {
  const key = product.slug
  const cached = cache.get(key)
  if (cached) return cached

  const seed = hashString(key)
  const rng = seededRng(seed)

  // Count: 5–25, weighted toward 8–18 for realism
  const count = 5 + Math.floor(rng() * 21)

  const reviews: ProductReview[] = []
  const usedAuthors = new Set<string>()

  // Fixed average target between 3.8 and 4.9 — mostly 4.x, some 3.x and 5.0 outliers
  const avgTarget = 3.8 + rng() * 1.1

  for (let i = 0; i < count; i++) {
    // Compose unique persona for this product (name + location)
    let author = ''
    let location = ''
    for (let attempt = 0; attempt < 8; attempt++) {
      const fn = pick(FIRST_NAMES, rng)
      const ln = pick(LAST_INITIALS, rng)
      const loc = pick(LOCATIONS, rng)
      const candidate = `${fn} ${ln}|${loc}`
      if (!usedAuthors.has(candidate)) {
        usedAuthors.add(candidate)
        author = `${fn} ${ln}`
        location = loc
        break
      }
    }
    if (!author) {
      // Fallback (shouldn't hit with pool sizes above)
      author = `${pick(FIRST_NAMES, rng)} ${pick(LAST_INITIALS, rng)}`
      location = pick(LOCATIONS, rng)
    }

    // Rating distribution centered around avgTarget
    const r = rng()
    let rating: number
    if (r < 0.55) rating = 5
    else if (r < 0.85) rating = 4
    else if (r < 0.97) rating = 3.5
    else rating = avgTarget > 4.3 ? 4 : 3.5

    // nudge a few toward 4.5 to keep half-stars in the mix
    if (rating === 4 && rng() < 0.3) rating = 4.5

    let title: string
    let body: string
    if (rating >= 4.5) {
      title = pick(POS_TITLES, rng)
      body = pick(POS_BODIES, rng)
    } else if (rating >= 4) {
      title = rng() < 0.7 ? pick(POS_TITLES, rng) : pick(MID_TITLES, rng)
      body = rng() < 0.7 ? pick(POS_BODIES, rng) : pick(MID_BODIES, rng)
    } else {
      title = pick(MID_TITLES, rng)
      body = rng() < 0.5 ? pick(MID_BODIES, rng) : pick(LOW_BODIES, rng)
    }

    const qty = (Math.floor(rng() * 8) + 2) * 6 // 12, 18, 24, ...
    body = body.replace('{qty}', String(qty)).replace('{feature}', pick(FEATURE_PHRASES, rng))

    const daysAgo = Math.floor(rng() * 540) + 7 // last ~18 months
    const helpful = Math.floor(rng() * 38) + (rating >= 4.5 ? 4 : 0)
    const verified = rng() < 0.86

    reviews.push({
      id: `${key}-r${i + 1}`,
      author,
      location,
      rating,
      title,
      body,
      date: formatDate(daysAgo),
      verified,
      helpful,
    })
  }

  // Sort newest first by default
  reviews.sort((a, b) => (a.date < b.date ? 1 : -1))
  cache.set(key, reviews)
  return reviews
}

export function getAggregate(product: Pick<Product, 'slug' | 'name'>): ReviewAggregate {
  const reviews = getReviews(product)
  const count = reviews.length
  const sum = reviews.reduce((s, r) => s + r.rating, 0)
  const average = Math.round((sum / count) * 10) / 10
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as ReviewAggregate['distribution']
  for (const r of reviews) {
    const bucket = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5
    distribution[bucket] = (distribution[bucket] ?? 0) + 1
  }
  const recommendPct = Math.round(
    (reviews.filter((r) => r.rating >= 4).length / count) * 100,
  )
  return { count, average, distribution, recommendPct }
}
