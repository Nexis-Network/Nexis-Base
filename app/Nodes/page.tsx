"use client"

import { Button } from "@/components/ui/button"

// Mock validators data
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

export default function NodesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="bg-gradient-to-r from-primary to-[#DC1FFF] bg-clip-text text-4xl font-bold text-transparent">
          Nexis Staking
        </h1>
        <p className="text-muted-foreground">
          Stake your NZT tokens with validators to earn rewards and secure the
          network
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Staked</p>
          <p className="text-2xl font-bold">1.35M NZT</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Average APY</p>
          <p className="text-2xl font-bold">12.5%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Active Validators</p>
          <p className="text-2xl font-bold">{VALIDATORS.length}</p>
        </div>
      </div>

      {/* Validators Grid */}
      <div className="grid gap-6">
        {VALIDATORS.map((validator) => (
          <div
            key={validator.publicKey}
            className="rounded-lg border bg-card p-6 transition-all hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{validator.name}</h3>
                  <p className="font-mono text-sm text-muted-foreground">
                    {validator.publicKey}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-8 text-sm">
                  <div>
                    <p className="text-muted-foreground">Commission</p>
                    <p>{validator.commission}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Stake</p>
                    <p>{validator.activeStake.toLocaleString()} NZT</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">APY</p>
                    <p className="text-primary">{validator.apy}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Score</p>
                    <p>{validator.score}/100</p>
                  </div>
                </div>
              </div>
              <Button size="lg">Stake</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
