#!/usr/bin/env python3
"""
Re-assign hero imageUrl/images[0] on public/tss-catalog.json using the same rules as
scripts/generate-tss-catalog.mjs pickHeroImage (after image fixes).

Run from repo root: python3 scripts/patch-tss-catalog-images.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "tss-catalog.json"

IMG_BY_CAT = {
    "cat-1": "/catalog/cone-28-orange-7lb.webp",
    "cat-2": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp",
    "cat-3": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/break-away-system-type-3-barricade-with-8-ft-plastic-rails-no-customization-engineer-grade-eg-single.webp",
    "cat-4": "https://www.wanco.com/wp-content/uploads/2020/03/featr-prod-arrowbd-trailer-folding-585x400.jpg",
    "cat-5": "https://vermaccom-218d5.kxcdn.com/media/product/image/image/bpcms-1210_deploye_g3_face_1000x1000_left_lane_closed_v2.png.1000x1000_q85_crop-center_upscale.png",
    "cat-6": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-solar-assist-type-b-flasher-red.webp",
    "cat-7": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/urbanite-crowd-control-barricades-white-none-no-sheeting-water-filled-barricade.webp",
    "cat-8": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/cone-bar-signs-danger-jbc-safety-cone-construction-cone-roll-up-sign.webp",
    "cat-9": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/commercial-parking-block-3ft-blue-18-galv-steel-spikes-asphalt-gravel-or-dirt-rubber-wheel-stop-parking-curb-ada-compliant.webp",
    "cat-10": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/economy-rubber-speed-hump-middle-section-18-galv-steel-spikes-asphalt-gravel-or-dirt-traffic-calming.webp",
    "cat-11": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp",
    "cat-12": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/kask-zenith-x2-helmets-white.webp",
    "cat-13": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/blue-construction-marking-paint-case-of-12-aervoe.webp",
    "cat-14": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/galv-steel-crowd-control-fence-bridge-feet.webp",
    "cat-15": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/radians-high-visibility-breakaway-by-back-safety-harness-lime.webp",
    "cat-16": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/tall-bollard-cover-5-inch-diameter-52in-blue.webp",
    "cat-17": "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/orion-15-minute-road-flares-case-of-72-without-wire-stand.webp",
}

IMG_CONE_ORANGE = IMG_BY_CAT["cat-1"]
IMG_CONE_LIME = "/catalog/cone-36-lime.png"
IMG_CONE_YELLOW = "/catalog/cone-28-orange-7lb.webp"
IMG_YODOCK_ORANGE = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-barrier-orange-without-optional-fence-water-filled-barricade.webp"
IMG_YODOCK_WHITE = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/yodock-2001mb-barrier-white-without-optional-fence-water-filled-barricade.webp"
IMG_VEST_LIME = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp"
IMG_DRUM_ORANGE = "/catalog/channelizing-drum-6in-hi-tire-base.webp"
IMG_ORION_FLARE = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/orion-15-minute-road-flares-case-of-72-without-wire-stand.webp"
IMG_TYPE_B_FLASH = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-solar-assist-type-b-flasher-red.webp"
IMG_TYPE2_BARRICADE = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-type-ii-barricade-with-steel-legs-plastic-panels-eg-reflective-sheeting.webp"
IMG_ROLL_ROAD_WORK = IMG_BY_CAT["cat-2"]
IMG_ROLL_FLAGGER = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-flagger-ahead-text-hip-roll-up-sign-mutcd.webp"
IMG_ROLL_ONE_LANE = "https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-one-lane-road-ahead-hip-roll-up-sign-mutcd.webp"


def slug_segment(supplier_url: str) -> str:
    try:
        parts = [x for x in urlparse(supplier_url).path.split("/") if x]
        if len(parts) >= 2 and parts[0] == "shop":
            return parts[1]
    except Exception:
        pass
    return ""


def pick_hero(category_id: str, category_slug: str, slug_seg: str, color_label: str | None) -> str:
    c = (color_label or "").lower()
    s = slug_seg.lower()

    if re.search(r"\borion\b|road-flare|\bflar(es)?\b", s, re.I):
        return IMG_ORION_FLARE
    if re.search(
        r"\bflasher\b|\bstrobe\b|\bbeacon\b|solar-assist|barricade-light|warning-light|led-barricade",
        s,
        re.I,
    ):
        return IMG_TYPE_B_FLASH
    if re.search(r"message-board|variable-message|PCMS|pcms|changeable-message|\bVMS\b", s, re.I):
        return IMG_BY_CAT["cat-5"]

    if re.search(r"\bdrum\b|barrel|channelizing|construction-barrel", s, re.I):
        return IMG_DRUM_ORANGE

    if re.search(r"yodock|water-filled|jersey-style|plasticade", s, re.I):
        if "white" in c:
            return IMG_YODOCK_WHITE
        return IMG_YODOCK_ORANGE

    if re.search(r"type-ii\b|type-2\b|type\s*ii\b", s, re.I):
        return IMG_TYPE2_BARRICADE

    if re.search(r"roll-up|rollup|roll\s*up", s, re.I):
        if re.search(r"flagger|w20-7", s, re.I):
            return IMG_ROLL_FLAGGER
        if re.search(r"one-lane|w20-4|lane-closed", s, re.I):
            return IMG_ROLL_ONE_LANE
        return IMG_ROLL_ROAD_WORK

    if category_slug == "cones-drums" or re.search(
        r"\bcones?\b|delineator|channelizer|looper|\btube\b|grabber|enviro-cone|slimline|traffix",
        s,
        re.I,
    ):
        if "lime" in c or "fluorescent lime" in c:
            return IMG_CONE_LIME
        if "yellow" in c:
            return IMG_CONE_YELLOW
        if "orange" in c:
            return IMG_CONE_ORANGE
        return IMG_CONE_ORANGE

    if category_slug == "safety-vests-hi-vis" or re.search(r"vests?|hi-vis|ansi-class", s, re.I):
        return IMG_VEST_LIME

    return IMG_BY_CAT.get(category_id) or IMG_BY_CAT["cat-8"]


def main() -> None:
    raw = json.loads(OUT.read_text(encoding="utf-8"))
    changed = 0
    for p in raw:
        url = p.get("supplierUrl") or ""
        slug = slug_segment(url)
        lab = p.get("colorLabel")
        if isinstance(lab, str):
            pass
        else:
            lab = None
        hero = pick_hero(p.get("categoryId", ""), p.get("categorySlug", ""), slug, lab)
        if p.get("imageUrl") != hero:
            changed += 1
        p["imageUrl"] = hero
        p["images"] = [hero]
    OUT.write_text(json.dumps(raw, separators=(",", ":")), encoding="utf-8")
    print(f"Patched {len(raw)} products ({changed} imageUrl changes) → {OUT}")


if __name__ == "__main__":
    main()
