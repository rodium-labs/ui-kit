import type { ReactNode } from 'react'
import { cn } from './cn.js'

export interface ProseProps {
  children: ReactNode
  className?: string
}

// long-form text that arrives as markup rather than as components: a changelog,
// an article, whatever a cms hands over. the measure is capped here because
// that is the one thing raw html never brings with it, and a line that runs the
// width of a page is the fastest way to make prose unreadable.
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'flex max-w-[68ch] flex-col text-body text-ink-on-night-mid',
        '[&_p]:my-4 [&_p]:leading-[1.7] [&_p]:text-pretty',
        '[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-balance [&_h2]:text-ink-on-night',
        '[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[16px] [&_h3]:font-semibold [&_h3]:text-balance [&_h3]:text-ink-on-night',
        '[&_ul]:my-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:ps-5',
        '[&_ol]:my-4 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-1.5 [&_ol]:ps-5',
        '[&_li]:leading-[1.65] [&_li]:marker:text-ink-on-night-faint',
        '[&_ul>li]:list-disc',
        '[&_a]:text-ink-on-night [&_a]:underline [&_a]:decoration-night-underline [&_a]:underline-offset-[3px]',
        '[&_a:hover]:decoration-ink-on-night',
        '[&_strong]:font-semibold [&_strong]:text-ink-on-night',
        '[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-ink-on-night',
        '[&_blockquote]:my-5 [&_blockquote]:border-s [&_blockquote]:border-night-edge [&_blockquote]:ps-4 [&_blockquote]:text-ink-on-night-dim',
        '[&_hr]:my-8 [&_hr]:border-night-rule',
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        className,
      )}>
      {children}
    </div>
  )
}
