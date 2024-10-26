import { Metadata } from "next"

import NZTVestingChart from "@/components/web3dashboard/ChartDashboard"
import { DashboardShell } from "@/components/web3dashboard/dashboard-shell"
import { NodeManager } from "@/components/web3dashboard/NodeManager"
import ReferralDashboard from "@/components/web3dashboard/Referrals"
import { TokenActionCenter } from "@/components/web3dashboard/TokenActionCenter"
import { TokenCard } from "@/components/web3dashboard/TokenCard"
import { VestingDashboard } from "@/components/web3dashboard/VestingDashboard"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function NodesPage() {
  return (
    <DashboardShell>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ReferralDashboard />
        <TokenCard
          symbol="ETH"
          balance="10.5"
          price={2000}
          change24h={5.2}
          change7d={-2.1}
          change30d={10.5}
        />
        <VestingDashboard />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <NodeManager />
        <TokenActionCenter />
      </div>
      <div className="my-4">
        <NZTVestingChart />
      </div>
    </DashboardShell>
  )
}
