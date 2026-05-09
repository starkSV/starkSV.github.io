import PhysicalButton from '@/components/ui/PhysicalButton'

const MARQUEE_TEXT = [
  'Let\'s build together',
  'Available for freelance',
  'Open to collaborations',
  'Full-stack development',
  'Let\'s build together',
  'Available for freelance',
  'Open to collaborations',
  'Full-stack development',
]

export default function Contact() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* rolling marquee headline */}
      <div className="overflow-hidden mb-20 border-y py-6" style={{ borderColor: 'var(--sv-border)' }}>
        <div
          className="flex gap-12 w-max"
          style={{ animation: 'ticker-scroll 20s linear infinite' }}
        >
          {MARQUEE_TEXT.map((t, i) => (
            <span key={i} className="font-syne font-bold text-[clamp(2rem,4vw,4rem)] text-[var(--sv-text)] whitespace-nowrap flex items-center gap-12">
              {t}
              <span className="text-[var(--sv-accent)]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* contact block */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-4">Contact</p>
        <h2 className="font-syne font-bold text-4xl text-[var(--sv-text)] mb-4">Say hello.</h2>
        <p className="font-sans text-base text-[var(--sv-muted)] mb-10 max-w-md mx-auto">
          I&apos;m currently available for freelance projects, consulting, and full-time opportunities.
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <PhysicalButton href="mailto:shekharvaidya2@gmail.com" variant="light" data-cursor="email me">
            shekharvaidya2@gmail.com
          </PhysicalButton>
        </div>

        {/* social links */}
        <div className="flex gap-6 justify-center">
          {[
            { label: 'GitHub', href: 'https://github.com/starkSV' },
            { label: 'Twitter', href: '#' },
            { label: 'LinkedIn', href: '#' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[var(--sv-muted)] hover:text-[var(--sv-accent)] transition-colors duration-200"
              data-cursor={s.label}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
