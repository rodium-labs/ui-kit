import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn.js'
import { type CodeLanguage, highlight, type TokenType } from './highlight.js'

export type CodeProps = HTMLAttributes<HTMLElement>

export function Code({ className, children, ...rest }: CodeProps) {
  return (
    <code
      {...rest}
      className={cn('border border-night-frame px-1.5 py-0.5 font-mono text-[13px] text-ink-on-night', className)}>
      {children}
    </code>
  )
}

const TOKEN: Record<TokenType, string | undefined> = {
  comment: 'text-code-comment italic',
  string: 'text-code-value',
  constant: 'text-code-value',
  keyword: 'text-code-keyword',
  entity: 'text-code-name',
  tag: 'text-code-name',
  plain: undefined,
}

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLPreElement>, 'children'> {
  caption?: string
  language?: CodeLanguage
  children: string
}

// the block wraps rather than scrolls. a scrolling block hides the end of a
// long line and has to become a focusable region to give it back; wrapping
// costs a little beauty and hides nothing at any width.
export function CodeBlock({ caption, language, className, children, ...rest }: CodeBlockProps) {
  const tokens = highlight(children, language)

  return (
    <figure className="flex flex-col">
      {caption ? (
        <figcaption className="flex items-center justify-between gap-4 border border-b-0 border-night-frame px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-ink-on-night-dim uppercase">
          {caption}
          {language ? <span aria-hidden="true">{language}</span> : null}
        </figcaption>
      ) : null}
      <pre
        {...rest}
        className={cn(
          'border border-night-frame p-4 font-mono text-[13px] leading-[1.7] whitespace-pre-wrap text-code-plain',
          '[overflow-wrap:anywhere]',
          className,
        )}>
        <code>
          {tokens.map(token => {
            const tint = TOKEN[token.type]
            return tint ? (
              <span
                key={token.at}
                className={tint}>
                {token.value}
              </span>
            ) : (
              (token.value as ReactNode)
            )
          })}
        </code>
      </pre>
    </figure>
  )
}
