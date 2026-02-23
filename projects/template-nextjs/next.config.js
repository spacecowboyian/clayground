/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export – required for GitHub Pages
  output: 'export',

  // Set basePath to your project folder name so assets resolve correctly
  // when hosted at https://spacecowboyian.github.io/clayground/template-nextjs/
  basePath: '/clayground/template-nextjs',

  // Disable the built-in image optimisation (not supported in static export)
  images: { unoptimized: true },

  // Write the static output directly into the docs/ folder at the repo root
  distDir: '../../docs/template-nextjs',
}

module.exports = nextConfig
