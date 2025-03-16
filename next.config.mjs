/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tripsybucket-aws.s3.us-east-1.amazonaws.com',
              pathname: '/profile-images/**',
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
