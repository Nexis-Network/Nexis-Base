import type React from "react"
import Image from "next/image"

// Import other icon components if available
// For example:
// import BnbIcon from '../ui/chains/BnbIcon';
// import PolygonIcon from '../ui/chains/PolygonIcon';
// ...

import defaultTokens from "../../tokens/defaultTokens.json"
import BitcoinIcon from "../ui/chains/BitcoinIcon"
import EthereumIcon from "../ui/chains/EthereumIcon"
import NexisIcon from "../ui/chains/NexisIcon"
import UsdcIcon from "../ui/chains/UsdcIcon"
import UsdtIcon from "../ui/chains/UsdtIcon"

interface TokenIconProps {
  address: string
  className?: string
  size?: number
}

const TokenIcon: React.FC<TokenIconProps> = ({
  address,
  className = "justify-center w-full h-full",
  size = 18,
}) => {
  const lowerAddress = address.toLowerCase()

  // Mapping of addresses to custom icon components
  const customIcons: { [address: string]: JSX.Element } = {
    "0x0000000000000000000000000000000000000000": (
      <EthereumIcon width={size} height={size} className={className} />
    ), // Native Ether
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": (
      <EthereumIcon width={size} height={size} className={className} />
    ), // Wrapped Ether (WETH)
    "0xdac17f958d2ee523a2206206994597c13d831ec7": (
      <UsdtIcon width={size} height={size} className={className} />
    ), // USDT
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": (
      <UsdcIcon width={size} height={size} className={className} />
    ), // USDC
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": (
      <BitcoinIcon width={size} height={size} className={className} />
    ), // Wrapped BTC
    // Add other custom icons here using their contract addresses
    // '0x...': <BnbIcon width={size} height={size} className={className} />,
    // '0x...': <PolygonIcon width={size} height={size} className={className} />,
  }

  if (customIcons[lowerAddress]) {
    return customIcons[lowerAddress]
  }

  // Find token in defaultTokens.json
  const token = defaultTokens.find(
    (t) => t.address.toLowerCase() === lowerAddress
  )

  if (token?.logoURI) {
    return (
      <Image
        src={token?.logoURI}
        alt={token?.name}
        width={size}
        height={size}
        className={className}
      />
    )
  }

  // Default to Ethereum icon if token not found
  return <NexisIcon width={size} height={size} className={className} />
}

export default TokenIcon
