import type { ReactNode } from "react"

import { Analytics } from "@/components/analytics"
import CustomCursor from "@/components/CustomCursor"
import { Footer } from "@/components/Footer/Foot/Footer"
import { Header } from "@/components/Header/Header"
import { NavigationMenu } from "@/components/NavMenu/NavigationMenu"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <NavigationMenu />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Analytics />
      <CustomCursor />
    </>
  )
}
