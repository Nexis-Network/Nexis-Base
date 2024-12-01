import type { Metadata } from "next"
import { cookies } from "next/headers"
import { createClient } from "viem"

import BlogCardCarousel from "@/components/blog/blogCarousel"
import { Faqs } from "@/components/faq/faqs"
import Portfolio from "@/components/portfolio/portfolio"
import tokens from "@/components/portfolio/tokens"
import { ReferralPage } from "@/components/referrals/referralPage"
import { WalletContainer } from "@/components/Wallet-v2/WalletContainer"
import WalletDashboard from "@/components/walletDetails/Walletdash"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Nexis Network - The Future of Web3 and Artificial Intelligence",
}

export default function Referrals() {
  return (
    <div className="mx-[2px] mt-0 border-collapse pt-4">
      <ReferralPage />
    </div>
  )
}
