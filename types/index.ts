export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  url?: string
  repo?: string
  status: 'live' | 'wip' | 'planned'
  year: number
  tech: string[]
  featured: boolean
  mockupUrl?: string
  images?: {
    banner?: string
    screenshots?: string[]
  }
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  published: boolean
}

export interface Notification {
  id: string
  city: string
  action: string
  target: string
  emoji: string
}
