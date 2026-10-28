import { hobbies, hobbiesIntro } from '../../data/hobbies'
import { Reveal } from '../common/Reveal'
import { HobbyIcon } from '../common/HobbyIcon'

/** Compact editorial strip shown inside the About section. Cards are informational, not links. */
export function Hobbies() {
  return (
    <div className="container-x mt-20 md:mt-28" aria-labelledby="hobbies-title">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end md:gap-16">
          <div>
            <p className="eyebrow mb-4">Personal interests</p>
            <h3 id="hobbies-title" className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight">
              When I'm not <em className="font-display-italic pr-1">coding</em>
            </h3>
          </div>
          <p className="text-base leading-relaxed text-white/70">{hobbiesIntro}</p>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-5">
        {hobbies.map((h, i) => (
          <li key={h.id} className="min-[420px]:last:col-span-2 lg:last:col-span-1">
            <Reveal delay={i * 0.06} className="h-full">
              <div className="gradient-outline group h-full rounded-3xl border border-stroke bg-surface p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6">
                <span className="inline-block text-[#89aacc] transition-colors duration-300 group-hover:text-[#4e85bf]">
                  <HobbyIcon name={h.icon} />
                </span>
                <p className="mt-6 text-lg font-medium">{h.label}</p>
                <p lang="vi" className="text-xs uppercase tracking-[0.18em] text-muted">
                  {h.vi}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{h.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
