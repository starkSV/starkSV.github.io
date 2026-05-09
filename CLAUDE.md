# starkSV Portfolio — Shekhar Vaidya

## Project Overview
Personal portfolio and freelance showcase. A cinematic scroll-driven experience. Deployed to Cloudflare Pages.

**Goal**: Personal brand + freelance client acquisition  
**Contact**: shekharvaidya2@gmail.com

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 15 (App Router) | Static-compatible with CF Pages adapter |
| Language | TypeScript (strict) | No `any` unless truly unavoidable |
| Styling | Tailwind CSS v4 | Utility-first, no CSS-in-JS |
| Scroll animation | GSAP + ScrollTrigger | Cinema scroll section only |
| UI animation | Framer Motion | Micro-interactions, badges, notifications |
| Components | shadcn/ui | Base primitives (Button, etc.) |
| Blog | MDX + Contentlayer | `.mdx` files in `/content/blog/` |
| Contact form | Resend | Edge-compatible server action |
| Deployment | Cloudflare Pages | `@cloudflare/next-on-pages` adapter |

---

## Design System

### Colors
```css
--bg:        #030509                    /* page background */
--card-from: #152d6b                    /* card gradient start */
--card-to:   #06090f                    /* card gradient end */
--text:      #e4eeff                    /* primary text */
--muted:     rgba(200, 218, 255, 0.44)  /* secondary text */
--dim:       rgba(200, 218, 255, 0.11)  /* tertiary / disabled */
--accent:    #38bdf8                    /* primary accent (cyan) */
--accent-2:  #818cf8                    /* secondary accent (violet) */
--border:    rgba(255, 255, 255, 0.06)
--border-hi: rgba(255, 255, 255, 0.13)
```

### Typography — strict rules
- **Syne 700/800** — h1, h2, h3, brand mark (`SV.`), large display numbers. NOTHING ELSE.
- **Inter 400/500/600** — all body copy, descriptions, nav links, button labels, form fields.
- **JetBrains Mono 400/500** — eyebrows, tags, metadata, HUD elements, code, labels, social links.

### Spacing / Scale
Tailwind 4px grid. Key breakpoints: `sm:640` `md:768` `lg:1024` `xl:1280`.

### Font Loading
Use `next/font/google` — never a CDN link tag.

```typescript
// app/layout.tsx
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne' })
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })
```

Apply as `<body className={`${syne.variable} ${inter.variable} ${mono.variable}`}>`.  
Then in Tailwind config: `fontFamily: { syne: 'var(--font-syne)', sans: 'var(--font-inter)', mono: 'var(--font-mono)' }`.

### Images
Always use `next/image`. Never `<img>` for content images.  
Store project screenshots in `public/assets/projects/[slug]/`.  
Avatar photo at `public/assets/hero-photo.jpg`.

### SEO
Every page exports `generateMetadata`. Pattern:

```typescript
export const metadata: Metadata = {
  title: 'Shekhar Vaidya — Developer & Writer',
  description: '...',
  openGraph: { images: ['/og.png'] },
}
```

---

## Project Architecture

### Homepage — Cinema Scroll Sequence
The entire homepage is one GSAP ScrollTrigger pinned section (`end: "+=10000"`). Sections inside the card are absolutely positioned, shown/hidden by GSAP.

```
Load         → Hero text ("Build things / that matter.") fades in
Scroll start → Card rises from below (y: vh+200 → 0), hero blurs out
             → Card expands to 100vw/100vh, border-radius: 0
S1 (Orb)     → Abstract glowing orb + 3 orbital rings + orbit bubbles
             → Intro text slides in from right
             → 3 glass badges float in (spring physics)
S2 (Projects)→ Header drops in, 3 project cards stagger in with rotationX
             → Each card has a skeuomorphic browser mockup
             → Mouse movement tilts cards in 3D
S3 (About)   → Text slides from left, avatar (orb rings + photo) from right
             → Orbit bubbles, HUD labels
CTA          → Content fades, card pulls back to rounded card
             → "Let's build something great." + physical buttons
Exit         → Card flies upward off screen
Below card   → Ticker → Contact (rolling marquee) → Footer
```

### Notification System
Fake social-proof bubbles. Uses a Framer Motion `AnimatePresence` queue.
- Fires every 8–15 seconds (random)
- Max 2 visible simultaneously
- Each visible for ~5 seconds
- Positioned bottom-left, stacking upward
- Data: hardcoded array in `lib/notifications.ts`
- Style: same glass badge component used in S1

