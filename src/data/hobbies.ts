import type { Hobby } from '../types/portfolio'

/** Personal interests only — no rankings, ratings or competitive claims. Chess awards live in achievements.ts. */
export const hobbies: Hobby[] = [
  {
    id: 'gaming',
    label: 'Gaming',
    vi: 'Chơi game',
    description: 'Exploring virtual worlds and interactive experiences.',
    icon: 'gamepad',
  },
  {
    id: 'chess',
    label: 'Chess',
    vi: 'Cờ vua',
    description: 'Enjoying strategy, calculation and creative thinking.',
    icon: 'chess',
  },
  {
    id: 'swimming',
    label: 'Swimming',
    vi: 'Bơi lội',
    description: 'Finding balance through time in the water.',
    icon: 'waves',
  },
  {
    id: 'badminton',
    label: 'Badminton',
    vi: 'Cầu lông',
    description: 'Enjoying movement and friendly matches.',
    icon: 'badminton',
  },
  {
    id: 'basketball',
    label: 'Basketball',
    vi: 'Bóng rổ',
    description: 'Enjoying teamwork and the energy of the game.',
    icon: 'basketball',
  },
]

export const hobbiesIntro =
  "I love building technology, but life isn't only about writing code. Away from the screen I enjoy gaming, chess, swimming, badminton and basketball — interests that bring creativity, focus and a healthy balance to my days."
