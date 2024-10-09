const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    async rewrites() {
        return [
          {
            source: '/',
            destination: '/en', // 默认语言
          },
        ];
      },
};

module.exports = withNextIntl(nextConfig);