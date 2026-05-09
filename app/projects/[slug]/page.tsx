import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import Footer from '@/components/layout/Footer'
import PhysicalButton from '@/components/ui/PhysicalButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Shekhar Vaidya`,
    description: project.tagline,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main className="min-h-screen relative z-10 pt-24 px-6">
      <div className="max-w-3xl mx-auto pb-24">
        <div className="mb-2">
          <Link href="/projects" className="font-mono text-xs text-[var(--sv-muted)] hover:text-[var(--sv-accent)] transition-colors">
            ← Back to projects
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4 mt-6">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: project.status === 'live' ? 'rgba(56,189,248,.15)' : 'rgba(255,255,255,.06)',
              color: project.status === 'live' ? 'var(--sv-accent)' : 'var(--sv-muted)',
              border: `1px solid ${project.status === 'live' ? 'rgba(56,189,248,.3)' : 'rgba(255,255,255,.08)'}`,
            }}
          >
            {project.status === 'live' ? '● live' : project.status}
          </span>
          <span className="font-mono text-xs text-[var(--sv-dim)]">{project.year}</span>
        </div>

        <h1 className="font-syne font-bold text-4xl text-[var(--sv-text)] mb-3">{project.name}</h1>
        <p className="font-sans text-lg text-[var(--sv-muted)] mb-8">{project.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: 'rgba(56,189,248,.08)',
                color: 'var(--sv-accent)',
                border: '1px solid rgba(56,189,248,.18)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p className="font-sans text-base text-[var(--sv-muted)] leading-relaxed mb-10">{project.description}</p>

        <div className="flex gap-4 flex-wrap">
          {project.url && (
            <PhysicalButton href={project.url} variant="light" data-cursor="visit">
              Visit live site →
            </PhysicalButton>
          )}
          {project.repo && (
            <PhysicalButton href={project.repo} variant="dark" data-cursor="view source">
              View source
            </PhysicalButton>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
