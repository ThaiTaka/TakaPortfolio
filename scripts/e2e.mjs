// End-to-end + accessibility checks for the CV-style portfolio.
// Usage: npm run build && npm run preview, then npm run test:e2e
// Env: BASE_URL (default http://localhost:4173/), CHROME_PATH (path to Chrome/Chromium; defaults to the installed Chrome channel)
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import { createRequire } from 'node:module'

const BASE = process.env.BASE_URL || 'http://localhost:4173/'
const exe = process.env.CHROME_PATH || undefined
const axeSrc = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8')
const browser = await chromium.launch({ executablePath: exe, channel: exe ? undefined : 'chrome', headless: true })

const results = []
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(pass ? 'PASS' : 'FAIL', name, detail)
}

async function open(opts = {}, w = 1440, h = 900) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...opts })
  const page = await ctx.newPage()
  page.errors = []
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()))
  page.on('pageerror', (e) => page.errors.push('pageerror ' + e.message))
  return { ctx, page }
}
const scrollThrough = (page) =>
  page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 80))
    }
    window.scrollTo(0, 0)
  })

// ---------- A. First paint: profile photo and name immediately, nothing blocking ----------
for (const [w, h, minPhoto] of [[1440, 900, 395], [390, 844, 190], [320, 640, 190]]) {
  const { ctx, page } = await open({}, w, h)
  await page.addInitScript(() => {
    window.__cls = 0
    window.__lcp = 0
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value })).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__lcp = e.startTime })).observe({ type: 'largest-contentful-paint', buffered: true })
  })
  await page.goto(BASE)
  await page.waitForTimeout(1200)
  const s = await page.evaluate(() => {
    const img = document.querySelector('#home img')
    const r = img.getBoundingClientRect()
    const h1 = document.querySelector('h1')
    return { loaded: img.complete && img.naturalWidth > 0, w: Math.round(r.width), ratio: +(r.width / r.height).toFixed(2), inView: r.top < innerHeight && r.bottom > 0, h1: h1.textContent, h1Visible: h1.getBoundingClientRect().top < innerHeight, overlay: !!document.querySelector('[role=status]'), video: document.querySelectorAll('video').length, lang: document.documentElement.lang }
  })
  ok(`first-paint@${w}: ThaiTaka photo loaded, in view, >=${minPhoto}px, square (no distortion)`, s.loaded && s.inView && s.w >= minPhoto && s.ratio === 1, JSON.stringify(s))
  ok(`first-paint@${w}: name visible without scrolling`, s.h1Visible && s.h1.includes('LÊ THÀNH THÁI'), s.h1)
  ok(`first-paint@${w}: no loading overlay, no video`, !s.overlay && s.video === 0)
  ok(`first-paint@${w}: html lang=vi`, s.lang === 'vi')
  const m = await page.evaluate(() => ({ cls: window.__cls, lcp: window.__lcp }))
  ok(`vitals@${w}: LCP < 2500ms and CLS < 0.1 (local, unthrottled)`, m.lcp < 2500 && m.cls < 0.1, `LCP=${Math.round(m.lcp)}ms CLS=${m.cls.toFixed(3)}`)
  ok(`first-paint@${w}: no console errors`, page.errors.length === 0, page.errors.join('|').slice(0, 200))
  await ctx.close()
}
{ // reduced motion: content static and visible at once
  const { ctx, page } = await open({ reducedMotion: 'reduce' })
  await page.goto(BASE)
  await page.waitForTimeout(300)
  const op = await page.evaluate(() => getComputedStyle(document.querySelector('#home img').closest('div[style], div')).opacity)
  const vis = await page.locator('h1').isVisible()
  ok('reduced-motion: hero immediately visible', vis && op === '1', 'opacity=' + op)
  await ctx.close()
}


