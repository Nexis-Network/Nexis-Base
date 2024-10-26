"use client"

import React from "react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Quest {
  id: string
  title: string
  description: string
  reward: number
  difficulty: "Easy" | "Medium" | "Hard"
  progress: number
}

const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Complete Your Profile",
    description: "Fill out all fields in your Web3 profile",
    reward: 50,
    difficulty: "Easy",
    progress: 75,
  },
  {
    id: "2",
    title: "First NFT Purchase",
    description: "Buy your first NFT on our marketplace",
    reward: 100,
    difficulty: "Medium",
    progress: 0,
  },
  {
    id: "3",
    title: "Stake 100 Tokens",
    description: "Stake 100 tokens in the liquidity pool",
    reward: 200,
    difficulty: "Hard",
    progress: 50,
  },
  {
    id: "4",
    title: "Refer a Friend",
    description: "Invite a friend to join the platform",
    reward: 75,
    difficulty: "Easy",
    progress: 100,
  },
  {
    id: "5",
    title: "Create a DAO",
    description: "Set up your first Decentralized Autonomous Organization",
    reward: 150,
    difficulty: "Hard",
    progress: 25,
  },
  {
    id: "6",
    title: "Participate in Governance",
    description: "Cast your first vote in a governance proposal",
    reward: 80,
    difficulty: "Medium",
    progress: 0,
  },
  {
    id: "7",
    title: "Complete KYC",
    description: "Verify your identity through our KYC process",
    reward: 60,
    difficulty: "Easy",
    progress: 50,
  },
  {
    id: "8",
    title: "Trade on DEX",
    description: "Make your first trade on our decentralized exchange",
    reward: 120,
    difficulty: "Medium",
    progress: 75,
  },
  {
    id: "9",
    title: "Mint an NFT",
    description: "Create and mint your own NFT on our platform",
    reward: 180,
    difficulty: "Hard",
    progress: 10,
  },
  {
    id: "10",
    title: "Join a Liquidity Pool",
    description: "Provide liquidity to one of our pools",
    reward: 140,
    difficulty: "Medium",
    progress: 30,
  },
  {
    id: "11",
    title: "Complete Tutorial Series",
    description: "Finish all beginner tutorials",
    reward: 90,
    difficulty: "Easy",
    progress: 60,
  },
  {
    id: "12",
    title: "Achieve Diamond Hands",
    description: "Hold your tokens for 30 days straight",
    reward: 250,
    difficulty: "Hard",
    progress: 80,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="flex h-full flex-col rounded-md border border-[#242424]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">{quest.title}</CardTitle>
          <Badge
            variant={
              quest.difficulty === "Easy"
                ? "secondary"
                : quest.difficulty === "Medium"
                ? "default"
                : "destructive"
            }
          >
            {quest.difficulty}
          </Badge>
        </div>
        <CardDescription>{quest.description}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{quest.progress}%</span>
        </div>
        <Progress value={quest.progress} className="w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-lg font-bold">{quest.reward} Tokens</span>
        <Button
          variant={quest.progress === 100 ? "default" : "outline"}
          className={
            quest.progress !== 100 ? "cursor-not-allowed opacity-50" : ""
          }
          disabled={quest.progress !== 100}
        >
          {quest.progress === 100 ? "Claim Reward" : "Start Quest"}
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

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
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </motion.div>
    </div>
  )
}
