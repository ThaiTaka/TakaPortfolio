import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects } from '../../data/projects'
import type { Project } from '../../types/portfolio'
import { SectionHeading } from '../common/SectionHeading'
import { ProjectCard } from '../common/ProjectCard'
import { ProjectModal } from '../common/ProjectModal'
import { Reveal } from '../common/Reveal'

export function SelectedWorks() {
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="work" aria-labelledby="work-title" className="section-pad">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          sub="A collection of software, AI research, educational platforms, and interactive experiences I've helped bring to life."
        >
          Featured <em>projects</em>
        </SectionHeading>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={`col-span-12 flex ${p.span === 12 ? 'md:col-span-12' : p.span === 7 ? 'md:col-span-7' : 'md:col-span-5'}`}>
              <ProjectCard project={p} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  )
}
