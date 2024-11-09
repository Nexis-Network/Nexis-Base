"use client"

import type React from "react"
import { useEffect, useState } from "react"

import LiveChat from "@/components/chat/LiveChat"
import Toggle from "@/components/chat/toggle"

import { ConnectionButton } from "./ConnectionButton"
import { Logo } from "./Logo"

interface NavItemProps {
  label: string
  className?: string
  isLast?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ label, className, isLast }) => (
  <div
    className={`group relative my-auto w-24 self-stretch text-center tracking-wide hover:text-white
      ${isLast ? "" : ""} ${className ?? ""}`}
  >
    <span className="relative z-10">{label}</span>
    <div
      className="duration-[3000ms] absolute bottom-0 left-0 w-full origin-left scale-x-0 bg-white transition-transform 
                    ease-out hover:text-white group-hover:scale-x-100"
    />
  </div>
)

export const NavMenu: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const newIsMobileView = window.innerWidth <= 400
      setIsMobileView(newIsMobileView)

      // Close mobile menu if screen width becomes larger than 400px
      if (!newIsMobileView && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  const toggleChat = () => setIsChatOpen(!isChatOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className="flex w-full min-w-full items-start justify-between px-2 md:px-2">
      <Logo />
      <nav className="flex items-center bg-transparent px-4 transition-all duration-300 ease-in-out md:px-8">
        <div className="flex items-center">
          {!isMobileView && (
            <div className="hidden w-full items-center space-x-6 text-sm sm:flex" />
          )}
          {!isMobileView && (
            <ConnectionButton className="ml-8 hidden sm:block" />
          )}
          {isMobileView && (
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              className="flex flex-col space-y-2"
            >
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </button>
          )}
        </div>
      </nav>
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <LiveChat />
        </div>
      )}
    </div>
  )
}
