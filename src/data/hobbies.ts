import type { Hobby } from '../types/portfolio'

/** Chỉ là sở thích cá nhân — không có xếp hạng, điểm số hay tuyên bố thi đấu. Giải cờ vua nằm trong achievements.ts. */
export const hobbies: Hobby[] = [
  {
    id: 'gaming',
    label: 'Chơi game',
    description: 'Khám phá thế giới trò chơi và những trải nghiệm tương tác thú vị.',
    icon: 'gamepad',
  },
  {
    id: 'chess',
    label: 'Cờ vua',
    description: 'Yêu thích tư duy chiến thuật, tính toán và tìm kiếm những nước đi sáng tạo.',
    icon: 'chess',
  },
  {
    id: 'swimming',
    label: 'Bơi lội',
    description: 'Một hoạt động thể thao giúp tôi thư giãn và rèn luyện sức khỏe.',
    icon: 'swimming',
  },
  {
    id: 'badminton',
    label: 'Cầu lông',
    description: 'Yêu thích những trận cầu nhanh, đòi hỏi phản xạ và sự linh hoạt.',
    icon: 'badminton',
  },
  {
    id: 'basketball',
    label: 'Bóng rổ',
    description: 'Thích sự năng động, phối hợp đồng đội và tinh thần thể thao.',
    icon: 'basketball',
  },
]
