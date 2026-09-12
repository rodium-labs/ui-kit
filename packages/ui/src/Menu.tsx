import { cn } from './cn'
import { focus } from './focus'
import { ChevronDown } from './glyphs'
import { MENU_SCRIPT } from './menuScript'

export interface MenuItem {
  label: string
  href?: string
  onSelect?: () => void
  danger?: boolean
}

export interface MenuProps {
  label: string
  items: readonly MenuItem[]
  align?: 'start' | 'end'
  className?: string
}

const ALIGN = {
  start: 'start-0',
  end: 'end-0',
}

// the same native disclosure the bar wears, at menu scale. MENU_SCRIPT closes
// it on a pick, on escape and on a tap outside; everything else is the browser.
export function Menu({ label, items, align = 'start', className }: MenuProps) {
  return (
    <details className={cn('menu relative inline-block', className)}>
      <summary
        className={cn(
          'flex min-h-9 cursor-pointer list-none items-center gap-2 border border-night-edge px-3 text-[13px] font-medium text-ink-on-night transition-colors duration-(--motion-fast) hover:border-night-edge-lit hover:bg-night-wash [&::-webkit-details-marker]:hidden motion-reduce:transition-none',
          focus,
        )}>
        {label}
        <ChevronDown
          size={12}
          className="text-ink-on-night-dim"
        />
      </summary>
      <div
        className={cn(
          'sheet absolute top-[calc(100%+4px)] z-40 min-w-[11rem] border border-night-edge bg-night p-1 shadow-[0_18px_40px_rgb(0_0_0/0.6)]',
          ALIGN[align],
        )}>
        {items.map(item =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'flex min-h-9 items-center px-3 text-[13px] transition-colors duration-(--motion-fast) hover:bg-night-wash motion-reduce:transition-none',
                item.danger ? 'text-danger' : 'text-ink-on-night-mid hover:text-ink-on-night',
                focus,
              )}>
              {item.label}
            </a>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={item.onSelect}
              className={cn(
                'flex min-h-9 w-full items-center px-3 text-start text-[13px] transition-colors duration-(--motion-fast) hover:bg-night-wash motion-reduce:transition-none',
                item.danger ? 'text-danger' : 'text-ink-on-night-mid hover:text-ink-on-night',
                focus,
              )}>
              {item.label}
            </button>
          ),
        )}
      </div>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the disclosure has to work before hydration, so this is a literal the kit owns
        dangerouslySetInnerHTML={{
          __html: MENU_SCRIPT,
        }}
      />
    </details>
  )
}
