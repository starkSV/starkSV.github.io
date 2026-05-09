import CinemaScroll from '@/components/cinema/CinemaScroll'
import Ticker from '@/components/ui/Ticker'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import { getFeaturedProjects } from '@/lib/projects'

const TICKER_ITEMS = [
  'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Cloudflare Pages',
  'Framer Motion', 'Python', 'MDX', 'Edge Runtime', 'shadcn/ui',
]

export default function Home() {
  const projects = getFeaturedProjects()

  return (
    <main>
      <CinemaScroll projects={projects} />

      {/* Below-card content — visible after card exits */}
      <div className="relative z-10">
        <div
          className="py-6 border-y"
          style={{ borderColor: 'var(--sv-border)', background: 'rgba(3,5,9,.95)' }}
        >
          <Ticker items={TICKER_ITEMS} />
        </div>

        <Contact />
        <Footer />
      </div>
    </main>
  )
}
