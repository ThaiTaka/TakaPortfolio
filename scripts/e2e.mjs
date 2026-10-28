// End-to-end + accessibility checks. Usage: npm run build && npm run preview, then npm run test:e2e
// Env: BASE_URL (default http://localhost:4173/), CHROME_PATH (path to Chrome/Chromium; defaults to the installed Chrome channel)
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import { createRequire } from 'node:module'

const BASE = process.env.BASE_URL || 'http://localhost:4173/'
const exe = process.env.CHROME_PATH || undefined
const channel = exe ? undefined : 'chrome'
const axeSrc = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8')
const browser = await chromium.launch({ executablePath: exe, channel, headless: true })
const results = []
const ok = (name, pass, detail = '') => { results.push({ name, pass, detail }); console.log(pass ? 'PASS' : 'FAIL', name, detail) }

async function open(opts = {}, w = 1440, h = 900) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...opts })
  const page = await ctx.newPage()
  page.errors = []
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()))
  page.on('pageerror', (e) => page.errors.push('pageerror ' + e.message))
  return { ctx, page }
}

// ---------- A. Loading screen ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE)
  const samples = []
  for (let i = 0; i < 12; i++) {
    samples.push(await page.evaluate(() => document.querySelector('[role=status] p[aria-hidden]')?.textContent ?? null))
    await page.waitForTimeout(300)
  }
  ok('loading: counter animates from 000', samples[0] !== null && samples.some((s) => s && s !== '000'), samples.join(','))
  await page.waitForTimeout(1500)
  ok('loading: overlay removed after ~3.5-5s', (await page.locator('[role=status]').count()) === 0)
  const overflow = await page.evaluate(() => document.body.style.overflow)
  ok('loading: body scroll restored', overflow !== 'hidden', `overflow='${overflow}'`)
  const inert = await page.evaluate(() => !!document.querySelector('[inert]'))
  ok('loading: page not inert after load', !inert)
  await page.getByRole('link', { name: 'Skills' }).first().click()
  await page.waitForTimeout(1200)
  const y = await page.evaluate(() => ({ sy: window.scrollY, hash: location.hash }))
  ok('loading: nav interactive after load', y.sy > 500 && y.hash === '#skills', JSON.stringify(y))
  // revisit in same session: intro should not replay
  await page.reload(); await page.waitForTimeout(300)
  ok('loading: no replay in same session', (await page.locator('[role=status]').count()) === 0)
  ok('loading: no console errors', page.errors.length === 0, page.errors.join(' | '))
  await ctx.close()
}
{ // Skip button
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Skip' }).click(); await page.waitForTimeout(1200)
  ok('loading: Skip dismisses overlay', (await page.locator('[role=status]').count()) === 0)
  await ctx.close()
}
{ // reduced motion
  const { ctx, page } = await open({ reducedMotion: 'reduce' })
  await page.goto(BASE); await page.waitForTimeout(1800)
  ok('reduced-motion: overlay gone within 1.8s', (await page.locator('[role=status]').count()) === 0)
  ok('reduced-motion: no <video> element', (await page.locator('video').count()) === 0)
  const hero = await page.evaluate(() => { const e = document.querySelector('.hero-name'); return e ? getComputedStyle(e).opacity : null })
  ok('reduced-motion: hero text visible', hero === '1', 'opacity=' + hero)
  const marquee = await page.evaluate(() => { const t = document.querySelector('#contact .w-max'); return t ? getComputedStyle(t).transform : 'none' })
  ok('reduced-motion: marquee static', marquee === 'none' || marquee === 'matrix(1, 0, 0, 1, 0, 0)', marquee)
  await ctx.close()
}

