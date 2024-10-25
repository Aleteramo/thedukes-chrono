/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  cleanDistDir: true,
  experimental: {
    serverActions: true,
    optimizeFonts: true, // cambiato da false a true
    typedRoutes: true,
    serverComponentsExternalPackages: [],
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
  },
  // Aggiungi questa configurazione per i font
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig