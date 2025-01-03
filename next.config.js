/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  staticPageGenerationTimeout: 500,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      }
    ]
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    NEXT_STRIPE_PK_TEST: process.env.NEXT_STRIPE_PK_TEST,
    NEXT_STRIPE_PK_LIVE: process.env.NEXT_STRIPE_PK_LIVE,
    NEXT_STRIPE_SK_TEST: process.env.NEXT_STRIPE_SK_TEST,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SPEEDY_API_URL: process.env.SPEEDY_API_URL,
    IS_RELEASED: process.env.IS_RELEASED,
    EMAIL_TEMPLATE_ID_EN: process.env.EMAIL_TEMPLATE_ID_EN,
    EMAIL_TEMPLATE_ID_IT: process.env.EMAIL_TEMPLATE_ID_IT,
    EMAIL_TEMPLATE_ID_BG: process.env.EMAIL_TEMPLATE_ID_BG
  },
  i18n
}

module.exports = nextConfig
