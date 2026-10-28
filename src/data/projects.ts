import type { Project } from '../types/portfolio'

const gh = (repo: string) => `https://github.com/ThaiTaka/${repo}`

/**
 * Mọi trường dưới đây lấy từ README / tài liệu của chính kho mã trên GitHub (kiểm tra tháng 10/2026).
 * Không kho nào khai báo liên kết demo, nên không hiển thị nút "Demo".
 * `role` chỉ nêu điều có thể xác nhận từ lịch sử đóng góp trên GitHub — chủ sở hữu nên rà soát lại.
 */
export const projects: Project[] = [
  {
    id: 'readmateai',
    repo: 'ReadMateAI',
    name: 'ReadMateAI',
    category: 'Giáo dục · Tiếng Việt lớp 1',
    tagline: 'Mỗi em một nhịp đọc – Mỗi ngày một tiến bộ.',
    role: 'Phát triển dự án (kho mã cá nhân trên GitHub)',
    problem:
      'Học sinh lớp 1 cần luyện đều đặn chữ, âm, vần, đánh vần và đọc trơn, nhưng giáo viên khó hướng dẫn riêng từng em trong giờ học.',
    solution:
      'Nền tảng luyện Tiếng Việt theo hướng "học có hướng dẫn ở nhà, tự thực hiện ở lớp": bài tập có hình ảnh và gợi ý giảm dần, mỗi bài ở nhà có phiếu tương đương để em tự làm ở lớp.',
    features: [
      'Sinh bài tập theo quy tắc, kiểm tra chống lộ đáp án',
      'Sáu dạng bài với mức hỗ trợ từ H3 xuống H0',
      'Cặp bài ở nhà – phiếu ở lớp tương ứng',
      'Thư viện phân tích tiếng Việt và kho tri thức có kiểm thử',
    ],
    status:
      'Nhánh main (mặc định) ở Giai đoạn 4 theo README: thư viện phân tích tiếng Việt, kho tri thức có kiểm thử, bộ máy bài tập sáu dạng và bản chơi thử /demo dùng dữ liệu minh họa. Bản thiết kế lại kèm bộ chấm điểm phía máy chủ (Supabase local) đang nằm trong pull request #1, chưa được hợp nhất. Chưa phát hành âm thanh, tài khoản hay tính năng AI; toàn bộ nội dung đang chờ giáo viên duyệt.',
    stack: ['Next.js', 'TypeScript', 'Vitest', 'Playwright', 'ESLint'],
    links: [{ label: 'Xem trên GitHub', href: gh('ReadMateAI') }],
    images: [
      { src: '/projects/readmate-home.jpg', alt: 'Trang chủ ReadMateAI (bản xem trước) với hình minh họa cậu bé thám hiểm và chú cú' },
      { src: '/projects/readmate-exercise.jpg', alt: 'Màn hình bài tập ReadMateAI: chọn vần cho từ "vàng", mức hỗ trợ H2', position: 'object-top' },
    ],
    imageNote: 'Ảnh chụp từ nhánh thiết kế lại đang phát triển (pull request #1, chưa hợp nhất vào main).',
  },
  {
    id: 'agrixai-farmer',
    repo: 'AgriXAI-Farmer',
    name: 'AgriXAI-Farmer',
    category: 'Nông nghiệp · Mobile + Web',
    tagline: 'AgriLog v2 — sổ ghi chép nông hộ dùng được ngay cả khi mất sóng.',
    role: 'Thành viên nhóm phát triển (GitHub ghi nhận 2 người đóng góp)',
    problem:
      'Nông hộ thường ghi vật tư, công việc và thu chi vào sổ giấy hoặc trí nhớ, nên cuối vụ khó biết vụ này lãi hay lỗ — trong khi ngoài đồng thường không có sóng.',
    solution:
      'Ứng dụng ghi chép offline-first trên điện thoại (gõ hoặc nói, nhận dạng giọng nói ngay trên máy), tự đồng bộ khi có mạng, kèm trang web quản trị cho cán bộ quản lý.',
    features: [
      'Lưu trên máy trước, tự đồng bộ lên máy chủ khi có mạng',
      'Nhận dạng giọng nói ngay trên thiết bị để ghi nhanh',
      'Danh mục cây trồng Lâm Đồng kèm quy trình chăm sóc có nguồn',
      'Cảnh báo thời tiết, giá phân bón cập nhật và web quản trị',
    ],
    status:
      'V2.2 theo README: ghi bằng giọng nói offline, thông báo, thời tiết, giá phân bón cập nhật và web quản trị đầy đủ. README ghi 456 test mobile và 338 test backend (đo ngày 03/10/2026).',
    stack: ['React Native', 'FastAPI', 'PostgreSQL', 'Next.js', 'TypeScript', 'Python', 'Jest'],
    links: [{ label: 'Xem trên GitHub', href: gh('AgriXAI-Farmer') }],
    images: [
      { src: '/projects/agrixai-webadmin.png', alt: 'Bảng điều khiển tổng quan của web quản trị AgriLog' },
      { src: '/projects/agrixai-home.png', alt: 'Màn hình chính ứng dụng AgriLog với thẻ tồn kho, lãi lỗ tháng và công việc', position: 'object-top' },
      { src: '/projects/agrixai-voice.png', alt: 'Màn hình ghi nhanh bằng giọng nói của AgriLog', position: 'object-top' },
    ],
  },
  {
    id: 'huim-ips',
    repo: 'HUIM-IPS-',
    name: 'HUIM-IPS-',
    category: 'Nghiên cứu · Khai phá dữ liệu',
    tagline: 'Khai phá tập mục tiện ích cao cho định vị trong nhà bằng vân tay Wi-Fi.',
    role: 'Thực hiện bài tìm hiểu: thiết kế ánh xạ, cài đặt và chạy thực nghiệm',
    problem:
      'Định vị trong nhà bằng vân tay Wi-Fi có hàng trăm điểm truy cập (AP), trong đó nhiều AP đóng góp ít; cần một cách chọn AP có cơ sở.',
    solution:
      'Dùng thuật toán khai phá tập mục tiện ích cao EFIM làm cơ chế chọn AP: ánh xạ vân tay Wi-Fi thành giao dịch tiện ích, rồi đánh giá đối chứng trên bộ dữ liệu UJIIndoorLoc.',
    features: [
      'Chọn AP bằng EFIM với ba định nghĩa tiện ích do dự án thiết kế',
      'Đánh giá đối chứng trên UJIIndoorLoc: CDF sai số, bản đồ sai số',
      'Kết quả đọc trực tiếp từ tệp kết quả, có thể chạy lại',
      'Có kiểm thử bằng pytest và tập lệnh dựng lại báo cáo',
    ],
    status:
      'Bài tìm hiểu cho một học phần. README nêu rõ đây là mô hình đề xuất và không khẳng định tính mới. Kết quả có thể tái lập từ mã nguồn và tệp kết quả trong kho.',
    stack: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'Matplotlib', 'pytest'],
    links: [{ label: 'Xem trên GitHub', href: gh('HUIM-IPS-') }],
    images: [
      { src: '/projects/huim-pipeline.png', alt: 'Sơ đồ luồng xử lý của HUIM-IPS', fit: 'contain' },
      { src: '/projects/huim-errormap.png', alt: 'Bản đồ sai số định vị trong đánh giá HUIM-IPS' },
      { src: '/projects/huim-cdf.png', alt: 'Đường phân phối tích lũy (CDF) sai số của các phương pháp' },
    ],
  },
  {
    id: 'dye-lms',
    repo: 'DYE-LMS',
    name: 'DYE-LMS',
    category: 'Giáo dục · Hệ thống quản lý học tập',
    tagline: 'Da Lat Young Beginners — nền tảng dạy lập trình cho học sinh THCS.',
    role: 'Phát triển dự án (kho mã cá nhân trên GitHub)',
    problem:
      'Lớp lập trình thật cho học sinh cấp 2: mỗi em một tốc độ, chấm tay 30 bài Python mỗi buổi là bất khả thi, và các em dễ chán nếu chỉ có chữ.',
    solution:
      'Hệ thống quản lý học tập với giáo án thật, thang phân nhánh hoàn toàn tích cực, bộ chấm tự động chạy trong hộp cát Docker và ba mạch nội dung Python → Pygame → Micro:bit.',
    features: [
      'Chấm tự động bài Python trong hộp cát Docker',
      'Thang phân nhánh tích cực: Cơ bản → Thử thách → Nâng cao → Mở rộng',
      'Phân quyền theo quan hệ giữa giáo viên và học sinh',
      'Giáo án thực tế: Python, Pygame, Micro:bit',
    ],
    status: 'README ghi 4 khoá học, 94 buổi, 84 bài lập trình chấm tự động và 659 test đạt.',
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Turborepo'],
    links: [{ label: 'Xem trên GitHub', href: gh('DYE-LMS') }],
    images: [],
    cover: { glyph: '>>>' },
  },
  {
    id: 'the-call-beneath',
    repo: 'The-Call-Beneath',
    name: 'The-Call-Beneath',
    category: 'Trò chơi web · Kinh dị tâm lý',
    tagline: 'Point-and-click kinh dị ở độ sâu 8.000 m dưới mặt biển.',
    role: 'Phát triển trò chơi (kho mã cá nhân trên GitHub)',
    problem:
      'Tạo một trải nghiệm kinh dị tâm lý point-and-click chạy ngay trên trình duyệt, không cần cài đặt.',
    solution:
      'Trò chơi dựng bằng React và Vite với engine âm thanh Web Audio tự viết (mã Morse, âm nền), hiệu ứng CRT/glitch, ba màn hình tương tác, hai hồi chơi và ba mức độ khó.',
    features: [
      'Câu đố mã Morse kèm sổ tay giải mã trong game',
      'Âm thanh thủ tục xây trực tiếp trên Web Audio API',
      'Hiệu ứng CRT, glitch và hồi tưởng trên màn hình',
      'Ba mức độ khó, cao nhất là "Ác mộng"',
    ],
    status: 'Bản chơi được trên trình duyệt (Vite + React), không phải dự án Unity.',
    stack: ['JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Web Audio API'],
    links: [{ label: 'Xem trên GitHub', href: gh('The-Call-Beneath') }],
    images: [
      { src: '/projects/tcb-title.png', alt: 'Màn hình tiêu đề The Call Beneath với lựa chọn độ khó theo phong cách terminal xanh lá', position: 'object-top' },
      { src: '/projects/tcb-desk.png', alt: 'Màn hình bàn làm việc với máy điện tín Morse, ngăn kéo khóa số và terminal' },
    ],
  },
]
