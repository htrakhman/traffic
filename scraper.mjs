import https from 'https';
import fs from 'fs';

const OUTPUT = '/Users/harold/Desktop/traffic/trafficsafetystore_products.csv';

// All URLs from sitemap
const ALL_URLS = [
  'https://www.trafficsafetystore.com/',
  'https://www.trafficsafetystore.com/traffic-cones',
  'https://www.trafficsafetystore.com/traffic-cones/orange-lime',
  'https://www.trafficsafetystore.com/traffic-cones/12',
  'https://www.trafficsafetystore.com/traffic-cones/18',
  'https://www.trafficsafetystore.com/traffic-cones/28',
  'https://www.trafficsafetystore.com/traffic-cones/28-inch-traffix-devices-enviro-cone',
  'https://www.trafficsafetystore.com/traffic-cones/28-slim',
  'https://www.trafficsafetystore.com/traffic-cones/36',
  'https://www.trafficsafetystore.com/traffic-cones/36-florida-dot-approved-traffic-cones',
  'https://www.trafficsafetystore.com/traffic-cones/36-inch-15-lb-traffic-cones',
  'https://www.trafficsafetystore.com/traffic-cones/36-inch-traffix-devices-enviro-cone',
  'https://www.trafficsafetystore.com/traffic-cones/cone-weights',
  'https://www.trafficsafetystore.com/traffic-cones/jbc-liteweight',
  'https://www.trafficsafetystore.com/traffic-cones/orange-economy-12',
  'https://www.trafficsafetystore.com/traffic-cones/orange-economy-18',
  'https://www.trafficsafetystore.com/traffic-cones/orange-economy-28',
  'https://www.trafficsafetystore.com/traffic-cones/solid-orange-36',
  'https://www.trafficsafetystore.com/traffic-cones/orange-economy-5',
  'https://www.trafficsafetystore.com/traffic-cones/orange-heavy-duty-6',
  'https://www.trafficsafetystore.com/traffic-cones/orange-lightweight-28',
  'https://www.trafficsafetystore.com/traffic-cones/orange-liteweight-12',
  'https://www.trafficsafetystore.com/traffic-cones/18-inch-economy-cones',
  'https://www.trafficsafetystore.com/traffic-cones/28-inch-economy-cones',
  'https://www.trafficsafetystore.com/traffic-cones/orange-liteweight-36',
  'https://www.trafficsafetystore.com/traffic-cones/colored',
  'https://www.trafficsafetystore.com/traffic-cones/12-yellow',
  'https://www.trafficsafetystore.com/traffic-cones/28-inch-black-valet-traffic-cone',
  'https://www.trafficsafetystore.com/traffic-cones/black-28',
  'https://www.trafficsafetystore.com/traffic-cones/black-36',
  'https://www.trafficsafetystore.com/traffic-cones/blue-12',
  'https://www.trafficsafetystore.com/traffic-cones/blue-18',
  'https://www.trafficsafetystore.com/traffic-cones/blue-28',
  'https://www.trafficsafetystore.com/traffic-cones/cortina-sport-cones',
  'https://www.trafficsafetystore.com/traffic-cones/green-traffic-cone-28',
  'https://www.trafficsafetystore.com/traffic-cones/light-blue-28',
  'https://www.trafficsafetystore.com/traffic-cones/lime-12',
  'https://www.trafficsafetystore.com/traffic-cones/lime-18',
  'https://www.trafficsafetystore.com/traffic-cones/lime-28',
  'https://www.trafficsafetystore.com/traffic-cones/pink-18',
  'https://www.trafficsafetystore.com/traffic-cones/pink-traffic-cone-28',
  'https://www.trafficsafetystore.com/traffic-cones/red-18',
  'https://www.trafficsafetystore.com/traffic-cones/red-28',
  'https://www.trafficsafetystore.com/traffic-cones/solid-black-28',
  'https://www.trafficsafetystore.com/traffic-cones/solid-lime-green-36',
  'https://www.trafficsafetystore.com/traffic-cones/solid-yellow-28',
  'https://www.trafficsafetystore.com/traffic-cones/white-18',
  'https://www.trafficsafetystore.com/traffic-cones/white-28',
  'https://www.trafficsafetystore.com/traffic-cones/yellow-18',
  'https://www.trafficsafetystore.com/traffic-cones/yellow-traffic-cone-28',
  'https://www.trafficsafetystore.com/traffic-cones/clip-on-signs',
  'https://www.trafficsafetystore.com/traffic-cones/arrow-up-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/blank-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/box-caution-tape',
  'https://www.trafficsafetystore.com/traffic-cones/bump-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/caution-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/caution-tape',
  'https://www.trafficsafetystore.com/traffic-cones/children-at-play-sign',
  'https://www.trafficsafetystore.com/traffic-cones/clip-on-no-smoking',
  'https://www.trafficsafetystore.com/traffic-cones/clip-on-red-no-parking',
  'https://www.trafficsafetystore.com/traffic-cones/clip-on-slow',
  'https://www.trafficsafetystore.com/traffic-cones/COS-CUSTOM',
  'https://www.trafficsafetystore.com/traffic-cones/danger-high-voltage-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/detour-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/divided-lane-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/do-not-enter-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/down-left-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/down-right-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/exit-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/flooded-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/fresh-oil-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/full-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/ground-under-repair-vertical-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/handicapped-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/hard-hat-area-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/keep-left-with-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/keep-right-with-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/lane-closed-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/left-chevron-vertical-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/left-right-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/lot-full-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/men-working-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/multi-colored-reversible-arrow-clip-on-signs',
  'https://www.trafficsafetystore.com/traffic-cones/muster-point-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-left-turn-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-parking-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-parking-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-pedestrian-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-right-turn-symbol-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-smoking-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-step-clip-on',
  'https://www.trafficsafetystore.com/traffic-cones/no-thru-traffic-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-trucks-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/no-trucks-symbol-clip-on',
  'https://www.trafficsafetystore.com/traffic-cones/open-trench-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/park-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/pedestrian-crossing-sign',
  'https://www.trafficsafetystore.com/traffic-cones/reserved-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/reversible-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/right-chevron-vertical-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/road-closed-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/sidewalk-closed-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/sidewalk-closed-left-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/sidewalk-closed-right-arrow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/signs-accessories',
  'https://www.trafficsafetystore.com/traffic-cones/slow-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/stop-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/street-closed-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/survey-crew-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/tow-away-zone-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/wet-concrete-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/wet-floor-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/wet-paint-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/wet-tar-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/workers-above-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/workers-ahead-clip-on-sign',
  'https://www.trafficsafetystore.com/traffic-cones/cone-bar',
  'https://www.trafficsafetystore.com/traffic-cones/cone-bars-4-7',
  'https://www.trafficsafetystore.com/traffic-cones/cone-bars-6-10',
  'https://www.trafficsafetystore.com/traffic-cones/cone-bar-signs',
  'https://www.trafficsafetystore.com/traffic-cones/economy-cone-bars-4-7',
  'https://www.trafficsafetystore.com/traffic-cones/economy-cone-bars-6-to-10',
  'https://www.trafficsafetystore.com/traffic-cones/collapsible-traffic-cones',
  'https://www.trafficsafetystore.com/traffic-cones/collapsible-28',
  'https://www.trafficsafetystore.com/traffic-cones/collapsible-28-hd',
  'https://www.trafficsafetystore.com/traffic-cones/cortina-traffic-cones',
  'https://www.trafficsafetystore.com/traffic-cones/36-inch-cortina-heavy-duty-traffic-cone',
  'https://www.trafficsafetystore.com/traffic-cones/traffic-cone-cart',
  'https://www.trafficsafetystore.com/traffic-cones/heavy-duty-cone-cart',
  'https://www.trafficsafetystore.com/traffic-cones/standard-duty-cone-cart',
  'https://www.trafficsafetystore.com/traffic-cones/grabber-cones',
  'https://www.trafficsafetystore.com/traffic-cones/grabber-28',
  'https://www.trafficsafetystore.com/traffic-cones/grabber-42',
  'https://www.trafficsafetystore.com/traffic-cones/boxes-OSHA-perimeter-marking-flag',
  'https://www.trafficsafetystore.com/traffic-cones/perimeter-flags',
  'https://www.trafficsafetystore.com/parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-commercial',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-commercial-3',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-commercial-4',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-commercial-6',
  'https://www.trafficsafetystore.com/parking-blocks/clearline-rubber',
  'https://www.trafficsafetystore.com/parking-blocks/clearline-rubber-6',
  'https://www.trafficsafetystore.com/parking-blocks/clearline-rubber-4',
  'https://www.trafficsafetystore.com/parking-blocks/plasticade-rubber-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/6-foot-plasticade-rubber-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/guma-6-foot-rubber-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/guma-rubber-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/low-profile-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/industrial-plastic',
  'https://www.trafficsafetystore.com/parking-blocks/low-profile-rubber-parking-blocks',
  'https://www.trafficsafetystore.com/parking-blocks/low-profile-rubber-6',
  'https://www.trafficsafetystore.com/parking-blocks/traffic-safety-store-rubber',
  'https://www.trafficsafetystore.com/parking-blocks/recycled-rubber-6',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-industrial',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-4',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-6',
  'https://www.trafficsafetystore.com/parking-blocks/hammer-drill-bits',
  'https://www.trafficsafetystore.com/parking-blocks/truck-stop',
  'https://www.trafficsafetystore.com/parking-blocks/truck-curb-stop',
  'https://www.trafficsafetystore.com/parking-blocks/notrax-recycled-rubber',
  'https://www.trafficsafetystore.com/parking-blocks/rubber-4',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-economy',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-economy-6',
  'https://www.trafficsafetystore.com/parking-blocks/plastic-electric-vehicle',
  'https://www.trafficsafetystore.com/parking-blocks/green-6',
  'https://www.trafficsafetystore.com/speed-bumps-humps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-speed-bump',
  'https://www.trafficsafetystore.com/speed-bumps-humps/6-foot-plasticade-recycled-rubber-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/6-inch-rounded-end-cap-for-plasticade-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/clearline-rubber-6',
  'https://www.trafficsafetystore.com/speed-bumps-humps/clearline-rubber-6-heavy-duty',
  'https://www.trafficsafetystore.com/speed-bumps-humps/guma-recycled-rubber-reflective-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rounded-end-cap',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rounded-end-caps-guma-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/caution-speed-bump-sign',
  'https://www.trafficsafetystore.com/speed-bumps-humps/sign-mounting-hardware',
  'https://www.trafficsafetystore.com/speed-bumps-humps/economy-rubber',
  'https://www.trafficsafetystore.com/speed-bumps-humps/nonreflective-4',
  'https://www.trafficsafetystore.com/speed-bumps-humps/nonreflective-6',
  'https://www.trafficsafetystore.com/speed-bumps-humps/nonreflective-endcap',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-speed-bump-end-caps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-speed-bumps-6',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-speed-bump',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-10',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-12',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-4',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-6',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-8',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plastic-speed-bump-end-caps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-speed-hump',
  'https://www.trafficsafetystore.com/speed-bumps-humps/caution-speed-hump-sign',
  'https://www.trafficsafetystore.com/speed-bumps-humps/clearline-rubber-speed-hump-end-caps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/clearline-rubber-speed-humps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/economy-rubber-end-cap-kit',
  'https://www.trafficsafetystore.com/speed-bumps-humps/econ-rubber-middle-section',
  'https://www.trafficsafetystore.com/speed-bumps-humps/mini-rubber-end-cap-kit',
  'https://www.trafficsafetystore.com/speed-bumps-humps/mini-rubber-middle-section',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plasticade-rubber-speed-hump-middle-sections',
  'https://www.trafficsafetystore.com/speed-bumps-humps/plasticade-standard-rubber-speed-hump-end-cap-kits',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-end-cap-kit',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rubber-middle-section',
  'https://www.trafficsafetystore.com/speed-bumps-humps/alley-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/clearline-oversized-alley-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/rounded-alley-bump-end-cap',
  'https://www.trafficsafetystore.com/speed-bumps-humps/portable-speed-bumps',
  'https://www.trafficsafetystore.com/speed-bumps-humps/yellow-reflective-portable',
  'https://www.trafficsafetystore.com/delineator-tubes',
  'https://www.trafficsafetystore.com/delineator-tubes/looper-tubes',
  'https://www.trafficsafetystore.com/delineator-tubes/looper-tube-42',
  'https://www.trafficsafetystore.com/delineator-tubes/cortina-ezgrab',
  'https://www.trafficsafetystore.com/delineator-tubes/45in-ez-grab-delineator-tubes',
  'https://www.trafficsafetystore.com/delineator-tubes/arch-top-tubes',
  'https://www.trafficsafetystore.com/delineator-tubes/arch-top-delineator-tubes',
  'https://www.trafficsafetystore.com/delineator-tubes/arrowtop-tube',
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          fetchPage(redirectUrl.startsWith('http') ? redirectUrl : new URL(redirectUrl, url).href)
            .then(resolve).catch(reject);
          return;
        }
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, status: res.statusCode, url }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractData(html, url) {
  // Try JSON-LD first
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

  let name = '';
  let sku = '';
  let price = '';
  let description = '';
  let brand = '';

  for (const match of jsonLdMatches) {
    try {
      const data = JSON.parse(match[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item['@type'] === 'Product') {
          name = item.name || '';
          sku = item.sku || item.mpn || '';
          description = item.description || '';
          brand = item.brand?.name || '';
          if (item.offers) {
            const offers = Array.isArray(item.offers) ? item.offers : [item.offers];
            price = offers[0]?.price || offers[0]?.lowPrice || '';
          }
        }
      }
    } catch (e) {}
  }

  // Fallback: meta tags
  if (!name) {
    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
    if (ogTitle) name = ogTitle[1];
  }
  if (!name) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) name = titleMatch[1].replace(/ \| Traffic Safety Store.*$/i, '').trim();
  }

  // SKU patterns in HTML
  if (!sku) {
    const skuPatterns = [
      /(?:SKU|Item #|Part #|Item No\.?|Model)[:\s#]+([A-Z0-9][-A-Z0-9_]{2,})/i,
      /"sku"\s*:\s*"([^"]+)"/i,
      /data-sku="([^"]+)"/i,
    ];
    for (const pat of skuPatterns) {
      const m = html.match(pat);
      if (m) { sku = m[1]; break; }
    }
  }

  // Price fallback
  if (!price) {
    const priceMatch = html.match(/\$\s*([\d,]+\.?\d*)/);
    if (priceMatch) price = priceMatch[1].replace(',', '');
  }

  // Description fallback from meta
  if (!description) {
    const metaDesc = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
    if (metaDesc) description = metaDesc[1];
  }

  // Determine category from URL
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/').filter(Boolean);
  const category = parts.length > 0 ? parts[0].replace(/-/g, ' ') : '';

  return { name, sku, price, description, brand, category };
}

