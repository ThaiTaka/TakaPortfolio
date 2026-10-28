import { GraduationCap } from 'lucide-react'
import { education, experience } from '../../data/experience'
import { ui } from '../../data/ui'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="experience-title" eyebrow={ui.experience.eyebrow}>
          Học vấn &amp; <em>kinh nghiệm</em>
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          {/* Education */}
          <div>
            <h3 className="eyebrow mb-4">{ui.experience.education}</h3>
            <Reveal>
              <article className="rounded-3xl border border-stroke bg-surface p-6 md:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-[#89aacc]">
                  <GraduationCap size={22} aria-hidden="true" />
                </span>
                <h4 className="mt-5 text-xl font-medium">{education.school}</h4>
                <p className="mt-1 text-white/80">{education.major}</p>
                <p className="eyebrow mt-3">{education.status}</p>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/70">
                  {education.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-white/40" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          {/* Experience timeline */}
          <div>
            <h3 className="eyebrow mb-4">{ui.experience.work}</h3>
            <ol className="relative space-y-4 border-l border-stroke pl-6 sm:pl-8">
              {experience.map((item) => (
                <li key={item.title} className="relative">
                  <span
                    className="accent-gradient absolute -left-[1.9rem] top-8 h-3 w-3 rounded-full ring-4 ring-bg sm:-left-[2.4rem]"
                    aria-hidden="true"
                  />
                  <Reveal>
                    <article className="rounded-3xl border border-stroke bg-surface p-6 md:p-7">
                      <p className="eyebrow !text-[#89aacc]">{item.period}</p>
                      <h4 className="mt-2 text-lg font-medium md:text-xl">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted">{item.org}</p>
                      <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">{item.body}</p>
                      <ul className="mt-4 space-y-2 text-sm text-white/70">
                        {item.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-2.5 h-px w-4 shrink-0 bg-white/40" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
