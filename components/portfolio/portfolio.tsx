/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useEffect, useState } from "react"
import { EvmChain } from "@moralisweb3/common-evm-utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Moralis from "moralis"
import { useAccount } from "wagmi"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import Styles from "./portfolio.module.css"
import TokenIcon from "./tokenIcon"

// Token addresses (Ethereum mainnet)
const TOKEN_ADDRESSES = {
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  ARB: "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
  PEPE: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
  SHIBA: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  ChainGPT: "0x32353A6C91143bfd6C7d363B546e62a9A2489A20",
  Eesee: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
}

interface Token {
  token: {
    name: string
    symbol: string
    contractAddress: string
    logo?: string | React.ReactNode
  }
  amount: string
  price: number
  priceChange24h: number | undefined
  value: number
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

interface Token {
  token: {
    name: string
    symbol: string
    contractAddress: string
    logo?: string | React.ReactNode
  }
  amount: string
  price: number
  priceChange24h: number | undefined
  value: number
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("tokens")
  const [tokens, setTokens] = useState<Token[]>([])
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
            } as Token
          }
          return null
        })
      )
    ).filter((token): token is Token => token !== null)

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
    }

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

  return (
    <Card className={Styles.container}>
      <CardContent>
        <Tabs
          className={Styles.tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <CardTitle>Wallet Assets</CardTitle>
              <CardDescription>View your tokens and NFTs</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tokens">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token.token.contractAddress}>
                    <TableCell>
                      <div className="relative h-4 w-4">
                        <div className="absolute inset-0 overflow-hidden">
                          {token.token.logo}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{token.token.name}</TableCell>
                    <TableCell>{token.token.symbol}</TableCell>
                    <TableCell>
                      {Number.parseFloat(token.amount).toFixed(4)}
                    </TableCell>
                    <TableCell>${token.price.toFixed(2)}</TableCell>
                    <TableCell
                      className={
                        (token.priceChange24h ?? 0) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {(token.priceChange24h ?? 0).toFixed(2)}%
                    </TableCell>
                    <TableCell>${token.value.toFixed(2)}</TableCell>
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
                      {nft.metadata?.name || `${nft.name} #${nft.tokenId}`}
                    </TableCell>
                    <TableCell>{nft.floorPrice} ETH</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
