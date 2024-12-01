import React, { useEffect, useState } from "react"
import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

const NFTs = () => {
  const [nfts, setNfts] = useState([])
  const [userAddress, setUserAddress] = useState("")

  useEffect(() => {
    const initializeMoralis = async () => {
      try {
        // Initialize Moralis
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        })

        // Authenticate user and fetch NFTs
        const authenticateAndFetchNFTs = async () => {
          try {
            // Check if user is authenticated
            let user: Moralis.User | null = Moralis.User.current()
            if (!user) {
              user = await Moralis.authenticate()
            }
            const address = user.get("ethAddress")
            setUserAddress(address)
            fetchNFTs(address)
          } catch (error) {
            console.error("Authentication failed:", error)
          }
        }

        authenticateAndFetchNFTs()
      } catch (error) {
        console.error("Error initializing Moralis:", error)
      }
    }

    initializeMoralis()
  }, [])

  const fetchNFTs = async (address: string) => {
    try {
      const chain = EvmChain.ETHEREUM
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      })

      const nftList = response.result || []

      // Process NFT data as needed
      const enrichedNFTs = await Promise.all(
        nftList.map(async (nft) => {
          // Safe parse metadata
          let metadata = {}
          if (nft.metadata) {
            try {
              metadata = JSON.parse(nft.metadata)
            } catch (e) {
              console.error("Error parsing metadata:", e)
            }
          }

          const image = metadata?.image
            ? metadata.image.startsWith("ipfs")
              ? `https://ipfs.io/ipfs/${metadata.image.substring(7)}`
              : metadata.image
            : ""
          const name = metadata?.name || nft.name || ""
          const symbol = nft.symbol || ""
          const id = nft.tokenId

          // Placeholder values for floor price, 24h price change, market cap
          const floorPrice = "N/A"
          const priceChange24h = "N/A"
          const marketCap = "N/A"

          return {
            image,
            name,
            symbol,
            id,
            floorPrice,
            priceChange24h,
            marketCap,
          }
        })
      )

      setNfts(enrichedNFTs)
    } catch (error) {
      console.error("Error fetching NFTs:", error)
    }
  }

  return (
    <div>
      <h1>Your NFTs</h1>
      {nfts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image/Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>ID</th>
              <th>Floor Price</th>
              <th>24h Price Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {nfts.map((nft, index) => (
              <tr key={index}>
                <td>
                  {nft.image ? (
                    <img
                      src={nft.image}
                      alt={nft.name}
                      width="50"
                      height="50"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{nft.name}</td>
                <td>{nft.symbol}</td>
                <td>{nft.id}</td>
                <td>{nft.floorPrice}</td>
                <td>{nft.priceChange24h}</td>
                <td>{nft.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No NFTs found.</p>
      )}
    </div>
  )
}

export default NFTs
