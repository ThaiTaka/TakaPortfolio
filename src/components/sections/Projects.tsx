import { projects } from '../../data/projects'
import { ui } from '../../data/ui'
import { ProjectCard } from '../common/ProjectCard'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="projects-title" eyebrow={ui.projects.eyebrow} sub={ui.projects.sub}>
          Dự án <em>tiêu biểu</em>
        </SectionHeading>
        <ol className="space-y-6 md:space-y-8">
          {projects.map((p, i) => (
            <li key={p.id}>
              <Reveal>
                <ProjectCard project={p} index={i} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
