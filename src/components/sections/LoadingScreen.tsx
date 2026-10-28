import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const WORDS = ['Code', 'Create', 'Innovate']
const DURATION = 2700
const REDUCED_DURATION = 500

interface Props {
  onDone: () => void
}

export function LoadingScreen({ onDone }: Props) {
  const reduced = prefersReducedMotion()
  const total = reduced ? REDUCED_DURATION : DURATION
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  // Counter 000 → 100 driven by requestAnimationFrame
  useEffect(() => {
    let raf = 0
    let finished = false
    const start = performance.now()
    const finish = () => {
      if (finished) return
      finished = true
      onDone()
    }
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    // Safety net: never leave the visitor behind the overlay (e.g. rAF throttled in a background tab).
    const safety = window.setTimeout(finish, total + 3000)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
    }
  }, [onDone, total])

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 900)
    return () => window.clearInterval(id)
  }, [reduced])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${count} percent`}
      exit={{ opacity: 0, y: '-8%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <p className="absolute left-5 top-6 text-[0.7rem] uppercase tracking-[0.3em] text-muted sm:left-10 sm:top-10">
        ThaiTaka / Portfolio
      </p>

      <button
        type="button"
        onClick={onDone}
        className="absolute right-5 top-5 z-10 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:text-text-primary sm:right-10 sm:top-8"
      >
        Skip
      </button>

      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative h-[1.2em] overflow-hidden text-[clamp(3rem,10vw,8rem)] leading-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[wordIndex]}
              className="font-display-italic block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <p
        className="font-display absolute bottom-10 right-5 text-[clamp(4rem,14vw,10rem)] leading-none tabular-nums sm:right-10"
        aria-hidden="true"
      >
        {String(count).padStart(3, '0')}
      </p>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/5" aria-hidden="true">
        <div className="accent-gradient h-full origin-left" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </motion.div>
  )
}
