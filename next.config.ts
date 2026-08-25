import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel's build adapter and standalone output are incompatible in Next 16.3:
  // the adapter omits next-server.js.nft.json while standalone still reads it.
  // Keep standalone output for Docker/self-hosting only.
  output: process.env.VERCEL ? undefined : 'standalone',
};

export default nextConfig;
