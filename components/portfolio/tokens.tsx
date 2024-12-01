import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

import { Carousel } from "../ui/carousel"

interface TokenData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number
  }
}

const TokensCarousel: React.FC = () => {
  const [tokens, setTokens] = useState<TokenData[]>([])

  useEffect(() => {
    const fetchTrendingTokens = async () => {
      try {
        // Specify the expected response type
        const trendingResponse = await axios.get<{ coins: TrendingCoin[] }>(
          "https://api.coingecko.com/api/v3/search/trending"
        )
        const coinIds = trendingResponse.data.coins.map((coin) => coin.item.id)

        // Fetch market data for the trending coins
        const marketDataResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: coinIds.join(","),
              order: "market_cap_desc",
              per_page: coinIds.length,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
            },
          }
        )

        setTokens(marketDataResponse.data)
      } catch (error) {
        console.error("Error fetching trending tokens:", error)
      }
    }

    void fetchTrendingTokens()
  }, [])

  return (
    <div className="w-full">
      <Carousel>
        <div className="flex space-x-4">
          {tokens.map((token) => (
            <div key={token.id} className="shrink-0">
              <div className="flex size-32 flex-col rounded-md border border-[#181F25]/70 p-0">
                <img
                  src={token.image}
                  alt={token.name}
                  className="mb-1 size-4"
                />
                <h2 className="text-sm font-semibold">
                  {token.name} ({token.symbol.toUpperCase()})
                </h2>
                <p className="text-xs">
                  Price: ${token.current_price.toFixed(2)}
                </p>
                <p className="text-xs">
                  24h Change: {token.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default TokensCarousel
