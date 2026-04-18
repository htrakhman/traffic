import type { Package } from '../types'

export const packages: Package[] = [
  {
    id: 'pkg-1',
    name: 'Shoulder Work Starter',
    description: 'Everything you need for a basic shoulder or sidewalk closure on a local road',
    useCase: 'Utility work, tree trimming, or minor excavation on low-speed roads',
    items: [
      { productId: 'prod-1', quantity: 20 }, // 28" cones
      { productId: 'prod-4', quantity: 2 },  // Road Work Ahead signs
      { productId: 'prod-6', quantity: 2 },  // Sign stands
    ],
    totalDailyRate: 90,
    savingsPercent: 10,
    popular: true,
  },
  {
    id: 'pkg-2',
    name: 'Single-Lane Closure',
    description: 'Complete setup for a standard single-lane closure on an arterial or highway',
    useCase: 'Paving, utility work, or excavation requiring one lane closure',
    items: [
      { productId: 'prod-1', quantity: 40 }, // 28" cones
      { productId: 'prod-4', quantity: 2 },  // Road Work Ahead
      { productId: 'prod-7', quantity: 1 },  // One Lane Road sign
      { productId: 'prod-6', quantity: 3 },  // Sign stands
      { productId: 'prod-11', quantity: 1 }, // Arrow board
    ],
    totalDailyRate: 307.50,
    savingsPercent: 12,
    popular: true,
  },
  {
    id: 'pkg-3',
    name: 'Night Work Package',
    description: 'Enhanced visibility setup for nighttime work zones',
    useCase: 'Any work zone operating after dark or in low-visibility conditions',
    items: [
      { productId: 'prod-3', quantity: 20 }, // Drums
      { productId: 'prod-4', quantity: 2 },  // Road Work Ahead
      { productId: 'prod-6', quantity: 2 },  // Sign stands
      { productId: 'prod-11', quantity: 1 }, // Arrow board
      { productId: 'prod-14', quantity: 20 }, // Warning lights
    ],
    totalDailyRate: 495,
    savingsPercent: 15,
    popular: false,
  },
  {
    id: 'pkg-4',
    name: 'Full Road Closure',
    description: 'Full closure setup with barricades, message board, and channelization',
    useCase: 'Complete road closure for major work, emergency repairs, or bridge work',
    items: [
      { productId: 'prod-8', quantity: 8 },  // Type III barricades
      { productId: 'prod-3', quantity: 30 }, // Drums
      { productId: 'prod-4', quantity: 4 },  // Road Work Ahead signs
      { productId: 'prod-6', quantity: 4 },  // Sign stands
      { productId: 'prod-13', quantity: 1 }, // Message board
      { productId: 'prod-14', quantity: 10 }, // Warning lights
    ],
    totalDailyRate: 832.50,
    savingsPercent: 18,
    popular: false,
  },
]
