import { useRef } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { useDialog } from '../../hooks/useDialog'
import { ProjectCover } from './ProjectCover'
import { AnimatedButton } from './AnimatedButton'

interface Props {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref, true, onClose)
  const titleId = `project-${project.id}-title`

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-stroke bg-surface sm:rounded-3xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60 backdrop-blur-sm transition-colors hover:bg-black"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="relative h-56 w-full overflow-hidden bg-bg sm:h-72">
          {project.images[0] ? (
            <img src={project.images[0].src} alt={project.images[0].alt} className={`h-full w-full object-cover ${project.images[0].position ?? ''}`} />
          ) : (
            project.cover && <ProjectCover cover={project.cover} name={project.name} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className="p-6 sm:p-10">
          <p className="eyebrow mb-3">{project.category}</p>
          <h3 id={titleId} className="font-display-italic text-5xl leading-none sm:text-6xl">
            {project.name}
          </h3>
          <p className="mt-2 text-xs text-muted">Repository: {project.repo}</p>
          {project.imageNote && <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted">{project.imageNote}</p>}
          <p className="mt-6 text-base leading-relaxed text-white/85">{project.summary}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="eyebrow mb-3">Highlights</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-white/75">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="accent-gradient mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="eyebrow mb-3">Status (from README)</h4>
              <p className="text-sm leading-relaxed text-white/75">{project.status}</p>
              <h4 className="eyebrow mb-3 mt-6">Stack</h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.images.slice(1).map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className={`h-48 w-full rounded-2xl border border-stroke object-cover ${img.position ?? ''}`} />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <AnimatedButton key={l.href} href={l.href}>
                {l.label} <span aria-hidden="true">↗</span>
              </AnimatedButton>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
