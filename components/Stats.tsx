"use client"

import { useState } from "react"
import { Coins, Gift, Server, Users } from "lucide-react"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Stats({
  nztAmount = "1,000",
  nodesOwned = "5",
  bonusRewards = "250",
  referrals = "10",
}: {
  nztAmount?: string
  nodesOwned?: string
  bonusRewards?: string
  referrals?: string
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cardContent = [
    {
      title: "Amount of NZT",
      value: nztAmount,
      subtitle: "NZT tokens",
      icon: Coins,
    },
    {
      title: "Number of Nodes Owned",
      value: nodesOwned,
      subtitle: "Active nodes",
      icon: Server,
    },
    {
      title: "Bonus Rewards",
      value: bonusRewards,
      subtitle: "NZT tokens",
      icon: Gift,
    },
    {
      title: "Referrals",
      value: referrals,
      subtitle: "Active referrals",
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {cardContent.map((content) => (
        <Card
          key={content.title}
          className="relative mt-0 border-collapse overflow-hidden rounded-none border-l-0 border-t-0 bg-[#0a0a0a] pt-0 text-white"
          onMouseEnter={() => setHoveredCard(content.title)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {hoveredCard === content.title && (
            <CanvasRevealEffect
              colors={[[172, 250, 25]]} // #acfa19 in RGB
              containerClassName="absolute inset-0"
              dotSize={2}
              showGradient={false}
            />
          )}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hoveredCard === content.title
                ? "bg-[#0a0a0a]/50 opacity-100"
                : "opacity-0"
            }`}
          />
          <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {content.title}
            </CardTitle>
            <content.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{content.value}</div>
            <p className="text-xs text-muted-foreground">{content.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
