import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Projects — Shekhar Vaidya',
  description: 'All projects by Shekhar Vaidya.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen relative z-10 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-[var(--sv-accent)] tracking-widest uppercase mb-3">Portfolio</p>
        <h1 className="font-syne font-bold text-5xl text-[var(--sv-text)] mb-4">Projects</h1>
        <p className="font-sans text-base text-[var(--sv-muted)] mb-12 max-w-lg">
          A collection of things I&apos;ve built — from developer tools to web apps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
