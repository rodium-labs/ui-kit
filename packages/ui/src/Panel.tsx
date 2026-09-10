import { cn } from './cn'

export interface PanelProps {
  src: string
  alt: string
  eager?: boolean
  wide?: boolean
  className?: string
}

// 284x76 of real device output. it steps 1x -> 2x and nothing between, so the
// pixels stay square; only a column that is actually 568 wide opts in.
export function Panel({ src, alt, eager = false, wide = false, className }: PanelProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={568}
      height={152}
      loading={eager ? 'eager' : 'lazy'}
      className={cn(
        'hidden h-auto w-[284px] max-w-full border border-night-frame [image-rendering:pixelated] min-[380px]:block',
        wide && 'min-[900px]:w-[568px]',
        className,
      )}
    />
  )
}
