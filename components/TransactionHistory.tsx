/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client"

import crypto from "crypto"
import { useEffect, useState } from "react"
import {
  EvmChain,
  EvmWalletHistoryErc20Transfer,
  EvmWalletHistoryNftTransfer,
  EvmWalletHistoryTransaction,
} from "@moralisweb3/common-evm-utils"
import { motion } from "framer-motion"
import Moralis from "moralis"
import { useAccount, useNetwork } from "wagmi"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Transaction =
  | EvmWalletHistoryErc20Transfer
  | EvmWalletHistoryNftTransfer
  | EvmWalletHistoryTransaction

type MoralisResponse = {
  result: Transaction[]
  hasNext: boolean
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    if (address) {
      fetchTransactions().catch((error) => {
        console.error("Error fetching transactions:", error)
      })
    }
  }, [page, address])

  const fetchTransactions = async () => {
    if (!address || !chain) return

    try {
      const response = await Moralis.EvmApi.wallets.getWalletHistory({
        address: address,
        chain: EvmChain.create(chain.id),
        limit: 10,
        cursor:
          page > 1 && transactions.length > 0
            ? getTransactionHash(transactions[transactions.length - 1])
            : undefined,
      })
      setTransactions(response.result as Transaction[])
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-20"
    >
      <Card className="w-full">
        <CardHeader className="flex h-[40px] items-center border-b border-[#1A1B20] bg-[#16171A] px-6 py-0">
          <div className="grid size-full grid-cols-7 gap-4">
            <CardTitle className="flex items-center text-sm font-medium">
              Tx Hash
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              From
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              To
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              Type
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              Token
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              Symbol
            </CardTitle>
            <CardTitle className="flex items-center text-sm font-medium">
              Value
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <motion.div
                key={
                  isTransactionWithHash(tx)
                    ? tx.transactionHash
                    : crypto.randomUUID()
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid h-[44px] w-full shrink-0 grid-cols-7 items-center gap-4 border-b border-[#25262B] bg-[#07090b] px-[30px] text-[13px] font-normal text-[#959699]"
              >
                <p>
                  {isTransactionWithHash(tx)
                    ? tx.transactionHash.slice(0, 6) +
                      "..." +
                      tx.transactionHash.slice(-4)
                    : "N/A"}
                </p>
                <p>
                  {isTransactionWithFrom(tx)
                    ? tx.from.slice(0, 6) + "..." + tx.from.slice(-4)
                    : "N/A"}
                </p>
                <p>
                  {isTransactionWithTo(tx)
                    ? tx.to.slice(0, 6) + "..." + tx.to.slice(-4)
                    : "N/A"}
                </p>
                <p>
                  {tx instanceof EvmWalletHistoryErc20Transfer
                    ? "ERC20"
                    : tx instanceof EvmWalletHistoryNftTransfer
                    ? "NFT"
                    : "Transaction"}
                </p>
                <div className="flex items-center">
                  <p>{"tokenName" in tx ? tx.tokenName : "N/A"}</p>
                  {"tokenLogo" in tx && (
                    <img
                      src={tx.tokenLogo}
                      alt={tx.tokenName}
                      className="ml-2 size-4"
                    />
                  )}
                </div>
                <p>{"tokenSymbol" in tx ? tx.tokenSymbol : "N/A"}</p>
                <p>{"value" in tx ? tx.value : "N/A"}</p>
              </motion.div>
            ))
          ) : (
            <div className="flex h-[160px] w-full items-center justify-center">
              <div className="flex flex-col items-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6 9.39219C10.6 9.39219 4 15.9922 4 23.9922C4 31.9922 10.6 38.5922 18.6 38.5922C26.6 38.5922 33.2 31.9922 33.2 23.9922C33.2 15.9922 26.6 9.39219 18.6 9.39219ZM18.6 34.9922C12.6 34.9922 7.6 30.1922 7.6 23.9922C7.6 17.7922 12.4 12.9922 18.6 12.9922C24.8 12.9922 29.4 17.9922 29.4 23.9922C29.4 29.9922 24.6 34.9922 18.6 34.9922ZM39 8.99219L44 11.1922L39 13.3922L36.8 18.3922L34.6 13.3922L29.6 11.1922L34.6 8.99219L36.8 3.99219L39 8.99219ZM39 34.3922L44 36.5922L39 38.7922L36.8 43.9922L34.6 38.9922L29.6 36.7922L34.6 34.5922L36.8 29.5922L39 34.3922ZM20.6 21.7922L25.6 23.9922L20.6 26.1922L18.4 31.1922L16.2 26.1922L11.2 23.9922L16.2 21.7922L18.4 16.7922L20.6 21.7922Z"
                    fill="#F8F8FB"
                  />
                </svg>
                <p className="mt-4 text-center text-[14px] font-normal leading-[20.02px] text-[#B4B4B7]">
                  No wallet transactions yet
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-between border-b border-[#25262B] p-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded bg-blue-500 px-4 py-2 text-[#F2F4F3] hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="rounded bg-blue-500 px-4 py-2 text-[#F2F4F3] hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Add these type guard functions at the end of the file
function isTransactionWithHash(
  tx: Transaction
): tx is Transaction & { transactionHash: string } {
  return "transactionHash" in tx && typeof tx.transactionHash === "string"
}

function isTransactionWithFrom(
  tx: Transaction
): tx is Transaction & { from: string } {
  return "from" in tx && typeof tx.from === "string"
}

function isTransactionWithTo(
  tx: Transaction
): tx is Transaction & { to: string } {
  return "to" in tx && typeof tx.to === "string"
}

// Update the type guard function at the end of the file
function getTransactionHash(tx: Transaction): string | undefined {
  if ("transactionHash" in tx && typeof tx.transactionHash === "string") {
    return tx.transactionHash
  }
  return undefined
}
