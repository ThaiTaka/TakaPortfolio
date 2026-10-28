import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  children: ReactNode
  sub?: string
  id?: string
}

/** CV-style section header: eyebrow, serif title with an optional <em> accent, and a rule beneath. */
export function SectionHeading({ eyebrow, children, sub, id }: Props) {
  return (
    <header className="mb-10 md:mb-12">
      <Reveal>
        <p className="eyebrow mb-3 flex items-center gap-3">
          <span className="accent-gradient inline-block h-px w-8" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] tracking-tight [&_em]:font-display-italic [&_em]:pr-1"
        >
          {children}
        </h2>
        {sub && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" aria-hidden="true" />
      </Reveal>
    </header>
  )
}
