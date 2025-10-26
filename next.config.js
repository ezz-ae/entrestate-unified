/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  serverExternalPackages: ['firebase-admin'],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
module.exports = nextConfig;
