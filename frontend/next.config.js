/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BACKEND_URL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL : process.env.NEXT_PUBLIC_DEV_BACKEND_URL,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
