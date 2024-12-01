import type React from "react"

import { Logo } from "../Logo/Logo"
import { SystemStatus } from "../SystemStatus/SystemStatus"
import { FooterLinks } from "./FooterLinks"

export const Footer: React.FC = () => {
  return (
    <footer className="flex min-h-[135px] w-full flex-col justify-center border-t border-[#181F25]/10 bg-[#07090b]/80 px-96 pt-7 text-sm bg-blend-normal max-md:max-w-full max-md:px-3">
      <div className="flex w-full flex-wrap items-end gap-2.5 leading-none max-md:max-w-full">
        <Logo />
        <div className="flex w-[294px] gap-5 rounded-md py-2 pr-6">
          <div className="text-neutral-400">© 2024</div>
          <SystemStatus />
        </div>
      </div>
      <div className="mt-5 flex w-full flex-wrap gap-5 bg-[#07090b] py-1.5 pr-1.5 text-zinc-500 bg-blend-normal max-md:max-w-full">
        <FooterLinks />
      </div>
    </footer>
  )
}
