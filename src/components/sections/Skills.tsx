import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { skillGroups } from '../../data/skills'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const lead = [
  { name: 'Python', note: 'AI/ML, research, tooling, teaching' },
  { name: 'C#', note: 'Unity and desktop software' },
  { name: 'C++', note: 'Algorithms and systems practice' },
]

export function Skills() {
  const uid = useId()
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const group = skillGroups[index]

  const onKey = (e: KeyboardEvent) => {
    const last = skillGroups.length - 1
    let next = index
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          sub="Self-reported strengths, grouped by what I actually build with them. No fake percentage bars."
        >
          A toolkit for <em>building</em>
        </SectionHeading>

        <ul className="mb-14 grid gap-4 md:grid-cols-3">
          {lead.map((l, i) => (
            <li key={l.name}>
              <Reveal delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface p-7 transition-colors hover:border-white/20 md:p-6 lg:p-9">
                  <p className="eyebrow mb-6">Strongest</p>
                  <p className="font-display-italic accent-gradient-text pr-2 text-5xl leading-none lg:text-7xl">{l.name}</p>
                  <p className="mt-5 text-sm text-muted">{l.note}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div role="tablist" aria-label="Skill categories" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {skillGroups.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`${uid}-tab-${g.id}`}
                aria-selected={i === index}
                aria-controls={`${uid}-panel`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`min-h-11 shrink-0 rounded-full border px-5 text-sm transition-colors ${
                  i === index ? 'border-transparent bg-text-primary text-bg' : 'border-white/15 text-muted hover:text-text-primary'
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${group.id}`}
            className="mt-6 rounded-3xl border border-stroke bg-surface p-6 md:p-10"
          >
            <p className="max-w-xl text-base text-white/70 md:text-lg">{group.blurb}</p>
            <ul className="mt-8 flex flex-wrap gap-2.5 md:gap-3">
              {group.items.map((item) => {
                const strong = group.featured?.includes(item)
                return (
                  <li
                    key={item}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors hover:border-white/40 md:text-base ${
                      strong ? 'accent-gradient border-transparent font-medium text-bg' : 'border-white/15 text-white/85'
                    }`}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
