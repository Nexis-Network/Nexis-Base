"use client"

import { useEffect, useState } from "react"
import Moralis from "moralis"
import { formatUnits } from "viem"
import { useAccount, useNetwork } from "wagmi"

import { initMoralis } from "@/lib/moralis"
import { Avatar } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TokenData {
  token_address: string
  name: string
  symbol: string
  decimals: string
  balance: string
  logo?: string | null
}

interface TokenBalance {
  token: {
    name: string
    symbol: string
    contractAddress: string
    decimals: number
    logo: string | null | undefined
  }
  balance: string
  price: number
  priceChange24h: number
  value: number
  percentage: number
}

interface PriceData {
  usdPrice: number
  "24hrPercentChange": number
}

export function TokenBalances() {
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    if (address && chain?.id) {
      void fetchTokenBalances()
    }
  }, [address, chain])

  const fetchTokenBalances = async () => {
    if (!address || !chain?.id) return

    try {
      await initMoralis()

      const chainId = chain.id.toString(16) as `0x${string}`
      const response = await fetch(
        `/api/balances?address=${address}&chain=${chainId}`
      )
      const data = (await response.json()) as TokenData[]

      const balancesWithPrices = await Promise.all(
        data.map(async (token) => {
          try {
            const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
              address: token.token_address,
              chain: chainId,
            })

            const priceData = priceResponse.raw as unknown as PriceData
            const balance = formatUnits(
              BigInt(token.balance),
              Number.parseInt(token.decimals, 10)
            )

            const value = Number(balance) * priceData.usdPrice

            return {
              token: {
                name: token.name,
                symbol: token.symbol,
                contractAddress: token.token_address,
                decimals: Number.parseInt(token.decimals, 10),
                logo: token.logo,
              },
              balance,
              price: priceData.usdPrice,
              priceChange24h: priceData["24hrPercentChange"],
              value,
              percentage: 0,
            } satisfies TokenBalance
          } catch (error) {
            console.error(
              `Error fetching price for token ${token.name}:`,
              error instanceof Error ? error.message : String(error)
            )
            return null
          }
        })
      )

      const validBalances = balancesWithPrices.filter(
        (balance): balance is NonNullable<typeof balance> => balance !== null
      )

      if (validBalances.length > 0) {
        const total = validBalances.reduce((sum, token) => sum + token.value, 0)
        setTotalValue(total)

        const balancesWithPercentages = validBalances.map(
          (token): TokenBalance => ({
            ...token,
            percentage: total > 0 ? (token.value / total) * 100 : 0,
          })
        )

        setTokenBalances(balancesWithPercentages)
      }
    } catch (error) {
      console.error(
        "Error fetching token balances:",
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  if (!address) {
    return (
      <div className="py-4 text-center text-gray-500">
        Please connect your wallet to view token balances
      </div>
    )
  }

  if (tokenBalances.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No tokens found in this wallet
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between px-4">
        <h2 className="text-xl font-semibold">Token Balances</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-lg font-semibold">
            $
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Asset</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Portfolio %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokenBalances.map((token) => (
            <TableRow key={token.token.contractAddress}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="size-8">
                  {token.token.logo && (
                    <img
                      src={token.token.logo}
                      alt={token.token.symbol}
                      className="size-full rounded-full"
                    />
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{token.token.name}</div>
                  <div className="text-sm text-gray-500">
                    {token.token.symbol}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {Number(token.balance).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </TableCell>
              <TableCell className="text-right">
                $
                {token.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell
                className={`text-right ${
                  token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {token.priceChange24h.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </TableCell>
              <TableCell className="text-right">
                $
                {token.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right">
                {token.percentage.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
