"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import * as web3 from "@velas/web3"
import { rpc } from "viem/utils"

import { Button } from "@/components/ui/button"

const getConnection = () => {
  const connection = new web3.Connection("https://api.testnet.nexis.network", {
    commitment: "singleGossip",
  })

  return connection
}

interface ValidatorInfo {
  publicKey: string
  name: string
  commission: number
  activeStake: number
  apy: number
  score: number
}

const formatNumber = (num: number) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k"
  return num.toString()
}

export default function NodesPage() {
  const [validators, setValidators] = useState([] as ValidatorInfo[])

  useEffect(() => {
    const getVoteAccounts = async () => {
      const response = await getConnection().getVoteAccounts()
      console.log("response===", response)
      const _validators: ValidatorInfo[] = []
      response.current.forEach((val) => {
        let validatorName = "Unknown Validator"
        let score = 100
        if (val.nodePubkey == "7yxFRV6tHecaLpADmo6FEkTzbWbBGjAhPHo46XdJ4i8y") {
          ;(validatorName = "Nexis Foundation Bootstrap"), (score = 100)
        }
        _validators.push({
          publicKey: val.nodePubkey,
          name: validatorName,
          commission: val.commission,
          activeStake: val.activatedStake,
          apy: 13.2,
          score,
        })
      })
      setValidators(_validators as any)
    }

    getVoteAccounts()
      .then((v) => {
        console.log("fetched vote accounts")
      })
      .catch((e) => {
        console.log("getVoteAccounts ERR", e)
      })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="bg-gradient-to-r from-primary to-[#DC1FFF] bg-clip-text text-4xl font-bold text-transparent">
          Nexis Staking
        </h1>
        <p className="text-muted-foreground">
          Stake your NZT tokens with validators to earn rewards and secure the
          network
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Staked</p>
          <p className="text-2xl font-bold">
            {formatNumber(
              validators.reduce(
                (total, validator) => total + validator.activeStake,
                0
              ) / 1e9
            )}{" "}
            NZT
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Average APY</p>
          <p className="text-2xl font-bold">
            {validators.length > 0
              ? (
                  validators.reduce(
                    (total, validator) => total + validator.apy,
                    0
                  ) / validators.length
                ).toFixed(2)
              : 0}
            %
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Active Validators</p>
          <p className="text-2xl font-bold">{validators.length}</p>
        </div>
      </div>

      {/* Validators Grid */}
      <div className="grid gap-6">
        {validators.map((validator) => (
          <div
            key={validator.publicKey}
            className="rounded-lg border bg-card p-6 transition-all hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{validator.name}</h3>
                  <p className="font-mono text-sm text-muted-foreground">
                    {validator.publicKey}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-8 text-sm">
                  <div>
                    <p className="text-muted-foreground">Commission</p>
                    <p>{validator.commission}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Stake</p>
                    <p>{(validator.activeStake / 1e9).toLocaleString()} NZT</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">APY</p>
                    <p className="text-primary">{validator.apy}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Score</p>
                    <p>{validator.score}/100</p>
                  </div>
                </div>
              </div>
              <Link href={`/nodes/${validator.publicKey}`}>
                <Button size="lg">Stake</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
