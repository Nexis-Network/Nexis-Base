"use client"

import { useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

interface Player {
  rank: number
  address: string
  points: number
  challengesCompleted: number
}

export default function Leaderboard() {
  const { address: userAddress } = useAccount()
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    // Replace this with actual data fetching logic
    const mockData: Player[] = [
      {
        rank: 2,
        address: "0x456...def",
        points: 9095.79,
        challengesCompleted: 91,
      },
      {
        rank: 1,
        address: "0x123...abc",
        points: 10198.9,
        challengesCompleted: 102,
      },
      {
        rank: 3,
        address: "0x789...ghi",
        points: 8792.71,
        challengesCompleted: 93,
      },
      // ... up to top 100 players
    ]

    setPlayers(mockData)
  }, [])

  return (
    <div className="z-10 space-y-4">
      {/* Top 3 Players */}
      <div className="hidden grid-cols-3 gap-4 md:grid">
        {players.slice(0, 3).map((player) => (
          <div
            key={player.address}
            className="flex flex-col items-center rounded-xl border border-[#242424] bg-[#0a0a0a] p-4"
          >
            <div className="text-3xl font-bold text-white">#{player.rank}</div>
            <div className="text-lg font-semibold text-white">
              {player.address === userAddress ? "You" : player.address}
            </div>
            <div className="text-sm text-gray-400">{player.points} points</div>
            <div className="text-sm text-gray-400">
              ({player.challengesCompleted} challenges)
            </div>
          </div>
        ))}
      </div>

      {/* Top 100 Players */}
      <div className="space-y-2">
        {players.slice(0, 100).map((player) => (
          <div
            key={player.address}
            className={`flex flex-col items-center justify-between rounded-xl border border-[#242424] p-4 md:flex-row ${
              player.address === userAddress ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-white">#{player.rank}</div>
              <div className="text-md text-white">
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

      {/* Connect Wallet Button */}
      {!userAddress && (
        <div className="mt-4">
          <ConnectButton />
        </div>
      )}
    </div>
  )
}
