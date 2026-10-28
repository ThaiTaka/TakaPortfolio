export function ScrollIndicator() {
  return (
    <a
      href="#work"
      aria-label="Scroll to selected work"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="eyebrow">Scroll</span>
      <span className="relative block h-12 w-px overflow-hidden bg-white/15" aria-hidden="true">
        <span className="accent-gradient absolute left-0 top-0 h-1/2 w-full animate-scroll-down" />
      </span>
    </a>
  )
}
