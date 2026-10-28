import type { SkillGroup } from '../types/portfolio'

/**
 * Self-reported skills, filtered against what appears in the public repositories.
 * Deliberately no percentage bars: they would be invented numbers.
 */
export const primaryLanguages = ['Python', 'C#', 'C++'] as const

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'Python, C# and C++ are my strongest. I use the rest where a project calls for them.',
    featured: ['Python', 'C#', 'C++'],
    items: ['Python', 'C#', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Component-based, responsive interfaces.',
    items: ['React', 'Next.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    blurb: 'APIs, authentication and relational databases.',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Auth & authorization', 'PostgreSQL', 'Supabase', 'Prisma', 'SQL schema design'],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    blurb: 'Applied machine learning, computer vision and algorithm research.',
    items: [
      'Machine Learning',
      'Computer Vision',
      'YOLO',
      'OpenCV',
      'scikit-learn',
      'Data preprocessing',
      'High Utility Itemset Mining',
      'Indoor positioning',
      'Experimental evaluation',
    ],
  },
  {
    id: 'apps',
    title: 'Games & Apps',
    blurb: 'Interactive software beyond the browser.',
    items: ['Unity', 'Pygame', 'Android Studio', 'React Native', 'Desktop software'],
  },
  {
    id: 'tools',
    title: 'Workflow & Quality',
    blurb: 'Tooling for building, testing and shipping.',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Docker',
      'GitHub Copilot',
      'Claude Code',
      'Gemini',
      'Unity Editor',
      'Google Colab',
      'Jest',
      'Vitest',
      'Playwright',
      'Unit & integration testing',
      'Debugging',
    ],
  },
]
