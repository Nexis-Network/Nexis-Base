"use client"

import type React from "react"
import { useAccount } from "wagmi"

import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useWalletData } from "@/app/queries"

const Web3DashboardTable: React.FC = () => {
  const { isConnected } = useAccount()
  const { data: holderData, isLoading } = useWalletData()

  if (!isConnected || isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  const walletData = {
    totalNZT: holderData?.totalNZT ?? "N/A",
    unlockedNZT: holderData?.unlockedNZT ?? "N/A",
    vestedNZT: holderData?.vestedNZT ?? "N/A",
    estDailyUnlocked:
      typeof holderData?.estDailyUnlocked === "number"
        ? holderData.estDailyUnlocked.toString()
        : "N/A",
    vestingPeriod:
      typeof holderData?.vestingPeriod === "number"
        ? holderData.vestingPeriod.toString()
        : "N/A",
    delegatedNZT: holderData?.delegatedNZT ?? "N/A",
    nodeLicenses: holderData?.nodeLicenses ?? "N/A",
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Total NZT</TableCell>
            <TableCell>{walletData.totalNZT}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Unlocked NZT</TableCell>
            <TableCell>{walletData.unlockedNZT}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Vested NZT</TableCell>
            <TableCell>{walletData.vestedNZT}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Est. Daily Unlock</TableCell>
            <TableCell>{walletData.estDailyUnlocked}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Vesting Period</TableCell>
            <TableCell>{walletData.vestingPeriod}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Delegated NZT</TableCell>
            <TableCell>{walletData.delegatedNZT}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Node Licenses</TableCell>
            <TableCell>{walletData.nodeLicenses}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Web3DashboardTable
