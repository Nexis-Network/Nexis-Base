import { useEffect, useState } from "react"
import { Toggle } from "@geist-ui/core"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"

interface TokenResult {
  id: string
  symbol: string
  name: string
  image?: string
  address?: string
  chain?: string
  type?: string
  percentChange1h?: number
}

// Define interfaces for the API response outside of your component
interface CoinItem {
  id: string
  symbol: string
  name: string
  large?: string
  address?: string
  chain?: string
  type?: string
}

interface CoinData {
  item: CoinItem
}

interface TrendingResponse {
  coins: CoinData[]
}

export function TokenSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [trendingTokens, setTrendingTokens] = useState<TokenResult[]>([])
  const [trackedTokens, setTrackedTokens] = useState<Set<string>>(new Set())

  // Define an interface for the raw token data
  interface RawTokenData {
    id?: string
    symbol?: string
    name?: string
    address?: string
    chain?: string
    type?: string
    large?: string
    logo?: string
    percent_change_1h?: number
  }

  // Fetch trending tokens on mount
  useEffect(() => {
    const fetchTrendingTokens = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        )
        const data: TrendingResponse = await response.json()
        const tokens = data.coins.map((coin) => ({
          id: coin.item.id,
          symbol: coin.item.symbol.toUpperCase(),
          name: coin.item.name,
          image: coin.item.large,
          address: coin.item.address || "",
          chain: coin.item.chain || "ethereum",
          type: coin.item.type || "crypto",
        }))
        setTrendingTokens(tokens)
      } catch (error) {
        console.error("Error fetching trending tokens:", error)
      }
    }

    void fetchTrendingTokens()
  }, [])

  // Combined search using both CoinGecko and Moralis
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["tokenSearch", search],
    queryFn: async () => {
      if (!search) return []

      try {
        const [coingeckoRes, moralisRes] = await Promise.all([
          fetch(
            `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
              search
            )}`
          ),
          fetch(
            `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth&addresses=${encodeURIComponent(
              search
            )}`,
            {
              headers: {
                "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
              },
            }
          ),
        ])

        const [coingeckoData, moralisData] = await Promise.all([
          coingeckoRes.json(),
          moralisRes.json(),
        ])

        const coingeckoResults = coingeckoData.coins || []
        const moralisResults = Array.isArray(moralisData) ? moralisData : []

        return [...coingeckoResults, ...moralisResults].map(
          (token: RawTokenData) => ({
            id: token.id || token.address || Math.random().toString(),
            symbol: token.symbol?.toUpperCase() || "",
            name: token.name || "",
            image: token.large || token.logo || "",
            address: token.address || "",
            chain: token.chain || "ethereum",
            type: token.type || "ERC20",
            percentChange1h: token.percent_change_1h || 0,
          })
        )
      } catch (error) {
        console.error("Search error:", error)
        return []
      }
    },
    enabled: search.length > 2,
  })

  const handleToggleToken = (token: TokenResult) => {
    setTrackedTokens((prev) => {
      const newTrackedTokens = new Set(prev)
      if (newTrackedTokens.has(token.id)) {
        newTrackedTokens.delete(token.id)
        // Remove token from database
      } else {
        newTrackedTokens.add(token.id)
        // Add token to database
      }
      return newTrackedTokens
    })
  }

  const tokensToDisplay = search.length > 2 ? searchResults : trendingTokens
  return (
    <div className="z-[5] w-full border-y border-[#181F25]/70 bg-[#07090b]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-start bg-[#07090b] text-[#F2F4F3]/80 hover:bg-[#07090b]/90 hover:text-[#F2F4F3]"
            style={{
              padding: "1rem",
              borderRadius: "0",
            }}
          >
            <MagnifyingGlassIcon className="mr-2 size-4" />
            Search tokens...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full border-[#181F25]/70 bg-[#07090b] p-0">
          <Command className="w-full bg-[#07090b]">
            <CommandInput
              placeholder="Search token or paste address..."
              value={search}
              onValueChange={setSearch}
              className="border-b border-[#181F25]/70"
            />
            <CommandList className="bg-[#07090b]">
              <CommandEmpty className="p-4 text-sm text-gray-400">
                No tokens found.
              </CommandEmpty>
              {tokensToDisplay.length > 0 && (
                <CommandGroup>
                  {tokensToDisplay.map((token) => (
                    <CommandItem key={token.id} className="hover:bg-[#181F25]">
                      <div className="flex w-full items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">
                          {token.image && (
                            <img
                              src={token.image}
                              alt={token.symbol}
                              className="size-6 rounded-full"
                            />
                          )}
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-sm text-gray-400">
                            {token.name}
                          </span>
                          {token.chain && (
                            <span className="rounded bg-[#181F25] px-1.5 py-0.5 text-xs text-gray-300">
                              {token.chain}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-sm ${
                              (token.percentChange1h ?? 0) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {token.percentChange1h?.toFixed(2) ?? "N/A"}%
                          </span>
                          <Toggle
                            checked={trackedTokens.has(token.id)}
                            onChange={() => handleToggleToken(token)}
                            className="bg-[#181F25] data-[state=checked]:bg-lime-300"
                          />
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
