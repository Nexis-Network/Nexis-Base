import type { Metadata } from "next"

import BlogCardCarousel from "@/components/blog/blogCarousel"
import Portfolio from "@/components/portfolio/portfolio"
import NZTStats from "@/components/staking/staking"
import { WalletContainer } from "@/components/Wallet-v2/WalletContainer"
import Web3DashboardTable from "@/components/WalletDetails"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Nexis Network - The Future of Web3 and Artificial Intelligence",
}

export default function Dashboard() {
  return (
    <div className="mx-[40px] my-0 border-collapse space-y-10 rounded-none border border-zinc-800 p-5">
      <WalletContainer />
      <NZTStats />
      <Portfolio />
      <Web3DashboardTable />
      <BlogCardCarousel />
    </div>
  )
}