// ---------- A2. Hero refinement ----------
for (const [w, h] of [[320, 640], [390, 844], [768, 1024], [1440, 900], [1920, 1080]]) {
  const { ctx, page } = await open({}, w, h)
  await page.goto(BASE)
  await page.waitForTimeout(900)
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect()
    const cta = [...document.querySelectorAll('#home a')].find((a) => a.textContent.trim() === 'Xem dự án')
    const img = document.querySelector('#home img')
    const name = document.querySelector('h1 span')
    const ul = [...document.querySelectorAll('#home ul')]
    const facts = ul.find((u) => u.getAttribute('aria-label') === 'Thông tin nhanh')
    const links = [...document.querySelectorAll('#home ul[aria-label="Liên hệ nhanh"] a')]
    return {
      ctaBottom: Math.round(r(cta).bottom), photoW: Math.round(r(img).width), nameFont: parseFloat(getComputedStyle(name).fontSize),
      factsBottom: Math.round(r(facts).bottom), factsText: facts.innerText.replace(/\s+/g, ' '),
      links: links.map((a) => ({ t: a.textContent.replace(/\(.*\)/, '').trim(), href: a.getAttribute('href'), h: Math.round(r(a).height) })),
      intro: document.querySelector('#home p.text-pretty').textContent.trim(),
      clipped: [...document.querySelectorAll('#home *')].filter((e) => { const b = r(e); return b.width > 0 && (b.right > innerWidth + 1 || b.left < -1) && !e.closest('[aria-hidden=true]') }).length,
    }
  })
  if (w <= 390) ok(`hero@${w}: primary CTA visible within the first screen (bottom ${m.ctaBottom}px of ${h})`, m.ctaBottom <= (w === 320 ? 560 : 540), 'bottom=' + m.ctaBottom)
  if (w >= 1440) ok(`hero@${w}: stats strip inside first screen`, m.factsBottom <= h, 'bottom=' + m.factsBottom)
  ok(`hero@${w}: portrait size appropriate (${m.photoW}px)`, w < 640 ? m.photoW >= 190 && m.photoW <= 210 : w < 1024 ? m.photoW >= 270 : m.photoW >= 395)
  ok(`hero@${w}: name heading moderate (${m.nameFont}px)`, m.nameFont <= (w >= 1024 ? 56 : 46) && m.nameFont >= 28)
  ok(`hero@${w}: contact links have >=44px touch targets and verified hrefs`, m.links.length === 4 && m.links.every((l) => l.h >= 44) && m.links.map((l) => l.href).join('|') === 'mailto:lethanhthai0805@gmail.com|https://github.com/ThaiTaka|https://www.facebook.com/thai.taka.2024/|https://zalo.me/0899034349', JSON.stringify(m.links))
  ok(`hero@${w}: no clipped content`, m.clipped === 0, 'clipped=' + m.clipped)
  if (w === 1440) {
    ok('hero: stats labels unambiguous', ['2023 Bắt đầu giảng dạy STEM và lập trình', '6 Dự án tiêu biểu', '6 Giải thưởng', 'Python · C# · C++ Ngôn ngữ thế mạnh'].every((k) => m.factsText.includes(k)), m.factsText)
    ok('hero: intro is the concise version', m.intro.startsWith('Tôi là Lê Thành Thái, sinh viên Công nghệ Thông tin tại Đại học Đà Lạt.') && m.intro.length < 260 && m.intro.includes('Từ năm 2023') && m.intro.includes('Python, Pygame'), m.intro.length + ' chars')
    // CTAs and social links actually work
    for (const [name, hash] of [['Xem dự án', '#projects'], ['Khám phá kỹ năng', '#skills'], ['Liên hệ', '#contact']]) {
      await page.evaluate(() => scrollTo(0, 0))
      await page.waitForTimeout(250)
      await page.locator('#home').getByRole('link', { name, exact: true }).click()
      await page.waitForTimeout(900)
      ok('hero CTA "' + name + '" scrolls to ' + hash, (await page.evaluate(() => location.hash)) === hash && (await page.evaluate((h) => document.querySelector(h).getBoundingClientRect().top, hash)) < 500)
    }
    const stat = []
    for (const a of await page.locator('#home ul[aria-label="Liên hệ nhanh"] a').all()) {
      const href = await a.getAttribute('href')
      if (href.startsWith('http')) { const r = await fetch(href, { redirect: 'follow' }).catch(() => null); stat.push(r && r.status < 400 ? 'ok' : 'bad ' + href) }
    }
    ok('hero social links respond', stat.every((s) => s === 'ok'), stat.join(','))
  }
  await ctx.close()
}

