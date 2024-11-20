import type React from "react"

import { NavMenu } from "./NavMenu"

export const Header: React.FC = () => {
  return (
    <header className="z-50 flex w-full min-w-full border-collapse flex-wrap justify-between gap-5 bg-[#0a0a0a]/30 pb-2.5 pt-4 bg-blend-normal max-md:max-w-full">
      <NavMenu />
    </header>
  )
}

export default Header
