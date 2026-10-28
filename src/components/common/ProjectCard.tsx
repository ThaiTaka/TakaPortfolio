import type { Project } from '../../types/portfolio'
import { ProjectCover } from './ProjectCover'

interface Props {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: Props) {
  const hero = project.images[0]
  const wide = project.span === 12
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className={`group relative isolate flex w-full overflow-hidden rounded-3xl border border-stroke bg-surface text-left ${
        wide ? 'min-h-[32rem] md:min-h-[34rem]' : 'min-h-[32rem] md:min-h-[32rem]'
      }`}
    >
      {hero ? (
        <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_50%,transparent)]">
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 ${hero.position ?? ''}`}
          />
        </div>
      ) : (
        project.cover && <ProjectCover cover={project.cover} name={project.name} />
      )}
      {project.imageNote && (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.7rem] text-white/80 backdrop-blur-sm">
          Preview branch
        </span>
      )}
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-colors duration-500 group-hover:from-black/80" />

      <div className="relative z-10 mt-auto flex w-full flex-col gap-4 p-6 md:p-8">
        <p className="eyebrow text-white/60">{project.category}</p>
        <h3 className="font-display-italic text-[clamp(2.25rem,5vw,3.75rem)] leading-none">{project.name}</h3>
        <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">{project.tagline}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Main technologies">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              {t}
            </li>
          ))}
        </ul>
        <span className="gradient-outline mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
          View — {project.name} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </button>
  )
}
