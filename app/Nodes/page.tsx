import type { Metadata } from "next"

import CustomizedDataGrid from "@/components/nodes/CustomizedDataGrid"
import ScrollBanner from "@/components/ScrollBanner"
import { WalletContainer } from "@/components/Wallet/WalletContainer"
import Web3DashboardTable from "@/components/WalletDetails"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function Dashboard() {
  return (
    <div className="space-y-6 px-10">
      <CustomizedDataGrid />
    </div>
  )
}
