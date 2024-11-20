import type { Metadata } from "next"

import { ConnectButton } from "@/components/Header/ConnectionButton"
import VestingButton from "@/components/vesting/vestingButton"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function VestingPage() {
  return (
    <div className="space-y-20">
      <VestingButton />
    </div>
  )
}
