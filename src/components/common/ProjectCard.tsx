import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { ui } from '../../data/ui'
import { ProjectCover } from './ProjectCover'

/** Project experience card: every fact is visible without hover or interaction. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [main, ...rest] = project.images
  const titleId = `project-${project.id}`
  return (
    <article
      aria-labelledby={titleId}
      className="overflow-hidden rounded-3xl border border-stroke bg-surface"
    >
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Visuals */}
        <div className="border-b border-stroke bg-bg/60 p-3 lg:border-b-0 lg:border-r">
          <div className="flex flex-col gap-2 lg:sticky lg:top-24">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/[0.04]">
            {main ? (
              <img
                src={main.src}
                alt={main.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full ${main.fit === 'contain' ? 'bg-white object-contain' : 'object-cover'} ${main.position ?? ''}`}
              />
            ) : (
              project.cover && <ProjectCover cover={project.cover} name={project.name} />
            )}
            {project.imageNote && (
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                {ui.projects.previewBranch}
              </span>
            )}
          </div>
          {rest.length > 0 && (
            <ul className={`grid gap-2 ${rest.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {rest.map((img) => (
                <li key={img.src} className="overflow-hidden rounded-xl bg-bg">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-24 w-full sm:h-28 ${img.fit === 'contain' ? 'bg-white object-contain' : 'object-cover'} ${img.position ?? ''}`}
                  />
                </li>
              ))}
            </ul>
          )}
          {project.imageNote && <p className="px-1 pb-1 text-xs leading-relaxed text-muted">{project.imageNote}</p>}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-8">
          <p className="eyebrow">
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span> · {project.category}
          </p>
          <h3 id={titleId} className="font-display-italic mt-3 text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none">
            {project.name}
          </h3>
          <p className="mt-3 text-base text-white/80">{project.tagline}</p>

          <dl className="mt-6 space-y-5 text-sm leading-relaxed md:text-[0.95rem]">
            <div>
              <dt className="eyebrow mb-1">{ui.projects.role}</dt>
              <dd className="text-white/80">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">{ui.projects.problem}</dt>
              <dd className="text-white/75">{project.problem}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">{ui.projects.solution}</dt>
              <dd className="text-white/75">{project.solution}</dd>
            </div>
          </dl>

          <h4 className="eyebrow mb-3 mt-6">{ui.projects.features}</h4>
          <ul className="grid gap-x-6 gap-y-2 text-sm text-white/75 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="accent-gradient mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-muted">
            <strong className="font-medium text-white/80">{ui.projects.status}: </strong>
            {project.status}
          </p>

          <h4 className="sr-only">{ui.projects.stack}</h4>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={ui.projects.stack}>
            {project.stack.map((t) => (
              <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/85">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-outline inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm transition-transform hover:scale-[1.03]"
              >
                {l.label} <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(mở trong thẻ mới)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
