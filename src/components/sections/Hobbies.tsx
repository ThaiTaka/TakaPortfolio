import { hobbies } from '../../data/hobbies'
import { ui } from '../../data/ui'
import { HobbyIcon } from '../common/HobbyIcon'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

/** Independent section. Cards are informational only — they are not links or buttons. */
export function Hobbies() {
  return (
    <section id="hobbies" aria-labelledby="hobbies-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="hobbies-title" eyebrow={ui.hobbies.eyebrow}>
          <em>Sở thích</em> cá nhân
        </SectionHeading>

        <Reveal>
          <p className="font-display-italic text-2xl text-white/90 md:text-3xl">{ui.hobbies.subtitle}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{ui.hobbies.intro}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:gap-4 lg:grid-cols-5">
          {hobbies.map((h, i) => (
            <li key={h.id} className={i === hobbies.length - 1 ? 'min-[420px]:col-span-2 lg:col-span-1' : ''}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="gradient-outline group h-full rounded-3xl border border-stroke bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <span className="inline-block text-[#89aacc] transition-colors duration-300 group-hover:text-[#4e85bf]">
                    <HobbyIcon name={h.icon} />
                  </span>
                  <h3 className="mt-6 text-xl font-medium">{h.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{h.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
