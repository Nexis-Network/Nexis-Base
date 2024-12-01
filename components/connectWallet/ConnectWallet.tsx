import React, { useEffect } from "react"
import Image, { type StaticImageData } from "next/image"
import copy from "@/assets/copy-black.svg"
import disconnectIcon from "@/assets/disconnect.svg"
import down from "@/assets/down-arrow.svg"
import fuseIcon from "@/assets/fuse-icon.svg"
import leftArrow from "@/assets/left-arrow.svg"
import qr from "@/assets/qr.svg"
import { fetchUsdPrice, selectBalanceSlice } from "@/store/balanceSlice"
import { setIsWalletModalOpen } from "@/store/navbarSlice"
import { motion, type Variants } from "framer-motion"
import QRCode from "react-qr-code"
import { formatUnits } from "viem"
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConfig,
  useDisconnect,
  useSwitchChain,
} from "wagmi"

import { CONFIG } from "@/lib/config"
import { cn, eclipseAddress, evmDecimals } from "@/lib/helpers"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useOutsideClick } from "@/lib/hooks/useOutsideClick"
import { resetConnection } from "@/lib/web3Auth"

import Copy from "../ui/Copy"
import Spinner from "../ui/Spinner"

const menu: Variants = {
  closed: () => ({
    opacity: 0,
    transition: {
      delay: 0.15,
      duration: 0.3,
    },
    y: -50,
    x: 0,
    transitionEnd: {
      display: "none",
    },
  }),
  open: () => ({
    opacity: 1,
    display: "block",
    transition: {
      type: "spring",
      duration: 0.5,
    },
    y: 0,
    x: 0,
  }),
}

type Icons = {
  [key: string]: string | StaticImageData
}

const icons: Icons = {
  [CONFIG.chain.id]: fuseIcon,
}

type UsdTokens = {
  [key: string]: string
}

const usdTokens: UsdTokens = {
  [CONFIG.chain.id]: "fuse-network-token",
}

