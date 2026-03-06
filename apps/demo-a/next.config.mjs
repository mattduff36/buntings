/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
