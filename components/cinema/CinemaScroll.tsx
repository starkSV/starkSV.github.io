'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { initLenis } from '@/lib/lenis'
import OrbVisual from './OrbVisual'
import AboutSection from './AboutSection'
import GlassBadge from '@/components/ui/GlassBadge'
import ProjectCard from '@/components/ui/ProjectCard'
import PhysicalButton from '@/components/ui/PhysicalButton'
import type { Project } from '@/types'

interface CinemaScrollProps {
  projects: Project[]
}

export default function CinemaScroll({ projects }: CinemaScrollProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const heroRef  = useRef<HTMLDivElement>(null)
  const s1Ref    = useRef<HTMLDivElement>(null)
  const s2Ref    = useRef<HTMLDivElement>(null)
  const s3Ref    = useRef<HTMLDivElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = initLenis()

    const ctx = gsap.context(() => {
      const card = cardRef.current
      const hero = heroRef.current
      if (!card || !hero) return

      const vw = window.innerWidth
      const vh = window.innerHeight

      // initial card state — off screen below
      gsap.set(card, {
        y: vh + 200,
        width: Math.min(vw * 0.72, 900),
        height: Math.min(vh * 0.72, 640),
        borderRadius: 24,
        xPercent: -50,
        left: '50%',
        position: 'fixed',
        top: (vh - Math.min(vh * 0.72, 640)) / 2,
      })

      gsap.set([s1Ref.current, s2Ref.current, s3Ref.current, ctaRef.current], {
        autoAlpha: 0,
        position: 'absolute',
        inset: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=10000',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      })

      // 0-1: hero blur out
      tl.to(hero, { opacity: 0, filter: 'blur(12px)', y: -30, duration: 1 }, 0)

      // 1-3: card rises
      tl.to(card, { y: 0, duration: 2, ease: 'power3.out' }, 0.5)

      // 3-5: card expands to full screen
      tl.to(
        card,
        {
          width: vw,
          height: vh,
          borderRadius: 0,
          top: 0,
          duration: 2,
          ease: 'power3.inOut',
        },
        2.5,
      )

      // S1 — orb section
      tl.to(s1Ref.current, { autoAlpha: 1, duration: 0.5 }, 4.5)
      tl.to(s1Ref.current, { autoAlpha: 0, duration: 0.5 }, 7.5)

      // S2 — projects
      tl.to(s2Ref.current, { autoAlpha: 1, duration: 0.5 }, 8)
      tl.to(s2Ref.current, { autoAlpha: 0, duration: 0.5 }, 11)

      // S3 — about
      tl.to(s3Ref.current, { autoAlpha: 1, duration: 0.5 }, 11.5)
      tl.to(s3Ref.current, { autoAlpha: 0, duration: 0.5 }, 14.5)

      // CTA — card pulls back to rounded rect
      tl.to(ctaRef.current, { autoAlpha: 1, duration: 0.5 }, 15)
      tl.to(
        card,
        {
          width: Math.min(vw * 0.72, 900),
          height: Math.min(vh * 0.72, 640),
          borderRadius: 24,
          top: (vh - Math.min(vh * 0.72, 640)) / 2,
          left: '50%',
          duration: 1.5,
          ease: 'power3.inOut',
        },
        15,
      )

      // card exits upward
      tl.to(ctaRef.current, { autoAlpha: 0, duration: 0.5 }, 17)
      tl.to(card, { y: -(vh + 200), duration: 1.5, ease: 'power3.in' }, 17)
    }, wrapRef)

    return () => {
      ctx.revert()
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const GLASS_BADGES = [
    { icon: '⚡', label: 'Edge-first architecture' },
    { icon: '🎨', label: 'Pixel-perfect UI' },
    { icon: '🚀', label: 'Ships fast, ships clean' },
  ]

  return (
    <>
      {/* Scroll container — 10000px of scroll space */}
      <div ref={wrapRef} style={{ height: '10000px' }} aria-hidden="false">
        {/* Hero text layer (fixed, behind card) */}
        <div
          ref={heroRef}
          className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <p className="font-mono text-xs text-[var(--sv-accent)] tracking-[0.3em] uppercase mb-6 opacity-70">
            Shekhar Vaidya
          </p>
          <h1 className="font-syne font-extrabold text-[clamp(3rem,8vw,7rem)] text-center text-[var(--sv-text)] leading-[0.9] tracking-[-0.03em] max-w-[800px]">
            Build things<br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--sv-accent) 0%, var(--sv-accent-2) 100%)' }}
            >
              that matter.
            </span>
          </h1>
          <p className="font-sans text-base text-[var(--sv-muted)] mt-6 text-center max-w-md">
            Full-stack developer. Writer. I build fast, beautiful software.
          </p>
          <p className="font-mono text-xs text-[var(--sv-dim)] mt-12 tracking-widest animate-bounce">
            scroll to explore
          </p>
        </div>

        {/* The physical card */}
        <div
          ref={cardRef}
          className="z-20 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #152d6b 0%, #06090f 100%)',
            boxShadow: `
              0 50px 120px -20px rgba(0,0,0,.98),
              0 25px 50px -15px rgba(0,0,0,.85),
              inset 0 1px 2px rgba(255,255,255,.17),
              inset 0 -2px 4px rgba(0,0,0,.9)
            `,
          }}
        >
          {/* S1 — Orb + intro */}
          <div ref={s1Ref} className="w-full h-full flex items-center justify-center px-12">
            <div className="flex items-center gap-20 max-w-5xl w-full">
              <OrbVisual />
              <div className="flex-1">
                <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-4">
                  Developer & Writer
                </p>
                <h2 className="font-syne font-bold text-3xl text-[var(--sv-text)] leading-tight mb-6">
                  Crafting experiences<br />at the edge of the web.
                </h2>
                <div className="flex flex-col gap-3">
                  {GLASS_BADGES.map((b, i) => (
                    <GlassBadge key={b.label} delay={i * 0.15} icon={b.icon}>
                      {b.label}
                    </GlassBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S2 — Projects */}
          <div ref={s2Ref} className="w-full h-full flex flex-col items-center justify-center px-12 py-8">
            <div className="w-full max-w-5xl">
              <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-2">Featured work</p>
              <h2 className="font-syne font-bold text-3xl text-[var(--sv-text)] mb-8">Projects</h2>
              <div className="grid grid-cols-3 gap-5">
                {projects.slice(0, 3).map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* S3 — About */}
          <div ref={s3Ref} className="w-full h-full">
            <AboutSection />
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="w-full h-full flex flex-col items-center justify-center gap-8 px-12">
            <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase">Ready to collaborate?</p>
            <h2 className="font-syne font-bold text-[clamp(2rem,5vw,4rem)] text-center text-[var(--sv-text)] leading-tight">
              Let&apos;s build something<br />great.
            </h2>
            <div className="flex gap-4 flex-wrap justify-center">
              <PhysicalButton href="mailto:shekharvaidya2@gmail.com" variant="light" data-cursor="get in touch">
                Get in touch →
              </PhysicalButton>
              <PhysicalButton href="/projects" variant="dark" data-cursor="view work">
                View my work
              </PhysicalButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
