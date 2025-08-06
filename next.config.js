/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 优化 Farcaster Mini App 的配置
  experimental: {
    appDir: true,
  },
  
  // 支持外部图片域名
  images: {
    domains: [
      'imagedelivery.net',
      'res.cloudinary.com',
      'i.imgur.com',
      'warpcast.com'
    ],
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_APP_NAME: 'Farcaster Mini App Demo',
    NEXT_PUBLIC_APP_DESCRIPTION: 'A demo Farcaster Mini App',
  },
  
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig