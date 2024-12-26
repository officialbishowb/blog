import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      domains: ['placehold.co','avatars.githubusercontent.com'],
      dangerouslyAllowSVG: true,
   },
};

export default nextConfig;
