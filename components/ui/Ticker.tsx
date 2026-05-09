import { cn } from '@/lib/utils'

interface TickerProps {
  items: string[]
  speed?: number
  separator?: string
  className?: string
}

export default function Ticker({ items, separator = '·', className }: TickerProps) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden w-full', className)}>
      <div
        className="flex gap-8 w-max"
        style={{ animation: 'ticker-scroll 30s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-sm text-[var(--sv-muted)] whitespace-nowrap flex items-center gap-8">
            {item}
            <span className="text-[var(--sv-accent)] opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
