"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { SUPPORTED_CHAINS, type SupportedChainId } from "@/lib/moralis"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Token {
  type: "native" | "erc20"
  token_address: string
  name: string
  symbol: string
  logo: string | null
  decimals: number
  balance: string
  price: number
  price_change_24h: number
  volume_24h: number
  market_cap: number
  portfolio_percentage: number
}

export function TokenPortfolio() {
  const { address, isConnected } = useAccount()
  const [activeChain, setActiveChain] = useState<SupportedChainId>(
    SUPPORTED_CHAINS[0].id
  )

  const handleChainChange = (value: string) => {
    setActiveChain(value as SupportedChainId)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["tokens", address, activeChain],
    queryFn: async () => {
      if (!address) return null
      const response = await fetch(
        `/api/tokens?address=${address}&chain=${activeChain}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch tokens")
      }
      const data = (await response.json()) as Token[]
      return data
    },
    enabled: isConnected && !!address,
  })

  if (!isConnected) {
    return (
      <div className="py-10 text-center">
        <p>Please connect your wallet to view your tokens</p>
      </div>
    )
  }

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`
    return `$${num.toFixed(decimals)}`
  }

  const formatBalance = (balance: string, decimals: number) => {
    const num = Number(balance) / 10 ** decimals
    return num.toFixed(4)
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeChain} onValueChange={handleChainChange}>
        {SUPPORTED_CHAINS.map((chain) => (
          <TabsContent key={chain.id} value={chain.id}>
            {isLoading ? (
              <div className="space-y-4">
                {["a", "b", "c"].map((id) => (
                  <Skeleton
                    key={`skeleton-${activeChain}-${id}`}
                    className="h-20 w-full"
                  />
                ))}
              </div>
            ) : data?.length === 0 ? (
              <div className="py-10 text-center">
                <p>No tokens found on {chain.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-4 text-right">
                  <p className="text-lg font-semibold">
                    Total Portfolio Value:{" "}
                    {formatNumber(
                      data?.reduce(
                        (acc, token) =>
                          acc +
                          (token.price * Number(token.balance)) /
                            10 ** token.decimals,
                        0
                      ) || 0
                    )}
                  </p>
                </div>
                <div className="grid gap-4">
                  {data?.map((token: Token) => (
                    <Card key={token.token_address} className="p-4">
                      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
                        <div className="flex items-center gap-2 md:col-span-2">
                          {token.logo ? (
                            <Image
                              src={token.logo}
                              alt={token.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="size-8 rounded-full bg-gray-200" />
                          )}
                          <div>
                            <p className="font-semibold">{token.symbol}</p>
                            <p className="text-sm text-gray-500">
                              {token.name}
                            </p>
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">Balance</p>
                          <p>{formatBalance(token.balance, token.decimals)}</p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">Price</p>
                          <p>{formatNumber(token.price)}</p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">24h Change</p>
                          <p
                            className={
                              token.price_change_24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {token.price_change_24h.toFixed(2)}%
                          </p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">Volume 24h</p>
                          <p>{formatNumber(token.volume_24h)}</p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">Market Cap</p>
                          <p>{formatNumber(token.market_cap)}</p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-500">Portfolio %</p>
                          <p>{token.portfolio_percentage.toFixed(2)}%</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
