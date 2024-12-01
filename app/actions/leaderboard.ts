"use server"

import { prisma } from "@/lib/prisma"

export type LeaderboardUser = {
  position: number
  walletAddress: string
  questsCompleted: number
  points: number
}

export async function getLeaderboardData() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        walletAddress: true,
        points: true,
        _count: {
          select: {
            UserQuest: true
          }
        }
      },
      orderBy: {
        points: 'desc'
      },
    })

    const leaderboardData: LeaderboardUser[] = users.map((user, index) => ({
      position: index + 1,
      walletAddress: user.walletAddress,
      questsCompleted: user._count.UserQuest,
      points: user.points,
    }))

    return { users: leaderboardData }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error)
    throw new Error("Failed to fetch leaderboard data")
  }
} 