/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "localhost" },
      { hostname: "topic-hub.vercel.app" },
    ],
  },
};

module.exports = nextConfig;
