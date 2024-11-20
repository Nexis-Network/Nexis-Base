"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Quest = {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
}

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      fetchQuests()
    }
  }, [isConnected])

  const fetchQuests = async () => {
    setLoading(true)
    try {
      // Replace with actual Zealy API call
      const response = await fetch("/api/quests")
      const data = await response.json()
      setQuests(data)
    } catch (error) {
      console.error("Error fetching quests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestClick = (questId: string) => {
    router.push(`/quest/${questId}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Web3 Quests</h1>
        <ConnectButton />
      </div>

      {!isConnected ? (
        <Card>
          <CardContent className="flex h-[200px] items-center justify-center">
            <p>Please connect your wallet to view quests.</p>
          </CardContent>
        </Card>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(16)].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mt-2 h-4 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className={`cursor-pointer transition-all duration-200 ${
                quest.completed
                  ? "bg-green-100 dark:bg-green-900"
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleQuestClick(quest.id)}
            >
              <CardHeader>
                <CardTitle>{quest.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {quest.description}
                </p>
                <p className="mt-2 font-semibold">{quest.points} points</p>
                {quest.completed && (
                  <Button className="mt-2" variant="outline" disabled>
                    Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
