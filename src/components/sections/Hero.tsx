import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { VideoBackground } from '../common/VideoBackground'
import { AnimatedButton } from '../common/AnimatedButton'
import { ScrollIndicator } from '../common/ScrollIndicator'

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  // GSAP entrance — starts only once the loading overlay has gone.
  useLayoutEffect(() => {
    if (!ready || reduced || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 })
        .fromTo(
          '.hero-blur',
          { opacity: 0, filter: 'blur(10px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
          '-=0.8',
        )
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  useEffect(() => {
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  // Hidden until the entrance runs; if GSAP never runs the inline style is removed once ready.
  const hide = !ready && !reduced ? { opacity: 0 } : undefined

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-28 pt-32 sm:px-8">
      <VideoBackground src={profile.videoSrc} />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="hero-blur eyebrow mb-8 !text-white/70" style={hide}>
          {profile.eyebrow}
        </p>

        <h1 className="hero-name" style={hide}>
          <span className="font-display-italic block text-[clamp(4.5rem,17vw,13rem)] leading-[0.9] tracking-tight">
            {profile.brand}.
          </span>
          <span className="mt-4 block text-sm font-medium uppercase tracking-[0.4em] text-white/70 sm:text-base">
            {profile.fullName}
          </span>
        </h1>

        <p className="hero-blur mt-10 text-lg text-white/85 sm:text-2xl" style={hide}>
          A creative mind building{' '}
          <span className="sr-only">meaningful technology. Roles: {profile.roles.join(', ')}.</span>
          <span aria-hidden="true" className="font-display-italic inline-block min-w-[1ch]">
            <span key={roleIndex} className="accent-gradient-text inline-block animate-role-fade-in pr-1">
              {profile.roles[roleIndex]}
            </span>
          </span>
        </p>

        <p className="hero-blur mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base" style={hide}>
          {profile.heroCopy}
        </p>

        <div className="hero-blur mt-10 flex flex-col items-center gap-3 sm:flex-row" style={hide}>
          <AnimatedButton href="#work">
            Explore My Work <span aria-hidden="true">↗</span>
          </AnimatedButton>
          <AnimatedButton href="#contact" variant="ghost">
            Get in Touch
          </AnimatedButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
