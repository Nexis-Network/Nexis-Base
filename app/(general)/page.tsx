import type { Metadata } from "next"

import Landing from "@/components/landing/landing"

export const metadata: Metadata = {
  title: "Nexis Network Dashboard",
  description: "Manage your tokens, nodes, and view advanced analytics",
}

export default function LandingPage() {
  return (
    <div className="space-y-0">
      <Landing />
    </div>
  )
}
