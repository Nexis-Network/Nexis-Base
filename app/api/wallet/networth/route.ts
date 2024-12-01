import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { walletAddress, networth } = await request.json()

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      )
    }

    // Update or create user with networth value
    const user = await prisma.user.upsert({
      where: {
        walletAddress: walletAddress.toLowerCase(),
      },
      create: {
        walletAddress: walletAddress.toLowerCase(),
        points: 0,
        leaderboardPosition: 0,
        pointsLastUpdatedAt: new Date(),
        completedQuests: "",
        walletAgeInDays: 0,
        seasonOnePoints: 0,
        totalNZT: "0",
        unlockedNZT: "0",
        vestedNZT: "0",
        estDailyUnlocked: 0,
        vestingPeriod: 0,
        delegatedNZT: "0",
        nodeLicenses: "0",
        networthValue: networth,
      },
      update: {
        networthValue: networth,
      },
    })

    return NextResponse.json({
      message: "Networth updated successfully",
      user,
    })
  } catch (error) {
    console.error("Error updating networth:", error)
    return NextResponse.json(
      { error: "Failed to update networth" },
      { status: 500 }
    )
  }
} 