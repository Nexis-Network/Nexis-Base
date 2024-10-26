/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import React, { useEffect, useRef } from "react"
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit"
import { WalletAddress, WalletBalance } from "@turbo-eth/core-wagmi"
import { Copy, ExternalLink } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"

import styles from "./WalletContainer.module.css"

export const WalletContainer: React.FC = () => {
  const splineContainerRef = useRef<HTMLDivElement>(null)

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
      <div className={`${styles.SplineContainer} absolute inset-0`}>
        <iframe
          src="https://my.spline.design/untitled-2bf3731ab3100c1b1df0d37d5896fa68/"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          className="absolute inset-0 h-full w-full border-none"
        ></iframe>
      </div>
      <div className="relative z-50 flex h-full flex-col border-y border-[#242424] bg-black/10 text-black">
        <div className="flex flex-1 items-center justify-end p-4">
          <div className="text-right">
            <p className="text-sm">Net Worth</p>
            <h3 className="text-3xl font-bold">
              <WalletBalance />
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="z-10 mt-2 text-black"
            >
              View Portfolio
            </Button>
          </div>
        </div>
        <div className="flex">
          <CardContent className="flex w-1/2 items-center space-x-4 p-4">
            <div className="z-10 flex h-6 w-6 items-center justify-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 358 358"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              <RainbowkitConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div>
                      <h2 className="text-2xl font-bold text-black">
                        {connected ? <WalletEnsName /> : "Not Connected"}
                      </h2>
                      <div className="mt-1 flex items-center">
                        {connected ? (
                          <>
                            <Button
                              onClick={openAccountModal}
                              variant="outline"
                              size="sm"
                              className=" text-black"
                            >
                              {account.address.slice(0, 6)}...
                              {account.address.slice(-6)}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2 text-black"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={openConnectModal}
                            variant="outline"
                            size="sm"
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                }}
              </RainbowkitConnectButton.Custom>
            </div>
          </CardContent>
          <div className="flex w-1/2 flex-col justify-end">
            <div className={styles.zkDataContainer}>
              <span className="text-black">/// zK data. </span>
              for any AI.
            </div>
            <div className={styles.zkDataContainer}>
              <span className="text-black">/// zK data. </span>
              for any AI.
            </div>
            <div className={styles.zkDataContainer}>
              <span className="text-black">/// zK data. </span>
              for any AI.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletContainer
