import type { Metadata } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/ui/Cursor'
import StarField from '@/components/canvas/StarField'
import NotificationBubbles from '@/components/ui/NotificationBubble'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shekhar Vaidya — Tech Journalist & Developer',
  description: 'Founder of TechLatest, Computing Writer at XDA. I build tools at the intersection of deep hardware knowledge and full-stack engineering.',
  openGraph: {
    title: 'Shekhar Vaidya — Tech Journalist & Developer',
    description: 'Founder of TechLatest. Computing Writer at XDA. Builder of FPS Calculator, MSDL, Pixlyzer, and more.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shekhar Vaidya — Tech Journalist & Developer',
    description: 'Founder of TechLatest. Computing Writer at XDA. Builder.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <StarField />
        <Cursor />
        <NotificationBubbles />
        {children}
      </body>
    </html>
  )
}
