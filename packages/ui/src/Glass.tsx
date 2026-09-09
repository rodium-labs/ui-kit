import type { CSSProperties } from 'react'

export interface GlassProps {
  radius: number
  fill?: string
  sweep?: boolean
  nested?: boolean
}

const RIM_MASK = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)'

const LAYER = 'pointer-events-none absolute inset-0 z-[-1]'

// the rim is a blurred ring drawn by masking a padded box against itself. a
// nested glass skips it: an element with a backdrop filter is a backdrop root,
// so a second one inside samples its parent instead of the page.
export function Glass({ radius, fill, sweep = false, nested = false }: GlassProps) {
  const rim: CSSProperties = nested
    ? {
        borderRadius: radius,
        boxShadow: 'var(--glass-rim-inner)',
      }
    : {
        borderRadius: radius,
        padding: 'var(--glass-rim)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        WebkitMask: RIM_MASK,
        WebkitMaskComposite: 'xor',
        mask: RIM_MASK,
        maskComposite: 'exclude',
      }

  return (
    <>
      {fill ? (
        <span
          aria-hidden="true"
          className={`${LAYER} transition-[background] duration-(--motion-base) ease-rl motion-reduce:transition-none`}
          style={{
            borderRadius: radius,
            background: fill,
          }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={LAYER}
        style={rim}
      />
      <span
        aria-hidden="true"
        className={LAYER}
        style={{
          borderRadius: radius,
          backgroundImage: 'var(--glass-sheen)',
        }}
      />
      {sweep ? (
        <span
          aria-hidden="true"
          className={`${LAYER} overflow-hidden`}
          style={{
            borderRadius: radius,
          }}>
          <span className="absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-[image:var(--glass-sweep)] transition-[translate] duration-700 ease-rl group-hover:translate-x-[200%] motion-reduce:transition-none" />
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={`${LAYER} transition-[box-shadow] duration-(--motion-base) ease-rl motion-reduce:transition-none`}
        style={{
          borderRadius: radius,
          boxShadow: 'var(--glass-specular)',
        }}
      />
    </>
  )
}
