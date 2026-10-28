import type { LeadLanguage, SkillGroup } from '../types/portfolio'

/**
 * Self-reported skills, filtered against what appears in the public repositories.
 * Deliberately no percentage bars: they would be invented numbers.
 */
export const leadLanguages: LeadLanguage[] = [
  { name: 'Python', icon: 'python', note: 'AI/ML, nghiên cứu thuật toán, công cụ và giảng dạy lập trình.' },
  { name: 'C#', icon: 'csharp', note: 'Phát triển game với Unity và ứng dụng desktop.' },
  { name: 'C++', icon: 'cpp', note: 'Giải thuật, cấu trúc dữ liệu và lập trình hiệu năng.' },
]

export const otherLanguages = [
  { name: 'Java', icon: 'java' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'SQL' },
] as const

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    blurb: 'Giao diện web theo kiến trúc component, thích ứng mọi kích thước màn hình.',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Vite', icon: 'vite' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend và Cơ sở dữ liệu',
    icon: 'server',
    blurb: 'Xây dựng API, xác thực phân quyền và thiết kế cơ sở dữ liệu quan hệ.',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'REST API' },
    ],
  },
  {
    id: 'ai',
    title: 'AI, Machine Learning và Dữ liệu',
    icon: 'brain',
    blurb: 'Học máy ứng dụng, thị giác máy tính và nghiên cứu thuật toán khai phá dữ liệu.',
    items: [
      { name: 'Python AI/ML', icon: 'python' },
      { name: 'Machine Learning' },
      { name: 'Computer Vision' },
      { name: 'YOLO', icon: 'yolo' },
      { name: 'OpenCV', icon: 'opencv' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'Tiền xử lý dữ liệu' },
      { name: 'High Utility Itemset Mining' },
      { name: 'Indoor Positioning Systems' },
    ],
  },
  {
    id: 'apps',
    title: 'Desktop, Mobile và Game',
    icon: 'smartphone',
    blurb: 'Ứng dụng ngoài trình duyệt và trò chơi tương tác.',
    items: [
      { name: 'C#', icon: 'csharp' },
      { name: 'C++', icon: 'cpp' },
      { name: 'Unity', icon: 'unity' },
      { name: 'Pygame', icon: 'generic' },
      { name: 'Android Studio', icon: 'androidstudio' },
      { name: 'React Native', icon: 'react' },
      { name: 'Ứng dụng desktop' },
    ],
  },
  {
    id: 'stem',
    title: 'STEM và lập trình giáo dục',
    icon: 'cpu',
    blurb: 'Công cụ tôi dùng khi giảng dạy lập trình và điện tử cho học sinh từ năm 2023.',
    items: [
      { name: 'Scratch', icon: 'scratch' },
      { name: 'micro:bit', icon: 'microbit' },
      { name: 'Arduino', icon: 'arduino' },
    ],
  },
  {
    id: 'tools',
    title: 'Công cụ và quy trình',
    icon: 'wrench',
    blurb: 'Công cụ xây dựng, kiểm thử và phối hợp trong phát triển phần mềm.',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'VS Code', icon: 'generic' },
      { name: 'Claude Code', icon: 'claude' },
      { name: 'GitHub Copilot', icon: 'copilot' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'Google Colab', icon: 'colab' },
      { name: 'Jest', icon: 'jest' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Playwright', icon: 'generic' },
    ],
  },
]
