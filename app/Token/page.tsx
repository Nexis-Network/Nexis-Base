import type { Metadata } from "next"

import Background from "@/components/Background"
import VestingButton from "@/components/vesting/vestingButton"
import { WalletContainer } from "@/components/Wallet/WalletContainer"
import Web3DashboardTable from "@/components/WalletDetails"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function Dashboard() {
  return (
    <div className="space-y-0">
      <VestingButton />
    </div>
  )
}
