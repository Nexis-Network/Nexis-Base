import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppDispatch } from "@/store/store"
import { setLogout } from "@/store/userSlice"
import { motion } from "framer-motion"
import type { Chain } from "viem"
import { useAccount, useDisconnect, useNetwork } from "wagmi"

import useSwitchChain, { resetConnection } from "@/lib/web3Auth"

import { Close } from "./icons/close"
import closeIcon from "./icons/close.svg"
import NexisIcon from "./NexisIcon"

type ChainModalProps = {
  description?: string
}
export const nexisDevnet: Chain = {
  id: 2371,
  name: "Nexis Network Devnet",
  network: "nexis-devnet",
  nativeCurrency: { name: "Nexis", symbol: "NZT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-devnet.nexis.network"],
    },
    public: {
      http: ["https://evm-devnet.nexis.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Nexscan",
      url: "https://evm-devnet.nexscan.io",
    },
  },
  testnet: true,
}

export const ethereumMainnet: Chain = {
  id: 1,
  name: "Ethereum Mainnet",
  network: "homestead",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
    },
    public: {
      http: ["https://cloudflare-eth.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
  },
  testnet: false,
}

export const arbitrumOne: Chain = {
  id: 42161,
  name: "Arbitrum One",
  network: "arbitrum-one",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"],
    },
    public: {
      http: ["https://arbitrum.public-rpc.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
    },
  },
  testnet: false,
}

export const baseMainnet: Chain = {
  id: 8453,
  name: "Base Mainnet",
  network: "base-mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
    public: {
      http: ["https://base.public-rpc.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
    },
  },
  testnet: false,
}

export const binanceSmartChain: Chain = {
  id: 56,
  name: "Binance Smart Chain",
  network: "binance-smart-chain",
  nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://bsc-dataseed.binance.org/"],
    },
    public: {
      http: ["https://bsc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  },
  testnet: false,
}

const SwitchChainModal = ({
  description = "Please switch to the Nexis Network to continue",
}: ChainModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { switchChain } = useSwitchChain({
    chainId: nexisDevnet.id,
    onSuccess() {
      setIsOpen(false)
    },
    onError() {
      setIsOpen(true)
    },
  })
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const dispatch = useAppDispatch()
  const { disconnect } = useDisconnect({
    onSuccess() {
      dispatch(setLogout())
      resetConnection()
    },
  })

  useEffect(() => {
    if (isConnected && chain?.id !== nexisDevnet.id) setIsOpen(true)
    else setIsOpen(false)
  }, [chain, isConnected])

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex size-full bg-black/50"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="relative left-1/2 top-1/2 flex h-fit w-[400.88px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-[#F2F4F3] p-10 md:top-full md:w-full md:-translate-y-full md:rounded-b-none md:p-4"
          >
            <Close
              className="absolute right-6 top-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <p className="text-dune max-w-[218.24px] text-2xl font-bold">
              Wrong Network Connected
            </p>
            <p className="text-dove-gray	my-[26.5px] max-w-[252.62px] text-sm font-medium">
              {description}
            </p>
            <Image
              src={fuseGray}
              alt="Fuse gray"
              className="m-auto"
              onClick={() => setIsOpen(false)}
            />
            <button
              className="bg-success mb-2.5 mt-[31.7px] w-full rounded-xl py-3.5 text-lg font-bold text-black transition ease-in-out hover:bg-black hover:text-[#F2F4F3]"
              onClick={() => {
                switchChain({ chain: nexisDevnet })
              }}
            >
              Switch to Nexis Network
            </button>
            <button
              className="bg-dune w-full rounded-xl py-3.5 text-lg font-bold text-[#F2F4F3] transition ease-in-out hover:bg-[#FFEBE9] hover:text-[#FD0F0F]"
              onClick={() => {
                disconnect()
                setIsOpen(false)
              }}
            >
              Disconnect Wallet
            </button>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default SwitchChainModal
