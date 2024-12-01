/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useEffect, useState } from "react"
import {
  ArbitrumCircleColorful,
  EthereumCircleColorful,
  UsdcCircleColorful,
  UsdtCircleColorful,
} from "@ant-design/web3-icons"
import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"
import { useAccount } from "wagmi"

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { NFTGallery } from "../NFTGallery"
import EthereumIcon from "../ui/chains/EthereumIcon"
import HyperText from "../ui/hyper-text"
import Web3DashboardTable from "../WalletDetails"
import Styles from "./portfolio.module.css"
import { TokenSearch } from "./search"
import TokenIcon from "./tokenIcon"
import TokensCarousel from "./tokens"

// Token addresses (Ethereum mainnet)
const DEFAULT_TOKENS = {
  ETH: "0x0000000000000000000000000000000000000000",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
}

interface Token {
  token: {
    name: string
    symbol: string
    contractAddress: string
    decimals: number
    logoURI?: string
    logo?: string | React.ReactNode
  }
  amount: string
  price: number
  priceChange24h: number
  value: number
  network: string
}

// Define the Nft interface
interface Nft {
  tokenAddress: string
  tokenId: string
  name?: string
  metadata?: {
    name?: string
    image?: string
  }
  floorPrice: string | number
  // Include any other properties you need from the NFT object
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("tokens")
  const [tokens, setTokens] = useState<Token[]>([])
  const [nfts, setNfts] = useState<Nft[]>([])
  const { address, isConnected } = useAccount()
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          await fetchTokens(address)
          await fetchNFTs(address)
        } finally {
          setIsLoading(false)
        }
      }
      void fetchData()
    }
  }, [isConnected, address])

  useEffect(() => {
    if (tokens.length > 0) {
      const total = tokens.reduce((sum, token) => sum + token.value, 0)
      setTotalPortfolioValue(total)
    }
  }, [tokens])

  const fetchTokens = async (address: string) => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })
    }

    const chain = EvmChain.ETHEREUM

    try {
      // Get WETH price data first for ETH
      const wethPriceData = await Moralis.EvmApi.token.getTokenPrice({
        address: DEFAULT_TOKENS.WETH,
        chain,
      })

      // Fetch ETH balance and create ETH token data
      const ethBalance = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
      })

      const ethAmount = Number(ethBalance.result.balance.ether)
      const ethData: Token = {
        token: {
          name: "Ethereum",
          symbol: "ETH",
          contractAddress: DEFAULT_TOKENS.ETH,
          decimals: 18,
          logo: <TokenIcon address={DEFAULT_TOKENS.ETH} />,
        },
        amount: ethAmount.toString(),
        price: wethPriceData.result.usdPrice,
        priceChange24h: Number(wethPriceData.result["24hrPercentChange"]),
        value: ethAmount * wethPriceData.result.usdPrice,
        network: "Ethereum",
      }

      // Fetch balances for default tokens
      const tokenAddresses = [
        DEFAULT_TOKENS.WETH,
        DEFAULT_TOKENS.USDT,
        DEFAULT_TOKENS.USDC,
      ]
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
        tokenAddresses,
      })

      const tokenData = await Promise.all(
        response.result.map(async (token) => {
          if (token.token !== null) {
            try {
              const [metadataResponse, priceData] = await Promise.all([
                Moralis.EvmApi.token.getTokenMetadata({
                  addresses: [token.token.contractAddress],
                  chain,
                }),
                Moralis.EvmApi.token.getTokenPrice({
                  address: token.token.contractAddress,
                  chain,
                }),
              ])

              const metadata = metadataResponse.result[0]
              const decimals = Number(token.token.decimals)
              const amount = Number(token.amount) / 10 ** decimals

              return {
                token: {
                  name: metadata.token.name,
                  symbol: metadata.token.symbol,
                  contractAddress: token.token.contractAddress.checksum,
                  decimals: decimals,
                  logoURI:
                    metadata.token.logo ||
                    metadata.token.thumbnail ||
                    undefined,
                  logo: (
                    <TokenIcon
                      address={token.token.contractAddress.checksum}
                      logoURI={
                        metadata.token.logo ||
                        metadata.token.thumbnail ||
                        undefined
                      }
                    />
                  ),
                },
                amount: amount.toString(),
                price: priceData.result.usdPrice,
                priceChange24h: Number(priceData.result["24hrPercentChange"]),
                value: amount * priceData.result.usdPrice,
                network: "Ethereum",
              } as Token
            } catch (error) {
              console.error(
                "Error fetching data for token:",
                token.token.contractAddress.checksum,
                error
              )
              return null
            }
          }
          return null
        })
      )

      // Filter out null values and combine with ETH data
      const validTokens = tokenData.filter(
        (token): token is Token => token !== null
      )

      // Create default tokens with zero balance if they don't exist in the wallet
      const existingAddresses = validTokens.map((t) =>
        t.token.contractAddress.toLowerCase()
      )
      const defaultTokensWithZero = Object.entries(DEFAULT_TOKENS)
        .filter(
          ([_, address]) =>
            address !== DEFAULT_TOKENS.ETH && // Skip ETH as it's already handled
            !existingAddresses.includes(address.toLowerCase())
        )
        .map(async ([name, address]) => {
          try {
            const [metadataResponse, priceData] = await Promise.all([
              Moralis.EvmApi.token.getTokenMetadata({
                addresses: [address],
                chain,
              }),
              Moralis.EvmApi.token.getTokenPrice({
                address,
                chain,
              }),
            ])

            const metadata = metadataResponse.result[0]
            return {
              token: {
                name: metadata.token.name,
                symbol: metadata.token.symbol,
                contractAddress: address,
                decimals: metadata.token.decimals,
                logoURI:
                  metadata.token.logo || metadata.token.thumbnail || undefined,
                logo: (
                  <TokenIcon
                    address={address}
                    logoURI={
                      metadata.token.logo ||
                      metadata.token.thumbnail ||
                      undefined
                    }
                  />
                ),
              },
              amount: "0",
              price: priceData.result.usdPrice,
              priceChange24h: Number(priceData.result["24hrPercentChange"]),
              value: 0,
              network: "Ethereum",
            } as Token
          } catch (error) {
            console.error(
              "Error fetching data for default token:",
              address,
              error
            )
            return null
          }
        })

      const zeroBalanceTokens = (
        await Promise.all(defaultTokensWithZero)
      ).filter((token): token is Token => token !== null)

      // Combine all tokens and sort by value
      const allTokens = [ethData, ...validTokens, ...zeroBalanceTokens].sort(
        (a, b) => b.value - a.value
      )
      setTokens(allTokens)
    } catch (error) {
      console.error("Error fetching token data:", error)
    }
  }

  const fetchNFTs = async (address: string) => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })
    }

    const chain = EvmChain.ETHEREUM

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    })

    const nftData: Nft[] = await Promise.all(
      response.result.map(async (nft): Promise<Nft> => {
        const floorPriceResponse = await Moralis.EvmApi.nft.getNFTLowestPrice({
          address: nft.tokenAddress,
          chain,
        })

        const floorPrice = floorPriceResponse?.result?.price?.ether || 0

        const metadata = nft.metadata
          ? JSON.parse(nft.metadata.toString())
          : undefined

        return {
          tokenAddress: nft.tokenAddress.toString(),
          tokenId: nft.tokenId.toString(),
          name: nft.name,
          metadata: metadata,
          floorPrice: floorPrice,
        }
      })
    )

    setNfts(nftData)
  }

  return (
    <div className="mx-0 border-b border-[#181F25]/70 py-0">
      <Card
        className={`${Styles.container} rounded-none border-t border-[#181F25]/70`}
      >
        <TokenSearch />
        <CardContent className="mx-0 p-0 px-2">
          <Tabs className={Styles.tabs} value="tokens">
            <div className="mx-0 mb-4 flex w-full items-center justify-between border-b border-[#181F25]/70 px-0">
              <div className="align-center my-0 py-0">
                <div className="w-full p-0 font-mono text-[#F2F4F3]">
                  <div className="p-2">
                    <span className="text-base">{"/// WALLET DETAILS"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {isLoading ? (
                <div className="m-4 flex w-full flex-col gap-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={`skeleton-row-${crypto.randomUUID()}`}
                      className="grid w-full grid-cols-8 items-center justify-start gap-8"
                    >
                      <div className="flex justify-start">
                        <Skeleton className="size-6 rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !isConnected ? (
                <div className="flex w-full justify-center p-8 text-muted-foreground">
                  Connect your wallet to view your portfolio
                </div>
              ) : tokens.length === 0 ? (
                <div className="flex w-full justify-center p-8 text-muted-foreground">
                  No tokens found in connected wallet
                </div>
              ) : (
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-[#07090b] hover:bg-transparent">
                      <TableHead className="min-w-[40px]">Asset</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="w-[200px] pl-8 text-right">
                        Portfolio %
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokens.map((token) => {
                      const portfolioPercentage =
                        totalPortfolioValue > 0
                          ? (token.value / totalPortfolioValue) * 100
                          : 0

                      return (
                        <TableRow
                          key={`${token.network}-${token.token.contractAddress}`}
                          className="hover:bg-zinc-900/50"
                        >
                          <TableCell>
                            <TokenIcon
                              address={token.token.contractAddress}
                              logoURI={token.token.logoURI}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {token.token.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {token.token.symbol}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium">
                              {token.network}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-medium">
                              {Number(token.amount).toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-medium">
                              $
                              {token.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                (token.priceChange24h || 0) >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {(token.priceChange24h || 0).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                  signDisplay: "always",
                                }
                              )}
                              %
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-medium">
                              $
                              {token.value.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="w-[200px] pl-8 text-right">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="w-full">
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={portfolioPercentage}
                                      className="h-2"
                                    />
                                    <span className="w-12 text-xs">
                                      {portfolioPercentage.toFixed(1)}%
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {portfolioPercentage.toFixed(2)}% of
                                    portfolio
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
