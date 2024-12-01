import type { ReactNode } from "react"

import { Analytics } from "@/components/analytics"
import CustomCursor from "@/components/CustomCursor"
import { Footer } from "@/components/Footer/Foot/Footer"
import { NavigationMenu } from "@/components/NavMenu/NavigationMenu"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-[#07090b]">
        <NavigationMenu />
        <div className="mx-20 border-x border-[#181F25]/70 py-4" />
        <div className="mx-2 border-collapse rounded-t-lg border border-[#181F25]/70 md:mx-10 lg:mx-5">
          <main className="flex-1 px-2 md:px-10 lg:px-2">{children}</main>
        </div>
        <Footer />
      </div>
      <Analytics />
      <CustomCursor />
    </>
  )
}
