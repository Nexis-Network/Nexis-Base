"use client"

import { useState } from "react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SUPPORTED_CHAINS = [
  { id: 1, name: "Ethereum", symbol: "ETH", icon: "/icons/eth.svg" },
  { id: 56, name: "BSC", symbol: "BNB", icon: "/icons/bsc.svg" },
  { id: 137, name: "Polygon", symbol: "MATIC", icon: "/icons/polygon.svg" },
] as const

export default function NexisBridge() {
  const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0])

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Bridge Tokens
          </h2>
          <p className="text-sm text-muted-foreground">
            Transfer your tokens across different networks
          </p>
        </div>

        <div className="grid gap-6">
          {/* From Chain Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              From Chain
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) =>
                setFromChain((prevChain: any) => {
                  const newChain = SUPPORTED_CHAINS.find(
                    (chain) => chain.id === Number(e.target.value)
                  )
                  return newChain || prevChain
                })
              }
            >
              {SUPPORTED_CHAINS.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* To Chain Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              To Chain
            </label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {SUPPORTED_CHAINS.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Amount
            </label>
            <div className="relative">
              <Input type="number" placeholder="0.0" className="pr-20" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="sm">
                  MAX
                </Button>
              </div>
            </div>
          </div>

          {/* Bridge Button */}
          <Button className="w-full" size="lg">
            Bridge Tokens
          </Button>

          {/* Fee Info Card */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Fee</span>
              <span className="font-medium">0.001 {fromChain.symbol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
