export const profile = {
  brand: 'Thai Taka',
  fullName: 'Lê Thành Thái',
  university: 'Da Lat University',
  universityShort: 'DLU',
  field: 'Information Technology',
  email: 'lethanhthai0805@gmail.com',
  siteUrl: 'https://taka-portfolio-kq32.vercel.app',
  logo: '/ThaiTaka.jpg',
  logoSmall: '/logo-160.png',
  eyebrow: 'Software Engineer • AI Explorer • STEM Educator',
  roles: [
    'Software Developer',
    'AI & ML Explorer',
    'Full-stack Engineer',
    'Game Developer',
    'STEM Educator',
    'Research Enthusiast',
  ],
  heroCopy:
    "I'm Lê Thành Thái, also known as Thai Taka — an Information Technology student at Da Lat University, building intelligent software, exploring AI, creating interactive experiences, and making technology more approachable through STEM education.",
  // Hero video (HLS). A dark fallback is shown whenever it cannot play.
  videoSrc: 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ThaiTaka' },
    { label: 'Facebook', href: 'https://www.facebook.com/thai.taka.2024/' },
    { label: 'Zalo', href: 'https://zalo.me/0899034349' },
  ],
  // Set to a string such as 'Available for projects' only when that is true.
  availability: 'Open to meaningful collaborations.',
} as const

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']

/** Every top-level section in page order; used to resolve the active navbar state. */
export const sectionIds = ['home', 'work', 'about', 'skills', 'journey', 'awards', 'notes', 'explorations', 'stats', 'contact'] as const