### Routing
| Route | Content |
|-------|---------|
| `/` | Homepage (cinema scroll) |
| `/projects` | All projects grid |
| `/projects/[slug]` | Project detail (case study) |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual post (MDX) |

---

## File Structure
```
app/
  layout.tsx            ← root layout: providers, Cursor, StarField, Notification
  page.tsx              ← homepage: CinemaScroll + below sections
  projects/
    page.tsx            ← full projects grid
    [slug]/page.tsx     ← project detail
  blog/
    page.tsx            ← blog listing
    [slug]/page.tsx     ← MDX post
  globals.css           ← CSS vars, Tailwind base, font-face

components/
  canvas/
    StarField.tsx       ← canvas star field with mouse parallax
  cinema/
    CinemaScroll.tsx    ← GSAP scroll container + card
    OrbVisual.tsx       ← glowing sphere + 3 inclined rings + orbit bubbles
    ProjectsSection.tsx ← S2: projects grid inside card
    AboutSection.tsx    ← S3: text + avatar inside card
  ui/
    Cursor.tsx          ← custom cursor + ring + context label
    GlassBadge.tsx      ← 3D backdrop-blur badge (used in S1 + notifications)
    BrowserMockup.tsx   ← skeuomorphic browser frame
    ProjectCard.tsx     ← card with browser mockup inside
    Notification.tsx    ← social proof bubble
    Ticker.tsx          ← infinite marquee
    PhysicalButton.tsx  ← skeuomorphic light/dark buttons
  layout/
    Footer.tsx
  sections/
    Contact.tsx         ← rolling marquee + email + socials

content/
  projects.json         ← all project data
  blog/
    *.mdx               ← blog posts

lib/
  gsap.ts               ← registers GSAP plugins once
  notifications.ts      ← hardcoded notification strings
  projects.ts           ← typed loader for projects.json
  utils.ts              ← cn(), formatDate(), etc.

types/
  index.ts              ← Project, BlogPost, Notification interfaces

public/
  assets/
    hero-photo.jpg      ← avatar photo
    projects/           ← project screenshots
```

---

## Data Schemas

### Project
```typescript
interface Project {
  slug: string
  name: string
  tagline: string         // one-liner shown on cards
  description: string     // full paragraph for detail page
  url?: string            // live URL
  repo?: string           // GitHub URL
  status: 'live' | 'wip' | 'planned'
  year: number
  tech: string[]
  featured: boolean       // shown in cinema S2 (max 3)
  mockupUrl?: string      // URL shown in browser mockup bar
  images?: {
    banner?: string
    screenshots?: string[]
  }
}
```

### Blog Post (MDX frontmatter)
```yaml
---
title: string
date: YYYY-MM-DD
description: string       # shown in listing cards
tags: string[]
published: boolean
---
```

### Notification
```typescript
interface Notification {
  id: string
  city: string
  action: string          // "is viewing" | "just checked out" | "downloaded"
  target: string          // project name | "your resume" | "your GitHub"
  emoji: string
}
```

---

## Smooth Scroll
Use **Lenis** for smooth scrolling. Must be initialized before GSAP ScrollTrigger.

```typescript
// lib/lenis.ts
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initLenis() {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}
```

Call in a `useEffect` in the root layout. Store instance in a ref. Destroy on unmount.

---

## GSAP Setup

```typescript
// lib/gsap.ts  — import this ONCE before any ScrollTrigger usage
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

Cinema scroll config reference:
```typescript
ScrollTrigger.create({
  trigger: cinemaRef.current,
  start: 'top top',
  end: '+=10000',
  pin: true,
  scrub: 1.1,
  anticipatePin: 1,
})
```

---

## Notification Example Data

```typescript
// lib/notifications.ts
export const NOTIFICATIONS = [
  { id: '1', city: 'San Francisco', action: 'is viewing', target: 'Pixlyzer', emoji: '👀' },
  { id: '2', city: 'London',        action: 'just checked out', target: 'your GitHub', emoji: '⭐' },
  { id: '3', city: 'Berlin',        action: 'is reading', target: 'your latest blog', emoji: '📖' },
  { id: '4', city: 'Toronto',       action: 'viewed', target: 'Bottleneck Calculator', emoji: '🔍' },
  { id: '5', city: 'Singapore',     action: 'downloaded', target: 'your resume', emoji: '⬇️' },
  { id: '6', city: 'Sydney',        action: 'is viewing', target: 'your portfolio', emoji: '🌏' },
  { id: '7', city: 'New York',      action: 'just visited', target: 'MSDL', emoji: '🗽' },
  { id: '8', city: 'Tokyo',         action: 'explored', target: 'your projects', emoji: '🚀' },
]
```

---

## Animation Conventions

| Animation | Tool | When |
|-----------|------|------|
| Cinema scroll (card rise, expand, sections) | GSAP ScrollTrigger | Homepage only |
| Page transitions | Framer Motion `AnimatePresence` | Route changes |
| Hover effects (cards, buttons) | Framer Motion `whileHover` | All interactive elements |
| Glass badge entrance | Framer Motion spring | S1 + notifications |
| Orbit bubbles | CSS animation / rAF | Continuous ambient |
| Star field | Canvas + rAF | Fixed background |
| Orb pulse glow | CSS `@keyframes` | Continuous ambient |
| Scroll progress bar | CSS width driven by scroll event | Always visible |

**GSAP context**: Always wrap in `gsap.context(() => { ... }, containerRef)` and return `ctx.revert()` in cleanup.

**No window on server**: Guard all GSAP, canvas, and scroll code with `typeof window !== 'undefined'` or inside `useLayoutEffect`/`useEffect`.

---

## CF Pages Deployment

### wrangler.toml (required)
```toml
name = "starksv-portfolio"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

