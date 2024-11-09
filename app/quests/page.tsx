import type { Metadata } from "next"

import QuestHero from "@/components/Quests/questHero"
import QuestsGrid from "@/components/Quests/questsGrid"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function Dashboard() {
  return (
    <div className="space-y-20">
      <QuestHero />
      <QuestsGrid />
    </div>
  )
}
