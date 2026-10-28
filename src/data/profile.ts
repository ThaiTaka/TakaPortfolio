import type { ContactLink } from '../types/portfolio'
import { ui } from './ui'

export const profile = {
  brand: 'Thai Taka',
  fullName: 'Lê Thành Thái',
  fullNameDisplay: 'LÊ THÀNH THÁI',
  university: 'Đại học Đà Lạt',
  field: 'Công nghệ Thông tin',
  headline: 'Sinh viên Công nghệ Thông tin | Đại học Đà Lạt',
  email: 'lethanhthai0805@gmail.com',
  siteUrl: 'https://taka-portfolio-kq32.vercel.app',
  /** ThaiTaka.jpg is the original brand image (never edited); profile-480/768.jpg are resized copies of the same square frame. */
  logo: '/ThaiTaka.jpg',
  logoSmall: '/logo-160.png',
  photo: { sm: '/profile-480.jpg', md: '/profile-768.jpg', full: '/ThaiTaka.jpg' },
  focus: ['Phát triển phần mềm', 'Trí tuệ nhân tạo', 'Lập trình Full-stack', 'Nghiên cứu thuật toán', 'Giáo dục STEM'],
  intro:
    'Tôi là Lê Thành Thái, sinh viên Công nghệ Thông tin tại Đại học Đà Lạt. Tôi tập trung phát triển phần mềm, ứng dụng trí tuệ nhân tạo và xây dựng các giải pháp công nghệ thực tiễn. Từ năm 2023, tôi cũng tham gia giảng dạy STEM.',
  /** Set a path (e.g. '/CV_LeThanhThai.pdf') once a real PDF exists in /public to show the download button. */
  cvPdf: null as string | null,
} as const

export const contactLinks: ContactLink[] = [
  { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { key: 'github', label: 'GitHub', value: 'github.com/ThaiTaka', href: 'https://github.com/ThaiTaka' },
  { key: 'facebook', label: 'Facebook', value: 'thai.taka.2024', href: 'https://www.facebook.com/thai.taka.2024/' },
  { key: 'zalo', label: 'Zalo', value: '0899 034 349', href: 'https://zalo.me/0899034349' },
]

export const navLinks = [
  { id: 'home', label: ui.nav.home },
  { id: 'skills', label: ui.nav.skills },
  { id: 'projects', label: ui.nav.projects },
  { id: 'experience', label: ui.nav.experience },
  { id: 'awards', label: ui.nav.awards },
  { id: 'hobbies', label: ui.nav.hobbies },
  { id: 'contact', label: ui.nav.contact },
] as const

/** Every top-level section in page order; used to resolve the active navbar state. */
export const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'awards', 'research', 'hobbies', 'contact'] as const
