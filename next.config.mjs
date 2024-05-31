/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_DOMAIN],
    },
  },
  output: 'standalone',
  reactStrictMode: false,
};

export default nextConfig;
