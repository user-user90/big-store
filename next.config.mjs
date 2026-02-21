/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devoted-sparkle-117ce00640.media.strapiapp.com', // تم تحديث النطاق هنا
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devoted-sparkle-117ce00640.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;