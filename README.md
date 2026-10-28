# Thai Taka — Lê Thành Thái · Portfolio 2026

Dark, cinematic, single-page portfolio for **Lê Thành Thái (Thai Taka)** — Information Technology student at Da Lat University: software development, AI, STEM education.

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS 3 (config in `tailwind.config.ts`) · GSAP + ScrollTrigger · Motion for React (`motion/react`) · hls.js · lucide-react · oxlint.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run lint       # oxlint
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally (http://localhost:4173)
npm run test:e2e   # end-to-end + axe accessibility suite (needs `preview` running and Chrome)
```

## Structure

```text
src/
├── app/App.tsx              # page composition, lazy sections, intro gating
├── components/
│   ├── common/              # AnimatedButton, GradientBorder, Reveal, SectionHeading,
│   │                        # VideoBackground, ProjectCard/Modal/Cover, ScrollIndicator
│   ├── layout/              # Navbar, Footer
│   └── sections/            # LoadingScreen, Hero, SelectedWorks, About (+ Hobbies), Skills, Experience,
│                            # Achievements, Journal, Explorations, Stats, Contact
├── data/                    # ← all personal content lives here
├── hooks/                   # useReducedMotion, useActiveSection, useDialog
├── styles/index.css         # theme tokens, .accent-gradient, keyframe helpers
└── types/portfolio.ts
public/                      # ThaiTaka.jpg (official logo), favicons, og-image, projects/, robots.txt, sitemap.xml
```

## Animation architecture

Each element is owned by exactly one system:

| System | Used for |
| --- | --- |
| CSS / Tailwind keyframes | `scroll-down`, `role-fade-in`, `gradient-shift`, hover states |
| Motion for React | loading overlay + rotating words, scroll reveals, modals, mobile menu |
| GSAP | hero entrance timeline, desktop parallax (ScrollTrigger), contact marquee |

All GSAP code runs inside `gsap.context()` / `gsap.matchMedia()` and is reverted on unmount. `prefers-reduced-motion` disables the video, the marquee, parallax and entrance timelines. The intro plays once per browser session (`sessionStorage`) and has a Skip button plus a safety timeout.

The parallax gallery uses a CSS `sticky` title with scroll-scrubbed columns on ≥1024 px, and a plain responsive grid below that.

The hero/contact backgrounds stream HLS through hls.js (loaded on demand, destroyed on unmount, paused off-screen). A dark gradient fallback is always rendered underneath, so a failed stream never leaves an empty section.

## Updating content (all in `src/data/`)

- **Profile, contact, socials, roles, availability** → `profile.ts` (email, social links, video URL, hero copy). The footer/contact email comes from `profile.email`.
- **Projects** → `projects.ts`. Add a typed `Project`; `span` (5/7/12) controls the bento width. Put screenshots in `public/projects/` and reference them in `images`. Projects without images get a typographic cover via `cover`. Only add `links` you can verify; there are no placeholder links.
- **Skills** → `skills.ts` (groups shown as tabs; `featured` items get the gradient chip).
- **Achievements** → `achievements.ts`; stats are derived from it and from `projects.ts` (`Stats.tsx`).
- **Hobbies** → `hobbies.ts` (label, Vietnamese name, one-line description, icon key). Icons are mapped in `components/common/HobbyIcon.tsx` (lucide for gaming/swimming, inline SVG for the rest). Keep chess here as an interest only — awards stay in `achievements.ts`.
- **Navbar** → links in `navLinks` (`profile.ts`). `sectionIds` lists every section id used for active-state tracking; sections without a nav link leave the highlight neutral.
- **Journey and research notes** → `experience.ts`.
- **SEO** → `index.html` (title, description, Open Graph, JSON-LD `Person`), `public/robots.txt`, `public/sitemap.xml`. These use the homepage configured on the GitHub repository (`https://taka-portfolio-kq32.vercel.app`); change it everywhere if the domain changes.

## Assets

`public/ThaiTaka.jpg` is the original brand image (never edited). `logo-160.png`, `favicon-*.png`, `apple-touch-icon.png` are square crops derived from it. `og-image.png` is a share card built from the same photo. Project visuals in `public/projects/` are screenshots and diagrams copied from the projects' own GitHub repositories.

## Testing

`scripts/e2e.mjs` (playwright-core + axe-core) covers the loading screen, reduced motion, HLS playback and failure fallback, keyboard/modal behaviour, mobile menu, navbar active state, content checks, link/image checks, SEO consistency, axe (WCAG 2 A/AA + best practice), and overflow at 320/390/768/1440/1920 px. Run `npm run build && npm run preview`, then `npm run test:e2e` (set `CHROME_PATH` or `BASE_URL` if needed). It uses browser emulation only — no physical devices or screen readers.

## Deployment

Production: <https://taka-portfolio-kq32.vercel.app>. The Vercel project `taka-portfolio-kq32` is connected to this repository through the Vercel GitHub integration, so every push to `main` deploys to production automatically (Vite preset, `npm run build`, output `dist/`). Pull requests get preview deployments. To roll back, promote an earlier deployment in the Vercel dashboard.

## Project accuracy notes

Project descriptions are taken from each repository's README on its default branch. ReadMateAI's screenshots come from an unmerged redesign branch and are labelled "Preview branch" in the UI; update `projects.ts` once that work lands in `main`.
