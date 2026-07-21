/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-portfolio', // MUST match your exact repo name!
  images: {
    unoptimized: true,
  },
};

export default nextConfig;