function csvField(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).replace(/\r?\n/g, ' ').trim();
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const rows = [];
  const header = ['sku', 'name', 'url', 'category', 'price', 'description', 'brand'];

  console.log(`Processing ${ALL_URLS.length} URLs...`);

  for (let i = 0; i < ALL_URLS.length; i++) {
    const url = ALL_URLS[i];
    console.log(`[${i+1}/${ALL_URLS.length}] ${url}`);

    try {
      const { html, status } = await fetchPage(url);

      if (status !== 200) {
        console.log(`  -> HTTP ${status}, skipping`);
        continue;
      }

      const data = extractData(html, url);

      // Only include if we got a name (indicates it's a real product/category page)
      if (data.name) {
        rows.push({
          sku: data.sku,
          name: data.name,
          url,
          category: data.category,
          price: data.price,
          description: data.description,
          brand: data.brand,
        });
        console.log(`  -> "${data.name}" SKU=${data.sku} price=${data.price}`);
      } else {
        console.log(`  -> No name found`);
      }
    } catch (e) {
      console.log(`  -> Error: ${e.message}`);
    }

    // Polite delay
    await sleep(500);
  }

  // Write CSV
  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push(header.map(h => csvField(row[h])).join(','));
  }

  fs.writeFileSync(OUTPUT, lines.join('\n') + '\n', 'utf8');
  console.log(`\nDone! Wrote ${rows.length} rows to ${OUTPUT}`);
}

main().catch(console.error);
