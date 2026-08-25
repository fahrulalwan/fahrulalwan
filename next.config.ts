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
      /* Temporary, unlike the five above. Those routes are gone for good; this
         one is a parent that does not exist yet. Readers trim `/work/<slug>`
         down to `/work` by habit, and the landing already lists every study —
         but an index page earns itself once there are more than a few, and a
         308 cached in every browser would make that hard to take back. */
      { source: '/work', destination: '/', permanent: false },
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
