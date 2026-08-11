import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/experience', destination: '/', permanent: true },
      { source: '/projects', destination: '/', permanent: true },
      { source: '/skills', destination: '/', permanent: true },
      { source: '/education', destination: '/', permanent: true },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: 'mohammad-fahrul-alwan',
  project: 'fahrulalwan',

  silent: !process.env.CI,

  widenClientFileUpload: true,

  tunnelRoute: '/monitoring',

  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },

  webpack: {
    autoInstrumentServerFunctions: false,
    reactComponentAnnotation: {
      enabled: true,
    },
  },
});
