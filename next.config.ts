import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75]
  },
  allowedDevOrigins: ['192.168.178.24']
}
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
