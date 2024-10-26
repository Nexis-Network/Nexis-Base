"use client"

import React, { useState } from "react"
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit"

import { CardSpotlight } from "@/components/ui/card-spotlight"
import HyperText from "@/components/ui/hyper-text"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"

// Import the SVG
import Icon from "./Icon"

interface ConnectionButtonProps {
  className?: string
}

export const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <RainbowKitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const connected = !!account && !!chain

        return (
          <div className="relative">
            {!connected ? (
              <button
                onClick={openConnectModal}
                type="button"
                className={`relative px-6 py-0.5 text-[14px] uppercase text-[#CBFF00] transition duration-200 ${
                  className ?? ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <HyperText
                  text="CONNECT"
                  className="text-sm uppercase"
                  animateOnLoad={false}
                />
                <span className="absolute inset-0 z-0">
                  <span
                    className={`absolute left-0 top-0 size-2 border-l-2 border-t-2 border-[#CBFF00]/30 ${
                      isHovered ? "animate-border-top-left" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute right-0 top-0 size-2 border-r-2 border-t-2 border-[#CBFF00]/30 ${
                      isHovered ? "animate-border-top-right" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-[#CBFF00]/30 ${
                      isHovered ? "animate-border-bottom-left" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-[#CBFF00]/30 ${
                      isHovered ? "animate-border-bottom-right" : ""
                    }`}
                  ></span>
                </span>
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                type="button"
                className="text-red-500"
              >
                Wrong network
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  type="button"
                  className="flex items-center gap-2"
                >
                  <Icon
                    {...{
                      className: "size-8 rounded-full border border-[#242424]",
                      icon: "wallet",
                    }}
                  />
                  {account?.displayBalance
                    ? ` (${account.displayBalance})`
                    : ""}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-[#242424] bg-[#09090b] shadow-lg ring-1 ring-black/5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <CardSpotlight radius={100} color="#1a1a1a">
                        <button
                          onClick={() => {
                            openChainModal()
                            setIsDropdownOpen(false)
                          }}
                          className="block w-full border-b border-[#242424] px-4 py-2 text-left text-sm text-[#fafafa]/80 hover:bg-[#0a0a0a] hover:text-[#fafafa]"
                          role="menuitem"
                        >
                          Switch Network
                        </button>
                      </CardSpotlight>
                      <CardSpotlight radius={100} color="#1a1a1a">
                        <button
                          onClick={() => {
                            openAccountModal()
                            setIsDropdownOpen(false)
                          }}
                          className="block w-full border-b border-[#242424] px-4 py-2 text-left text-sm text-[#fafafa]/80 hover:bg-[#0a0a0a] hover:text-[#fafafa]"
                          role="menuitem"
                        >
                          Account Details
                        </button>
                      </CardSpotlight>
                      {/* Add more menu items as needed */}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      }}
    </RainbowKitConnectButton.Custom>
  )
}

export const ConnectButton = RainbowKitConnectButton
