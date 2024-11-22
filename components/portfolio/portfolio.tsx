/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useEffect, useState } from "react"
import { Avatar } from "@geist-ui/core"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import EthereumIcon from "../ui/chains/EthereumIcon"
import HyperText from "../ui/hyper-text"
import Web3DashboardTable from "../WalletDetails"
import Styles from "./portfolio.module.css"
import TokenSearch from "./search"
import TokenIcon from "./tokenIcon"

// Token addresses (Ethereum mainnet)
const TOKEN_ADDRESSES = {
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  ESE: "0x908dDb096BFb3AcB19e2280aAD858186ea4935C4",
  SHIBA: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
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

// Ensure the Token interface includes all necessary properties
interface Token {
  token: {
    name: string
    symbol: string
    contractAddress: string
    logo: JSX.Element
  }
  amount: string
  price: number
  priceChange24h: number
  value: number
  portfolioPercentage: number
}

// Define the TokenResult interface
interface TokenResult {
  name?: string
  symbol?: string
  address?: string
  image?: JSX.Element | null
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("tokens")
  const [tokens, setTokens] = useState<Token[]>([])
  const [trackedTokens, setTrackedTokens] = useState<Token[]>([])
  const [nfts, setNfts] = useState<Nft[]>([])
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      const fetchData = async () => {
        await fetchTokens(address)
        await fetchNFTs(address)
      }
      void fetchData()
    }
  }, [isConnected, address])

  const fetchTokens = async (address: string) => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })
    }

    const chain = EvmChain.ETHEREUM
    const tokenAddresses = Object.values(TOKEN_ADDRESSES)

    // Fetch balances for all token addresses
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
      tokenAddresses,
    })

    const tokenData = (
      await Promise.all(
        response.result.map(async (token) => {
          if (token.token !== null) {
            const priceData = await Moralis.EvmApi.token.getTokenPrice({
              address: token.token.contractAddress,
              chain,
            })

            return {
              token: {
                name: token.token.name,
                symbol: token.token.symbol,
                contractAddress: token.token.contractAddress.checksum,
                logo: (
                  <TokenIcon address={token.token.contractAddress.checksum} />
                ),
              },
              amount: token.amount.toString(),
              price: priceData.result.usdPrice,
              priceChange24h: Number(priceData.result["24hrPercentChange"]),
              value:
                Number(token.amount.toString()) * priceData.result.usdPrice,
              portfolioPercentage: 0, // Placeholder, calculate later
            } as Token
          }
          return null
        })
      )
    ).filter((token): token is Token => token !== null)

    // Calculate portfolio percentage
    const totalValue = tokenData.reduce((acc, token) => acc + token.value, 0)
    for (const token of tokenData) {
      token.portfolioPercentage = (token.value / totalValue) * 100
    }

    // Add tokens with zero balance for remaining TOKEN_ADDRESSES
    const existingAddresses = tokenData.map((t) =>
      t.token.contractAddress.toLowerCase()
    )
    const remainingTokens = Object.entries(TOKEN_ADDRESSES)
      .filter(
        ([_, address]) => !existingAddresses.includes(address.toLowerCase())
      )
      .map(([name, address]) => ({
        token: {
          name,
          symbol: name,
          contractAddress: address,
          logo: <TokenIcon address={address} />,
        },
        amount: "0",
        price: 0,
        priceChange24h: 0,
        value: 0,
        portfolioPercentage: 0,
      }))

    // Add ETH data
    const ethBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    })

    const ethPriceData = await Moralis.EvmApi.token.getTokenPrice({
      address: TOKEN_ADDRESSES.WETH,
      chain,
    })

    const ethData: Token = {
      token: {
        name: "Ethereum",
        symbol: "ETH",
        contractAddress: "0x0000000000000000000000000000000000000000",
        logo: (
          <TokenIcon address="0x0000000000000000000000000000000000000000" />
        ),
      },
      amount: ethBalance.result.balance.ether,
      price: ethPriceData.result.usdPrice,
      priceChange24h: Number(ethPriceData.result["24hrPercentChange"]),
      value:
        Number(ethBalance.result.balance.ether) * ethPriceData.result.usdPrice,
      portfolioPercentage: 0, // Placeholder, calculate later
    }

    // Calculate portfolio percentage for ETH
    const totalPortfolioValue = totalValue + ethData.value
    ethData.portfolioPercentage = (ethData.value / totalPortfolioValue) * 100

    setTokens([ethData, ...tokenData, ...remainingTokens])
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

  const handleAddToken = (tokenResult: TokenResult) => {
    const token: Token = {
      token: {
        name: tokenResult.name ?? "",
        symbol: tokenResult.symbol ?? "",
        contractAddress: tokenResult.address ?? "",
        logo: tokenResult.image ?? null,
      },
      amount: "0", // Default amount
      price: 0, // Default price
      priceChange24h: 0, // Default price change
      value: 0, // Default value
    }

    setTrackedTokens((prevTokens) => {
      if (
        !prevTokens.find(
          (t) => t.token.contractAddress === token.token.contractAddress
        )
      ) {
        return [...prevTokens, token]
      }
      return prevTokens
    })
  }

  const handleRemoveToken = (tokenResult: TokenResult) => {
    setTrackedTokens((prevTokens) =>
      prevTokens.filter((t) => t.token.contractAddress !== tokenResult.address)
    )
  }

  return (
    <div className="mx-0 py-0">
      <Card
        className={`${Styles.container} rounded-none border-t border-zinc-800`}
      >
        <TokenSearch
          onAddToken={handleAddToken}
          onRemoveToken={handleRemoveToken}
          trackedTokens={trackedTokens}
        />
        <CardContent className="mx-0 p-0 px-2">
          <Tabs
            className={Styles.tabs}
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="mx-0 mb-4 flex w-full items-center justify-between border-b border-zinc-800 px-4">
              <div className="align-center my-0 py-0">
                <h2 className={Styles.DescriptionText}>
                  {"/// WALLET HOLDINGS"}
                </h2>
              </div>
              <TabsList className="align-center my-0 bg-[#0a0a0a] py-0">
                <div className="grid min-w-full grid-cols-3 bg-[#0a0a0a]">
                  <div className="group relative size-full bg-[#0a0a0a] align-bottom">
                    <TabsTrigger
                      className="relative z-10 w-full border-collapse rounded-none bg-[#0a0a0a] px-8 py-4 font-mono text-white/80 transition-colors duration-300 hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-b-lime-300"
                      value="tokens"
                    >
                      <div className="mr-2 flex bg-[#0a0a0a]">
                        <svg
                          width="5"
                          height="4"
                          viewBox="0 0 5 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>dot</title>
                          <rect
                            width="3.6"
                            height="3.6"
                            transform="translate(0.590637 0.0977173)"
                            fill="white"
                            className="pr-2 align-middle"
                          />
                        </svg>
                      </div>
                      <HyperText className={Styles.tabsTrigger} text="TOKENS" />
                    </TabsTrigger>
                    <div className="pointer-events-none absolute inset-0 z-0 h-full py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="group relative size-full bg-[#0a0a0a] align-bottom">
                    <TabsTrigger
                      className="relative z-10 w-full border-collapse rounded-none border-l border-zinc-800 bg-[#0a0a0a] px-8 py-4 font-mono text-white/80 transition-colors duration-300 hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-b-lime-300"
                      value="nfts"
                    >
                      <div className="mr-2 flex bg-[#0a0a0a]">
                        <svg
                          width="5"
                          height="4"
                          viewBox="0 0 5 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>dot</title>
                          <rect
                            width="3.6"
                            height="3.6"
                            transform="translate(0.590637 0.0977173)"
                            fill="white"
                            className="pr-2 align-middle"
                          />
                        </svg>
                      </div>
                      <HyperText className={Styles.tabsTrigger} text="NFTs" />
                    </TabsTrigger>
                    <div className="pointer-events-none absolute inset-0 z-0 h-full py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="group relative size-full bg-[#0a0a0a] align-bottom">
                    <TabsTrigger
                      className="relative z-10 w-full border-collapse rounded-none border-l border-zinc-800 bg-[#0a0a0a] px-8 py-4 font-mono text-white/80 transition-colors duration-300 hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-b-lime-300"
                      value="vesting"
                    >
                      <div className="mr-2 flex bg-[#0a0a0a]">
                        <svg
                          width="5"
                          height="4"
                          viewBox="0 0 5 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>dot</title>
                          <rect
                            width="3.6"
                            height="3.6"
                            transform="translate(0.590637 0.0977173)"
                            fill="white"
                            className="pr-2 align-middle"
                          />
                        </svg>
                      </div>
                      <HyperText
                        className={Styles.tabsTrigger}
                        text="VESTING"
                      />
                    </TabsTrigger>
                    <div className="pointer-events-none absolute inset-0 z-0 h-full py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </TabsList>
            </div>

            <TabsContent value="tokens">
              <Table className="w-full px-6">
                <TableHeader>
                  <TableRow className="my-2">
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="px-20 py-0">
                  {trackedTokens.map((token) => (
                    <TableRow key={token.token.contractAddress}>
                      <TableCell>
                        <div className="align-center relative size-6 content-center">
                          <div className="absolute inset-0 size-6 overflow-hidden rounded-full">
                            {token.token.logo}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {token.token.name}{" "}
                        <span className="text-sm">({token.token.symbol})</span>
                      </TableCell>
                      <TableCell>
                        {Number.parseFloat(token.amount ?? "0").toFixed(4)}
                      </TableCell>
                      <TableCell>${(token.price ?? 0).toFixed(2)}</TableCell>
                      <TableCell
                        className={
                          (token.priceChange24h ?? 0) >= 0
                            ? "text-lime-500"
                            : "text-red-500"
                        }
                      >
                        {(token.priceChange24h ?? 0).toFixed(2)}%
                      </TableCell>
                      <TableCell>${(token.value ?? 0).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="nfts">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Floor Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nfts.map((nft) => (
                    <TableRow key={`${nft.tokenAddress}-${nft.tokenId}`}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={nft.metadata?.image}
                            alt={nft.metadata?.name}
                          />
                          <AvatarFallback>
                            {nft.metadata?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {nft.metadata?.name ||
                          `${nft.name ?? ""} ${nft.tokenId}`}
                      </TableCell>
                      <TableCell>{nft.floorPrice} ETH</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="vesting">
              <div>
                <Web3DashboardTable />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
