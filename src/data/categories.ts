import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'cat-cones',
    name: 'Traffic Cones',
    slug: 'traffic-cones',
    description: 'Orange traffic cones for work zones, parking lots, and site safety',
    seoDescription:
      'Buy 28" and 36" orange traffic cones with reflective options. MUTCD-compliant cones for contractors and property managers.',
    icon: '',
    imageUrl: '/catalog/cone-28-orange-7lb.webp',
  },
  {
    id: 'cat-barricades',
    name: 'Barricades',
    slug: 'barricades',
    description: 'Type II barricades and Multi-Gate expandable barriers for closures and work zones',
    seoDescription:
      'Portable Type II traffic barricades and Multi-Gate expandable barricades for road work and restricted areas.',
    icon: '',
    imageUrl:
      'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/i/economy-type-ii-barricade-with-steel-legs-plastic-panels-eg-reflective-sheeting.webp',
  },
  {
    id: 'cat-drums',
    name: 'Traffic Drums',
    slug: 'traffic-drums',
    description: 'Channelizing drums with weighted rubber bases',
    seoDescription: 'Reflective traffic drums with rubber tire ring bases for lane control.',
    icon: '',
    imageUrl: '/catalog/channelizing-drum-6in-hi-tire-base.webp',
  },
  {
    id: 'cat-signs',
    name: 'Signs and Stands',
    slug: 'signs-and-stands',
    description: 'Roll-up construction signs and heavy-duty stands',
    seoDescription: '48" roll-up construction signs and quick-latch sign stands for work zones.',
    icon: '',
    imageUrl:
      'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_2.0,f_auto,q_auto:best,w_600/images/products/thumb/heavy-duty-roll-up-sign-road-work-ahead-hip-roll-up-sign-mutcd.webp',
  },
  {
    id: 'cat-vests',
    name: 'Safety Vests',
    slug: 'safety-vests',
    description: 'Class 2 hi-vis safety vests for crews',
    seoDescription: 'Affordable ANSI Class 2 high visibility safety vests for road and construction crews.',
    icon: '',
    imageUrl:
      'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/b_rgb:FFFFFF,c_pad,c_scale/i/contrasting-mesh-class-2-vest-orange-2xl-kishigo-hi-vis.webp',
  },
  {
    id: 'cat-chocks',
    name: 'Wheel Chocks',
    slug: 'wheel-chocks',
    description: 'Heavy duty wheel chocks for trucks and trailers',
    seoDescription: '24" heavy duty wheel chocks for trucks, trailers, and loading docks.',
    icon: '',
    imageUrl: '/catalog/cone-28-orange-7lb.webp',
  },
  {
    id: 'cat-speed',
    name: 'Speed Control',
    slug: 'speed-control',
    description: 'Rubber speed bumps for parking and private roads',
    seoDescription: '9.5 foot rubber speed bumps for parking lots, garages, and property traffic calming.',
    icon: '',
    imageUrl:
      'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/economy-rubber-speed-hump-middle-section-18-galv-steel-spikes-asphalt-gravel-or-dirt-traffic-calming.webp',
  },
  {
    id: 'cat-parking',
    name: 'Parking Lot Safety',
    slug: 'parking-lot-safety',
    description: 'Rubber parking blocks and wheel stops',
    seoDescription: 'Commercial rubber parking blocks for lots, garages, and warehouse parking areas.',
    icon: '',
    imageUrl:
      'https://media.trafficsafetystore.com/image/upload/c_limit,dpr_3.0,f_auto,q_auto:best,w_600/i/commercial-parking-block-3ft-blue-18-galv-steel-spikes-asphalt-gravel-or-dirt-rubber-wheel-stop-parking-curb-ada-compliant.webp',
  },
]

/** Legacy category slugs → new slug redirects */
export const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  'cones-drums': 'traffic-cones',
  'barricades-barriers': 'barricades',
  'signs-sign-stands': 'signs-and-stands',
  'safety-vests-hi-vis': 'safety-vests',
  'bollards-chocks-corners': 'wheel-chocks',
  'speed-bumps-humps': 'speed-control',
  'parking-blocks': 'parking-lot-safety',
}

export const LEGACY_PRODUCT_REDIRECTS: Record<string, string> = {
  '28-inch-traffic-cone': '28-inch-orange-traffic-cone',
  '36-inch-traffic-cone': '36-inch-orange-traffic-cone-reflective-collars',
  'channelizing-drum': 'traffic-drum-with-rubber-base',
  'type-ii-barricade': 'type-ii-traffic-barricade',
  'telescoping-sign-stand': 'roll-up-sign-stand-quick-latch',
  'ansi-class-2-mesh-vest-orange': 'class-2-hi-vis-safety-vest',
  'portable-rubber-speed-bump-6ft': '9-5-foot-rubber-speed-bump',
  'commercial-rubber-parking-block-6ft-blue': 'rubber-parking-block',
  'urethane-wheel-chock-truck-trailer': '24-inch-heavy-duty-wheel-chocks',
  'multi-gate-expandable-barricade': 'multi-gate-expandable-barricade',
  'multigate-expandable-barricade': 'multi-gate-expandable-barricade',
}
