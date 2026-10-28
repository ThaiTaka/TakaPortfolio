import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useDialog } from '../../hooks/useDialog'
import { SectionHeading } from '../common/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface Shot {
  src: string
  alt: string
  project: string
  aspect: string
  position?: string
  rotate: number
}

// Only genuine visuals from the projects' repositories.
const shots: Shot[] = [
  { src: '/projects/agrixai-webadmin.png', alt: 'AgriLog web admin overview', project: 'AgriXAI-Farmer · web admin', aspect: 'aspect-[16/10]', rotate: -2.5 },
  { src: '/projects/huim-pipeline.png', alt: 'HUIM-IPS pipeline diagram', project: 'HUIM-IPS · pipeline', aspect: 'aspect-[16/8]', rotate: 2 },
  { src: '/projects/agrixai-home.png', alt: 'AgriLog mobile home screen', project: 'AgriXAI-Farmer · mobile', aspect: 'aspect-[4/5]', position: 'object-top', rotate: 2.5 },
  { src: '/projects/huim-errormap.png', alt: 'HUIM-IPS positioning error map', project: 'HUIM-IPS · error map', aspect: 'aspect-[3/2]', rotate: -2 },
  { src: '/projects/agrixai-voice.png', alt: 'AgriLog voice entry screen', project: 'AgriXAI-Farmer · voice entry', aspect: 'aspect-[4/5]', position: 'object-top', rotate: -3 },
  { src: '/projects/huim-cdf.png', alt: 'HUIM-IPS error CDF comparison', project: 'HUIM-IPS · error CDF', aspect: 'aspect-[16/10]', rotate: 3 },
]

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref, true, onClose)
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={ref} role="dialog" aria-modal="true" aria-label={shot.alt} className="relative max-h-full max-w-5xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image"
          className="absolute -top-2 right-0 z-10 grid h-11 w-11 -translate-y-full place-items-center rounded-full border border-white/20 bg-black/60"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <img src={shot.src} alt={shot.alt} className="max-h-[80vh] w-auto max-w-full rounded-2xl" />
        <p className="eyebrow mt-4 text-center">{shot.project}</p>
      </div>
    </motion.div>
  )
}

function ShotButton({ shot, onOpen, className = '' }: { shot: Shot; onOpen: (s: Shot) => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      aria-haspopup="dialog"
      aria-label={`${shot.project} — enlarge image: ${shot.alt}`}
      className={`parallax-shot group block w-full overflow-hidden rounded-2xl border border-stroke bg-surface text-left ${className}`}
      data-rotate={shot.rotate}
    >
      <img
        src={shot.src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${shot.aspect} w-full object-cover transition-transform duration-700 group-hover:scale-105 ${shot.position ?? ''}`}
      />
      <span className="block px-4 py-3 text-xs text-muted">{shot.project}</span>
    </button>
  )
}

export function Explorations() {
  const section = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Shot | null>(null)
  const close = useCallback(() => setOpen(null), [])

  useLayoutEffect(() => {
    if (!section.current) return
    const mm = gsap.matchMedia()
    // Desktop + motion allowed: scroll-scrubbed parallax. Anything else gets the plain grid below.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const area = section.current!
      gsap.to('.col-a', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: area.querySelector('.parallax-stage'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      gsap.to('.col-b', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: area.querySelector('.parallax-stage'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      gsap.utils.toArray<HTMLElement>('.parallax-stage .parallax-shot').forEach((el) => {
        const r = Number(el.dataset.rotate ?? 0)
        gsap.fromTo(el, { rotate: r }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } })
      })
    }, section)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [])

  const colA = shots.filter((_, i) => i % 2 === 0)
  const colB = shots.filter((_, i) => i % 2 === 1)

  return (
    <section id="explorations" ref={section} aria-labelledby="explore-title" className="relative px-5 sm:px-8 lg:px-12">
      {/* Mobile / tablet / reduced-motion: simple responsive gallery */}
      <div className="container-x py-24 lg:hidden">
        <SectionHeading id="explore-title" eyebrow="Visual explorations">
          Inside the <em>process</em>.
        </SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2">
          {shots.map((s) => (
            <li key={s.src}>
              <ShotButton shot={s} onOpen={setOpen} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: sticky centred title with two columns drifting at different speeds */}
      <div className="parallax-stage container-x relative hidden overflow-hidden lg:block" style={{ height: '200vh' }}>
        <div className="sticky top-0 z-0 flex h-screen flex-col items-center justify-center text-center">
          <p className="eyebrow mb-6">Visual explorations</p>
          <h2 className="font-display text-[clamp(3rem,5.5vw,6rem)] leading-none tracking-tight">
            Inside the <em className="font-display-italic">process</em>.
          </h2>
          <p className="mt-6 max-w-md text-muted">Screens and diagrams from the apps and research above.</p>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-[1fr_1.7fr_1fr] gap-8 px-2">
          <ul className="col-a pointer-events-auto flex flex-col justify-around gap-10 pt-[20vh]">
            {colA.map((s) => (
              <li key={s.src}>
                <ShotButton shot={s} onOpen={setOpen} />
              </li>
            ))}
          </ul>
          <div aria-hidden="true" />
          <ul className="col-b pointer-events-auto flex flex-col justify-around gap-10 pt-[45vh]">
            {colB.map((s) => (
              <li key={s.src}>
                <ShotButton shot={s} onOpen={setOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox key={open.src} shot={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