// ---------- B. Content, language and removed sections ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE)
  await scrollThrough(page)
  const text = await page.evaluate(() => document.body.innerText)
  const low = text.toLowerCase()
  for (const k of ['Trang chủ', 'Kỹ năng', 'Dự án', 'Kinh nghiệm', 'Thành tích', 'Sở thích', 'Liên hệ', 'Xem dự án', 'Khám phá kỹ năng', 'Giới thiệu bản thân'])
    ok('vi: "' + k + '"', low.includes(k.toLowerCase()))
  for (const k of ['Selected Work', 'Featured projects', 'Technical Skills', 'Inside the process', 'Visual Explorations', 'Explore My Work', 'Get in Touch', "When I'm not coding", 'Recent thoughts', 'Say hi', 'Loading'])
    ok('removed/english: no "' + k + '"', !low.includes(k.toLowerCase()))
  ok('removed: no #explorations, no gallery columns', (await page.locator('#explorations, .parallax-stage, .col-a').count()) === 0)
  ok('removed: no navbar link to a missing section', await page.evaluate(() => [...document.querySelectorAll('nav a[href^="#"]')].every((a) => document.querySelector(a.getAttribute('href')))))
  for (const k of ['ReadMateAI', 'AgriXAI-Farmer', 'HUIM-IPS-', 'The-Call-Beneath', 'Infrared-Blindspot', 'Hand-Tracking-main']) ok('projects: ' + k, text.includes(k))
  ok('projects: DYE-LMS removed everywhere (page text and links)', !text.includes('DYE') && !(await page.content()).includes('DYE-LMS'))
  ok('projects: ReadMateAI preview-branch note kept', text.includes('pull request #1') && text.includes('chưa hợp nhất'))
  ok('projects: The-Call-Beneath classified React/Vite, not Unity', /React/.test(text) && !/The-Call-Beneath[\s\S]{0,900}Unity[^\n]*\n/.test(text.split('Hiện trạng')[0] || ''))
  for (const k of ['Python', 'C#', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Scratch', 'micro:bit', 'Arduino', 'Pygame', 'MediaPipe', 'UDP socket']) ok('skills: ' + k, text.includes(k))
  for (const k of ['Giải Nhì Nghiên cứu khoa học cấp trường', 'Giải Khuyến khích Nghiên cứu khoa học cấp tỉnh Lâm Đồng', 'Giải Nhất cuộc thi Khởi nghiệp đổi mới sáng tạo tỉnh Lâm Đồng', 'eParking', 'thành viên nhóm', 'Giải Ba cuộc thi An toàn thông tin', 'mYth00s', 'hai năm liên tiếp', 'Bắt đầu giảng dạy STEM và lập trình Python, Pygame', 'vừa dạy STEM vừa dạy lập trình Python và Pygame'])
    ok('awards: ' + k, text.includes(k))
  ok('awards: chess prize in both 2025 and 2026', (text.match(/Giải Khuyến khích Cờ vua/g) || []).length === 2)
  ok('content: no Michael Smith / Chicago / fake stats', !/Michael Smith|Chicago|20\+ Years|95\+ Projects/.test(text))
  ok('content: diacritics intact', ['Đại học Đà Lạt', 'Lê Thành Thái', 'Công nghệ Thông tin', 'Ứng dụng trí tuệ nhân tạo vào phát triển Game học ngoại ngữ'].every((k) => text.includes(k)))
  ok('content: no CV download button without a real PDF', !/Tải CV/.test(text))
  // Every glyph in display-font headings must be drawn by Newsreader itself (Instrument Serif lacks many Vietnamese letters).
  {
    await page.evaluate(() => document.fonts.ready)
    const cdp = await ctx.newCDPSession(page)
    await cdp.send('DOM.enable')
    await cdp.send('CSS.enable')
    const { root } = await cdp.send('DOM.getDocument', { depth: -1 })
    const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.font-display, .font-display-italic, h1, h2, h3' })
    const bad = new Set()
    let checked = 0
    for (const nodeId of nodeIds) {
      const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId })
      for (const f of fonts) {
        checked += f.glyphCount
        if (!/Newsreader|Inter/.test(f.familyName)) bad.add(f.familyName)
      }
    }
    ok('fonts: display headings render only with Newsreader/Inter (no fallback glyphs)', bad.size === 0 && checked > 200, [...bad].join(',') + ' glyphs=' + checked)
  }
  ok('seo: Vietnamese title, canonical, og:locale', await page.evaluate(() => document.title.includes('CV điện tử') && !!document.querySelector('link[rel=canonical]') && document.querySelector('meta[property="og:locale"]')?.content === 'vi_VN'))

  // Skills: everything visible by scrolling, nothing behind tabs/accordions
  ok('skills: no tabs / accordions / carousels', (await page.locator('#skills [role=tab], #skills [role=tablist], #skills details, #skills [aria-expanded]').count()) === 0)
  const groups = await page.evaluate(() => [...document.querySelectorAll('#skills h3')].map((h) => ({ t: h.textContent.trim(), vis: h.getBoundingClientRect().height > 0 })))
  ok('skills: 7 groups, all rendered', groups.length === 7 && groups.every((g) => g.vis), groups.map((g) => g.t).join(' | '))
  const hidden = await page.evaluate(() => [...document.querySelectorAll('#skills li, #projects article, #awards li, #hobbies li')].filter((e) => { const cs = getComputedStyle(e); return cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0' || e.closest('[hidden],[aria-hidden=true]') }).length)
  ok('visibility: no skills/projects/awards/hobbies content hidden', hidden === 0, 'hidden=' + hidden)
  ok('projects: problem/solution/role/features visible without interaction', await page.evaluate(() => [...document.querySelectorAll('#projects article')].every((a) => ['Vai trò', 'Bài toán', 'Giải pháp', 'Tính năng nổi bật', 'Hiện trạng'].every((k) => a.innerText.toLowerCase().includes(k.toLowerCase())))))
  ok('projects: exactly 6 cards, no modal/dialog', (await page.locator('#projects article').count()) === 6 && (await page.locator('[role=dialog]').count()) === 0)

  // Hobbies
  const hobbies = await page.evaluate(() => [...document.querySelectorAll('#hobbies ul li')].map((li) => ({ label: li.querySelector('h3')?.textContent, svg: li.querySelector('svg')?.innerHTML ?? '', interactive: li.querySelectorAll('a,button,[tabindex]').length })))
  ok('hobbies: 5 in the right order', hobbies.map((h) => h.label).join(',') === 'Chơi game,Cờ vua,Bơi lội,Cầu lông,Bóng rổ', hobbies.map((h) => h.label).join(','))
  ok('hobbies: five distinct icons', new Set(hobbies.map((h) => h.svg)).size === 5 && hobbies.every((h) => h.svg.length > 20))
  ok('hobbies: cards are not links/buttons', hobbies.every((h) => h.interactive === 0))
  ok('hobbies: only one hobbies block (not duplicated in About)', (await page.locator('#about').innerText()).toLowerCase().includes('chơi game') === false)
  const order = await page.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => s.id).join(','))
  ok('layout: CV section order', order === 'home,about,skills,projects,experience,awards,research,hobbies,contact', order)
  await ctx.close()
}

