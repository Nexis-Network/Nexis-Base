"use client"

import { useState } from "react"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { AnimatePresence, motion } from "framer-motion"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"

export default function BlockchainActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

  const handleActionClick = (action: "send" | "deposit") => {
    if (!isConnected) {
      openConnectModal?.()
    } else {
      setIsDialogOpen(true)
      // You can add logic here to differentiate between send and deposit actions
    }
  }
  return (
    <div className="grid w-full grid-cols-2">
      <motion.div className="group relative h-full">
        <Button
          onClick={() => handleActionClick("send")}
          className="relative z-10 w-full rounded-none border-l border-[#242424] bg-transparent py-4 font-mono text-white/80 transition-colors duration-300 hover:bg-transparent hover:text-white"
        >
          WITHDRAW
        </Button>
        <div className="pointer-events-none absolute inset-0 z-0 h-full py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-lime-300"></div>
          <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-lime-300"></div>
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-lime-300"></div>
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-lime-300"></div>
        </div>
      </motion.div>
      <motion.div className="group relative h-full">
        <Button
          onClick={() => handleActionClick("deposit")}
          className="relative z-10 w-full rounded-none border-l border-[#242424] bg-transparent py-2 font-mono text-white/80 transition-colors duration-300 hover:bg-transparent hover:text-white"
        >
          STAKE
        </Button>
        <div className="pointer-events-none absolute inset-0 z-0 h-full py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-lime-300"></div>
          <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-lime-300"></div>
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-lime-300"></div>
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-lime-300"></div>
        </div>
      </motion.div>
    </div>
  )
}
