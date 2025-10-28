import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tarot-production-ed3e.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
