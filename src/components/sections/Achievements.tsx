import { achievements } from '../../data/achievements'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Achievements() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="section-pad">
      <div className="container-x">
        <SectionHeading
          id="awards-title"
          eyebrow="Achievements & recognition"
          sub="Competitions, research and teaching, in the order they happened."
        >
          Milestones that <em>matter</em>.
        </SectionHeading>

        <ol className="grid gap-4 md:grid-cols-2">
          {achievements.map((a) => (
            <li key={`${a.year}-${a.title}`}>
              <Reveal className="h-full">
                <article className="group flex h-full flex-col gap-5 rounded-3xl border border-stroke bg-surface p-6 transition-colors hover:border-white/20 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display-italic text-5xl leading-none md:text-6xl">{a.year}</p>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                      {a.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium leading-snug md:text-xl">{a.title}</h3>
                    <p lang="vi" className="mt-2 text-sm leading-relaxed text-muted">
                      {a.vi}
                    </p>
                  </div>
                  {a.note && (
                    <p className="accent-gradient-text mt-auto text-sm font-medium">{a.note}</p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
