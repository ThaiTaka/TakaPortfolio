import { Navbar } from '../components/layout/Navbar'
import { About } from '../components/sections/About'
import { Achievements } from '../components/sections/Achievements'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Hobbies } from '../components/sections/Hobbies'
import { Projects } from '../components/sections/Projects'
import { Research } from '../components/sections/Research'
import { Skills } from '../components/sections/Skills'
import { ui } from '../data/ui'

/** CV order: profile → about → skills → projects → education & experience → awards → research → hobbies → contact. */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-text-primary focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {ui.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Research />
        <Hobbies />
        <Contact />
      </main>
    </>
  )
}
