import { cn } from '@/lib/utils'

interface BrowserMockupProps {
  url: string
  children?: React.ReactNode
  className?: string
  screenshotUrl?: string
  screenshotAlt?: string
}

export default function BrowserMockup({ url, children, className, screenshotUrl, screenshotAlt }: BrowserMockupProps) {
  return (
    <div
      className={cn('rounded-xl overflow-hidden', className)}
      style={{
        background: 'rgba(6, 9, 15, 0.95)',
        boxShadow: `
          0 0 0 1px rgba(255,255,255,.08),
          0 40px 80px -16px rgba(0,0,0,.95),
          inset 0 1px 0 rgba(255,255,255,.1)
        `,
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.06)' }}
      >
        {/* traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        {/* url bar */}
        <div
          className="flex-1 mx-3 rounded-md px-3 py-1 flex items-center gap-2"
          style={{ background: 'rgba(255,255,255,.06)' }}
        >
          <svg className="w-3 h-3 opacity-40 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5.5a.5.5 0 011 0v2.793l1.146-1.147a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7 8.293V5.5z" />
          </svg>
          <span className="font-mono text-[11px] text-[var(--sv-muted)] truncate">{url}</span>
        </div>
      </div>

      {/* content */}
      <div className="relative overflow-hidden" style={{ minHeight: '160px' }}>
        {screenshotUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={screenshotUrl} alt={screenshotAlt ?? url} className="w-full h-full object-cover object-top" />
        ) : (
          children ?? (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--sv-accent)]" />
            </div>
          )
        )}
      </div>
    </div>
  )
}
