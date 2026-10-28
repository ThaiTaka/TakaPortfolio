import { Brain, Code2, LayoutDashboard, Server, Smartphone, Wrench, type LucideIcon } from 'lucide-react'
import { leadLanguages, otherLanguages, skillGroups } from '../../data/skills'
import { ui } from '../../data/ui'
import type { GroupIconKey, SkillItem } from '../../types/portfolio'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'
import { TechIcon } from '../common/TechIcon'

const groupIcons: Record<GroupIconKey, LucideIcon> = {
  code: Code2,
  layout: LayoutDashboard,
  server: Server,
  brain: Brain,
  smartphone: Smartphone,
  wrench: Wrench,
}

function Chip({ item }: { item: SkillItem }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-sm text-white/85">
      {item.icon && (
        <span className="text-[#89aacc]">
          <TechIcon name={item.icon} size={16} />
        </span>
      )}
      {item.name}
    </li>
  )
}

/** Every skill group is visible at once — no tabs, accordions or carousels. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="skills-title" eyebrow={ui.skills.eyebrow} sub={ui.skills.sub}>
          <em>Kỹ năng</em> chuyên môn
        </SectionHeading>

        {/* Languages: Python, C# and C++ lead */}
        <Reveal>
          <div className="rounded-3xl border border-stroke bg-surface p-5 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[#89aacc]">
                <Code2 size={20} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-medium md:text-xl">Ngôn ngữ lập trình</h3>
            </div>
            <ul className="grid gap-3 md:grid-cols-3">
              {leadLanguages.map((l) => (
                <li
                  key={l.name}
                  className="relative overflow-hidden rounded-2xl border border-[#4e85bf]/40 bg-gradient-to-br from-[#4e85bf]/15 via-transparent to-transparent p-5"
                >
                  <p className="eyebrow !text-[#89aacc]">{ui.skills.strongest}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[#89aacc]">
                      <TechIcon name={l.icon} size={34} />
                    </span>
                    <p className="font-display-italic text-4xl leading-none md:text-5xl">{l.name}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{l.note}</p>
                </li>
              ))}
            </ul>
            <h4 className="eyebrow mb-3 mt-6">{ui.skills.otherLanguages}</h4>
            <ul className="flex flex-wrap gap-2">
              {otherLanguages.map((o) => (
                <Chip key={o.name} item={o} />
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Remaining groups */}
        <ul className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[g.icon]
            const last = i === skillGroups.length - 1 && skillGroups.length % 2 === 1
            return (
              <li key={g.id} className={last ? 'md:col-span-2' : ''}>
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <article aria-labelledby={`skill-${g.id}`} className="h-full rounded-3xl border border-stroke bg-surface p-5 md:p-8">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#89aacc]">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 id={`skill-${g.id}`} className="text-lg font-medium md:text-xl">
                        {g.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{g.blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <Chip key={item.name} item={item} />
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
