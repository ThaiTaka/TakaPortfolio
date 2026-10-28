import { ChessKnight, Gamepad2 } from 'lucide-react'
import type { HobbyIcon as IconName } from '../../types/portfolio'

const svg = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Decorative icons: the visible label next to each one carries the meaning. */
export function HobbyIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'gamepad':
      return <Gamepad2 size={36} strokeWidth={1.5} aria-hidden="true" />
    case 'chess':
      return <ChessKnight size={36} strokeWidth={1.5} aria-hidden="true" />
    case 'swimming':
      // Swimmer: head, reaching arm and body above two lines of water
      return (
        <svg {...svg}>
          <circle cx="17.5" cy="6.5" r="2" />
          <path d="M3.5 12.5c2.4-2.6 5.6-3.7 8.6-2.4l3.4 1.5" />
          <path d="m12.1 10.1 2.4-2.2 2.3.2" />
          <path d="M2.5 16.2c1.4-1.1 2.8-1.1 4.2 0s2.8 1.1 4.2 0 2.8-1.1 4.2 0 2.8 1.1 4.2 0M2.5 20c1.4-1.1 2.8-1.1 4.2 0s2.8 1.1 4.2 0 2.8-1.1 4.2 0 2.8 1.1 4.2 0" />
        </svg>
      )
    case 'badminton':
      // Shuttlecock: cork, skirt and feather ribs
      return (
        <svg {...svg}>
          <path d="M8.3 15.5 4.2 4.6M12 15.5V3.2M15.7 15.5l4.1-10.9M4.2 4.6C8.2 3 15.8 3 19.8 4.6" />
          <path d="M8.3 15.5h7.4v1.2a3.7 3.7 0 0 1-7.4 0z" />
          <path d="M9 19.5a3.7 3.7 0 0 0 6 0" />
        </svg>
      )
    case 'basketball':
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18M5.4 5.4c3.7 3.8 3.7 9.4 0 13.2M18.6 5.4c-3.7 3.8-3.7 9.4 0 13.2" />
        </svg>
      )
  }
}
