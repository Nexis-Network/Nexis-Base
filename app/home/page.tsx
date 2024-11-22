import type { Metadata } from "next"

import BlogCardCarousel from "@/components/blog/blogCarousel"
import Portfolio from "@/components/portfolio/portfolio"
import NZTStats from "@/components/staking/staking"
import { WalletContainer } from "@/components/Wallet-v2/WalletContainer"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Nexis Network - The Future of Web3 and Artificial Intelligence",
}

export default function Dashboard() {
  return (
    <div className="mx-[10px] my-5 rounded-lg border border-zinc-800 pt-4">
      <div className="border-collapse space-y-10">
        <WalletContainer />
        <Portfolio />
        <BlogCardCarousel />
      </div>
    </div>
  )
}
