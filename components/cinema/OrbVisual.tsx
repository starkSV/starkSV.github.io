'use client'

import { useEffect, useRef } from 'react'

const ORBIT_LABELS = ['Next.js', 'TypeScript', 'GSAP', 'Tailwind', 'Cloudflare', 'Python']

export default function OrbVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const bubbles = Array.from(container.querySelectorAll<HTMLElement>('[data-orbit-bubble]'))
    const radii = [110, 135, 155, 120, 145, 130]
    const speeds = [0.0008, -0.0006, 0.001, -0.0009, 0.0007, -0.0011]
    const offsets = bubbles.map((_, i) => (i / bubbles.length) * Math.PI * 2)
    let t = 0

    const animate = () => {
      t += 16
      bubbles.forEach((el, i) => {
        const angle = offsets[i] + t * speeds[i]
        const cx = Math.cos(angle) * radii[i]
        const cy = Math.sin(angle) * radii[i] * 0.42 // flatten for perspective
        el.style.transform = `translate(${cx}px, ${cy}px)`
        el.style.zIndex = cy > 0 ? '2' : '1'
        el.style.opacity = (0.5 + ((cy / (radii[i] * 0.42) + 1) / 2) * 0.5).toString()
      })
      frameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <div className="relative flex items-center justify-center w-72 h-72 select-none" ref={containerRef}>
      {/* glow halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden
      />

      {/* sphere */}
      <div
        className="relative w-40 h-40 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 32% 28%, rgba(56,189,248,.55) 0%, transparent 52%),
            radial-gradient(circle at 68% 72%, rgba(129,140,248,.45) 0%, transparent 52%),
            radial-gradient(circle at 50% 50%, #0c1f48 30%, #030509 100%)
          `,
          boxShadow: `
            0 0 50px 12px rgba(56,189,248,.22),
            0 0 100px 30px rgba(56,189,248,.1),
            inset 0 0 40px rgba(56,189,248,.08)
          `,
          animation: 'orb-pulse 4s ease-in-out infinite',
        }}
      >
        {/* ring 1 */}
        <div
          className="absolute inset-[-18px] rounded-full border border-[rgba(56,189,248,.2)]"
          style={{ transform: 'rotateX(70deg)', borderStyle: 'dashed' }}
          aria-hidden
        />
        {/* ring 2 */}
        <div
          className="absolute inset-[-28px] rounded-full border border-[rgba(129,140,248,.15)]"
          style={{ transform: 'rotateX(70deg) rotateZ(60deg)', borderStyle: 'dashed' }}
          aria-hidden
        />
        {/* ring 3 */}
        <div
          className="absolute inset-[-38px] rounded-full border border-[rgba(56,189,248,.1)]"
          style={{ transform: 'rotateX(70deg) rotateZ(-45deg)' }}
          aria-hidden
        />
      </div>

      {/* orbit bubbles */}
      {ORBIT_LABELS.map((label) => (
        <div
          key={label}
          data-orbit-bubble
          className="absolute font-mono text-[10px] px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
          style={{
            background: 'rgba(21,45,107,.5)',
            border: '1px solid rgba(255,255,255,.1)',
            color: 'var(--sv-text)',
            backdropFilter: 'blur(8px)',
            left: '50%',
            top: '50%',
            marginLeft: '-24px',
            marginTop: '-10px',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
