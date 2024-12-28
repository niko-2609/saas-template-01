/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tripsybucket-aws.s3.us-east-1.amazonaws.com',
            pathname: '/profile-images/**',
          },
        ],
      },
};

export default nextConfig;
