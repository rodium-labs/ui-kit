/**
 * The pieces every chart in the kit shares: the scales that turn numbers into
 * coordinates, and the formatting that turns them back into text. Kept apart
 * from the components so a caller can build a chart the kit does not ship.
 */

export interface Point {
  /** what the x axis reads: a date, a label, a bucket */
  label: string
  value: number
}

export interface Series {
  name: string
  points: readonly Point[]
}

/** the two series colours, in fixed order. never cycled, never generated. */
export const SERIES = [
  'var(--color-series-1)',
  'var(--color-series-2)',
] as const

/** the sequential ramp, dim to bright */
export const SCALE = [
  'var(--color-scale-1)',
  'var(--color-scale-2)',
  'var(--color-scale-3)',
  'var(--color-scale-4)',
  'var(--color-scale-5)',
] as const

export interface Span {
  min: number
  max: number
}

/**
 * The range a chart plots. Bars and areas are measured from zero, because a
 * truncated baseline makes a 2% difference look like a 200% one; a line that
 * only ever moves between 98 and 99 is the case where zero hides the story, so
 * it passes `zero: false` and says so in its caption.
 */
export function span(values: readonly number[], zero = true): Span {
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  const min = zero ? Math.min(0, lo) : lo
  const max = zero ? Math.max(0, hi) : hi
  if (min === max)
    return {
      min,
      max: max + 1,
    }
  return {
    min,
    max,
  }
}

/** where a value sits in the span, 0 at the floor and 1 at the ceiling */
export function place(value: number, of: Span): number {
  return (value - of.min) / (of.max - of.min)
}

/** which step of the ramp a value falls in */
export function step(value: number, of: Span, steps = SCALE.length): number {
  const at = Math.round(place(value, of) * (steps - 1))
  return Math.max(0, Math.min(steps - 1, at))
}

/** axis ticks on round numbers, which is what a reader can hold in their head */
export function ticks(of: Span, count = 4): number[] {
  const raw = (of.max - of.min) / count
  const mag = 10 ** Math.floor(Math.log10(Math.abs(raw) || 1))
  const nice =
    [
      1,
      2,
      2.5,
      5,
      10,
    ].find(n => n * mag >= raw) ?? 10
  const stepSize = nice * mag
  const out: number[] = []
  for (let t = Math.ceil(of.min / stepSize) * stepSize; t <= of.max + 1e-9; t += stepSize) {
    out.push(Math.round(t * 1e6) / 1e6)
  }
  return out
}

/** thousands separated, and short where the axis has no room for the zeroes */
export function format(value: number, short = false): string {
  if (!short) return value.toLocaleString('en-US')
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${Math.round(value / 100_000) / 10}M`
  if (abs >= 1_000) return `${Math.round(value / 100) / 10}k`
  return String(Math.round(value * 100) / 100)
}

/** an svg path through the points, in the box the chart was given */
export function line(points: readonly Point[], of: Span, w: number, h: number): string {
  if (points.length === 0) return ''
  return points
    .map((p, i) => {
      const x = points.length === 1 ? w / 2 : (i / (points.length - 1)) * w
      const y = h - place(p.value, of) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}
