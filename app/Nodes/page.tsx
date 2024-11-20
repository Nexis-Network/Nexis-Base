"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [nodeStatus, setNodeStatus] = useState("Active")
  const [delegatedTokens, setDelegatedTokens] = useState(1000)
  const [totalRewards, setTotalRewards] = useState(50)
  const [uptime, setUptime] = useState(99.9)

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setDelegatedTokens((prev) => prev + Math.floor(Math.random() * 10))
      setTotalRewards((prev) => prev + Math.random())
      setUptime((prev) => Math.min(100, prev + Math.random() * 0.1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-20 my-10">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Node Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nodeStatus}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Delegated Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {delegatedTokens.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRewards.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uptime.toFixed(2)}%</div>
              <Progress value={uptime} className="mt-2" />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Delegate More</Button>
            <Button variant="outline">Claim Rewards</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
