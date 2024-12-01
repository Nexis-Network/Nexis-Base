"use client"

import { useState } from "react"
import axios from "axios"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CustomCursor from "@/components/CustomCursor"
import { Footer } from "@/components/Footer/Foot/Footer"
import { Header } from "@/components/Header/Header"
import { NavigationMenu } from "@/components/NavMenu/NavigationMenu"

export default function Faucet() {
  const [address, setAddress] = useState("")
  const [error, setError] = useState(null)

  const requestNzt = async () => {
    try {
      const response = await axios.post(
        "https://evm-faucet-devnet.nexscan.io/api",
        { address }
      )
      console.log(response.data)
      setError(null)
    } catch (error) {
      console.error("Error making the POST request:", error)
      setError(error as null) // Type cast to match state type
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <NavigationMenu />
      <div className="flex grow items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-lg bg-gray-100 p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold">
            Request Testnet Nexis Tokens
          </h2>
          <p className="mb-2 text-sm text-gray-600">
            Enter your wallet address to receive 1 NZT for testing dApps on our
            TESTNET
          </p>
          <p className="mb-4 text-sm text-gray-600">
            (NOTE: Testnet tokens don’t hold any physical significance)
          </p>

          <Input
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Wallet Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button className="w-full" onClick={requestNzt}>
            Request 1 NZT
          </Button>
          {error && <Alert className="mb-4 text-red-600">{error}</Alert>}
        </div>
      </div>
      <Footer />
      <CustomCursor />
    </div>
  )
}
