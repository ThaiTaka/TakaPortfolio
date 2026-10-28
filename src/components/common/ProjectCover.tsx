import type { Project } from '../../types/portfolio'

/**
 * Typographic cover for projects whose repositories ship no screenshots.
 * It is a graphic motif, not a depiction of the product's interface.
 */
export function ProjectCover({ cover, name }: { cover: NonNullable<Project['cover']>; name: string }) {
  const bg: Record<typeof cover.kind, string> = {
    morse:
      'radial-gradient(70% 90% at 80% 10%, rgba(78,133,191,0.28), transparent 65%), linear-gradient(180deg, #060b12, #0a0a0a)',
    reading:
      'radial-gradient(70% 90% at 20% 0%, rgba(137,170,204,0.22), transparent 65%), linear-gradient(180deg, #0d0f12, #0a0a0a)',
    code: 'radial-gradient(70% 90% at 85% 100%, rgba(78,133,191,0.25), transparent 65%), linear-gradient(180deg, #0b0c0e, #0a0a0a)',
  }
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: bg[cover.kind] }} role="img" aria-label={`${name} cover graphic`}>
      <span
        aria-hidden="true"
        className="font-display-italic absolute -right-4 top-6 select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] leading-none text-white/[0.06] md:top-1"
      >
        {cover.glyph}
      </span>
    </div>
  )
}
