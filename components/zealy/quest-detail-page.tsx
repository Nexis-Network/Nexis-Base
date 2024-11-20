/* eslint-disable @typescript-eslint/no-floating-promises */
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type QuestTask = {
  id: string
  description: string
  completed: boolean
}

type QuestDetail = {
  id: string
  title: string
  description: string
  points: number
  tasks: QuestTask[]
}

export default function QuestDetailPage() {
  const [quest, setQuest] = useState<QuestDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const { isConnected } = useAccount()
  const router = useRouter()
  const params = useParams()
  const questId = params?.id as string

  useEffect(() => {
    if (isConnected && questId) {
      fetchQuestDetails()
    }
  }, [isConnected, questId])

  const fetchQuestDetails = async () => {
    setLoading(true)
    try {
      // Replace with actual Zealy API call
      const response = await fetch(`/api/quests/${questId}`)
      const data = await response.json()
      setQuest(data)
    } catch (error) {
      console.error("Error fetching quest details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    try {
      // Replace with actual Zealy API call to complete task
      await fetch(`/api/quests/${questId}/tasks/${taskId}/complete`, {
        method: "POST",
      })
      fetchQuestDetails() // Refresh quest details
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/quests")}>
          Back to Quests
        </Button>
        <ConnectButton />
      </div>

      {!isConnected ? (
        <Card>
          <CardContent className="flex h-[200px] items-center justify-center">
            <p>Please connect your wallet to view quest details.</p>
          </CardContent>
        </Card>
      ) : loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[300px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mt-2 h-4 w-[250px]" />
            <Skeleton className="mt-2 h-4 w-[200px]" />
            <div className="mt-4">
              {[...Array(3)].map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Skeleton key={index} className="mt-2 h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : quest ? (
        <Card>
          <CardHeader>
            <CardTitle>{quest.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              {quest.description}
            </p>
            <p className="mt-2 font-semibold">{quest.points} points</p>
            <div className="mt-4 space-y-4">
              {quest.tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <p>{task.description}</p>
                    {task.completed ? (
                      <Button variant="outline" disabled>
                        Completed
                      </Button>
                    ) : (
                      <Button onClick={() => handleCompleteTask(task.id)}>
                        Complete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex h-[200px] items-center justify-center">
            <p>Quest not found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
