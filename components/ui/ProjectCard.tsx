'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import BrowserMockup from './BrowserMockup'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      data-cursor="view project"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, rotateX: -20, y: 40 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden group"
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(21,45,107,.5) 0%, rgba(6,9,15,.95) 100%)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,.07),
            0 24px 48px -8px rgba(0,0,0,.9),
            inset 0 1px 0 rgba(255,255,255,.1)
          `,
        }}
      >
        <BrowserMockup url={project.mockupUrl ?? `${project.slug}.app`} className="rounded-none border-0" />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-syne font-bold text-lg text-[var(--sv-text)]">{project.name}</h3>
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded-full shrink-0"
              style={{
                background: project.status === 'live' ? 'rgba(56,189,248,.15)' : 'rgba(255,255,255,.06)',
                color: project.status === 'live' ? 'var(--sv-accent)' : 'var(--sv-muted)',
                border: `1px solid ${project.status === 'live' ? 'rgba(56,189,248,.3)' : 'rgba(255,255,255,.08)'}`,
              }}
            >
              {project.status === 'live' ? '● live' : project.status}
            </span>
          </div>
          <p className="font-sans text-sm text-[var(--sv-muted)] mb-4 leading-relaxed">{project.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,.05)', color: 'var(--sv-dim)', border: '1px solid rgba(255,255,255,.06)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
