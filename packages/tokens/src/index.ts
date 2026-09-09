export const brand = {
  green: '#12a776',
  ink: '#3d2631',
  pink: '#ff95f8',
} as const

export const brandLit = {
  green: '#84d1b8',
  pink: '#ffbffb',
} as const

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  pill: 999,
} as const

export const motion = {
  fast: 120,
  base: 240,
  slow: 480,
  ease: 'cubic-bezier(0.2, 0, 0, 1)',
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

export type Radius = keyof typeof radius
