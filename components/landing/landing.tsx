"use client"

import { FocusCards } from "@/components/ui/focus-cards"

const cards = [
  {
    title: "NEXIS HOMEBASE",
    description: "Discover",
    src: "/images/image1.jpg",
    href: "/home",
  },
  {
    title: "VESTING",
    description: "View your holdings",
    src: "/images/image2.jpg",
    href: "/vesting",
  },
  {
    title: "$NZT",
    description: "Stake and earn",
    src: "/images/image3.jpg",
    href: "/token",
  },
  {
    title: "EXPLORE QUESTS",
    description: "Explore Nexis Network",
    src: "/images/image4.jpg",
    href: "/quests",
  },
]

export default function Landing() {
  return (
    <div
      className="relative flex h-screen w-screen gap-2.5 p-2.5"
      style={{ boxSizing: "border-box" }}
    >
      <FocusCards cards={cards} />
    </div>
  )
}
