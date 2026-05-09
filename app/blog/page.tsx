import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Blog — Shekhar Vaidya',
  description: 'Writing about development, design, and the web.',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen relative z-10 pt-24 px-6">
      <div className="max-w-2xl mx-auto pb-24">
        <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-3">Writing</p>
        <h1 className="font-syne font-bold text-5xl text-[var(--sv-text)] mb-4">Blog</h1>
        <p className="font-sans text-base text-[var(--sv-muted)] mb-12">
          Thoughts on development, design, and the web.
        </p>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl transition-all duration-200"
              style={{
                background: 'rgba(21,45,107,.12)',
                border: '1px solid var(--sv-border)',
              }}
              data-cursor="read"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-syne font-bold text-xl text-[var(--sv-text)] group-hover:text-[var(--sv-accent)] transition-colors">
                  {post.title}
                </h2>
                <span className="font-mono text-xs text-[var(--sv-dim)] shrink-0 mt-1">
                  {formatDate(post.date)}
                </span>
              </div>
              <p className="font-sans text-sm text-[var(--sv-muted)] mb-4 leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,.05)', color: 'var(--sv-dim)', border: '1px solid rgba(255,255,255,.06)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
