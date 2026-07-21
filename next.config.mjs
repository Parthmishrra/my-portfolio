/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/my-portfolio',
  experimental: { optimizePackageImports: ["framer-motion"] },
};

export default nextConfig;
