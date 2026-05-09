'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PhysicalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'light' | 'dark'
  className?: string
  'data-cursor'?: string
}

export default function PhysicalButton({
  children,
  onClick,
  href,
  variant = 'light',
  className,
  ...props
}: PhysicalButtonProps) {
  const styles =
    variant === 'light'
      ? {
          background: 'linear-gradient(180deg, #ffffff 0%, #e8eef8 100%)',
          color: '#030509',
          boxShadow: `
            0 0 0 1px rgba(0,0,0,.05),
            0 2px 4px rgba(0,0,0,.1),
            0 14px 28px -4px rgba(0,0,0,.32),
            inset 0 1px 1px #fff,
            inset 0 -3px 6px rgba(0,0,0,.06)
          `,
        }
      : {
          background: 'linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.02) 100%)',
          color: 'var(--sv-text)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,.1),
            0 2px 4px rgba(0,0,0,.4),
            0 14px 28px -4px rgba(0,0,0,.8),
            inset 0 1px 1px rgba(255,255,255,.12),
            inset 0 -3px 6px rgba(0,0,0,.3)
          `,
        }

  const inner = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-sm',
        className,
      )}
      style={styles}
      data-cursor={props['data-cursor']}
    >
      {children}
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    )
  }

  return inner
}
