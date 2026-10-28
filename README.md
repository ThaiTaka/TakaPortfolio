# Thai Taka — Lê Thành Thái · CV điện tử

CV điện tử / portfolio cá nhân của **Lê Thành Thái (Thai Taka)** — sinh viên Công nghệ Thông tin, Đại học Đà Lạt. Giao diện tối, tiếng Việt là ngôn ngữ chính, bố cục theo hồ sơ chuyên nghiệp: ảnh đại diện → giới thiệu → kỹ năng → dự án → học vấn & kinh nghiệm → thành tích → nghiên cứu → sở thích → liên hệ.

## Công nghệ

Font: Inter + Newsreader (Instrument Serif thiếu ~96 glyph tiếng Việt như ề, ệ, ả, ự nên không dùng cho nội dung tiếng Việt).

Vite 8 · React 19 · TypeScript · Tailwind CSS 3 (`tailwind.config.ts`) · Motion for React (`motion/react`) · lucide-react · simple-icons (logo công nghệ, import từng icon) · oxlint.

## Lệnh

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run lint       # oxlint
npm run build      # typecheck + build production vào dist/
npm run preview    # xem bản build tại http://localhost:4173
npm run test:e2e   # E2E + axe-core (cần `preview` đang chạy và Chrome)
```

## Cấu trúc

```text
src/
├── app/App.tsx              # ghép các section theo thứ tự CV
├── components/
│   ├── common/              # AnimatedButton, GradientBorder, Reveal, SectionHeading,
│   │                        # ProjectCard, ProjectCover, TechIcon, HobbyIcon
│   ├── layout/              # Navbar, Footer
│   └── sections/            # Hero (hồ sơ), About, Skills, Projects, Experience,
│                            # Achievements, Research, Hobbies, Contact
├── data/                    # ← toàn bộ nội dung cá nhân nằm ở đây
│   ├── ui.ts                # mọi chuỗi giao diện (tiếng Việt)
│   ├── profile.ts           # họ tên, giới thiệu, liên hệ, điều hướng, id section
│   ├── skills.ts  projects.ts  experience.ts  achievements.ts  hobbies.ts
├── hooks/                   # useReducedMotion, useActiveSection
├── styles/index.css         # biến màu, .accent-gradient, tiện ích
└── types/portfolio.ts
public/                      # ThaiTaka.jpg (logo chính thức), profile-480/768.jpg, favicon, og-image, projects/
scripts/e2e.mjs              # bộ kiểm thử
```

## Cập nhật nội dung

- **Họ tên, giới thiệu, lĩnh vực, liên hệ** → `src/data/profile.ts` (`focus`, `intro`, `contactLinks`).
- **Nút "Tải CV"**: đặt file PDF thật vào `public/` rồi gán đường dẫn cho `profile.cvPdf`. Khi còn `null`, nút không hiển thị.
- **Chuỗi giao diện, tiêu đề mục** → `src/data/ui.ts`. Muốn thêm tiếng Anh: tạo đối tượng cùng cấu trúc và chọn ở `App.tsx`; mặc định vẫn là tiếng Việt.
- **Kỹ năng** → `src/data/skills.ts`. `leadLanguages` là Python/C#/C++ (thẻ nổi bật), `skillGroups` là các nhóm còn lại. Tất cả nhóm luôn hiển thị, không dùng tab. Thêm `icon` (khoá trong `TechIconKey`) cho công nghệ có logo; bỏ trống cho khái niệm.
- **Dự án** → `src/data/projects.ts`. Mỗi dự án có `role`, `problem`, `solution`, `features`, `status`, `stack`, `links`, `images`. Ảnh đặt trong `public/projects/`. Chỉ thêm liên kết đã xác minh; không có nút giả. Dự án chưa có ảnh dùng `cover`.
- **Thành tích** → `src/data/achievements.ts` (tự nhóm theo năm). Số "giải thưởng" ở đầu trang được tính từ các mục `kind: 'prize'`.
- **Học vấn & kinh nghiệm, tài liệu nghiên cứu** → `src/data/experience.ts`.
- **Sở thích** → `src/data/hobbies.ts`; icon ánh xạ trong `components/common/HobbyIcon.tsx`. Giải cờ vua chỉ nằm ở Thành tích.
- **Điều hướng** → `navLinks` và `sectionIds` trong `profile.ts`. Mục không có trong `navLinks` (Giới thiệu, Nghiên cứu) khiến thanh điều hướng không tô sáng mục nào.
- **SEO** → `index.html` (tiêu đề, mô tả, Open Graph, JSON-LD `Person`), `public/robots.txt`, `public/sitemap.xml`. Tất cả dùng `https://taka-portfolio-kq32.vercel.app`.

## Hiệu ứng

Chỉ giữ hiệu ứng nhẹ: hiện dần khi cuộn (Motion), hover tinh tế, viền gradient khi hover. Không có màn hình loading, video nền, parallax hay chữ chạy. `prefers-reduced-motion` tắt mọi chuyển động. Ảnh hồ sơ được preload (`<link rel="preload">`) và có `srcset` 480/768/1152 px để hiện gần như tức thì.

## Kiểm thử

`scripts/e2e.mjs` (playwright-core + axe-core): hiển thị đầu trang ngay lập tức (ảnh, tên), LCP/CLS, tiếng Việt và các chuỗi bị loại bỏ, toàn bộ nhóm kỹ năng hiển thị không cần bấm, 5 dự án, thành tích, 5 sở thích với 5 icon khác nhau, thứ tự section, trạng thái active của navbar, bàn phím và skip link, menu mobile, liên kết/ảnh, axe (WCAG 2 A/AA + best practice), thứ bậc heading, và tràn ngang/cỡ chữ/vùng chạm ở 320/390/768/1440/1920 px. Chạy bằng giả lập trình duyệt — không thay thế kiểm thử trên thiết bị thật hay trình đọc màn hình.

## Triển khai

Production: <https://taka-portfolio-kq32.vercel.app>. Dự án Vercel `taka-portfolio-kq32` liên kết với repository này qua tích hợp GitHub; push lên `main` sẽ tự triển khai production (preset Vite, `npm run build`, thư mục `dist/`), các nhánh khác tạo preview.

## Ghi chú độ chính xác

Mô tả dự án lấy từ README của nhánh mặc định trên GitHub; vai trò (`role`) chỉ nêu điều xác nhận được từ lịch sử đóng góp. Ảnh ReadMateAI lấy từ nhánh thiết kế lại chưa hợp nhất (pull request #1) và được gắn nhãn "Ảnh từ nhánh xem trước" — hãy cập nhật `projects.ts` khi nhánh đó vào `main`.
