/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tophatprovisions.com',
      },
      {
        protocol: 'http',
        hostname: 'tophatprovisions.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '*.patcobrands.com',
      },
      {
        protocol: 'https',
        hostname: '*.squarespace-cdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
