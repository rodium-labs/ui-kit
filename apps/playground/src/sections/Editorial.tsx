import { Eyebrow, Facts, GradientText, Rule } from '@rodium/ui'
import { Demo, Section } from '../ui/Showcase'

export function Editorial() {
  return (
    <Section
      id="editorial"
      title="Editorial"
      blurb="The parts that carry copy rather than input: the label above a heading, the hairline between things, the table of numbers that makes the argument, and the one piece of colour the kit allows itself in text.">
      <Demo label="Type scale">
        <div className="flex flex-col gap-4">
          <p className="text-display-xl font-book tracking-tight text-ink-on-night">Display XL</p>
          <p className="text-display-l font-book text-ink-on-night">Display L</p>
          <p className="text-display-m font-book text-ink-on-night">Display M</p>
          <p className="text-display-s font-book text-ink-on-night">Display S</p>
          <p className="text-lede text-ink-on-night-mid">
            A lede sits under a heading and carries the one sentence that explains it.
          </p>
          <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink-on-night-mid">
            Body copy runs at fourteen pixels with a relaxed leading and a measure that stops around sixty-two
            characters, because a line longer than that is harder to come back to.
          </p>
        </div>
      </Demo>

      <Demo label="Eyebrow, rule, facts">
        <div className="flex flex-col gap-4">
          <Eyebrow>Rodium Labs</Eyebrow>
          <p className="text-display-s font-book text-ink-on-night">One workshop, one surface</p>
          <Rule />
          <Facts
            rows={[
              [
                'Components',
                '18',
              ],
              [
                'Dependencies',
                '2',
              ],
              [
                'Bundled CSS',
                'Tailwind v4',
              ],
              [
                'Licence',
                'Private',
              ],
            ]}
          />
        </div>
      </Demo>

      <Demo
        label="Gradient text"
        note="one background-position animation, no layout cost">
        <div className="flex flex-col gap-4">
          <p className="text-display-m font-book">
            <GradientText>Built in the open</GradientText>
          </p>
          <p className="text-display-m font-book">
            <GradientText
              colors={[
                '#ff95f8',
                '#12a776',
                '#ff95f8',
              ]}
              speed={5}>
              Warm to cool
            </GradientText>
          </p>
          <p className="text-display-m font-book">
            <GradientText animate={false}>Still, when motion is off</GradientText>
          </p>
        </div>
      </Demo>
    </Section>
  )
}
