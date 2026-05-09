import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Do NOT add output: 'export' — CF Pages adapter handles output
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
