import type { ExperienceItem, NoteItem } from '../types/portfolio'

export const experience: ExperienceItem[] = [
  {
    period: '2023 — Present',
    title: 'STEM Educator / Teaching Assistant',
    org: 'STEM education',
    body: 'Teaching and supporting hands-on technology learning for young students.',
    points: [
      'Programming with Python and Pygame',
      'Micro:bit and introductory hardware',
      'Computational thinking through projects',
    ],
  },
  {
    period: 'University',
    title: 'Information Technology',
    org: 'Da Lat University',
    body: 'Coursework, team projects and competitions in software engineering.',
    points: [
      'Information security competition — Third Prize, team mYth00s (2026)',
      'Lam Dong innovation competition — First Prize with the eParking team (2026)',
      'Student research on AI and machine learning applications',
    ],
  },
  {
    period: 'Ongoing',
    title: 'Research & Engineering',
    org: 'Personal and academic projects',
    body: 'Projects where software meets a practical problem.',
    points: [
      'High Utility Itemset Mining applied to indoor positioning (HUIM-IPS)',
      'Automatic licence-plate recognition with YOLO and EasyOCR in eParking',
      'Offline-first farm logbook with on-device speech recognition (AgriXAI-Farmer)',
    ],
  },
]

/**
 * No articles have been published, so this section links to real documents that
 * live in the project repositories instead of inventing posts or dates.
 */
export const notes: NoteItem[] = [
  {
    title: 'Literature review: HUIM for indoor positioning',
    category: 'Research',
    description: 'Prior-art survey behind the HUIM-IPS adaptation study.',
    href: 'https://github.com/ThaiTaka/HUIM-IPS-/blob/main/research/literature_review.md',
    source: 'HUIM-IPS',
  },
  {
    title: 'Architecture of an auto-graded programming LMS',
    category: 'Engineering',
    description: 'How DYE-LMS is structured, from lesson data to the grading sandbox.',
    href: 'https://github.com/ThaiTaka/DYE-LMS/blob/main/docs/01-ARCHITECTURE.md',
    source: 'DYE-LMS',
  },
  {
    title: 'Designing the ReadMateAI exercise engine',
    category: 'Education',
    description: 'Rule-based exercise generation for first-grade Vietnamese reading.',
    href: 'https://github.com/ThaiTaka/ReadMateAI/blob/main/docs/EXERCISE_ENGINE.md',
    source: 'ReadMateAI',
  },
  {
    title: 'Decision record: Lam Dong crop data',
    category: 'Data',
    description: 'Why and how the AgriLog crop catalogue is sourced.',
    href: 'https://github.com/ThaiTaka/AgriXAI-Farmer/blob/main/docs/adr/0009-du-lieu-lam-dong.md',
    source: 'AgriXAI-Farmer',
  },
]
