import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  children: ReactNode
  sub?: string
  id?: string
}

/** Heading with an eyebrow; wrap the italic word in <em> inside children. */
export function SectionHeading({ eyebrow, children, sub, id }: Props) {
  return (
    <header className="mb-12 max-w-3xl md:mb-16">
      <Reveal>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2
          id={id}
          className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1] tracking-tight [&_em]:font-display-italic [&_em]:pr-1"
        >
          {children}
        </h2>
        {sub && <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
      </Reveal>
    </header>
  )
}
