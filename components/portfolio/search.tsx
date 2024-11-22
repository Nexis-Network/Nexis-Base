import { useEffect, useState } from "react"
import { Toggle } from "@geist-ui/core"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { Token } from "@thirdweb-dev/sdk"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

// Rename the local Token interface to avoid conflict
interface LocalToken {
  contractAddress: string
  // ... other properties
}

// Update the TokenSearchProps to use the renamed interface
interface TokenSearchProps {
  onAddToken: (tokenResult: TokenResult) => void
  onRemoveToken: (tokenResult: TokenResult) => void
  trackedTokens: LocalToken[]
}

const TokenSearch: React.FC<TokenSearchProps> = ({
  onAddToken,
  onRemoveToken,
  trackedTokens,
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [trendingTokens, setTrendingTokens] = useState<TokenResult[]>([])

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
          chain: coin.item.chain || "",
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

  const tokensToDisplay = search.length > 2 ? searchResults : trendingTokens

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start rounded-none">
          <MagnifyingGlassIcon className="mr-2" />
          Search tokens...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-4 my-2 w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search token or paste address..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            {tokensToDisplay.length > 0 && (
              <CommandGroup>
                {tokensToDisplay.map((token) => {
                  const isTracked = trackedTokens.some(
                    (t) => t.contractAddress === token.address
                  )

                  const handleToggle = (checked: boolean) => {
                    if (checked) {
                      onAddToken(token)
                    } else {
                      onRemoveToken(token)
                    }
                  }

                  return (
                    <CommandItem key={token.id}>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          {token.image && (
                            <img
                              src={token.image}
                              alt={token.symbol}
                              className="size-6 rounded-full"
                            />
                          )}
                          <span>{token.symbol}</span>
                          <span className="text-sm text-muted-foreground">
                            {token.name}
                          </span>
                          {token.chain && (
                            <span className="rounded border-b border-lime-300 bg-lime-300/30 px-1 text-xs">
                              {token.chain}
                            </span>
                          )}
                          <span>
                            {token.percentChange1h?.toFixed(2) ?? "N/A"}%
                          </span>
                        </div>
                        <Toggle
                          checked={isTracked}
                          onChange={(e) => handleToggle(e.target.checked)}
                        />
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Export the TokenSearch component
export default TokenSearch
