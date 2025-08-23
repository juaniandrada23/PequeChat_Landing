import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround: disable webpack minification in production to avoid build error
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = config.optimization || {};
      config.optimization.minimize = false;
    }
    return config;
  },
};

export default nextConfig;
