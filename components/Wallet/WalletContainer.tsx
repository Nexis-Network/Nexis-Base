/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useEffect, useRef, useState } from "react"
import { EvmNetWorthResult } from "@moralisweb3/common-evm-utils"
import { WalletAddress, WalletBalance } from "@turbo-eth/core-wagmi"
import Moralis from "moralis"
import { useAccount } from "wagmi"

import { CardContent } from "@/components/ui/card"

import ScrollBanner from "../scrollbar/ScrollBanner"
import styles from "./WalletContainer.module.css"

export const WalletContainer: React.FC = () => {
  const { address } = useAccount()

  const splineContainerRef = useRef<HTMLDivElement>(null)
  const [netWorth, setNetWorth] = useState<string | null>(null)

  // State variables for the typewriter effect
  const [displayedText, setDisplayedText] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)
  const [textArray, setTextArray] = useState<string[]>([
    "Welcome...",
    "Systems initializing...",
    "Wallet connected...",
    "Nodes activated...",
    "Analyzing systems...",
    "All systems operational...",
    "Please connect your wallet...",
  ])

  // Add net worth to the text array when it's fetched
  useEffect(() => {
    if (netWorth) {
      const netWorthText = `$${Number.parseFloat(netWorth).toFixed(2)}`
      setTextArray((prev) => [...prev, netWorthText])
    }
  }, [netWorth])

  // Typewriter effect logic
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout

    if (!isTyping && currentWordIndex < textArray.length) {
      setIsTyping(true)
      setCurrentCharIndex(0)
      setDisplayedText("")
    }

    if (isTyping) {
      if (currentCharIndex < textArray[currentWordIndex].length) {
        typingTimeout = setTimeout(() => {
          setDisplayedText(
            (prev) => prev + textArray[currentWordIndex][currentCharIndex]
          )
          setCurrentCharIndex((prev) => prev + 1)
        }, 100)
      } else {
        // Finish typing current word, wait for a while, then move to next word
        typingTimeout = setTimeout(() => {
          setIsTyping(false)
          setCurrentWordIndex((prev) => prev + 1)
        }, 1000)
      }
    }

    return () => clearTimeout(typingTimeout)
  }, [isTyping, currentCharIndex, currentWordIndex, textArray])

  useEffect(() => {
    const fetchNetWorth = async (walletAddress: string) => {
      try {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        })
        const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
          address: walletAddress,
          excludeSpam: true,
          excludeUnverifiedContracts: true,
        })

        setNetWorth(response.raw.total_networth_usd)
      } catch (e) {
        console.error("Error fetching net worth:", e)
        setNetWorth(null)
      }
    }

    if (address) {
      fetchNetWorth(address).catch(console.error)
    }
  }, [address])

  useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.9.32/build/spline-viewer.js"
    script.type = "module"
    document.body.appendChild(script)

    script.onload = () => {
      if (splineContainerRef.current) {
        const splineViewer = document.createElement("spline-viewer")
        splineViewer.setAttribute(
          "url",
          "https://prod.spline.design/NmY9uK3u0K784K66/scene.splinecode"
        )
        splineViewer.style.position = "absolute"
        splineViewer.style.top = "0"
        splineViewer.style.left = "0"
        splineViewer.style.width = "100%"
        splineViewer.style.height = "100%"
        splineViewer.style.pointerEvents = "none"
        splineContainerRef.current.appendChild(splineViewer)
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <div
        className={`${styles.WalletContainer} relative z-0 mb-0 h-[400px] w-full overflow-hidden rounded-lg`}
      >
        {/* Add the SVG to the top middle of the container with higher z-index */}
        <div className="negativeMarginTop absolute left-1/2 top-0 z-[100] mt-[-3px] -translate-x-1/2">
          <svg
            width="504"
            height="24"
            viewBox="0 0 504 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.negativeMarginTop}
          >
            <title>Decorative top border</title>
            <mask id="path-1-inside-1_1085_39" fill="white">
              <path d="M0 0C0 13.2548 10.7452 24 24 24H480C493.255 24 504 13.2548 504 0V0H0V0Z" />
            </mask>
            <path
              d="M0 0C0 13.2548 10.7452 24 24 24H480C493.255 24 504 13.2548 504 0V0H0V0Z"
              fill="#0a0a0a"
            />
            <path
              d="M-1 0C-1 13.8071 10.1929 25 24 25H480C493.807 25 505 13.8071 505 0H503C503 12.7025 492.703 23 480 23H24C11.2975 23 1 12.7025 1 0H-1ZM504 0H0H504ZM-1 0C-1 13.8071 10.1929 25 24 25V23C11.2975 23 1 12.7025 1 0H-1ZM480 25C493.807 25 505 13.8071 505 0H503C503 12.7025 492.703 23 480 23V25Z"
              fill="#0a0a0a"
              mask="url(#path-1-inside-1_1085_39)"
            />
            {/* Display the animated text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className={styles.netWorthText}
            >
              {displayedText}
            </text>
          </svg>
        </div>

        <div
          className={`absolute left-1/2 top-0 -translate-x-1/2${styles.negativeMarginTop}`}
        />
        <div className={`${styles.SplineContainer} absolute inset-0`}>
          <iframe
            src="https://my.spline.design/untitled-2bf3731ab3100c1b1df0d37d5896fa68/"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            className="absolute inset-0 size-full border-none"
            title="Spline Design"
          />
        </div>
        <div className="relative z-50 flex h-full flex-col justify-end bg-transparent text-black">
          <div className="align-start m-6 border-b border-[#131313]">
            <div className="flex">
              <CardContent className="flex w-1/2 items-center">
                <div className={styles.homebasebox}>
                  <div className="flex-1">
                    <div className={styles.nexisNetworkText}>
                      // Nexis Network
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <text className={styles.homebase}>HOMEBASE</text>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="mb-8 flex w-1/2 flex-col justify-end">
                <div className={styles.zkDataContainer}>
                  {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
                  <span className="text-black">/// zK data. </span>
                  for any AI.
                </div>
                <div className={styles.zkDataContainer}>
                  {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
                  <span className="text-black">/// zK data. </span>
                  for any AI.
                </div>
                <div className={styles.zkDataContainer}>
                  {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
                  <span className="text-black">/// zK data. </span>
                  for any AI.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2" />
      </div>
      <ScrollBanner />
    </>
  )
}

export default WalletContainer
