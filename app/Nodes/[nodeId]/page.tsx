"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import * as web3 from "@velas/web3"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ValidatorInfo {
  publicKey: string
  voteKey: string
  name: string
  commission: number
  activeStake: number
  apy: number
  score: number
}

const getConnection = () => {
  const connection = new web3.Connection("https://api.testnet.nexis.network", {
    commitment: "singleGossip",
  })

  return connection
}

export default function NodeStakingPage() {
  const { nodeId } = useParams()
  const [amount, setAmount] = useState("")
  const [VALIDATORS, setValidators] = useState([] as ValidatorInfo[])

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
          voteKey: val.votePubkey,
          name: validatorName,
          commission: val.commission,
          activeStake: val.activatedStake / 1e9,
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

  const validator = VALIDATORS.find((v) => v.publicKey === nodeId)

  if (!validator) {
    return <div>Validator not found</div>
  }

  const handleDelegate = () => {
    // Implement delegation logic here
    console.log(`Delegating ${amount} NZT to ${validator.name}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Validator Details */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">{validator.name}</h1>
        <p className="font-mono text-sm text-muted-foreground">
          {validator.publicKey}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Commission</p>
          <p className="text-2xl font-bold">{validator.commission}%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Active Stake</p>
          <p className="text-2xl font-bold">
            {validator.activeStake.toLocaleString()} NZT
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">APY</p>
          <p className="text-2xl font-bold text-primary">{validator.apy}%</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-2xl font-bold">{validator.score}/100</p>
        </div>
      </div>

      {/* Staking Form */}
      <div className="mx-auto max-w-md space-y-6 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Stake NZT</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm text-muted-foreground">
              Amount to Stake
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter NZT amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleDelegate}>
            Delegate
          </Button>
        </div>
      </div>
    </div>
  )
}
