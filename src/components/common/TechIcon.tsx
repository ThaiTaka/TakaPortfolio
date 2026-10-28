import { Code } from 'lucide-react'
import {
  siAndroidstudio, siCplusplus, siCss, siDocker, siExpress, siFastapi, siGit, siGithub, siGithubcopilot,
  siGooglecolab, siGooglegemini, siHtml5, siJavascript, siJest, siNextdotjs, siNodedotjs, siOpencv,
  siOpenjdk, siPostgresql, siPrisma, siPython, siReact, siScikitlearn, siSupabase, siTailwindcss,
  siTypescript, siUltralytics, siUnity, siVite, siVitest, siClaude, siFacebook, siZalo, siGmail,
} from 'simple-icons'
import type { SocialKey, TechIconKey } from '../../types/portfolio'

const paths: Record<Exclude<TechIconKey, 'csharp' | 'generic'>, string> = {
  python: siPython.path, javascript: siJavascript.path, typescript: siTypescript.path, cpp: siCplusplus.path,
  java: siOpenjdk.path, react: siReact.path, nextjs: siNextdotjs.path, vite: siVite.path, html5: siHtml5.path,
  css: siCss.path, tailwind: siTailwindcss.path, nodejs: siNodedotjs.path, express: siExpress.path,
  fastapi: siFastapi.path, postgresql: siPostgresql.path, supabase: siSupabase.path, prisma: siPrisma.path,
  opencv: siOpencv.path, scikitlearn: siScikitlearn.path, yolo: siUltralytics.path, unity: siUnity.path,
  androidstudio: siAndroidstudio.path, git: siGit.path, github: siGithub.path, docker: siDocker.path,
  claude: siClaude.path, copilot: siGithubcopilot.path, gemini: siGooglegemini.path, colab: siGooglecolab.path,
  jest: siJest.path, vitest: siVitest.path,
}

const socialPaths: Record<Exclude<SocialKey, never>, string> = {
  email: siGmail.path, github: siGithub.path, facebook: siFacebook.path, zalo: siZalo.path,
}

/** Decorative: the technology name is always rendered as text beside the icon. */
export function TechIcon({ name, size = 18 }: { name: TechIconKey; size?: number }) {
  if (name === 'generic') return <Code size={size} strokeWidth={1.75} aria-hidden="true" />
  if (name === 'csharp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <text x="12" y="15.4" fontSize="8.6" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="Inter, sans-serif">
          C#
        </text>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

export function SocialIcon({ name, size = 22 }: { name: SocialKey; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={socialPaths[name]} />
    </svg>
  )
}
