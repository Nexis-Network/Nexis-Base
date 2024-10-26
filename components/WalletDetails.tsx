"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"

import HyperText from "@/components/ui/hyper-text"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import BlockchainActions from "@/components/blockchain/send-receive-buttons"
import NexisIcon from "@/components/NexisIcon"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

// Update this type to match your Prisma schema
type NexisHolderData = {
  walletAddress: string
  purchaseAmount: number
  totalNZT: number
  valueTGE: number
  unlockTGE: number
  vestingPeriod: number
  vestingStyle: string
  vestingStart: Date
  vestingEnd: Date
  percentGain: number
  estDailyUnlock: number
}

interface DashboardData {
  totalNZT: string
  unlockedNZT: string
  vestedNZT: string
  estDailyUnlock: string
  vestingPeriod: string
  delegatedNZT: string
  nodeLicenses: string
  totalValue: string
}

// Default placeholder data
const placeholderData: DashboardData = {
  totalNZT: "N/A",
  unlockedNZT: "N/A",
  vestedNZT: "N/A",
  estDailyUnlock: "N/A",
  vestingPeriod: "N/A",
  delegatedNZT: "N/A",
  nodeLicenses: "N/A",
  totalValue: "N/A",
}

const Web3DashboardTable: React.FC = () => {
  const { address } = useAccount()
  const [displayData, setDisplayData] = useState<DashboardData>(placeholderData)

  const fetchNexisHolderData = async () => {
    if (!address) return
    try {
      const response = await axios.get(`/api/nexis-holder?address=${address}`)
      const holderData: NexisHolderData = response.data
      setDisplayData({
        totalNZT: holderData.totalNZT.toString(),
        unlockedNZT: holderData.unlockTGE.toString(),
        vestedNZT: (holderData.totalNZT - holderData.unlockTGE).toString(),
        estDailyUnlock: holderData.estDailyUnlock.toString(),
        vestingPeriod: `${holderData.vestingPeriod} months`,
        delegatedNZT: "Calculation needed",
        nodeLicenses: "Calculation needed",
        totalValue: (holderData.totalNZT * holderData.valueTGE).toFixed(2),
      })
    } catch (error) {
      console.error("Error fetching Nexis holder data:", error)
    }
  }

  useEffect(() => {
    const runFetch = async () => {
      try {
        await fetchNexisHolderData()
      } catch (error) {
        console.error("Error in fetchNexisHolderData:", error)
      }
    }
    void runFetch()
  }, [address])

  const renderCellContent = (value: string, showIcon: boolean = false) => (
    <div className="flex items-center">
      <IsWalletConnected>
        <HyperText text={value || "N/A"} animateOnLoad={false} />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="h-7 w-20 animate-pulse rounded-md bg-[#171717]"></div>
      </IsWalletDisconnected>
      {showIcon && <NexisIcon className="size-5 ml-2" />}
    </div>
  )

  return (
    <div className="w-full border-b border-b-[#242424] bg-black text-white">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="border-b border-[#242424] bg-[#0a0a0a]">
            <TableHead className="w-1/2 p-0 font-mono text-white">
              <div className="p-4">
                <span className="text-base">WALLET DETAILS</span>
              </div>
            </TableHead>
            <TableHead className="h-full w-1/2 p-0">
              <BlockchainActions />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Total Value" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(`$${displayData.totalValue}`)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Total NZT Owned" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.totalNZT, true)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Claimable" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.unlockedNZT)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Total Vested NZT" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.vestedNZT)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Est. Daily Unlocked NZT" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.estDailyUnlock)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Vesting Period" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.vestingPeriod)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Delegated NZT" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.delegatedNZT)}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#242424]">
            <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
              <HyperText text="Node Licenses Owned" animateOnLoad={true} />
            </TableCell>
            <TableCell className="w-1/2 pl-4">
              {renderCellContent(displayData.nodeLicenses)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Web3DashboardTable
