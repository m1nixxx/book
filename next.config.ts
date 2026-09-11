import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.yes24.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
