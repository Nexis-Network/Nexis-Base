"use client"

import React, { useState } from "react"

import Qcard from "./qcard"
import type { Quest } from "./questTypes"

const QuestsGrid = () => {
  // Sample data for quests
  const quests: Quest[] = [
    {
      id: 1,
      category: "onboarding",
      title: "Welcome Quest",
      description: "Start your journey.",
      reward: 10,
      difficulty: "Easy",
      progress: 0,
    },
    {
      id: 2,
      category: "social",
      title: "Friend Quest",
      description: "Make a new friend.",
      reward: 0,
      difficulty: "Medium",
      progress: 0,
    },
  ]

  // State for active filter
  const [activeFilter, setActiveFilter] = useState("all")

  // Handler for filter buttons
  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
  }

  // Filtered quests based on active filter
  const filteredQuests =
    activeFilter === "all"
      ? quests
      : quests.filter(
          (quest: Quest) =>
            (quest as Quest & { category: string }).category === activeFilter
        )

  return (
    <div className="container mx-auto p-4">
      {/* Filter Buttons */}
      <div className="mb-6 flex justify-start space-x-4">
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-8 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "all"
              ? "bg-[##07090b]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-4 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "onboarding"
              ? "bg-[#F2F4F3]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("onboarding")}
        >
          Onboarding
        </button>
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-4 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "social"
              ? "bg-[#F2F4F3]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("social")}
        >
          Social
        </button>
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-4 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "on-chain"
              ? "bg-[#F2F4F3]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("on-chain")}
        >
          On-chain
        </button>
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-4 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "ecosystem"
              ? "bg-[#F2F4F3]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("ecosystem")}
        >
          Ecosystem
        </button>
        <button
          type="button"
          className={`rounded-3xl border border-[#181F25]/70 px-4 py-2 hover:border-[#181F25]/50 ${
            activeFilter === "developer"
              ? "bg-[#F2F4F3]/30 text-[#F2F4F3]"
              : "bg-[#07090b]"
          }`}
          onClick={() => handleFilterChange("developer")}
        >
          Developer
        </button>
      </div>

      {/* Grid of Qcards */}
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-4">
        {filteredQuests.slice(0, 12).map((quest) => (
          <Qcard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}

export default QuestsGrid
