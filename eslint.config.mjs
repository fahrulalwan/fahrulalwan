import nextConfig from 'eslint-config-next/core-web-vitals';
import tsConfig from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextConfig,
  ...tsConfig,
  { settings: { react: { version: '19' } } },
];

export default eslintConfig;
