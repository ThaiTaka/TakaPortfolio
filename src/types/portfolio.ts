export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  alt: string
  /** Tailwind object-position class, e.g. "object-top" */
  position?: string
  /** Use 'contain' for diagrams that must not be cropped */
  fit?: 'contain'
}

export interface Project {
  id: string
  /** Canonical repository name */
  repo: string
  /** Name used in the UI */
  name: string
  category: string
  tagline: string
  /** Contribution, stated conservatively from GitHub evidence */
  role: string
  problem: string
  solution: string
  features: string[]
  /** Honest status line, derived from the project's own README */
  status: string
  stack: string[]
  links: ProjectLink[]
  images: ProjectImage[]
  /** Shown next to the images when they do not depict the released default branch */
  imageNote?: string
  /** Typographic cover used when the repository ships no screenshots */
  cover?: { glyph: string }
}

export type TechIconKey =
  | 'python' | 'javascript' | 'typescript' | 'cpp' | 'csharp' | 'java'
  | 'react' | 'nextjs' | 'vite' | 'html5' | 'css' | 'tailwind'
  | 'nodejs' | 'express' | 'fastapi' | 'postgresql' | 'supabase' | 'prisma'
  | 'opencv' | 'scikitlearn' | 'yolo'
  | 'unity' | 'androidstudio'
  | 'git' | 'github' | 'docker' | 'claude' | 'copilot' | 'gemini' | 'colab'
  | 'jest' | 'vitest' | 'generic'

export interface SkillItem {
  name: string
  /** Omit for concepts that are not a branded technology */
  icon?: TechIconKey
}

export type GroupIconKey = 'code' | 'layout' | 'server' | 'brain' | 'smartphone' | 'wrench'

export interface SkillGroup {
  id: string
  title: string
  blurb: string
  icon: GroupIconKey
  items: SkillItem[]
}

export interface LeadLanguage {
  name: string
  icon: TechIconKey
  note: string
}

export type AchievementKind = 'prize' | 'research' | 'teaching'

export interface Achievement {
  year: string
  title: string
  /** Level or organiser, only where supplied by the owner */
  level?: string
  note?: string
  kind: AchievementKind
}

export interface TimelineItem {
  period: string
  title: string
  org: string
  body: string
  points: string[]
}

export interface Education {
  school: string
  major: string
  status: string
  points: string[]
}

export interface NoteItem {
  title: string
  category: string
  description: string
  href: string
  source: string
}

export type HobbyIcon = 'gamepad' | 'chess' | 'swimming' | 'badminton' | 'basketball'

export interface Hobby {
  id: string
  label: string
  description: string
  icon: HobbyIcon
}

export type SocialKey = 'email' | 'github' | 'facebook' | 'zalo'

export interface ContactLink {
  key: SocialKey
  label: string
  value: string
  href: string
}
