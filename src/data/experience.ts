import type { Education, NoteItem, TimelineItem } from '../types/portfolio'

export const education: Education = {
  school: 'Đại học Đà Lạt',
  major: 'Công nghệ Thông tin',
  status: 'Sinh viên',
  points: [
    'Học tập và thực hiện dự án phần mềm, nghiên cứu ứng dụng AI',
    'Tham gia các cuộc thi học thuật và khởi nghiệp đổi mới sáng tạo',
  ],
}

export const experience: TimelineItem[] = [
  {
    period: '2023 – nay',
    title: 'Giảng dạy STEM và lập trình Python, Pygame',
    org: 'Giáo dục STEM',
    body: 'Vừa giảng dạy STEM vừa dạy lập trình Python và Pygame cho học sinh thông qua các hoạt động thực hành.',
    points: [
      'Dạy lập trình Python và làm game với Pygame',
      'Scratch, micro:bit và Arduino',
      'Rèn luyện tư duy máy tính qua dự án',
    ],
  },
  {
    period: '2026',
    title: 'Thành viên nhóm dự án eParking',
    org: 'Cuộc thi Khởi nghiệp đổi mới sáng tạo tỉnh Lâm Đồng',
    body: 'Tham gia nhóm phát triển hệ thống quản lý bãi xe thông minh; dự án đạt Giải Nhất.',
    points: [
      'Hệ thống nhận diện biển số bằng YOLO và EasyOCR',
      'Quản lý ví, thanh toán và bảng điều khiển quản trị',
    ],
  },
  {
    period: 'Liên tục',
    title: 'Phát triển phần mềm và nghiên cứu',
    org: 'Dự án học thuật và cá nhân',
    body: 'Xây dựng các sản phẩm giải quyết vấn đề thực tế và thử nghiệm các hướng nghiên cứu.',
    points: [
      'Khai phá tập mục tiện ích cao cho định vị trong nhà (HUIM-IPS-)',
      'Ứng dụng ghi chép nông hộ offline-first (AgriXAI-Farmer)',
      'Nền tảng học tập ReadMateAI; trò chơi The-Call-Beneath',
    ],
  },
]

/**
 * Chưa có bài viết nào được công bố, nên mục này dẫn tới các tài liệu thật nằm trong kho mã
 * thay vì bịa bài viết hay ngày đăng.
 */
export const notes: NoteItem[] = [
  {
    title: 'Tổng quan tài liệu: HUIM cho định vị trong nhà',
    category: 'Nghiên cứu',
    description: 'Khảo sát các công trình trước đó làm nền cho bài tìm hiểu HUIM-IPS-.',
    href: 'https://github.com/ThaiTaka/HUIM-IPS-/blob/main/research/literature_review.md',
    source: 'HUIM-IPS-',
  },
  {
    title: 'Thiết kế bộ máy bài tập của ReadMateAI',
    category: 'Giáo dục',
    description: 'Cách sinh bài tập theo quy tắc cho môn Tiếng Việt lớp 1.',
    href: 'https://github.com/ThaiTaka/ReadMateAI/blob/main/docs/EXERCISE_ENGINE.md',
    source: 'ReadMateAI',
  },
  {
    title: 'Quyết định thiết kế: dữ liệu cây trồng Lâm Đồng',
    category: 'Dữ liệu',
    description: 'Vì sao và bằng cách nào danh mục cây trồng của AgriLog có nguồn rõ ràng.',
    href: 'https://github.com/ThaiTaka/AgriXAI-Farmer/blob/main/docs/adr/0009-du-lieu-lam-dong.md',
    source: 'AgriXAI-Farmer',
  },
]
