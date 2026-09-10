export const brand = {
  green: '#12a776',
  ink: '#3d2631',
  pink: '#ff95f8',
} as const

export const RULE_WIDTH_PX = 1

/* 284x76 of real device output, at 1x and 2x */
export const PANEL_WIDTH_PX = 284
export const PANEL_HEIGHT_PX = 76

export const motion = {
  fast: 120,
  base: 240,
  slow: 480,
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const
