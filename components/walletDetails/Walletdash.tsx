"use client"

import { useEffect, useState } from "react"
import { EvmChain } from "@moralisweb3/common-evm-utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Moralis from "moralis"
import { useAccount, useSendTransaction } from "wagmi"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import History from "./walletHistory"

const initializeMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  })
}

initializeMoralis().catch((error) => {
  console.error("Error initializing Moralis:", error)
})

// Add these interfaces for type safety
interface NativeBalance {
  result: {
    balance: {
      ether: string
    }
  }
}

interface TokenBalance {
  value: string
  token: {
    contractAddress: string
    name: string
    symbol: string
  }
}

interface TokenBalanceResponse {
  result: TokenBalance[]
}

interface Protocol {
  chain: string
  protocol_name: string
  total_balance_usd: string
  total_positions: number
}

interface WalletActiveChains {
  protocols: Protocol[]
}

interface ProtocolsResponse {
  result: WalletActiveChains
}

interface DefiProtocolData {
  total_positions: number
  total_usd_value: number
  total_unclaimed_usd_value: number
}

interface ChainBalance {
  nativeBalance: NativeBalance
  tokenBalances: TokenBalanceResponse
}

// Define supported chains
interface SupportedChainInfo {
  name: string
  chain: EvmChain
}

const SUPPORTED_CHAINS: SupportedChainInfo[] = [
  { name: "Ethereum", chain: EvmChain.ETHEREUM },
  { name: "BSC", chain: EvmChain.BSC },
  { name: "Arbitrum", chain: EvmChain.ARBITRUM },
  { name: "Base", chain: EvmChain.BASE },
]

type SupportedChain = (typeof SUPPORTED_CHAINS)[number]

interface EvmWalletActiveChains {
  chains: string[]
  totalBalance: string
  totalPositions: number
}

interface ResponseAdapter<T> {
  result: T
}

export default function WalletDashboard() {
  const { address, isConnected } = useAccount()
  const [netWorth, setNetWorth] = useState<number>(0)
  const [usdChange24h, setUsdChange24h] = useState<number>(0)
  const [percentageChange24h, setPercentageChange24h] = useState<number>(0)
  const [portfolioPercentage, setPortfolioPercentage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [defiData, setDefiData] = useState<DefiProtocolData>({
    total_positions: 0,
    total_usd_value: 0,
    total_unclaimed_usd_value: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && address) {
        try {
          await Promise.all([
            fetchWalletData(address),
            fetchDefiProtocolData(address),
          ])
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    void fetchData()
  }, [isConnected, address])

  const updateUserBalance = async (
    address: string,
    totalBalance: number,
    defiValue: number,
    unclaimedValue: number
  ) => {
    try {
      const response = await fetch("/api/wallet/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          totalBalance,
          defiValue,
          unclaimedValue,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update balance")
      }
    } catch (error) {
      console.error("Error updating user balance:", error)
    }
  }

  const fetchWalletData = async (walletAddress: string) => {
    setIsLoading(true)
    try {
      const balancePromises = SUPPORTED_CHAINS.map((chainInfo) =>
        Promise.all([
          Moralis.EvmApi.balance.getNativeBalance({
            address: walletAddress,
            chain: chainInfo.chain,
          }) as Promise<NativeBalance>,
          Moralis.EvmApi.token.getWalletTokenBalances({
            address: walletAddress,
            chain: chainInfo.chain,
          }) as unknown as Promise<TokenBalanceResponse>,
        ]).catch((error: Error) => {
          console.error(
            `Error fetching balance for chain ${chainInfo.name}:`,
            error
          )
          return [{ result: { balance: { ether: "0" } } }, { result: [] }] as [
            NativeBalance,
            TokenBalanceResponse
          ]
        })
      )

      const chainBalances = await Promise.all(balancePromises)

      const worth = chainBalances.reduce(
        (total: number, [nativeBalance, tokenBalances]) => {
          const nativeWorth = Number.parseFloat(
            nativeBalance.result.balance.ether
          )
          const tokenWorth = tokenBalances.result.reduce(
            (acc: number, token: TokenBalance) =>
              acc + Number.parseFloat(token.value || "0"),
            0
          )
          return total + nativeWorth + tokenWorth
        },
        0
      )

      setNetWorth(worth)

      const randomChange = Math.random() * 200 - 100
      setUsdChange24h(randomChange)
      setPercentageChange24h((randomChange / worth) * 100)
      setPortfolioPercentage(Math.random() * 100)

      // Update the database with the new balance
      await updateUserBalance(
        walletAddress,
        worth,
        defiData.total_usd_value,
        defiData.total_unclaimed_usd_value
      )

      // Store networth in database
      await fetch("/api/wallet/networth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          networth: worth,
        }),
      })
    } catch (error) {
      console.error("Error fetching wallet data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDefiProtocolData = async (walletAddress: string) => {
    try {
      const protocolsPromises = SUPPORTED_CHAINS.map((chainInfo) =>
        Moralis.EvmApi.wallets
          .getWalletActiveChains({
            address: walletAddress,
            chains: [chainInfo.chain],
          })
          .catch((error: Error) => {
            console.error(
              `Error fetching DeFi data for chain ${chainInfo.name}:`,
              error
            )
            return {
              result: {
                chains: [],
                totalBalance: "0",
                totalPositions: 0,
              },
            } as ResponseAdapter<EvmWalletActiveChains>
          })
      )

      const responses = await Promise.all(protocolsPromises)

      const totalData = responses.reduce<DefiProtocolData>(
        (acc, response) => {
          if (!response.result) return acc
          const result = response.result as EvmWalletActiveChains
          return {
            total_positions:
              acc.total_positions + (Number(result.totalPositions) || 0),
            total_usd_value:
              acc.total_usd_value + Number(result.totalBalance || "0"),
            total_unclaimed_usd_value: acc.total_unclaimed_usd_value,
          }
        },
        {
          total_positions: 0,
          total_usd_value: 0,
          total_unclaimed_usd_value: 0,
        }
      )

      setDefiData(totalData)
    } catch (error) {
      console.error("Error fetching DeFi data:", error)
    }
  }

  return (
    <div className="space-y-4 p-4">
      {isConnected ? (
        isLoading ? (
          <div>Loading wallet data...</div>
        ) : (
          <div className="flex flex-col space-y-4">
            {/* Net Worth and Changes */}
            <Card className="border-none bg-transparent">
              <CardHeader>
                <CardTitle>Net Worth</CardTitle>
                <p className="text-3xl font-bold">${netWorth.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-lg ${
                      usdChange24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ${Math.abs(usdChange24h).toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${
                      percentageChange24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ({percentageChange24h.toFixed(2)}%)
                  </span>
                </div>
              </CardHeader>
            </Card>
            <div className="flex space-x-4">
              <Button variant="outline">Send</Button>
              <Button variant="outline">Receive</Button>
            </div>

            {/* DeFi Stats */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
              <Card className="rounded-none border-none bg-transparent">
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-sm">DeFi Positions</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-md">{defiData.total_positions}</p>
                </CardContent>
              </Card>
              <Card className="rounded-none border-none bg-transparent">
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-sm">Total DeFi Value</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-md">
                    ${defiData.total_usd_value.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-none border-none bg-transparent">
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-sm">Unclaimed Value</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-md">
                    ${defiData.total_unclaimed_usd_value.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      ) : (
        <div className="text-center">
          Please connect your wallet to view your dashboard.
        </div>
      )}
    </div>
  )
}
