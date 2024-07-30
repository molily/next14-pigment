// @ts-check

/** @import { ThemeArgs } from '@pigment-css/react/theme' */

import { withPigment } from '@pigment-css/nextjs-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
};
/** @type {ThemeArgs} */
const theme = {
  fgColor: 'navy',
};
const configWithPigment = withPigment(nextConfig, {
  theme,
});

export default configWithPigment;
