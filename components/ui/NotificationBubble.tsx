'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NOTIFICATIONS } from '@/lib/notifications'
import type { Notification } from '@/types'

export default function NotificationBubbles() {
  const [visible, setVisible] = useState<(Notification & { key: string })[]>([])

  const addNotification = useCallback(() => {
    if (visible.length >= 2) return
    const pick = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)]
    const entry = { ...pick, key: `${pick.id}-${Date.now()}` }
    setVisible((prev) => [...prev.slice(-1), entry])
    setTimeout(() => {
      setVisible((prev) => prev.filter((n) => n.key !== entry.key))
    }, 5000)
  }, [visible.length])

  useEffect(() => {
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000 // 8–15 s
      return setTimeout(() => {
        addNotification()
        const next = schedule()
        return next
      }, delay)
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [addNotification])

  return (
    <div className="fixed bottom-6 left-6 z-[9000] flex flex-col-reverse gap-3 pointer-events-none">
      <AnimatePresence>
        {visible.map((n) => (
          <motion.div
            key={n.key}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-2xl max-w-[280px]"
            style={{
              background: 'rgba(21, 45, 107, 0.35)',
              boxShadow: `
                0 0 0 1px rgba(255,255,255,.1),
                0 20px 40px -8px rgba(0,0,0,.85),
                inset 0 1px 1px rgba(255,255,255,.18),
                inset 0 -1px 1px rgba(0,0,0,.4)
              `,
            }}
          >
            <span className="text-xl shrink-0">{n.emoji}</span>
            <div>
              <p className="font-mono text-[11px] text-[var(--sv-muted)]">
                Someone from <span className="text-[var(--sv-accent)]">{n.city}</span>
              </p>
              <p className="font-sans text-xs text-[var(--sv-text)]">
                {n.action} <strong className="font-medium">{n.target}</strong>
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
