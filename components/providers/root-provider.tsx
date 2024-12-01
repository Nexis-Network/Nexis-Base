"use client"

import { useEffect, useState, type ReactNode } from "react"
import store from "@/store/store"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { Provider as RWBProvider } from "react-wrap-balancer"
import { YMInitializer } from "react-yandex-metrika"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { NEXT_PUBLIC_YANDEX_METRICA_ID } from "@/lib/config"
import { useIsMounted } from "@/lib/hooks/use-is-mounted"
import HandleWalletEvents from "@/components/blockchain/handle-wallet-events"
import EcosystemAppModal from "@/components/EcosystemAppModal"
import { RainbowKit } from "@/components/providers/rainbow-kit"
import QuestModal from "@/components/Quests/QuestModal"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, arbitrum],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Nexis Network Homebase",
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

type RootProviderProps = {
  children: React.ReactNode
}

export default function RootProvider({ children }: RootProviderProps) {
  const [isClient, setIsClient] = useState(false)
  const queryClient = new QueryClient()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isMounted = useIsMounted()
  return isMounted ? (
    <Provider store={store}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <YMInitializer
              accounts={[Number.parseInt(NEXT_PUBLIC_YANDEX_METRICA_ID)]}
              options={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
              }}
            />
            <RWBProvider>
              <RainbowKit>
                <QuestModal />
                <EcosystemAppModal />
                <QueryClientProvider client={queryClient}>
                  <HandleWalletEvents>{children}</HandleWalletEvents>
                </QueryClientProvider>
              </RainbowKit>
            </RWBProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  ) : null
}
