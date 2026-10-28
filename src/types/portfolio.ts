export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  alt: string
  /** Tailwind object-position class, e.g. "object-top" */
  position?: string
}

export interface Project {
  id: string
  /** Canonical repository name */
  repo: string
  /** Name used in the UI */
  name: string
  category: string
  tagline: string
  summary: string
  /** Honest status line, derived from the project's own README */
  status: string
  features: string[]
  stack: string[]
  links: ProjectLink[]
  images: ProjectImage[]
  /** Shown next to the images when they do not depict the released default branch */
  imageNote?: string
  /** Column span in the 12-col desktop bento grid */
  span: 5 | 7 | 12
  /** Typographic cover used when the repository ships no screenshots */
  cover?: { kind: 'morse' | 'reading' | 'code'; glyph: string }
}

export interface SkillGroup {
  id: string
  title: string
  blurb: string
  items: string[]
  /** Items rendered larger / first */
  featured?: string[]
}

export interface Achievement {
  year: string
  title: string
  vi: string
  note?: string
  tag: 'Prize' | 'Research' | 'Teaching'
}

export interface ExperienceItem {
  period: string
  title: string
  org: string
  body: string
  points: string[]
}

export interface NoteItem {
  title: string
  category: string
  description: string
  href: string
  source: string
}

export type HobbyIcon = 'gamepad' | 'chess' | 'waves' | 'badminton' | 'basketball'

export interface Hobby {
  id: string
  label: string
  vi: string
  description: string
  icon: HobbyIcon
}
