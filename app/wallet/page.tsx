import type { Metadata } from "next"
import { cookies } from "next/headers"
import { createClient } from "viem"

import BlogCardCarousel from "@/components/blog/blogCarousel"
import { Faqs } from "@/components/faq/faqs"
import Portfolio from "@/components/portfolio/portfolio"
import tokens from "@/components/portfolio/tokens"
import { Referrals } from "@/components/referrals/Referrals"
import { WalletContainer } from "@/components/Wallet-v2/WalletContainer"
import WalletDashboard from "@/components/walletDetails/Walletdash"
import WalletHistory from "@/components/walletDetails/walletHistory"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Nexis Network - The Future of Web3 and Artificial Intelligence",
}

export default function Home() {
  return (
    <div className="mx-0 mt-0 border-collapse pt-4">
      <div className="border-collapse space-y-10">
        <WalletDashboard />
        <WalletHistory />
      </div>
    </div>
  )
}
