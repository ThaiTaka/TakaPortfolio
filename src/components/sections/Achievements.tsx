import { FlaskConical, GraduationCap, Medal, type LucideIcon } from 'lucide-react'
import { achievements } from '../../data/achievements'
import { ui } from '../../data/ui'
import type { Achievement, AchievementKind } from '../../types/portfolio'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const kindIcon: Record<AchievementKind, LucideIcon> = { prize: Medal, research: FlaskConical, teaching: GraduationCap }

// Group by year, keeping the data order inside each year.
const groups = achievements.reduce<{ year: string; items: Achievement[] }[]>((acc, a) => {
  const g = acc.find((x) => x.year === a.year)
  if (g) g.items.push(a)
  else acc.push({ year: a.year, items: [a] })
  return acc
}, [])

export function Achievements() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="awards-title" eyebrow={ui.awards.eyebrow} sub={ui.awards.sub}>
          <em>Thành tích</em> &amp; giải thưởng
        </SectionHeading>

        <ol className="divide-y divide-stroke rounded-3xl border border-stroke bg-surface">
          {groups.map((g) => (
            <li key={g.year} className="grid gap-4 p-5 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 md:p-8">
              <p className="font-display-italic text-4xl leading-none text-white/90 md:text-5xl">{g.year}</p>
              <ul className="space-y-5">
                {g.items.map((a) => {
                  const Icon = kindIcon[a.kind]
                  return (
                    <li key={a.title} className="flex gap-4">
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#89aacc]">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <Reveal className="min-w-0">
                        <p className="eyebrow !text-[0.7rem]">
                          {ui.awards.kind[a.kind]}
                          {a.level ? ` · ${a.level}` : ''}
                        </p>
                        <h3 className="mt-1 text-base font-medium leading-snug md:text-lg">{a.title}</h3>
                        {a.note && <p className="accent-gradient-text mt-1.5 text-sm font-medium">{a.note}</p>}
                      </Reveal>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
