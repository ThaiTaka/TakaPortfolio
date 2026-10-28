import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Navbar } from '../components/layout/Navbar'
import { LoadingScreen } from '../components/sections/LoadingScreen'
import { Hero } from '../components/sections/Hero'
import { SelectedWorks } from '../components/sections/SelectedWorks'
import { About } from '../components/sections/About'
import { Skills } from '../components/sections/Skills'
import { Experience } from '../components/sections/Experience'
import { Achievements } from '../components/sections/Achievements'
import { Journal } from '../components/sections/Journal'
import { Stats } from '../components/sections/Stats'

// Heavier sections (GSAP ScrollTrigger / video) load after first paint.
const loadExplorations = () => import('../components/sections/Explorations').then((m) => ({ default: m.Explorations }))
const loadContact = () => import('../components/sections/Contact').then((m) => ({ default: m.Contact }))
const Explorations = lazy(loadExplorations)
const Contact = lazy(loadContact)

const SEEN_KEY = 'thaitaka:intro-seen'

function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [loading, setLoading] = useState(() => !introAlreadySeen())

  const done = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable — intro may replay, which is harmless */
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600))
    idle(() => {
      void loadExplorations()
      void loadContact()
    })
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="intro" onDone={done} />}</AnimatePresence>
      <div inert={loading}>
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <SelectedWorks />
        <About />
        <Skills />
        <Experience />
        <Achievements />
        <Journal />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Explorations />
        </Suspense>
        <Stats />
        <Suspense fallback={<section id="contact" className="min-h-screen" aria-label="Contact" />}>
          <Contact />
        </Suspense>
      </main>
      </div>
    </>
  )
}
