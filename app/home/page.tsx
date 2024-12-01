import type { Metadata } from "next"
import { cookies } from "next/headers"
import { createClient } from "viem"

import BlogCardCarousel from "@/components/blog/blogCarousel"
import { Faqs } from "@/components/faq/faqs"
import Portfolio from "@/components/portfolio/portfolio"
import tokens from "@/components/portfolio/tokens"
import { Referrals } from "@/components/referrals/Referrals"
import { WalletContainer } from "@/components/Wallet-v2/WalletContainer"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Nexis Network - The Future of Web3 and Artificial Intelligence",
}

export default function Home() {
  return (
    <div>
      <div className="mx-[5px] mt-5 border-collapse rounded-t-lg border border-[#181F25]/70 pt-4">
        <div className="border-collapse space-y-2">
          <WalletContainer />
          <Portfolio />
          <div className="border-x border-[#181F25]/70 py-1" />
          <Referrals />
          <BlogCardCarousel />
          <Faqs />
        </div>
      </div>
    </div>
  )
}
