import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
  
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Webpack configuration
  webpack: (config, { dev }) => {
    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Disable minification to avoid the webpack error
    if (!dev) {
      config.optimization = config.optimization || {};
      config.optimization.minimize = false;
    }
    
    return config;
  },
};

export default nextConfig;
