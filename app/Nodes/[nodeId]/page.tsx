"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Using the same validators data (you should move this to a shared location)
const VALIDATORS = [
  {
    publicKey: "NZT7nJrxqodF3z9YvKnxwUbJ5zJK1FrjBY2WeHf89w2",
    name: "Nexis Foundation",
    commission: 10,
    activeStake: 450000,
    apy: 12.5,
    score: 98,
  },
  {
    publicKey: "NZT9xKpJkn6JqumUMw4FHvqxhvjxGvED7HAJGMkd2w1",
    name: "Nexis Labs",
    commission: 8,
    activeStake: 380000,
    apy: 11.8,
    score: 95,
  },
  {
    publicKey: "NZT5xKpJkn6JqumUMw4FHvqxhvjxGvED7HAJGMkd2w3",
    name: "Nexis Staking Pool",
    commission: 7,
    activeStake: 520000,
    apy: 13.2,
    score: 97,
  },
] as const

export default function NodeStakingPage() {
  const { nodeId } = useParams()
  const [amount, setAmount] = useState("")

  const validator = VALIDATORS.find((v) => v.publicKey === nodeId)

  if (!validator) {
    return <div>Validator not found</div>
  }

  const handleDelegate = () => {
    // Implement delegation logic here
    console.log(`Delegating ${amount} NZT to ${validator.name}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Validator Details */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">{validator.name}</h1>
        <p className="font-mono text-sm text-muted-foreground">
          {validator.publicKey}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Commission</p>
          <p className="text-2xl font-bold">{validator.commission}%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Active Stake</p>
          <p className="text-2xl font-bold">
            {validator.activeStake.toLocaleString()} NZT
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">APY</p>
          <p className="text-2xl font-bold text-primary">{validator.apy}%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-2xl font-bold">{validator.score}/100</p>
        </div>
      </div>

      {/* Staking Form */}
      <div className="mx-auto max-w-md space-y-6 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Stake NZT</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm text-muted-foreground">
              Amount to Stake
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter NZT amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleDelegate}>
            Delegate
          </Button>
        </div>
      </div>
    </div>
  )
}
