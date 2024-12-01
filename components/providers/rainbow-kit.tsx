"use client"

import "@rainbow-me/rainbowkit/styles.css"

import type { ReactNode } from "react"
import {
  connectorsForWallets,
  darkTheme,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { siteConfig } from "@/config/site"
import { useColorMode } from "@/lib/state/color-mode"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ chains, appName: siteConfig.name }),
      walletConnectWallet({ chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function RainbowKit({ children }: { children: ReactNode }) {
  const [colorMode] = useColorMode()

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={colorMode === "dark" ? darkTheme() : midnightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