// ---------- C. Loading-free interaction and keyboard ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE)
  await page.waitForTimeout(400)
  await page.getByRole('link', { name: 'Kỹ năng', exact: true }).first().click()
  await page.waitForTimeout(1200)
  const y = await page.evaluate(() => ({ sy: scrollY, hash: location.hash }))
  ok('interactive immediately: navbar anchor works at once', y.sy > 400 && y.hash === '#skills', JSON.stringify(y))
  await ctx.close()
}
{
  const { ctx, page } = await open()
  await page.goto(BASE)
  await page.waitForTimeout(400)
  await page.keyboard.press('Tab')
  const skip = await page.evaluate(() => ({ t: document.activeElement.textContent.trim(), vis: document.activeElement.getBoundingClientRect().width > 10 }))
  ok('kbd: first Tab reveals skip link', skip.t.startsWith('Bỏ qua') && skip.vis, JSON.stringify(skip))
  const seq = []
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab')
    seq.push(await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { tag: a.tagName, label: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 24), outline: cs.outlineStyle + ' ' + cs.outlineWidth } }))
  }
  console.log(seq.map((s) => `${s.tag}:${s.label}[${s.outline}]`).join('  '))
  ok('kbd: every focused element shows an outline', seq.every((s) => s.outline.startsWith('solid') && !s.outline.endsWith(' 0px')))
  ok('kbd: focus never falls to body', seq.every((s) => s.tag !== 'BODY'))
  await ctx.close()
}
{ // mobile menu
  const { ctx, page } = await open({}, 390, 844)
  await page.goto(BASE)
  await page.waitForTimeout(500)
  const btn = page.getByRole('button', { name: 'Mở menu' })
  ok('mobile: menu button visible, inline links hidden', (await btn.isVisible()) && !(await page.locator('nav ul.hidden').first().isVisible()))
  await btn.click()
  await page.waitForTimeout(300)
  ok('mobile: aria-expanded true', (await page.getByRole('button', { name: 'Đóng menu' }).getAttribute('aria-expanded')) === 'true')
  ok('mobile: 7 Vietnamese links', (await page.locator('#mobile-menu a').allInnerTexts()).join(',') === 'Trang chủ,Kỹ năng,Dự án,Kinh nghiệm,Thành tích,Sở thích,Liên hệ')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  ok('mobile: Escape closes menu', (await page.locator('#mobile-menu').count()) === 0)
  await btn.click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Sở thích' }).click()
  await page.waitForTimeout(1200)
  const st = await page.evaluate(() => ({ h: location.hash, open: !!document.getElementById('mobile-menu'), top: document.getElementById('hobbies').getBoundingClientRect().top }))
  ok('mobile: link navigates, closes menu, section clears navbar', st.h === '#hobbies' && !st.open && st.top >= 0 && st.top < 130, JSON.stringify(st))
  await ctx.close()
}

