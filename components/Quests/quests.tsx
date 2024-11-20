"use client"

import React from "react"
import { motion } from "framer-motion"

import Card from "./qcard"
import { QuestCard } from "./questCard"
import type { Quest } from "./questTypes"

const mockQuests: Quest[] = [
  {
    id: 1,
    title: "Complete Your Profile",
    description: "Fill out all fields in your Web3 profile",
    reward: 50,
    difficulty: "Easy",
    progress: 75,
    category: "onboarding",
  },
  {
    id: 2,
    title: "First NFT Purchase",
    description: "Buy your first NFT on our marketplace",
    reward: 100,
    difficulty: "Medium",
    progress: 0,
    category: "social",
  },
  {
    id: 3,
    title: "Stake 100 Tokens",
    description: "Stake 100 tokens in the liquidity pool",
    reward: 200,
    difficulty: "Hard",
    progress: 50,
    category: "on-chain",
  },
  {
    id: 4,
    title: "Refer a Friend",
    description: "Invite a friend to join the platform",
    reward: 75,
    difficulty: "Easy",
    progress: 100,
    category: "social",
  },
  {
    id: 5,
    title: "Create a DAO",
    description: "Set up your first Decentralized Autonomous Organization",
    reward: 150,
    difficulty: "Hard",
    progress: 25,
    category: "developer",
  },
  {
    id: 6,
    title: "Participate in Governance",
    description: "Cast your first vote in a governance proposal",
    reward: 80,
    difficulty: "Medium",
    progress: 0,
    category: "developer",
  },
  {
    id: 7,
    title: "Complete KYC",
    description: "Verify your identity through our KYC process",
    reward: 60,
    difficulty: "Easy",
    progress: 50,
    category: "onboarding",
  },
  {
    id: 8,
    title: "Trade on DEX",
    description: "Make your first trade on our decentralized exchange",
    reward: 120,
    difficulty: "Medium",
    progress: 75,
    category: "on-chain",
  },
  {
    id: 9,
    title: "Mint an NFT",
    description: "Create and mint your own NFT on our platform",
    reward: 180,
    difficulty: "Hard",
    progress: 10,
    category: "ecosystem",
  },
  {
    id: 10,
    title: "Join a Liquidity Pool",
    description: "Provide liquidity to one of our pools",
    reward: 140,
    difficulty: "Medium",
    progress: 30,
    category: "ecosystem",
  },
  {
    id: 11,
    title: "Complete Tutorial Series",
    description: "Finish all beginner tutorials",
    reward: 90,
    difficulty: "Easy",
    progress: 60,
    category: "developer",
  },
  {
    id: 12,
    title: "Achieve Diamond Hands",
    description: "Hold your tokens for 30 days straight",
    reward: 250,
    difficulty: "Hard",
    progress: 80,
    category: "ecosystem",
  },
]

export default function Quests() {
  return (
    <div className="container mx-auto py-10">
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {mockQuests.map((quest) => (
          <React.Fragment key={quest.id}>
            <QuestCard quest={quest} />
            <Card quest={quest} />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
