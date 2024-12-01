"use client"

import { useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { Skeleton } from "@/components/ui/skeleton"

interface Player {
  rank: number
  address: string
  points: number
  challengesCompleted: number
  leaderboardPosition?: number
}

const LOADING_ITEMS = ["loading1", "loading2", "loading3"] as const

export default function Leaderboard() {
  const { address: userAddress } = useAccount()
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Player | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Replace this with actual data fetching logic
        const mockData: Player[] = [
          {
            rank: 2,
            address: "0x456...def",
            points: 9095.79,
            challengesCompleted: 91,
            leaderboardPosition: 2,
          },
          {
            rank: 1,
            address: "0x123...abc",
            points: 10198.9,
            challengesCompleted: 102,
            leaderboardPosition: 1,
          },
          {
            rank: 3,
            address: "0x789...ghi",
            points: 8792.71,
            challengesCompleted: 93,
            leaderboardPosition: 3,
          },
        ]

        setPlayers(mockData)
        const userPlayer = mockData.find((p) => p.address === userAddress)
        setUser(userPlayer || null)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [userAddress])

  if (!userAddress) {
    return (
      <div className="flex items-center justify-center p-4">
        <ConnectButton />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {LOADING_ITEMS.map((id) => (
          <div
            key={id}
            className="flex items-center gap-4 rounded-xl border border-[#181F25]/70 bg-[#07090b] p-4"
          >
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="z-10 space-y-4">
      {/* Top 3 Players */}
      <div className="hidden grid-cols-3 gap-4 md:grid">
        {players.slice(0, 3).map((player) => (
          <div
            key={player.address}
            className="flex flex-col items-center rounded-xl border border-[#181F25]/70 bg-[#07090b] p-4"
          >
            <div className="text-3xl font-bold text-[#F2F4F3]">
              #{player.rank}
            </div>
            <div className="text-lg font-semibold text-[#F2F4F3]">
              {player.address === userAddress ? "You" : player.address}
            </div>
            <div className="text-sm text-gray-400">{player.points} points</div>
            <div className="text-sm text-gray-400">
              ({player.challengesCompleted} challenges)
            </div>
          </div>
        ))}
      </div>

      {/* User Position */}
      {user && (
        <div className="flex w-[87px] justify-center xl:w-[70px]">
          <p className="rounded-full bg-[#F2F4F3]/10 px-2.5 py-[6.5px] leading-none xl:px-2 xl:py-1 xl:text-sm">
            {new Intl.NumberFormat().format(user.leaderboardPosition || 0)}
          </p>
        </div>
      )}

      {/* Top 100 Players */}
      <div className="space-y-2">
        {players.slice(0, 100).map((player) => (
          <div
            key={player.address}
            className={`flex flex-col items-center justify-between rounded-xl border border-[#181F25]/70 p-4 md:flex-row ${
              player.address === userAddress ? "bg-[#07090b]" : "bg-[#07090b]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-[#F2F4F3]">
                #{player.rank}
              </div>
              <div className="text-md text-[#F2F4F3]">
                {player.address === userAddress ? "You" : player.address}
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-400">
              <div>{player.points} points</div>
              <div>({player.challengesCompleted} challenges)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