// ---------- D. Navbar active state ----------
{
  const expected = { home: 'Trang chủ', about: null, skills: 'Kỹ năng', projects: 'Dự án', experience: 'Kinh nghiệm', awards: 'Thành tích', research: null, hobbies: 'Sở thích', contact: 'Liên hệ' }
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, page } = await open({}, w, h)
    await page.goto(BASE)
    await scrollThrough(page)
    for (const id of Object.keys(expected)) {
      await page.evaluate((i) => { const el = document.getElementById(i); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight * 0.45 + 120) }, id)
      await page.waitForTimeout(450)
      if (w < 1024) await page.getByRole('button', { name: 'Mở menu' }).click()
      const cur = await page.evaluate(() => document.querySelector('nav a[aria-current]')?.textContent.trim() ?? null)
      if (w < 1024) await page.keyboard.press('Escape')
      ok(`navbar@${w}: ${id} -> ${expected[id]}`, cur === expected[id], 'got ' + cur)
    }
    await ctx.close()
  }
}

// ---------- E. Links and images ----------
{
  const { ctx, page } = await open()
  await page.goto(BASE)
  await scrollThrough(page)
  await page.waitForTimeout(500)
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))
  const hashes = [...new Set(links.filter((h) => h.startsWith('#')))]
  const missing = []
  for (const h of hashes) if (!(await page.locator(h).count())) missing.push(h)
  ok('links: every #anchor has a target', missing.length === 0, missing.join(','))
  const ext = [...new Set(links.filter((h) => /^https?:/.test(h)))]
  const bad = []
  for (const u of ext) {
    try { const r = await fetch(u, { redirect: 'follow' }); if (r.status >= 400) bad.push(`${u} ${r.status}`) } catch { bad.push(`${u} ERR`) }
  }
  console.log('external links:', ext.length)
  ok('links: external links respond', bad.length === 0, bad.join(' | '))
  ok('links: no placeholder "#" or empty hrefs', links.every((h) => h && h !== '#'))
  const imgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))
  ok('images: none broken', imgs.length === 0, imgs.join(','))
  ok('images: all have non-empty alt', await page.evaluate(() => [...document.images].every((i) => i.alt.trim().length > 2)))
  await ctx.close()
}

