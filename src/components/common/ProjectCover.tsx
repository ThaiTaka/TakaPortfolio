import type { Project } from '../../types/portfolio'

/**
 * Typographic cover for projects whose repositories ship no screenshots.
 * It is a graphic motif, not a depiction of the product's interface.
 */
export function ProjectCover({ cover, name }: { cover: NonNullable<Project['cover']>; name: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(70% 90% at 85% 100%, rgba(78,133,191,0.25), transparent 65%), linear-gradient(180deg, #0b0c0e, #0a0a0a)',
      }}
      role="img"
      aria-label={`Ảnh bìa minh họa của ${name}`}
    >
      <span
        aria-hidden="true"
        className="font-display-italic absolute -right-2 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(5rem,14vw,9rem)] leading-none text-white/10"
      >
        {cover.glyph}
      </span>
      <span className="eyebrow absolute bottom-4 left-4">Chưa có ảnh chụp màn hình</span>
    </div>
  )
}
