'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const starsRef = useRef<Star[]>([])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COUNT = 180

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        px: 0,
        py: 0,
      }))
    }

    const draw = () => {
      if (!canvas || !ctx) return
      const cx = canvas.width / 2 + mouse.current.x * 0.04
      const cy = canvas.height / 2 + mouse.current.y * 0.04

      ctx.fillStyle = 'rgba(3,5,9,0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const star of starsRef.current) {
        star.z -= 0.6
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2
          star.y = (Math.random() - 0.5) * canvas.height * 2
          star.z = canvas.width
          star.px = 0
          star.py = 0
        }

        const sx = (star.x / star.z) * canvas.width + cx
        const sy = (star.y / star.z) * canvas.height + cy
        const r = Math.max(0.1, (1 - star.z / canvas.width) * 2)
        const alpha = 1 - star.z / canvas.width

        if (star.px !== 0) {
          ctx.beginPath()
          ctx.moveTo(star.px, star.py)
          ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(228,238,255,${alpha * 0.6})`
          ctx.lineWidth = r
          ctx.stroke()
        }

        star.px = sx
        star.py = sy
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX - window.innerWidth / 2
      mouse.current.y = e.clientY - window.innerHeight / 2
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  )
}
