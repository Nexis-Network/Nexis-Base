"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import * as web3 from "@velas/web3"
import * as bip39 from "bip39"
import bs58 from "bs58"
import nacl from "tweetnacl"

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

interface AccountCredentials {
  mnemonic: string
  publicKey: string
  secretKey: string
}

const createAccount = async (): Promise<AccountCredentials> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const mnemonic = bip39.generateMnemonic()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const seed: Buffer = await bip39.mnemonicToSeed(mnemonic)
  const seedHex = seed.slice(0, 32).toString("hex")
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const keyPair = nacl.sign.keyPair.fromSeed(Buffer.from(seedHex, "hex"))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const publicKey = bs58.encode(Buffer.from(keyPair.publicKey))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const secretKey = bs58.encode(Buffer.from(keyPair.secretKey))

  return {
    mnemonic,
    publicKey,
    secretKey,
  }
}

const NEXIS_LOGGED_IN_MNEMONIC = "NEXIS_LOGGED_IN_MNEMONIC"

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
  const [loggedIn, setLoggedIn] = useState(false)
  const [generatedCredentials, setGeneratatedCredentials] = useState(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const checkIfLoggedIn = () => {
      try {
        const storedMnemonic = localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC)
        if (storedMnemonic) {
          setLoggedIn(true)
          setGeneratatedCredentials(JSON.parse(storedMnemonic))
        }
      } catch (error) {
        console.error("Error checking if logged in:", error)
      }
    }
    checkIfLoggedIn()
  }, [])

  const generateMnemonic = async () => {
    try {
      const _generatedCredentials = await createAccount()
      setGeneratatedCredentials(_generatedCredentials as any)
      localStorage.setItem(
        NEXIS_LOGGED_IN_MNEMONIC,
        JSON.stringify(_generatedCredentials)
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getVoteAccounts = async () => {
      const response = await getConnection().getVoteAccounts()
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

  const handleClick = async () => {
    if (loggedIn) {
      console.log(`Delegating ${amount} NZT to ${validator.name}`)
    } else {
      // open the modal
      setIsModalOpen(true)
      //store the mnemonics and display them in frontend
      await generateMnemonic()
    }
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
          <Button className="w-full" onClick={handleClick}>
            {loggedIn ? "Delegate" : "Connect Native Nexis Wallet"}
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="modal-content max-w-[60vw] rounded-lg border border-primary bg-black p-6 text-white shadow-lg">
              <h2 className="text-lg font-semibold">Native Wallet Creation</h2>
              <p className="my-4">
                Staking is native feature of the Nexis Chain, which can not be
                directly accessed by Metamask, kindly note down the below
                Mnemonics to access your staking account in future, failing to
                do so will result in loss of your account!
              </p>
              <div>
                {generatedCredentials?.mnemonic
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      className="mx-1 mb-2 inline-block w-40 rounded-full border border-primary px-4 py-2 text-center"
                    >
                      {index + 1}. {word}
                    </span>
                  ))
                  .reduce((acc, curr, index) => {
                    if (index % 3 === 0 && index !== 0) {
                      acc.push(<br key={`br-${index}`} />) // Add a line break after every 3 words
                    }
                    acc.push(curr)
                    return acc
                  }, [])}
              </div>

              <div className="mt-4">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
