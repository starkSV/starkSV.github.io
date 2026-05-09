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
        © {year} Shekhar Vaidya · Uttarakhand, India
      </p>
      <div className="flex gap-5 flex-wrap">
        <Link href="/blog"       className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">Blog</Link>
        <Link href="/projects"   className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">Projects</Link>
        <a href="https://github.com/starkSV"          target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">GitHub</a>
        <a href="https://x.com/imsvaidya"             target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">X</a>
        <a href="https://tech-latest.com"             target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--sv-dim)] hover:text-[var(--sv-muted)] transition-colors">TechLatest</a>
      </div>
    </footer>
  )
}
