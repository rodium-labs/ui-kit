import { AspectRatio } from '@rodium-labs/ui'
import type { DocPage } from '../docs/types'

export const page: DocPage = {
  slug: 'aspect-ratio',
  title: 'Aspect ratio',
  nav: 'Aspect ratio',
  summary: 'Holds the box before the media arrives, so nothing below it jumps when the image decodes.',
  examples: [
    {
      title: 'Three ratios',
      code: `<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="" />
</AspectRatio>`,
      render: () => (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [
              '16 / 9',
              16 / 9,
            ],
            [
              '4 / 3',
              4 / 3,
            ],
            [
              '1 / 1',
              1,
            ],
          ].map(([label, ratio]) => (
            <div
              key={String(label)}
              className="flex flex-col gap-2">
              <AspectRatio
                ratio={ratio as number}
                className="border border-night-frame bg-night-wash">
                <div className="flex size-full items-center justify-center text-[12px] text-ink-on-night-dim">
                  {label}
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      ),
    },
  ],
  props: [
    [
      'ratio',
      'number',
      'Width over height. Defaults to 16 / 9.',
    ],
  ],
  notes: (
    <p>
      This is the CSS property with a name on it. It exists so a layout reserves the space, which is the difference
      between a page that settles and one that shifts under the reader.
    </p>
  ),
}
