import type { IconProps } from './Icon'
import { Glyph } from './Icon'

export function ArrowUpRight(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 12 L12 4" />
      <path d="M5 4 H12 V11" />
    </Glyph>
  )
}

export function ArrowRight(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M2 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </Glyph>
  )
}

export function ChevronDown(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 6 L8 11 L13 6" />
    </Glyph>
  )
}

export function ChevronLeft(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M10 3 L5 8 L10 13" />
    </Glyph>
  )
}

export function ChevronRight(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M6 3 L11 8 L6 13" />
    </Glyph>
  )
}

export function Check(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 8.5 L6.5 12 L13 4" />
    </Glyph>
  )
}

export function Close(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 4 L12 12" />
      <path d="M12 4 L4 12" />
    </Glyph>
  )
}

export function Menu(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M2.5 4.5 H13.5" />
      <path d="M2.5 8 H13.5" />
      <path d="M2.5 11.5 H13.5" />
    </Glyph>
  )
}

export function Search(props: IconProps) {
  return (
    <Glyph
      {...props}
      strokeLinecap="round">
      <circle
        cx="7"
        cy="7"
        r="4.5"
      />
      <path d="M10.5 10.5 L14 14" />
    </Glyph>
  )
}

export function Sun(props: IconProps) {
  return (
    <Glyph
      {...props}
      strokeLinecap="round">
      <circle
        cx="8"
        cy="8"
        r="3"
      />
      <path d="M8 1 V2.5" />
      <path d="M8 13.5 V15" />
      <path d="M1 8 H2.5" />
      <path d="M13.5 8 H15" />
      <path d="M3.1 3.1 L4.2 4.2" />
      <path d="M11.8 11.8 L12.9 12.9" />
      <path d="M12.9 3.1 L11.8 4.2" />
      <path d="M4.2 11.8 L3.1 12.9" />
    </Glyph>
  )
}

export function Moon(props: IconProps) {
  return (
    <Glyph
      {...props}
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M13.5 9.5 A6 6 0 0 1 6.5 2.5 A6 6 0 1 0 13.5 9.5 Z" />
    </Glyph>
  )
}

export function Info(props: IconProps) {
  return (
    <Glyph
      {...props}
      strokeLinecap="round">
      <circle
        cx="8"
        cy="8"
        r="6.25"
      />
      <path d="M8 7.25 V11" />
      <path d="M8 4.75 V5" />
    </Glyph>
  )
}

export function Warning(props: IconProps) {
  return (
    <Glyph
      {...props}
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2 L14.5 13.5 H1.5 Z" />
      <path d="M8 6.5 V9.5" />
      <path d="M8 11.5 V11.75" />
    </Glyph>
  )
}
