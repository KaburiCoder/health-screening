/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_CLIENT_DOMAIN],
    },
  },
  reactStrictMode: false,
  env: {
    DOCKER_ENV: process.DOCKER_ENV,
  },
  // output: "standalone",
  // serverRuntimeConfig: {
  //   TEST2: process.env.TEST2,
  //   TEST: process.env.TEST,
  // },
  // // Will be available on both server and client
  // publicRuntimeConfig: {
  //   TEST2: process.env.TEST2,
  //   TEST: process.env.TEST,
  // },
  publicRuntimeConfig: {
    isKubernetes: process.env.KUBERNETES_SERVICE_HOST,
  },
};

export default nextConfig;
