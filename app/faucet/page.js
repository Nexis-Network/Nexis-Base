"use client";
import { Footer } from "@/components/Footer/Foot/Footer";
import { NavigationMenu } from "@/components/NavMenu/NavigationMenu";
import { Header } from "@/components/Header/Header";
import CustomCursor from "@/components/CustomCursor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@/components/ui/alert";

export default function Faucet() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const requestNzt = async () => {
    try {
      setResponseData(null);
      const response = await axios.post("https://evm-faucet.nexis.network", { address });
      console.log(response.data);
      setResponseData("Sending Testnet NZT");
      setError(null);
    } catch (error) {
      console.error("Error making the POST request:", error);
      setError("Too many requests");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <NavigationMenu />
      <div className="flex grow items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-lg bg-gray-100 p-6 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-semibold">Request Testnet Nexis Tokens</h2>
          <p className="mb-2 text-sm text-gray-600">
            Enter your wallet address to receive 1 NZT for testing dApps on our TESTNET
          </p>
          <p className="mb-4 text-sm text-gray-600">
            (NOTE: Testnet tokens don’t hold any physical significance)
          </p>
          
          <Input
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
            placeholder="Wallet Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button className="w-full" onClick={requestNzt}>
            Request 1 NZT
          </Button>
          {error && (
            <Alert className="mb-4 text-red-600">
              {error}
            </Alert>
          )}
          {responseData && (
            <p className="mt-4 text-green-600">
              {responseData}
            </p>
          )}
        </div>
      </div>
      <Footer />
      <CustomCursor />
    </div>
  );
}
