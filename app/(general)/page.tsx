import { Metadata } from "next"
import { useAccount } from "wagmi"

import { PythChart } from "@/components/CryptoChart/pyth-chart"
import { TransactionHistory } from "@/components/TransactionHistory"
import { WalletContainer } from "@/components/Wallet/WalletContainer"
import Web3DashboardTable from "@/components/WalletDetails"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function Dashboard() {
  return (
    <div className="space-y-0">
      <WalletContainer />
      <Web3DashboardTable />
    </div>
  )
}