// ---------- B. Video ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(6500)
  const v = await page.evaluate(() => { const e = document.querySelector('#home video'); return { paused: e.paused, rs: e.readyState, t: e.currentTime, w: e.videoWidth, op: getComputedStyle(e).opacity } })
  ok('video: hero plays via hls.js', !v.paused && v.rs >= 3 && v.t > 0.5 && v.op === '1', JSON.stringify(v))
  await ctx.close()
}
{ // blocked stream: hero must still render
  const { ctx, page } = await open()
  await page.route(/mux\.com/, (r) => r.abort())
  await page.goto(BASE); await page.waitForTimeout(5500)
  const h1 = await page.locator('h1').isVisible()
  const op = await page.evaluate(() => getComputedStyle(document.querySelector('#home video')).opacity)
  ok('video-fail: hero visible, video hidden, fallback shown', h1 && op === '0', 'opacity=' + op)
  ok('video-fail: no page errors', page.errors.filter((e) => /pageerror/.test(e)).length === 0, page.errors.join('|').slice(0, 200))
  await ctx.close()
}

// ---------- C. Keyboard / a11y (desktop) ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(4600)
  const seq = []
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    seq.push(await page.evaluate(() => {
      const a = document.activeElement; const cs = getComputedStyle(a)
      return { tag: a.tagName, label: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 28), outline: cs.outlineStyle + ' ' + cs.outlineWidth, ring: cs.boxShadow !== 'none' }
    }))
  }
  console.log(seq.map((s) => `${s.tag}:${s.label}[${s.outline}]`).join('\n'))
  ok('kbd: every focused element shows an outline', seq.every((s) => s.outline.startsWith('solid') && !s.outline.endsWith(' 0px')))
  ok('kbd: no focus lost to body', seq.every((s) => s.tag !== 'BODY'))

  // project modal
  await page.evaluate(() => document.getElementById('work').scrollIntoView())
  await page.waitForTimeout(900)
  const card = page.getByRole('button', { name: /View — AgriXAI-Farmer/ })
  await card.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(700)
  ok('modal: opens with Enter, role=dialog', (await page.locator('[role=dialog]').count()) === 1)
  const inside = await page.evaluate(() => document.querySelector('[role=dialog]').contains(document.activeElement))
  ok('modal: focus moved inside', inside)
  let leaked = false
  for (let i = 0; i < 14; i++) { await page.keyboard.press('Tab'); if (!(await page.evaluate(() => document.querySelector('[role=dialog]').contains(document.activeElement)))) leaked = true }
  ok('modal: Tab is trapped', !leaked)
  ok('modal: labelled by title', await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); return !!document.getElementById(d.getAttribute('aria-labelledby')) }))
  await page.keyboard.press('Escape'); await page.waitForTimeout(700)
  ok('modal: Escape closes', (await page.locator('[role=dialog]').count()) === 0)
  const back = await page.evaluate(() => document.activeElement?.textContent?.includes('AgriXAI-Farmer'))
  ok('modal: focus returns to card', back)
  ok('modal: body scroll unlocked', (await page.evaluate(() => document.body.style.overflow)) !== 'hidden')
  // links in modal have real hrefs
  await card.click(); await page.waitForTimeout(600)
  const hrefs = await page.locator('[role=dialog] a').evaluateAll((as) => as.map((a) => a.href))
  ok('modal: links are real GitHub URLs', hrefs.length > 0 && hrefs.every((h) => h.startsWith('https://github.com/ThaiTaka/')), hrefs.join(','))
  await page.mouse.click(5, 450); await page.waitForTimeout(600)
  ok('modal: backdrop click closes', (await page.locator('[role=dialog]').count()) === 0)

  // skills tabs
  await page.evaluate(() => document.getElementById('skills').scrollIntoView()); await page.waitForTimeout(700)
  await page.getByRole('tab', { name: 'Languages' }).focus()
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200)
  const sel = await page.evaluate(() => document.querySelector('[role=tab][aria-selected=true]').textContent)
  ok('skills: arrow keys switch tabs', sel === 'Frontend', sel)

  // lightbox
  await page.evaluate(() => document.getElementById('explorations').scrollIntoView()); await page.waitForTimeout(900)
  const shot = page.getByRole('button', { name: /enlarge image/i }).first()
  await shot.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(600)
  ok('lightbox: opens', (await page.locator('[role=dialog]').count()) === 1)
  await page.keyboard.press('Escape'); await page.waitForTimeout(600)
  ok('lightbox: Escape closes', (await page.locator('[role=dialog]').count()) === 0)
  ok('desktop: no console errors', page.errors.length === 0, page.errors.join(' | ').slice(0, 300))
  await ctx.close()
}

