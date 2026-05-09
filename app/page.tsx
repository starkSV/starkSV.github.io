import CinemaScroll from '@/components/cinema/CinemaScroll'
import Ticker from '@/components/ui/Ticker'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import { getFeaturedProjects } from '@/lib/projects'

const TICKER_ITEMS = [
  'Python · FastAPI', 'Go', 'React · TypeScript', 'Tailwind CSS',
  'Cloudflare Workers', 'Docker · Coolify', 'PostgreSQL', 'GSAP',
  'Next.js 15', 'WinUI 3 · C#', 'Framer Motion', 'XDA · TechLatest',
]

export default function Home() {
  const projects = getFeaturedProjects()

  return (
    <>
      {/* Cinema scroll — renders fixed hero + fixed card + scroll spacer */}
      <CinemaScroll projects={projects} />

      {/* Below-card content — sits in normal document flow after the 10000px spacer */}
      <div className="relative z-10">
        <div
          className="py-6 border-y"
          style={{ borderColor: 'var(--sv-border)', background: 'rgba(3,5,9,.98)' }}
        >
          <Ticker items={TICKER_ITEMS} />
        </div>

        <Contact />
        <Footer />
      </div>
    </>
  )
}
