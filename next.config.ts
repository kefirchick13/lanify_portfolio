import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', trailingSlash: true, images: { unoptimized: true }, webpack(config, {dev}) { if (dev) config.watchOptions = { ...config.watchOptions, poll: 1000, aggregateTimeout: 300 }; return config; } };
export default config;