// ---------- D. Mobile menu ----------
{
  const { ctx, page } = await open({}, 390, 844)
  await page.goto(BASE); await page.waitForTimeout(4600)
  const btn = page.getByRole('button', { name: 'Open menu' })
  ok('mobile: menu button visible, nav links hidden', (await btn.isVisible()) && !(await page.locator('nav ul.hidden').first().isVisible()))
  await btn.click(); await page.waitForTimeout(400)
  ok('mobile: aria-expanded true', (await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')) === 'true')
  await page.keyboard.press('Escape'); await page.waitForTimeout(400)
  ok('mobile: Escape closes menu', (await page.locator('#mobile-menu').count()) === 0)
  await btn.click(); await page.waitForTimeout(300)
  await page.locator('#mobile-menu').getByRole('link', { name: 'Awards' }).click(); await page.waitForTimeout(1200)
  const st = await page.evaluate(() => ({ h: location.hash, open: !!document.getElementById('mobile-menu'), top: document.getElementById('awards').getBoundingClientRect().top }))
  ok('mobile: link navigates, menu closes, section clears navbar', st.h === '#awards' && !st.open && st.top >= 0 && st.top < 120, JSON.stringify(st))
  await ctx.close()
}

// ---------- E. Links ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(4600)
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)) } })
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))
  const hashes = [...new Set(links.filter((h) => h.startsWith('#')))]
  const missing = []
  for (const h of hashes) if (!(await page.locator(h).count())) missing.push(h)
  ok('links: every #anchor has a target', missing.length === 0, missing.join(','))
  const ext = [...new Set(links.filter((h) => /^https?:/.test(h)))]
  const bad = []
  for (const u of ext) {
    try { const r = await fetch(u, { method: 'GET', redirect: 'follow' }); if (!(r.status < 400)) bad.push(`${u} ${r.status}`) } catch { bad.push(`${u} ERR`) }
  }
  console.log('external links:', ext.join(' '))
  ok('links: external links respond', bad.length === 0, bad.join(' | '))
  const notes = await page.locator('#notes a').evaluateAll((as) => as.map((a) => a.href))
  const nb = []
  for (const u of notes) { const r = await fetch(u); if (r.status >= 400) nb.push(u + ' ' + r.status) }
  ok('links: research-note docs exist on GitHub', nb.length === 0, nb.join(' | '))
  const imgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))
  ok('images: none broken', imgs.length === 0, imgs.join(','))
  const noAlt = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute('alt')).length)
  ok('images: all have alt attribute', noAlt === 0)
  await ctx.close()
}

// ---------- F. SEO ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(800)
  const s = await page.evaluate(() => ({
    canon: document.querySelector('link[rel=canonical]')?.href,
    ogurl: document.querySelector('meta[property="og:url"]')?.content,
    ogimg: document.querySelector('meta[property="og:image"]')?.content,
    tw: document.querySelector('meta[name="twitter:image"]')?.content,
    ld: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
    h1s: document.querySelectorAll('h1').length,
    title: document.title,
  }))
  console.log(JSON.stringify({ ...s, ld: { url: s.ld.url, image: s.ld.image, sameAs: s.ld.sameAs } }))
  ok('seo: canonical == og:url == ld.url', s.canon === s.ogurl && s.ogurl === s.ld.url)
  ok('seo: exactly one h1', s.h1s === 1)
  await ctx.close()
}


