"use client"

// EcosystemGrid component with search functionality
// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from "react"

import BlueWhaleAiLogo from "./Ecosystem-logos/bluewhaleai-1.svg"
import CryptoLinkLogo from "./Ecosystem-logos/CryptoLink.svg"
import CryptorankLogo from "./Ecosystem-logos/Cryptorank.svg"
// Import SVG logos
import DoraHacksLogo from "./Ecosystem-logos/DoraHacks.svg"
import OpenZeppelinLogo from "./Ecosystem-logos/OpenZeppelin.svg"
import SamuraiStarterLogo from "./Ecosystem-logos/SamuraiStarter.svg"

// Define partner data
interface Partner {
  name: string
  category: string
  Logo: React.FC<React.SVGProps<SVGSVGElement>>
}

const allPartners: Partner[] = [
  {
    name: "DoraHacks",
    category: "Backer",
    Logo: DoraHacksLogo,
  },
  {
    name: "Cryptorank",
    category: "Backer",
    Logo: CryptorankLogo,
  },
  {
    name: "CryptoLink",
    category: "Backer",
    Logo: CryptoLinkLogo,
  },
  {
    name: "OpenZeppelin",
    category: "Backer",
    Logo: OpenZeppelinLogo,
  },
  {
    name: "Blue Whale AI",
    category: "Backer",
    Logo: BlueWhaleAiLogo,
  },
  {
    name: "Samurai Starter",
    category: "Backer",
    Logo: SamuraiStarterLogo,
  },
  // Add more partners to fill the grid
]

// EcosystemGrid component
const EcosystemGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPartners = allPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const gridRows = Math.ceil(filteredPartners.length / 6)

  return (
    <div className="relative flex h-[875px] w-[1225px] flex-col items-start p-0">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search partners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      {/* Grid */}
      {Array.from({ length: gridRows }).map((_, rowIndex) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={rowIndex}
          className="flex h-[175px] w-[1225px] flex-row items-start p-0 pr-[75.5px]"
        >
          {filteredPartners
            .slice(rowIndex * 6, (rowIndex + 1) * 6)
            .map((partner, idx) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
                className="relative border border-[#272727] w-[175px] h-[175px] flex flex-col p-2 cursor-pointer overflow-hidden"
              >
                {/* Inner Box */}
                <div className="absolute flex flex-col justify-center items-center p-0 px-[41px] gap-[14px] w-[175px] h-[175px] left-[0.5px] top-0">
                  {/* Logo */}
                  <partner.Logo />
                  {/* Partner Name */}
                  <div className="absolute bottom-2 left-2 font-['Roboto_Mono'] text-[10px] uppercase leading-[12px] text-[#757575]">
                    {partner.name}
                  </div>
                  {/* Category */}
                  <div className="absolute left-2 top-2 font-['Roboto_Mono'] text-[10px] uppercase leading-[12px] text-[#F2F2F2]">
                    {partner.category}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default EcosystemGrid
