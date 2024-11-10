"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import HyperText from "@/components/ui/hyper-text"

import { NavItem } from "./NavItem"

interface NavigationItem {
  label: string
  href: string
}

const navigationItems: NavigationItem[] = [
  { label: "<A/> OVERVIEW", href: "/" },
  { label: "<T/> TOKENOMICS", href: "/tokenomics" },
  { label: "<F/> FAUCET", href: "/faucet" },
  { label: "<A/> AIRDROP", href: "/airdrop" },
  { label: "<N/> NODES", href: "/nodes" },
  { label: "<T/> TOKEN", href: "/token" },
  { label: "<B/> BRIDGE", href: "/bridge" },
]

export function NavigationMenu() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="flex w-full flex-col items-start self-center overflow-hidden whitespace-nowrap border-b border-[hsla(0,0%,100%,0.1)] bg-neutral-950 leading-none text-zinc-500 bg-blend-normal">
      <ul className="flex w-[950px] max-w-full flex-wrap items-stretch justify-between bg-blend-normal">
        {navigationItems.map((item) => (
          <li
            key={item.href}
            className={`group relative shrink-0 grow basis-auto ${
              item.href !== navigationItems[navigationItems.length - 1].href
                ? 'after:absolute after:right-0 after:top-1/3 after:h-1/3 after:w-px after:bg-white/50 after:content-[""]'
                : ""
            }`}
          >
            <Link
              href={item.href}
              className={`relative flex h-[40px] items-center justify-center overflow-hidden p-3 text-xs transition-colors duration-200 hover:text-[#fafafa] ${
                pathname === item.href ? "text-[#fafafa]" : ""
              }`}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <HyperText
                text={item.label}
                className="font-mono text-xs"
                animateOnLoad={false}
                duration={600}
              />
              {pathname === item.href && mounted && (
                <span className="absolute bottom-0 left-0 h-px w-0 animate-border-appear bg-[rgb(163,230,53)]" />
              )}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[rgb(163,230,53)] group-hover-animate:animate-border-appear" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
