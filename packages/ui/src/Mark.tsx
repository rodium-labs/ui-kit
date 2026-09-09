'use client'

import { type SVGProps, useId } from 'react'

const STROKE = 4
const CAP = 24
const BOWL = (CAP + STROKE) / 2

const BOX = 40
const R_WIDTH = 18
const R_X = STROKE + (BOX - STROKE - R_WIDTH) / 2
const R_Y = (BOX - STROKE - CAP) / 2

const HALF = STROKE / 2
const CORNER = `M0 0 H${STROKE} V${BOX - STROKE} H${BOX} V${BOX} H0 Z`

export interface MarkProps extends SVGProps<SVGSVGElement> {
  size?: number
  title?: string
}

export function Mark({ size = 16, title, ...rest }: MarkProps) {
  const gradient = useId()

  return (
    <svg
      viewBox={`0 0 ${BOX} ${BOX}`}
      width={size}
      height={size}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}>
      {title ? <title>{title}</title> : null}

      <defs>
        <linearGradient
          id={gradient}
          gradientUnits="userSpaceOnUse"
          x1={HALF}
          y1={0}
          x2={BOX}
          y2={BOX - HALF}>
          <stop
            offset="0"
            stopColor="var(--color-accent, currentColor)"
          />
          <stop
            offset="1"
            stopColor="var(--color-accent-warm, currentColor)"
          />
        </linearGradient>
      </defs>

      <path
        d={CORNER}
        fill={`url(#${gradient})`}
      />

      <g transform={`translate(${R_X} ${R_Y})`}>
        <rect
          x={0}
          y={0}
          width={STROKE}
          height={CAP}
        />
        <rect
          x={STROKE}
          y={0}
          width={14}
          height={STROKE}
        />
        <rect
          x={14}
          y={0}
          width={STROKE}
          height={BOWL}
        />
        <rect
          x={STROKE}
          y={BOWL - STROKE}
          width={14}
          height={STROKE}
        />
        <polygon points={`10,${BOWL} 14,${BOWL} 18,${CAP} 14,${CAP}`} />
      </g>
    </svg>
  )
}
