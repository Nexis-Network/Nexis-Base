import type * as React from "react"

import { ResourceCard } from "./ResourceCard"

const cardData = [
  {
    title: "EARN REWARDS",
    subtitle: "DELEGATE",
    buttonText: "OPEN",
  },
  {
    title: "AIRDROP",
    subtitle: "QUESTS",
    buttonText: "OPEN",
  },
  {
    title: "TOTAL POINTS",
    subtitle: "0",
    points: 0,
    totalPoints: 503529,
    epoch: "Incentivized testnet is live",
  },
]

export const ResourceCardList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 border-y border-[#181F25]/70 md:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card) => (
        <div key={`${card.title}-${card.subtitle}`}>
          <ResourceCard {...card} />
        </div>
      ))}
    </div>
  )
}
