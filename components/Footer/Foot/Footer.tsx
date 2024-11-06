import React from "react"

import { Logo } from "../Logo/Logo"
import { SystemStatus } from "../SystemStatus/SystemStatus"
import { FooterLinks } from "./FooterLinks"
import { LegalLink } from "./LegalLinks"

export const Footer: React.FC = () => {
  return (
    <footer className="flex min-h-[135px] w-full flex-col justify-center border-t border-white/10 bg-neutral-950 px-96 pt-7 text-sm bg-blend-normal max-md:max-w-full max-md:px-5">
      <div className="flex w-full flex-wrap items-end gap-2.5 leading-none max-md:max-w-full">
        <Logo />
        <div className="flex w-[294px] gap-7 rounded-md py-2 pr-6">
          <div className="text-neutral-400">© 2024</div>
          <SystemStatus />
        </div>
      </div>
      <div className="mt-5 flex w-full flex-wrap gap-10 py-1.5 pr-1.5 text-zinc-500 bg-blend-normal max-md:max-w-full">
        <FooterLinks />
      </div>
    </footer>
  )
}
