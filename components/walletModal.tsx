import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import fb from "@/assets/fb.svg"
import gh from "@/assets/gh.svg"
import google from "@/assets/google.svg"
import twitch from "@/assets/twitch.svg"
import twitter2 from "@/assets/twitter2.svg"
import wc from "@/assets/wc.svg"
import coinbase from "@/public/assets/coinbase.svg"
import discord2 from "@/public/assets/discord2.svg"
import metamask from "@/public/metamask.png"
import { selectNavbarSlice, setIsWalletModalOpen } from "@/store/navbarSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { selectUserSlice } from "@/store/userSlice"
import * as amplitude from "@amplitude/analytics-browser"
import { AnimatePresence, motion } from "framer-motion"
import ReactGA from "react-ga4"
import { useAccount, useConnect } from "wagmi"

import { IS_ETHEREUM_OBJECT_DETECTED, walletType } from "@/lib/helpers"

import { Close } from "./icons/close"
import SocialButton from "./SocialButton"
import WalletButton from "./WalletButton"

const WalletModal = (): JSX.Element => {
  const [connectingWalletId, setConnectingWalletId] = useState<string>("")
  const { connect, connectors } = useConnect()
  const emailRef = useRef<HTMLInputElement>(null)
  const { isWalletModalOpen } = useAppSelector(selectNavbarSlice)
  const dispatch = useAppDispatch()
  const { address, connector, isConnected } = useAccount()
  const { user } = useAppSelector(selectUserSlice)

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-bg") {
        dispatch(setIsWalletModalOpen(false))
      }
    })
  }, [dispatch])

  useEffect(() => {
    if (isConnected) {
      dispatch(setIsWalletModalOpen(false))
    }
  }, [dispatch, isConnected])

  useEffect(() => {
    if (address && connector && user.points) {
      amplitude.setUserId(address)

      amplitude.track("Wallet connected", {
        walletType: walletType[connector.id],
        walletAddress: address,
        points: user.points,
      })
    }
  }, [address, connector, user.points])

  const connectionEvent = useCallback((id: string) => {
    ReactGA.event({
      category: "Connection",
      action: "Connecting wallet",
      label: id,
    })
  }, [])

  const connectWallet = useCallback(
    (id: string) => {
      connectionEvent(id)
      setConnectingWalletId(id)
      const selectedConnector = connectors.find(
        (connector) => connector.id === id
      )
      if (selectedConnector) {
        localStorage.setItem("Fuse-selectedConnectorId", selectedConnector.id)
        connect({ connector: selectedConnector })
      }
    },
    [connect, connectors, connectionEvent]
  )

  return (
    <AnimatePresence>
      {isWalletModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-50 flex size-full bg-black bg-opacity-60"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="absolute left-1/2 top-1/2 z-50 flex min-h-[625px] w-[548px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[20px] bg-[#F2F4F3] px-[62px] pb-[60px] pt-[47.5px] md:min-h-[400px] md:px-5 md:py-8"
          >
            <span className="flex w-full items-start justify-between">
              <p className="text-[20px] font-bold">Connect Wallet</p>
              <Close
                className="absolute right-5 top-[15px] w-6 cursor-pointer"
                onClick={() => {
                  dispatch(setIsWalletModalOpen(false))
                }}
              />
            </span>
            <span className="pt-2 text-sm">
              <p>
                Connecting your wallet is like “logging in” to Web3. Select your
                wallet from the options to get started.
              </p>
              <a
                href="https://news.nexis.network/what-is-a-web3-wallet"
                target="_blank"
                rel="noreferrer"
                className="text-[#1877F2] underline"
              >
                What is Web3 wallet?
              </a>
            </span>
            <div className="grid w-full grid-cols-3 gap-2.5 pt-[43.5px]">
              <WalletButton
                icon={metamask}
                text="MetaMask"
                className="w-[35px]"
                id={IS_ETHEREUM_OBJECT_DETECTED ? "injected" : "metaMaskSDK"}
                connectingWalletId={connectingWalletId}
                onClick={() =>
                  connectWallet(
                    IS_ETHEREUM_OBJECT_DETECTED ? "injected" : "metaMaskSDK"
                  )
                }
              />
              <WalletButton
                icon={wc}
                text="WalletConnect"
                className="w-[35px]"
                id="walletConnect"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("walletConnect")}
              />
              <WalletButton
                icon={coinbase}
                text="Coinbase"
                className="h-[30px]"
                id="coinbaseWallet"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("coinbaseWallet")}
              />
            </div>
            <div className="flex w-full items-center justify-between pt-6 text-sm text-[#9F9F9F] md:text-[10px]">
              <hr className="w-[37%]" />
              <p>or connect with</p>
              <hr className="w-[37%]" />
            </div>
            <div className="grid w-full grid-cols-3 gap-x-2.5 gap-y-2 pt-6">
              <SocialButton
                icon={google}
                className="h-[55px] bg-[#F3F3F3]"
                id="google"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("google")}
              />
              <SocialButton
                icon={fb}
                className="h-[55px] bg-[#F3F3F3]"
                id="facebook"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("facebook")}
              />
              <SocialButton
                icon={twitter2}
                className="h-[55px] bg-[#F3F3F3]"
                id="twitter"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitter")}
              />
              <SocialButton
                icon={discord2}
                className="h-[55px] bg-[#F3F3F3]"
                id="discord"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("discord")}
              />
              <SocialButton
                icon={twitch}
                className="h-[55px] bg-[#F3F3F3]"
                id="twitch"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitch")}
              />
              <SocialButton
                icon={gh}
                className="h-[55px] bg-[#F3F3F3]"
                id="github"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("github")}
              />
            </div>
            <div className="flex w-full items-center justify-between pt-6 text-sm text-[#9F9F9F] md:text-[10px]">
              <hr className="w-2/5" />
              <p>or with email</p>
              <hr className="w-2/5" />
            </div>
            <div className="flex w-full pt-6">
              <div className="flex h-[45px] w-2/3 rounded-[40px] bg-[#F2F2F2] p-2">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="placeholder:text-text-dark-gray w-full bg-[#F2F2F2] px-[29.21px] py-[14.5px] text-base font-medium leading-none outline-none"
                  ref={emailRef}
                />
              </div>
              <button
                type="button"
                className="ml-2 h-[45px] w-1/3 rounded-[40px] bg-black text-base font-bold leading-none text-[#F2F4F3]"
                onClick={() => {
                  if (!emailRef.current || !emailRef.current.value.length) {
                    return
                  }
                  localStorage.setItem("Fuse-loginHint", emailRef.current.value)
                  connectWallet("email_passwordless")
                }}
              >
                Connect
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default WalletModal
