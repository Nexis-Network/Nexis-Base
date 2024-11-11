/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import "./env.mjs"

import withPWA from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "app.aave.com",
      "images.unsplash.com",
      "cloudflare-ipfs.com",
      "gateway.ipfs.io",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crew3-production.s3.eu-west-3.amazonaws.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
  env: {
    mode: process.env.NODE_ENV,
  },
  eslint: {
    dirs: ['src', '.']
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /icon/,
      use: ["@svgr/webpack"],
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/icon/] },
      loader: "next-image-loader",
      options: { assetPrefix: "" },
    })
    return config
  },
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  }),
}

export default nextConfig
