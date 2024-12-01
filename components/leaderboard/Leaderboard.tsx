"use client"

import { useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { Skeleton } from "@/components/ui/skeleton"
import { getLeaderboardData } from "@/app/actions/leaderboard"

interface LeaderboardUser {
  id: string
  walletAddress: string
  points: number
  leaderboardPosition: number
}

export default function Leaderboard() {
  const { address: userAddress } = useAccount()
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { users: leaderboardUsers } = await getLeaderboardData()
        setUsers(leaderboardUsers)

        // Find current user in leaderboard
        const foundUser = leaderboardUsers.find(
          (user) =>
            user.walletAddress.toLowerCase() === userAddress?.toLowerCase()
        )
        setCurrentUser(foundUser || null)
        setError(null)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setError("Failed to load leaderboard data")
      } finally {
        setIsLoading(false)
      }
    }

    if (userAddress) {
      void fetchData()
    }
  }, [userAddress])

  if (!userAddress) {
    return (
      <div className="flex items-center justify-center p-4">
        <ConnectButton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        {error}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`loading-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              i
            }`}
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
    <div className="w-full space-y-4">
      {currentUser && (
        <div className="flex w-[87px] justify-center xl:w-[70px]">
          <p className="rounded-full bg-[#F2F4F3]/10 px-2.5 py-[6.5px] leading-none xl:px-2 xl:py-1 xl:text-sm">
            {new Intl.NumberFormat().format(currentUser.leaderboardPosition)}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-[#181F25]/70 bg-[#07090b] p-4"
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-[#F2F4F3]">
                #{user.leaderboardPosition}
              </div>
              <div className="text-md text-[#F2F4F3]">
                {user.walletAddress.toLowerCase() === userAddress?.toLowerCase()
                  ? "You"
                  : user.walletAddress}
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {user.points.toLocaleString()} points
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
