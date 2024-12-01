import "@/styles/app.css"
import "@/styles/globals.css"

import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { env } from "@/env.mjs"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { useAccount } from "wagmi"

import { siteConfig } from "@/config/site"
import { signUpSteps } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import CustomCursor from "@/components/CustomCursor"
import RootProvider from "@/components/providers/root-provider"

const url = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  metadataBase: new URL(url),
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#feefc4",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: url?.toString(),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, "font-sans")}>
      <body className={cn("min-h-screen bg-[#07090b] font-sans antialiased")}>
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
      <Analytics />
      <CustomCursor />
    </html>
  )
}
