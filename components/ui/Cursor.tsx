'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 18 })
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const label = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (labelRef.current) labelRef.current.textContent = label ?? ''
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleEnter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed z-[10000] top-0 left-0 w-2 h-2 rounded-full bg-[var(--sv-accent)] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] top-0 left-0 w-8 h-8 rounded-full border border-[var(--sv-accent)] opacity-40 flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] text-[var(--sv-accent)] whitespace-nowrap absolute left-10 opacity-80"
        />
      </motion.div>
    </>
  )
}
