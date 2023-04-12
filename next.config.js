/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.me",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
