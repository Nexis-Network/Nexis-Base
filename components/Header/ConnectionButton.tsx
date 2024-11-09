/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import type React from "react"
import { useState } from "react"
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit"
import styled from "styled-components"

export const ConnectionButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const StyledWrapper = styled.div`
    [class*="btn-glitch-"] {
      display: inline-block;
      font-family: "VT323", monospace;
      border: 1px solid rgb(212, 254, 45, 0.5);
      color: rgb(212, 254, 45, 0.5);
      padding: 7.5px 9.75px;
      min-width: 131.25px;
      line-height: 1.125em;
      white-space: nowrap;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 11.25px;
      font-size: 0.75em;

      .text,
      .decoration {
        display: inline-block;
      }

      .decoration {
        display: inline-block;
        float: right;
      }

      &:hover,
      &:focus {
        animation-name: glitch;
        animation-duration: 0.2s;
        background-color: rgb(212, 254, 45);
        color: black;
        border: 1px solid rgb(212, 254, 45);

        .text-decoration {
          animation-name: blink;
          animation-duration: 0.1s;
          animation-iteration-count: infinite;
        }

        .decoration {
          animation-name: blink;
          animation-duration: 0.1s;
          animation-iteration-count: infinite;
        }
      }

      &:active {
        background: none;
        color: yellow;

        .text-decoration {
          animation-name: none;
        }

        .decoration {
          animation-name: none;
        }

        :before,
        :after {
          display: none;
        }
      }
    }

    @keyframes glitch {
      25% {
        background-color: red;
        transform: translateX(-7.5px);
        letter-spacing: 7.5px;
      }

      35% {
        background-color: green;
        transform: translate(7.5px);
      }

      59% {
        opacity: 0;
      }

      60% {
        background-color: blue;
        transform: translate(-7.5px);
        filter: blur(3.75px);
      }

      100% {
        background-color: yellow;
        blur: (3.75px);
      }
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    @keyframes shrink {
      100% {
        width: 7.5%;
      }
    }
  `

  return (
    <RainbowKitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain

        if (!connected) {
          return (
            <StyledWrapper>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a
                href="#"
                className="btn-glitch-fill"
                onClick={openConnectModal}
              >
                <span className="text">{"// Connect"}</span>
                <span className="text-decoration"> _</span>
                <span className="decoration">⇒</span>
              </a>
            </StyledWrapper>
          )
        }

        return (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="rounded-md bg-[#212121] px-3 py-1.5 text-white"
            >
              <p className="text-sm font-medium">{account.displayName}</p>
              <div className="flex w-full items-center justify-center">
                {/* Include your SVG icon here if needed */}
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-36 rounded-md border border-[#242424] bg-black shadow-lg">
                <button
                  type="button"
                  onClick={openChainModal}
                  className="block w-full px-3 py-1.5 text-left text-white hover:bg-gray-700"
                >
                  Switch Network
                </button>
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="block w-full px-3 py-1.5 text-left text-white hover:bg-gray-700"
                >
                  Account Details
                </button>
              </div>
            )}
          </div>
        )
      }}
    </RainbowKitConnectButton.Custom>
  )
}

export const ConnectButton = RainbowKitConnectButton
