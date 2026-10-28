import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { projects } from '../../data/projects'
import { achievements } from '../../data/achievements'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../common/Reveal'

// Every figure derives from data files or the owner-provided facts.
const prizeCount = achievements.filter((a) => a.tag === 'Prize').length
const stats = [
  { value: 2023, label: 'STEM education since', pad: 4 },
  { value: projects.length, label: 'Featured projects', pad: 2 },
  { value: 2, label: 'Consecutive years of chess recognition', pad: 2 },
  { value: prizeCount, label: 'Prizes across research, chess, innovation and security', pad: 2 },
]

function Counter({ value, pad }: { value: number; pad: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])

  return (
    <span ref={ref} aria-label={String(value)} className="tabular-nums">
      {String(inView || reduced ? n : 0).padStart(pad, '0')}
    </span>
  )
}

export function Stats() {
  return (
    <section id="stats" aria-label="Key figures" className="section-pad !py-20 md:!py-28">
      <div className="container-x">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 0.08}>
                <div className="border-t border-stroke pt-6">
                  <p className="font-display text-[clamp(4rem,8vw,6.5rem)] leading-none">
                    <Counter value={s.value} pad={s.pad} />
                  </p>
                  <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">{s.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
