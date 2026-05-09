'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassBadgeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  icon?: React.ReactNode
}

export default function GlassBadge({ children, className, delay = 0, icon }: GlassBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, delay }}
      className={cn(
        'relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl',
        'backdrop-blur-2xl',
        'text-[var(--sv-text)] text-sm font-mono',
        className,
      )}
      style={{
        background: 'rgba(21, 45, 107, 0.28)',
        boxShadow: `
          0 0 0 1px rgba(255,255,255,.1),
          0 28px 56px -12px rgba(0,0,0,.9),
          inset 0 1px 1px rgba(255,255,255,.2),
          inset 0 -1px 1px rgba(0,0,0,.5)
        `,
      }}
    >
      {icon && <span className="text-[var(--sv-accent)] shrink-0">{icon}</span>}
      {children}
    </motion.div>
  )
}
