"use client"

import { FocusCards } from "@/components/ui/focus-cards"

const cards = [
  {
    title: "NEXIS HOMEBASE",
    description: "Discover",
    src: "/images/image1.jpg",
  },
  {
    title: "VESTING",
    description: "View your holdings",
    src: "/images/image2.jpg",
  },
  {
    title: "$NZT",
    description: "Stake and earn",
    src: "/images/image3.jpg",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    description: "Explore Nexis Network",
    src: "/images/image4.jpg",
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
