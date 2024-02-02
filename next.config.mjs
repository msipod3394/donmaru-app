/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
