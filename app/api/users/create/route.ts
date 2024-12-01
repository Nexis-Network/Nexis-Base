import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      )
    }

    // Try to find existing user first
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    })

    // If user exists, return success
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" })
    }

    // Create new user with default values
    const newUser = await prisma.user.create({
      data: {
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
      },
    })

    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
} 