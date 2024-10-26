import "@/styles/app.css"
import "@/styles/globals.css"

import { ReactNode } from "react"
import { Inter } from "next/font/google"
import { env } from "@/env.mjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
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
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  )
}
