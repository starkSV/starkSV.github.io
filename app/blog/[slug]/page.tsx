import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/layout/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.meta.title} — Shekhar Vaidya`,
    description: post.meta.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen relative z-10 pt-24 px-6">
      <article className="max-w-2xl mx-auto pb-24">
        <div className="mb-2">
          <Link href="/blog" className="font-mono text-xs text-[var(--sv-muted)] hover:text-[var(--sv-accent)] transition-colors">
            ← Back to blog
          </Link>
        </div>

        <div className="flex items-center gap-3 my-6">
          <span className="font-mono text-xs text-[var(--sv-dim)]">{formatDate(post.meta.date)}</span>
          <span className="text-[var(--sv-border-hi)]">·</span>
          <div className="flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{ background: 'rgba(56,189,248,.08)', color: 'var(--sv-accent)', border: '1px solid rgba(56,189,248,.15)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="font-syne font-bold text-4xl text-[var(--sv-text)] mb-4 leading-tight">
          {post.meta.title}
        </h1>
        <p className="font-sans text-lg text-[var(--sv-muted)] mb-10">{post.meta.description}</p>

        <div
          className="prose prose-invert prose-sm max-w-none"
          style={{
            '--tw-prose-body': 'var(--sv-muted)',
            '--tw-prose-headings': 'var(--sv-text)',
            '--tw-prose-code': 'var(--sv-accent)',
            '--tw-prose-pre-bg': 'rgba(21,45,107,.2)',
          } as React.CSSProperties}
        >
          <MDXRemote source={post.content} />
        </div>
      </article>
      <Footer />
    </main>
  )
}
