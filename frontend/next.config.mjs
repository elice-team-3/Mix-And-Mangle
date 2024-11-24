import pwaModule from 'next-pwa'

const withPWA = pwaModule({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
}

export default withPWA(nextConfig)