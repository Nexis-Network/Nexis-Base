/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Twitter } from "@geist-ui/icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import HyperText from "@/components/ui/hyper-text"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuPrimitive,
} from "@/components/ui/navigation-menu"
import { ConnectionButton } from "@/components/NavMenu/ConnectionButton"
import { Logo } from "@/components/NavMenu/Logo"
import { WalletNotifications } from "@/components/notifications/walletNotifications"

import { NetworkStatus } from "../blockchain/network-status"
import Toggle from "../chat/toggle"
import styles from "./navmenu.module.css"

interface NavigationItem {
  label: string
  href?: string
  items?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  { label: "<A/> OVERVIEW", href: "/home" },
  {
    label: "<A/> APPS",
    items: [
      { label: "Swap", href: "" },
      { label: "Bridge", href: "/bridge" },
      { label: "Chart", href: "/chart" },
      { label: "Vesting", href: "/vesting" },
    ],
  },
  {
    label: " <A/> NODES",
    items: [
      { label: "Node Sale", href: "/node-sale" },
      { label: "Node Delegating", href: "/nodes" },
    ],
  },
  { label: "<A/> QUESTS", href: "/quests" },
  { label: "<A/> LEADERBOARD", href: "/leaderboard" },
]

function NavigationDropdownItem({ item }: { item: NavigationItem }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="menuText navItemHover relative flex h-[40px] items-center justify-center p-3 transition-colors duration-200 hover:text-[#F2F2F2]"
        >
          <HyperText
            text={item.label}
            className={`${styles.menuText} hover:text-[#f4f4f4]`}
            animateOnLoad={false}
            duration={800}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className="styles.menuText z-10 min-w-40 border-2 border-zinc-900 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-lg hover:text-[#fafafa]"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {item.items?.map((subItem) => (
          <DropdownMenuItem key={subItem.label} asChild>
            {subItem.href && (
              <Link
                href={subItem.href}
                className={`${styles.subnavItem} menuText block w-full px-4 py-2 hover:text-black`}
              >
                {subItem.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function NavigationMenu() {
  const pathname = usePathname()
  const [hasScrolled, setHasScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setHasScrolled(scrollTop > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`sticky top-0 z-30 flex items-center bg-[#0a0a0a]/80 px-4 leading-none bg-blend-normal shadow-[inset_0_-1px_#ffffff24] backdrop-blur-lg ${
        hasScrolled ? "border-b border-zinc-900" : "border-b border-transparent"
      }`}
    >
      <div className="flex items-center border-r border-zinc-800">
        <Logo />
      </div>

      <nav className="flex-1 pl-4 text-[#7d7d7d]">
        <NavigationMenuPrimitive className="flex">
          <NavigationMenuList className="flex">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.items ? (
                  <NavigationDropdownItem item={item} />
                ) : (
                  <NavigationMenuLink asChild>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="menuText navItemHover relative flex h-[40px] items-center justify-center p-3 transition-colors duration-200 hover:text-[#F2F2F2]"
                      >
                        <HyperText
                          text={item.label}
                          className={`${styles.menuText} hover:text-[#f4f4f4]`}
                          animateOnLoad={false}
                          duration={800}
                        />
                      </Link>
                    )}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenuPrimitive>
      </nav>
      <div className="h-full border-l border-zinc-800 px-4">
        <Twitter size={18} />
      </div>
      <div className="h-full border-l border-zinc-800 px-4">
        <Github size={18} />
      </div>
      <div className="h-full border-l border-zinc-800 px-4">
        <WalletNotifications />
      </div>
      <div className="flex items-center gap-2 border-l border-zinc-800 px-2">
        <ConnectionButton />
      </div>
    </div>
  )
}
