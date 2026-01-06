import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/server/:path*', // 프론트에서 호출하는 주소 패턴
        destination: 'http://localhost:8080/:path*', // 실제 백엔드 주소 (Spring Boot)
      },
    ];
  },
};

export default nextConfig;
