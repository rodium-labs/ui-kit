import { Tree } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'tree',
  title: 'Tree',
  summary: 'Nested disclosure for a hierarchy: a file tree, a taxonomy, a nav that goes deep.',
  examples: [
    {
      title: 'A repository',
      note: 'every branch opens without a script',
      code: `<Tree label="Files" nodes={[
  { label: 'packages', open: true, children: [...] },
]} />`,
      render: () => (
        <Tree
          label="Files"
          className="max-w-[20rem] border border-night-frame py-1"
          nodes={[
            {
              label: 'packages',
              open: true,
              children: [
                {
                  label: 'ui',
                  open: true,
                  children: [
                    {
                      label: 'src',
                    },
                    {
                      label: 'package.json',
                    },
                  ],
                },
                {
                  label: 'tokens',
                  children: [
                    {
                      label: 'src',
                    },
                  ],
                },
              ],
            },
            {
              label: 'apps',
              children: [
                {
                  label: 'playground',
                },
              ],
            },
            {
              label: 'README.md',
            },
          ]}
        />
      ),
    },
  ],
  props: [
    [
      'nodes',
      'TreeNode[]',
      'label, and children for a branch. A node without children is a leaf.',
    ],
    [
      'label',
      'string',
      'Names the tree.',
    ],
    [
      'TreeNode.href',
      'string',
      'Makes a leaf a link.',
    ],
    [
      'TreeNode.open',
      'boolean',
      'Branches start closed unless this says otherwise.',
    ],
  ],
  notes: (
    <p>
      Built out of <code className="text-ink-on-night">details</code> elements rather than a rebuilt widget, so the open
      state, the keyboard and the announcement all come from the browser, and the whole thing works before hydration.
    </p>
  ),
}
