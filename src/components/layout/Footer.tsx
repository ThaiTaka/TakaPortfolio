import { profile } from '../../data/profile'
import { GradientBorder } from '../common/GradientBorder'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 pt-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <GradientBorder src={profile.logoSmall} alt="Thai Taka logo" size={36} />
          <p className="text-sm text-muted">
            © {year} {profile.brand} — {profile.fullName}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-text-primary">
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
