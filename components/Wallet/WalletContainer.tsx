/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useEffect, useRef, useState } from "react"
import { EvmNetWorthResult } from "@moralisweb3/common-evm-utils"
import { WalletAddress, WalletBalance } from "@turbo-eth/core-wagmi"
import Moralis from "moralis"
import { useAccount } from "wagmi"

import { CardContent } from "@/components/ui/card"

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
    <div
      className={`${styles.WalletContainer} relative z-0 mb-0 h-[400px] w-full overflow-hidden`}
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
      >
        <svg
          width="504"
          height="31"
          viewBox="0 0 504 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Decorative bottom border</title>
          <mask id="path-1-inside-1_1093_684" fill="white">
            <path d="M0 1C0 17.5685 13.4315 31 30 31H474C490.569 31 504 17.5685 504 1V1H0V1Z" />
          </mask>
          <path
            d="M0 1C0 17.5685 13.4315 31 30 31H474C490.569 31 504 17.5685 504 1V1H0V1Z"
            fill="black"
          />
          <path
            d="M-1 1C-1 18.1208 12.8792 32 30 32H474C491.121 32 505 18.1208 505 1H503C503 17.0163 490.016 30 474 30H30C13.9837 30 1 17.0163 1 1H-1ZM504 1H0H504ZM-1 1C-1 18.1208 12.8792 32 30 32V30C13.9837 30 1 17.0163 1 1H-1ZM474 32C491.121 32 505 18.1208 505 1H503C503 17.0163 490.016 30 474 30V32Z"
            fill="#242424"
            mask="url(#path-1-inside-1_1093_684)"
          />
        </svg>
      </div>
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
      <div className="relative z-50 flex h-full flex-col border-y border-[#242424] bg-black/10 text-black">
        <div className="flex flex-1 items-center justify-start p-4">
          <div className="text-left">
            <p className="text-sm">Net Worth</p>
            <h3 className="text-3xl font-bold">
              {netWorth
                ? `$${Number.parseFloat(netWorth).toFixed(2)}`
                : "Loading..."}
            </h3>
          </div>
        </div>
        <div className="flex">
          <CardContent className="flex w-1/2 items-center space-x-4 p-4">
            <div className="z-10 flex size-6 items-center justify-center">
              <svg
                width="50%"
                height="100%"
                viewBox="0 0 358 358"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="walletIconTitle"
              >
                <title id="walletIconTitle">Wallet Icon</title>
                <rect
                  x="1"
                  y="1"
                  width="356"
                  height="356"
                  rx="178"
                  stroke="url(#paint0_linear_128_34)"
                  stroke-width="2"
                />
                <path
                  opacity="0.2"
                  d="M179 358C277.859 358 358 277.859 358 179C358 80.141 277.859 0 179 0C80.141 0 0 80.141 0 179C0 277.859 80.141 358 179 358Z"
                  fill="#C2FF75"
                />
                <path
                  d="M118.888 243.399C118.895 243.399 118.901 243.402 118.905 243.406C118.944 243.444 118.983 243.483 119.023 243.521C119.213 243.703 119.525 243.673 119.676 243.458L125.473 235.178C125.532 235.093 125.586 235.003 125.632 234.911C130.7 224.849 132.676 215.664 132.734 207.842C132.656 203.639 132.069 199.474 131.014 195.428C130.271 192.992 129.724 190.477 129.373 187.943C129.373 187.924 129.373 187.884 129.373 187.845C129.138 186.156 128.982 184.427 128.904 182.698C127.831 154.887 149.295 131.051 176.863 129.411C176.912 129.408 176.934 129.348 176.898 129.315V129.315C176.861 129.282 176.881 129.222 176.93 129.219C183.511 128.833 193.033 130.254 201.032 128.146C209.377 125.769 216.958 121.153 222.978 114.788C223.177 114.574 223.395 114.377 223.625 114.2C223.837 114.036 224.033 113.851 224.186 113.631L228.365 107.679C229.058 106.691 228.818 105.326 227.812 104.661C204.32 89.1302 173.867 85.1086 145.866 96.617C100.764 115.122 79.1505 166.904 97.5783 212.243C102.19 223.578 108.854 233.439 116.983 241.553C117.606 242.179 118.229 242.785 118.872 243.392C118.876 243.397 118.882 243.399 118.888 243.399V243.399Z"
                  fill="#C2FF75"
                />
                <path
                  d="M233.943 120.968C233.82 121.143 233.725 121.335 233.654 121.536C233.54 121.853 233.407 122.172 233.231 122.469C227.896 132.507 225.629 147.673 226.117 153.664C226.913 163.553 229.905 169.995 229.028 177.547C229.016 177.654 229.01 177.763 229.013 177.871C229.629 205.42 208.195 228.792 180.859 230.333C180.82 230.335 180.781 230.336 180.742 230.336V230.336C174.703 230.728 174 230.139 168.469 230.394C157.106 230.903 144.987 235.657 136.55 244.541C136.477 244.617 136.41 244.699 136.35 244.786L132.071 250.902C131.37 251.905 131.631 253.289 132.662 253.947C133.673 254.591 134.692 255.223 135.718 255.854C136.48 256.286 137.242 256.698 138.004 257.111C160.301 268.937 187.444 271.117 212.594 260.784C257.696 242.26 279.309 190.477 260.882 145.138C256.175 133.566 249.304 123.517 240.939 115.296C239.996 114.37 238.455 114.534 237.696 115.616L233.943 120.968Z"
                  fill="#C2FF75"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_128_34"
                    x1="98.1354"
                    y1="1.77928e-06"
                    x2="259.865"
                    y2="358"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#D8F953" />
                    <stop offset="1" stop-color="#7F914A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex-1">
              <WalletAddress />
            </div>
          </CardContent>
          <div className="flex w-1/2 flex-col justify-end">
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2" />
    </div>
  )
}

export default WalletContainer
