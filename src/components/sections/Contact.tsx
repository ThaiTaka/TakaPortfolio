import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { VideoBackground } from '../common/VideoBackground'
import { AnimatedButton } from '../common/AnimatedButton'
import { Reveal } from '../common/Reveal'
import { Footer } from '../layout/Footer'

const MARQUEE = "BUILDING WHAT'S NEXT • "

export function Contact() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !track.current) return
    const ctx = gsap.context(() => {
      // Content is rendered twice; moving by -50% loops seamlessly.
      gsap.to(track.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    }, track)
    return () => ctx.revert()
  }, [reduced])

  const chunk = MARQUEE.repeat(4)

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden px-5 pt-28 pb-10 sm:px-8 lg:px-12">
      <VideoBackground src={profile.videoSrc} flip lazy />
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="-mx-5 mb-16 overflow-hidden sm:-mx-8 lg:-mx-12" aria-hidden="true">
          <div ref={track} className="flex w-max whitespace-nowrap">
            <span className="font-display-italic pr-4 text-[clamp(4rem,12vw,10rem)] leading-none text-white/10">{chunk}</span>
            <span className="font-display-italic pr-4 text-[clamp(4rem,12vw,10rem)] leading-none text-white/10">{chunk}</span>
          </div>
        </div>

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6">{profile.availability}</p>
            <h2 id="contact-title" className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[1] tracking-tight">
              Let's build something <em className="font-display-italic">meaningful</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/65">
              Projects, research ideas, teaching, or just a conversation about technology — my inbox is open.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AnimatedButton href={`mailto:${profile.email}`}>
                Let's Connect <span aria-hidden="true">↗</span>
              </AnimatedButton>
              <AnimatedButton href="https://github.com/ThaiTaka" variant="ghost">
                GitHub
              </AnimatedButton>
            </div>
            <p className="mt-6 text-sm text-muted">{profile.email}</p>
          </div>
        </Reveal>

        <Footer />
      </div>
    </section>
  )
}
