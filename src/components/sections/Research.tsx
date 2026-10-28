import { ArrowUpRight } from 'lucide-react'
import { notes } from '../../data/experience'
import { ui } from '../../data/ui'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="research-title" eyebrow={ui.research.eyebrow} sub={ui.research.sub}>
          <em>Nghiên cứu</em> &amp; tài liệu
        </SectionHeading>

        <ul className="grid gap-3 md:grid-cols-2">
          {notes.map((n, i) => (
            <li key={n.href}>
              <Reveal delay={(i % 2) * 0.05} className="h-full">
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-3xl border border-stroke bg-surface p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] md:p-6"
                >
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow !text-[0.7rem]">
                      {n.category} · {n.source}
                    </span>
                    <span className="mt-2 block text-base font-medium leading-snug md:text-lg">{n.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">{n.description}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-primary"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{ui.research.opensNewTab}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
