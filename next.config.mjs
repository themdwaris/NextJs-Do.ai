/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
    // domains: ['img.clerk.com'], // ✅ Add this line
  },
};

export default nextConfig;
