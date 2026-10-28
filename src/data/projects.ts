import type { Project } from '../types/portfolio'

const gh = (repo: string) => `https://github.com/ThaiTaka/${repo}`

/**
 * Every field below was taken from the project's own README / docs on GitHub
 * (checked October 2026). None of these repositories declares a live demo URL,
 * so no "Live" links are shown.
 */
export const projects: Project[] = [
  {
    id: 'readmateai',
    repo: 'ReadMateAI',
    name: 'ReadMateAI',
    category: 'Education · Vietnamese literacy',
    tagline: 'Mỗi em một nhịp đọc – Mỗi ngày một tiến bộ.',
    summary:
      'A platform that helps first-grade students practise Vietnamese reading — letters, sounds, rhymes, spelling and fluent reading — with guided practice at home and independent work in class.',
    status:
      'Default branch (main) is at Phase 4 per its README: a Vietnamese analysis library, a tested knowledge base, a six-type exercise engine and a /demo playground using sample data. A larger redesign with a server-side scoring engine on a local Supabase is in an open, unmerged pull request. No audio, accounts or AI features are released, and all content awaits teacher review.',
    features: [
      'Rule-based exercise generation with answer-leak checks',
      'Six exercise types with support levels H3 → H0',
      'Paired home exercise / in-class worksheet design',
      'Vietnamese text-analysis library and curated knowledge base',
    ],
    stack: ['Next.js', 'TypeScript', 'Vitest', 'Playwright', 'ESLint'],
    links: [{ label: 'GitHub', href: gh('ReadMateAI') }],
    images: [
      { src: '/projects/readmate-home.jpg', alt: 'ReadMateAI home page (preview build) with the explorer-and-owl adventure illustration and a Vietnamese headline' },
      { src: '/projects/readmate-exercise.jpg', alt: 'ReadMateAI exercise screen: choose the rhyme for the word "vàng", with support level H2', position: 'object-top' },
    ],
    imageNote: 'Screenshots are from the in-progress redesign branch (open pull request, not merged into main).',
    span: 7,
  },
  {
    id: 'agrixai-farmer',
    repo: 'AgriXAI-Farmer',
    name: 'AgriXAI-Farmer',
    category: 'Agriculture · Mobile + Web',
    tagline: 'AgriLog v2 — a farm logbook that works in the field without signal.',
    summary:
      'An offline-first logbook for smallholder farms: plots, crops and varieties, care schedules, fertiliser stock, and income and expenses — recorded by typing or by voice, synced when a connection returns, with a web admin for managers.',
    status:
      'V2.2 per README: on-device voice entry, notifications, weather alerts and a full web admin. README reports 456 mobile and 338 backend tests (measured 03/10/2026).',
    features: [
      'Offline-first storage with automatic sync',
      'On-device speech recognition for voice entry',
      'Lam Dong crop catalogue with sourced care processes',
      'Weather alerts, price updates and a manager web admin',
    ],
    stack: ['React Native', 'FastAPI', 'PostgreSQL', 'Next.js', 'TypeScript', 'Python', 'Jest'],
    links: [{ label: 'GitHub', href: gh('AgriXAI-Farmer') }],
    images: [
      { src: '/projects/agrixai-webadmin.png', alt: 'AgriLog web admin overview dashboard' },
      { src: '/projects/agrixai-home.png', alt: 'AgriLog mobile home screen with stock, monthly profit and task cards', position: 'object-top' },
    ],
    span: 5,
  },
  {
    id: 'huim-ips',
    repo: 'HUIM-IPS-',
    name: 'HUIM • IPS',
    category: 'Research · Data mining',
    tagline: 'High Utility Itemset Mining for Wi-Fi fingerprint indoor positioning.',
    summary:
      'An adaptation study that uses the EFIM high-utility itemset mining algorithm as an access-point selection mechanism for Wi-Fi fingerprint localisation, evaluated against control methods on the UJIIndoorLoc dataset.',
    status:
      'Written as a study assignment for a master’s course. The README states it is a proposed model and asserts no novelty. Results are reproducible from the repository’s scripts and result files.',
    features: [
      'EFIM-based access-point selection',
      'Three utility definitions designed for fingerprint data',
      'Controlled evaluation on UJIIndoorLoc with error CDFs and maps',
      'Scripts that rebuild the report from stored results',
    ],
    stack: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'Matplotlib', 'pytest'],
    links: [{ label: 'GitHub', href: gh('HUIM-IPS-') }],
    images: [
      { src: '/projects/huim-pipeline.png', alt: 'HUIM-IPS processing pipeline diagram' },
      { src: '/projects/huim-errormap.png', alt: 'Positioning error map from the HUIM-IPS evaluation' },
    ],
    span: 5,
  },
  {
    id: 'dye-lms',
    repo: 'DYE-LMS',
    name: 'DYE-LMS',
    category: 'Education · Learning platform',
    tagline: 'Da Lat Young Beginners — a programming LMS for middle-school students.',
    summary:
      'A learning management system built for a real programming class in Da Lat: Python, then Pygame games, then Micro:bit hardware, with automatic code grading in a locked-down Docker sandbox.',
    status:
      'README reports 4 courses, 94 sessions, 84 auto-graded exercises and 659 passing tests, using a deliberately positive-only branching scale enforced by a custom lint rule.',
    features: [
      'Automatic grading of Python submissions in a Docker sandbox',
      'Positive-only learning branches (Cơ bản → Mở rộng)',
      'Relationship-based permissions for teachers and students',
      'Real lesson plans: Python, Pygame, Micro:bit',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Turborepo'],
    links: [{ label: 'GitHub', href: gh('DYE-LMS') }],
    images: [],
    span: 7,
    cover: { kind: 'code', glyph: '>>>' },
  },
  {
    id: 'the-call-beneath',
    repo: 'The-Call-Beneath',
    name: 'The Call Beneath',
    category: 'Game · Psychological horror',
    tagline: 'Point-and-click horror at 8,000 m below the surface.',
    summary:
      'A browser-based psychological horror point-and-click set in the Acheron-4 deep-sea station. A Morse signal arrives; the monsters may only be what the protagonist is trying to bury.',
    status:
      'Playable web build (Vite + React). Includes a hand-written Web Audio engine for Morse and ambience, CRT/glitch effects, three interactive screens, two acts and three difficulty levels.',
    features: [
      'Morse-code puzzles with an in-game decoding notebook',
      'Procedural audio built directly on the Web Audio API',
      'CRT, glitch and flashback screen effects',
      'Three difficulty levels up to “Nightmare”',
    ],
    stack: ['JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Web Audio API'],
    links: [{ label: 'GitHub', href: gh('The-Call-Beneath') }],
    images: [
      { src: '/projects/tcb-title.png', alt: 'The Call Beneath title screen with difficulty selection, in green terminal styling', position: 'object-top' },
      { src: '/projects/tcb-desk.png', alt: 'The Call Beneath desk screen with the Morse telegraph, combination-lock drawer and terminal' },
    ],
    span: 12,
  },
]
