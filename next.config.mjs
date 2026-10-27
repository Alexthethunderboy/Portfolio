/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's image optimiser returns 402 on this plan; images ship pre-sized instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
