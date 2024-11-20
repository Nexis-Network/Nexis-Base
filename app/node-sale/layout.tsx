import type { ReactNode } from "react"

import CustomCursor from "@/components/CustomCursor"
import TokenBg from "@/components/node-sale/bg"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <TokenBg />
      </div>
      <CustomCursor />
    </>
  )
}
