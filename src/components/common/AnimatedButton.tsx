import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const base =
  'gradient-outline inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] min-h-11'
const variants: Record<Variant, string> = {
  primary: 'bg-text-primary text-bg',
  ghost: 'border border-white/15 bg-white/5 text-text-primary backdrop-blur-sm',
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type Props = (AnchorProps | ButtonProps) & { variant?: Variant; children: ReactNode }

export function AnimatedButton({ variant = 'primary', className = '', children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as AnchorProps
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchor}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonProps)}>
      {children}
    </button>
  )
}
