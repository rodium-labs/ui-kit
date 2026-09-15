import type { ReactNode } from 'react'
import { cn } from './cn.js'
import { focus } from './focus.js'
import { ChevronRight } from './glyphs.js'

export interface TreeNode {
  label: string
  /** a branch has children; a leaf does not */
  children?: readonly TreeNode[]
  /** makes a leaf a link */
  href?: string
  icon?: ReactNode
  /** branches start closed unless this says otherwise */
  open?: boolean
}

export interface TreeProps {
  label: string
  nodes: readonly TreeNode[]
  className?: string
}

function Branch({ node, depth }: { node: TreeNode; depth: number }) {
  const pad = {
    paddingInlineStart: `${depth * 14 + 8}px`,
  }
  const row =
    'flex min-h-8 w-full items-center gap-1.5 pe-2 text-start text-[13px] transition-colors duration-(--motion-fast) motion-reduce:transition-none'

  if (!node.children) {
    const body = (
      <>
        {node.icon ? (
          <span
            aria-hidden="true"
            className="flex w-3.5 shrink-0 justify-center opacity-70">
            {node.icon}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="w-3.5 shrink-0"
          />
        )}
        <span className="min-w-0 truncate">{node.label}</span>
      </>
    )
    return (
      <li>
        {node.href ? (
          <a
            href={node.href}
            style={pad}
            className={cn(row, 'text-ink-on-night-mid hover:bg-night-wash hover:text-ink-on-night', focus)}>
            {body}
          </a>
        ) : (
          <span
            style={pad}
            className={cn(row, 'text-ink-on-night-mid')}>
            {body}
          </span>
        )}
      </li>
    )
  }

  return (
    <li>
      {/* the browser's disclosure: it owns the open state, the keyboard and the
          announcement, and it keeps working before any script arrives */}
      <details
        open={node.open}
        className="fold group/branch">
        <summary
          style={pad}
          className={cn(
            row,
            'cursor-pointer list-none text-ink-on-night hover:bg-night-wash [&::-webkit-details-marker]:hidden',
            focus,
          )}>
          <ChevronRight
            size={11}
            className="shrink-0 text-ink-on-night-dim transition-transform duration-(--motion-base) ease-through group-open/branch:rotate-90 motion-reduce:transition-none"
          />
          <span className="min-w-0 truncate">{node.label}</span>
        </summary>
        <ul>
          {node.children.map(child => (
            <Branch
              key={child.label}
              node={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      </details>
    </li>
  )
}

// nested disclosure for a hierarchy: a file tree, a nav, a taxonomy. built out
// of details elements rather than a rebuilt widget, so every branch opens
// without a script and the whole thing survives before hydration.
//
// deliberately not role="tree". that pattern owes roving tabindex, aria-level,
// aria-setsize and aria-posinset on every node, and a details element already
// carries its own semantics that would be fighting them. a nested list of
// disclosures is what this is, and it announces correctly as one.
export function Tree({ label, nodes, className }: TreeProps) {
  return (
    <ul
      aria-label={label}
      className={cn('flex flex-col', className)}>
      {nodes.map(node => (
        <Branch
          key={node.label}
          node={node}
          depth={0}
        />
      ))}
    </ul>
  )
}
