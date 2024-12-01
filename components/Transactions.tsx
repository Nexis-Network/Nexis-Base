"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define the structure of a transaction
interface Transaction {
  txnHash: string
  wallet: string
  type: "buy" | "sell" | "transfer" | "unstake"
  amount: number
  blockNumber: number
}

// Mock data generator
const generateMockData = (count: number): Transaction[] => {
  const types: Transaction["type"][] = ["buy", "sell", "transfer", "unstake"]
  return Array.from({ length: count }, (_, i) => ({
    txnHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    wallet: `0x${Math.random().toString(16).substr(2, 40)}`,
    type: types[Math.floor(Math.random() * types.length)],
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
  }))
}

const RecentTransactions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 15
  const totalTransactions = 100

  const transactions = generateMockData(totalTransactions)
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage
    const endIndex = startIndex + transactionsPerPage
    return transactions.slice(startIndex, endIndex)
  }

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#07090b] pl-4 text-[#fafafa]" // Added pl-4 for left padding
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#181F25]/70">
            <TableHead className="pl-[10px] text-[#fafafa] transition-colors duration-200 hover:bg-[#181F25]">
              TXN Hash
            </TableHead>
            <TableHead className="pl-[10px] text-[#fafafa] transition-colors duration-200 hover:bg-[#181F25]">
              Wallet
            </TableHead>
            <TableHead className="pl-[10px] text-[#fafafa] transition-colors duration-200 hover:bg-[#181F25]">
              Transaction Type
            </TableHead>
            <TableHead className="pl-[10px] text-[#fafafa] transition-colors duration-200 hover:bg-[#181F25]">
              Amount of NZT
            </TableHead>
            <TableHead className="pl-[10px] text-[#fafafa] transition-colors duration-200 hover:bg-[#181F25]">
              Block Number
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((tx, index) => (
            <motion.tr
              key={tx.txnHash}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-[#181F25]/70"
            >
              <TableCell className="pl-[10px] font-mono">
                {tx.txnHash.slice(0, 10)}...
              </TableCell>
              <TableCell className="pl-[10px] font-mono">
                {tx.wallet.slice(0, 10)}...
              </TableCell>
              <TableCell className="pl-[10px]">
                <span
                  className={`rounded-md px-2 py-1 text-xs ${
                    tx.type === "buy"
                      ? "border border-[#CBFF00]/40 bg-[#CBFF00]/30 text-[#CBFF00]"
                      : tx.type === "sell"
                      ? "border border-[#FF0000]/30 bg-[#FF0000]/20 text-[#FF0000]"
                      : tx.type === "transfer"
                      ? "border border-[#0077FF]/30 bg-[#009DFF]/20 text-[#0077FF]"
                      : "border border-yellow-500/30 bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {tx.type}
                </span>
              </TableCell>
              <TableCell className="pl-[10px]">
                {tx.amount.toFixed(2)} NZT
              </TableCell>
              <TableCell className="pl-[10px]">{tx.blockNumber}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex items-center justify-between px-4">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
          className="border-[#181F25]/70 text-[#fafafa]"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-[#fafafa]">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="border-[#181F25]/70 text-[#fafafa]"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default RecentTransactions
