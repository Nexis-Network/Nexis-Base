"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { SUPPORTED_CHAINS, type SupportedChainId } from "@/lib/moralis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NFT {
  token_address: string
  token_id: string
  amount: string
  token_hash: string
  block_number_minted: string
  updated_at: string
  contract_type: string
  name: string
  symbol: string
  token_uri: string
  metadata: {
    name: string
    description: string
    image: string
  }
  possible_spam: boolean
  verified_collection: boolean
}

export function NFTGallery() {
  const { address, isConnected } = useAccount()
  const [activeChain, setActiveChain] = useState<SupportedChainId>(
    SUPPORTED_CHAINS[0].id
  )

  const handleChainChange = (value: string) => {
    setActiveChain(value as SupportedChainId)
  }

  const { data: nfts, isLoading } = useQuery({
    queryKey: ["nfts", address, activeChain],
    queryFn: async () => {
      if (!address) return []
      const response = await fetch(
        `/api/nfts?address=${address}&chain=${activeChain}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch NFTs")
      }
      const data = await response.json()
      return data.result as NFT[]
    },
    enabled: isConnected && !!address,
  })

  if (!isConnected) {
    return (
      <div className="py-10 text-center">
        <p>Please connect your wallet to view your NFTs</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeChain} onValueChange={handleChainChange}>
        <TabsList className="grid w-full grid-cols-3">
          {SUPPORTED_CHAINS.map((chain) => (
            <TabsTrigger key={chain.id} value={chain.id}>
              {chain.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {SUPPORTED_CHAINS.map((chain) => (
          <TabsContent key={chain.id} value={chain.id}>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["a", "b", "c", "d", "e", "f"].map((id) => (
                  <Skeleton
                    key={`skeleton-${activeChain}-${id}`}
                    className="h-[300px] w-full"
                  />
                ))}
              </div>
            ) : nfts?.length === 0 ? (
              <div className="py-10 text-center">
                <p>No NFTs found on {chain.name}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nfts?.map((nft) => (
                  <Card key={`${nft.token_address}-${nft.token_id}`}>
                    <CardHeader>
                      <CardTitle>
                        {nft.metadata?.name ||
                          nft.name ||
                          `NFT #${nft.token_id}`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {nft.metadata?.image && (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={nft.metadata.image}
                            alt={nft.metadata?.name || "NFT"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {nft.metadata?.description ||
                          "No description available"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
