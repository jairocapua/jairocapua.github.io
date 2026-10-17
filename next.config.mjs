/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (see .github/workflows/deploy.yml).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
