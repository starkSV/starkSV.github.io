import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-6 py-8 border-t flex items-center justify-between gap-4 flex-wrap"
      style={{ borderColor: 'var(--sv-border)' }}
    >
      <span className="font-syne font-bold text-xl text-[var(--sv-text)]">SV.</span>
      <p className="font-mono text-xs text-[var(--sv-dim)]">
        © {year} Shekhar Vaidya. Built with Next.js + Cloudflare.
      </p>
      <div className="flex gap-4">
        <Link href="/blog"     className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">Blog</Link>
        <Link href="/projects" className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">Projects</Link>
      </div>
    </footer>
  )
}