pages_build_output_dir = ".vercel/output/static"
```

**`nodejs_compat` flag is mandatory** — without it CF Pages cannot run Next.js server components.

### next.config.ts
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Do NOT add output: 'export' — CF adapter handles output
}

export default nextConfig
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev",
    "deploy": "npm run pages:build && wrangler pages deploy"
  }
}
```

### Edge runtime requirement
All server actions and API routes must declare:
```typescript
export const runtime = 'edge'
```

### Required env vars
```
RESEND_API_KEY=          # contact form — set in CF Pages dashboard
NEXT_PUBLIC_SITE_URL=    # e.g. https://shekharvaidya.com — for OG tags
```

Environment variables: CF Pages dashboard → Settings → Environment variables → add for both Production and Preview.

---

## Key Commands
```bash
npm run dev              # local dev (localhost:3000)
npm run build            # production build check
npm run lint             # ESLint
npm run type-check       # tsc --noEmit
npx @cloudflare/next-on-pages  # CF Pages build
```

---

## Design Reference
The file `mock.html` in this repo contains the full interactive HTML/CSS/JS design mock built during the planning phase. It runs standalone in a browser — use it as visual ground truth when building components.

Key implementation values from the mock:

**Glass badge shadow:**
```css
box-shadow:
  0 0 0 1px rgba(255,255,255,.1),
  0 28px 56px -12px rgba(0,0,0,.9),
  inset 0 1px 1px rgba(255,255,255,.2),
  inset 0 -1px 1px rgba(0,0,0,.5);
```

**Physical button (light):**
```css
box-shadow:
  0 0 0 1px rgba(0,0,0,.05),
  0 2px 4px rgba(0,0,0,.1),
  0 14px 28px -4px rgba(0,0,0,.32),
  inset 0 1px 1px #fff,
  inset 0 -3px 6px rgba(0,0,0,.06);
```

**Card gradient:**
```css
background: linear-gradient(145deg, #152d6b 0%, #06090f 100%);
box-shadow:
  0 50px 120px -20px rgba(0,0,0,.98),
  0 25px 50px -15px rgba(0,0,0,.85),
  inset 0 1px 2px rgba(255,255,255,.17),
  inset 0 -2px 4px rgba(0,0,0,.9);
```

**Orb sphere:**
```css
background:
  radial-gradient(circle at 32% 28%, rgba(56,189,248,.55) 0%, transparent 52%),
  radial-gradient(circle at 68% 72%, rgba(129,140,248,.45) 0%, transparent 52%),
  radial-gradient(circle at 50% 50%, #0c1f48 30%, #030509 100%);
box-shadow:
  0 0 50px 12px rgba(56,189,248,.22),
  0 0 100px 30px rgba(56,189,248,.1),
  inset 0 0 40px rgba(56,189,248,.08);
```

---

## What NOT to do
- Do not use `any` in TypeScript without a comment explaining why
- Do not use Syne for body copy, labels, or anything below h3
- Do not use GSAP for hover effects or micro-interactions — that's Framer Motion
- Do not add `output: 'export'` to next.config — breaks CF Pages adapter
- Do not hardcode environment variables in source files
- Do not use `position: absolute` hacks to work around Tailwind — use proper layout
- Do not create new CSS files — all styles via Tailwind utilities or CSS variables in globals.css
