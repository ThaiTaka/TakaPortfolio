import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  Download,
  ArrowRight,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  Send,
  Loader2,
  Award,
  FolderGit2,
  GitCommit,
  Brain,
  Code2,
  Gamepad2,
  Eye,
  Cpu,
  Layers,
  Crosshair,
} from 'lucide-react';

const EMAIL = 'lethanhthai0805@gmail.com';
const AVATAR_URL = 'https://graph.facebook.com/100083232824368/picture?type=large';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const STATS = [
  { icon: Award, value: '5+', label: 'Kaggle ML Competitions' },
  { icon: FolderGit2, value: '20+', label: 'Dự án hoàn thành' },
  { icon: GitCommit, value: '1000+', label: 'Code Commits' },
];

const TECH_STACK = [
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    gradient: 'from-violet to-fuchsia-400',
    items: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Scikit-learn'],
  },
  {
    category: 'Web & Interactive',
    icon: Code2,
    gradient: 'from-teal to-cyan-400',
    items: ['React', 'Next.js', 'TypeScript', 'Three.js', 'PHP', 'WordPress', 'Sanity.io'],
  },
  {
    category: 'Game & Tools',
    icon: Gamepad2,
    gradient: 'from-violet to-teal',
    items: ['Unity 3D', 'C#', 'Pygame', 'Git', 'VS Code'],
  },
];

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'web', label: 'WEB' },
  { key: 'game', label: 'GAME' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'TakaVision',
    category: 'web',
    confidence: 98,
    icon: Layers,
    tagline: 'Portfolio 3D & CMS nội dung sáng tạo',
    description:
      'Website portfolio cá nhân tích hợp hiệu ứng 3D tương tác cùng hệ thống quản trị nội dung linh hoạt qua Sanity.io.',
    longDescription:
      'Website portfolio cá nhân được xây dựng trên Next.js, tích hợp các cảnh 3D tương tác bằng Three.js và một hệ quản trị nội dung linh hoạt qua Sanity.io — cho phép cập nhật dự án, bài viết mà không cần chạm vào code. Trọng tâm là trải nghiệm mượt, hiệu năng tải trang nhanh và một hệ thống thiết kế nhất quán theo phong cách "cyber-glass".',
    tags: ['Next.js', 'Three.js', 'Sanity.io', 'Tailwind CSS'],
    github: 'https://github.com/ThaiTaka/TakaPortfolio.git',
    live: null,
  },
  {
    id: 2,
    title: 'The Call Beneath',
    category: 'game',
    confidence: 94,
    icon: Gamepad2,
    tagline: 'Game 3D giải đố phòng thí nghiệm',
    description:
      'Trò chơi phiêu lưu giải đố 3D — khám phá phòng thí nghiệm bí ẩn và giải mã thông điệp Morse.',
    longDescription:
      'Một tựa game phiêu lưu giải đố góc nhìn thứ nhất dựng trên Unity 3D. Người chơi tỉnh dậy trong một phòng thí nghiệm bỏ hoang, phải quan sát môi trường, thu thập manh mối và giải mã các thông điệp Morse để tìm đường thoát ra — trọng tâm là bầu không khí, ánh sáng và nhịp kể chuyện qua môi trường (environmental storytelling).',
    tags: ['Unity 3D', 'C#', 'Blender'],
    github: 'https://github.com/ThaiTaka',
    live: null,
  },
  {
    id: 3,
    title: 'YOLOv8 Vision Model',
    category: 'ai',
    confidence: 97,
    icon: Eye,
    tagline: 'Hệ thống thị giác máy tính thời gian thực',
    description:
      'Xây dựng và huấn luyện mô hình nhận diện đối tượng tự động theo thời gian thực ứng dụng YOLOv8.',
    longDescription:
      'Huấn luyện và tối ưu mô hình phát hiện đối tượng dựa trên kiến trúc YOLOv8, xử lý luồng video thời gian thực bằng OpenCV. Bao gồm bước tiền xử lý dữ liệu, augmentation, fine-tuning và đánh giá mô hình bằng các chỉ số mAP / precision-recall.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch'],
    github: 'https://github.com/ThaiTaka',
    live: null,
  },
  {
    id: 4,
    title: 'Kaggle Housing Predictor',
    category: 'ai',
    confidence: 91,
    icon: Cpu,
    tagline: 'Mô hình dự đoán giá nhà bằng Machine Learning',
    description:
      'Mô hình hồi quy dự đoán giá bất động sản dựa trên tập dữ liệu Kaggle, áp dụng feature engineering và ensemble learning.',
    longDescription:
      'Mô hình hồi quy dự đoán giá bất động sản trên bộ dữ liệu Kaggle "House Prices". Áp dụng feature engineering, xử lý dữ liệu khuyết và ensemble learning (XGBoost + stacking) để tối ưu điểm số RMSE trên leaderboard.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
    github: 'https://github.com/ThaiTaka',
    live: null,
  },
];

