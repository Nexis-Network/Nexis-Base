import React from "react"

import { ConnectButton } from "./ConnectionButton"
import { Logo } from "./Logo"
import { NavMenu } from "./NavMenu"

export const Header: React.FC = () => {
  return (
    <header className="z-10 flex w-full min-w-full flex-wrap justify-between gap-5 bg-[#0a0a0a] pb-2.5 pt-4 bg-blend-normal max-md:max-w-full">
      <NavMenu />
    </header>
  )
}

export default Header
