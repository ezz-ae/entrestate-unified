
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ['firebase-admin'],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
module.exports = nextConfig;
