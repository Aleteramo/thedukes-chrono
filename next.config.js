/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
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
  experimental: {
    serverActions: {
      enabled: true
    },
    serverComponentsExternalPackages: []
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/.well-known/vercel/microfrontend-routing',
          destination: '/api/microfrontend-routing'
        }
      ]
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
}

module.exports = nextConfig