"use client"

import { useEffect } from "react"
import { setWalletData } from "@/store/userSlice"
import { useDispatch } from "react-redux"
import { useAccount } from "wagmi"

interface HolderData {
  totalNZT: string
  unlockedNZT: string
  vestedNZT: string
  estDailyUnlocked: number
  vestingPeriod: number
  delegatedNZT: string
  nodeLicenses: string
}

interface WalletData {
  totalNZT: string
  unlockedNZT: string
  vestedNZT: string
  estDailyUnlocked: string
  vestingPeriod: string
  delegatedNZT: string
  nodeLicenses: string
}

interface HandleWalletEventsProps {
  children: React.ReactNode
}

export default function HandleWalletEvents({
  children,
}: HandleWalletEventsProps) {
  const { address, isConnected } = useAccount()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (!address || !isConnected) return

      try {
        // Create user if doesn't exist
        const createResponse = await fetch("/api/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: address,
          }),
        })

        if (!createResponse.ok) {
          throw new Error("Failed to create user")
        }

        // Fetch wallet data
        const walletResponse = await fetch(`/api/wallet?address=${address}`)
        if (!walletResponse.ok) {
          throw new Error("Failed to fetch wallet data")
        }

        const holderData = (await walletResponse.json()) as HolderData

        const walletData: WalletData = {
          totalNZT: holderData?.totalNZT ?? "N/A",
          unlockedNZT: holderData?.unlockedNZT ?? "N/A",
          vestedNZT: holderData?.vestedNZT ?? "N/A",
          estDailyUnlocked: holderData?.estDailyUnlocked?.toString() ?? "N/A",
          vestingPeriod: holderData?.vestingPeriod?.toString() ?? "N/A",
          delegatedNZT: holderData?.delegatedNZT ?? "N/A",
          nodeLicenses: holderData?.nodeLicenses ?? "N/A",
        }

        dispatch(setWalletData(walletData))
      } catch (error) {
        console.error("Error handling wallet connection:", error)
      }
    }

    void handleWalletConnection()
  }, [address, isConnected, dispatch])

  return <>{children}</>
}
