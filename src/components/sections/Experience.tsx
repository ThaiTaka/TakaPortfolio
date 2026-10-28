import { experience } from '../../data/experience'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Experience() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="journey-title" eyebrow="Experience & journey">
          The <em>path</em> so far
        </SectionHeading>

        <ol className="relative space-y-6 border-l border-stroke pl-6 sm:pl-10">
          {experience.map((item) => (
            <li key={item.title} className="relative">
              <span className="accent-gradient absolute -left-[1.85rem] top-9 h-3 w-3 rounded-full ring-4 ring-bg sm:-left-[2.85rem]" aria-hidden="true" />
              <Reveal>
                <article className="grid gap-6 rounded-3xl border border-stroke bg-surface p-6 md:grid-cols-[14rem_1fr] md:p-10">
                  <p className="font-display-italic text-3xl text-white/90 md:text-4xl">{item.period}</p>
                  <div>
                    <h3 className="text-xl font-medium md:text-2xl">{item.title}</h3>
                    <p className="eyebrow mt-2">{item.org}</p>
                    <p className="mt-5 text-white/70">{item.body}</p>
                    <ul className="mt-5 space-y-2 text-sm text-white/75 md:text-base">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2.5 h-px w-4 shrink-0 bg-white/40" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
