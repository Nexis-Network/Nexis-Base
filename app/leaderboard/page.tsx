import type { Metadata } from "next"

import Leaderboard from "@/components/Leaderboard"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-10 px-[100px] py-[50px]">
      <Leaderboard />
    </div>
  )
}
