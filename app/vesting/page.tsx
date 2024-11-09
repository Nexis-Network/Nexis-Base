import type { Metadata } from "next"

import TokenBg from "@/components/token/bg"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function VestingPage() {
  return (
    <div className="space-y-20">
      <TokenBg />
    </div>
  )
}
