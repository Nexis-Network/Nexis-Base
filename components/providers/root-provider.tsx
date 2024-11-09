"use client"

import type { ReactNode } from "react"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Provider as RWBProvider } from "react-wrap-balancer"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { useIsMounted } from "@/lib/hooks/use-is-mounted"
import HandleWalletEvents from "@/components/blockchain/handle-wallet-events"
import { RainbowKit } from "@/components/providers/rainbow-kit"

const queryClient = new QueryClient()

interface RootProviderProps {
  children: ReactNode
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, arbitrum],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Your App Name",
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            <RWBProvider>
              <RainbowKit>
                <HandleWalletEvents>{children}</HandleWalletEvents>
              </RainbowKit>
            </RWBProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ThemeProvider>
  ) : null
}
