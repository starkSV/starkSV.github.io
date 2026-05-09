'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  const skills = ['Next.js', 'TypeScript', 'Python', 'Cloudflare', 'GSAP', 'Tailwind']

  return (
    <div className="w-full h-full flex items-center justify-center px-12">
      <div className="grid grid-cols-2 gap-16 max-w-4xl w-full items-center">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-4">About</p>
          <h2 className="font-syne font-bold text-3xl text-[var(--sv-text)] mb-5 leading-tight">
            I build things<br />that matter.
          </h2>
          <p className="font-sans text-sm text-[var(--sv-muted)] leading-relaxed mb-6">
            Full-stack developer obsessed with fast, beautiful, and purposeful software. I work across the entire
            stack — from Cloudflare edge functions to pixel-perfect UIs — and write about what I learn.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="font-mono text-[11px] px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(56,189,248,.1)',
                  border: '1px solid rgba(56,189,248,.2)',
                  color: 'var(--sv-accent)',
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* avatar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          {/* orbit rings */}
          <div
            className="absolute w-56 h-56 rounded-full border border-[rgba(56,189,248,.15)]"
            style={{ transform: 'rotateX(70deg)', animation: 'orbit-spin 12s linear infinite' }}
            aria-hidden
          />
          <div
            className="absolute w-64 h-64 rounded-full border border-[rgba(129,140,248,.1)]"
            style={{ transform: 'rotateX(70deg) rotateZ(60deg)', animation: 'orbit-spin 18s linear infinite reverse' }}
            aria-hidden
          />

          {/* photo frame */}
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden"
            style={{
              boxShadow: `
                0 0 0 2px rgba(56,189,248,.3),
                0 0 40px rgba(56,189,248,.15),
                0 20px 60px rgba(0,0,0,.8)
              `,
            }}
          >
            <Image
              src="/assets/hero-photo.jpg"
              alt="Shekhar Vaidya"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>

          {/* HUD labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-4 -right-8 font-mono text-[10px] px-2 py-1 rounded"
            style={{ background: 'rgba(56,189,248,.1)', color: 'var(--sv-accent)', border: '1px solid rgba(56,189,248,.2)' }}
          >
            SV.dev
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-2 -left-8 font-mono text-[10px] px-2 py-1 rounded"
            style={{ background: 'rgba(129,140,248,.1)', color: 'var(--sv-accent-2)', border: '1px solid rgba(129,140,248,.2)' }}
          >
            Full-stack
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