// ---------- F. Axe (WCAG 2 A/AA + best practice) ----------
for (const [w, h, rm] of [[1440, 900, 'no-preference'], [390, 844, 'no-preference'], [1440, 900, 'reduce']]) {
  const { ctx, page } = await open({ reducedMotion: rm }, w, h)
  await page.goto(BASE)
  await scrollThrough(page)
  await page.waitForTimeout(800)
  await page.addScriptTag({ content: axeSrc })
  const v = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })).violations.map((x) => x.id + ' x' + x.nodes.length + ' ' + (x.nodes[0]?.target.join(' ') ?? '')))
  ok(`axe@${w} (${rm}): zero violations`, v.length === 0, v.join(' ; '))
  const heads = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]))
  const jumps = heads.some((lvl, i) => i > 0 && lvl - heads[i - 1] > 1)
  ok(`headings@${w}: one h1, no skipped levels`, heads.filter((x) => x === 1).length === 1 && !jumps, heads.join(''))
  await ctx.close()
}

// ---------- G. Responsive ----------
for (const w of [320, 390, 768, 1440, 1920]) {
  const { ctx, page } = await open({}, w, 900)
  await page.goto(BASE)
  await scrollThrough(page)
  const o = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth])
  ok(`responsive@${w}: no horizontal overflow`, o[0] <= o[1], o.join('/'))
  const small = await page.evaluate(() => [...document.querySelectorAll('p,li,a,span,button,dt,dd,h3,h4')].filter((e) => e.childElementCount === 0 && e.textContent.trim() && e.getBoundingClientRect().width > 0 && parseFloat(getComputedStyle(e).fontSize) < 10.9).length)
  ok(`responsive@${w}: no text below ~11px`, small === 0, 'count=' + small)
  const tap = await page.evaluate(() => [...document.querySelectorAll('a,button')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 32 && !e.closest('ul.flex-wrap') && !e.classList.contains('sr-only') && getComputedStyle(e).position !== 'absolute' && e.textContent.trim().length > 0 }).map((e) => e.textContent.trim().slice(0, 20)))
  ok(`responsive@${w}: no tiny tap targets`, tap.length === 0, tap.join(','))
  ok(`responsive@${w}: no console errors`, page.errors.length === 0, page.errors.join('|').slice(0, 200))
  await ctx.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
if (failed.length) console.log('FAILED:\n' + failed.map((f) => '- ' + f.name + ' ' + f.detail).join('\n'))
process.exit(failed.length ? 1 : 0)
