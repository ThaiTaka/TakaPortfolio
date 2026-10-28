import { ArrowUpRight } from 'lucide-react'
import { notes } from '../../data/experience'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Journal() {
  return (
    <section id="notes" aria-labelledby="notes-title" className="section-pad">
      <div className="container-x">
        <SectionHeading
          id="notes-title"
          eyebrow="Insights & explorations"
          sub="Research notes and design docs I've written inside my projects. They live in the repositories — nothing here is a polished blog post yet."
        >
          Recent <em>thoughts</em>
        </SectionHeading>

        <ul className="space-y-3">
          {notes.map((n, i) => (
            <li key={n.href}>
              <Reveal delay={i * 0.06}>
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[2rem] border border-stroke bg-surface p-3 pr-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display-italic grid h-16 w-16 shrink-0 place-items-center rounded-full bg-bg text-2xl text-white/80 sm:h-20 sm:w-20 sm:text-3xl"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow ">
                      {n.category} · {n.source}
                    </span>
                    <span className="mt-1 block text-base font-medium leading-snug sm:text-xl">{n.title}</span>
                    <span className="mt-1 hidden text-sm text-muted sm:block">{n.description}</span>
                  </span>
                  <ArrowUpRight className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-text-primary" size={22} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
