import type { Metadata } from "next"

import { CryptoChart } from "@/components/CryptoChart/Chart"
import Stats from "@/components/Stats"
import RecentTransactions from "@/components/Transactions"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function TokenomicsPage() {
  return (
    <div className="space-y-0">
      <CryptoChart ticker="ETH/USD" />
      <Stats />
      <RecentTransactions />
    </div>
  )
}
