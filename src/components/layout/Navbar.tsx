import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, profile, sectionIds } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { GradientBorder } from '../common/GradientBorder'

const navIds: readonly string[] = navLinks.map((l) => l.id)

export function Navbar() {
  const tracked = useActiveSection(sectionIds)
  // Sections without a navbar link (About, Notes, Explorations, Stats) leave the highlight neutral.
  const active = navIds.includes(tracked) ? tracked : ''
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto relative flex w-full max-w-fit items-center gap-1 rounded-full border border-white/10 bg-surface/80 py-1.5 pl-1.5 pr-1.5 backdrop-blur-md transition-shadow duration-500 sm:gap-2 ${
          scrolled ? 'shadow-[0_10px_40px_rgba(0,0,0,0.6)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
        }`}
      >
        <a href="#home" aria-label="Thai Taka — back to top" className="rounded-full">
          <GradientBorder src={profile.logoSmall} alt="Thai Taka logo" size={40} />
        </a>

        <ul className="ml-1 hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === l.id ? 'bg-white/10 text-text-primary' : 'text-muted hover:text-text-primary'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="gradient-outline ml-1 inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm font-medium transition-transform hover:scale-105 sm:ml-2"
        >
          Say hi&nbsp;<span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-3xl border border-white/10 bg-surface/95 p-2 backdrop-blur-md lg:hidden"
            >
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`block rounded-2xl px-4 py-3 text-base ${active === l.id ? 'bg-white/10' : 'text-muted'}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
