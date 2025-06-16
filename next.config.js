/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Prevent client-side bundling of Node.js core modules
    if (!isServer) {
      config.resolve = config.resolve || {}; // Ensure resolve object exists
      config.resolve.fallback = {
        ...config.resolve.fallback, // Preserve any existing fallbacks
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        dgram: false,
        module: false,
        request: false
      };
    }
    return config;
  },

  // Configure allowed remote domains for next/image
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },

  // React Strict Mode
  reactStrictMode: false,

  // Advanced configuration for on-demand entries in development.
  // Only change if you understand the implications or are troubleshooting specific dev server performance.
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // Default is 15 * 1000 (15 seconds)
    pagesBufferLength: 2,     // Default is 2
  },

  // The `typescript.ignoreBuildErrors: false` setting is default.
  // It can be removed from the config unless you explicitly want to set it to `true`.
  // typescript: {
  //   ignoreBuildErrors: false,
  // },
};

export default nextConfig;