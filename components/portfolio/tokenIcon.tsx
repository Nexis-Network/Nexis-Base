import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArbitrumCircleColorful,
  BaseCircleColorful,
  EthereumCircleColorful,
  UsdcCircleColorful,
  UsdtCircleColorful,
} from "@ant-design/web3-icons"

import { cn } from "@/lib/utils"

interface TokenIconProps {
  address: string
  logoURI?: string
  size?: number
  className?: string
}

type SpecialTokenMap = {
  [key: string]: JSX.Element
}

export default function TokenIcon({
  address,
  logoURI,
  size = 32,
  className,
}: TokenIconProps) {
  const [error, setError] = useState(false)

  // Reset error state when component mounts
  useEffect(() => {
    setError(false)
  }, [])

  // Function to get token logo URL
  const getTokenLogoURL = (address: string) => {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }

  // Function to render chain icon
  const ChainIcon = () => (
    <div className="absolute bottom-0 right-0 size-[32px] rounded-full bg-[#627EEA] ring-[0.5px] ring-black" />
  )

  // Special cases for specific tokens
  const specialTokens: SpecialTokenMap = {
    // ETH on Ethereum
    "0x0000000000000000000000000000000000000000": (
      <EthereumCircleColorful style={{ width: "32px", height: "32px" }} />
    ),
    // WETH on Ethereum
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": (
      <EthereumCircleColorful style={{ width: "32px", height: "32px" }} />
    ),
    // USDT
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": (
      <UsdtCircleColorful style={{ width: "32px", height: "32px" }} />
    ),
    // USDC
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": (
      <UsdcCircleColorful style={{ width: "32px", height: "32px" }} />
    ),
  }

  // Check if this is a special token
  const specialToken = specialTokens[address]
  if (specialToken) {
    return specialToken
  }

  if (error || !logoURI) {
    return (
      <Image
        src="/eth.svg"
        alt="ETH"
        width={32}
        height={32}
        className="rounded-full"
      />
    )
  }

  return (
    <Image
      src={logoURI || getTokenLogoURL(address)}
      alt={`Token ${address}`}
      width={32}
      height={32}
      className="rounded-full"
      onError={() => setError(true)}
    />
  )
}