const ConnectWallet = ({
  className = "",
  containerClassName = "",
}: {
  className?: string
  containerClassName?: string
}) => {
  const dispatch = useAppDispatch()
  const [isChainOpen, setIsChainOpen] = React.useState(false)
  const [isAccountsOpen, setIsAccountsOpen] = React.useState(false)
  const [isWrongNetwoksOpen, setIsWrongNetwoksOpen] = React.useState(false)
  const [isQrCodeOpen, setIsQrCodeOpen] = React.useState(false)
  const { address, isConnected, chain } = useAccount()
  const { chains } = useConfig()
  const { switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess() {
        resetConnection()
      },
    },
  })
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, refetch } = useBalance({
    address,
  })
  const balanceSlice = useAppSelector(selectBalanceSlice)

  const chainRef = useOutsideClick(() => {
    if (isChainOpen) {
      setIsChainOpen(false)
    }
  })
  const accountsRef = useOutsideClick(() => {
    if (isAccountsOpen) {
      setIsAccountsOpen(false)
    }
  })
  const wrongNetworkRef = useOutsideClick(() => {
    if (isWrongNetwoksOpen) {
      setIsWrongNetwoksOpen(false)
    }
  })

  const checkCorrectNetwork = () => {
    const network = chains.find((c) => c.id === chain?.id)
    if (!network) return false
    return true
  }

  useEffect(() => {
    const controller = new AbortController()
    dispatch(
      fetchUsdPrice({
        tokenId: usdTokens[chain?.id ?? CONFIG.chain.id],
        controller,
      })
    )

    return () => {
      controller.abort()
    }
  }, [isConnected, chain, dispatch])

  useEffect(() => {
    void refetch()
  }, [blockNumber, refetch])

  return !isConnected ? (
    <div className={"flex justify-end " + containerClassName}>
      <button
        className={
          "bg-black text-[#F2F4F3] px-4 py-2 rounded-full font-medium " +
          className
        }
        onClick={() => dispatch(setIsWalletModalOpen(true))}
        type="button"
      >
        Connect Wallet
      </button>
    </div>
  ) : checkCorrectNetwork() && isChainOpen ? (
    <div
      className="relative flex h-9 justify-end text-base/4 md:me-3"
      ref={chainRef}
    >
      <div
        className="bg-tertiary relative ml-2 flex cursor-pointer items-center rounded-full px-4 py-3 text-base/4 font-normal md:py-3.5"
        onClick={() => setIsChainOpen(!isChainOpen)}
      >
        <Image
          src={icons[chain?.id ?? 0]}
          alt={chain?.name ?? CONFIG.chain.name}
          width={25}
          height={25}
        />
        <p className="ms-[8.52px] text-[#F2F4F3]">
          {eclipseAddress(String(address))}
        </p>
        <Image
          src={down}
          alt="down"
          className={`ms-[15px] ${isChainOpen && "rotate-180"}`}
          width={10}
          height={10}
        />
      </div>
      <motion.div
        animate={isChainOpen ? "open" : "closed"}
        initial="closed"
        exit="closed"
        variants={menu}
        className="absolute top-[120%] z-[80] w-[268.22px] rounded-[20px] bg-[#F2F4F3] py-6 font-medium shadow-xl"
      >
        <div className="flex flex-col gap-3.5 px-[22px]">
          <p className="font-bold">Switch Network</p>
        </div>
        <hr className="border-border-dark-gray mb-[19.51px] mt-[13.57px]" />
        <div className="flex flex-col gap-5 px-[22px]">
          {chains.map((c) => (
            <button
              key={c.id}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2",
                chain?.id === c.id
                  ? "cursor-default bg-[#141414]"
                  : "cursor-pointer hover:opacity-70"
              )}
              onClick={() => switchChain({ chainId: c.id })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  switchChain({ chainId: c.id })
                }
              }}
              type="button"
            >
              <Image
                src={c.iconUrl || ""}
                alt={c.name}
                width={24}
                height={24}
              />
              <p>{c.name}</p>
            </button>
          ))}
        </div>
        <hr className="border-border-dark-gray mb-[18.53px] mt-[19.99px]" />
        <div
          className="flex cursor-pointer items-center gap-[17.7px] px-[22px]"
          onClick={() => disconnect()}
        >
          <Image
            src={disconnectIcon.src}
            alt="disconnect wallet"
            width={17.68}
            height={20}
          />
          <p>Disconnect</p>
        </div>
      </motion.div>
    </div>
  ) : checkCorrectNetwork() ? (
    <div className="relative flex h-9 justify-end md:me-3 md:justify-center">
      <div
        className="bg-tertiary relative ml-2 flex cursor-pointer items-center rounded-full px-4 py-3 text-base/4 font-normal md:py-3.5"
        ref={accountsRef}
      >
        <div
          className="flex w-full items-center justify-between"
          onClick={() => setIsAccountsOpen(!isAccountsOpen)}
        >
          <Image
            src={icons[chain?.id ?? 0]}
            alt={chain?.name ?? CONFIG.chain.name}
            width={25}
            height={25}
          />
          <p className="ms-[8.52px] text-black">
            {eclipseAddress(String(address))}
          </p>
          <Image
            src={down}
            alt="down"
            className={`ms-[15px] ${isAccountsOpen && "rotate-180"}`}
            width={10}
            height={10}
          />
        </div>
        <motion.div
          animate={isQrCodeOpen ? "closed" : isAccountsOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          variants={menu}
          className="absolute right-0 top-[120%] z-[80] w-[268.22px] cursor-auto rounded-[20px] bg-[#F2F4F3] py-[25.5px] shadow-xl"
        >
          <div className="flex flex-col gap-[8.35px] px-[22px]">
            <p className="text-text-dark-gray text-xs/[11.6px] font-medium">
              Connected account
            </p>
            <div className="flex justify-between">
              <p className="font-bold">{eclipseAddress(String(address))}</p>
              <div className="flex gap-[19.02px]">
                <Copy
                  src={copy}
                  text={String(address)}
                  width={18.97}
                  height={18.81}
                />
                <Image
                  src={qr}
                  alt="open qr code of address"
                  width={16.22}
                  height={16.65}
                  className="cursor-pointer"
                  onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}
                />
              </div>
            </div>
          </div>
          <hr className="border-border-dark-gray mb-[18.5px] mt-[25.62px]" />
          <div className="flex flex-col gap-[8.35px] pl-[22.2px] pr-[17.42px] font-medium">
            <p className="text-text-dark-gray text-xs/[11.6px]">Wallet</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={icons[chain?.id ?? 0]}
                  alt={chain?.name ?? CONFIG.chain.name}
                  width={40}
                  height={40}
                  className="border-gray-alpha-40 rounded-full border border-[0.5px]"
                />
                <div className="flex flex-col justify-between gap-[3.68px]">
                  <p>{chain?.name} Token</p>
                  <p className="text-text-dark-gray text-xs">
                    {balance?.symbol}
                  </p>
                </div>
              </div>
              <div className="flex h-10 flex-col justify-between gap-[3.68px]">
                <p>
                  {parseFloat(
                    formatUnits(
                      balance?.value ?? BigInt(0),
                      balance?.decimals ?? evmDecimals
                    ) || "0"
                  ).toFixed(4)}
                </p>
                {balanceSlice.isUsdPriceLoading ? (
                  <span className="ml-2 animate-pulse rounded-md bg-[#F2F4F3]/80 px-10 py-2"></span>
                ) : (
                  <p className="text-text-dark-gray text-xs">
                    $
                    {chain && chain.id === CONFIG.chain.id
                      ? new Intl.NumberFormat().format(
                          parseFloat(
                            (
                              parseFloat(
                                formatUnits(
                                  balance?.value ?? BigInt(0),
                                  balance?.decimals ?? evmDecimals
                                ) ?? "0"
                              ) * balanceSlice.price
                            ).toString()
                          )
                        )
                      : 0}
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr className="border-border-dark-gray mb-[18.5px] mt-[22.6px]" />
          <div
            className="flex cursor-pointer items-center gap-[17.7px] px-[22px]"
            onClick={() => disconnect()}
          >
            <Image
              src={disconnectIcon.src}
              alt="disconnect wallet"
              width={17.68}
              height={20}
            />
            <p>Disconnect</p>
          </div>
        </motion.div>
        <motion.div
          animate={isAccountsOpen && isQrCodeOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          variants={menu}
          className="absolute right-0 top-[120%] z-[80] w-[268.22px] cursor-auto rounded-[20px] bg-[#F2F4F3] py-[25.5px] shadow-xl"
        >
          <div className="flex flex-col gap-6 px-[22px]">
            <button
              className="flex w-fit items-center gap-3"
              onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}
            >
              <Image
                src={leftArrow.src}
                alt="back arrow icon"
                width={11.39}
                height={5.7}
              />
              Back
            </button>
            <div className="flex justify-center">
              <QRCode size={150} value={String(address)} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <div
      className="relative flex justify-end text-base/4 md:me-3"
      ref={wrongNetworkRef}
    >
      <div
        className="relative flex cursor-pointer items-center justify-center rounded-full bg-[#FACBCB] px-[18.3px] py-3"
        onClick={() => setIsWrongNetwoksOpen(!isWrongNetwoksOpen)}
      >
        <p>Wrong Network</p>
        <Image
          src={down.src}
          alt="down"
          className={`ml-[15px] ${isWrongNetwoksOpen && "rotate-180"}`}
          width={10}
          height={10}
        />
      </div>
      <motion.div
        animate={isWrongNetwoksOpen ? "open" : "closed"}
        initial="closed"
        exit="closed"
        variants={menu}
        className="absolute top-[120%] z-[80] w-[268.22px] rounded-[20px] bg-[#F2F4F3] py-6 font-medium shadow-xl"
      >
        <div className="flex flex-col gap-3.5 px-[22px]">
          <p className="font-bold">Switch Network</p>
          <p className="text-text-dark-gray text-xs/[11.6px]">
            Wrong network detected, switch or disconnect to continue
          </p>
        </div>
        <hr className="border-border-dark-gray mb-[19.51px] mt-[13.57px]" />
        <div className="flex flex-col gap-5 px-[22px]">
          {chains.map((c) => (
            <button
              className="flex cursor-pointer items-center gap-3"
              onClick={() => {
                switchChain({ chainId: c.id })
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  switchChain({ chainId: c.id })
                }
              }}
              type="button"
              key={c.id}
            >
              <Image
                src={icons[c.id]}
                alt={c.name}
                className="h-8 md:h-7"
                width={32}
                height={32}
              />
              <p>{c.name}</p>
            </button>
          ))}
        </div>
        <hr className="border-border-dark-gray mb-[18.53px] mt-[19.99px]" />
        <div
          className="flex cursor-pointer items-center gap-[17.7px] px-[22px]"
          onClick={() => disconnect()}
        >
          <Image
            src={disconnectIcon.src}
            alt="disconnect wallet"
            width={17.68}
            height={20}
          />
          <p>Disconnect</p>
        </div>
      </motion.div>
    </div>
  )
}

export default ConnectWallet
