"use client"

import { useEffect, useState } from "react"
import { Bell } from "@geist-ui/icons"
import { Menu, Transition } from "@headlessui/react"
import type { EvmTransaction } from "@moralisweb3/common-evm-utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Moralis from "moralis"
import { useAccount } from "wagmi"

import { BellIcon } from "./BellIcon"

interface Notification {
  hash: string
  from: string
  to: string
  value: string
  timestamp: string
}

interface Notification {
  hash: string
  from: string
  to: string
  value: string
  timestamp: string
}

export function WalletNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { address, isConnected } = useAccount()

  useEffect(() => {
    // Initialize Moralis if it's not started yet
    if (!Moralis.Core.isStarted) {
      void Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })
    }

    if (address) {
      void fetchNotifications(address)
    }
  }, [address])

  const fetchNotifications = async (walletAddress: string) => {
    // Define options for fetching transactions
    const options = {
      address: walletAddress,
      chain: "0x1", // Ethereum Mainnet
      limit: 10,
    }

    try {
      // Fetch transactions using Moralis API
      const transactions =
        await Moralis.EvmApi.transaction.getWalletTransactions(options)

      // Process transactions to create notification objects
      const recentNotifications = transactions.result.map((tx) => ({
        hash: tx.hash,
        from: tx.from.checksum,
        to: tx.to ? tx.to.checksum : "",
        value: tx.value ? tx.value.toString() : "0",
        timestamp: tx.blockTimestamp.toISOString(),
      }))

      setNotifications(recentNotifications)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button className="relative flex items-center focus:outline-none">
          <BellIcon />
          <span className="absolute bottom-0 right-0 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#38f658] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#51ff68]" />
          </span>
        </Menu.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-in"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-2 max-h-96 w-96 origin-top-right divide-y divide-zinc-700 overflow-y-auto rounded-md border border-[#181F25]/70 bg-black/90 text-[#f4f4f4] shadow-lg outline-none">
            {isConnected ? (
              notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.hash}
                    className="flex flex-col px-4 py-2 text-sm text-[#f4f4f4]"
                  >
                    <div className="flex justify-between">
                      <p className="font-semibold">Transaction Hash:</p>
                      <p className="truncate">{notification.hash}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">From:</p>
                      <p className="truncate">{notification.from}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">To:</p>
                      <p className="truncate">{notification.to}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Value:</p>
                      <p>{notification.value}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Timestamp:</p>
                      <p>{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-[#f4f4f4]">
                  No recent notifications.
                </div>
              )
            ) : (
              <div className="justify-center px-4 py-2 align-middle text-sm text-[#f4f4f4]">
                <h1>Please connect your wallet to view notifications</h1>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
