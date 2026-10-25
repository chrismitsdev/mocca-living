import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.150'],
  images: {
    qualities: [60, 75]
  },
  async headers() {
    return [
      {
        source: '/:locale/guest-app/:path*',
        headers: [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}]
      }
    ]
  }
}
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
