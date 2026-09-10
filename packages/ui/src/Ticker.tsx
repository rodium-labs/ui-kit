import { cn } from './cn'

export interface TickerProps {
  words: readonly string[]
  className?: string
}

const COPIES = [
  0,
  1,
  2,
]

// where the column holds the words this is a plain list; where it does not, a
// copy of it slides past a box its own width. the bed is the copy that sits in
// the flow and gives the box that width, showing nothing while the track rides
// over it.
export function Ticker({ words, className }: TickerProps) {
  return (
    <div className={cn('strip', className)}>
      <div className="ticker">
        <ul
          aria-hidden="true"
          className="ticker-set ticker-bed">
          {words.map(word => (
            <li
              key={word}
              className="ticker-word">
              {word}
              <span
                aria-hidden="true"
                className="text-ink-on-night-faint">
                /
              </span>
            </li>
          ))}
        </ul>
        <div className="ticker-track">
          {COPIES.map(copy => (
            <ul
              key={copy}
              className="ticker-set"
              {...(copy
                ? {
                    'aria-hidden': true,
                  }
                : {})}>
              {words.map(word => (
                <li
                  key={word}
                  className="ticker-word">
                  {word}
                  <span
                    aria-hidden="true"
                    className="text-ink-on-night-faint">
                    /
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
