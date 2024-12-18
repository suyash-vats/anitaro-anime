import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["mangadex.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangadex.org",
        port: "",
        pathname: "/covers/**",
      },
    ],
  },
};

export default nextConfig;
