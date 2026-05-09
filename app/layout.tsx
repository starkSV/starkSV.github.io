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
  title: 'Shekhar Vaidya — Developer & Writer',
  description: 'I build things that matter. Full-stack developer and writer focused on fast, beautiful products.',
  openGraph: {
    title: 'Shekhar Vaidya — Developer & Writer',
    description: 'I build things that matter.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shekhar Vaidya — Developer & Writer',
    description: 'I build things that matter.',
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
