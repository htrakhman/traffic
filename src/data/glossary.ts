/** Traffic and crowd control terms at /glossary. Short, quotable definitions. */
export interface Term {
  id: string
  term: string
  definition: string
  link?: { label: string; href: string }
}

export const GLOSSARY: Term[] = [
  {
    id: 'mutcd',
    term: 'MUTCD',
    definition:
      'The Manual on Uniform Traffic Control Devices, published by the Federal Highway Administration. It sets the national standards for signs, cones, barricades and other devices on public roads. States adopt it directly or with a state supplement.',
  },
  {
    id: 'temporary-traffic-control',
    term: 'Temporary traffic control (TTC)',
    definition:
      'The signs, devices and layout used to move traffic safely through or around a work zone, incident or event. Part 6 of the MUTCD covers it.',
  },
  {
    id: 'ttc-plan',
    term: 'Traffic control plan (TCP)',
    definition:
      'A drawing or written plan showing where every sign and device goes for a specific job. Many permits and public contracts require one.',
  },
  {
    id: 'channelizing-device',
    term: 'Channelizing device',
    definition:
      'Any device that guides traffic along a path: cones, tubular markers, drums, barricades, longitudinal channelizing devices and some water-filled barriers.',
    link: { label: 'Traffic cones', href: '/traffic-cones-for-sale' },
  },
  {
    id: 'taper',
    term: 'Taper',
    definition:
      'The diagonal line of devices that moves traffic out of a closed lane. For speeds of 45 mph or more its length is lane width times speed; below 45 mph it is width times speed squared divided by 60.',
    link: { label: 'Cone taper calculator', href: '/tools/cone-taper-calculator' },
  },
  {
    id: 'buffer-space',
    term: 'Buffer space',
    definition:
      'The empty stretch between the end of the taper and the work area. It gives an errant vehicle room to stop before reaching workers.',
  },
  {
    id: 'work-zone',
    term: 'Work zone',
    definition:
      'The area of a road affected by construction, maintenance or utility work, from the first warning sign to the last device.',
  },
  {
    id: 'traffic-cone',
    term: 'Traffic cone',
    definition:
      'A cone-shaped channelizing device, usually orange PVC. MUTCD calls for at least 18 inches on low-speed daytime work and 28 inches or more on higher-speed roads and at night.',
    link: { label: 'Shop traffic cones', href: '/traffic-cones-for-sale' },
  },
  {
    id: 'reflective-collar',
    term: 'Reflective collar',
    definition:
      'A band of retroreflective sheeting on a cone. For night use, 28 to 36 inch cones need a 6 inch band near the top and a 4 inch band about 2 inches below it.',
    link: { label: '28 in reflective cone', href: '/products/traffic-cone-28-inch-reflective' },
  },
  {
    id: 'retroreflective-sheeting',
    term: 'Retroreflective sheeting',
    definition:
      'Material that bounces headlight beams back toward the driver, making a device visible at night. Grades include engineer grade, high intensity and diamond grade.',
  },
  {
    id: 'channelizing-drum',
    term: 'Channelizing drum',
    definition:
      'A barrel-shaped plastic device about 36 inches tall with alternating orange and white reflective stripes, usually set in a rubber tire-ring base. Common on highway work zones.',
    link: { label: 'Channelizer drums', href: '/channelizing-drums' },
  },
  {
    id: 'delineator',
    term: 'Delineator post',
    definition:
      'A narrow upright post with reflective bands that marks an edge or lane line. Portable posts sit in rubber bases; surface-mount posts bolt or glue to pavement and flex when hit.',
    link: { label: 'Delineator posts', href: '/delineator-posts' },
  },
  {
    id: 'tubular-marker',
    term: 'Tubular marker',
    definition:
      'The MUTCD term for a delineator-style post used as a channelizing device. At least 18 inches tall, or 28 inches on higher-speed roads and at night.',
  },
  {
    id: 'type-i-barricade',
    term: 'Type I barricade',
    definition:
      'A barricade with one reflective rail, usually a folding A-frame. Used for low-speed, short-duration work and sidewalks.',
    link: { label: 'Barricades', href: '/barricades' },
  },
  {
    id: 'type-ii-barricade',
    term: 'Type II barricade',
    definition: 'A barricade with two reflective rails, used to channelize traffic around a work area on most roads.',
    link: { label: 'Barricades', href: '/barricades' },
  },
  {
    id: 'type-iii-barricade',
    term: 'Type III barricade',
    definition:
      'A barricade with three reflective rails, used to close a road or lane completely. Often carries a ROAD CLOSED sign.',
    link: { label: 'Barricades', href: '/barricades' },
  },
  {
    id: 'crowd-control-barricade',
    term: 'Crowd control barricade',
    definition:
      'A steel tube panel, typically 6.5 to 8.5 ft long and about 43 inches tall, that hooks to the next panel to form a pedestrian line. Also called a bike rack barricade or police barricade. Not designed to stop vehicles.',
    link: { label: 'Crowd control barricades', href: '/crowd-control-barricades' },
  },
  {
    id: 'bike-rack-barricade',
    term: 'Bike rack barricade',
    definition:
      'Another name for a steel crowd control barricade, from its resemblance to a bicycle rack.',
    link: { label: 'Crowd control barricades', href: '/crowd-control-barricades' },
  },
  {
    id: 'flat-feet',
    term: 'Flat feet vs bridge feet',
    definition:
      'The two common base styles for steel barricades. Flat feet sit low and are hard to trip over; bridge feet raise the frame on a crossbar and sit steadier on uneven ground.',
    link: { label: '7 ft barricade with bridge feet', href: '/products/steel-crowd-control-barricade-7-ft-bridge-feet' },
  },
  {
    id: 'hot-dip-galvanized',
    term: 'Hot-dip galvanized',
    definition:
      'Steel dipped in molten zinc after fabrication, coating every surface including welds. Lasts longer outdoors than pre-galvanized tube, which is coated before welding.',
  },
  {
    id: 'water-filled-barrier',
    term: 'Water-filled barrier',
    definition:
      'A hollow plastic barrier that ships empty and is filled with water on site for weight. Used to channel traffic and pedestrians; most are not crash rated.',
    link: { label: 'Water-filled barriers', href: '/water-filled-barriers' },
  },
  {
    id: 'jersey-barrier',
    term: 'Jersey barrier',
    definition:
      'A barrier with a wide base and sloped face, named for its development in New Jersey. Concrete versions stop vehicles; plastic water-filled versions copy the shape for channelizing.',
    link: { label: 'Plastic jersey barrier', href: '/products/plastic-jersey-barrier-42x72' },
  },
  {
    id: 'positive-protection',
    term: 'Positive protection',
    definition:
      'A crash-tested barrier that keeps vehicles out of the work area, such as concrete barrier or rated steel systems. Required on some high-speed jobs.',
    link: { label: 'Water vs concrete barriers', href: '/compare/water-filled-vs-concrete-jersey-barriers' },
  },
  {
    id: 'mash',
    term: 'MASH',
    definition:
      'The Manual for Assessing Safety Hardware, the current AASHTO crash-test standard for roadside hardware. It replaced NCHRP Report 350 for new devices.',
  },
  {
    id: 'nchrp-350',
    term: 'NCHRP 350',
    definition:
      'The older crash-test standard for roadside safety hardware, superseded by MASH. Some existing devices are still listed under it.',
  },
  {
    id: 'longitudinal-channelizing-device',
    term: 'Longitudinal channelizing device (LCD)',
    definition:
      'A barrier-style device placed end to end to form a continuous line, such as many interlocking water-filled barriers. Often used for pedestrian routes because it has no gaps.',
  },
  {
    id: 'detectable-edge',
    term: 'Detectable edging',
    definition:
      'A continuous bottom edge on a pedestrian channelizing device that a person using a cane can follow. Needed on temporary pedestrian routes.',
    link: { label: 'Sidewalk closures', href: '/uses/sidewalk-and-street-closures' },
  },
  {
    id: 'arrow-board',
    term: 'Arrow board',
    definition:
      'A panel of flashing lights, often trailer-mounted and solar powered, that shows an arrow or caution pattern to merge traffic ahead of a lane closure.',
    link: { label: 'Arrow boards', href: '/arrow-boards' },
  },
  {
    id: 'temporary-fence-panel',
    term: 'Temporary fence panel',
    definition:
      'A freestanding fence section, commonly 6 ft tall by 12 ft wide galvanized chain link, set in stands and clamped together to secure a site without posts.',
    link: { label: 'Temporary fence panels', href: '/temporary-fence-panels' },
  },
  {
    id: 'resale-certificate',
    term: 'Resale certificate',
    definition:
      'A state form, such as New Jersey Form ST-3, that lets a reseller buy goods without paying sales tax because they will resell them.',
    link: { label: 'Wholesale', href: '/wholesale' },
  },
  {
    id: 'ltl-freight',
    term: 'LTL freight',
    definition:
      'Less-than-truckload shipping: palletized freight that shares a truck with other shipments. The usual way barricade and barrier orders ship. Curbside delivery is standard.',
    link: { label: 'Shipping and delivery', href: '/shipping-and-delivery' },
  },
]
