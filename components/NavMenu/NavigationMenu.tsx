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
          className="relative flex h-[40px] items-center justify-center p-3 font-mono text-xs transition-colors duration-200 hover:text-[#fafafa]"
        >
          <HyperText
            text={item.label}
            className="font-mono text-xs"
            animateOnLoad={false}
            duration={600}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className="z-[100] min-w-40 border border-[#232323] bg-[#080808] shadow-2xl backdrop-blur-2xl"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {item.items?.map((subItem) => (
          <DropdownMenuItem key={subItem.label} asChild>
            {subItem.href && (
              <Link
                href={subItem.href}
                className="block w-full px-4 py-2 text-xs hover:border-b hover:border-lime-400 hover:bg-black/50 hover:text-[#fafafa]"
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

  return (
    <nav className="sticky top-0 z-[100] mt-[-10px] flex w-full flex-col items-start self-center overflow-hidden overflow-x-auto whitespace-nowrap bg-neutral-950 leading-none text-[#7d7d7d] bg-blend-normal shadow-[inset_0_-1px_#ffffff24] [-webkit-overflow-scrolling:touch] [scrollbar-width:none]">
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
                  className={`relative z-50 flex h-[40px] items-center justify-center p-3 font-mono text-xs transition-colors duration-200 hover:text-[#fafafa] ${
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
