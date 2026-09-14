import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.178.57'],
  images: {
    qualities: [60, 75]
  }
}
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
