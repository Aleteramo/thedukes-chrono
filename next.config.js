/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  cleanDistDir: true,
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
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['@heroicons/react']
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
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    
    // Rimuovi eventuali riferimenti a (shop)
    config.resolve.alias = {
      ...config.resolve.alias,
      '(shop)': false
    }
    
    // Ottimizza il build per Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config
  }
}

module.exports = nextConfig