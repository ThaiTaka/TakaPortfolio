import { profile } from '../../data/profile'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'
import { Hobbies } from './Hobbies'

const values = ['Curiosity', 'Practical problem-solving', 'Continuous learning', 'Research', 'Teaching & sharing']

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md">
            <div className="accent-gradient rounded-[2rem] p-[2px]">
              <img
                src={profile.logo}
                alt="Portrait of Lê Thành Thái, also known as Thai Taka"
                width={1152}
                height={1152}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[calc(2rem-2px)] object-cover"
              />
            </div>
            <p className="eyebrow mt-5 text-center">{profile.fullName} · {profile.university}</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading id="about-title" eyebrow="About me">
            Beyond the <em>code</em>.
          </SectionHeading>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-white/75 md:text-lg">
              <p>
                I'm {profile.fullName}, known online as {profile.brand}. I study {profile.field} at {profile.university} and
                enjoy turning ideas into working software. My interests span artificial intelligence, full-stack development,
                algorithms, game development, and practical solutions to real-world problems.
              </p>
              <p>
                Alongside building software, I've been involved in STEM teaching since 2023, helping learners approach
                programming and technology through hands-on experience — an experience that keeps shaping how I explain and
                design things.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="What drives me">
              {values.map((v) => (
                <li key={v} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
      <Hobbies />
    </section>
  )
}