function Eyebrow({ children, tone = 'teal' }) {
  const color = tone === 'violet' ? 'text-violet' : 'text-teal';
  const dot =
    tone === 'violet'
      ? 'bg-violet shadow-[0_0_0_3px_rgba(160,104,255,0.18)]'
      : 'bg-teal shadow-[0_0_0_3px_rgba(45,212,191,0.18)]';
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function CornerFrame() {
  return (
    <>
      <span className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-violet opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-violet opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-violet opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-violet opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-100" />
    </>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* clipboard unavailable, ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1300);
  };

  const filteredProjects =
    activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen overflow-x-hidden bg-void font-sans text-gray-200">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? 'border-white/10 bg-void/80 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6 sm:px-10">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 font-mono text-base font-bold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-violet to-teal text-void">
              <Crosshair className="h-4 w-4" />
            </span>
            <span>
              Taka<span className="bg-gradient-to-r from-white to-teal bg-clip-text text-transparent">Vision</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative py-1 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-violet to-teal transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/CV_LeThanhThai.pdf"
              download
              className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold transition-colors hover:border-teal hover:text-teal"
            >
              <Download className="h-3.5 w-3.5" /> Tải CV
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded bg-gradient-to-r from-violet to-teal px-4 py-2 text-sm font-bold text-void shadow-[0_10px_25px_-10px_rgba(160,104,255,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Liên hệ
            </button>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            className="rounded border border-white/10 p-2 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-void/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex flex-col gap-4 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-300 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-1 rounded bg-gradient-to-r from-violet to-teal px-4 py-2.5 text-center text-sm font-bold text-void"
              >
                Liên hệ ngay
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <header id="home" className="relative flex min-h-[92vh] scroll-mt-24 items-center pb-20 pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-white/5 sm:inset-6">
          <span className="absolute -left-px -top-px h-6 w-6 border-l border-t border-violet/50" />
          <span className="absolute -right-px -top-px h-6 w-6 border-r border-t border-violet/50" />
          <span className="absolute -bottom-px -left-px h-6 w-6 border-b border-l border-violet/50" />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b border-r border-violet/50" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1.25fr_0.85fr]">
          <div>
            <Eyebrow>◎ scan_log · target locked: lê thành thái</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12]">
              Bridging{' '}
              <span className="bg-gradient-to-r from-violet to-teal bg-clip-text text-transparent">
                AI Capabilities
              </span>{' '}
              with Interactive Digital Experiences
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-gray-400">
              Mình là Thái — mọi người hay gọi là <strong className="text-white">Taka</strong>. Một lập trình viên
              AI &amp; Machine Learning, đồng thời là Creative Web &amp; Game Developer — biến mô hình thị giác máy
              tính và ý tưởng sáng tạo thành sản phẩm số có thể chạm vào được.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-violet to-teal px-6 py-3.5 text-sm font-bold text-void shadow-[0_12px_30px_-12px_rgba(160,104,255,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(160,104,255,0.75)]"
              >
                Khám phá dự án <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold transition-colors hover:border-teal hover:text-teal"
              >
                Liên hệ ngay
              </button>
            </div>
            <div className="mt-10 flex items-center gap-2 font-mono text-xs text-gray-500">
              <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" />
              STATUS: ONLINE — sẵn sàng nhận dự án mới
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative h-56 w-56 sm:h-60 sm:w-60">
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#a068ff,#2dd4bf,#f472b6,#a068ff)] p-[3px]">
                <div className="h-full w-full rounded-full bg-void" />
              </div>
              <div className="absolute inset-[10px] flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-void-lift to-void">
                {!avatarError ? (
                  <img
                    src={AVATAR_URL}
                    alt="Lê Thành Thái (Taka)"
                    onError={() => setAvatarError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="bg-gradient-to-br from-white to-teal bg-clip-text font-mono text-5xl font-bold text-transparent">
                    TT
                  </span>
                )}
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-teal bg-void px-3 py-1 font-mono text-[0.65rem] tracking-wide text-teal">
                ID: TAKA.DEV
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ABOUT ================= */}
      <section id="about" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow tone="violet">log_01 · subject profile</Eyebrow>
              <h2 className="mt-3 text-balance font-serif text-3xl font-bold sm:text-4xl">Về Taka</h2>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-gray-400">
                Mình theo đuổi hướng đi giao thoa giữa <strong className="text-white">Computer Vision</strong> và
                trải nghiệm số sáng tạo: huấn luyện mô hình nhận diện hình ảnh, đồng thời dựng nên các không gian Web
                3D và trò chơi có chiều sâu tương tác.
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-gray-400">
                Với mình, một mô hình AI chính xác chỉ thật sự có giá trị khi nó được đặt trong một trải nghiệm mà
                con người muốn dùng — đó là lý do mình luôn đi giữa hai thế giới: nghiên cứu thuật toán và thiết kế
                giao diện.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative rounded-md border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_-20px_rgba(160,104,255,0.35)]"
                  >
                    <CornerFrame />
                    <Icon className="mb-3 h-6 w-6 text-violet" />
                    <div className="font-mono text-3xl font-bold tabular-nums">{stat.value}</div>
                    <div className="mt-1 text-xs leading-snug text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="scroll-mt-24 bg-gradient-to-b from-transparent via-violet/[0.035] to-transparent py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Eyebrow>log_02 · capabilities</Eyebrow>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold sm:text-4xl">Bộ công cụ &amp; năng lực</h2>
          <p className="mt-3 max-w-[60ch] text-base text-gray-400">
            Công cụ mình dùng để đi từ ý tưởng đến sản phẩm hoàn chỉnh.
          </p>

          <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TECH_STACK.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.category}
                  className="rounded-md border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br text-void ${group.gradient}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-bold">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.68rem] text-gray-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Eyebrow tone="violet">log_03 · case files</Eyebrow>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold sm:text-4xl">Dự án nổi bật</h2>
          <p className="mt-3 max-w-[60ch] text-base text-gray-400">
            Lọc theo hướng chuyên môn để xem chi tiết từng &quot;hồ sơ&quot; dự án.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded px-4 py-2 font-mono text-xs tracking-wide transition-all ${
                  activeFilter === f.key
                    ? 'bg-gradient-to-r from-violet to-teal font-bold text-void'
                    : 'border border-white/10 text-gray-400 hover:border-teal hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_-20px_rgba(160,104,255,0.35)]"
                >
                  <CornerFrame />
                  <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-white/10 bg-void-soft">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 20%, rgba(160,104,255,0.28), transparent 55%), radial-gradient(circle at 80% 85%, rgba(45,212,191,0.22), transparent 55%)',
                      }}
                    />
                    <span className="absolute right-3 top-3 rounded border border-teal bg-void/75 px-2 py-1 font-mono text-[0.62rem] text-teal">
                      {project.category.toUpperCase()} · {project.confidence}%
                    </span>
                    <Icon className="relative h-11 w-11 text-white/70" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-serif text-lg font-bold">{project.title}</h3>
                    <p className="text-sm font-semibold text-teal">{project.tagline}</p>
                    <p className="text-sm leading-relaxed text-gray-400">{project.description}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[0.65rem] text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-violet"
                      >
                        XEM CHI TIẾT <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`GitHub: ${project.title}`}
                        className="rounded border border-white/10 px-2 py-1 font-mono text-[0.65rem] font-bold text-gray-400 transition-colors hover:border-teal hover:text-teal"
                      >
                        GH
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROJECT MODAL ================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/85 p-5 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-md border border-violet bg-void-soft p-8 shadow-[0_30px_80px_-20px_rgba(160,104,255,0.45)]"
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Đóng"
              className="absolute right-4 top-4 rounded border border-white/10 bg-white/[0.05] p-1.5 text-gray-400 transition-colors hover:border-teal hover:text-teal"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 id="modal-title" className="pr-8 font-serif text-2xl font-bold">
              {selectedProject.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-teal">{selectedProject.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">{selectedProject.longDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.68rem] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-violet to-teal px-5 py-2.5 text-sm font-bold text-void"
              >
                <ExternalLink className="h-4 w-4" /> Xem GitHub
              </a>
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-white/10 px-5 py-2.5 text-sm font-bold transition-colors hover:border-teal hover:text-teal"
                >
                  Live Demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT ================= */}
      <section id="contact" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Eyebrow>log_04 · transmit</Eyebrow>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold sm:text-4xl">Kết nối với mình</h2>
          <p className="mt-3 max-w-[60ch] text-base text-gray-400">
            Có một dự án hay chỉ đơn giản muốn trò chuyện về AI / Web / Game? Nhắn cho mình qua kênh bên dưới.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-3">
              <a
                href="https://zalo.me/0899034349"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded border border-white/10 bg-white/[0.05] font-mono text-xs font-bold text-teal">
                  ZL
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">
                    Zalo / Điện thoại
                  </span>
                  <span className="text-sm font-semibold">0899 034 349</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
              </a>
              <a
                href="https://www.facebook.com/thai.taka.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded border border-white/10 bg-white/[0.05] font-mono text-xs font-bold text-teal">
                  FB
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">Facebook</span>
                  <span className="text-sm font-semibold">thai.taka.2024</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
              </a>
              <a
                href="https://github.com/ThaiTaka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded border border-white/10 bg-white/[0.05] font-mono text-xs font-bold text-teal">
                  GH
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">GitHub</span>
                  <span className="text-sm font-semibold">ThaiTaka</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-xl transition-all hover:border-violet/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded border border-white/10 bg-white/[0.05] font-mono text-xs font-bold text-teal">
                  @
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">Email</span>
                  <span className="text-sm font-semibold">{EMAIL}</span>
                </span>
                {copied ? (
                  <Check className="ml-auto h-4 w-4 text-teal" />
                ) : (
                  <Copy className="ml-auto h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="rounded-md border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
              {formStatus !== 'idle' && (
                <div
                  className={`mb-5 flex items-center gap-2 rounded px-4 py-3 font-mono text-sm ${
                    formStatus === 'sent'
                      ? 'border border-teal bg-teal/10 text-teal'
                      : 'border border-violet bg-violet/10 text-violet'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> &gt;&gt; Đang truyền dữ liệu...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> &gt;&gt; Đã gửi thành công. Mình sẽ phản hồi sớm nhất!
                    </>
                  )}
                </div>
              )}
              <div className="mb-5">
                <label htmlFor="f-name" className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">
                  Họ tên
                </label>
                <input
                  id="f-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white transition-colors focus:border-teal focus:bg-teal/[0.04] focus:outline-none"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="f-email" className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">
                  Email
                </label>
                <input
                  id="f-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ban@email.com"
                  className="w-full rounded border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white transition-colors focus:border-teal focus:bg-teal/[0.04] focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="f-msg" className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wide text-gray-500">
                  Lời nhắn
                </label>
                <textarea
                  id="f-msg"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Mình muốn trao đổi về..."
                  className="w-full resize-y rounded border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white transition-colors focus:border-teal focus:bg-teal/[0.04] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-violet to-teal px-5 py-3.5 text-sm font-bold text-void shadow-[0_12px_30px_-12px_rgba(160,104,255,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {formStatus === 'sending' ? 'Đang gửi...' : 'Gửi lời nhắn'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-9">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
          <p className="font-mono text-xs text-gray-500">© 2026 TakaVision / Lê Thành Thái. All rights reserved.</p>
          <div className="flex gap-2.5">
            <a
              href="https://github.com/ThaiTaka"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/10 font-mono text-[0.65rem] font-bold text-gray-400 transition-colors hover:border-teal hover:text-teal"
            >
              GH
            </a>
            <a
              href="https://www.facebook.com/thai.taka.2024/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/10 font-mono text-[0.65rem] font-bold text-gray-400 transition-colors hover:border-teal hover:text-teal"
            >
              FB
            </a>
            <a
              href="https://zalo.me/0899034349"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/10 text-gray-400 transition-colors hover:border-teal hover:text-teal"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* ================= BACK TO TOP ================= */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Về đầu trang"
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-violet bg-void-soft text-white shadow-lg transition-all duration-300 ${
          showTop ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}
