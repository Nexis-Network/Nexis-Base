import type { Metadata } from "next"

import QuestModal from "@/components/Quests/QuestModal"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function Dashboard() {
  return (
    <div className="space-y-20">
      <QuestModal />
    </div>
  )
}
