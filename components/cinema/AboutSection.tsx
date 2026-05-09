'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const STATS = [
  { value: '300K+', label: 'Monthly readers' },
  { value: '8+',    label: 'Years writing' },
  { value: '3+',    label: 'Years building' },
  { value: '5+',    label: 'Live projects' },
]

const SKILLS = ['Python', 'FastAPI', 'Go', 'React', 'TypeScript', 'Tailwind', 'Cloudflare', 'Docker']

export default function AboutSection() {
  return (
    <div className="w-full h-full flex items-center justify-center px-10 py-8">
      <div className="grid grid-cols-[1fr_auto] gap-14 max-w-5xl w-full items-center">

        {/* text column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <p className="font-mono text-[11px] text-[var(--sv-accent)] tracking-[0.25em] uppercase mb-4">
            Uttarakhand, India
          </p>
          <h2 className="font-syne font-bold text-[clamp(1.6rem,3vw,2.6rem)] text-[var(--sv-text)] mb-4 leading-tight">
            Veteran tech journalist.<br />Full-stack developer.
          </h2>
          <p className="font-sans text-sm text-[var(--sv-muted)] leading-[1.75] mb-5 max-w-lg">
            Founder of <span className="text-[var(--sv-text)]">TechLatest</span> and Computing Writer at{' '}
            <span className="text-[var(--sv-text)]">XDA</span>. I&apos;ve spent 8+ years deep in Windows internals,
            PC hardware, and NAS ecosystems — and the last 3 building the tools I wished existed.
          </p>

          {/* stats row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex flex-col gap-0.5"
              >
                <span className="font-syne font-bold text-xl text-[var(--sv-accent)]">{s.value}</span>
                <span className="font-mono text-[10px] text-[var(--sv-dim)] uppercase tracking-wide">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(56,189,248,.08)',
                  border: '1px solid rgba(56,189,248,.18)',
                  color: 'var(--sv-accent)',
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* avatar column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
          className="relative flex items-center justify-center w-52 h-52 shrink-0"
        >
          {/* orbit rings */}
          <div
            className="absolute w-52 h-52 rounded-full border"
            style={{
              borderColor: 'rgba(56,189,248,.15)',
              transform: 'rotateX(72deg)',
              animation: 'orb-pulse 8s ease-in-out infinite',
            }}
            aria-hidden
          />
          <div
            className="absolute w-60 h-60 rounded-full border"
            style={{
              borderColor: 'rgba(129,140,248,.1)',
              transform: 'rotateX(72deg) rotateZ(55deg)',
              animation: 'orb-pulse 12s ease-in-out infinite reverse',
            }}
            aria-hidden
          />

          {/* photo */}
          <div
            className="relative w-36 h-36 rounded-full overflow-hidden"
            style={{
              boxShadow: `
                0 0 0 2px rgba(56,189,248,.3),
                0 0 40px rgba(56,189,248,.12),
                0 20px 60px rgba(0,0,0,.8)
              `,
            }}
          >
            <Image
              src="/assets/hero-photo.jpg"
              alt="Shekhar Vaidya"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>

          {/* HUD chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 }}
            className="absolute -top-3 -right-6 font-mono text-[9px] px-2 py-1 rounded"
            style={{
              background: 'rgba(56,189,248,.1)',
              color: 'var(--sv-accent)',
              border: '1px solid rgba(56,189,248,.2)',
            }}
          >
            XDA Writer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65 }}
            className="absolute -bottom-1 -left-8 font-mono text-[9px] px-2 py-1 rounded"
            style={{
              background: 'rgba(129,140,248,.1)',
              color: 'var(--sv-accent-2)',
              border: '1px solid rgba(129,140,248,.2)',
            }}
          >
            TechLatest.com
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
