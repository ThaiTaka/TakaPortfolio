import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  /** Shorter, subtler entrance for above-the-fold content */
  fast?: boolean
}

/** Fade-and-rise on scroll into view. Renders statically for reduced-motion users. */
export function Reveal({ children, delay = 0, className, fast = false }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: fast ? 12 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: fast ? 0.45 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
