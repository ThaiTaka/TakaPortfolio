import { ArrowUpRight } from 'lucide-react'
import { contactLinks, profile } from '../../data/profile'
import { ui } from '../../data/ui'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'
import { SocialIcon } from '../common/TechIcon'
import { Footer } from '../layout/Footer'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad !pb-8 !pt-8 md:!pt-12">
      <div className="container-x">
        <SectionHeading id="contact-title" eyebrow={ui.contact.eyebrow} sub={ui.contact.body}>
          Hãy cùng làm điều <em>có ý nghĩa</em>
        </SectionHeading>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((c, i) => (
            <li key={c.key}>
              <Reveal delay={i * 0.05} className="h-full">
                <a
                  href={c.href}
                  {...(c.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="gradient-outline group flex h-full flex-col gap-4 rounded-3xl border border-stroke bg-surface p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6"
                >
                  <span className="flex items-center justify-between text-[#89aacc]">
                    <SocialIcon name={c.key} />
                    <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-text-primary" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="eyebrow block !text-[0.7rem]">{c.label}</span>
                    <span className="mt-1 block break-all text-sm font-medium text-white/90 md:text-base">{c.value}</span>
                  </span>
                  {c.key !== 'email' && <span className="sr-only">(mở trong thẻ mới)</span>}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{ui.contact.availability} Email chính: {profile.email}</p>

        <Footer />
      </div>
    </section>
  )
}
