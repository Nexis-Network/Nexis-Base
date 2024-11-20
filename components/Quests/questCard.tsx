import type React from "react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progressBar/progress"

import Card from "./qcard"
import type { Quest } from "./questTypes"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => (
  <motion.div variants={cardVariants}>
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
        <ProgressBar percent={quest.progress} className="w-full" />
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
