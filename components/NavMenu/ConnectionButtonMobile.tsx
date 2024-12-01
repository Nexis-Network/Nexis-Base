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
      color: #f4f4f4;
      padding: 11px 14px;
      min-width: 132.25px;
      line-height: 1.125em;
      white-space: nowrap;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 0px;
      font-size: 0.75em;

      background: linear-gradient(
        to right,
        transparent 50%,
        rgba(177, 255, 105, 100) 0%
      );
      background-size: 200% 100%;
      background-position: left bottom;
      transition: background-position 0.5s ease-in-out;

      .text,
      .decoration {
        display: inline-block;
      }

      .decoration {
        float: right;
      }

      &:hover {
        background-position: right bottom;
        color: #07090b;

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

        .text-decoration,
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
        transform: translateX(-1.5px);
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
        transform: translate(-1.5px);
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
              className="z-[100] flex items-center rounded-full border-[0.5px] border-[#181F25]/20 bg-[#F2F4F3]/10 p-1 px-3 text-xs transition-all hover:bg-lime-300/20 hover:text-lime-300"
              style={{ width: "100%" }}
            >
              {/* SVG Icon */}
              <svg
                width="20"
                height="20"
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
              {/* Account Display Name */}
              <span
                className="ml-2 overflow-hidden whitespace-nowrap"
                style={{
                  flexGrow: 1,
                  textAlign: "justify",
                }}
              >
                {account.displayName}
                <span style={{ display: "inline-block", width: 0 }} />
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mx-auto mt-2 w-full rounded-md border border-[#181F25]/70 bg-[#07090b]/50 px-3 shadow-lg backdrop-blur-md">
                <button
                  type="button"
                  onClick={openChainModal}
                  className="block w-full p-2 text-left text-[12px] text-[#F2F4F3] hover:border-b hover:border-lime-300 hover:bg-[#07090b]/30"
                >
                  Switch Network
                </button>
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="block w-full p-2 text-left text-[12px] text-[#F2F4F3] hover:border-b hover:border-lime-300 hover:bg-[#07090b]/30"
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
