import { Gamepad2, Waves } from 'lucide-react'
import type { HobbyIcon as IconName } from '../../types/portfolio'

const common = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Decorative icons: the label next to each one carries the meaning. */
export function HobbyIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'gamepad':
      return <Gamepad2 size={28} strokeWidth={1.5} aria-hidden="true" />
    case 'waves':
      return <Waves size={28} strokeWidth={1.5} aria-hidden="true" />
    case 'chess':
      // Pawn
      return (
        <svg {...common}>
          <circle cx="12" cy="6.5" r="2.5" />
          <path d="M10 10.5h4M10.8 10.5c-.3 3-1.8 4-2.8 6h8c-1-2-2.5-3-2.8-6" />
          <path d="M6.5 16.5h11M5.5 20h13" />
        </svg>
      )
    case 'badminton':
      // Shuttlecock
      return (
        <svg {...common}>
          <path d="M9 14.5 5.5 4.5M12 14.5V3.5M15 14.5l3.5-10M5.5 4.5c4 1.2 9 1.2 13 0" />
          <path d="M9 14.5h6a3 3 0 0 1 0 0v1.5a3 3 0 0 1-6 0z" />
          <path d="M9 18.5a3 3 0 0 0 6 0" />
        </svg>
      )
    case 'basketball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18M5.6 5.6c3.5 3.5 3.5 9.3 0 12.8M18.4 5.6c-3.5 3.5-3.5 9.3 0 12.8" />
        </svg>
      )
  }
}
