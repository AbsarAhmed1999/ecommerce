/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable strict mode for better error detection
  swcMinify: true, // Enable SWC compiler minification (Next.js default)

  // Ensure environment variables are passed correctly
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SMTP_HOST: process.env.SMTP_HOST,
    SERVICE: process.env.SERVICE,
    USER: process.env.USER,
    GMAIL_AUTH: process.env.GMAIL_AUTH,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },

  // Custom webpack configuration (if needed)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Example: Fix for dependencies that only work on the server-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Disable 'fs' (file system) for client-side
      };
    }
    return config;
  },
};

export default nextConfig;
