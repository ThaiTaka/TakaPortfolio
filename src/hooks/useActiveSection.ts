import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently crossing the middle band of the viewport.
 * A single IntersectionObserver is shared by every id; no scroll listener is used.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        if (visible.size === 0) return
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
        if (best) setActive(best[0])
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] },
    )

    const observe = () => {
      for (const id of key.split('|')) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }
    observe()
    // Lazy-loaded sections mount later; re-scan shortly after.
    const retries = [1500, 4000].map((ms) => window.setTimeout(observe, ms))

    return () => {
      retries.forEach(window.clearTimeout)
      observer.disconnect()
    }
  }, [key])

  return active
}
