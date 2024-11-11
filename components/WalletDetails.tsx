/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
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

type DashboardData = {
  totalNZT: string
  unlockedNZT: string
  vestedNZT: string
  estDailyUnlock: string
  vestingPeriod: string
  delegatedNZT: string
  nodeLicenses: string
  totalValue: string
}

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
  const { address, isConnected } = useAccount()
  const [displayData, setDisplayData] = useState<DashboardData>(placeholderData)

  useEffect(() => {
    const fetchData = async () => {
      if (!address || !isConnected) return
      try {
        const response = await axios.get(`/api/nexis-holder?address=${address}`)
        const holderData = response.data
        setDisplayData({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          totalNZT: holderData.total_nzt?.toString() || "N/A",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          unlockedNZT: holderData.unlocked_nzt?.toString() || "N/A",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          vestedNZT: holderData.vested_nzt?.toString() || "N/A",
          estDailyUnlock: holderData.est_daily_unlock
            ? String(holderData.est_daily_unlock)
            : "N/A",
          vestingPeriod: holderData.vesting_period
            ? String(holderData.vesting_period)
            : "N/A",
          delegatedNZT: holderData.delegated_nzt
            ? String(holderData.delegated_nzt)
            : "N/A",
          nodeLicenses: String(holderData.node_licenses),
          totalValue: String(holderData.total_value),
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        // Handle error, e.g., show a notification or set default values
      }
    }

    void fetchData()
  }, [address, isConnected])

  const renderCellContent = (
    content: string | number,
    isHighlighted = false
  ) => {
    return (
      <span
        className={isHighlighted ? "font-bold text-secondary-foreground" : ""}
      >
        {content}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto">
      <IsWalletConnected>
        <div>
          <Table className="min-w-full border-b border-[#242424]">
            <TableHeader className="border-collapse border-b border-[#242424] bg-[#0a0a0a]">
              <TableRow>
                <TableCell colSpan={2} className="p-0">
                  <div className="flex w-full items-center justify-between px-4 py-2">
                    <div className="text-base">
                      <div className="w-full font-mono text-base text-white">
                        {/* biome-ignore lint/suspicious/noCommentText: This comment is used to denote wallet details section */}
                        <span className="text-base">/// WALLET DETAILS</span>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <BlockchainActions />
                    </div>
                  </div>
                </TableCell>
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
              {/* Total NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Total NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.totalNZT}`)}
                </TableCell>
              </TableRow>

              {/* Unlocked NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Unlocked NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.unlockedNZT}`)}
                </TableCell>
              </TableRow>
              {/* Total NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Total NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.totalNZT}`)}
                </TableCell>
              </TableRow>

              {/* Unlocked NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Unlocked NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.unlockedNZT}`)}
                </TableCell>
              </TableRow>
              {/* Total NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Total NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.totalNZT}`)}
                </TableCell>
              </TableRow>

              {/* Unlocked NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Unlocked NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.unlockedNZT}`)}
                </TableCell>
              </TableRow>
              {/* Total NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Total NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.totalNZT}`)}
                </TableCell>
              </TableRow>

              {/* Unlocked NZT Row */}
              <TableRow className="border-b border-[#242424]">
                <TableCell className="w-1/2 border-r border-[#242424] pl-4 font-medium">
                  <HyperText text="Unlocked NZT" animateOnLoad={true} />
                </TableCell>
                <TableCell className="w-1/2 pl-4">
                  {renderCellContent(`${displayData.unlockedNZT}`)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div>
          <div className="flex justify-center">
            <div
              style={{ transform: "scale(0.25)", transformOrigin: "center" }}
            >
              <NexisIcon />
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold">
            Please connect your wallet to view your dashboard.
          </h2>
        </div>
      </IsWalletDisconnected>
    </div>
  )
}

export default Web3DashboardTable
