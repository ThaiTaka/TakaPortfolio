import { achievements } from '../../data/achievements'
import { contactLinks, profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { ui } from '../../data/ui'
import { AnimatedButton } from '../common/AnimatedButton'
import { Reveal } from '../common/Reveal'
import { SocialIcon } from '../common/TechIcon'

// Counts come from the data files so they cannot drift from the page content.
const prizeCount = achievements.filter((a) => a.kind === 'prize').length
const facts = [
  { value: '2023', label: 'Bắt đầu tham gia giảng dạy STEM' },
  { value: String(projects.length), label: 'Dự án tiêu biểu' },
  { value: String(prizeCount), label: 'Giải thưởng' },
  { value: 'Python · C# · C++', label: 'Ngôn ngữ thế mạnh', wide: true },
]

/** Profile header: the official portrait is the first thing on the page. */
export function Hero() {
  return (
    <section id="home" aria-labelledby="profile-name" className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-8 md:pb-14 md:pt-32 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 55% at 22% 38%, rgba(78,133,191,0.16), transparent 70%), radial-gradient(40% 45% at 85% 0%, rgba(137,170,204,0.08), transparent 70%)',
        }}
      />
      <div className="container-x relative grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14 xl:gap-16">
        {/* Portrait */}
        <Reveal fast className="mx-auto lg:mx-0">
          <div className="relative w-[min(62vw,206px)] sm:w-[280px] lg:w-[400px] xl:w-[420px]">
            <span aria-hidden="true" className="absolute -inset-3 rounded-[2.25rem] border border-white/[0.07] sm:-inset-5 lg:-inset-6" />
            <span aria-hidden="true" className="accent-gradient absolute inset-0 -z-10 rounded-[2rem] opacity-30 blur-2xl" />
            <div className="accent-gradient group rounded-[1.75rem] p-[3px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:rounded-[2rem]">
              <div className="overflow-hidden rounded-[calc(1.75rem-3px)] bg-bg sm:rounded-[calc(2rem-3px)]">
                <img
                  src={profile.photo.md}
                  srcSet={`${profile.photo.sm} 480w, ${profile.photo.md} 768w, ${profile.photo.full} 1152w`}
                  sizes="(min-width: 1280px) 420px, (min-width: 1024px) 400px, (min-width: 640px) 280px, 206px"
                  alt="Ảnh chân dung Lê Thành Thái (Thai Taka), ngồi bên suối trong khu vườn"
                  width={1152}
                  height={1152}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Identity. On mobile the actions come right after the name; on desktop they follow the intro. */}
        <div className="flex flex-col text-center lg:text-left">
          <Reveal fast delay={0.08} className="order-1">
            <p className="eyebrow text-balance !tracking-[0.18em] sm:!tracking-[0.28em]">{profile.headline}</p>
            <h1 id="profile-name" className="mt-3 sm:mt-4">
              <span className="font-display block text-[clamp(1.9rem,8.2vw,2.75rem)] leading-[1.02] lg:text-[3.5rem] tracking-tight">{profile.fullNameDisplay}</span>
              <span className="font-display-italic accent-gradient-text mt-0.5 block pr-2 text-[clamp(1.5rem,6vw,2.5rem)] leading-tight">{profile.brand}</span>
            </h1>
          </Reveal>

          <Reveal fast delay={0.16} className="order-2 mt-5 sm:mt-7 lg:order-4 lg:mt-7">
            <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
              <AnimatedButton href="#projects" className="col-span-full">
                {ui.hero.viewProjects}
              </AnimatedButton>
              <AnimatedButton href="#skills" variant="ghost" className="!px-4">
                {ui.hero.exploreSkills}
              </AnimatedButton>
              <AnimatedButton href="#contact" variant="ghost" className="!px-4">
                {ui.hero.contact}
              </AnimatedButton>
              {profile.cvPdf && (
                <AnimatedButton href={profile.cvPdf} variant="ghost" download className="col-span-full">
                  Tải CV
                </AnimatedButton>
              )}
            </div>
          </Reveal>

          <Reveal fast delay={0.24} className="order-3 lg:order-2">
            <ul className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:mt-6 lg:justify-start" aria-label={ui.hero.focusLabel}>
              {profile.focus.map((f) => (
                <li key={f} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[0.8rem] text-white/85 sm:px-3.5 sm:py-1.5 sm:text-sm">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal fast delay={0.3} className="order-4 lg:order-3">
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-white/75 sm:text-base lg:mx-0 lg:mt-5">{profile.intro}</p>
          </Reveal>

          <Reveal fast delay={0.36} className="order-5">
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center lg:mt-6 lg:justify-start" aria-label="Liên hệ nhanh">
              {contactLinks.map((c) => (
                <li key={c.key}>
                  <a
                    href={c.href}
                    {...(c.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 text-sm text-white/90 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-text-primary sm:w-auto"
                  >
                    <span className="text-[#89aacc]">
                      <SocialIcon name={c.key} size={18} />
                    </span>
                    {c.label}
                    {c.key !== 'email' && <span className="sr-only">(mở trong thẻ mới)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Key facts */}
      <Reveal fast delay={0.4}>
        <ul
          aria-label={ui.hero.factsLabel}
          className="container-x relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke md:mt-12 lg:grid-cols-4"
        >
          {facts.map((f) => (
            <li key={f.label} className={`bg-surface px-4 py-4 md:px-7 md:py-5 ${f.wide ? 'col-span-2 lg:col-span-1' : ''}`}>
              <p className={`font-display leading-none ${f.wide ? 'text-[clamp(1.3rem,2.3vw,1.7rem)] whitespace-nowrap' : 'text-[clamp(1.75rem,3.5vw,2.4rem)]'}`}>{f.value}</p>
              <p className="mt-2 text-xs leading-snug text-muted md:text-sm">{f.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
