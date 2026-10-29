/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // tinacms build emits a static public/admin/index.html
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }]
  },
}

export default nextConfig
