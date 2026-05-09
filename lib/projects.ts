import type { Project } from '@/types'
import projectsData from '@/content/projects.json'

export function getAllProjects(): Project[] {
  return projectsData as Project[]
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug)
}
