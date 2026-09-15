import { FileDrop, Tag } from '@rodium-labs/ui'
import { useState } from 'react'
import type { DocPage } from '../docs/types'

function Live() {
  const [names, setNames] = useState<string[]>([])
  return (
    <div className="flex max-w-[30rem] flex-col gap-3">
      <FileDrop
        label="Drop a build artefact"
        hint="Or press to choose one. Up to 50 MB."
        multiple
        onFiles={files => setNames(files.map(f => f.name))}
      />
      {names.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {names.map(n => (
            <li key={n}>
              <Tag muted>{n}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export const page: DocPage = {
  slug: 'file-drop',
  title: 'File drop',
  nav: 'File drop',
  summary: 'A real file input wearing a drop target.',
  examples: [
    {
      title: 'Drag or press',
      code: `<FileDrop label="Drop a build artefact" multiple onFiles={handle} />`,
      render: () => <Live />,
    },
  ],
  props: [
    [
      'onFiles',
      '(files: File[]) => void',
      'Called for a drop and for a pick alike.',
    ],
    [
      'accept',
      'string',
      'Passed straight to the input.',
    ],
    [
      'multiple',
      'boolean',
      'A drop of several is trimmed to one without it.',
    ],
  ],
  notes: (
    <p>
      Dragging is the shortcut; the input is the path. Click, tab and enter all reach it, which dropping alone never
      does — a drop target with no input behind it is unusable without a pointer.
    </p>
  ),
}
