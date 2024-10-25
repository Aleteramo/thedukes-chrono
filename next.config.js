/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  cleanDistDir: true,
  experimental: {
    serverActions: true,
    optimizeFonts: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      }
    ],
  }
}

module.exports = nextConfig