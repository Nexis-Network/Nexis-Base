/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

import styles from "./navmenu.module.css"

interface NavigationItem {
  label: string
  href?: string
  items?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  { label: "<A/> OVERVIEW", href: "/" },
  {
    label: "<A/> APPS",
    items: [
      { label: "Swap", href: "" },
      { label: "Bridge", href: "/bridge" },
      { label: "Chart", href: "/chart" },
      { label: "Vesting", href: "/vesting" },
    ],
  },
  { label: "<A/> NODES", href: "/nodes" },
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
          className="menuText relative flex h-[40px] items-center justify-center p-3 transition-colors duration-200 hover:text-[#F2F2F2]"
        >
          <HyperText
            text={item.label}
            className={styles.menuText}
            animateOnLoad={false}
            duration={800}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className="menuText border-[rgb(39, 39, 39)] z-10 min-w-40 border bg-black/70 shadow-2xl backdrop-blur-xl"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {item.items?.map((subItem) => (
          <DropdownMenuItem key={subItem.label} asChild>
            {subItem.href && (
              <Link
                href={subItem.href}
                className="menuText block w-full px-4 py-2 hover:border-l hover:border-lime-400 hover:text-[#fafafa]"
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
    <nav
      className={`sticky top-0 z-30 mt-[-10px] flex w-full flex-col items-start self-center overflow-hidden overflow-x-auto whitespace-nowrap bg-[#0a0a0a]/90 leading-none text-[#7d7d7d] bg-blend-normal shadow-[inset_0_-1px_#ffffff24] backdrop-blur-md [-webkit-overflow-scrolling:touch] [scrollbar-width:none] ${
        hasScrolled
          ? "border-b border-[rgb(39,39,39)]"
          : "border-b border-transparent"
      }`}
    >
      <NavigationMenuPrimitive className="flex w-[950px] max-w-full flex-wrap items-stretch justify-between pl-5 bg-blend-normal">
        <NavigationMenuList className="flex w-full">
          {navigationItems.map((item) => (
            <NavigationMenuItem
              key={item.label}
              className="group relative shrink-0 grow basis-auto"
            >
              {item.items ? (
                <NavigationDropdownItem item={item} />
              ) : (
                <NavigationMenuLink
                  asChild
                  className={`relative z-10 flex h-[40px] items-center justify-center p-3 font-mono text-xs transition-colors duration-200 hover:text-[#fafafa] ${
                    pathname === item.href ? "text-[#fafafa]" : ""
                  }`}
                >
                  {item.href && (
                    <Link href={item.href}>
                      <HyperText
                        text={item.label}
                        className="font-mono text-xs"
                        animateOnLoad={false}
                        duration={600}
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
  )
}
