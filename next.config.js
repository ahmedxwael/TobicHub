/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "topic-hub" },
      { hostname: "sswtxosnnuquunvksddq.supabase.co" },
    ],
  },
};

module.exports = nextConfig;
