import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repoBasePath = '/lanify_portfolio';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? repoBasePath : undefined,
  assetPrefix: isProd ? `${repoBasePath}/` : undefined,
  images: { unoptimized: true },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = { ...config.watchOptions, poll: 1000, aggregateTimeout: 300 };
    }
    return config;
  },
};

export default config;