// ---------- G. Navbar active section ----------
{
  const expected = { home: 'Home', work: 'Work', about: null, skills: 'Skills', journey: 'Journey', awards: 'Awards', notes: null, explorations: null, stats: null, contact: 'Contact' }
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, page } = await open({}, w, h)
    await page.goto(BASE); await page.waitForTimeout(4600)
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)) } window.scrollTo(0, 0) })
    await page.waitForTimeout(4500)
    for (const id of Object.keys(expected)) {
      await page.evaluate((i) => { const el = document.getElementById(i); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight * 0.45 + 120) }, id)
      await page.waitForTimeout(500)
      if (w < 1024) await page.getByRole('button', { name: 'Open menu' }).click()
      const cur = await page.evaluate(() => document.querySelector('nav a[aria-current]')?.textContent.trim() ?? null)
      if (w < 1024) await page.keyboard.press('Escape')
      ok(`navbar@${w}: ${id} highlights ${expected[id]}`, cur === expected[id], 'got ' + cur)
    }
    await ctx.close()
  }
}

// ---------- H. Content + hobbies ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE); await page.waitForTimeout(4600)
  const text = await page.evaluate(() => document.body.innerText)
  for (const p of ['ReadMateAI', 'AgriXAI-Farmer', 'HUIM', 'DYE-LMS', 'The Call Beneath']) ok('content: project ' + p, text.includes(p))
  for (const k of ['Python', 'C#', 'C++', 'Second Prize', 'Consolation Prize', 'First Prize — Lam Dong', 'Third Prize', 'mYth00s', 'Began teaching STEM']) ok('content: ' + k, text.includes(k))
  for (const k of ['Gaming', 'Chess', 'Swimming', 'Badminton', 'Basketball', 'Chơi game', 'Cờ vua', 'Bơi lội', 'Cầu lông', 'Bóng rổ']) ok('hobbies: ' + k, text.toLowerCase().includes(k.toLowerCase()))
  ok('hobbies: cards are not links or buttons', (await page.locator('#hobbies-title').evaluate((h) => h.closest('div[aria-labelledby]').querySelectorAll('a,button').length)) === 0)
  ok('content: no Unity claim for The Call Beneath card', !/The Call Beneath[sS]{0,400}Unity/.test(await page.locator('#work').innerText()))
  ok('content: no leftover sample identities', !/Michael Smith|Chicago/.test(text))
  await ctx.close()
}

// ---------- I. Axe (WCAG 2 A/AA + best practice) ----------
for (const [w, h, rm] of [[1440, 900, 'no-preference'], [390, 844, 'no-preference'], [1440, 900, 'reduce']]) {
  const { ctx, page } = await open({ reducedMotion: rm }, w, h)
  await page.goto(BASE); await page.waitForTimeout(4600)
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)) } window.scrollTo(0, 0) })
  await page.waitForTimeout(1500)
  await page.addScriptTag({ content: axeSrc })
  const v = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })).violations.map((x) => x.id + ' x' + x.nodes.length))
  ok(`axe@${w} (${rm}): zero violations`, v.length === 0, v.join(', '))
  await ctx.close()
}

// ---------- J. Responsive overflow ----------
for (const w of [320, 390, 768, 1440, 1920]) {
  const { ctx, page } = await open({}, w, 900)
  await page.goto(BASE); await page.waitForTimeout(4600)
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) } })
  const o = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth])
  ok(`responsive@${w}: no horizontal overflow`, o[0] <= o[1], o.join('/'))
  ok(`responsive@${w}: no console errors`, page.errors.length === 0, page.errors.join('|').slice(0, 200))
  await ctx.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
if (failed.length) console.log('FAILED:\n' + failed.map((f) => '- ' + f.name + ' ' + f.detail).join('\n'))

process.exit(failed.length ? 1 : 0)
