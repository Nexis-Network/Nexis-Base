/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { motion } from "framer-motion"
import {
  ArrowLeftRight,
  ArrowUpDown,
  BarChart2,
  Clock,
  Github,
  Menu,
  Twitter,
  X,
} from "lucide-react"
import { createPortal } from "react-dom"
import { useAccount, useBalance } from "wagmi"

import type { NavigationItem } from "@/types/navigation"
import { cn } from "@/lib/utils"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Logo } from "@/components/NavMenu/Logo"
import { WalletNotifications } from "@/components/notifications/walletNotifications"

import ChatToggle from "../chat/ChatToggle"
import { SwapIcon } from "../icons/swap-icon"
import MobileNavButton from "../mobile-nav/MobileNavButton"
import { ConnectionButton } from "./ConnectionButton"
import styles from "./navmenu.module.css"

// Define icon components
const BridgeIcon = ArrowLeftRight
const ChartIcon = BarChart2
const VestingIcon = Clock

export const navigationItems: NavigationItem[] = [
  { label: "<A/> OVERVIEW", href: "/" },
  {
    label: "<A/> APPS",
    items: [
      { label: "Swap", href: "/swap" },
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

function MobileMenuPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || typeof document === "undefined") return null

  return createPortal(children, document.body)
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavigationItem[]
}

function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  if (!isOpen) return null

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  return (
    <MobileMenuPortal>
      {/* Backdrop */}
      <div
        className="Border-[#181F25] fixed inset-0 z-[9998] border-l bg-[#07090b]/80 backdrop-blur-sm duration-200 animate-in fade-in lg:hidden"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      />

      {/* Menu Panel */}
      <div className="fixed inset-0 z-[9999] w-full shadow-xl duration-300 animate-in slide-in-from-right lg:hidden">
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#181F25]/70 p-4">
            <div className="px flex flex-1 items-center justify-start pb-1">
              <Logo className="align-center h-8 w-auto pb-1 xs:h-9 sm:h-10" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#181F25]/70 bg-white/10 p-2 text-gray-400 hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Content */}
          <nav className="flex-1 px-6">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="py-4 duration-300 animate-in fade-in slide-in-from-right"
                style={{
                  animationDelay: "150ms",
                }}
              >
                {item.items ? (
                  <div>
                    <div className="mb-2 text-[#7d7d7d]">{item.label}</div>
                    <div className="ml-4 space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href || "#"}
                          className="block text-[#7d7d7d] transition-colors hover:text-[#f4f4f4]"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block text-[#7d7d7d] transition-colors hover:text-[#f4f4f4]"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto space-y-4 border-t border-[#181F25]/70">
            <div className="ml-4 flex items-center justify-start gap-x-4 pt-4">
              <Link
                href="https://github.com/nexis-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7d7d] transition-colors hover:text-[#f4f4f4]"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <title>Nexis Network Twitter logo </title>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/nexis_network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7d7d] transition-colors hover:text-[#f4f4f4]"
              >
                <Github size={20} />
              </Link>
              <WalletNotifications />
            </div>
            <div className="flex min-w-full justify-center">
              <div className="min-w-full">
                <ConnectionButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileMenuPortal>
  )
}

function Balance({ address }: { address: `0x${string}` }) {
  const { isConnected } = useAccount()
  const { data: balanceData, isLoading } = useBalance({
    address,
  })

  if (!isConnected || isLoading || !balanceData) {
    return <Skeleton className="h-4 w-16 rounded" />
  }

  // Format to show only first 3 digits
  const num = Number(balanceData.formatted)
  const formatted =
    num < 100
      ? num.toFixed(1) // For numbers less than 100, show one decimal
      : Math.floor(num).toString() // For numbers >= 100, show no decimals

  return (
    <span className="text-sm text-[#7d7d7d]">
      ${formatted} {balanceData.symbol}
    </span>
  )
}

// Add type for HyperText props
interface HyperTextProps {
  text: string
  className?: string
  animateOnLoad?: boolean
  duration?: number
}

// Add type for NavigationDropdownItem props
interface NavigationDropdownItemProps {
  item: NavigationItem
}

function NavigationDropdownItem({ item }: NavigationDropdownItemProps) {
  const pathname = usePathname()

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={cn(
              "relative",
              "h-[20px]",
              "w-full",
              "flex",
              "items-center",
              "justify-center",
              "px-2",
              "menuText",
              "navItemHover",
              "text-[#F2F4F3]/80",
              "group",
              "transition-colors",
              "duration-200",
              "text-[13px]",
              "hover:text-[#F2F4F3]"
            )}
            data-active={item.items?.some(
              (subItem) => subItem.href === pathname
            )}
          >
            <HyperText
              text={item.label}
              className={styles.menuText}
              animateOnLoad={false}
              duration={800}
            />
          </PopoverButton>

          <PopoverPanel
            className={cn(
              "z-50",
              "absolute",
              "min-w-[200px]",
              "mt-2",
              "bg-[#07090b]/90",
              "backdrop-blur-xl",
              "rounded-lg",
              "border border-[#181F25]",
              "shadow-xl",
              "text-sm/6",
              "transition-all duration-200",
              "data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            )}
          >
            <div className="rounded-none py-1">
              {item.items?.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href || "#"}
                  className={cn(
                    "relative",
                    "flex items-center gap-2",
                    "p-3",
                    "mt-2",
                    "mb-2",
                    "mx-1",
                    "py-2",
                    "rounded-md",
                    "text-[#405364]",
                    "text-[13px]",
                    "subnavItemHover",
                    "hover:text-[#E6EBEF]",
                    "hover:bg-[#303E4A]/20",
                    "hover:rounded-md"
                  )}
                  data-active={subItem.href === pathname}
                >
                  {subItem.label === "Swap" && <SwapIcon className="size-4" />}
                  {subItem.label === "Bridge" && (
                    <BridgeIcon className="size-4" />
                  )}
                  {subItem.label === "Chart" && (
                    <ChartIcon className="size-4" />
                  )}
                  {subItem.label === "Vesting" && (
                    <VestingIcon className="size-4" />
                  )}
                  <span className={styles.menuText}>{subItem.label}</span>
                </Link>
              ))}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

function MobileMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-50"
    >
      <title>Mobile menu toggle button</title>
      <motion.path
        d="M0 5H24V7H0V5Z"
        fill="white"
        animate={{
          y: isOpen ? 6 : 0,
          rotate: isOpen ? 45 : 0,
          translateX: isOpen ? 0 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M0 11H24V13H0V11Z"
        fill="white"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M12 17H24V19H12V17Z"
        fill="white"
        animate={{
          y: isOpen ? -6 : 0,
          rotate: isOpen ? -45 : 0,
          width: isOpen ? 24 : 12,
          translateX: isOpen ? 0 : 12,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.svg>
  )
}

export function NavigationMenu() {
  const [hasScrolled, setHasScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setHasScrolled(scrollTop > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <div
      className={`sticky top-0 z-50 flex items-center border-b border-[#181F25]/90 bg-[#07090b]/80 leading-none bg-blend-normal backdrop-blur-lg ${
        hasScrolled
          ? "border-b border-[#181F25]"
          : "border-b border-[#181F25]/70"
      }`}
    >
      <div className="mb-0 border-r border-[#181F25]">
        <div className="align-center mb-2.5 flex items-center px-6 sm:px-3 md:px-6">
          <Logo className="h-8 w-auto pb-1 xs:h-10 sm:h-10 md:h-10" />
        </div>
      </div>

      <nav className="hidden flex-1 pl-4 text-[#405364] lg:flex">
        <div className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.items ? (
                <NavigationDropdownItem item={item} />
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "relative",
                    "h-[40px]",
                    "flex",
                    "items-center",
                    "justify-center",
                    "p-2",
                    "menuText",
                    "navItemHover",
                    "text-[#405364]",
                    "text-xs",
                    "group",
                    "hover:text-[#E6EBEF]"
                  )}
                >
                  <HyperText
                    text={item.label}
                    className={styles.menuText}
                    animateOnLoad={false}
                    duration={800}
                  />
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>

      <MobileNavButton
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="ml-auto mr-4 block text-[#F2F4F3]/80 hover:text-[#F2F4F3] lg:hidden"
      />

      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navigationItems={navigationItems}
        />
      )}
      <div className="flex items-center border-l border-[#181F25] px-4">
        <WalletNotifications />
      </div>
      <div className="flex items-center">
        <div className="flex items-center border-l  border-[#181F25] px-4">
          <svg
            width="25"
            height="25"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block"
          >
            <title>Nexis Network og_status</title>
            <g clip-path="url(#clip0_56_35)">
              <path
                d="M23.5804 0.0531616H12.1891C5.45731 0.0531616 0.00012207 5.51035 0.00012207 12.2421V23.6334C0.00012207 30.3652 5.45731 35.8224 12.1891 35.8224H23.5804C30.3122 35.8224 35.7694 30.3652 35.7694 23.6334V12.2421C35.7694 5.51035 30.3122 0.0531616 23.5804 0.0531616Z"
                fill="#36491F"
              />
              <path
                d="M23.5804 0.0531616H12.1891C5.45731 0.0531616 0.00012207 5.51035 0.00012207 12.2421V23.6334C0.00012207 30.3652 5.45731 35.8224 12.1891 35.8224H23.5804C30.3122 35.8224 35.7694 30.3652 35.7694 23.6334V12.2421C35.7694 5.51035 30.3122 0.0531616 23.5804 0.0531616Z"
                stroke="#36491F"
              />
              <path
                d="M23.5805 0.124023H12.1892C5.49651 0.124023 0.0710449 5.54949 0.0710449 12.2421V23.6334C0.0710449 30.3261 5.49651 35.7515 12.1892 35.7515H23.5805C30.2731 35.7515 35.6986 30.3261 35.6986 23.6334V12.2421C35.6986 5.54949 30.2731 0.124023 23.5805 0.124023Z"
                fill="url(#paint0_radial_56_35)"
                fill-opacity="0.27"
                stroke="#D5FC2E"
                stroke-width="0.5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.8743 12.9941C19.5181 12.6476 19.9557 11.9674 19.9557 11.185C19.9557 10.051 19.0364 9.13177 17.9024 9.13177C16.7685 9.13177 15.8492 10.051 15.8492 11.185C15.8492 11.9969 16.3205 12.6988 17.0044 13.0319L13.995 19.4904L9.27238 16.5132L9.22805 16.5389C9.5059 16.1887 9.67187 15.7456 9.67187 15.2638C9.67187 14.1298 8.75262 13.2106 7.61865 13.2106C6.48468 13.2106 5.56543 14.1298 5.56543 15.2638C5.56543 16.3978 6.48468 17.317 7.61865 17.317C7.837 17.317 8.04742 17.2829 8.24482 17.2198L11.7364 26.7452H24.0902L27.4457 17.221C27.6657 17.3014 27.9031 17.3453 28.1509 17.3453C29.285 17.3453 30.2042 16.426 30.2042 15.2921C30.2042 14.1581 29.285 13.2388 28.1509 13.2388C27.0169 13.2388 26.0977 14.1581 26.0977 15.2921C26.0977 15.7534 26.2498 16.1792 26.5067 16.5221L22.1054 19.4904L18.8743 12.9941Z"
                fill="url(#paint1_radial_56_35)"
                fill-opacity="0.27"
              />
              <mask
                id="mask0_56_35"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="5"
                y="9"
                width="26"
                height="18"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.8743 12.9941C19.5181 12.6476 19.9557 11.9674 19.9557 11.185C19.9557 10.051 19.0364 9.13177 17.9024 9.13177C16.7685 9.13177 15.8492 10.051 15.8492 11.185C15.8492 11.9969 16.3205 12.6988 17.0044 13.0319L13.995 19.4904L9.27238 16.5132L9.22805 16.5389C9.5059 16.1887 9.67187 15.7456 9.67187 15.2638C9.67187 14.1298 8.75262 13.2106 7.61865 13.2106C6.48468 13.2106 5.56543 14.1298 5.56543 15.2638C5.56543 16.3978 6.48468 17.317 7.61865 17.317C7.837 17.317 8.04742 17.2829 8.24482 17.2198L11.7364 26.7452H24.0902L27.4457 17.221C27.6657 17.3014 27.9031 17.3453 28.1509 17.3453C29.285 17.3453 30.2042 16.426 30.2042 15.2921C30.2042 14.1581 29.285 13.2388 28.1509 13.2388C27.0169 13.2388 26.0977 14.1581 26.0977 15.2921C26.0977 15.7534 26.2498 16.1792 26.5067 16.5221L22.1054 19.4904L18.8743 12.9941Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_56_35)">
                <path
                  d="M18.8743 12.9941L18.8071 12.8693L18.6863 12.9344L18.7474 13.0573L18.8743 12.9941ZM17.0044 13.0319L17.1329 13.0918L17.1917 12.9655L17.0665 12.9045L17.0044 13.0319ZM13.9951 19.4904L13.9195 19.6103L14.0555 19.6961L14.1235 19.5503L13.9951 19.4904ZM9.27239 16.5132L9.34799 16.3933L9.27542 16.3475L9.20124 16.3906L9.27239 16.5132ZM9.22806 16.5389L9.11702 16.4508L9.2992 16.6615L9.22806 16.5389ZM8.24483 17.2198L8.37792 17.171L8.33112 17.0434L8.20166 17.0848L8.24483 17.2198ZM11.7364 26.7453L11.6033 26.794L11.6374 26.887H11.7364V26.7453ZM24.0902 26.7453V26.887H24.1906L24.2239 26.7924L24.0902 26.7453ZM27.4458 17.221L27.4944 17.0879L27.3597 17.0386L27.3121 17.1739L27.4458 17.221ZM26.5067 16.5221L26.586 16.6396L26.7095 16.5563L26.6201 16.4371L26.5067 16.5221ZM22.1054 19.4904L21.9785 19.5536L22.0505 19.6984L22.1847 19.608L22.1054 19.4904ZM19.8139 11.185C19.8139 11.9132 19.4068 12.5465 18.8071 12.8693L18.9415 13.1189C19.6293 12.7486 20.0974 12.0216 20.0974 11.185H19.8139ZM17.9024 9.27352C18.9581 9.27352 19.8139 10.1293 19.8139 11.185H20.0974C20.0974 9.97277 19.1147 8.99005 17.9024 8.99005V9.27352ZM15.991 11.185C15.991 10.1293 16.8468 9.27352 17.9024 9.27352V8.99005C16.6902 8.99005 15.7075 9.97277 15.7075 11.185H15.991ZM17.0665 12.9045C16.4294 12.5942 15.991 11.9407 15.991 11.185H15.7075C15.7075 12.0532 16.2115 12.8034 16.9423 13.1594L17.0665 12.9045ZM16.876 12.9721L13.8666 19.4306L14.1235 19.5503L17.1329 13.0918L16.876 12.9721ZM14.0706 19.3706L9.34799 16.3933L9.19682 16.6331L13.9195 19.6103L14.0706 19.3706ZM9.20124 16.3906L9.15688 16.4163L9.2992 16.6615L9.34357 16.6357L9.20124 16.3906ZM9.53014 15.2638C9.53014 15.7125 9.37571 16.1247 9.11702 16.4508L9.33909 16.627C9.6361 16.2526 9.81361 15.7787 9.81361 15.2638H9.53014ZM7.61866 13.3523C8.67434 13.3523 9.53014 14.2081 9.53014 15.2638H9.81361C9.81361 14.0516 8.83089 13.0689 7.61866 13.0689V13.3523ZM5.70717 15.2638C5.70717 14.2081 6.56298 13.3523 7.61866 13.3523V13.0689C6.40642 13.0689 5.42371 14.0516 5.42371 15.2638H5.70717ZM7.61866 17.1753C6.56298 17.1753 5.70717 16.3195 5.70717 15.2638H5.42371C5.42371 16.476 6.40642 17.4588 7.61866 17.4588V17.1753ZM8.20166 17.0848C8.01803 17.1435 7.82218 17.1753 7.61866 17.1753V17.4588C7.85186 17.4588 8.07682 17.4223 8.28803 17.3548L8.20166 17.0848ZM8.11177 17.2686L11.6033 26.794L11.8695 26.6965L8.37792 17.171L8.11177 17.2686ZM11.7364 26.887H24.0902V26.6035H11.7364V26.887ZM24.2239 26.7924L27.5794 17.2681L27.3121 17.1739L23.9566 26.6982L24.2239 26.7924ZM27.3971 17.3541C27.6324 17.4401 27.8863 17.487 28.1509 17.487V17.2036C27.92 17.2036 27.699 17.1627 27.4944 17.0879L27.3971 17.3541ZM28.1509 17.487C29.3632 17.487 30.346 16.5043 30.346 15.2921H30.0625C30.0625 16.3477 29.2067 17.2036 28.1509 17.2036V17.487ZM30.346 15.2921C30.346 14.0798 29.3632 13.0971 28.1509 13.0971V13.3806C29.2067 13.3806 30.0625 14.2364 30.0625 15.2921H30.346ZM28.1509 13.0971C26.9387 13.0971 25.9559 14.0798 25.9559 15.2921H26.2394C26.2394 14.2364 27.0952 13.3806 28.1509 13.3806V13.0971ZM25.9559 15.2921C25.9559 15.7851 26.1187 16.2406 26.3933 16.6071L26.6201 16.4371C26.381 16.1179 26.2394 15.7217 26.2394 15.2921H25.9559ZM26.4275 16.4046L22.0262 19.3729L22.1847 19.608L26.586 16.6396L26.4275 16.4046ZM22.2323 19.4273L19.0012 12.931L18.7474 13.0573L21.9785 19.5536L22.2323 19.4273Z"
                  fill="#D5FC2E"
                />
              </g>
            </g>
            <defs>
              <radialGradient
                id="paint0_radial_56_35"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-1.14596 -19.6958) rotate(64.2556) scale(78.1838 50.4122)"
              >
                <stop stop-color="#D5FC2E" />
                <stop offset="0.32258" stop-color="#ACB78F" />
                <stop offset="0.67" stop-color="#64772E" />
                <stop offset="1" stop-color="#D0E462" />
              </radialGradient>
              <radialGradient
                id="paint1_radial_56_35"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(12.4775 12.9068) rotate(80.4841) scale(26.7307 23.788)"
              >
                <stop stop-color="#D5FC2E" />
                <stop offset="0.4" stop-color="#D8FF4A" />
                <stop offset="0.835" stop-color="#CEFF1B" />
                <stop offset="1" stop-color="#D3FF34" />
              </radialGradient>
              <clipPath id="clip0_56_35">
                <rect width="36" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="flex items-center pl-2">
            <Balance address={"0x0000000000000000000000000000000000000000"} />
          </div>
        </div>
      </div>
      <div className="flex items-center border-l border-[#181F25]">
        <div>
          <div className="align-center flex size-full items-center px-4">
            <ConnectionButton />
          </div>
        </div>
      </div>
    </div>
  )
}
