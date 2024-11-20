"Use client"

import type React from "react"

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

const partners: Partner[] = [
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
  return (
    <div className="relative flex flex-col items-start p-0 w-[1225px] h-[875px]">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-start p-0 pr-[75.5px] w-[1225px] h-[175px]"
        >
          {partners
            .slice(rowIndex * 6, (rowIndex + 1) * 6)
            .map((partner, idx) => (
              <div
                key={idx}
                className="relative border border-[#272727] w-[175px] h-[175px] flex flex-col p-2 cursor-pointer overflow-hidden"
              >
                {/* Inner Box */}
                <div className="absolute flex flex-col justify-center items-center p-0 px-[41px] gap-[14px] w-[175px] h-[175px] left-[0.5px] top-0">
                  {/* Logo */}
                  <partner.Logo />
                  {/* Partner Name */}
                  <div className="absolute bottom-2 left-2 text-[#757575] font-['Roboto_Mono'] text-[10px] leading-[12px] uppercase">
                    {partner.name}
                  </div>
                  {/* Category */}
                  <div className="absolute top-2 left-2 text-[#F2F2F2] font-['Roboto_Mono'] text-[10px] leading-[12px] uppercase">
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
