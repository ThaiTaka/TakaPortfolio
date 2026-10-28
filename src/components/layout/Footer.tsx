import { profile } from '../../data/profile'
import { ui } from '../../data/ui'
import { GradientBorder } from '../common/GradientBorder'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-white/10 pt-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <GradientBorder src={profile.logoSmall} alt="Logo Thai Taka" size={36} />
          <p className="text-sm text-muted">
            © {year} {ui.footer.rights}
          </p>
        </div>
        <a href="#home" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors hover:text-text-primary">
          {ui.footer.toTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
