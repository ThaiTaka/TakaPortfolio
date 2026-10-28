/**
 * All interface copy lives here. Vietnamese is the default and only shipped locale.
 * To add English later, export a second object with the same shape and pick one in App.
 */
export const ui = {
  lang: 'vi',
  skipToContent: 'Bỏ qua, đến nội dung chính',
  nav: {
    home: 'Trang chủ',
    skills: 'Kỹ năng',
    projects: 'Dự án',
    experience: 'Kinh nghiệm',
    awards: 'Thành tích',
    hobbies: 'Sở thích',
    contact: 'Liên hệ',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    backToTop: 'Thai Taka — về đầu trang',
  },
  hero: {
    viewProjects: 'Xem dự án',
    exploreSkills: 'Khám phá kỹ năng',
    contact: 'Liên hệ',
    focusLabel: 'Lĩnh vực chuyên môn',
    factsLabel: 'Thông tin nhanh',
  },
  about: {
    eyebrow: 'Giới thiệu',
    title: 'Giới thiệu bản thân',
    snapshot: 'Hồ sơ tóm tắt',
    values: 'Điều tôi coi trọng',
  },
  skills: {
    eyebrow: 'Kỹ năng chuyên môn',
    title: 'Kỹ năng',
    sub: 'Toàn bộ năng lực kỹ thuật được nhóm theo lĩnh vực — không có thanh phần trăm tự đặt.',
    strongest: 'Thế mạnh',
    otherLanguages: 'Ngôn ngữ khác',
  },
  projects: {
    eyebrow: 'Dự án tiêu biểu',
    title: 'Dự án',
    sub: 'Sáu dự án phần mềm, nghiên cứu, giáo dục và trò chơi tôi đã tham gia xây dựng. Thông tin lấy từ chính kho mã trên GitHub.',
    role: 'Vai trò',
    problem: 'Bài toán',
    solution: 'Giải pháp',
    features: 'Tính năng nổi bật',
    status: 'Hiện trạng',
    stack: 'Công nghệ',
    previewBranch: 'Ảnh từ nhánh xem trước',
  },
  experience: {
    eyebrow: 'Học vấn và kinh nghiệm',
    title: 'Học vấn & kinh nghiệm',
    education: 'Học vấn',
    work: 'Kinh nghiệm',
  },
  awards: {
    eyebrow: 'Thành tích và giải thưởng',
    title: 'Thành tích',
    sub: 'Giải thưởng, đề tài nghiên cứu và hoạt động giảng dạy, sắp xếp theo thời gian.',
    kind: { prize: 'Giải thưởng', research: 'Nghiên cứu', teaching: 'Giảng dạy' },
  },
  research: {
    eyebrow: 'Nghiên cứu và tài liệu',
    title: 'Nghiên cứu',
    sub: 'Các tài liệu nghiên cứu và thiết kế tôi đã viết trong dự án. Chúng nằm trong kho mã — chưa phải bài báo đã công bố.',
    opensNewTab: '(mở trong thẻ mới)',
  },
  hobbies: {
    eyebrow: 'Sở thích cá nhân',
    title: 'Sở thích',
    subtitle: 'Những điều tôi yêu thích ngoài lập trình',
    intro:
      'Ngoài niềm đam mê công nghệ và phát triển phần mềm, tôi còn yêu thích các trò chơi điện tử, cờ vua và nhiều hoạt động thể thao. Đây là những sở thích giúp tôi thư giãn, rèn luyện tư duy và duy trì sự năng động trong cuộc sống.',
  },
  contact: {
    eyebrow: 'Liên hệ',
    title: 'Hãy cùng làm điều có ý nghĩa',
    body: 'Dự án, ý tưởng nghiên cứu, giảng dạy hay đơn giản là trò chuyện về công nghệ — hộp thư của tôi luôn mở.',
    availability: 'Sẵn sàng trao đổi và hợp tác.',
    sendEmail: 'Gửi email',
  },
  footer: {
    rights: 'Thai Taka — Lê Thành Thái',
    toTop: 'Về đầu trang',
  },
} as const
